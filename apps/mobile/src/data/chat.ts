import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
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
  /** The message this one replies to (swipe to reply, D74). */
  reply_to?: string | null;
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

// shortcut: the latest 200 messages only, no paging back; add paging when a thread gets that long.
export function useMessages(threadId: string | undefined) {
  return useQuery({
    queryKey: ['messages', threadId],
    enabled: Boolean(threadId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, sender_id, body, created_at, reply_to')
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
    async (body: string, retryId?: string, replyTo?: string | null) => {
      const text = body.trim();
      if (!text || !userId) return;
      const id = retryId ?? newId();
      const key = ['messages', threadId];
      const put = (m: Message) =>
        qc.setQueryData<Message[]>(key, (old = []) => [...old.filter((x) => x.id !== m.id), m]);
      const draft = { id, sender_id: userId, body: text, reply_to: replyTo ?? null };
      put({ ...draft, created_at: new Date().toISOString(), status: 'sending' });
      const { error } = await supabase
        .from('messages')
        .insert({ id, thread_id: threadId, body: text, reply_to: replyTo ?? null });
      // 23505: the first try did reach the server, only its answer was lost.
      if (error && error.code !== '23505') {
        put({ ...draft, created_at: new Date().toISOString(), status: 'failed' });
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

// ---------- Live (T5, R1.8, R1.10) ----------

/** The chat on screen right now, so a message for it doesn't also raise the in-app alert. */
export const useOpenThread = create<{ id: string | null }>(() => ({ id: null }));

type Row = Message & { thread_id: string };

/** Adds a message from the server to a thread's cached list (replacing its "sending" copy), in time order. */
export const mergeMessage = (old: Message[] | undefined, m: Row): Message[] | undefined =>
  old &&
  [
    ...old.filter((x) => x.id !== m.id),
    {
      id: m.id,
      sender_id: m.sender_id,
      body: m.body,
      created_at: m.created_at,
      reply_to: m.reply_to ?? null,
    },
  ].sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));

/**
 * One subscription for the whole signed-in app: new messages (RLS limits them to the caller's threads) go
 * straight into an open chat and refresh the list and the tab badge; read markers refresh "Read".
 * `onIncoming` gets someone else's message for a chat that isn't on screen (the in-app alert).
 */
export function useChatRealtime(userId: string | undefined, onIncoming: (m: Row) => void) {
  const qc = useQueryClient();
  const incoming = useRef(onIncoming);
  useEffect(() => {
    incoming.current = onIncoming;
  });
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`chat:${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, ({ new: m }) => {
        const row = m as Row;
        qc.setQueryData<Message[]>(['messages', row.thread_id], (old) => mergeMessage(old, row));
        void qc.invalidateQueries({ queryKey: ['threads'] });
        if (row.sender_id !== userId && useOpenThread.getState().id !== row.thread_id) incoming.current(row);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'thread_reads' }, () => {
        void qc.invalidateQueries({ queryKey: ['threads'] });
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId, qc]);
}

const TYPING_EVERY_MS = 2000;
const TYPING_SHOWN_MS = 4000;

/**
 * Typing dots (R1.8): while the field changes, tell the other side at most every 2 s; their dots hide 4 s
 * after the last signal, or when their message lands (`clear`).
 * shortcut: a plain broadcast channel named by the thread's random id, not an RLS-checked private channel;
 * it carries only "typing" and a user id. Make it private if it ever carries more.
 */
export function useTyping(threadId: string | undefined, userId: string | undefined) {
  const [typing, setTyping] = useState(false);
  const channel = useRef<RealtimeChannel | null>(null);
  const lastSent = useRef(0);
  useEffect(() => {
    if (!threadId || !userId) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ch = supabase
      .channel(`thread:${threadId}`, { config: { broadcast: { self: false } } })
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if ((payload as { user?: string } | undefined)?.user === userId) return;
        setTyping(true);
        clearTimeout(timer);
        timer = setTimeout(() => setTyping(false), TYPING_SHOWN_MS);
      })
      .subscribe();
    channel.current = ch;
    return () => {
      clearTimeout(timer);
      channel.current = null;
      void supabase.removeChannel(ch);
    };
  }, [threadId, userId]);
  const ping = useCallback(() => {
    const now = Date.now();
    if (now - lastSent.current < TYPING_EVERY_MS) return;
    lastSent.current = now;
    void channel.current?.send({ type: 'broadcast', event: 'typing', payload: { user: userId } });
  }, [userId]);
  const clear = useCallback(() => setTyping(false), []);
  return { typing, ping, clear };
}

// ---------- Message notifications (owner, D74) ----------

/**
 * A new message for a chat that isn't on screen shows as a phone notification (title: sender, text: the
 * message, sound), the same way session reminders do. Tapping it opens the chat (`useOpenChatFromNotification`).
 * Without notification permission it falls back to the in-app toast.
 * shortcut: a local notification posted by the running app, so it only fires while the app runs; real push
 * for a closed app needs a development build (Apple Developer account), D74.
 */
export async function notifyMessage(title: string, body: string, threadId: string, fallback: () => void) {
  if ((await Notifications.getPermissionsAsync()).status !== 'granted') return fallback();
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true, data: { threadId } },
    trigger: null,
  });
}

/** Tapping a message notification opens its chat (once per tap). */
export function useOpenChatFromNotification() {
  const response = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const threadId = response?.notification.request.content.data?.threadId;
    if (typeof threadId !== 'string') return;
    router.push({ pathname: '/chat/[threadId]', params: { threadId } });
    void Notifications.clearLastNotificationResponseAsync();
  }, [response]);
}
