-- Swipe to reply (owner, 10 Nov 2026, D74): a message can point at an earlier message in the same thread.
-- If the original is ever deleted, the reply stays and just loses its quote.

alter table public.messages
  add column reply_to uuid references public.messages (id) on delete set null;

-- The server's clock decides message order (T1), and a reply must quote a message from its own thread.
create or replace function public.stamp_message() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.created_at := now();
  if new.reply_to is not null and not exists (
    select 1 from public.messages r where r.id = new.reply_to and r.thread_id = new.thread_id
  ) then
    raise exception 'bad_reply';
  end if;
  return new;
end $$;

revoke execute on function public.stamp_message() from public, anon, authenticated;
