-- Favourites RLS, review write lock and the series column (Phase 2 R2, R3, R5).
begin;
select plan(7);

insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('71111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000071', now(), now(), '{}', '{}'),
  ('72222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000072', now(), now(), '{}', '{}');
insert into public.instructors (id, display_name, gender, verified) values
  ('7aaaaaaa-0000-4000-8000-000000000001', 'Fav Coach', 'female', true);

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;

select pg_temp.as_user('71111111-1111-4111-8111-111111111111');
set local role authenticated;
select lives_ok($$ insert into public.favourites (instructor_id) values ('7aaaaaaa-0000-4000-8000-000000000001') $$, 'a learner hearts a coach');
select throws_ok($$ insert into public.favourites (user_id, instructor_id) values ('72222222-2222-4222-8222-222222222222', '7aaaaaaa-0000-4000-8000-000000000001') $$,
  '42501', null, 'nobody adds favourites for someone else');
select throws_ok($$ insert into public.reviews (booking_id, user_id, instructor_id, stars) values (gen_random_uuid(), '71111111-1111-4111-8111-111111111111', '7aaaaaaa-0000-4000-8000-000000000001', 5) $$,
  '42501', null, 'ratings are written only by rate_booking()');

reset role;
select pg_temp.as_user('72222222-2222-4222-8222-222222222222');
set local role authenticated;
select is((select count(*)::int from public.favourites), 0, 'another user sees none of them');

reset role;
select pg_temp.as_user('71111111-1111-4111-8111-111111111111');
set local role authenticated;
select is((select count(*)::int from public.favourites), 1, 'the learner sees their favourite');
delete from public.favourites where instructor_id = '7aaaaaaa-0000-4000-8000-000000000001';
select is((select count(*)::int from public.favourites), 0, 'and can remove it');

reset role;
select has_column('public', 'bookings', 'series_id', 'bookings link the weeks of a series');

select * from finish();
rollback;
