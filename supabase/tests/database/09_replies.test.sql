-- Swipe to reply (D74): a reply quotes a message from its own thread only.
begin;
select plan(4);

insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('91111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000091', now(), now(), '{}', '{}');
insert into public.instructors (id, display_name, gender, verified) values
  ('9aaaaaaa-0000-4000-8000-000000000001', 'Reply Coach', 'female', true),
  ('9aaaaaaa-0000-4000-8000-000000000002', 'Other Coach', 'male', true);
insert into public.threads (id, learner_id, instructor_id) values
  ('9ccccccc-0000-4000-8000-000000000001', '91111111-1111-4111-8111-111111111111', '9aaaaaaa-0000-4000-8000-000000000001'),
  ('9ccccccc-0000-4000-8000-000000000002', '91111111-1111-4111-8111-111111111111', '9aaaaaaa-0000-4000-8000-000000000002');
insert into public.messages (id, thread_id, sender_id, body) values
  ('9ddddddd-0000-4000-8000-000000000001', '9ccccccc-0000-4000-8000-000000000001', '91111111-1111-4111-8111-111111111111', 'Is Saturday ok?'),
  ('9ddddddd-0000-4000-8000-000000000002', '9ccccccc-0000-4000-8000-000000000002', '91111111-1111-4111-8111-111111111111', 'Other thread');

select set_config('request.jwt.claims', json_build_object('sub', '91111111-1111-4111-8111-111111111111', 'role', 'authenticated')::text, true);
set local role authenticated;

select lives_ok($$ insert into public.messages (id, thread_id, body, reply_to) values
  ('9ddddddd-0000-4000-8000-000000000003', '9ccccccc-0000-4000-8000-000000000001', 'And Sunday?', '9ddddddd-0000-4000-8000-000000000001') $$,
  'a reply quotes a message in the same thread');
select is((select reply_to from public.messages where id = '9ddddddd-0000-4000-8000-000000000003'),
  '9ddddddd-0000-4000-8000-000000000001'::uuid, 'the reply keeps its link');
select throws_ok($$ insert into public.messages (thread_id, body, reply_to) values
  ('9ccccccc-0000-4000-8000-000000000001', 'Cross-thread', '9ddddddd-0000-4000-8000-000000000002') $$,
  'P0001', 'bad_reply', 'a reply cannot quote another thread');
select throws_ok($$ insert into public.messages (thread_id, body, reply_to) values
  ('9ccccccc-0000-4000-8000-000000000001', 'To nothing', gen_random_uuid()) $$,
  'P0001', 'bad_reply', 'a reply cannot quote a message that does not exist');

select * from finish();
rollback;
