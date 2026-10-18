import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import Home from '@/app/(tabs)/index';
import { useSettings, type Category } from '@/theme/settings';
import { cairoDaysUntil, distanceKm, greetingPeriod } from './home';

jest.mock('expo-router', () => ({ router: { navigate: jest.fn(), push: jest.fn() } }));
const mockRouter = jest.requireMock('expo-router').router;
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
  useProfile: () => ({ data: { first_name: 'Omar', area_id: 'new-cairo' } }),
}));

const DAY = 86_400_000;
const inDays = (n: number) => new Date(Date.now() + n * DAY).toISOString();
let mockBookings: { next: object | null; lastCompleted: object | null } = { next: null, lastCompleted: null };
const mockRows: Record<string, unknown> = {
  disciplines: [
    { id: 'pottery', category_id: 'hobbies', name_en: 'Pottery', name_ar: null, icon: 'pottery', code: null },
    { id: 'padel', category_id: 'sports', name_en: 'Padel', name_ar: null, icon: 'padel', code: null },
    { id: 'maths', category_id: 'education', name_en: 'Maths', name_ar: null, icon: 'maths', code: null },
    { id: 'french', category_id: 'languages', name_en: 'French', name_ar: null, icon: null, code: 'FR' },
  ],
  areas: [{ id: 'new-cairo', name_en: 'New Cairo', name_ar: null, lat: 30.0074, lng: 31.4913 }],
  instructorCards: [
    {
      id: 'nour',
      display_name: 'Nour El-Sayed',
      discipline_id: 'padel',
      discipline_en: 'Padel',
      discipline_ar: null,
      levels: 'Intermediate–Advanced',
      rating_avg: 4.9,
      rating_count: 128,
      from_price: 390,
      next_at: inDays(2),
      area_en: 'New Cairo',
      area_ar: null,
      lat: 30.028,
      lng: 31.47,
    },
  ],
  groupSessions: [
    {
      slot_id: 's1',
      starts_at: inDays(4),
      capacity: 8,
      seats_free: 3,
      offering_id: 'o1',
      title: 'Wheel-throwing taster',
      price_egp: 650,
      area_en: 'Zamalek',
      area_ar: null,
    },
  ],
};
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: ({ queryKey, enabled }: { queryKey: string[]; enabled?: boolean }) => ({
    data:
      enabled === false ? undefined : queryKey[0] === 'myBookings' ? mockBookings : mockRows[queryKey[0]!],
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockBookings = { next: null, lastCompleted: null };
  useSettings.setState({ lang: 'en', category: 'hobbies' });
});

test('greeting follows Cairo time: morning 05–11, afternoon 12–16, evening 17–04', () => {
  // January: Cairo is UTC+2.
  expect(greetingPeriod(new Date('2026-01-10T02:59:00Z'))).toBe('evening'); // 04:59
  expect(greetingPeriod(new Date('2026-01-10T03:00:00Z'))).toBe('morning'); // 05:00
  expect(greetingPeriod(new Date('2026-01-10T09:59:00Z'))).toBe('morning'); // 11:59
  expect(greetingPeriod(new Date('2026-01-10T10:00:00Z'))).toBe('afternoon'); // 12:00
  expect(greetingPeriod(new Date('2026-01-10T14:59:00Z'))).toBe('afternoon'); // 16:59
  expect(greetingPeriod(new Date('2026-01-10T15:00:00Z'))).toBe('evening'); // 17:00
});

test('days are counted on the Cairo calendar, and distance is great-circle km', () => {
  const lateTonight = new Date('2026-01-10T21:30:00Z'); // 23:30 Cairo
  expect(cairoDaysUntil(new Date('2026-01-10T21:50:00Z'), lateTonight)).toBe(0);
  expect(cairoDaysUntil(new Date('2026-01-10T22:30:00Z'), lateTonight)).toBe(1); // 00:30 next day
  const zamalek = { lat: 30.0609, lng: 31.2197 };
  const newCairo = { lat: 30.0074, lng: 31.4913 };
  expect(distanceKm(zamalek, newCairo)).toBeGreaterThan(26);
  expect(distanceKm(zamalek, newCairo)).toBeLessThan(28);
});

test.each<[Category, string, string, string, string | null, string]>([
  [
    'hobbies',
    'What will you make this week?',
    'Pottery, oud, photography…',
    'Pick up something new',
    'Upcoming workshops',
    'Instructors near you',
  ],
  ['sports', 'Your coaches and courts', 'Coach, sport or area', 'Sports', null, 'Open today near you'],
  [
    'education',
    'Tutors for school, exams and new skills',
    'Subject, exam or tutor',
    'Subjects',
    'Revision groups',
    'Tutors near you',
  ],
  [
    'languages',
    'Speak with real teachers, in person or online',
    'Language, level or teacher',
    'Languages',
    'Conversation groups',
    'Teachers near you',
  ],
])(
  'Home for %s: subline, search, rails and people from the canvas (§7.4)',
  async (category, sub, search, rail, groups, people) => {
    useSettings.setState({ category });
    await render(<Home />);
    expect(screen.getByText(/^Good (morning|afternoon|evening), Omar$/)).toBeOnTheScreen();
    expect(screen.getByText(sub)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(search)).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: rail })).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: people })).toBeOnTheScreen();
    if (groups) expect(screen.getByRole('header', { name: groups })).toBeOnTheScreen();
    else expect(screen.queryByText('Wheel-throwing taster')).toBeNull(); // Sports has no group rail in v1
    expect(screen.getByRole('button', { name: /Category: .*Change category/ })).toBeOnTheScreen();
  },
);

test('no upcoming booking shows the empty card; one shows date, kicker and venue', async () => {
  useSettings.setState({ category: 'education' });
  const view = await render(<Home />);
  expect(screen.getByText('No lessons booked yet')).toBeOnTheScreen();
  expect(screen.getByText('Find a tutor for your next exam')).toBeOnTheScreen();
  await view.unmount();

  useSettings.setState({ category: 'hobbies' });
  mockBookings = {
    next: {
      ref: 'CFA-1',
      type: 'workshop',
      title: 'Wheel-throwing taster with Yasmine',
      starts_at: inDays(3),
      venue_name: 'The Clay Room',
    },
    lastCompleted: null,
  };
  await render(<Home />);
  expect(screen.getByText('Next workshop · in 3 days')).toBeOnTheScreen();
  expect(screen.getByText(/· The Clay Room$/)).toBeOnTheScreen();
});

test('Sports shows "Book again" for the last completed session with that coach\'s next opening', async () => {
  useSettings.setState({ category: 'sports' });
  mockBookings = {
    next: null,
    lastCompleted: {
      instructor_id: 'nour',
      instructor_name: 'Nour',
      discipline_id: 'padel',
      discipline_en: 'Padel',
      discipline_ar: null,
    },
  };
  await render(<Home />);
  expect(screen.getByText('Padel with Nour')).toBeOnTheScreen();
  expect(screen.getByText(/^Next open: \w{3} \d{2}:\d{2}$/)).toBeOnTheScreen();
  // The people list shows distance from the learner's area (New Cairo → Fifth Settlement court).
  expect(screen.getByText(/km · New Cairo/)).toBeOnTheScreen();
});

test('search and the disciplines rail open Explore', async () => {
  await render(<Home />);
  await fireEvent(screen.getByPlaceholderText('Pottery, oud, photography…'), 'focus');
  expect(mockRouter.navigate).toHaveBeenCalledWith({
    pathname: '/explore',
    params: { focus: '1', at: expect.any(String) },
  });
  await fireEvent.press(screen.getByRole('button', { name: 'Pottery' }));
  expect(mockRouter.navigate).toHaveBeenCalledWith({
    pathname: '/explore',
    params: { discipline: 'pottery', at: expect.any(String) },
  });
});
