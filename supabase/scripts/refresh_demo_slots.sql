-- Refresh the demo class times on the hosted dev project (data only, no schema change).
-- The seed's times are relative to the day it ran, so they run out after about two weeks.
-- Same patterns as supabase/seed.sql: each weekly group's next three dates, and 14 days of lessons
-- at 09:00, 17:30 and 19:00 Cairo (no Fridays). Never duplicates a time; bookings are untouched.
-- Run: npx supabase db query --linked -f supabase/scripts/refresh_demo_slots.sql

with weekly(title, dow, at) as (values
  ('Wheel-throwing taster', 6, time '11:00'),
  ('Hand-building: a mug', 2, time '19:00'),
  ('Glazing day', 6, time '11:00'),
  ('Watercolour on the Nile', 6, time '16:30'),
  ('Photo walk on Al-Muizz Street', 0, time '08:00'),
  ('Ruq''ah calligraphy basics', 0, time '18:00'),
  ('IGCSE Maths revision group', 1, time '18:00'),
  ('IGCSE Maths revision group', 3, time '18:00'),
  ('French conversation café', 0, time '19:00')
),
groups as (
  select o.id, s.start_at, o.duration_min, o.capacity
    from weekly w
    join public.offerings o on o.title = w.title
   cross join lateral (
     select ((d::date + w.at) at time zone 'Africa/Cairo') as start_at
       from generate_series(current_date + 1, current_date + 21, interval '1 day') d
      where extract(dow from d) = w.dow
      order by d limit 3
   ) s
),
lessons as (
  select o.id, s.start_at, o.duration_min, o.capacity
    from public.offerings o
   cross join generate_series(current_date, current_date + 13, interval '1 day') d
   cross join (values (time '09:00'), (time '17:30'), (time '19:00')) h(at)
   cross join lateral (select ((d::date + h.at) at time zone 'Africa/Cairo') as start_at) s
   where (o.type in ('private', 'kids') or (o.type = 'group' and o.title = 'Small group'))
     and extract(dow from d) <> 5
     and s.start_at > now()
)
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select n.id, n.start_at, n.start_at + make_interval(mins => n.duration_min), n.capacity
  from (select * from groups union all select * from lessons) n
 where not exists (select 1 from public.slots s where s.offering_id = n.id and s.starts_at = n.start_at);
