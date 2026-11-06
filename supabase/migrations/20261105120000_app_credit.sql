-- Owner (D64): refunds become app credit, never money back to the card. Refund credit never expires;
-- credit from any other source (goodwill, promotions) expires 6 months after it is granted.
-- The learner chooses on Review & pay whether to use their credit (card bookings only); the card pays
-- the rest, and a booking that credit covers in full needs no card step.

create table public.credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source text not null check (source in ('refund', 'goodwill', 'promo')),
  amount_egp int not null check (amount_egp > 0),
  remaining_egp int not null check (remaining_egp between 0 and amount_egp),
  expires_at timestamptz,
  booking_id uuid references public.bookings (id) on delete set null, -- the cancelled booking it came from
  created_at timestamptz not null default now(),
  constraint refund_credit_never_expires check ((source = 'refund') = (expires_at is null))
);
create index credits_user on public.credits (user_id);

-- Which grants paid for which booking, so cancelling or an expired hold puts credit back where it came from
-- (a 6-month credit stays a 6-month credit).
create table public.credit_spends (
  booking_id uuid not null references public.bookings (id) on delete cascade,
  credit_id uuid not null references public.credits (id) on delete cascade,
  amount_egp int not null check (amount_egp > 0),
  primary key (booking_id, credit_id)
);

alter table public.bookings add column credit_egp int not null default 0 check (credit_egp >= 0);

alter table public.credits enable row level security;
alter table public.credit_spends enable row level security; -- no policies: functions only
create policy "own credits read" on public.credits for select to authenticated using (user_id = auth.uid());

-- The learner's spendable credit (Profile, Review & pay). Always one row.
create view public.my_credit with (security_invoker = true) as
select coalesce(sum(remaining_egp), 0)::int as balance_egp
  from public.credits
 where user_id = auth.uid() and remaining_egp > 0 and (expires_at is null or expires_at > now());
grant select on public.my_credit to authenticated;

-- Ops (service role) and refunds: refund credit never expires, anything else after 6 months.
create function public.grant_credit(p_user uuid, p_amount int, p_source text, p_booking uuid default null)
returns void language sql security definer set search_path = '' as $$
  insert into public.credits (user_id, source, amount_egp, remaining_egp, expires_at, booking_id)
  select p_user, p_source, p_amount, p_amount,
         case when p_source = 'refund' then null else now() + interval '6 months' end, p_booking
   where p_amount > 0;
$$;

-- Takes up to p_max EGP of the user's credit for a booking, soonest-expiring first. Returns what it took.
create function public.spend_credit(p_user uuid, p_booking uuid, p_max int) returns int
language plpgsql security definer set search_path = '' as $$
declare
  r record;
  v_left int := p_max;
  v_take int;
begin
  for r in select id, remaining_egp from public.credits
            where user_id = p_user and remaining_egp > 0 and (expires_at is null or expires_at > now())
            order by expires_at nulls last, created_at
              for update
  loop
    exit when v_left <= 0;
    v_take := least(v_left, r.remaining_egp);
    update public.credits set remaining_egp = remaining_egp - v_take where id = r.id;
    insert into public.credit_spends (booking_id, credit_id, amount_egp) values (p_booking, r.id, v_take);
    v_left := v_left - v_take;
  end loop;
  update public.bookings set credit_egp = p_max - v_left where id = p_booking;
  return p_max - v_left;
end $$;

-- Puts a booking's spent credit back on the grants it came from (an expired grant stays expired).
create function public.return_credit(p_booking uuid) returns void
language sql security definer set search_path = '' as $$
  with s as (delete from public.credit_spends where booking_id = p_booking returning credit_id, amount_egp)
  update public.credits c set remaining_egp = c.remaining_egp + s.amount_egp from s where c.id = s.credit_id;
$$;

-- As before, and expired holds give their credit back.
create or replace function public.release_expired_holds(p_slot uuid default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
  with expired as (
    update public.bookings b
       set status = 'cancelled', cancelled_at = now(),
           cancel_reason = case when b.status = 'awaiting_payment' then 'hold_expired' else 'payment_overdue' end
     where (p_slot is null or b.slot_id = p_slot)
       and ((b.status = 'awaiting_payment' and b.hold_expires_at < now())
         or (b.status = 'payment_due' and b.pay_by < now()))
    returning b.id, b.slot_id, b.seats
  ), freed as (
    update public.slots s
       set seats_taken = s.seats_taken - e.total
      from (select slot_id, sum(seats)::int as total from expired group by slot_id) e
     where s.id = e.slot_id
  ), back as (
    delete from public.credit_spends cs using expired e where cs.booking_id = e.id
    returning cs.credit_id, cs.amount_egp
  )
  update public.credits c
     set remaining_egp = c.remaining_egp + x.total
    from (select credit_id, sum(amount_egp)::int as total from back group by credit_id) x
   where c.id = x.credit_id;
end $$;

drop function public.book(uuid, int, uuid, text, text, text);
create function public.book(
  p_slot uuid,
  p_seats int default 1,
  p_child uuid default null,
  p_method text default 'card',
  p_promo text default null,
  p_note text default null,
  p_use_credit boolean default false
) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_slot public.slots;
  v_off public.offerings;
  v_age int;
  v_sub int;
  v_disc int := 0;
  v_code text;
  v_status text;
  v_ref text;
  v_row public.bookings;
begin
  if v_uid is null then raise exception 'not_signed_in'; end if;
  if p_method not in ('card', 'venue') then raise exception 'bad_method'; end if;

  perform public.release_expired_holds(p_slot);
  select * into v_slot from public.slots where id = p_slot for update; -- serialises concurrent bookings
  if not found then raise exception 'no_slot'; end if;
  select o.* into v_off from public.offerings o
    join public.instructors i on i.id = o.instructor_id and i.verified
   where o.id = v_slot.offering_id and o.published;
  if not found then raise exception 'no_slot'; end if;

  -- §9.4 seats per session type
  if p_seats < 1 then raise exception 'bad_seats'; end if;
  if v_off.type = 'workshop' then
    if p_seats > 3 then raise exception 'too_many_seats'; end if;
  elsif p_seats <> 1 then
    raise exception 'bad_seats';
  end if;

  -- Kids sessions are booked for a family member aged within the offering's range (6–14 by default)
  if v_off.type = 'kids' then
    if p_child is null then raise exception 'child_required'; end if;
    select age into v_age from public.family_members where id = p_child and user_id = v_uid;
    if v_age is null then raise exception 'child_required'; end if;
    if v_age < coalesce(v_off.min_age, 6) or v_age > coalesce(v_off.max_age, 14) then raise exception 'child_age'; end if;
  elsif p_child is not null then
    raise exception 'child_not_allowed';
  end if;

  perform public.assert_bookable(v_slot, p_seats);

  v_sub := v_off.price_egp * p_seats;
  if nullif(trim(p_promo), '') is not null then
    select ap.code, ap.discount_egp into v_code, v_disc from public.apply_promo(p_promo, v_sub) ap;
  end if;

  -- Kids and approval offerings wait for the instructor (ops in Phase 1) and are charged after (D29).
  v_status := case
    when v_off.type = 'kids' or v_off.needs_approval then 'pending'
    when p_method = 'venue' then 'confirmed'
    else 'awaiting_payment'
  end;

  loop
    v_ref := 'CFA-' || lpad(floor(random() * 100000)::int::text, 5, '0');
    exit when not exists (select 1 from public.bookings where ref = v_ref);
  end loop;

  insert into public.bookings (
    ref, user_id, slot_id, family_member_id, seats, status, method,
    subtotal_egp, discount_egp, total_egp, promo_code, note,
    hold_expires_at, refundable_until, same_day
  ) values (
    v_ref, v_uid, p_slot, p_child, p_seats, v_status, p_method,
    v_sub, v_disc, v_sub - v_disc, v_code, nullif(trim(p_note), ''),
    case when v_status = 'awaiting_payment' then now() + interval '5 minutes' end,
    v_slot.starts_at - interval '24 hours',
    public.cairo_date(v_slot.starts_at) = public.cairo_date(now())
  ) returning * into v_row;

  update public.slots set seats_taken = seats_taken + p_seats where id = p_slot;

  -- Credit pays card bookings only (pay at the venue settles with the instructor).
  if p_method = 'card' then
    if p_use_credit then perform public.spend_credit(v_uid, v_row.id, v_row.total_egp); end if;
    -- Nothing left for the card (credit or a 100% promo): confirmed straight away.
    update public.bookings
       set status = 'confirmed', hold_expires_at = null
     where id = v_row.id and status = 'awaiting_payment' and credit_egp >= total_egp;
    select * into v_row from public.bookings where id = v_row.id;
  end if;
  return v_row;
end $$;

-- §9.1 as before (> 24 h before the start → everything paid comes back; inside 24 h or same-day → none),
-- but it comes back as app credit (D64): the card part as new refund credit (never expires), the credit
-- part onto the grants it came from. Not yet paid (pending, held, payment due): spent credit goes back.
create or replace function public.cancel_booking(p_ref text, p_reason text default null) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_b public.bookings;
  v_starts timestamptz;
  v_cash int;
  v_refund int := 0;
begin
  if v_uid is null then raise exception 'not_signed_in'; end if;
  select * into v_b from public.bookings where ref = p_ref and user_id = v_uid for update;
  if not found then raise exception 'not_found'; end if;
  select starts_at into v_starts from public.slots where id = v_b.slot_id for update;
  if v_b.status = 'cancelled' or v_starts <= now() then raise exception 'not_cancellable'; end if;

  if not (v_b.method = 'card' and v_b.status = 'confirmed') then
    perform public.return_credit(v_b.id); -- nothing was charged
  elsif now() < v_b.refundable_until and not v_b.same_day then
    select coalesce(sum(amount_egp), 0)::int into v_cash from public.payments
     where booking_id = v_b.id and status = 'paid';
    perform public.return_credit(v_b.id);
    perform public.grant_credit(v_uid, v_cash, 'refund', v_b.id);
    v_refund := v_cash + v_b.credit_egp;
  end if;

  update public.bookings
     set status = 'cancelled', cancelled_at = now(), cancel_reason = nullif(trim(p_reason), ''), refund_egp = v_refund
   where id = v_b.id
  returning * into v_b;
  update public.slots set seats_taken = seats_taken - v_b.seats where id = v_b.slot_id;
  return v_b;
end $$;

-- As before; a card booking that credit already covers is confirmed on approval (nothing to pay).
create or replace function public.approve_booking(p_ref text) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare v_b public.bookings; v_starts timestamptz;
begin
  select * into v_b from public.bookings where ref = p_ref for update;
  if not found then raise exception 'not_found'; end if;
  if v_b.status <> 'pending' then raise exception 'not_pending'; end if;
  select starts_at into v_starts from public.slots where id = v_b.slot_id;
  update public.bookings
     set approved_at = now(),
         status = case when method = 'venue' or credit_egp >= total_egp then 'confirmed' else 'payment_due' end,
         pay_by = case when method = 'venue' or credit_egp >= total_egp then null
                       else least(now() + interval '24 hours', v_starts) end
   where id = v_b.id
  returning * into v_b;
  return v_b;
end $$;

create or replace function public.decline_booking(p_ref text) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare v_b public.bookings;
begin
  select * into v_b from public.bookings where ref = p_ref for update;
  if not found then raise exception 'not_found'; end if;
  if v_b.status <> 'pending' then raise exception 'not_pending'; end if;
  perform public.return_credit(v_b.id);
  update public.bookings set status = 'cancelled', cancelled_at = now(), cancel_reason = 'declined', refund_egp = 0
   where id = v_b.id returning * into v_b;
  update public.slots set seats_taken = seats_taken - v_b.seats where id = v_b.slot_id;
  return v_b;
end $$;

-- As before, but money that can't buy a seat comes back as refund credit (D64). A late payment re-takes
-- the seat only when no credit was involved: the expired hold already gave that credit back.
create or replace function public.record_payment(p_provider_ref text, p_status text, p_raw jsonb default null)
returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_pay public.payments;
  v_b public.bookings;
  v_slot public.slots;
begin
  if p_status not in ('paid', 'failed') then raise exception 'bad_status'; end if;
  select * into v_pay from public.payments where provider_ref = p_provider_ref for update;
  if not found then raise exception 'not_found'; end if;
  select * into v_b from public.bookings where id = v_pay.booking_id for update;
  if v_pay.status <> 'initiated' then return v_b; end if; -- already handled

  update public.payments set status = p_status, raw = coalesce(p_raw, raw), updated_at = now() where id = v_pay.id;
  if p_status = 'failed' then return v_b; end if; -- the hold stays until it expires, so the learner can retry

  if v_b.status in ('awaiting_payment', 'payment_due') then
    update public.bookings set status = 'confirmed', hold_expires_at = null, pay_by = null
     where id = v_b.id returning * into v_b;
  elsif v_b.status = 'cancelled' and v_b.cancel_reason in ('hold_expired', 'payment_overdue') then
    select * into v_slot from public.slots where id = v_b.slot_id for update;
    if v_b.credit_egp = 0 and v_slot.starts_at > now() and v_slot.seats_taken + v_b.seats <= v_slot.capacity then
      update public.slots set seats_taken = seats_taken + v_b.seats where id = v_slot.id;
      update public.bookings set status = 'confirmed', cancelled_at = null, cancel_reason = null
       where id = v_b.id returning * into v_b;
    else
      perform public.grant_credit(v_b.user_id, v_pay.amount_egp, 'refund', v_b.id);
      update public.bookings set refund_egp = v_pay.amount_egp where id = v_b.id returning * into v_b;
    end if;
  elsif v_b.status = 'cancelled' then
    -- Cancelled by the learner (or declined) while the payment was in flight: never keep the money.
    perform public.grant_credit(v_b.user_id, v_pay.amount_egp, 'refund', v_b.id);
    update public.bookings set refund_egp = v_pay.amount_egp where id = v_b.id returning * into v_b;
  end if;
  return v_b;
end $$;

-- my_bookings gains the credit applied (appended, so the view's existing columns keep their order).
create or replace view public.my_bookings with (security_invoker = true) as
select
  b.id, b.ref, b.status, b.method, b.seats, b.subtotal_egp, b.discount_egp, b.total_egp, b.promo_code,
  b.note, b.hold_expires_at, b.pay_by, b.refundable_until, b.same_day, b.reminder_min, b.created_at,
  b.cancelled_at, b.refund_egp,
  case
    when b.status = 'awaiting_payment' and b.hold_expires_at < now() then 'cancelled'
    when b.status = 'payment_due' and b.pay_by < now() then 'cancelled'
    when b.status = 'confirmed' and s.ends_at < now() then 'completed'
    else b.status
  end as display_status,
  s.id as slot_id, s.starts_at, s.ends_at,
  o.id as offering_id, o.type, o.title, o.duration_min, o.what_to_bring,
  d.id as discipline_id, d.name_en as discipline_en, d.name_ar as discipline_ar, d.category_id,
  i.id as instructor_id, i.display_name as instructor_name,
  v.name as venue_name, v.notes as venue_notes, v.lat as venue_lat, v.lng as venue_lng,
  f.first_name as child_name, f.age as child_age,
  b.credit_egp
from public.bookings b
join public.slots s on s.id = b.slot_id
join public.offerings o on o.id = s.offering_id
join public.disciplines d on d.id = o.discipline_id
join public.instructors i on i.id = o.instructor_id
join public.venues v on v.id = o.venue_id
left join public.family_members f on f.id = b.family_member_id;

-- New functions default to executable by everyone: lock them to the service role, as in the first migration.
revoke execute on function public.grant_credit(uuid, int, text, uuid) from public, anon, authenticated;
revoke execute on function public.spend_credit(uuid, uuid, int) from public, anon, authenticated;
revoke execute on function public.return_credit(uuid) from public, anon, authenticated;
revoke execute on function public.book(uuid, int, uuid, text, text, text, boolean) from public, anon;
grant execute on function public.book(uuid, int, uuid, text, text, text, boolean) to authenticated;
