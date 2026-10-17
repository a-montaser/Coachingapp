-- Phase 1 booking functions (design.md §3). Every change to bookings, slots and payments happens here,
-- inside one transaction that locks the slot row, so two people can never take the same seat.
-- Errors are raised with a stable code in the message (the app maps them to copy):
--   not_signed_in, no_slot, slot_past, too_soon, bad_seats, too_many_seats, no_seats, child_required,
--   child_age, child_not_allowed, promo_invalid, not_found, not_cancellable, reschedule_closed,
--   other_offering, pay_first, not_pending

-- Cairo calendar date of an instant.
create function public.cairo_date(t timestamptz) returns date
language sql immutable as $$ select (t at time zone 'Africa/Cairo')::date $$;

-- Frees seats held by expired card holds (5 min) and expired payment-due bookings (24 h / start).
create function public.release_expired_holds(p_slot uuid default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
  with expired as (
    update public.bookings b
       set status = 'cancelled', cancelled_at = now(),
           cancel_reason = case when b.status = 'awaiting_payment' then 'hold_expired' else 'payment_overdue' end
     where (p_slot is null or b.slot_id = p_slot)
       and ((b.status = 'awaiting_payment' and b.hold_expires_at < now())
         or (b.status = 'payment_due' and b.pay_by < now()))
    returning b.slot_id, b.seats
  )
  update public.slots s
     set seats_taken = s.seats_taken - e.total
    from (select slot_id, sum(seats)::int as total from expired group by slot_id) e
   where s.id = e.slot_id;
end $$;

-- Checks a slot can take `p_seats` more seats now (§9.6). Caller must hold the slot's row lock.
create function public.assert_bookable(p_slot public.slots, p_seats int) returns void
language plpgsql stable set search_path = '' as $$
begin
  if p_slot.starts_at <= now() then raise exception 'slot_past'; end if;
  if public.cairo_date(p_slot.starts_at) = public.cairo_date(now())
     and p_slot.starts_at < now() + interval '60 minutes' then
    raise exception 'too_soon';
  end if;
  if p_slot.seats_taken + p_seats > p_slot.capacity then raise exception 'no_seats'; end if;
end $$;

create function public.apply_promo(p_code text, p_subtotal int)
returns table (code text, percent_off int, discount_egp int)
language plpgsql stable security definer set search_path = '' as $$
declare v_pct int;
begin
  select pc.percent_off into v_pct from public.promo_codes pc
   where pc.code = upper(trim(p_code)) and pc.active and (pc.valid_until is null or pc.valid_until > now());
  if v_pct is null then raise exception 'promo_invalid'; end if;
  return query select upper(trim(p_code)), v_pct, round(p_subtotal * v_pct / 100.0)::int;
end $$;

create function public.book(
  p_slot uuid,
  p_seats int default 1,
  p_child uuid default null,
  p_method text default 'card',
  p_promo text default null,
  p_note text default null
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
  return v_row;
end $$;

-- §9.1: > 24 h before the start → full refund of what was paid; inside 24 h, or a same-day booking → none.
-- Pay at the venue: nothing charged, nothing refunded. Refunds are queued for the refund Edge Function.
create function public.cancel_booking(p_ref text, p_reason text default null) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_b public.bookings;
  v_starts timestamptz;
  v_pay public.payments;
  v_refund int := 0;
begin
  if v_uid is null then raise exception 'not_signed_in'; end if;
  select * into v_b from public.bookings where ref = p_ref and user_id = v_uid for update;
  if not found then raise exception 'not_found'; end if;
  select starts_at into v_starts from public.slots where id = v_b.slot_id for update;
  if v_b.status = 'cancelled' or v_starts <= now() then raise exception 'not_cancellable'; end if;

  select * into v_pay from public.payments where booking_id = v_b.id and status = 'paid'
   order by created_at desc limit 1;
  if v_pay.id is not null and now() < v_b.refundable_until and not v_b.same_day then
    v_refund := v_pay.amount_egp;
    insert into public.refunds (payment_id, amount_egp) values (v_pay.id, v_refund);
  end if;

  update public.bookings
     set status = 'cancelled', cancelled_at = now(), cancel_reason = nullif(trim(p_reason), ''), refund_egp = v_refund
   where id = v_b.id
  returning * into v_b;
  update public.slots set seats_taken = seats_taken - v_b.seats where id = v_b.slot_id;
  return v_b;
end $$;

-- §9.3: same booking (same ref, same payment) moves to another open slot of the same offering.
-- Allowed only while free cancellation is open: until 24 h before the current start (D29).
create function public.reschedule_booking(p_ref text, p_new_slot uuid) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_b public.bookings;
  v_old public.slots;
  v_new public.slots;
begin
  if v_uid is null then raise exception 'not_signed_in'; end if;
  select * into v_b from public.bookings where ref = p_ref and user_id = v_uid for update;
  if not found then raise exception 'not_found'; end if;
  if v_b.status = 'awaiting_payment' then raise exception 'pay_first'; end if;
  if v_b.status not in ('pending', 'payment_due', 'confirmed') then raise exception 'not_cancellable'; end if;
  if v_b.slot_id = p_new_slot then return v_b; end if;

  perform public.release_expired_holds(p_new_slot);
  -- Lock both slots in id order so two reschedules can't deadlock.
  perform 1 from public.slots where id in (v_b.slot_id, p_new_slot) order by id for update;
  select * into v_old from public.slots where id = v_b.slot_id;
  select * into v_new from public.slots where id = p_new_slot;
  if v_new.id is null then raise exception 'no_slot'; end if;
  if now() >= v_old.starts_at - interval '24 hours' then raise exception 'reschedule_closed'; end if;
  if v_new.offering_id <> v_old.offering_id then raise exception 'other_offering'; end if;
  perform public.assert_bookable(v_new, v_b.seats);

  update public.slots set seats_taken = seats_taken - v_b.seats where id = v_old.id;
  update public.slots set seats_taken = seats_taken + v_b.seats where id = v_new.id;
  update public.bookings
     set slot_id = v_new.id,
         refundable_until = v_new.starts_at - interval '24 hours',
         same_day = public.cairo_date(v_new.starts_at) = public.cairo_date(now()),
         pay_by = case when status = 'payment_due' then least(pay_by, v_new.starts_at) else pay_by end
   where id = v_b.id
  returning * into v_b;
  return v_b;
end $$;

-- Ops only (Studio / service role) until the instructor app (Phase 3).
create function public.approve_booking(p_ref text) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare v_b public.bookings; v_starts timestamptz;
begin
  select * into v_b from public.bookings where ref = p_ref for update;
  if not found then raise exception 'not_found'; end if;
  if v_b.status <> 'pending' then raise exception 'not_pending'; end if;
  select starts_at into v_starts from public.slots where id = v_b.slot_id;
  update public.bookings
     set approved_at = now(),
         status = case when method = 'venue' then 'confirmed' else 'payment_due' end,
         pay_by = case when method = 'venue' then null else least(now() + interval '24 hours', v_starts) end
   where id = v_b.id
  returning * into v_b;
  return v_b;
end $$;

create function public.decline_booking(p_ref text) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare v_b public.bookings;
begin
  select * into v_b from public.bookings where ref = p_ref for update;
  if not found then raise exception 'not_found'; end if;
  if v_b.status <> 'pending' then raise exception 'not_pending'; end if;
  update public.bookings set status = 'cancelled', cancelled_at = now(), cancel_reason = 'declined', refund_egp = 0
   where id = v_b.id returning * into v_b;
  update public.slots set seats_taken = seats_taken - v_b.seats where id = v_b.slot_id;
  return v_b;
end $$;

-- Payment outcome from the provider webhook (or the demo checkout). Idempotent on provider_ref.
-- A payment that lands after its hold expired re-takes the seat if one is still free; otherwise it is
-- refunded in full straight away.
create function public.record_payment(p_provider_ref text, p_status text, p_raw jsonb default null)
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
    if v_slot.starts_at > now() and v_slot.seats_taken + v_b.seats <= v_slot.capacity then
      update public.slots set seats_taken = seats_taken + v_b.seats where id = v_slot.id;
      update public.bookings set status = 'confirmed', cancelled_at = null, cancel_reason = null
       where id = v_b.id returning * into v_b;
    else
      insert into public.refunds (payment_id, amount_egp) values (v_pay.id, v_pay.amount_egp);
      update public.bookings set refund_egp = v_pay.amount_egp where id = v_b.id returning * into v_b;
    end if;
  elsif v_b.status = 'cancelled' then
    -- Cancelled by the learner (or declined) while the payment was in flight: never keep the money.
    insert into public.refunds (payment_id, amount_egp) values (v_pay.id, v_pay.amount_egp);
    update public.bookings set refund_egp = v_pay.amount_egp where id = v_b.id returning * into v_b;
  end if;
  return v_b;
end $$;

-- Learners call book / cancel / reschedule / apply_promo; everything else is service-role only.
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function public.book(uuid, int, uuid, text, text, text) to authenticated;
grant execute on function public.cancel_booking(text, text) to authenticated;
grant execute on function public.reschedule_booking(text, uuid) to authenticated;
grant execute on function public.apply_promo(text, int) to authenticated;
grant execute on function public.cairo_date(timestamptz) to anon, authenticated;
