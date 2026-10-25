import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import Workshop from '@/app/workshop/[id]';
import { useSettings } from '@/theme/settings';
import { useBookDraft } from './book';
import { clampSeats, maxWorkshopSeats } from './rules';

let mockParams: { id: string; slot?: string } = { id: 'taster' };
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => mockParams,
}));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));

const DAY = 86_400_000;
const inDays = (n: number) => new Date(Date.now() + n * DAY).toISOString();
const mockData = {
  offering: {
    id: 'taster',
    type: 'workshop',
    title: 'Wheel-throwing taster',
    description: 'Two hours at the wheel.',
    level_label: 'beginners',
    duration_min: 120,
    price_egp: 650,
    capacity: 8,
    min_age: null,
    max_age: null,
    included: 'Clay, tools, apron, glaze and firing',
    take_home: 'Two bowls, fired in about 2 weeks',
    what_to_bring: 'Clothes that can get a little muddy',
    instructor_id: 'yasmine',
    discipline_id: 'pottery',
    venue: { name: 'The Clay Room', notes: null },
  },
  instructor: {
    display_name: 'Yasmine Fathy',
    rating_avg: 4.9,
    rating_count: 112,
    area_en: 'Zamalek',
    area_ar: null,
  },
  slots: [
    { id: 'sat', offering_id: 'taster', starts_at: inDays(2), ends_at: inDays(2), seats_free: 5 },
    { id: 'full', offering_id: 'taster', starts_at: inDays(9), ends_at: inDays(9), seats_free: 0 },
    { id: 'two', offering_id: 'taster', starts_at: inDays(16), ends_at: inDays(16), seats_free: 2 },
  ],
};
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: () => ({ data: mockData, isLoading: false }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
  mockParams = { id: 'taster' };
});

test('seat rules: 1 to min(3, left); a smaller date pulls the count down (§9.4)', () => {
  expect(maxWorkshopSeats(5)).toBe(3);
  expect(maxWorkshopSeats(2)).toBe(2);
  expect(maxWorkshopSeats(0)).toBe(0);
  expect(clampSeats(3, 2)).toBe(2);
  expect(clampSeats(0, 3)).toBe(1);
  expect(clampSeats(2, 0)).toBe(0);
});

test('Workshop: details, dates with a disabled full one, and the stepper capped at 3 (§7.7)', async () => {
  await render(<Workshop />);
  expect(screen.getByText('Group · beginners')).toBeOnTheScreen();
  expect(screen.getByRole('header', { name: 'Wheel-throwing taster' })).toBeOnTheScreen();
  expect(screen.getByText('With Yasmine Fathy')).toBeOnTheScreen();
  expect(screen.getByText('4.9 (112) · The Clay Room, Zamalek')).toBeOnTheScreen();
  expect(screen.getByText('Clay, tools, apron, glaze and firing')).toBeOnTheScreen();
  expect(screen.getByText('Two bowls, fired in about 2 weeks')).toBeOnTheScreen();

  const dates = screen.getAllByRole('radio');
  expect(dates).toHaveLength(3);
  expect(dates[0]).toBeChecked(); // first date with seats
  expect(dates[1]).toBeDisabled(); // full
  expect(screen.getByText('Come with a friend, up to 3')).toBeOnTheScreen();

  const more = screen.getByRole('button', { name: 'One more seat' });
  const fewer = screen.getByRole('button', { name: 'One fewer seat' });
  expect(fewer).toBeDisabled(); // already at 1
  await fireEvent.press(more);
  await fireEvent.press(more);
  expect(more).toBeDisabled(); // 3 is the most
  expect(screen.getByText(/· 3 seats$/)).toBeOnTheScreen();
  expect(screen.getByText('1,950 EGP')).toBeOnTheScreen(); // 3 × 650

  // A date with 2 left caps the stepper at 2 and the total follows.
  await fireEvent.press(dates[2]!);
  expect(screen.getByText('Come with a friend, up to 2')).toBeOnTheScreen();
  expect(screen.getByText(/· 2 seats$/)).toBeOnTheScreen();
  expect(screen.getByText('1,300 EGP')).toBeOnTheScreen();
});

test('a requested date is preselected; the instructor row opens their profile', async () => {
  mockParams = { id: 'taster', slot: 'two' };
  await render(<Workshop />);
  expect(screen.getAllByRole('radio')[2]).toBeChecked();
  await fireEvent.press(screen.getByRole('button', { name: 'With Yasmine Fathy' }));
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith({
    pathname: '/instructor/[id]',
    params: { id: 'yasmine', discipline: 'pottery' },
  });
  // Reserve keeps the date and seats for Review & pay.
  await fireEvent.press(screen.getByRole('button', { name: 'Reserve' }));
  expect(useBookDraft.getState()).toMatchObject({
    offeringId: 'taster',
    slotId: 'two',
    seats: 1,
    childId: null,
  });
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith('/review');
});
