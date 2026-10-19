import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import BookingDetail from '@/app/booking/[ref]';
import Bookings from '@/app/(tabs)/bookings';
import { useSettings } from '@/theme/settings';
import { bookingPolicy, splitBookings, statusPill, useBookingsFilter, type MyBooking } from './bookings';

let mockParams: Record<string, string> = {};
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: () => mockParams,
}));
const mockRouter = jest.requireMock('expo-router').router;
jest.mock('react-native-maps', () => {
  const { View } = jest.requireActual('react-native');
  return { __esModule: true, default: View, Marker: View };
});
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
}));
const mockRun = jest.fn();
jest.mock('./checkout', () => ({
  ...jest.requireActual('./checkout'),
  runCheckout: (...a: unknown[]) => mockRun(...a),
}));

const HOUR = 3_600_000;
const at = (h: number) => new Date(Date.now() + h * HOUR).toISOString();
const row = (ref: string, extra: Partial<MyBooking> = {}): MyBooking => ({
  ref,
  display_status: 'confirmed',
  method: 'card',
  seats: 1,
  total_egp: 650,
  refund_egp: null,
  refundable_until: at(48),
  same_day: false,
  pay_by: null,
  starts_at: at(72),
  ends_at: at(73),
  offering_id: 'o1',
  type: 'private',
  title: 'Private padel',
  what_to_bring: 'Water and court shoes',
  discipline_id: 'padel',
  discipline_en: 'Padel',
  discipline_ar: null,
  category_id: 'sports',
  instructor_id: 'nour',
  instructor_name: 'Nour El-Sayed',
  venue_name: 'Cedar Court Club',
  venue_notes: null,
  venue_lat: 30.03,
  venue_lng: 31.47,
  child_name: null,
  ...extra,
});

let mockRows: MyBooking[] = [];
let mockOne: MyBooking | undefined;
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({ invalidateQueries: jest.fn() }),
  useQuery: ({ queryKey }: { queryKey: string[] }) =>
    queryKey[0] === 'booking' ? { data: mockOne, isLoading: false } : { data: mockRows, isLoading: false },
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
  useBookingsFilter.setState({ discipline: null });
  mockParams = {};
});

test('split: upcoming soonest first; finished and cancelled are past, latest first; filter narrows', () => {
  const rows = [
    row('old', { starts_at: at(-50), ends_at: at(-49), display_status: 'completed' }),
    row('gone', { starts_at: at(-2), ends_at: at(-1), display_status: 'cancelled' }),
    row('soon', { starts_at: at(5), ends_at: at(6) }),
    row('later', {
      starts_at: at(30),
      ends_at: at(31),
      display_status: 'pending',
      discipline_id: 'swimming',
    }),
    row('lapsed', { starts_at: at(40), ends_at: at(41), display_status: 'cancelled' }),
  ];
  const { upcoming, past } = splitBookings(rows, new Date());
  expect(upcoming.map((b) => b.ref)).toEqual(['soon', 'later']);
  expect(past.map((b) => b.ref)).toEqual(['lapsed', 'gone', 'old']);
  expect(splitBookings(rows, new Date(), 'swimming').upcoming.map((b) => b.ref)).toEqual(['later']);
  expect(statusPill('payment_due')).toEqual({ key: 'paymentDue', tone: 'warn' });
  expect(statusPill('completed').tone).toBe('neutral');
});

test('policy: free until refundable_until; late inside 24 h or same-day; none at the venue (§9.1)', () => {
  const now = new Date();
  const a = row('a');
  expect(bookingPolicy(a, now)).toEqual({ kind: 'free', until: new Date(a.refundable_until!) });
  expect(bookingPolicy(row('b', { refundable_until: at(-1) }), now)).toEqual({ kind: 'late' });
  expect(bookingPolicy(row('c', { same_day: true }), now)).toEqual({ kind: 'late' });
  expect(bookingPolicy(row('d', { method: 'venue' }), now)).toBeNull();
});

test('Bookings: upcoming cards with Directions, past with Book again, cancelled with Details', async () => {
  mockRows = [
    row('CFA-1', {
      child_name: 'Ali',
      discipline_en: 'Swimming',
      instructor_name: 'Mariam Adel',
      display_status: 'pending',
      type: 'kids',
    }),
    row('CFA-2', { starts_at: at(-50), ends_at: at(-49), display_status: 'completed' }),
    row('CFA-3', { starts_at: at(-30), ends_at: at(-29), display_status: 'cancelled' }),
  ];
  await render(<Bookings />);
  expect(screen.getByRole('tab', { name: 'Upcoming · 1' })).toBeSelected();
  expect(screen.getByText('Swimming · Ali with Mariam')).toBeOnTheScreen();
  expect(screen.getByText('Waiting for Mariam to confirm')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Directions' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: /^Swimming · Ali with Mariam/ }));
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/booking/[ref]', params: { ref: 'CFA-1' } });

  await fireEvent.press(screen.getByRole('tab', { name: 'Past' }));
  expect(screen.getByText('Completed')).toBeOnTheScreen();
  expect(screen.getByText('Cancelled')).toBeOnTheScreen();
  expect(screen.getAllByRole('button', { name: 'Book again' })).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'Details' })).toBeOnTheScreen();
});

test('Bookings: an empty state per tab', async () => {
  mockRows = [];
  await render(<Bookings />);
  expect(screen.getByText('No upcoming sessions')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Explore' }));
  expect(mockRouter.navigate).toHaveBeenCalledWith('/explore');
  await fireEvent.press(screen.getByRole('tab', { name: 'Past' }));
  expect(screen.getByText('Nothing here yet')).toBeOnTheScreen();
});

test('Booking detail: status, policy, payment and ref; payment due pays from here; cancelled shows the refund', async () => {
  mockParams = { ref: 'CFA-1' };
  mockOne = row('CFA-1');
  const view = await render(<BookingDetail />);
  expect(screen.getByRole('header', { name: 'Padel with Nour' })).toBeOnTheScreen();
  expect(screen.getByText('Confirmed')).toBeOnTheScreen();
  expect(screen.getByText(/^Free cancellation until /)).toBeOnTheScreen();
  expect(screen.getByText('Private 1:1 · Paid 650 EGP')).toBeOnTheScreen();
  expect(screen.getByText('Booking ref CFA-1')).toBeOnTheScreen();
  expect(screen.getByText('Water and court shoes')).toBeOnTheScreen();
  await view.unmount();

  mockOne = row('CFA-1', { display_status: 'payment_due', type: 'kids', child_name: 'Ali' });
  mockRun.mockResolvedValue('demo');
  const due = await render(<BookingDetail />);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 650 EGP' }));
  expect(mockRun).toHaveBeenCalledWith('CFA-1');
  expect(mockRouter.push).toHaveBeenCalledWith({
    pathname: '/demo-checkout',
    params: { ref: 'CFA-1', amount: '650' },
  });
  await due.unmount();

  mockOne = row('CFA-1', { display_status: 'cancelled', refund_egp: 650 });
  await render(<BookingDetail />);
  expect(screen.getByText('Private 1:1 · Cancelled · refunded 650 EGP')).toBeOnTheScreen();
  expect(screen.queryByText(/^Free cancellation/)).toBeNull();
  expect(screen.getByRole('button', { name: 'Book again' })).toBeOnTheScreen();
});
