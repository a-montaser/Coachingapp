-- App credit (D64): refunds become credit; refund credit never expires, other credit after 6 months;
-- credit is spent soonest-expiring first, only when the learner asks, and comes back on cancel or expiry.
begin;
select plan(20);

insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('31111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000031', now(), now(), '{}', '{}'),
  ('32222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000032', now(), now(), '{}', '{}');
insert into public.venues (id, name, area_id, lat, lng) values ('eaaaaaaa-0000-4000-8000-000000000001', 'Credit venue', 'zamalek', 30.06, 31.22);
insert into public.instructors (id, display_name, gender, verified) values ('eaaaaaaa-0000-4000-8000-000000000002', 'Credit Instructor', 'female', true);
insert into public.offerings (id, instructor_id, discipline_id, venue_id, type, title, duration_min, price_egp, capacity) values
  ('ebbbbbbb-0000-4000-8000-000000000001', 'eaaaaaaa-0000-4000-8000-000000000002', 'pottery', 'eaaaaaaa-0000-4000-8000-000000000001', 'private', 'C private', 60, 200, 1);
insert into public.slots (id, offering_id, starts_at, ends_at, capacity)
select ('eccccccc-0000-4000-8000-00000000000' || n)::uuid, 'ebbbbbbb-0000-4000-8000-000000000001',
       now() + (48 + n) * interval '1 hour', now() + (49 + n) * interval '1 hour', 1
  from generate_series(1, 6) n;

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;
create function pg_temp.balance() returns int language sql as $$ select balance_egp from public.my_credit $$;

-- ---------- Granting (ops, service role) ----------
select public.grant_credit('31111111-1111-4111-8111-111111111111', 150, 'refund');
select public.grant_credit('31111111-1111-4111-8111-111111111111', 100, 'goodwill');
insert into public.credits (user_id, source, amount_egp, remaining_egp, expires_at)
values ('31111111-1111-4111-8111-111111111111', 'promo', 500, 500, now() - interval '1 day'); -- already expired
select is((select expires_at from public.credits where source = 'refund' and user_id = '31111111-1111-4111-8111-111111111111'), null, 'refund credit never expires');
select ok((select expires_at between now() + interval '179 days' and now() + interval '185 days' from public.credits where source = 'goodwill'), 'other credit expires after 6 months');
select throws_ok($$insert into public.credits (user_id, source, amount_egp, remaining_egp) values ('31111111-1111-4111-8111-111111111111', 'promo', 10, 10)$$,
  '23514', null, 'non-refund credit must have an expiry');

select pg_temp.as_user('31111111-1111-4111-8111-111111111111');
set local role authenticated;
select is(pg_temp.balance(), 250, 'balance counts unexpired credit only');
select throws_ok($$select public.grant_credit('31111111-1111-4111-8111-111111111111', 1000, 'refund')$$, '42501', null, 'learners cannot grant themselves credit');

-- ---------- Spending ----------
select is((public.book('eccccccc-0000-4000-8000-000000000001', 1, null, 'card')).credit_egp, 0, 'credit is not used unless the learner asks');
select is((public.book('eccccccc-0000-4000-8000-000000000002', 1, null, 'venue', null, null, true)).credit_egp, 0, 'pay at the venue never uses credit');
select is((public.book('eccccccc-0000-4000-8000-000000000003', 1, null, 'card', null, null, true)).status, 'confirmed', 'credit covering the whole price confirms at once');
select is(pg_temp.balance(), 50, '200 EGP taken from the balance');
reset role;
select is((select remaining_egp from public.credits where source = 'goodwill'), 0, 'the soonest-expiring credit is spent first');

-- ---------- Cancelling a credit-paid booking > 24 h out ----------
select pg_temp.as_user('31111111-1111-4111-8111-111111111111');
set local role authenticated;
select is((public.cancel_booking((select ref from public.bookings where slot_id = 'eccccccc-0000-4000-8000-000000000003'))).refund_egp, 200, 'the whole price comes back');
select is(pg_temp.balance(), 250, 'as credit, on the balance');
reset role;
select is((select remaining_egp from public.credits where source = 'goodwill'), 100, 'credit goes back to the grant it came from (keeps its expiry)');

-- ---------- Part credit, part card ----------
select public.grant_credit('32222222-2222-4222-8222-222222222222', 50, 'refund');
select pg_temp.as_user('32222222-2222-4222-8222-222222222222');
set local role authenticated;
select is((public.book('eccccccc-0000-4000-8000-000000000004', 1, null, 'card', null, null, true)).status, 'awaiting_payment', 'the card pays what credit does not cover');
reset role;
insert into public.payments (booking_id, provider, provider_ref, amount_egp)
select id, 'fake', 'pay-credit-4', total_egp - credit_egp from public.bookings where slot_id = 'eccccccc-0000-4000-8000-000000000004';
select is((public.record_payment('pay-credit-4', 'paid')).status, 'confirmed', '150 by card + 50 credit confirms');
select pg_temp.as_user('32222222-2222-4222-8222-222222222222');
set local role authenticated;
select is((public.cancel_booking((select ref from public.bookings where slot_id = 'eccccccc-0000-4000-8000-000000000004'))).refund_egp, 200, 'cancel > 24 h: card and credit both come back');
select is(pg_temp.balance(), 200, 'as credit only: 50 returned + 150 new refund credit');
select is((select count(*)::int from public.credits), 2, 'a learner sees only their own credit');

-- ---------- An expired hold gives its credit back ----------
select is((public.book('eccccccc-0000-4000-8000-000000000005', 1, null, 'card', null, null, true)).credit_egp, 200, 'credit held with the seat');
reset role;
update public.bookings set hold_expires_at = now() - interval '1 minute', status = 'awaiting_payment'
 where slot_id = 'eccccccc-0000-4000-8000-000000000005';
select public.release_expired_holds();
select pg_temp.as_user('32222222-2222-4222-8222-222222222222');
set local role authenticated;
select is(pg_temp.balance(), 200, 'expired hold: credit back on the balance');

select * from finish();
rollback;
