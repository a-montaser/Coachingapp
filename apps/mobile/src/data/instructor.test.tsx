import { fireEvent, render, screen } from '@testing-library/react-native';
import { Share } from 'react-native';
import '@/i18n';
import Profile from '@/app/instructor/[id]';
import { useSettings } from '@/theme/settings';
import { nextAvailable, type Offering, type OpenSlot } from './instructor';

let mockParams = { id: 'yasmine', discipline: 'pottery' };
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => mockParams,
}));
jest.mock('expo-location', () => ({ getForegroundPermissionsAsync: async () => ({ granted: false }) }));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
  useProfile: () => ({ data: { area_id: 'zamalek' } }),
}));

const DAY = 86_400_000;
const inDays = (n: number, h = 0) => new Date(Date.now() + n * DAY + h * 3_600_000).toISOString();
const offering = (o: Partial<Offering>): Offering => ({
  id: 'o',
  type: 'private',
  title: 'Lesson',
  description: null,
  level_label: null,
  duration_min: 60,
  price_egp: 500,
  capacity: 1,
  min_age: null,
  max_age: null,
  included: null,
  what_to_bring: null,
  venue: null,
  ...o,
});
const slot = (id: string, offering_id: string, starts_at: string, seats_free = 1): OpenSlot => ({
  id,
  offering_id,
  starts_at,
  ends_at: starts_at,
  seats_free,
});

const pottery = {
  card: {
    id: 'yasmine',
    display_name: 'Yasmine Fathy',
    gender: 'female',
    discipline_id: 'pottery',
    discipline_en: 'Pottery',
    discipline_ar: null,
    category_id: 'hobbies',
    levels: 'Beginners welcome',
    rating_avg: 4.9,
    rating_count: 112,
    from_price: 450,
    next_at: inDays(1),
    venue_name: 'The Clay Room',
    area_en: 'Zamalek',
    area_ar: null,
    lat: 30.0628,
    lng: 31.2191,
    years: 7,
    certification: null,
    reply_label: 'Usually replies within an hour',
    bio: null,
  },
  offerings: [
    offering({
      id: 'kids',
      type: 'kids',
      title: 'Kids clay club',
      price_egp: 450,
      capacity: 6,
      min_age: 7,
      max_age: 12,
    }),
    offering({
      id: 'taster',
      type: 'workshop',
      title: 'Wheel-throwing taster',
      price_egp: 650,
      capacity: 8,
      level_label: 'beginners',
    }),
    offering({
      id: 'wheel',
      type: 'private',
      title: '1:1 on the wheel',
      price_egp: 900,
      duration_min: 90,
      included: 'clay and firing included',
      what_to_bring: 'Clothes that can get muddy',
      venue: { name: 'The Clay Room', notes: 'Studio with 6 wheels' },
    }),
  ],
  slots: [
    slot('w1', 'taster', inDays(2), 3),
    slot('a', 'wheel', inDays(3)),
    slot('b', 'kids', inDays(4)),
    slot('c', 'wheel', inDays(5)),
    slot('d', 'wheel', inDays(6)),
  ],
};
const padel = {
  card: {
    ...pottery.card,
    id: 'nour',
    display_name: 'Nour El-Sayed',
    discipline_id: 'padel',
    discipline_en: 'Padel',
    category_id: 'sports',
    levels: 'Intermediate–Advanced',
    certification: 'FIP Level 2',
    years: 9,
    from_price: 390,
  },
  offerings: [
    offering({ id: 'grp', type: 'group', title: 'Group padel', price_egp: 390, capacity: 4 }),
    offering({ id: 'one', type: 'private', title: 'Private padel', price_egp: 650 }),
  ],
  slots: [],
};
let mockData: object | undefined = pottery;
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: ({ queryKey }: { queryKey: string[] }) =>
    queryKey[0] === 'instructor' ? { data: mockData, isLoading: false, isError: false } : { data: undefined },
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
  mockData = pottery;
  mockParams = { id: 'yasmine', discipline: 'pottery' };
});

test('"Next available" is the three soonest open lesson slots, not workshops', () => {
  expect(nextAvailable(pottery.slots, pottery.offerings).map((s) => s.id)).toEqual(['a', 'b', 'c']);
});

test('Hobbies profile: header, next available, upcoming workshops, then private lessons (§7.6)', async () => {
  await render(<Profile />);
  expect(screen.getByRole('header', { name: 'Yasmine Fathy' })).toBeOnTheScreen();
  expect(screen.getByText('Pottery · Beginners welcome')).toBeOnTheScreen();
  expect(screen.getByText('112 reviews')).toBeOnTheScreen();
  expect(screen.getByText(/7 yrs teaching · .*Zamalek/)).toBeOnTheScreen();
  expect(screen.getAllByRole('button', { name: /^\w{3} \d{2}:\d{2}$|^Today|^Tomorrow/ })).toHaveLength(3);
  expect(screen.getByRole('header', { name: 'Upcoming workshops' })).toBeOnTheScreen();
  expect(screen.getByText('Wheel-throwing taster')).toBeOnTheScreen();
  expect(screen.getByText('3 of 8 spots left')).toBeOnTheScreen();
  expect(screen.getByRole('header', { name: 'Private lessons' })).toBeOnTheScreen();
  expect(screen.getByText('1:1 on the wheel')).toBeOnTheScreen();
  expect(screen.getByText('90 min · clay and firing included')).toBeOnTheScreen();
  expect(screen.getByText('60 min · ages 7–12 · up to 6 kids')).toBeOnTheScreen();
  expect(screen.getByText('The Clay Room')).toBeOnTheScreen();
  expect(screen.getByText('Clothes that can get muddy')).toBeOnTheScreen();
  expect(screen.getByText('Free cancellation up to 24 hours before')).toBeOnTheScreen();
  expect(screen.getByText('Usually replies within an hour')).toBeOnTheScreen();
  expect(screen.getAllByText('450 EGP')).toHaveLength(2); // Kids price and the bar's "From"
  // Book opens the cheapest lesson type; a slot chip opens its own offering at that time.
  await fireEvent.press(screen.getByRole('button', { name: 'Book' }));
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith({
    pathname: '/book/[offeringId]',
    params: { offeringId: 'kids' },
  });
  await fireEvent.press(screen.getAllByRole('button', { name: /^\w{3} \d{2}:\d{2}$|^Today|^Tomorrow/ })[0]!);
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith({
    pathname: '/book/[offeringId]',
    params: { offeringId: 'wheel', slot: 'a' },
  });
});

test('Sports profile: session types with prices and no workshop list; no open times says so', async () => {
  mockData = padel;
  mockParams = { id: 'nour', discipline: 'padel' };
  await render(<Profile />);
  expect(screen.getByText('Padel · Intermediate–Advanced')).toBeOnTheScreen();
  expect(screen.getByText(/FIP Level 2/)).toBeOnTheScreen();
  expect(screen.getByRole('header', { name: 'Sessions' })).toBeOnTheScreen();
  expect(screen.getByText('Small group')).toBeOnTheScreen();
  expect(screen.getByText('60 min · up to 4, price per person')).toBeOnTheScreen();
  expect(screen.getByText('Private 1:1')).toBeOnTheScreen();
  expect(screen.getByText('60 min · one person')).toBeOnTheScreen();
  expect(screen.queryByRole('header', { name: 'Upcoming workshops' })).toBeNull();
  expect(screen.getByText('No open times in the next two weeks')).toBeOnTheScreen();
});

test('Share opens the system share sheet; back goes back; a missing profile says so', async () => {
  const share = jest.spyOn(Share, 'share').mockResolvedValue({ action: 'sharedAction' });
  const view = await render(<Profile />);
  await fireEvent.press(screen.getByRole('button', { name: 'Share' }));
  expect(share).toHaveBeenCalledWith({ message: 'Yasmine Fathy teaches Pottery on Coach For All.' });
  await fireEvent.press(screen.getByRole('button', { name: 'Back' }));
  expect(jest.requireMock('expo-router').router.back).toHaveBeenCalled();
  await view.unmount();
  mockData = undefined;
  await render(<Profile />);
  expect(screen.getByText("This instructor isn't taking bookings right now.")).toBeOnTheScreen();
});
