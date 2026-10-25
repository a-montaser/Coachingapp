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

test('Group page: details, the calendar on the first open date, seats unset until chosen, no price', async () => {
  await render(<Workshop />);
  expect(screen.getByText('Group · beginners')).toBeOnTheScreen();
  expect(screen.getByRole('header', { name: 'Wheel-throwing taster' })).toBeOnTheScreen();
  expect(screen.getByText('With Yasmine Fathy')).toBeOnTheScreen();
  expect(screen.getByText('4.9 (112) · The Clay Room, Zamalek')).toBeOnTheScreen();
  // Included / Take home / Bring / Cancellation as tiles.
  expect(screen.getByText('Clay, tools, apron, glaze and firing')).toBeOnTheScreen();
  expect(screen.getByText('Two bowls, fired in about 2 weeks')).toBeOnTheScreen();
  expect(screen.getByText('Clothes that can get a little muddy')).toBeOnTheScreen();
  expect(screen.getByText('Free cancellation up to 24 hours before')).toBeOnTheScreen();

  // The first open date's only time is chosen; seats wait for the learner, and Reserve says why.
  const time = screen.getAllByRole('radio').filter((r) => /left|Full/.test(r.props.accessibilityLabel ?? ''));
  expect(time).toHaveLength(1);
  expect(time[0]).toBeChecked();
  expect(screen.getByText('Come with a friend, up to 3')).toBeOnTheScreen();
  for (const k of ['1 seat', '2 seats', '3 seats'])
    expect(screen.getByRole('radio', { name: k })).not.toBeChecked();
  expect(screen.queryByRole('radio', { name: '4 seats' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Reserve' })).toBeDisabled();
  await fireEvent.press(screen.getByRole('radio', { name: '3 seats' }));
  expect(screen.getByRole('button', { name: 'Reserve' })).toBeEnabled();
  expect(screen.getByText(/· 3 seats$/)).toBeOnTheScreen();
  expect(screen.queryByText(/EGP/)).toBeNull(); // the price waits for Review & pay (D54)
});

test('a requested date is preselected with its seats cap; Reserve keeps date and seats', async () => {
  mockParams = { id: 'taster', slot: 'two' };
  await render(<Workshop />);
  expect(screen.getByRole('radio', { name: /2 left$/ })).toBeChecked();
  expect(screen.getByText('Come with a friend, up to 2')).toBeOnTheScreen();
  expect(screen.queryByRole('radio', { name: '3 seats' })).toBeNull();
  await fireEvent.press(screen.getByRole('button', { name: 'With Yasmine Fathy' }));
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith({
    pathname: '/instructor/[id]',
    params: { id: 'yasmine', discipline: 'pottery' },
  });
  await fireEvent.press(screen.getByRole('radio', { name: '2 seats' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Reserve' }));
  expect(useBookDraft.getState()).toMatchObject({
    offeringId: 'taster',
    slotId: 'two',
    seats: 2,
    childId: null,
  });
  expect(jest.requireMock('expo-router').router.push).toHaveBeenCalledWith('/review');
});

test('the calendar marks the days with seats; a full day is not offered', async () => {
  await render(<Workshop />);
  const marked = screen.getAllByRole('button', { name: /Has open times/ });
  // Two open dates (in 2 and 16 days); one may fall in next month.
  expect(marked.length).toBeGreaterThanOrEqual(1);
  expect(marked.length).toBeLessThanOrEqual(2);
});
