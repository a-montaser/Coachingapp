-- Chat RLS, server timestamps, unread counts and read receipts (Phase 2 R1.1, R1.2, R1.8).
-- Inside one transaction now() doesn't move, so "later" is made by removing a read marker as the owner.
begin;
select plan(26);

-- ---------- Fixtures (as the owner) ----------
-- L = learner, U = an instructor's sign-in, X = another learner with their own thread.
insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('51111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000051', now(), now(), '{}', '{}'),
  ('52222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000052', now(), now(), '{}', '{}'),
  ('53333333-3333-4333-8333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000053', now(), now(), '{}', '{}');
update public.profiles set first_name = 'Omar' where id = '51111111-1111-4111-8111-111111111111';

insert into public.instructors (id, display_name, gender, verified, user_id, reply_label) values
  ('5aaaaaaa-0000-4000-8000-000000000001', 'Chat Coach', 'female', true, '52222222-2222-4222-8222-222222222222', 'replies within an hour'),
  ('5aaaaaaa-0000-4000-8000-000000000002', 'Other Coach', 'male', true, null, null);
insert into public.threads (id, learner_id, instructor_id) values
  ('5ccccccc-0000-4000-8000-000000000001', '51111111-1111-4111-8111-111111111111', '5aaaaaaa-0000-4000-8000-000000000001'),
  ('5ccccccc-0000-4000-8000-000000000002', '53333333-3333-4333-8333-333333333333', '5aaaaaaa-0000-4000-8000-000000000002');

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;

-- ---------- The learner ----------
select pg_temp.as_user('51111111-1111-4111-8111-111111111111');
set local role authenticated;

select is(public.my_instructor_id(), null, 'a learner has no instructor row');
select is((select count(*)::int from public.threads), 1, 'the learner sees only their thread');
select lives_ok($$ insert into public.messages (thread_id, body) values ('5ccccccc-0000-4000-8000-000000000001', 'Hi, is Saturday ok?') $$,
  'a member posts in their thread');
select lives_ok($$ insert into public.messages (thread_id, body, created_at) values ('5ccccccc-0000-4000-8000-000000000001', 'Back-dated?', '2000-01-01') $$,
  'a message with its own time is accepted…');
select is((select count(*)::int from public.messages where created_at < now()), 0, '…but the server stamps the time');
select throws_ok($$ insert into public.messages (thread_id, sender_id, body) values ('5ccccccc-0000-4000-8000-000000000001', '52222222-2222-4222-8222-222222222222', 'Spoof') $$,
  '42501', null, 'nobody posts as someone else');
select throws_ok($$ insert into public.messages (thread_id, body) values ('5ccccccc-0000-4000-8000-000000000002', 'Hello?') $$,
  '42501', null, 'nobody posts in a thread they are not in');
select throws_ok($$ insert into public.threads (learner_id, instructor_id) values ('51111111-1111-4111-8111-111111111111', '5aaaaaaa-0000-4000-8000-000000000002') $$,
  '42501', null, 'threads are created only by start_thread()');
select throws_ok($$ insert into public.messages (thread_id, body) values ('5ccccccc-0000-4000-8000-000000000001', '   ') $$,
  '23514', null, 'an empty message is refused');
update public.messages set body = 'Edited' where thread_id = '5ccccccc-0000-4000-8000-000000000001';
select is((select count(*)::int from public.messages where body = 'Edited'), 0, 'messages cannot be edited');
select is((select last_message_at from public.threads where id = '5ccccccc-0000-4000-8000-000000000001'), now(), 'posting moves the thread''s latest activity');
select results_eq($$ select other_name, i_am_learner, unread, reply_label from public.my_threads $$,
  $$ values ('Chat Coach'::text, true, 0, 'replies within an hour'::text) $$, 'the learner''s list: coach name, own messages are not unread');
select lives_ok($$ insert into public.thread_reads (thread_id) values ('5ccccccc-0000-4000-8000-000000000001') $$, 'a member marks the thread read');
select throws_ok($$ insert into public.thread_reads (thread_id, user_id) values ('5ccccccc-0000-4000-8000-000000000001', '52222222-2222-4222-8222-222222222222') $$,
  '42501', null, 'nobody writes someone else''s read marker');

-- ---------- The instructor ----------
reset role;
select pg_temp.as_user('52222222-2222-4222-8222-222222222222');
set local role authenticated;

select is(public.my_instructor_id(), '5aaaaaaa-0000-4000-8000-000000000001'::uuid, 'a signed-in instructor finds their row');
select results_eq($$ select id from public.threads $$, $$ values ('5ccccccc-0000-4000-8000-000000000001'::uuid) $$, 'the instructor sees only their own threads');
select results_eq($$ select other_name, i_am_learner, unread from public.my_threads $$,
  $$ values ('Omar'::text, false, 2) $$, 'the instructor''s list: the learner''s first name and 2 unread');
insert into public.thread_reads (thread_id) values ('5ccccccc-0000-4000-8000-000000000001');
select is((select unread from public.my_threads), 0, 'opening the chat clears its unread count');
select lives_ok($$ insert into public.messages (thread_id, body) values ('5ccccccc-0000-4000-8000-000000000001', 'Saturday works') $$, 'the instructor replies');

-- The learner read before the reply arrived.
reset role;
delete from public.thread_reads where user_id = '51111111-1111-4111-8111-111111111111';
select pg_temp.as_user('51111111-1111-4111-8111-111111111111');
set local role authenticated;
select is((select unread from public.my_threads), 1, 'the reply is unread for the learner');
select ok((select other_read_at >= now() from public.my_threads), 'the instructor''s marker reads as "Read" on the learner''s messages');

-- ---------- Someone else ----------
reset role;
select pg_temp.as_user('53333333-3333-4333-8333-333333333333');
set local role authenticated;
select is((select count(*)::int from public.messages where thread_id = '5ccccccc-0000-4000-8000-000000000001'), 0, 'another user reads none of the messages');
select is((select count(*)::int from public.thread_reads where thread_id = '5ccccccc-0000-4000-8000-000000000001'), 0, 'another user reads none of the markers');
select results_eq($$ select id from public.my_threads $$, $$ values ('5ccccccc-0000-4000-8000-000000000002'::uuid) $$, 'another user''s list has only their own thread');
select throws_ok($$ insert into public.messages (thread_id, body) values ('5ccccccc-0000-4000-8000-000000000001', 'Hi') $$,
  '42501', null, 'another user cannot post in it');

reset role;
set local role anon;
select throws_ok($$ select * from public.my_threads $$, '42501', null, 'signed out: no Messages list');

select * from finish();
rollback;
