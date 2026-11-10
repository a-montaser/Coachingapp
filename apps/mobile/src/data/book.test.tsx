import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import Book from '@/app/book/[offeringId]';
import { useSettings } from '@/theme/settings';
import { useBookDraft } from './book';
import { cairoHM, isBookable, sameCairoDay, seriesWeeks, weekDays } from './rules';

let mockParams: { offeringId: string; slot?: string } = { offeringId: 'one' };
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), setParams: jest.fn() },
  useLocalSearchParams: () => mockParams,
}));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
}));
let mockFamily: { id: string; first_name: string; age: number }[] = [];
jest.mock('./family', () => ({ ...jest.requireActual('./family'), useFamily: () => ({ data: mockFamily }) }));

test('bookable: future, and at least 60 minutes ahead when it is later today (Cairo) — mirrors assert_bookable', () => {
  const now = new Date('2026-10-17T15:00:00Z'); // Sat 18:00 Cairo (UTC+3)
  expect(isBookable(new Date('2026-10-17T14:59:00Z'), now)).toBe(false); // past
  expect(isBookable(new Date('2026-10-17T15:59:00Z'), now)).toBe(false); // today, 59 min
  expect(isBookable(new Date('2026-10-17T16:00:00Z'), now)).toBe(true); // today, 60 min
  const late = new Date('2026-10-17T20:40:00Z'); // 23:40 Cairo
  expect(isBookable(new Date('2026-10-17T21:10:00Z'), late)).toBe(true); // 00:10 tomorrow: no 60-minute rule
});

test('Cairo clock and the two booking weeks', () => {
  expect(cairoHM(new Date('2026-10-17T16:30:00Z'))).toEqual([19, 30]);
  const now = new Date('2026-10-17T21:30:00Z'); // Sun 00:30 Cairo
  const w0 = weekDays(0, now);
  expect(w0).toHaveLength(7);
  expect(new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(w0[0]!)).toBe('2026-10-18');
  expect(new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(weekDays(1, now)[0]!)).toBe(
    '2026-10-25',
  );
});

// Screen fixtures, relative to now: open tomorrow, full the day after, and one too soon today.
const now = new Date();
const days = weekDays(0, now);
const iso = (d: Date, mins = 0) => new Date(d.getTime() + mins * 60_000).toISOString();
const offering = (id: string, type: string, extra = {}) => ({
  id,
  type,
  title: id,
  description: null,
  level_label: null,
  duration_min: 60,
  price_egp: type === 'group' ? 390 : 650,
  capacity: type === 'group' ? 4 : 1,
  min_age: null,
  max_age: null,
  included: null,
  what_to_bring: null,
  instructor_id: 'nour',
  discipline_id: 'padel',
  venue: null,
  ...extra,
});
const mockData = {
  offering: offering('one', 'private'),
  // Lessons only: Adults (1:1) and Kids; groups book on the Group page (D54).
  siblings: [offering('one', 'private'), offering('kid', 'kids', { duration_min: 45 })],
  instructor: { display_name: 'Nour El-Sayed', discipline_en: 'Padel', discipline_ar: null },
  slots: [
    { id: 'soon', offering_id: 'one', starts_at: iso(now, 20), ends_at: iso(now, 80), seats_free: 1 },
    { id: 'tmr', offering_id: 'one', starts_at: iso(days[1]!), ends_at: iso(days[1]!, 60), seats_free: 1 },
    { id: 'gone', offering_id: 'one', starts_at: iso(days[2]!), ends_at: iso(days[2]!, 60), seats_free: 0 },
  ],
};
let mockQuery: object = mockData;
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: () => ({ data: mockQuery, isLoading: false }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
  mockParams = { offeringId: 'one' };
  mockQuery = mockData;
  mockFamily = [];
});

test('Book: Adults | Kids, starts on the first day with times, picking a time fills the summary, no price', async () => {
  await render(<Book />);
  expect(screen.getByRole('header', { name: 'Book with Nour' })).toBeOnTheScreen();
  expect(screen.getByText('Padel')).toBeOnTheScreen();
  expect(screen.getAllByRole('tab')).toHaveLength(2);
  expect(screen.getByText('Adults')).toBeOnTheScreen();
  expect(screen.getByText('Kids')).toBeOnTheScreen();
  // Open days are marked on the month calendar.
  expect(screen.getAllByRole('button', { name: /Has open times/ })).toHaveLength(1);
  expect(screen.getByText('Just you and Nour, 60 min')).toBeOnTheScreen();
  // That day has one open time, so it is chosen for you (fewest taps, R11.13) and Continue is ready.
  // (In the last 20 minutes before Cairo midnight the "too soon" slot falls on tomorrow too, so tomorrow
  // has two times and none is chosen for you, as it should be.)
  if (!sameCairoDay(new Date(mockData.slots[0]!.starts_at), days[1]!)) {
    expect(screen.getByText(/^\w{3} · \d{2}:\d{2}–\d{2}:\d{2}$/)).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  }
  // The price waits for Review & pay (D54).
  expect(screen.queryByText('650 EGP')).toBeNull();
});

test('a too-soon slot today shows as unavailable; days without times are not offered', async () => {
  mockParams = { offeringId: 'one', slot: 'soon' };
  await render(<Book />);
  // Under 60 minutes away later today: not bookable, so nothing is chosen. (Just before midnight it falls
  // on tomorrow, where the rule allows it.)
  const soon = new Date(mockData.slots[0]!.starts_at);
  if (!isBookable(soon, new Date()))
    expect(screen.getByRole('button', { name: 'Pick a time' })).toBeDisabled();
  // Days without open times can't be picked (fewest taps, D54); next month has none.
  await fireEvent.press(screen.getByRole('button', { name: 'Next month' }));
  const days = screen
    .getAllByRole('button')
    .filter((b) => /^\w+day \d+ \w+/.test(b.props.accessibilityLabel ?? ''));
  expect(days.length).toBeGreaterThan(27);
  for (const d of days) expect(d).toBeDisabled();
});

test('a day with two open times waits for a tap, and says why', async () => {
  const [, tmr] = mockData.slots;
  mockQuery = {
    ...mockData,
    slots: [
      tmr,
      {
        ...tmr!,
        id: 'tmr2',
        starts_at: iso(new Date(tmr!.starts_at), 120),
        ends_at: iso(new Date(tmr!.starts_at), 180),
      },
    ],
  };
  await render(<Book />);
  expect(screen.getByRole('button', { name: 'Pick a time' })).toBeDisabled();
  const open = screen.getAllByRole('button').filter((b) => /–/.test(b.props.accessibilityLabel ?? ''));
  await fireEvent.press(open[0]!);
  expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
});

test('switching Adults | Kids goes to the sibling offering; kids need a child aged 6–14', async () => {
  await render(<Book />);
  await fireEvent.press(screen.getAllByRole('tab')[1]!);
  expect(jest.requireMock('expo-router').router.setParams).toHaveBeenCalledWith({
    offeringId: 'kid',
    slot: undefined,
  });

  mockQuery = { ...mockData, offering: mockData.siblings[1] };
  mockParams = { offeringId: 'kid' };
  const view = await render(<Book />);
  expect(screen.getByText('Ages 6–14, 45 min. A guardian stays on site.')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Add a child to book kids sessions' }));
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith('/family-member');
  await view.unmount();

  mockFamily = [{ id: 'ali', first_name: 'Ali', age: 9 }];
  await render(<Book />);
  expect(screen.getByText('For Ali, age 9')).toBeOnTheScreen();
  expect(screen.getByText('A guardian stays on site')).toBeOnTheScreen();
});

test('the draft keeps the choice for Review & pay', () => {
  useBookDraft.getState().set({ offeringId: 'one', slotId: 'tmr', childId: null, note: 'Left-handed' });
  expect(useBookDraft.getState()).toMatchObject({ offeringId: 'one', slotId: 'tmr', note: 'Left-handed' });
});

test('nothing open at all: today is shown, and says so', async () => {
  mockQuery = { ...mockData, slots: [mockData.slots[2]] }; // only a full slot
  await render(<Book />);
  expect(screen.getByText(/^No times on \w+ · Nour isn't coaching that day\.$/)).toBeOnTheScreen();
});

test('weeks in a row with the same Cairo time open: a gap or a full week stops it, at most 8 (R5.1)', () => {
  const at = (week: number, hour = 15) => new Date(Date.UTC(2026, 10, 3 + 7 * week, hour)).toISOString();
  const open = (s: { seats_free: number }) => s.seats_free > 0;
  const weekly = [0, 1, 2, 3].map((w) => ({ starts_at: at(w), seats_free: 1 }));
  expect(seriesWeeks(weekly[0]!, weekly, open)).toBe(4);
  expect(seriesWeeks(weekly[0]!, [...weekly.slice(0, 2), { starts_at: at(2), seats_free: 0 }], open)).toBe(2);
  expect(seriesWeeks(weekly[0]!, [weekly[0]!, { starts_at: at(1, 16), seats_free: 1 }], open)).toBe(1); // other time
  const many = Array.from({ length: 12 }, (_, w) => ({ starts_at: at(w), seats_free: 1 }));
  expect(seriesWeeks(many[0]!, many, open)).toBe(8);
});

test('Book: Repeat weekly for a 1:1 with the same time open later weeks; Continue keeps the weeks (R5.1)', async () => {
  const weekly = [0, 1, 2].map((w) => ({
    id: `w${w}`,
    offering_id: 'one',
    starts_at: iso(days[1]!, w * 7 * 24 * 60),
    ends_at: iso(days[1]!, w * 7 * 24 * 60 + 60),
    seats_free: 1,
  }));
  mockQuery = { ...mockData, slots: weekly };
  mockParams = { offeringId: 'one', slot: 'w0' };
  await render(<Book />);
  await fireEvent(screen.getByRole('switch', { name: 'Repeat weekly' }), 'valueChange', true);
  // Only three weeks are open at that time, so the series starts at three (not the usual four).
  expect(screen.getByText(/^3 weeks · /)).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
  expect(useBookDraft.getState().weeks).toBe(3);
});
