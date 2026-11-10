-- Weekly series paid in one checkout (Phase 2 R5.3, design §5): the payment records the series, and
-- settling it settles every week, each by the same rules a single booking follows (D64).

alter table public.payments add column series_id uuid;

-- As before for one booking. For a series, each week the payment covered is settled with its own card share
-- (its total minus the credit it used): an open hold is confirmed; a lapsed hold re-takes its seat only when
-- no credit was involved and the seat is still free, else that share becomes refund credit; a week cancelled
-- meanwhile gets its share back as credit. Returns the booking the payment was made from.
create or replace function public.record_payment(p_provider_ref text, p_status text, p_raw jsonb default null)
returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_pay public.payments;
  v_first public.bookings;
  v_b public.bookings;
  v_slot public.slots;
  v_cash int;
begin
  if p_status not in ('paid', 'failed') then raise exception 'bad_status'; end if;
  select * into v_pay from public.payments where provider_ref = p_provider_ref for update;
  if not found then raise exception 'not_found'; end if;
  select * into v_first from public.bookings where id = v_pay.booking_id;
  if v_pay.status <> 'initiated' then return v_first; end if; -- already handled

  update public.payments set status = p_status, raw = coalesce(p_raw, raw), updated_at = now() where id = v_pay.id;
  if p_status = 'failed' then return v_first; end if; -- the holds stay until they expire, so the learner can retry

  for v_b in
    select * from public.bookings
     where (v_pay.series_id is null and id = v_pay.booking_id)
        or (v_pay.series_id is not null and series_id = v_pay.series_id and user_id = v_first.user_id
            and method = 'card' and total_egp > credit_egp)
     order by id
       for update
  loop
    v_cash := case when v_pay.series_id is null then v_pay.amount_egp else v_b.total_egp - v_b.credit_egp end;
    if v_b.status in ('awaiting_payment', 'payment_due') then
      update public.bookings set status = 'confirmed', hold_expires_at = null, pay_by = null where id = v_b.id;
    elsif v_b.status = 'cancelled' and v_b.cancel_reason in ('hold_expired', 'payment_overdue') then
      select * into v_slot from public.slots where id = v_b.slot_id for update;
      if v_b.credit_egp = 0 and v_slot.starts_at > now() and v_slot.seats_taken + v_b.seats <= v_slot.capacity then
        update public.slots set seats_taken = seats_taken + v_b.seats where id = v_slot.id;
        update public.bookings set status = 'confirmed', cancelled_at = null, cancel_reason = null where id = v_b.id;
      else
        perform public.grant_credit(v_b.user_id, v_cash, 'refund', v_b.id);
        update public.bookings set refund_egp = v_cash where id = v_b.id;
      end if;
    elsif v_b.status = 'cancelled' then
      -- Cancelled (or declined) while the payment was in flight: never keep the money.
      perform public.grant_credit(v_b.user_id, v_cash, 'refund', v_b.id);
      update public.bookings set refund_egp = v_cash where id = v_b.id;
    end if;
  end loop;

  select * into v_first from public.bookings where id = v_pay.booking_id;
  return v_first;
end $$;

revoke execute on function public.record_payment(text, text, jsonb) from public, anon, authenticated;
