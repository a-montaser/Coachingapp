import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import Explore from '@/app/(tabs)/explore';
import Filters from '@/app/filters';
import Sort from '@/app/sort';
import { useSettings } from '@/theme/settings';
import {
  DEFAULT_FILTERS,
  activeFilterCount,
  filterPeople,
  filterWorkshops,
  matchesAvailability,
  useExplore,
  type OfferingPrice,
} from './explore';
import type { GroupSessionRow, InstructorCardRow } from './home';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: () => ({}),
}));
jest.mock('expo-location', () => ({ getForegroundPermissionsAsync: async () => ({ granted: false }) }));
jest.mock('@react-native-community/slider', () => 'Slider');
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
  useProfile: () => ({ data: { first_name: 'Omar', area_id: 'zamalek' } }),
}));

// Saturday 17 Oct 2026, 09:00 Cairo (UTC+3).
const NOW = new Date('2026-10-17T06:00:00Z');
const at = (iso: string) => new Date(iso).toISOString();
const card = (o: Partial<InstructorCardRow>): InstructorCardRow => ({
  id: 'x',
  display_name: 'X',
  gender: 'female',
  discipline_id: 'pottery',
  discipline_en: 'Pottery',
  discipline_ar: null,
  category_id: 'hobbies',
  levels: null,
  rating_avg: 4.7,
  rating_count: 10,
  from_price: 450,
  next_at: at('2026-10-17T12:00:00Z'),
  venue_name: 'Studio',
  area_en: 'Zamalek',
  area_ar: null,
  lat: 30.0609,
  lng: 31.2197,
  ...o,
});
const yasmine = card({
  id: 'yasmine',
  display_name: 'Yasmine Fathy',
  rating_avg: 4.9,
  venue_name: 'The Clay Room',
  next_at: at('2026-10-17T08:00:00Z'),
});
const dina = card({
  id: 'dina',
  display_name: 'Dina Samir',
  discipline_id: 'oud',
  discipline_en: 'Oud',
  area_en: 'Heliopolis',
  lat: 30.0911,
  lng: 31.322,
  from_price: 500,
  rating_avg: 4.8,
  next_at: at('2026-10-20T16:00:00Z'),
});
const hany = card({
  id: 'hany',
  display_name: 'Hany Adel',
  gender: 'male',
  discipline_id: 'photography',
  discipline_en: 'Photography',
  area_en: 'Downtown',
  lat: 30.0459,
  lng: 31.24,
  from_price: 350,
  rating_avg: 4.9,
  next_at: null,
});
const offerings: OfferingPrice[] = [
  { instructor_id: 'yasmine', discipline_id: 'pottery', type: 'private', price_egp: 900 },
  { instructor_id: 'yasmine', discipline_id: 'pottery', type: 'kids', price_egp: 450 },
  { instructor_id: 'dina', discipline_id: 'oud', type: 'private', price_egp: 500 },
  { instructor_id: 'hany', discipline_id: 'photography', type: 'private', price_egp: 350 },
  { instructor_id: 'hany', discipline_id: 'photography', type: 'group', price_egp: 200 },
];
const zamalek = { lat: 30.0609, lng: 31.2197 };
const base = { query: '', discipline: null, sort: 'soonest' as const, filters: DEFAULT_FILTERS };
const ids = (rs: { id: string }[]) => rs.map((r) => r.id);

test('availability: today, the next 7 days, and the Fri–Sat weekend, on the Cairo calendar', () => {
  expect(matchesAvailability(at('2026-10-17T20:00:00Z'), 'today', NOW)).toBe(true); // Sat 23:00
  expect(matchesAvailability(at('2026-10-17T21:30:00Z'), 'today', NOW)).toBe(false); // Sun 00:30
  expect(matchesAvailability(at('2026-10-23T09:00:00Z'), 'week', NOW)).toBe(true); // Fri, day 6
  expect(matchesAvailability(at('2026-10-24T09:00:00Z'), 'week', NOW)).toBe(false); // Sat, day 7
  expect(matchesAvailability(at('2026-10-23T09:00:00Z'), 'weekend', NOW)).toBe(true); // Fri
  expect(matchesAvailability(at('2026-10-19T09:00:00Z'), 'weekend', NOW)).toBe(false); // Mon
  expect(matchesAvailability(null, 'today', NOW)).toBe(false);
  expect(matchesAvailability(null, 'any', NOW)).toBe(true);
});

test('search matches name, discipline, area and venue; discipline chips narrow to one', () => {
  const rows = [yasmine, dina, hany];
  const run = (o: object) => ids(filterPeople(rows, offerings, { ...base, ...o }, zamalek, NOW));
  expect(run({ query: 'dina' })).toEqual(['dina']);
  expect(run({ query: 'OUD' })).toEqual(['dina']);
  expect(run({ query: 'heliop' })).toEqual(['dina']);
  expect(run({ query: 'clay room' })).toEqual(['yasmine']);
  expect(run({ discipline: 'photography' })).toEqual(['hany']);
});

test('Lessons list only instructors who teach 1:1 or Kids; groups are the Groups tab (D54)', () => {
  const groupOnly: OfferingPrice[] = [
    ...offerings.filter((o) => o.instructor_id !== 'hany'),
    { instructor_id: 'hany', discipline_id: 'photography', type: 'group', price_egp: 200 },
  ];
  expect(ids(filterPeople([yasmine, dina, hany], groupOnly, base, null, NOW)).sort()).toEqual([
    'dina',
    'yasmine',
  ]);
  // A group price never becomes a lesson's "From".
  expect(filterPeople([hany], offerings, base, null, NOW)[0]!.price).toBe(350);
});

test('session type sets the "From" price and drops instructors without it (§9.7)', () => {
  const kids = filterPeople(
    [yasmine, dina, hany],
    offerings,
    { ...base, filters: { ...DEFAULT_FILTERS, type: 'kids' } },
    null,
    NOW,
  );
  expect(kids.map((r) => [r.id, r.price])).toEqual([['yasmine', 450]]);
  const priv = filterPeople(
    [yasmine],
    offerings,
    { ...base, filters: { ...DEFAULT_FILTERS, type: 'private' } },
    null,
    NOW,
  );
  expect(priv[0]!.price).toBe(900);
  const anyType = filterPeople([yasmine], offerings, base, null, NOW);
  expect(anyType[0]!.price).toBe(450); // lowest across types
});

test('price, gender, rating, distance and availability filters', () => {
  const rows = [yasmine, dina, hany];
  const run = (f: object, origin: { lat: number; lng: number } | null = zamalek) =>
    ids(
      filterPeople(rows, offerings, { ...base, filters: { ...DEFAULT_FILTERS, ...f } }, origin, NOW),
    ).sort();
  expect(run({ maxPrice: 400 })).toEqual(['hany']);
  expect(run({ maxPrice: 1200 })).toEqual(['dina', 'hany', 'yasmine']); // 1,200 = Any
  expect(run({ gender: 'male' })).toEqual(['hany']);
  expect(run({ minRating: 4.9 })).toEqual(['hany', 'yasmine']);
  expect(run({ maxKm: 5 })).toEqual(['hany', 'yasmine']); // Heliopolis is ~11 km from Zamalek
  expect(run({ maxKm: 5 }, null)).toEqual([]); // no origin: distance can't be checked
  expect(run({ availability: 'today' })).toEqual(['yasmine']);
});

test('sorts: soonest (none last), lowest price, highest rated, nearest; ties by soonest', () => {
  const rows = [hany, dina, yasmine];
  const run = (sort: 'soonest' | 'price' | 'rating' | 'nearest') =>
    ids(filterPeople(rows, offerings, { ...base, sort }, zamalek, NOW));
  expect(run('soonest')).toEqual(['yasmine', 'dina', 'hany']);
  expect(run('price')).toEqual(['hany', 'yasmine', 'dina']);
  expect(run('rating')).toEqual(['yasmine', 'hany', 'dina']); // 4.9 tie → Yasmine is sooner
  expect(run('nearest')).toEqual(['yasmine', 'hany', 'dina']);
});

test('workshops use the same rules, with gender looked up from the instructor', () => {
  const w = (o: Partial<GroupSessionRow>): GroupSessionRow => ({
    slot_id: 's',
    starts_at: at('2026-10-17T08:00:00Z'),
    capacity: 8,
    seats_free: 3,
    offering_id: 'o',
    title: 'Wheel-throwing taster',
    type: 'workshop',
    level_label: 'beginners',
    price_egp: 650,
    discipline_id: 'pottery',
    instructor_id: 'yasmine',
    instructor_name: 'Yasmine',
    rating_avg: 4.9,
    venue_name: 'The Clay Room',
    area_en: 'Zamalek',
    area_ar: null,
    lat: 30.06,
    lng: 31.22,
    ...o,
  });
  const rows = [
    w({ slot_id: 'a' }),
    w({
      slot_id: 'b',
      instructor_id: 'hany',
      price_egp: 350,
      title: 'Photo walk',
      starts_at: at('2026-10-18T05:00:00Z'),
    }),
  ];
  const gender = (id: string) => (id === 'hany' ? 'male' : 'female');
  const run = (o: object) =>
    filterWorkshops(rows, { ...base, ...o }, null, NOW, gender).map((r) => r.slot_id);
  expect(run({ filters: { ...DEFAULT_FILTERS, gender: 'male' } })).toEqual(['b']);
  expect(run({ sort: 'price' })).toEqual(['b', 'a']);
  expect(run({ query: 'photo' })).toEqual(['b']);
});

test('"Filters · N" counts the filters changed from the defaults', () => {
  expect(activeFilterCount(DEFAULT_FILTERS)).toBe(0);
  expect(
    activeFilterCount({ ...DEFAULT_FILTERS, maxPrice: 600, gender: 'female', availability: 'today' }),
  ).toBe(3);
});

// Screens: the same rows, served through the query hooks.
const mockRows: Record<string, unknown> = {
  instructorCards: [yasmine, dina, hany],
  offeringPrices: offerings,
  groupSessions: [],
  disciplines: [
    { id: 'pottery', category_id: 'hobbies', name_en: 'Pottery', name_ar: null, icon: 'pottery', code: null },
    { id: 'oud', category_id: 'hobbies', name_en: 'Oud', name_ar: null, icon: 'oud', code: null },
  ],
  areas: [{ id: 'zamalek', name_en: 'Zamalek', name_ar: null, lat: 30.0609, lng: 31.2197 }],
};
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: ({ queryKey }: { queryKey: string[] }) => ({ data: mockRows[queryKey[0]!], isLoading: false }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en', category: 'hobbies' });
  useExplore.setState({
    query: '',
    discipline: null,
    tab: 'people',
    sort: 'soonest',
    filters: DEFAULT_FILTERS,
  });
});

test('Explore: live search, Lessons | Groups, Filters button, result line, then the empty state and its reset', async () => {
  await render(<Explore />);
  expect(screen.getByText('3 lessons')).toBeOnTheScreen();
  expect(screen.getByRole('tab', { name: 'Lessons' })).toBeSelected();
  await fireEvent.changeText(screen.getByPlaceholderText('Pottery, oud, photography…'), 'yasm');
  expect(screen.getByText('1 lesson')).toBeOnTheScreen();
  await fireEvent.changeText(screen.getByPlaceholderText('Pottery, oud, photography…'), 'nobody');
  expect(screen.getByText('No matches')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Clear search and filters' }));
  expect(screen.getByText('3 lessons')).toBeOnTheScreen();
  // Categories and disciplines live in the Filters sheet, not as chips here.
  expect(screen.queryByRole('button', { name: 'Oud' })).toBeNull();
  await fireEvent.press(screen.getByRole('button', { name: 'Filters' }));
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith('/filters');
  await fireEvent.press(screen.getByRole('tab', { name: 'Groups' }));
  expect(useExplore.getState().tab).toBe('workshops');
  await fireEvent.press(screen.getByRole('button', { name: 'Sort: Soonest available' }));
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith('/sort');
});

test('Filters sheet: chips update the live count; nothing left shows a disabled "No matches"', async () => {
  await render(<Filters />);
  expect(screen.getByRole('button', { name: 'Show 3 lessons' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Male' }));
  expect(screen.getByRole('button', { name: 'Show 1 lesson' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Kids' }));
  expect(screen.getByRole('button', { name: 'No matches' })).toBeDisabled();
  await fireEvent.press(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByRole('button', { name: 'Show 3 lessons' })).toBeOnTheScreen();
  // The discipline is chosen here now (D54); the category chips switch the whole tab.
  await fireEvent.press(screen.getByRole('button', { name: 'Oud' }));
  expect(screen.getByRole('button', { name: 'Show 1 lesson' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Sports' }));
  expect(useSettings.getState().category).toBe('sports');
  expect(useExplore.getState().discipline).toBeNull();
});

test('Sort sheet: a choice sets the order and closes', async () => {
  await render(<Sort />);
  await fireEvent.press(screen.getByRole('radio', { name: 'Lowest price' }));
  expect(useExplore.getState().sort).toBe('price');
  expect(jest.requireMock('expo-router').router.back).toHaveBeenCalled();
});
