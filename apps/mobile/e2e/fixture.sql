-- CI only (R10, T20): pin the two bookings the Maestro journey makes, so its refund checks don't
-- depend on the day or hour the job runs. Applied after `supabase start` seeds the local database.

-- Wheel-throwing taster: a single date, three days out at 11:00 Cairo, so cancelling it is refunded.
delete from public.slots
 where offering_id = (select id from public.offerings where title = 'Wheel-throwing taster');
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, s.at, s.at + make_interval(mins => o.duration_min), o.capacity
  from public.offerings o
 cross join lateral (select (((current_date + 3)::date + time '11:00') at time zone 'Africa/Cairo') as at) s
 where o.title = 'Wheel-throwing taster';

-- 1:1 oud: an open time two hours from now, so Dina's soonest time is inside 24 h and cancelling it
-- isn't refunded.
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, s.at, s.at + make_interval(mins => o.duration_min), 1
  from public.offerings o
 cross join lateral (select date_trunc('minute', now()) + interval '2 hours' as at) s
 where o.title = '1:1 oud';
