-- The seed's session times are Cairo wall-clock times (§14, §7.8), whatever the server's time zone.
begin;
select plan(3);

select is(
  (select distinct to_char(s.starts_at at time zone 'Africa/Cairo', 'HH24:MI') from public.slots s
     join public.offerings o on o.id = s.offering_id where o.title = 'Photo walk on Al-Muizz Street'),
  '08:00', 'the photo walk starts at 08:00 Cairo time');
select is(
  (select array_agg(distinct to_char(s.starts_at at time zone 'Africa/Cairo', 'HH24:MI') order by to_char(s.starts_at at time zone 'Africa/Cairo', 'HH24:MI'))
     from public.slots s join public.offerings o on o.id = s.offering_id where o.type = 'private'),
  array['09:00', '17:30', '19:00'], 'regular slots are at 09:00, 17:30 and 19:00 Cairo time');
select is(
  (select count(*)::int from public.slots s join public.offerings o on o.id = s.offering_id
    where o.type = 'private' and extract(isodow from s.starts_at at time zone 'Africa/Cairo') = 5),
  0, 'no regular slots on Fridays');

select * from finish();
rollback;
