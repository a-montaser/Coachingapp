#!/bin/sh
# CI only (Phase 2 R8.1), run in the background beside the Maestro journey: plays the other side.
# 1. Once the journey's learner (Salma, +20 100 999 0001) exists, gives her a finished 1:1 with Nour to rate.
# 2. Answers each message she sends Nour, as Nour (a demo instructor with a sign-in, D69).
SQL=$(cat <<'SQL'
with salma as (select id from auth.users where phone = '201009990001'),
nour as (select id, user_id from public.instructors where display_name = 'Nour El-Sayed'),
past as (
  insert into public.slots (offering_id, starts_at, ends_at, capacity, seats_taken)
  select o.id, now() - interval '3 days', now() - interval '3 days' + interval '1 hour', 1, 1
    from public.offerings o, nour
   where o.instructor_id = nour.id and o.type = 'private'
     and exists (select 1 from salma)
     and not exists (select 1 from public.bookings where ref = 'CFA-99001')
   limit 1
   returning id, starts_at
)
insert into public.bookings (ref, user_id, slot_id, seats, status, method, subtotal_egp, total_egp, refundable_until, same_day)
select 'CFA-99001', salma.id, past.id, 1, 'confirmed', 'card', 650, 650, past.starts_at - interval '24 hours', false
  from salma, past;

insert into public.messages (thread_id, sender_id, body)
select t.id, n.user_id, 'Yes, Cedar Court is covered. See you on court!'
  from public.threads t
  join public.instructors n on n.id = t.instructor_id and n.display_name = 'Nour El-Sayed'
  join auth.users u on u.id = t.learner_id and u.phone = '201009990001'
 where exists (select 1 from public.messages m where m.thread_id = t.id and m.sender_id = t.learner_id)
   and not exists (select 1 from public.messages m where m.thread_id = t.id and m.sender_id = n.user_id);
SQL
)
for i in $(seq 1 1800); do
  psql "$DB_URL" -q -c "$SQL" > /dev/null 2>> e2e-output/helper.log
  sleep 2
done
