-- Phase 2 functions (specs/phase-2/design.md §3): start a chat, rate a session, book and cancel a weekly series.
-- New error codes: not_instructor, own_thread, not_completed, already_rated, bad_stars, bad_weeks,
-- series_type, series_week_unavailable (the week's Cairo date is in the error's detail).

-- ---------- Chat ----------

-- Get-or-create the caller's thread with an instructor (the Message buttons, R1.9).
create function public.start_thread(p_instructor uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_id uuid;
begin
  if v_uid is null then raise exception 'not_signed_in'; end if;
  if not exists (select 1 from public.instructors where id = p_instructor and verified) then
    raise exception 'not_instructor';
  end if;
  if public.my_instructor_id() = p_instructor then raise exception 'own_thread'; end if;
  insert into public.threads (learner_id, instructor_id) values (v_uid, p_instructor)
    on conflict (learner_id, instructor_id) do nothing;
  select id into v_id from public.threads where learner_id = v_uid and instructor_id = p_instructor;
  return v_id;
end $$;

-- ---------- Ratings (R2) ----------

-- One rating per completed booking (yours, or your child's). The instructor's average and count move
-- at once, starting from whatever they were (the seed's numbers count as earlier ratings).
create function public.rate_booking(p_ref text, p_stars int, p_body text default null) returns public.reviews
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_b public.bookings;
  v_slot public.slots;
  v_instructor uuid;
  v_row public.reviews;
begin
  if v_uid is null then raise exception 'not_signed_in'; end if;
  if p_stars is null or p_stars not between 1 and 5 then raise exception 'bad_stars'; end if;
  select * into v_b from public.bookings where ref = p_ref and user_id = v_uid;
  if not found then raise exception 'not_found'; end if;
  select * into v_slot from public.slots where id = v_b.slot_id;
  if v_b.status <> 'confirmed' or v_slot.ends_at > now() then raise exception 'not_completed'; end if;
  select instructor_id into v_instructor from public.offerings where id = v_slot.offering_id;

  insert into public.reviews (booking_id, user_id, instructor_id, stars, body)
  values (v_b.id, v_uid, v_instructor, p_stars, nullif(trim(p_body), ''))
  on conflict (booking_id) do nothing
  returning * into v_row;
  if v_row.booking_id is null then raise exception 'already_rated'; end if;

  -- The update takes the instructor's row lock, so two ratings at once both count.
  update public.instructors
     set rating_avg = round((coalesce(rating_avg, 0) * rating_count + p_stars) / (rating_count + 1.0), 1),
         rating_count = rating_count + 1
   where id = v_instructor;
  return v_row;
end $$;

-- ---------- Weekly series (R5) ----------

-- Books the same Cairo time for p_weeks weeks, all or nothing. Each week goes through book(), so every
-- Phase 1 rule, the promo and app credit apply per week; book() locks each week's slot, and every series
-- takes those locks in date order, so two series can't deadlock.
create function public.book_series(
  p_slot uuid,
  p_weeks int,
  p_method text default 'card',
  p_promo text default null,
  p_note text default null,
  p_use_credit boolean default false
) returns setof public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_first public.slots;
  v_type text;
  v_series uuid := gen_random_uuid();
  v_local timestamp;
  v_slot uuid;
  v_row public.bookings;
begin
  if auth.uid() is null then raise exception 'not_signed_in'; end if;
  if p_weeks is null or p_weeks not between 2 and 8 then raise exception 'bad_weeks'; end if;
  select * into v_first from public.slots where id = p_slot;
  if not found then raise exception 'no_slot'; end if;
  select type into v_type from public.offerings where id = v_first.offering_id;
  if v_type not in ('private', 'group') then raise exception 'series_type'; end if; -- not kids, not workshops

  v_local := v_first.starts_at at time zone 'Africa/Cairo';
  for k in 0 .. p_weeks - 1 loop
    -- Same wall-clock time in Cairo each week, so a clock change doesn't shift the series.
    select id into v_slot from public.slots
     where offering_id = v_first.offering_id
       and starts_at = (v_local + make_interval(days => 7 * k)) at time zone 'Africa/Cairo';
    if v_slot is null then
      raise exception 'series_week_unavailable' using detail = (v_local + make_interval(days => 7 * k))::date::text;
    end if;
    begin
      v_row := public.book(v_slot, 1, null, p_method, p_promo, p_note, p_use_credit);
    exception when raise_exception then
      -- A week that is full, too soon or gone names its date; anything else (bad promo…) stays as it is.
      if sqlerrm in ('no_seats', 'slot_past', 'too_soon', 'no_slot') then
        raise exception 'series_week_unavailable' using detail = (v_local + make_interval(days => 7 * k))::date::text;
      end if;
      raise;
    end;
    update public.bookings set series_id = v_series where id = v_row.id returning * into v_row;
    return next v_row;
  end loop;
end $$;

-- Cancel: the Phase 1 function becomes the one-week step, and "Cancel every week" (R5.5) also cancels the
-- series' later weeks, each under its own 24-hour rule.
alter function public.cancel_booking(text, text) rename to cancel_one_booking;

create function public.cancel_booking(p_ref text, p_reason text default null, p_every_week boolean default false)
returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare
  v_b public.bookings;
  r record;
begin
  v_b := public.cancel_one_booking(p_ref, p_reason);
  if p_every_week and v_b.series_id is not null then
    for r in
      select b.ref from public.bookings b join public.slots s on s.id = b.slot_id
       where b.series_id = v_b.series_id and b.user_id = v_b.user_id and b.status <> 'cancelled'
         and s.starts_at > (select starts_at from public.slots where id = v_b.slot_id)
       order by s.starts_at
    loop
      perform public.cancel_one_booking(r.ref, p_reason);
    end loop;
  end if;
  return v_b;
end $$;

-- Reschedule moves one week only, and that week leaves the series (R5.6).
alter function public.reschedule_booking(text, uuid) rename to reschedule_one_booking;

create function public.reschedule_booking(p_ref text, p_new_slot uuid) returns public.bookings
language plpgsql security definer set search_path = '' as $$
declare v_b public.bookings;
begin
  v_b := public.reschedule_one_booking(p_ref, p_new_slot);
  update public.bookings set series_id = null where id = v_b.id and series_id is not null returning * into v_b;
  return v_b;
end $$;

-- my_bookings gains series_id (appended, so existing columns keep their order) for "repeats weekly".
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
  b.credit_egp,
  b.series_id
from public.bookings b
join public.slots s on s.id = b.slot_id
join public.offerings o on o.id = s.offering_id
join public.disciplines d on d.id = o.discipline_id
join public.instructors i on i.id = o.instructor_id
join public.venues v on v.id = o.venue_id
left join public.family_members f on f.id = b.family_member_id;

-- ---------- Function rights ----------
revoke execute on function public.cancel_one_booking(text, text), public.reschedule_one_booking(text, uuid)
  from public, anon, authenticated;
revoke execute on function public.start_thread(uuid), public.rate_booking(text, int, text),
  public.book_series(uuid, int, text, text, text, boolean), public.cancel_booking(text, text, boolean),
  public.reschedule_booking(text, uuid) from public, anon;
grant execute on function public.start_thread(uuid), public.rate_booking(text, int, text),
  public.book_series(uuid, int, text, text, text, boolean), public.cancel_booking(text, text, boolean),
  public.reschedule_booking(text, uuid) to authenticated;
