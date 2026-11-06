-- Phase 2 engagement schema (specs/phase-2/design.md §2): text chat, ratings, favourites, weekly series.
-- RLS is enabled on every new table in this migration. Functions that write (start_thread, rate_booking,
-- book_series) come in the next migration (T2).

-- ---------- Instructors can sign in (chat only in Phase 2, D67) ----------

alter table public.instructors
  add column user_id uuid unique references auth.users (id) on delete set null;

-- The signed-in user's instructor row, or null for a learner. Also tells the app's journey gate
-- whether to show the instructor's Messages-only tabs.
create function public.my_instructor_id() returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.instructors where user_id = (select auth.uid())
$$;

-- ---------- Chat ----------

create table public.threads (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users (id) on delete cascade,
  instructor_id uuid not null references public.instructors (id) on delete cascade,
  created_at timestamptz not null default now(),
  last_message_at timestamptz,
  unique (learner_id, instructor_id)
);
create index threads_instructor on public.threads (instructor_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(), -- the app makes the id, so a retried send can't post twice
  thread_id uuid not null references public.threads (id) on delete cascade,
  sender_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body text not null check (length(trim(body)) between 1 and 2000), -- text only in Phase 2 (D67)
  created_at timestamptz not null default now()
);
create index messages_thread_time on public.messages (thread_id, created_at desc);

-- How far each member has read: unread counts and "Read" receipts both come from this one marker.
create table public.thread_reads (
  thread_id uuid not null references public.threads (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  last_read_at timestamptz not null default now(),
  primary key (thread_id, user_id)
);

create function public.is_thread_member(p_thread uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.threads t
    where t.id = p_thread
      and (t.learner_id = (select auth.uid()) or t.instructor_id = public.my_instructor_id())
  )
$$;

-- The server's clock decides message order and read markers, never the phone's.
create function public.stamp_message() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.created_at := now();
  return new;
end $$;

create function public.stamp_read() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.last_read_at := now();
  return new;
end $$;

create trigger messages_stamp before insert on public.messages
  for each row execute function public.stamp_message();
create trigger thread_reads_stamp before insert or update on public.thread_reads
  for each row execute function public.stamp_read();

-- Members can't update threads, so the latest-activity time is kept by a definer trigger.
create function public.touch_thread() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.threads set last_message_at = new.created_at where id = new.thread_id;
  return new;
end $$;

create trigger messages_touch_thread after insert on public.messages
  for each row execute function public.touch_thread();

-- ---------- Ratings and favourites ----------

create table public.reviews (
  booking_id uuid primary key references public.bookings (id) on delete cascade, -- one rating per booking
  user_id uuid not null references auth.users (id) on delete cascade,
  instructor_id uuid not null references public.instructors (id) on delete cascade,
  stars int not null check (stars between 1 and 5),
  body text check (length(body) <= 1000),
  created_at timestamptz not null default now()
);
create index reviews_instructor on public.reviews (instructor_id);

create table public.favourites (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  instructor_id uuid not null references public.instructors (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, instructor_id)
);

-- ---------- Weekly series ----------

alter table public.bookings add column series_id uuid; -- the weeks of one "Repeat weekly" booking (R5)
create index bookings_series on public.bookings (series_id) where series_id is not null;

-- ---------- Row Level Security ----------

alter table public.threads enable row level security; -- no insert policy: start_thread() only
alter table public.messages enable row level security; -- no update or delete policies: messages are final
alter table public.thread_reads enable row level security;
alter table public.reviews enable row level security; -- no write policies: rate_booking() only
alter table public.favourites enable row level security;

create policy "members read" on public.threads for select to authenticated
  using (learner_id = (select auth.uid()) or instructor_id = (select public.my_instructor_id()));

create policy "members read" on public.messages for select to authenticated
  using (public.is_thread_member(thread_id));
create policy "members post as themselves" on public.messages for insert to authenticated
  with check (sender_id = (select auth.uid()) and public.is_thread_member(thread_id));

-- Both members read both markers (the other side's marker is the read receipt); each writes only their own.
create policy "members read" on public.thread_reads for select to authenticated
  using (public.is_thread_member(thread_id));
create policy "own marker insert" on public.thread_reads for insert to authenticated
  with check (user_id = (select auth.uid()) and public.is_thread_member(thread_id));
create policy "own marker update" on public.thread_reads for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- The text is "Shared with <instructor> only" (§7.12): the author and that instructor read it.
create policy "author and instructor read" on public.reviews for select to authenticated
  using (user_id = (select auth.uid()) or instructor_id = (select public.my_instructor_id()));

create policy "own favourites" on public.favourites for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- ---------- Read model: the Messages list ----------

-- One row per thread of the caller. Runs with the owner's rights (like slot_availability) so an
-- instructor gets the learner's first name and their bookings together, which the learner's own-row
-- RLS would hide; the where clause limits it to the caller's threads, and it exposes no phone number.
create view public.my_threads as
select
  t.id, t.learner_id, t.instructor_id, t.created_at, t.last_message_at,
  (t.learner_id = (select auth.uid())) as i_am_learner,
  case when t.learner_id = (select auth.uid()) then i.display_name else p.first_name end as other_name,
  i.reply_label,
  m.body as last_body, m.sender_id as last_sender_id, m.created_at as last_at,
  (select count(*) from public.messages u
    where u.thread_id = t.id and u.sender_id <> (select auth.uid())
      and u.created_at > coalesce(mine.last_read_at, '-infinity'))::int as unread,
  theirs.last_read_at as other_read_at,
  nb.ref as next_ref, nb.starts_at as next_starts_at, nb.ends_at as next_ends_at,
  nb.venue_name as next_venue, nb.discipline_en as next_discipline_en,
  lb.starts_at as last_session_at, lb.discipline_en as last_discipline_en
from public.threads t
join public.instructors i on i.id = t.instructor_id
left join public.profiles p on p.id = t.learner_id
left join public.thread_reads mine on mine.thread_id = t.id and mine.user_id = (select auth.uid())
left join public.thread_reads theirs on theirs.thread_id = t.id and theirs.user_id <> (select auth.uid())
left join lateral (
  select x.body, x.sender_id, x.created_at from public.messages x
  where x.thread_id = t.id order by x.created_at desc, x.id desc limit 1
) m on true
-- Next session together: the soonest live booking that hasn't ended.
left join lateral (
  select b.ref, s.starts_at, s.ends_at, v.name as venue_name, d.name_en as discipline_en
  from public.bookings b
  join public.slots s on s.id = b.slot_id
  join public.offerings o on o.id = s.offering_id
  join public.venues v on v.id = o.venue_id
  join public.disciplines d on d.id = o.discipline_id
  where b.user_id = t.learner_id and o.instructor_id = t.instructor_id
    and b.status in ('pending', 'payment_due', 'confirmed') and s.ends_at > now()
  order by s.starts_at limit 1
) nb on true
-- Otherwise the last session they had: "Squash · last session 6 Oct".
left join lateral (
  select s.starts_at, d.name_en as discipline_en
  from public.bookings b
  join public.slots s on s.id = b.slot_id
  join public.offerings o on o.id = s.offering_id
  join public.disciplines d on d.id = o.discipline_id
  where b.user_id = t.learner_id and o.instructor_id = t.instructor_id
    and b.status = 'confirmed' and s.ends_at <= now()
  order by s.starts_at desc limit 1
) lb on true
where t.learner_id = (select auth.uid()) or t.instructor_id = (select public.my_instructor_id());

revoke all on public.my_threads from public, anon, authenticated; -- Supabase grants new views to everyone
grant select on public.my_threads to authenticated;

-- ---------- Realtime: new messages and read markers reach the app (T5); RLS still applies ----------

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table public.messages, public.thread_reads;
  end if;
end $$;

-- ---------- Function rights ----------
-- New functions default to executable by everyone: open only what the app and the policies call.

revoke execute on function public.my_instructor_id(), public.is_thread_member(uuid),
  public.stamp_message(), public.stamp_read(), public.touch_thread() from public, anon, authenticated;
grant execute on function public.my_instructor_id(), public.is_thread_member(uuid) to authenticated;
