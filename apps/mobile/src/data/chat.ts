import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useCallback } from 'react';
import type { Lang } from '@/theme/settings';
import { formatClock, formatDayMonth, formatWeekday } from '@/i18n/format';
import { sameCairoDay } from './rules';
import { supabase } from './supabase';

/** One row of `my_threads` (the caller's threads, as learner or as instructor; Phase 2 R1.3). */
export type Thread = {
  id: string;
  instructor_id: string;
  i_am_learner: boolean;
  /** The instructor's name for a learner; the learner's first name for an instructor (§9.10). */
  other_name: string | null;
  reply_label: string | null;
  last_body: string | null;
  last_sender_id: string | null;
  last_at: string | null;
  created_at: string;
  unread: number;
  /** The other side's read marker: "Read" under my messages sent before it. */
  other_read_at: string | null;
  next_ref: string | null;
  next_starts_at: string | null;
  next_ends_at: string | null;
  next_venue: string | null;
  next_discipline_en: string | null;
  last_session_at: string | null;
  last_discipline_en: string | null;
};

export type Message = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
  /** Only on this phone, until the server has it. */
  status?: 'sending' | 'failed';
};

/** Latest activity first; a thread with no message yet sorts by when it was opened. */
export const byActivity = (a: Thread, b: Thread) =>
  Date.parse(b.last_at ?? b.created_at) - Date.parse(a.last_at ?? a.created_at);

export function useThreads(userId: string | undefined) {
  return useQuery({
    queryKey: ['threads', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase.from('my_threads').select('*');
      if (error) throw error;
      return (data as Thread[]).sort(byActivity);
    },
  });
}

/** The Messages tab badge (R1.4). */
export function useUnreadTotal(userId: string | undefined) {
  return useThreads(userId).data?.reduce((n, th) => n + th.unread, 0) ?? 0;
}

// shortcut: the latest 200 messages only, no paging back; add paging when a thread gets that long.
export function useMessages(threadId: string | undefined) {
  return useQuery({
    queryKey: ['messages', threadId],
    enabled: Boolean(threadId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, sender_id, body, created_at')
        .eq('thread_id', threadId!)
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data as Message[]).reverse();
    },
  });
}

/** The thread with an instructor, made on the first Message tap (SQL `start_thread`, R1.9). */
export async function startThread(instructorId: string): Promise<string> {
  const { data, error } = await supabase.rpc('start_thread', { p_instructor: instructorId });
  if (error) throw error;
  return data as string;
}

/** The Message buttons (Instructor profile, Booking detail, Bookings cards): open or start the chat. */
export async function openChat(instructorId: string, onError: () => void) {
  try {
    const threadId = await startThread(instructorId);
    router.push({ pathname: '/chat/[threadId]', params: { threadId } });
  } catch {
    onError();
  }
}

// Not a secret, only an idempotency key: a retried send reuses it, so a message can't post twice.
const newId = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    return (ch === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

/**
 * Send (R1.8): the bubble shows at once as "sending"; on failure it reads "Not sent · Retry", and a retry
 * sends the same id again. The server stamps the time and checks the sender (RLS).
 */
export function useSend(threadId: string, userId: string | undefined) {
  const qc = useQueryClient();
  return useCallback(
    async (body: string, retryId?: string) => {
      const text = body.trim();
      if (!text || !userId) return;
      const id = retryId ?? newId();
      const key = ['messages', threadId];
      const put = (m: Message) =>
        qc.setQueryData<Message[]>(key, (old = []) => [...old.filter((x) => x.id !== m.id), m]);
      put({ id, sender_id: userId, body: text, created_at: new Date().toISOString(), status: 'sending' });
      const { error } = await supabase.from('messages').insert({ id, thread_id: threadId, body: text });
      // 23505: the first try did reach the server, only its answer was lost.
      if (error && error.code !== '23505') {
        put({ id, sender_id: userId, body: text, created_at: new Date().toISOString(), status: 'failed' });
        return;
      }
      await qc.invalidateQueries({ queryKey: key });
      await qc.invalidateQueries({ queryKey: ['threads'] });
    },
    [qc, threadId, userId],
  );
}

/** Opening a chat clears its unread count; the server stamps the time (R1.8). */
export async function markRead(threadId: string, userId: string) {
  const { error } = await supabase
    .from('thread_reads')
    .upsert({ thread_id: threadId, user_id: userId }, { onConflict: 'thread_id,user_id' });
  if (error) throw error;
}

type T = (key: string, o?: Record<string, string>) => string;

/** "Today, 17:30" / "Sat 8 Nov, 17:30" in Cairo time. */
export function dayTime(iso: string, now: Date, t: T, lang: Lang) {
  const d = new Date(iso);
  const day = sameCairoDay(d, now) ? t('chat.today') : `${formatWeekday(d, lang)} ${formatDayMonth(d, lang)}`;
  return t('chat.dayTime', { day, time: formatClock(d, lang) });
}

/** The list row's brand line (R1.3): "Padel · Today, 17:30", else "Squash · last session 6 Oct", else none. */
export function contextLine(th: Thread, now: Date, t: T, lang: Lang): string | null {
  if (th.next_starts_at && th.next_discipline_en)
    return `${th.next_discipline_en} · ${dayTime(th.next_starts_at, now, t, lang)}`;
  if (th.last_session_at && th.last_discipline_en)
    return t('chat.lastSession', {
      discipline: th.last_discipline_en,
      date: formatDayMonth(new Date(th.last_session_at), lang),
    });
  return null;
}

/** Time in the list: the clock today, else the date. */
export const listTime = (iso: string, now: Date, lang: Lang) =>
  sameCairoDay(new Date(iso), now) ? formatClock(new Date(iso), lang) : formatDayMonth(new Date(iso), lang);

/** Under my last message only (§5): "Read" once the other side's marker has passed it, else "Delivered". */
export function receipt(messages: Message[], me: string, otherReadAt: string | null) {
  const mine = [...messages].reverse().find((m) => m.sender_id === me);
  if (!mine || mine.status) return null;
  return {
    id: mine.id,
    read: Boolean(otherReadAt && Date.parse(otherReadAt) >= Date.parse(mine.created_at)),
  };
}

/** Messages search (R1.3): the name or the last message. shortcut: older message text isn't searched. */
export const matchesSearch = (th: Thread, q: string) => {
  const s = q.trim().toLowerCase();
  return !s || [th.other_name, th.last_body].some((x) => x?.toLowerCase().includes(s));
};
