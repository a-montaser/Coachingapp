-- Data only (owner revision D54: workshops are "Groups"): the seeded level labels began with
-- "Workshop · ", so the Group page read "Group · Workshop · beginners". Keep just the level.
update public.offerings
   set level_label = upper(left(x, 1)) || substr(x, 2)
  from (select id, substr(level_label, length('Workshop · ') + 1) as x
          from public.offerings
         where level_label like 'Workshop · %') l
 where offerings.id = l.id;
