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

-- Phase 2 (R8.1): Nour's lesson times become just two 1:1 padel times a week apart, four and eleven days
-- out at 10:00 Cairo, so the journey books them as a weekly series and cancelling every week is refunded.
delete from public.slots s using public.offerings o, public.instructors i
 where s.offering_id = o.id and o.instructor_id = i.id and i.display_name = 'Nour El-Sayed' and o.type <> 'workshop'
   and not exists (select 1 from public.bookings b where b.slot_id = s.id);
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, s.at, s.at + make_interval(mins => o.duration_min), 1
  from public.offerings o
  join public.instructors i on i.id = o.instructor_id and i.display_name = 'Nour El-Sayed'
 cross join lateral (values (4), (11)) w(days)
 cross join lateral (select (((current_date + w.days)::date + time '10:00') at time zone 'Africa/Cairo') as at) s
 where o.type = 'private';
