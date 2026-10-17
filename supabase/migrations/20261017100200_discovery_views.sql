-- Read models for Home and Explore (requirements R5). Public catalogue data only.

-- Earliest instant a slot can still be booked (§9.6: future, and today at least 60 minutes ahead).
create function public.bookable_after() returns timestamptz
language sql stable as $$ select now() + interval '60 minutes' $$;

-- One row per instructor × discipline: the card shown on Home, Explore and the map later.
-- "From" = the lowest published price (§9.7); next = the soonest slot with a free seat.
create view public.instructor_cards as
select
  i.id, i.display_name, i.gender, i.years, i.certification, i.rating_avg, i.rating_count, i.reply_label,
  i.photo_path, i.bio,
  d.id as discipline_id, d.name_en as discipline_en, d.name_ar as discipline_ar, d.category_id,
  idis.levels,
  (select min(o.price_egp) from public.offerings o
    where o.instructor_id = i.id and o.discipline_id = d.id and o.published) as from_price,
  (select min(sa.starts_at) from public.slot_availability sa
     join public.offerings o on o.id = sa.offering_id
    where o.instructor_id = i.id and o.discipline_id = d.id
      and sa.seats_free > 0 and sa.starts_at > public.bookable_after()) as next_at,
  v.id as venue_id, v.name as venue_name, a.id as area_id, a.name_en as area_en, a.name_ar as area_ar,
  v.lat, v.lng
from public.instructors i
join public.instructor_disciplines idis on idis.instructor_id = i.id
join public.disciplines d on d.id = idis.discipline_id
join lateral (
  select o.venue_id from public.offerings o
   where o.instructor_id = i.id and o.discipline_id = d.id and o.published
   order by o.price_egp limit 1
) main on true
join public.venues v on v.id = main.venue_id
join public.areas a on a.id = v.area_id
where i.verified;

-- Group products (workshops, revision and conversation groups): one row per upcoming session.
create view public.group_sessions as
select
  sa.id as slot_id, sa.starts_at, sa.ends_at, sa.capacity, sa.seats_free,
  o.id as offering_id, o.type, o.title, o.description, o.level_label, o.price_egp, o.duration_min,
  o.included, o.take_home, o.banner_path,
  d.id as discipline_id, d.category_id,
  i.id as instructor_id, i.display_name as instructor_name, i.rating_avg, i.rating_count, i.photo_path,
  v.name as venue_name, a.name_en as area_en, a.name_ar as area_ar, v.lat, v.lng
from public.slot_availability sa
join public.offerings o on o.id = sa.offering_id
join public.disciplines d on d.id = o.discipline_id
join public.instructors i on i.id = o.instructor_id
join public.venues v on v.id = o.venue_id
join public.areas a on a.id = v.area_id
where (o.type = 'workshop' or (o.type = 'group' and d.category_id in ('education', 'languages')))
  and sa.starts_at > public.bookable_after();

grant select on public.instructor_cards, public.group_sessions to anon, authenticated;
grant execute on function public.bookable_after() to anon, authenticated;
