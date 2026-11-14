-- Kids are descoped until after the last phase (D80): no published kids session, so none is listed or bookable.
begin;
select plan(2);
select is((select count(*)::int from public.offerings where type = 'kids' and published), 0,
  'no kids session is published');
select is((select count(*)::int from public.instructor_cards c
            where c.from_price in (select o.price_egp from public.offerings o where o.type = 'kids')
              and not exists (select 1 from public.offerings o2 where o2.instructor_id = c.id
                               and o2.discipline_id = c.discipline_id and o2.published and o2.price_egp = c.from_price)), 0,
  'no "From" price comes from a hidden kids session');
select * from finish();
rollback;
