import { fireEvent, render, screen } from '@testing-library/react-native';
import i18n from '@/i18n';
import { useSettings } from '@/theme/settings';
import Chat from '@/app/chat/[threadId]';
import Messages from '@/app/(tabs)/messages';
import { byActivity, contextLine, matchesSearch, receipt, type Message, type Thread } from './chat';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: () => ({ threadId: 'th1' }),
}));
const mockRouter = jest.requireMock('expo-router').router;
const mockInsert = jest.fn();
const mockUpsert = jest.fn();
jest.mock('./supabase', () => ({
  supabaseConfigured: true,
  supabase: {
    from: (table: string) =>
      table === 'thread_reads'
        ? { upsert: (...a: unknown[]) => mockUpsert(...a) }
        : { insert: (...a: unknown[]) => mockInsert(...a) },
  },
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
  expect(mockInsert).toHaveBeenCalledWith({ id: 'x', thread_id: 'th1', body: 'Can I bring a friend?' });

  mockInsert.mockClear();
  await fireEvent.changeText(screen.getByLabelText('Message'), '  See you at 17:30  ');
  await fireEvent.press(screen.getByRole('button', { name: 'Send' }));
  expect(mockSetData).toHaveBeenCalled(); // the bubble appears before the server answers
  expect(mockInsert).toHaveBeenCalledWith(
    expect.objectContaining({ thread_id: 'th1', body: 'See you at 17:30' }),
  );
});
