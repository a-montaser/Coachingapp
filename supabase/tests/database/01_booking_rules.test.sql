-- Booking rules, refunds, reschedule and RLS (requirements R1, R6.3, R8.4, R8.5).
-- Times are relative to now(); nothing depends on the seed except the areas table.
begin;
select plan(30);

-- ---------- Fixtures (as the owner) ----------
insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('11111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000001', now(), now(), '{}', '{}'),
  ('22222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000002', now(), now(), '{}', '{}');

insert into public.venues (id, name, area_id, lat, lng) values ('aaaaaaaa-0000-4000-8000-000000000001', 'Test venue', 'zamalek', 30.06, 31.22);
insert into public.instructors (id, display_name, gender, verified) values ('aaaaaaaa-0000-4000-8000-000000000002', 'Test Instructor', 'female', true);
insert into public.offerings (id, instructor_id, discipline_id, venue_id, type, title, duration_min, price_egp, capacity, min_age, max_age) values
  ('bbbbbbbb-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000002', 'pottery', 'aaaaaaaa-0000-4000-8000-000000000001', 'workshop', 'T workshop', 120, 100, 3, null, null),
  ('bbbbbbbb-0000-4000-8000-000000000002', 'aaaaaaaa-0000-4000-8000-000000000002', 'pottery', 'aaaaaaaa-0000-4000-8000-000000000001', 'private', 'T private', 60, 200, 1, null, null),
  ('bbbbbbbb-0000-4000-8000-000000000003', 'aaaaaaaa-0000-4000-8000-000000000002', 'pottery', 'aaaaaaaa-0000-4000-8000-000000000001', 'kids', 'T kids', 45, 150, 4, 7, 12);
insert into public.slots (id, offering_id, starts_at, ends_at, capacity) values
  ('cccccccc-0000-4000-8000-000000000001', 'bbbbbbbb-0000-4000-8000-000000000001', now() + interval '48 hours', now() + interval '50 hours', 3), -- workshop
  ('cccccccc-0000-4000-8000-000000000002', 'bbbbbbbb-0000-4000-8000-000000000002', now() + interval '48 hours', now() + interval '49 hours', 1), -- private A
  ('cccccccc-0000-4000-8000-000000000003', 'bbbbbbbb-0000-4000-8000-000000000002', now() + interval '72 hours', now() + interval '73 hours', 1), -- private B
  ('cccccccc-0000-4000-8000-000000000004', 'bbbbbbbb-0000-4000-8000-000000000002', now() + interval '2 hours', now() + interval '3 hours', 1),   -- inside 24 h
  ('cccccccc-0000-4000-8000-000000000005', 'bbbbbbbb-0000-4000-8000-000000000003', now() + interval '48 hours', now() + interval '49 hours', 4), -- kids
  ('cccccccc-0000-4000-8000-000000000006', 'bbbbbbbb-0000-4000-8000-000000000002', now() - interval '1 hour', now(), 1),                        -- past
  ('cccccccc-0000-4000-8000-000000000007', 'bbbbbbbb-0000-4000-8000-000000000002', now() + interval '30 minutes', now() + interval '90 minutes', 1), -- too soon
  ('cccccccc-0000-4000-8000-000000000008', 'bbbbbbbb-0000-4000-8000-000000000002', now() + interval '96 hours', now() + interval '97 hours', 1); -- private C
insert into public.family_members (id, user_id, first_name, age) values
  ('dddddddd-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'Ali', 9),
  ('dddddddd-0000-4000-8000-000000000002', '11111111-1111-4111-8111-111111111111', 'Sara', 13);

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;

-- ---------- book() as user 1 ----------
select pg_temp.as_user('11111111-1111-4111-8111-111111111111');
set local role authenticated;

select is((public.book('cccccccc-0000-4000-8000-000000000001', 2, null, 'card')).status, 'awaiting_payment', 'card booking holds seats until paid');
select is((select total_egp from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000001'), 200, 'price is offering price × seats');
select ok((select hold_expires_at between now() + interval '4 minutes' and now() + interval '6 minutes' from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000001'), 'card hold lasts 5 minutes (D29)');
select is((select seats_taken from public.slots where id = 'cccccccc-0000-4000-8000-000000000001'), 2, 'seats are taken atomically');
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000001', 2, null, 'card') $$, 'P0001', 'no_seats', 'cannot overbook');
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000001', 4, null, 'card') $$, 'P0001', 'too_many_seats', 'workshop max 3 seats (§9.4)');
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000002', 2, null, 'card') $$, 'P0001', 'bad_seats', 'private is one seat');
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000005', 1, null, 'card') $$, 'P0001', 'child_required', 'kids needs a child');
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000005', 1, 'dddddddd-0000-4000-8000-000000000002', 'card') $$, 'P0001', 'child_age', 'child must fit the age range');
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000006', 1, null, 'card') $$, 'P0001', 'slot_past', 'past slots are not bookable');
select case when public.cairo_date(now() + interval '30 minutes') = public.cairo_date(now())
  then throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000007', 1, null, 'card') $$, 'P0001', 'too_soon', 'today needs 60 minutes notice (§9.6)')
  else pass('too_soon skipped: run is within 30 minutes of midnight in Cairo') end;
select throws_ok($$ select public.book('cccccccc-0000-4000-8000-000000000002', 1, null, 'card', 'NOPE') $$, 'P0001', 'promo_invalid', 'invalid promo is rejected');

select is((public.book('cccccccc-0000-4000-8000-000000000002', 1, null, 'venue', 'cfa10')).total_egp, 180, 'CFA10 takes 10% off (§9.8), case-insensitive');
select is((select status from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000002'), 'confirmed', 'pay at venue confirms at once');
select is((public.book('cccccccc-0000-4000-8000-000000000005', 1, 'dddddddd-0000-4000-8000-000000000001', 'card')).status, 'pending', 'kids wait for confirmation, no charge (D29)');
select throws_ok($$ insert into public.bookings (ref, user_id, slot_id, seats, status, method, subtotal_egp, total_egp, refundable_until, same_day)
  values ('CFA-00000', '11111111-1111-4111-8111-111111111111', 'cccccccc-0000-4000-8000-000000000003', 1, 'confirmed', 'venue', 0, 0, now(), false) $$,
  '42501', null, 'no direct writes to bookings');
select throws_ok($$ select public.approve_booking((select ref from public.bookings where status = 'pending')) $$, '42501', null, 'learners cannot approve');

-- ---------- RLS between users ----------
reset role;
select set_config('test.u1_ref', (select ref from public.bookings order by created_at limit 1), true);
select pg_temp.as_user('22222222-2222-4222-8222-222222222222');
set local role authenticated;
select is((select count(*)::int from public.bookings), 0, 'user 2 sees none of user 1''s bookings');
select is((select count(*)::int from public.family_members), 0, 'user 2 sees none of user 1''s family');
select throws_ok(format('select public.cancel_booking(%L)', current_setting('test.u1_ref')), 'P0001', 'not_found', 'user 2 cannot cancel user 1''s booking');

-- ---------- Refunds (§9.1) ----------
reset role;
-- A paid card booking > 24 h out, and a paid one inside 24 h.
select pg_temp.as_user('11111111-1111-4111-8111-111111111111');
set local role authenticated;
do $$ begin
  perform public.book('cccccccc-0000-4000-8000-000000000003', 1, null, 'card');
  perform public.book('cccccccc-0000-4000-8000-000000000004', 1, null, 'card');
end $$;
reset role;
insert into public.payments (booking_id, provider, provider_ref, amount_egp)
select id, 'fake', 'pay-' || ref, total_egp from public.bookings where slot_id in ('cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000004');
do $$ declare r record; begin
  for r in select ref from public.bookings where slot_id in ('cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000004') loop
    perform public.record_payment('pay-' || r.ref, 'paid');
  end loop;
end $$;
select is((select status from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000003'), 'confirmed', 'a paid card booking is confirmed');

select pg_temp.as_user('11111111-1111-4111-8111-111111111111');
set local role authenticated;
select is((public.cancel_booking((select ref from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000003'))).refund_egp, 200, '> 24 h before: full refund');
select is((public.cancel_booking((select ref from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000004'))).refund_egp, 0, 'inside 24 h: no refund');
select is((public.cancel_booking((select ref from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000002'))).refund_egp, 0, 'pay at venue: nothing refunded');
select is((select seats_taken from public.slots where id = 'cccccccc-0000-4000-8000-000000000003'), 0, 'cancelling frees the seat');
reset role;
select is((select count(*)::int from public.refunds where status = 'queued'), 1, 'exactly one refund is queued');

-- ---------- Reschedule (§9.3, D29) ----------
select pg_temp.as_user('11111111-1111-4111-8111-111111111111');
set local role authenticated;
do $$ begin perform public.book('cccccccc-0000-4000-8000-000000000003', 1, null, 'venue'); end $$;
select is((public.reschedule_booking((select ref from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000003' and status = 'confirmed'), 'cccccccc-0000-4000-8000-000000000008')).slot_id,
  'cccccccc-0000-4000-8000-000000000008'::uuid, 'reschedule moves the same booking');
select throws_ok(format('select public.reschedule_booking(%L, %L)',
  (select ref from public.bookings where slot_id = 'cccccccc-0000-4000-8000-000000000008'), 'cccccccc-0000-4000-8000-000000000001'),
  'P0001', 'other_offering', 'reschedule stays within the offering');

-- ---------- Expired holds free their seats ----------
reset role;
update public.bookings set hold_expires_at = now() - interval '1 minute' where slot_id = 'cccccccc-0000-4000-8000-000000000001';
select is((select seats_free from public.slot_availability where id = 'cccccccc-0000-4000-8000-000000000001'), 3, 'an expired hold no longer counts');
select pg_temp.as_user('22222222-2222-4222-8222-222222222222');
set local role authenticated;
select is((public.book('cccccccc-0000-4000-8000-000000000001', 3, null, 'venue')).status, 'confirmed', 'the freed seats can be booked');

select * from finish();
rollback;
