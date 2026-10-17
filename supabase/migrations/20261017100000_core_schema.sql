-- Phase 1 core schema (specs/phase-1/design.md §2). RLS is enabled on every table in this migration.
-- Times are timestamptz (UTC); the app shows them in Africa/Cairo.

-- ---------- Catalogue (public read) ----------

create table public.categories (
  id text primary key check (id in ('hobbies', 'sports', 'education', 'languages')),
  sort int not null
);

create table public.disciplines (
  id text primary key,
  category_id text not null references public.categories (id),
  name_en text not null,
  name_ar text,
  icon text,
  code text, -- language code shown on tiles (EN, FR…)
  sort int not null default 0
);

create table public.areas (
  id text primary key,
  name_en text not null,
  name_ar text,
  lat double precision not null,
  lng double precision not null
);

create table public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area_id text not null references public.areas (id),
  lat double precision not null,
  lng double precision not null,
  notes text
);

create table public.instructors (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  bio text,
  gender text not null check (gender in ('female', 'male')),
  years int,
  certification text,
  rating_avg numeric(2, 1),
  rating_count int not null default 0,
  reply_label text,
  photo_path text, -- placeholder until the owner provides images (D29)
  verified boolean not null default false
);

create table public.instructor_disciplines (
  instructor_id uuid not null references public.instructors (id) on delete cascade,
  discipline_id text not null references public.disciplines (id),
  levels text,
  primary key (instructor_id, discipline_id)
);

create table public.offerings (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid not null references public.instructors (id) on delete cascade,
  discipline_id text not null references public.disciplines (id),
  venue_id uuid not null references public.venues (id),
  type text not null check (type in ('private', 'group', 'kids', 'workshop')),
  title text not null,
  description text,
  level_label text,
  duration_min int not null check (duration_min > 0),
  price_egp int not null check (price_egp > 0),
  capacity int not null check (capacity > 0),
  min_age int,
  max_age int,
  included text,
  take_home text,
  what_to_bring text,
  banner_path text, -- placeholder until the owner provides images (D29)
  needs_approval boolean not null default false,
  published boolean not null default true
);

create table public.slots (
  id uuid primary key default gen_random_uuid(),
  offering_id uuid not null references public.offerings (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  capacity int not null check (capacity > 0),
  seats_taken int not null default 0,
  constraint seats_within_capacity check (seats_taken between 0 and capacity)
);
create index slots_offering_start on public.slots (offering_id, starts_at);

-- ---------- Learner data (own rows only) ----------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  phone text,
  area_id text references public.areas (id),
  lang text not null default 'en' check (lang in ('en', 'ar')),
  theme text not null default 'system' check (theme in ('system', 'light', 'dark')),
  who_for text check (who_for in ('me', 'child', 'both')),
  instructor_pref text not null default 'none' check (instructor_pref in ('none', 'female', 'male')),
  onboarded_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.family_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  first_name text not null check (length(trim(first_name)) between 1 and 40),
  age int not null check (age between 6 and 14), -- kids sessions are ages 6–14 (§9.4)
  created_at timestamptz not null default now()
);

create table public.interests (
  user_id uuid not null references auth.users (id) on delete cascade,
  discipline_id text not null references public.disciplines (id),
  level text check (level in ('beginner', 'intermediate', 'advanced', 'pro')),
  level_source text not null default 'self' check (level_source in ('self', 'instructor')),
  set_at timestamptz not null default now(),
  primary key (user_id, discipline_id)
);

-- ---------- Money (read own, write only through functions / service role) ----------

create table public.promo_codes (
  code text primary key check (code = upper(code)),
  percent_off int not null check (percent_off between 1 and 100),
  active boolean not null default true,
  valid_until timestamptz
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique check (ref ~ '^CFA-[0-9]{5}$'),
  user_id uuid not null references auth.users (id) on delete cascade,
  slot_id uuid not null references public.slots (id),
  family_member_id uuid references public.family_members (id),
  seats int not null check (seats between 1 and 3),
  status text not null check (status in ('awaiting_payment', 'pending', 'payment_due', 'confirmed', 'cancelled')),
  method text not null check (method in ('card', 'venue')),
  subtotal_egp int not null check (subtotal_egp >= 0),
  discount_egp int not null default 0 check (discount_egp >= 0),
  total_egp int not null check (total_egp >= 0),
  promo_code text,
  note text check (length(note) <= 500),
  hold_expires_at timestamptz, -- awaiting_payment: 5-minute card hold (D29)
  approved_at timestamptz,
  pay_by timestamptz, -- payment_due: 24 h after approval or the start, whichever is first (D29)
  refundable_until timestamptz not null, -- start − 24 h (§9.1)
  same_day boolean not null, -- booked on the session's own day: final (§9.1)
  reminder_min int default 120, -- null = reminder off (§9.11)
  created_at timestamptz not null default now(),
  cancelled_at timestamptz,
  cancel_reason text,
  refund_egp int
);
create index bookings_user on public.bookings (user_id, created_at desc);
create index bookings_slot_live on public.bookings (slot_id) where status <> 'cancelled';

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  provider text not null check (provider in ('demo', 'paymob', 'fake')),
  provider_ref text not null unique,
  amount_egp int not null check (amount_egp > 0),
  status text not null default 'initiated' check (status in ('initiated', 'paid', 'failed', 'refunded')),
  raw jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments (id) on delete cascade,
  amount_egp int not null check (amount_egp > 0),
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  provider_ref text,
  error text,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------

alter table public.categories enable row level security;
alter table public.disciplines enable row level security;
alter table public.areas enable row level security;
alter table public.venues enable row level security;
alter table public.instructors enable row level security;
alter table public.instructor_disciplines enable row level security;
alter table public.offerings enable row level security;
alter table public.slots enable row level security;
alter table public.profiles enable row level security;
alter table public.family_members enable row level security;
alter table public.interests enable row level security;
alter table public.promo_codes enable row level security; -- no policies: only apply_promo() reads it
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.refunds enable row level security;

create policy "public read" on public.categories for select to anon, authenticated using (true);
create policy "public read" on public.disciplines for select to anon, authenticated using (true);
create policy "public read" on public.areas for select to anon, authenticated using (true);
create policy "public read" on public.venues for select to anon, authenticated using (true);
create policy "public read verified" on public.instructors for select to anon, authenticated using (verified);
create policy "public read" on public.instructor_disciplines for select to anon, authenticated using (true);
create policy "public read published" on public.offerings for select to anon, authenticated using (published);
create policy "public read" on public.slots for select to anon, authenticated using (true);

create policy "own profile read" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "own profile update" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "own family" on public.family_members for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own interests" on public.interests for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Bookings, payments and refunds: read your own; every write goes through security-definer functions
-- (book, cancel_booking, reschedule_booking) or the service role (Edge Functions).
create policy "own bookings read" on public.bookings for select to authenticated using (user_id = (select auth.uid()));
create policy "own payments read" on public.payments for select to authenticated
  using (exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = (select auth.uid())));
create policy "own refunds read" on public.refunds for select to authenticated
  using (exists (
    select 1 from public.payments p join public.bookings b on b.id = p.booking_id
    where p.id = payment_id and b.user_id = (select auth.uid())
  ));

-- ---------- New user → profile ----------

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, phone) values (new.id, new.phone);
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Read models ----------

-- Seats that still count: expired holds and expired payment-due bookings free their seats at once (D29),
-- without waiting for a job. Runs with the owner's rights so it can count other users' holds; it only
-- exposes per-slot totals.
create view public.slot_availability as
select
  s.id, s.offering_id, s.starts_at, s.ends_at, s.capacity,
  s.capacity - s.seats_taken + coalesce((
    select sum(b.seats) from public.bookings b
    where b.slot_id = s.id
      and ((b.status = 'awaiting_payment' and b.hold_expires_at < now())
        or (b.status = 'payment_due' and b.pay_by < now()))
  ), 0)::int as seats_free
from public.slots s
join public.offerings o on o.id = s.offering_id and o.published
join public.instructors i on i.id = o.instructor_id and i.verified;

grant select on public.slot_availability to anon, authenticated;

-- The learner's bookings with what every list and detail screen needs. Inherits the caller's RLS.
create view public.my_bookings with (security_invoker = true) as
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
  f.first_name as child_name, f.age as child_age
from public.bookings b
join public.slots s on s.id = b.slot_id
join public.offerings o on o.id = s.offering_id
join public.disciplines d on d.id = o.discipline_id
join public.instructors i on i.id = o.instructor_id
join public.venues v on v.id = o.venue_id
left join public.family_members f on f.id = b.family_member_id;

grant select on public.my_bookings to authenticated;
