import { act, fireEvent, render, screen } from '@testing-library/react-native';
import i18n from '@/i18n';
import { useSettings } from '@/theme/settings';
import Chat from '@/app/chat/[threadId]';
import Messages from '@/app/(tabs)/messages';
import {
  byActivity,
  contextLine,
  matchesSearch,
  mergeMessage,
  notifyMessage,
  receipt,
  useOpenThread,
  type Message,
  type Thread,
} from './chat';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: () => ({ threadId: 'th1' }),
}));
const mockRouter = jest.requireMock('expo-router').router;
const mockInsert = jest.fn();
const mockUpsert = jest.fn();
// A fake Realtime channel: tests fire its handlers (`mockHandlers`) and see what it sent (`mockBroadcast`).
const mockHandlers: Record<string, (p: { payload?: unknown; new?: unknown }) => void> = {};
const mockBroadcast = jest.fn();
jest.mock('./supabase', () => ({
  supabaseConfigured: true,
  supabase: {
    from: (table: string) =>
      table === 'thread_reads'
        ? { upsert: (...a: unknown[]) => mockUpsert(...a) }
        : { insert: (...a: unknown[]) => mockInsert(...a) },
    channel: (name: string) => {
      const ch = {
        on: (_kind: string, filter: { event: string; table?: string }, fn: (p: unknown) => void) => {
          mockHandlers[`${name}:${filter.table ?? filter.event}`] = fn;
          return ch;
        },
        subscribe: () => ch,
        send: (...a: unknown[]) => mockBroadcast(...a),
      };
      return ch;
    },
    removeChannel: jest.fn(),
  },
}));
const mockNotif = {
  status: 'granted',
  schedule: jest.fn(),
};
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: async () => ({ status: mockNotif.status, canAskAgain: false }),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: (...a: unknown[]) => mockNotif.schedule(...a),
  useLastNotificationResponse: () => null,
  clearLastNotificationResponseAsync: jest.fn(),
}));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'me' } }, loading: false }),
  useMyInstructorId: () => ({ data: null, isLoading: false }),
}));

const MIN = 60_000;
const ago = (m: number) => new Date(Date.now() - m * MIN).toISOString();
const thread = (extra: Partial<Thread> = {}): Thread => ({
  id: 'th1',
  instructor_id: 'i1',
  i_am_learner: true,
  other_name: 'Nour El-Sayed',
  reply_label: 'Usually replies within an hour',
  last_body: 'Bring trainers with good grip.',
  last_sender_id: 'nour',
  last_at: ago(5),
  created_at: ago(60),
  unread: 0,
  other_read_at: null,
  next_ref: null,
  next_starts_at: null,
  next_ends_at: null,
  next_venue: null,
  next_discipline_en: null,
  last_session_at: null,
  last_discipline_en: null,
  ...extra,
});
const msg = (id: string, sender: string, minsAgo: number, extra: Partial<Message> = {}): Message => ({
  id,
  sender_id: sender,
  body: `text ${id}`,
  created_at: ago(minsAgo),
  ...extra,
});

let mockThreads: Thread[] = [];
let mockMessages: Message[] = [];
const mockSetData = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({ invalidateQueries: jest.fn(), setQueryData: mockSetData }),
  useQuery: ({ queryKey }: { queryKey: string[] }) => ({
    data: queryKey[0] === 'threads' ? mockThreads : mockMessages,
    isLoading: false,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
  mockUpsert.mockResolvedValue({ error: null });
  mockInsert.mockResolvedValue({ error: null });
  mockThreads = [];
  mockMessages = [];
});

const t = i18n.t.bind(i18n) as (k: string, o?: Record<string, string>) => string;

test('context line: next session together, else the last one, else nothing (R1.3)', () => {
  const now = new Date();
  const soon = new Date(now.getTime() + 2 * MIN).toISOString();
  expect(contextLine(thread({ next_starts_at: soon, next_discipline_en: 'Padel' }), now, t, 'en')).toMatch(
    /^Padel · Today, \d\d:\d\d$/,
  );
  expect(
    contextLine(
      thread({ last_session_at: '2026-10-06T15:00:00Z', last_discipline_en: 'Squash' }),
      now,
      t,
      'en',
    ),
  ).toBe('Squash · last session 6 Oct');
  expect(contextLine(thread(), now, t, 'en')).toBeNull();
});

test('read receipt sits under my last sent message only; "Read" once their marker passes it (§5)', () => {
  const list = [msg('a', 'me', 10), msg('b', 'nour', 8), msg('c', 'me', 6)];
  expect(receipt(list, 'me', null)).toEqual({ id: 'c', read: false });
  expect(receipt(list, 'me', ago(7))).toEqual({ id: 'c', read: false });
  expect(receipt(list, 'me', ago(1))).toEqual({ id: 'c', read: true });
  expect(receipt([...list, msg('d', 'me', 0, { status: 'failed' })], 'me', ago(1))).toBeNull();
});

test('latest activity first; search matches the name or the last message', () => {
  const a = thread({ id: 'a', last_at: ago(30) });
  const b = thread({ id: 'b', last_at: null, created_at: ago(1) });
  expect([a, b].sort(byActivity).map((x) => x.id)).toEqual(['b', 'a']);
  expect(matchesSearch(a, 'nour')).toBe(true);
  expect(matchesSearch(a, 'GRIP')).toBe(true);
  expect(matchesSearch(a, 'squash')).toBe(false);
});

test('Messages: empty state with Explore, then rows with an unread count that open the chat', async () => {
  await render(<Messages />);
  expect(screen.getByRole('header', { name: 'No messages yet' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Explore' })); // R3.6, learners only
  expect(mockRouter.navigate).toHaveBeenCalledWith('/explore');

  mockThreads = [thread({ unread: 2 })];
  await render(<Messages />);
  const row = screen.getByRole('button', { name: /Nour El-Sayed.*2 unread/ });
  await fireEvent.press(row);
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/chat/[threadId]', params: { threadId: 'th1' } });
});

test('Chat: bubbles, "Read" under my last message, marks the thread read on open', async () => {
  mockThreads = [thread({ other_read_at: ago(0) })];
  mockMessages = [msg('a', 'nour', 10), msg('b', 'me', 5)];
  await render(<Chat />);
  expect(screen.getByLabelText(/^Nour El-Sayed, \d\d:\d\d: text a$/)).toBeOnTheScreen();
  expect(screen.getByLabelText(/^You, \d\d:\d\d: text b$/)).toBeOnTheScreen();
  expect(screen.getByText('Read')).toBeOnTheScreen();
  expect(mockUpsert).toHaveBeenCalledWith(
    { thread_id: 'th1', user_id: 'me' },
    { onConflict: 'thread_id,user_id' },
  );
});

test('Chat: send shows the message at once; a failed one offers Retry, which resends the same id', async () => {
  mockThreads = [thread()];
  mockMessages = [msg('x', 'me', 1, { status: 'failed', body: 'Can I bring a friend?' })];
  await render(<Chat />);
  await fireEvent.press(screen.getByRole('button', { name: 'Not sent · Retry' }));
  expect(mockInsert).toHaveBeenCalledWith({
    id: 'x',
    thread_id: 'th1',
    body: 'Can I bring a friend?',
    reply_to: null,
  });

  mockInsert.mockClear();
  await fireEvent.changeText(screen.getByLabelText('Message'), '  See you at 17:30  ');
  await fireEvent.press(screen.getByRole('button', { name: 'Send' }));
  expect(mockSetData).toHaveBeenCalled(); // the bubble appears before the server answers
  expect(mockInsert).toHaveBeenCalledWith(
    expect.objectContaining({ thread_id: 'th1', body: 'See you at 17:30' }),
  );
});

test('a live message replaces its "sending" copy and keeps time order; none is added to an unloaded list', () => {
  const list = [msg('a', 'nour', 10), msg('b', 'me', 1, { status: 'sending' })];
  const merged = mergeMessage(list, { ...msg('b', 'me', 2), thread_id: 'th1' })!;
  expect(merged.map((m) => [m.id, m.status])).toEqual([
    ['a', undefined],
    ['b', undefined],
  ]);
  expect(
    mergeMessage([msg('z', 'nour', 0)], { ...msg('y', 'nour', 5), thread_id: 'th1' })!.map((m) => m.id),
  ).toEqual(['y', 'z']);
  expect(mergeMessage(undefined, { ...msg('c', 'nour', 0), thread_id: 'th1' })).toBeUndefined();
});

test('Chat live: marks itself open, shows their typing dots, and sends typing at most every 2 s', async () => {
  jest.useFakeTimers();
  mockThreads = [thread()];
  mockMessages = [msg('a', 'nour', 10)];
  const view = await render(<Chat />);
  expect(useOpenThread.getState().id).toBe('th1');

  await act(async () => mockHandlers['thread:th1:typing']!({ payload: { user: 'nour' } }));
  expect(screen.getByLabelText('Nour is typing')).toBeOnTheScreen();
  await act(async () => jest.advanceTimersByTime(4100));
  expect(screen.queryByLabelText('Nour is typing')).toBeNull();

  await fireEvent.changeText(screen.getByLabelText('Message'), 'H');
  await fireEvent.changeText(screen.getByLabelText('Message'), 'Hi');
  expect(mockBroadcast).toHaveBeenCalledTimes(1);
  expect(mockBroadcast).toHaveBeenCalledWith({ type: 'broadcast', event: 'typing', payload: { user: 'me' } });

  await act(async () => view.unmount());
  expect(useOpenThread.getState().id).toBeNull();
  jest.useRealTimers();
});

test('swipe to reply (VoiceOver action): the reply bar shows, sends with reply_to, and the quote shows (D74)', async () => {
  mockThreads = [thread()];
  mockMessages = [
    msg('a', 'nour', 10, { body: 'Bring trainers' }),
    msg('b', 'me', 5, { body: 'Sure', reply_to: 'a' }),
  ];
  await render(<Chat />);
  // A reply shows what it quotes, above its own text.
  expect(screen.getByLabelText(/^You, \d\d:\d\d: Nour, Bring trainers\. Sure$/)).toBeOnTheScreen();

  await fireEvent(
    screen.getByLabelText(/^Nour El-Sayed, \d\d:\d\d: Bring trainers$/),
    'accessibilityAction',
    {
      nativeEvent: { actionName: 'reply' },
    },
  );
  expect(screen.getByText('Replying to Nour')).toBeOnTheScreen();
  await fireEvent.changeText(screen.getByLabelText('Message'), 'Which size?');
  await fireEvent.press(screen.getByRole('button', { name: 'Send' }));
  expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({ body: 'Which size?', reply_to: 'a' }));
  expect(screen.queryByText('Replying to Nour')).toBeNull();
});

test('a new message notifies like a reminder; without permission it falls back to the toast (D74)', async () => {
  const fallback = jest.fn();
  await notifyMessage('Nour El-Sayed', 'See you at 17:30', 'th1', fallback);
  expect(mockNotif.schedule).toHaveBeenCalledWith({
    content: { title: 'Nour El-Sayed', body: 'See you at 17:30', sound: true, data: { threadId: 'th1' } },
    trigger: null,
  });
  expect(fallback).not.toHaveBeenCalled();

  mockNotif.status = 'denied';
  mockNotif.schedule.mockClear();
  await notifyMessage('Nour El-Sayed', 'Hi', 'th1', fallback);
  expect(mockNotif.schedule).not.toHaveBeenCalled();
  expect(fallback).toHaveBeenCalled();
  mockNotif.status = 'granted';
});
