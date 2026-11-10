-- Profile → App credit history (Phase 2 R7): your grants and spends only; a spend handed back disappears.
begin;
select plan(5);

insert into auth.users (id, instance_id, aud, role, phone, created_at, updated_at, raw_app_meta_data, raw_user_meta_data) values
  ('a1111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000101', now(), now(), '{}', '{}'),
  ('a2222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '201000000102', now(), now(), '{}', '{}');
insert into public.venues (id, name, area_id, lat, lng) values ('aaaaaaaa-1000-4000-8000-000000000009', 'Credit venue', 'zamalek', 30.06, 31.22);
insert into public.instructors (id, display_name, gender, verified) values ('aaaaaaaa-1000-4000-8000-000000000001', 'Credit Coach', 'female', true);
insert into public.offerings (id, instructor_id, discipline_id, venue_id, type, title, duration_min, price_egp, capacity) values
  ('abbbbbbb-1000-4000-8000-000000000001', 'aaaaaaaa-1000-4000-8000-000000000001', 'pottery', 'aaaaaaaa-1000-4000-8000-000000000009', 'private', 'C private', 60, 300, 1);
insert into public.slots (id, offering_id, starts_at, ends_at, capacity) values
  ('accccccc-1000-4000-8000-000000000001', 'abbbbbbb-1000-4000-8000-000000000001', now() + interval '5 days', now() + interval '5 days 1 hour', 1),
  ('accccccc-1000-4000-8000-000000000002', 'abbbbbbb-1000-4000-8000-000000000001', now() + interval '6 days', now() + interval '6 days 1 hour', 1);
select public.grant_credit('a1111111-1111-4111-8111-111111111111', 500, 'goodwill');
select public.grant_credit('a2222222-2222-4222-8222-222222222222', 900, 'goodwill');

create function pg_temp.as_user(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
$$;

select pg_temp.as_user('a1111111-1111-4111-8111-111111111111');
set local role authenticated;
-- Credit pays the whole 300 of the first booking, and the venue one isn't paid with credit.
select public.book('accccccc-1000-4000-8000-000000000001', 1, null, 'card', null, null, true);

select results_eq($$ select kind, source, amount_egp from public.my_credit_history order by kind $$,
  $$ values ('grant'::text, 'goodwill'::text, 500), ('spend', null, 300) $$, 'my grant and what it paid for');
select is((select remaining_egp from public.my_credit_history where kind = 'grant'), 200, 'the grant shows what is left');

-- Cancelling more than 24 h out hands the credit back: the spend leaves the history.
select public.cancel_booking((select ref from public.my_bookings where slot_id = 'accccccc-1000-4000-8000-000000000001'));
select is((select count(*)::int from public.my_credit_history where kind = 'spend'), 0, 'a credit handed back is no longer a spend');
select is((select remaining_egp from public.my_credit_history where kind = 'grant'), 500, 'and the grant is whole again');

reset role;
select pg_temp.as_user('a2222222-2222-4222-8222-222222222222');
set local role authenticated;
select results_eq($$ select amount_egp from public.my_credit_history $$, $$ values (900) $$, 'another user sees only their own');

select * from finish();
rollback;
