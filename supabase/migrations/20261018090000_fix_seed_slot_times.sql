-- Data fix, no schema change: the first hosted seed stored session times shifted by the Cairo offset (DECISIONS D30).
-- Regenerates every slot that has no booking with the corrected seed logic. On a fresh database (CI, local)
-- this runs before the seed, finds no offerings, and does nothing.
delete from public.slots s where not exists (select 1 from public.bookings b where b.slot_id = s.id);
create temporary table weekly (title text, dow int, at time);
insert into weekly values
  ('Wheel-throwing taster', 6, '11:00'),
  ('Hand-building: a mug', 2, '19:00'),
  ('Glazing day', 6, '11:00'),
  ('Watercolour on the Nile', 6, '16:30'),
  ('Photo walk on Al-Muizz Street', 0, '08:00'),
  ('Ruq''ah calligraphy basics', 0, '18:00'),
  ('IGCSE Maths revision group', 1, '18:00'),
  ('IGCSE Maths revision group', 3, '18:00'),
  ('French conversation café', 0, '19:00');

-- The next three occurrences of each weekly session.
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, start_at, start_at + make_interval(mins => o.duration_min), o.capacity
from weekly w
join public.offerings o on o.title = w.title
cross join lateral (
  -- d::date + time is a Cairo wall-clock time; `at time zone` turns it into the right instant.
  select ((d::date + w.at) at time zone 'Africa/Cairo') as start_at
  from generate_series(current_date + 1, current_date + 21, interval '1 day') d
  where extract(dow from d) = w.dow
  order by d limit 3
) s;

-- Everything else: 14 days of slots at 09:00, 17:30 and 19:00 Cairo (examples from §5, §7.8),
-- none on Fridays ("No times on Friday", §7.8).
insert into public.slots (offering_id, starts_at, ends_at, capacity)
select o.id, start_at, start_at + make_interval(mins => o.duration_min), o.capacity
from public.offerings o
cross join generate_series(current_date, current_date + 13, interval '1 day') d
cross join (values (time '09:00'), (time '17:30'), (time '19:00')) h(at)
cross join lateral (select ((d::date + h.at) at time zone 'Africa/Cairo') as start_at) s
where (o.type in ('private', 'kids') or (o.type = 'group' and o.title = 'Small group'))
  and extract(dow from d) <> 5
  and start_at > now();
drop table weekly;
