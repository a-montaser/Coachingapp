-- rate_booking() rules and who reads a rating (Phase 2 R2).
begin;
select plan(13);

-- L = learner, M = another learner, U = the instructor's sign-in.
insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('61111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000061', now(), now(), '{}', '{}'),
  ('62222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000062', now(), now(), '{}', '{}'),
  ('63333333-3333-4333-8333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000063', now(), now(), '{}', '{}');
insert into public.venues (id, name, area_id, lat, lng) values ('6aaaaaaa-0000-4000-8000-000000000009', 'Rating venue', 'zamalek', 30.06, 31.22);
insert into public.instructors (id, display_name, gender, verified, rating_avg, rating_count, user_id) values
  ('6aaaaaaa-0000-4000-8000-000000000001', 'Rated Coach', 'female', true, 4.5, 3, '63333333-3333-4333-8333-333333333333');
insert into public.offerings (id, instructor_id, discipline_id, venue_id, type, title, duration_min, price_egp, capacity) values
  ('6bbbbbbb-0000-4000-8000-000000000001', '6aaaaaaa-0000-4000-8000-000000000001', 'pottery', '6aaaaaaa-0000-4000-8000-000000000009', 'private', 'R private', 60, 200, 1);
insert into public.slots (id, offering_id, starts_at, ends_at, capacity, seats_taken) values
  ('6ccccccc-0000-4000-8000-000000000001', '6bbbbbbb-0000-4000-8000-000000000001', now() - interval '3 days', now() - interval '3 days' + interval '1 hour', 1, 1),
  ('6ccccccc-0000-4000-8000-000000000002', '6bbbbbbb-0000-4000-8000-000000000001', now() + interval '3 days', now() + interval '3 days' + interval '1 hour', 1, 1),
  ('6ccccccc-0000-4000-8000-000000000003', '6bbbbbbb-0000-4000-8000-000000000001', now() - interval '4 days', now() - interval '4 days' + interval '1 hour', 1, 0),
  ('6ccccccc-0000-4000-8000-000000000004', '6bbbbbbb-0000-4000-8000-000000000001', now() - interval '5 days', now() - interval '5 days' + interval '1 hour', 1, 1);
insert into public.bookings (ref, user_id, slot_id, seats, status, method, subtotal_egp, total_egp, refundable_until, same_day) values
  ('CFA-60001', '61111111-1111-4111-8111-111111111111', '6ccccccc-0000-4000-8000-000000000001', 1, 'confirmed', 'venue', 200, 200, now() - interval '4 days', false), -- done
  ('CFA-60002', '61111111-1111-4111-8111-111111111111', '6ccccccc-0000-4000-8000-000000000002', 1, 'confirmed', 'venue', 200, 200, now() + interval '2 days', false), -- upcoming
  ('CFA-60003', '61111111-1111-4111-8111-111111111111', '6ccccccc-0000-4000-8000-000000000003', 1, 'cancelled', 'venue', 200, 200, now() - interval '5 days', false), -- cancelled
  ('CFA-60004', '62222222-2222-4222-8222-222222222222', '6ccccccc-0000-4000-8000-000000000004', 1, 'confirmed', 'venue', 200, 200, now() - interval '6 days', false); -- M's

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;

select pg_temp.as_user('61111111-1111-4111-8111-111111111111');
set local role authenticated;
select throws_ok($$ select public.rate_booking('CFA-60001', 6) $$, 'P0001', 'bad_stars', 'more than 5 stars is refused');
select throws_ok($$ select public.rate_booking('CFA-60001', 0) $$, 'P0001', 'bad_stars', 'no stars is refused');
select throws_ok($$ select public.rate_booking('CFA-60004', 5) $$, 'P0001', 'not_found', 'nobody rates someone else''s booking');
select throws_ok($$ select public.rate_booking('CFA-60002', 5) $$, 'P0001', 'not_completed', 'an upcoming session cannot be rated');
select throws_ok($$ select public.rate_booking('CFA-60003', 5) $$, 'P0001', 'not_completed', 'a cancelled session cannot be rated');
select is((public.rate_booking('CFA-60001', 5, '  Lovely class  ')).body, 'Lovely class', 'a completed session is rated, text trimmed');
select throws_ok($$ select public.rate_booking('CFA-60001', 4) $$, 'P0001', 'already_rated', 'a session is rated once');
select is((select rating_avg from public.instructors where id = '6aaaaaaa-0000-4000-8000-000000000001'), 4.6::numeric, 'average moves from 4.5 over 3 to 4.6 over 4');
select is((select rating_count from public.instructors where id = '6aaaaaaa-0000-4000-8000-000000000001'), 4, 'the review count goes up by one');
select is((select count(*)::int from public.reviews), 1, 'the learner reads their rating');

reset role;
select pg_temp.as_user('62222222-2222-4222-8222-222222222222');
set local role authenticated;
select is((select count(*)::int from public.reviews), 0, 'another learner reads none');

reset role;
select pg_temp.as_user('63333333-3333-4333-8333-333333333333');
set local role authenticated;
select is((select body from public.reviews), 'Lovely class', 'the instructor reads the text ("Shared with … only")');

reset role;
set local role anon;
select throws_ok($$ select public.rate_booking('CFA-60001', 5) $$, '42501', null, 'signed out: cannot rate');

select * from finish();
rollback;
