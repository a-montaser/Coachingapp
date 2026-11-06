-- Owner revision (D54): "Groups" merges workshops and small groups in every category, so the view now
-- lists sports small groups too (padel, tennis, squash, swimming), not only education and languages.
create or replace view public.group_sessions as
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
where o.type in ('workshop', 'group')
  and sa.starts_at > public.bookable_after();
