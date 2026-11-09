// Phase 2 R1.8 / T5: live chat between two signed-in users, through local Supabase Realtime.
// A learner's message, typing signal and the instructor's read marker each reach the other side live, and
// a third user receives none of it (RLS). Prints how long each took.
// Env (from `supabase status -o env`): API_URL, SERVICE_ROLE_KEY, ANON_KEY.
// Users sign in for real (email and password) so Realtime gets tokens Supabase Auth issued itself.
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';

const { API_URL, SERVICE_ROLE_KEY, ANON_KEY } = process.env;
for (const [k, v] of Object.entries({ API_URL, SERVICE_ROLE_KEY, ANON_KEY })) {
  if (!v) throw new Error(`${k} is not set`);
}
const WAIT_MS = 15_000;
const PASSWORD = `pw-${randomUUID()}`;

const admin = createClient(API_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
async function newUser(i) {
  const { data, error } = await admin.auth.admin.createUser({
    email: `realtime-${i}-${randomUUID()}@test.local`,
    password: PASSWORD,
    email_confirm: true,
  });
  if (error) throw error;
  return { id: data.user.id, email: data.user.email };
}
async function clientFor(user) {
  const c = createClient(API_URL, ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await c.auth.signInWithPassword({ email: user.email, password: PASSWORD });
  if (error) throw error;
  return c;
}
const subscribed = (channel) =>
  new Promise((resolve, reject) => {
    channel.subscribe((status, err) => {
      if (status === 'SUBSCRIBED') resolve();
      else if (err) console.log(`channel ${channel.topic}: ${status} ${err.message ?? err}`);
      else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') reject(err ?? new Error(status));
    });
  });
const within = (promise, what) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${what}: nothing within ${WAIT_MS} ms`)), WAIT_MS),
    ),
  ]);

// Learner L, instructor U (signed in, linked to an instructor row), outsider X; one thread L ↔ U.
const [learnerUser, coachUser, outsiderUser] = await Promise.all([newUser(1), newUser(2), newUser(3)]);
const [learner, coach, outsider] = [learnerUser.id, coachUser.id, outsiderUser.id];
const instructor = await admin
  .from('instructors')
  .insert({ display_name: 'Realtime Coach', gender: 'female', verified: true, user_id: coach })
  .select('id')
  .single();
assert.ifError(instructor.error);
const thread = await admin
  .from('threads')
  .insert({ learner_id: learner, instructor_id: instructor.data.id })
  .select('id')
  .single();
assert.ifError(thread.error);
const threadId = thread.data.id;

const [L, U, X] = await Promise.all([clientFor(learnerUser), clientFor(coachUser), clientFor(outsiderUser)]);
const got = { coachMessage: null, coachTyping: null };
const seen = { coach: [], learner: [], outsider: [] }; // every message body each side received
const arrived = {};
const signal = (key) => new Promise((resolve) => (arrived[key] = resolve));
const waits = { message: signal('message'), read: signal('read'), typing: signal('typing') };

const onMessages = (c, who, done) =>
  c
    .channel(`test-msg-${who}`)
    .on('system', {}, (m) => console.log(`realtime ${who}: ${JSON.stringify(m)}`))
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, ({ new: m }) => {
      seen[who].push(m.body);
      done?.(m);
    });
let measuring = false;
const coachMsgs = onMessages(U, 'coach', (m) => {
  if (measuring && m.body === 'Is the court indoors?') {
    got.coachMessage = m;
    arrived.message(Date.now());
  }
});
const learnerMsgs = onMessages(L, 'learner');
const outsiderMsgs = onMessages(X, 'outsider');
const learnerReads = L.channel('test-reads').on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'thread_reads' },
  ({ new: r }) => {
    if (r.user_id === coach) arrived.read(Date.now());
  },
);
const typingL = L.channel(`thread:${threadId}`, { config: { broadcast: { self: false } } });
const typingU = U.channel(`thread:${threadId}`, { config: { broadcast: { self: false } } }).on(
  'broadcast',
  { event: 'typing' },
  ({ payload }) => {
    got.coachTyping = payload;
    arrived.typing(Date.now());
  },
);
await Promise.all([coachMsgs, learnerMsgs, outsiderMsgs, learnerReads, typingL, typingU].map(subscribed));

// A freshly started local Realtime takes a while to begin streaming database changes after the first
// subscription. Send warm-up messages until one reaches the instructor (or give up after 45 s), so the
// timing below measures delivery, not start-up.
const warmUntil = Date.now() + 45_000;
for (let i = 1; !seen.coach.length; i++) {
  if (Date.now() > warmUntil) {
    throw new Error(
      `no message reached the instructor in 45 s (learner received ${seen.learner.length}, outsider ${seen.outsider.length}): ` +
        (seen.learner.length
          ? 'Realtime streams, so the instructor is filtered out (check RLS)'
          : 'Realtime never streamed any change'),
    );
  }
  const warm = await L.from('messages').insert({ thread_id: threadId, body: `warm-up ${i}` });
  assert.ifError(warm.error);
  await new Promise((r) => setTimeout(r, 2000));
}
console.log(`Realtime warm-up: ${seen.coach.length} message(s) before the first arrived`);
measuring = true;

// 1. The learner sends; the instructor receives it live, the outsider doesn't.
let t0 = Date.now();
const sent = await L.from('messages').insert({ thread_id: threadId, body: 'Is the court indoors?' });
assert.ifError(sent.error);
const messageMs = (await within(waits.message, 'message to the instructor')) - t0;
assert.equal(got.coachMessage.body, 'Is the court indoors?');
assert.equal(got.coachMessage.sender_id, learner);

// 2. Typing.
t0 = Date.now();
await typingL.send({ type: 'broadcast', event: 'typing', payload: { user: learner } });
const typingMs = (await within(waits.typing, 'typing signal')) - t0;
assert.deepEqual(got.coachTyping, { user: learner });

// 3. The instructor opens the chat; the learner sees the read marker ("Read").
t0 = Date.now();
const read = await U.from('thread_reads').upsert(
  { thread_id: threadId, user_id: coach },
  { onConflict: 'thread_id,user_id' },
);
assert.ifError(read.error);
const readMs = (await within(waits.read, 'read marker to the learner')) - t0;

await new Promise((r) => setTimeout(r, 1000));
assert.equal(seen.outsider.length, 0, 'a user outside the thread receives nothing');

console.log(
  `Realtime chat: message ${messageMs} ms, typing ${typingMs} ms, read receipt ${readMs} ms; outsider received nothing`,
);
await Promise.all([L, U, X].map((c) => c.removeAllChannels()));
process.exit(0);
