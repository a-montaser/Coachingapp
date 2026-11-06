-- Groups (D54): workshops and small groups in every category; lessons (1:1, kids) never appear.
begin;
select plan(2);

select ok(
  exists (select 1 from public.group_sessions where category_id = 'sports' and type = 'group'),
  'sports small groups are listed under Groups');
select is(
  (select count(*)::int from public.group_sessions where type not in ('workshop', 'group')),
  0, 'no 1:1 or kids lessons in Groups');

select * from finish();
rollback;
