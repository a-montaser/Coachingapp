-- Profile → App credit (Phase 2 R7): every grant and every booking the credit paid for, newest first.
-- Spends live in credit_spends, which the app can't read (functions only, D64), so this view runs with the
-- owner's rights and returns only the caller's rows. A spend handed back (a cancellation, an expired hold)
-- leaves credit_spends, so the history always adds up to the balance.
create view public.my_credit_history as
select
  'grant'::text as kind,
  c.source,
  c.amount_egp,
  c.remaining_egp,
  c.expires_at,
  c.created_at as at,
  b.ref
from public.credits c
left join public.bookings b on b.id = c.booking_id
where c.user_id = (select auth.uid())
union all
select
  'spend'::text,
  null,
  sum(cs.amount_egp)::int,
  null,
  null,
  b.created_at,
  b.ref
from public.credit_spends cs
join public.bookings b on b.id = cs.booking_id
where b.user_id = (select auth.uid())
group by b.id, b.created_at, b.ref;

revoke all on public.my_credit_history from public, anon, authenticated;
grant select on public.my_credit_history to authenticated;
