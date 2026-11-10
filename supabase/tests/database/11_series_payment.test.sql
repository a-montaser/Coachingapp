-- One checkout for a weekly series (Phase 2 R5.3): paid confirms every week; failed keeps the holds; a week
-- cancelled while the payment was in flight gets its own share back as credit. Single bookings unchanged.
begin;
select plan(6);

insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('b1111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000111', now(), now(), '{}', '{}');
insert into public.venues (id, name, area_id, lat, lng) values ('baaaaaaa-0000-4000-8000-000000000009', 'Pay venue', 'zamalek', 30.06, 31.22);
insert into public.instructors (id, display_name, gender, verified) values ('baaaaaaa-0000-4000-8000-000000000001', 'Pay Coach', 'male', true);
insert into public.offerings (id, instructor_id, discipline_id, venue_id, type, title, duration_min, price_egp, capacity) values
  ('bbbbbbbb-1100-4000-8000-000000000001', 'baaaaaaa-0000-4000-8000-000000000001', 'pottery', 'baaaaaaa-0000-4000-8000-000000000009', 'private', 'Pay private', 60, 400, 1);
create function pg_temp.week(base timestamptz, k int) returns timestamptz language sql as $$
  select ((date_trunc('minute', base at time zone 'Africa/Cairo') + make_interval(days => 7 * k)) at time zone 'Africa/Cairo')
$$;
insert into public.slots (id, offering_id, starts_at, ends_at, capacity)
select ('bccccccc-1100-4000-8000-00000000000' || k)::uuid, 'bbbbbbbb-1100-4000-8000-000000000001',
       pg_temp.week(now() + interval '4 days', k), pg_temp.week(now() + interval '4 days', k) + interval '1 hour', 1
  from generate_series(0, 3) k;

select set_config('request.jwt.claims', json_build_object('sub', 'b1111111-1111-4111-8111-111111111111', 'role', 'authenticated')::text, true);
set local role authenticated;
select public.book_series('bccccccc-1100-4000-8000-000000000000', 2, 'card'); -- weeks 0–1, held
reset role;

-- As create-checkout does: one payment for the series, from its first week.
insert into public.payments (booking_id, provider, provider_ref, amount_egp, series_id)
select b.id, 'fake', 'series-fail', 800, b.series_id from public.bookings b where b.slot_id = 'bccccccc-1100-4000-8000-000000000000';
select public.record_payment('series-fail', 'failed');
select is((select count(*)::int from public.bookings where series_id is not null and status = 'awaiting_payment'), 2,
  'a failed payment keeps both holds for a retry');

insert into public.payments (booking_id, provider, provider_ref, amount_egp, series_id)
select b.id, 'fake', 'series-paid', 800, b.series_id from public.bookings b where b.slot_id = 'bccccccc-1100-4000-8000-000000000000';
select is((public.record_payment('series-paid', 'paid')).status, 'confirmed', 'paid: the first week is confirmed');
select is((select count(*)::int from public.bookings where series_id is not null and status = 'confirmed'), 2,
  'and so is every other week of the series');
select is((public.record_payment('series-paid', 'paid')).status, 'confirmed', 'a repeated webhook changes nothing');

-- A second series: week 3 is cancelled while its payment is in flight.
set local role authenticated;
select public.book_series('bccccccc-1100-4000-8000-000000000002', 2, 'card'); -- weeks 2–3
select public.cancel_booking((select ref from public.my_bookings where slot_id = 'bccccccc-1100-4000-8000-000000000003'));
reset role;
insert into public.payments (booking_id, provider, provider_ref, amount_egp, series_id)
select b.id, 'fake', 'series-late', 800, b.series_id from public.bookings b where b.slot_id = 'bccccccc-1100-4000-8000-000000000002';
select public.record_payment('series-late', 'paid');
select results_eq($$ select status, refund_egp from public.bookings where slot_id in
    ('bccccccc-1100-4000-8000-000000000002', 'bccccccc-1100-4000-8000-000000000003') order by slot_id $$,
  $$ values ('confirmed'::text, null::int), ('cancelled', 400) $$, 'the paid week is confirmed; the cancelled one gets its 400 back');
select is((select sum(remaining_egp)::int from public.credits where user_id = 'b1111111-1111-4111-8111-111111111111'), 400,
  'as never-expiring refund credit');

select * from finish();
rollback;
