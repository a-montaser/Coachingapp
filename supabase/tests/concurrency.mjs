// "Two simultaneous bookings for the last seat must result in exactly one success" (Phase 1 done-when).
// Runs against a local Supabase started by the CLI. No dependencies: Node 22 fetch + crypto.
// Env (from `supabase status -o env`): API_URL, SERVICE_ROLE_KEY, ANON_KEY, JWT_SECRET.
import { createHmac, randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';

const { API_URL, SERVICE_ROLE_KEY, ANON_KEY, JWT_SECRET } = process.env;
for (const [k, v] of Object.entries({ API_URL, SERVICE_ROLE_KEY, ANON_KEY, JWT_SECRET })) {
  if (!v) throw new Error(`${k} is not set`);
}
const N = 20;

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
function jwt(sub) {
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub, role: 'authenticated', aud: 'authenticated', iat: now, exp: now + 600 })}`;
  return `${body}.${createHmac('sha256', JWT_SECRET).update(body).digest('base64url')}`;
}

async function call(path, { method = 'GET', token = SERVICE_ROLE_KEY, body, prefer } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      apikey: token === SERVICE_ROLE_KEY ? SERVICE_ROLE_KEY : ANON_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body && JSON.stringify(body),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, json: text ? JSON.parse(text) : null };
}

// A one-seat slot two days out on any seeded private offering.
const offering = (await call('/rest/v1/offerings?type=eq.private&select=id,duration_min&limit=1')).json[0];
assert.ok(offering, 'seed has a private offering');
const starts = new Date(Date.now() + 48 * 3600e3);
const slot = (
  await call('/rest/v1/slots', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      offering_id: offering.id,
      starts_at: starts.toISOString(),
      ends_at: new Date(starts.getTime() + offering.duration_min * 60e3).toISOString(),
      capacity: 1,
    },
  })
).json[0];

// N learners.
const users = await Promise.all(
  Array.from({ length: N }, async (_, i) => {
    const r = await call('/auth/v1/admin/users', {
      method: 'POST',
      body: {
        phone: `2019${String(Date.now()).slice(-6)}${String(i).padStart(2, '0')}`,
        phone_confirm: true,
        user_metadata: { test: randomUUID() },
      },
    });
    assert.ok(r.ok, `create user ${i}: ${JSON.stringify(r.json)}`);
    return r.json.id;
  }),
);

// Everyone books the last seat at once.
const results = await Promise.all(
  users.map((id) =>
    call('/rest/v1/rpc/book', {
      method: 'POST',
      token: jwt(id),
      body: { p_slot: slot.id, p_seats: 1, p_method: 'venue' },
    }),
  ),
);

const wins = results.filter((r) => r.ok);
const noSeats = results.filter((r) => !r.ok && r.json?.message === 'no_seats');
const seatsTaken = (await call(`/rest/v1/slots?id=eq.${slot.id}&select=seats_taken`)).json[0].seats_taken;

console.log(
  `book() x${N} on a 1-seat slot: ${wins.length} succeeded, ${noSeats.length} no_seats, seats_taken=${seatsTaken}`,
);
assert.equal(wins.length, 1, 'exactly one booking succeeds');
assert.equal(noSeats.length, N - 1, 'every other attempt is refused with no_seats');
assert.equal(seatsTaken, 1, 'the slot is not overbooked');

// Phase 2 R5: 20 learners book the same two one-seat weeks as a series at once. Exactly one series wins,
// and neither week is oversold (book_series is all or nothing).
const cairoOffsetMs = (d) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(d.getTime() / 60e3) * 60e3;
};
const week0 = new Date(Math.floor((Date.now() + 72 * 3600e3) / 60e3) * 60e3);
// Same Cairo wall-clock time a week later, whatever the clocks did in between.
const week1 = new Date(
  week0.getTime() +
    7 * 86400e3 +
    cairoOffsetMs(week0) -
    cairoOffsetMs(new Date(week0.getTime() + 7 * 86400e3)),
);
const weekSlots = (
  await call('/rest/v1/slots', {
    method: 'POST',
    prefer: 'return=representation',
    body: [week0, week1].map((s) => ({
      offering_id: offering.id,
      starts_at: s.toISOString(),
      ends_at: new Date(s.getTime() + offering.duration_min * 60e3).toISOString(),
      capacity: 1,
    })),
  })
).json;
assert.equal(weekSlots.length, 2, 'two weekly slots created');

const seriesResults = await Promise.all(
  users.map((id) =>
    call('/rest/v1/rpc/book_series', {
      method: 'POST',
      token: jwt(id),
      body: { p_slot: weekSlots[0].id, p_weeks: 2, p_method: 'venue' },
    }),
  ),
);
const seriesWins = seriesResults.filter((r) => r.ok);
const seriesRefused = seriesResults.filter((r) => !r.ok && r.json?.message === 'series_week_unavailable');
const taken = (
  await call(`/rest/v1/slots?id=in.(${weekSlots.map((s) => s.id).join(',')})&select=seats_taken`)
).json.map((s) => s.seats_taken);

console.log(
  `book_series() x${N} over 2 one-seat weeks: ${seriesWins.length} succeeded, ${seriesRefused.length} refused, seats_taken=${taken}`,
);
assert.equal(seriesWins.length, 1, 'exactly one series succeeds');
assert.equal(seriesRefused.length, N - 1, 'every other series is refused whole');
assert.deepEqual(taken, [1, 1], 'neither week is oversold');
