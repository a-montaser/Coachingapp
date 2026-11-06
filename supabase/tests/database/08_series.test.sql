-- Weekly series: book_series() all-or-nothing, cancel this week / every week, reschedule leaves (Phase 2 R5).
begin;
select plan(18);

-- L = learner, L2 = someone who takes one of the weeks first.
insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('81111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000081', now(), now(), '{}', '{}'),
  ('82222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000082', now(), now(), '{}', '{}');
insert into public.venues (id, name, area_id, lat, lng) values ('8aaaaaaa-0000-4000-8000-000000000009', 'Series venue', 'zamalek', 30.06, 31.22);
insert into public.instructors (id, display_name, gender, verified) values ('8aaaaaaa-0000-4000-8000-000000000001', 'Series Coach', 'male', true);
insert into public.offerings (id, instructor_id, discipline_id, venue_id, type, title, duration_min, price_egp, capacity) values
  ('8bbbbbbb-0000-4000-8000-000000000001', '8aaaaaaa-0000-4000-8000-000000000001', 'pottery', '8aaaaaaa-0000-4000-8000-000000000009', 'private', 'P weekly', 60, 200, 1),
  ('8bbbbbbb-0000-4000-8000-000000000002', '8aaaaaaa-0000-4000-8000-000000000001', 'pottery', '8aaaaaaa-0000-4000-8000-000000000009', 'private', 'Q weekly', 60, 200, 1),
  ('8bbbbbbb-0000-4000-8000-000000000003', '8aaaaaaa-0000-4000-8000-000000000001', 'pottery', '8aaaaaaa-0000-4000-8000-000000000009', 'workshop', 'W', 120, 300, 8);

-- P: 4 weekly slots from 3 days out (weeks 0–3); Q: 3 weekly slots from 12 hours out (week 0 is inside 24 h).
-- Weeks are the same Cairo wall-clock time, as book_series() looks for them.
create function pg_temp.week(base timestamptz, k int) returns timestamptz language sql as $$
  select ((date_trunc('minute', base at time zone 'Africa/Cairo') + make_interval(days => 7 * k)) at time zone 'Africa/Cairo')
$$;
insert into public.slots (id, offering_id, starts_at, ends_at, capacity)
select ('8ccccccc-0000-4000-8000-00000000000' || k)::uuid, '8bbbbbbb-0000-4000-8000-000000000001',
       pg_temp.week(now() + interval '3 days', k), pg_temp.week(now() + interval '3 days', k) + interval '1 hour', 1
  from generate_series(0, 3) k;
insert into public.slots (id, offering_id, starts_at, ends_at, capacity)
select ('8ddddddd-0000-4000-8000-00000000000' || k)::uuid, '8bbbbbbb-0000-4000-8000-000000000002',
       pg_temp.week(now() + interval '12 hours', k), pg_temp.week(now() + interval '12 hours', k) + interval '1 hour', 1
  from generate_series(0, 2) k;
insert into public.slots (id, offering_id, starts_at, ends_at, capacity) values
  ('8eeeeeee-0000-4000-8000-000000000001', '8bbbbbbb-0000-4000-8000-000000000003', now() + interval '3 days', now() + interval '3 days 2 hours', 8);
select public.grant_credit('81111111-1111-4111-8111-111111111111', 10000, 'goodwill');

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;

-- ---------- Booking a series ----------
select pg_temp.as_user('82222222-2222-4222-8222-222222222222');
set local role authenticated;
select lives_ok($$ select public.book('8ccccccc-0000-4000-8000-000000000002', 1, null, 'venue') $$, 'someone else takes week 2');

reset role;
select pg_temp.as_user('81111111-1111-4111-8111-111111111111');
set local role authenticated;
select throws_ok($$ select public.book_series('8ccccccc-0000-4000-8000-000000000000', 1, 'venue') $$, 'P0001', 'bad_weeks', 'a series is at least 2 weeks');
select throws_ok($$ select public.book_series('8ccccccc-0000-4000-8000-000000000000', 9, 'venue') $$, 'P0001', 'bad_weeks', 'and at most 8');
select throws_ok($$ select public.book_series('8eeeeeee-0000-4000-8000-000000000001', 2, 'venue') $$, 'P0001', 'series_type', 'workshops do not repeat weekly');
select throws_ok($$ select public.book_series('8ccccccc-0000-4000-8000-000000000003', 2, 'venue') $$, 'P0001', 'series_week_unavailable', 'a week with no session at that time stops the series');
select throws_ok($$ select public.book_series('8ccccccc-0000-4000-8000-000000000000', 4, 'venue') $$, 'P0001', 'series_week_unavailable', 'a full week stops the series');
select is((select count(*)::int from public.bookings), 0, 'all or nothing: no week was booked');
select is((select seats_taken from public.slots where id = '8ccccccc-0000-4000-8000-000000000000'), 0, 'and week 0''s seat is free again');
select throws_ok($$ select public.book_series('8ccccccc-0000-4000-8000-000000000000', 2, 'venue', 'NOPE') $$, 'P0001', 'promo_invalid', 'other errors keep their own code');

select is((select count(*)::int from public.book_series('8ccccccc-0000-4000-8000-000000000000', 2, 'venue', 'cfa10')), 2, 'two weeks booked');
select is((select count(distinct series_id)::int || '/' || count(distinct ref)::int from public.bookings where series_id is not null), '1/2',
  'one series, each week its own booking and ref');
select is((select array_agg(total_egp) from public.bookings where series_id is not null), array[180, 180], 'the promo applies to every week');

-- ---------- Cancel this week only, reschedule ----------
select is((public.cancel_booking((select ref from public.my_bookings where slot_id = '8ccccccc-0000-4000-8000-000000000000'))).status, 'cancelled', 'this week only…');
select is((select status from public.bookings where slot_id = '8ccccccc-0000-4000-8000-000000000001'), 'confirmed', '…leaves next week booked');
select is((public.reschedule_booking((select ref from public.my_bookings where slot_id = '8ccccccc-0000-4000-8000-000000000001'), '8ccccccc-0000-4000-8000-000000000003')).series_id,
  null, 'a rescheduled week leaves the series');

-- ---------- Cancel every week, each under its own 24-hour rule ----------
select is((select count(*)::int from public.book_series('8ddddddd-0000-4000-8000-000000000000', 3, 'card', null, null, true)), 3, 'three weeks paid with credit');
select is((public.cancel_booking((select ref from public.my_bookings where slot_id = '8ddddddd-0000-4000-8000-000000000000'), null, true)).refund_egp,
  0, 'every week: this week is inside 24 h, nothing back');
select results_eq($$ select status, refund_egp from public.bookings b join public.slots s on s.id = b.slot_id
                     where s.offering_id = '8bbbbbbb-0000-4000-8000-000000000002' order by s.starts_at $$,
  $$ values ('cancelled'::text, 0), ('cancelled', 200), ('cancelled', 200) $$, 'later weeks are cancelled and come back as credit');

select * from finish();
rollback;
