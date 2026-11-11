import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import '@/i18n';
import Confirmed from '@/app/confirmed/[ref]';
import DemoCheckout from '@/app/demo-checkout';
import Remind from '@/app/remind/[ref]';
import Review from '@/app/review';
import { useSettings } from '@/theme/settings';
import { useBookDraft } from './book';
import { bookingErrorKey, useReminders } from './checkout';
import { policyFor, promoDiscount, subtotal } from './rules';

let mockParams: Record<string, string> = {};
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
    dismissAll: jest.fn(),
    dismissTo: jest.fn(),
  },
  useLocalSearchParams: () => mockParams,
}));
const mockRouter = jest.requireMock('expo-router').router;
jest.mock('expo-web-browser', () => ({ openAuthSessionAsync: jest.fn() }));
// SDK 58's notifications mock can't take a handler at import time (reminders.ts sets one); stub just that.
jest.mock('expo-notifications', () => ({
  ...jest.requireActual('expo-notifications'),
  setNotificationHandler: jest.fn(),
}));
const mockAddEvent = jest.fn();
jest.mock('expo-calendar/legacy', () => ({ createEventInCalendarAsync: (e: unknown) => mockAddEvent(e) }));
jest.mock('expo-linking', () => ({ createURL: (p: string) => `coachforall://${p}` }));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
}));
jest.mock('./family', () => ({
  ...jest.requireActual('./family'),
  useFamily: () => ({ data: [{ id: 'ali', first_name: 'Ali', age: 9 }] }),
}));
const mockPlace = jest.fn();
const mockCheckout = jest.fn();
const mockPromo = jest.fn();
const mockDemoPay = jest.fn();
let mockCredit = 0;
jest.mock('./checkout', () => ({
  ...jest.requireActual('./checkout'),
  placeBooking: (...a: unknown[]) => mockPlace(...a),
  runCheckout: (...a: unknown[]) => mockCheckout(...a),
  applyPromo: (...a: unknown[]) => mockPromo(...a),
  demoPay: (...a: unknown[]) => mockDemoPay(...a),
  useCredit: () => ({ data: mockCredit }),
}));

const DAY = 86_400_000;
const inDays = (n: number) => new Date(Date.now() + n * DAY).toISOString();
const review = (type: string, extra = {}) => ({
  offering: {
    id: 'o1',
    type,
    title: 'Private padel',
    description: null,
    level_label: null,
    duration_min: 60,
    price_egp: 650,
    capacity: 1,
    min_age: null,
    max_age: null,
    included: null,
    what_to_bring: null,
    needs_approval: false,
    instructor_id: 'nour',
    discipline_id: 'padel',
    venue: { name: 'Cedar Court Club', notes: null },
    ...extra,
  },
  slot: { id: 's1', starts_at: inDays(3), ends_at: inDays(3), seats_free: 1 },
  instructor: {
    display_name: 'Nour El-Sayed',
    discipline_en: 'Padel',
    discipline_ar: null,
    category_id: 'sports',
  },
});
let mockReview: object | undefined = review('private');
let mockBooking: object | undefined;
const mockInvalidate = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({ invalidateQueries: mockInvalidate }),
  useQuery: ({ queryKey }: { queryKey: string[] }) =>
    queryKey[0] === 'review'
      ? { data: mockReview, isLoading: false }
      : queryKey[0] === 'booking'
        ? { data: mockBooking, isLoading: false }
        : { data: undefined },
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
  mockReview = review('private');
  mockParams = {};
  useBookDraft.setState({
    offeringId: 'o1',
    slotId: 's1',
    seats: 1,
    childId: null,
    note: '',
    weeks: 1,
    pendingRef: null,
    pendingCredit: 0,
    failed: false,
  });
  mockCredit = 0;
});

test('price, promo and policy rules mirror the SQL (§9.1, §9.7, §9.8)', () => {
  expect(subtotal(650, 2)).toBe(1300);
  expect(promoDiscount(650, 10)).toBe(65);
  expect(promoDiscount(585, 10)).toBe(59); // rounded to whole EGP, like round() in SQL
  const now = new Date('2026-10-17T07:00:00Z'); // Sat 10:00 Cairo
  expect(policyFor(new Date('2026-10-17T16:00:00Z'), now)).toEqual({ kind: 'sameDay' });
  expect(policyFor(new Date('2026-10-18T06:00:00Z'), now)).toEqual({ kind: 'late' }); // tomorrow, < 24 h
  expect(policyFor(new Date('2026-10-20T15:00:00Z'), now)).toEqual({
    kind: 'free',
    until: new Date('2026-10-19T15:00:00Z'),
  });
});

test('SQL errors map to plain messages', () => {
  expect(bookingErrorKey({ message: 'no_seats' })).toBe('no_seats');
  expect(bookingErrorKey({ message: 'P0001: too_soon' })).toBe('too_soon');
  expect(bookingErrorKey({ message: 'network down' })).toBe('generic');
});

test('Review: Phase 1 methods, the policy line, and pay at the venue confirms straight away', async () => {
  mockPlace.mockResolvedValue({ ref: 'CFA-11111', status: 'confirmed', credit_egp: 0 });
  await render(<Review />);
  expect(screen.getByRole('radio', { name: /Card/ })).toBeChecked();
  expect(screen.getByRole('radio', { name: /Pay at the venue/ })).toBeOnTheScreen();
  expect(screen.getByText(/^Free cancellation until /)).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Pay 650 EGP' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('radio', { name: /Pay at the venue/ }));
  expect(screen.getByText('Due at the venue')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Confirm booking' }));
  await waitFor(() =>
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/confirmed/[ref]',
      params: { ref: 'CFA-11111' },
    }),
  );
  expect(mockPlace).toHaveBeenCalledWith(
    expect.objectContaining({ slotId: 's1', seats: 1, method: 'venue', promo: null }),
  );
  expect(mockCheckout).not.toHaveBeenCalled();
});

test('Review: a card payment that settles at once confirms and refreshes bookings fetched during the hold', async () => {
  mockPlace.mockResolvedValue({ ref: 'CFA-22222', status: 'awaiting_payment', credit_egp: 0 });
  mockCheckout.mockResolvedValue('done');
  await render(<Review />);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 650 EGP' }));
  await waitFor(() =>
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/confirmed/[ref]',
      params: { ref: 'CFA-22222' },
    }),
  );
  // Home's next session read the booking while it was on hold; it must refetch now it's confirmed.
  expect(mockInvalidate).toHaveBeenLastCalledWith({ queryKey: ['credit'] });
  expect(mockInvalidate).toHaveBeenCalledWith({ queryKey: ['myBookings'] });
  expect(mockInvalidate.mock.calls.filter(([k]) => k.queryKey[0] === 'myBookings').length).toBeGreaterThan(1);
});

test("Review: app credit is the learner's choice, on by default, and the card pays the rest (D64)", async () => {
  mockCredit = 400;
  mockPlace.mockResolvedValue({ ref: 'CFA-33333', status: 'awaiting_payment', credit_egp: 400 });
  mockCheckout.mockResolvedValue('done');
  await render(<Review />);
  expect(screen.getByText('400 EGP available')).toBeOnTheScreen();
  expect(screen.getByText('−400 EGP')).toBeOnTheScreen();
  await fireEvent(screen.getByLabelText('Use my app credit'), 'valueChange', false);
  expect(screen.getByRole('button', { name: 'Pay 650 EGP' })).toBeOnTheScreen();
  await fireEvent(screen.getByLabelText('Use my app credit'), 'valueChange', true);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 250 EGP' }));
  await waitFor(() => expect(mockCheckout).toHaveBeenCalledWith('CFA-33333'));
  expect(mockPlace).toHaveBeenCalledWith(expect.objectContaining({ useCredit: true }));
});

test('Review: credit that covers the whole price confirms without the card', async () => {
  mockCredit = 1000;
  mockPlace.mockResolvedValue({ ref: 'CFA-44444', status: 'confirmed', credit_egp: 650 });
  await render(<Review />);
  await fireEvent.press(screen.getByRole('button', { name: 'Confirm booking' }));
  await waitFor(() =>
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/confirmed/[ref]',
      params: { ref: 'CFA-44444' },
    }),
  );
  expect(mockCheckout).not.toHaveBeenCalled();
});

test('Review: a valid promo lowers the total; an invalid one explains itself', async () => {
  mockPromo.mockResolvedValueOnce({ code: 'CFA10', percent_off: 10, discount_egp: 65 });
  await render(<Review />);
  await fireEvent.changeText(screen.getByPlaceholderText('Promo code'), 'cfa10');
  await fireEvent.press(screen.getByRole('button', { name: 'Apply' }));
  await waitFor(() => expect(screen.getByText('CFA10 applied: 10% off this session')).toBeOnTheScreen());
  expect(screen.getByRole('button', { name: 'Pay 585 EGP' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Remove' }));
  mockPromo.mockRejectedValueOnce({ message: 'promo_invalid' });
  await fireEvent.changeText(screen.getByPlaceholderText('Promo code'), 'xyz');
  await fireEvent.press(screen.getByRole('button', { name: 'Apply' }));
  await waitFor(() =>
    expect(screen.getByText("“XYZ” isn't a valid code. Check it and try again.")).toBeOnTheScreen(),
  );
});

test('Review: card holds the seat, then opens the demo checkout; a retry pays for the same hold', async () => {
  mockPlace.mockResolvedValue({ ref: 'CFA-22222', status: 'awaiting_payment', credit_egp: 0 });
  mockCheckout.mockResolvedValue('demo');
  await render(<Review />);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 650 EGP' }));
  await waitFor(() =>
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/demo-checkout',
      params: { ref: 'CFA-22222', amount: '650' },
    }),
  );
  expect(useBookDraft.getState().pendingRef).toBe('CFA-22222');
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 650 EGP' }));
  await waitFor(() => expect(mockCheckout).toHaveBeenCalledTimes(2));
  expect(mockPlace).toHaveBeenCalledTimes(1); // never a second hold
});

test('Review: a lost last seat says so; kids sessions send a request instead of charging', async () => {
  mockPlace.mockRejectedValue({ message: 'no_seats' });
  const view = await render(<Review />);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 650 EGP' }));
  await waitFor(() =>
    expect(screen.getByText('Someone just took the last seat. Pick another time.')).toBeOnTheScreen(),
  );
  await view.unmount();
  mockReview = review('kids');
  useBookDraft.setState({ childId: 'ali' });
  await render(<Review />);
  expect(screen.getByRole('button', { name: 'Send request' })).toBeOnTheScreen();
  expect(screen.getByText(/Nothing is charged now/)).toBeOnTheScreen();
  expect(screen.getByText(/for Ali/)).toBeOnTheScreen();
});

test('Demo checkout: Pay confirms and opens Confirmed; Fail returns with the seat still held', async () => {
  mockParams = { ref: 'CFA-22222', amount: '650' };
  mockDemoPay.mockResolvedValue({ status: 'confirmed', credit_egp: 0 });
  const view = await render(<DemoCheckout />);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 650 EGP' }));
  await waitFor(() =>
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/confirmed/[ref]',
      params: { ref: 'CFA-22222' },
    }),
  );
  expect(mockDemoPay).toHaveBeenCalledWith('CFA-22222', 'paid');
  await view.unmount();
  await render(<DemoCheckout />);
  await fireEvent.press(screen.getByRole('button', { name: 'Fail the payment' }));
  await waitFor(() => expect(mockRouter.back).toHaveBeenCalled());
  expect(useBookDraft.getState().failed).toBe(true);
});

const booking = (extra = {}) => ({
  ref: 'CFA-33333',
  display_status: 'confirmed',
  method: 'card',
  seats: 1,
  total_egp: 650,
  starts_at: inDays(3),
  ends_at: inDays(3),
  type: 'private',
  title: 'Private padel',
  category_id: 'sports',
  instructor_name: 'Nour El-Sayed',
  discipline_en: 'Padel',
  discipline_ar: null,
  venue_name: 'Cedar Court Club',
  venue_notes: null,
  venue_lat: 30.028,
  venue_lng: 31.47,
  child_name: null,
  ...extra,
});

test('Confirmed: category headline, ref, paid amount; pending says "Request sent."', async () => {
  mockParams = { ref: 'CFA-33333' };
  mockBooking = booking();
  const view = await render(<Confirmed />);
  expect(screen.getByRole('header', { name: "You're on the court." })).toBeOnTheScreen();
  expect(screen.getByText('Nour has confirmed. Booking ref CFA-33333')).toBeOnTheScreen();
  expect(screen.getByText('Paid')).toBeOnTheScreen();
  expect(screen.getByText('2 hours before')).toBeOnTheScreen(); // default reminder
  // Add to calendar (R6.1): the system sheet opens with the session, its times, the venue and the ref.
  mockAddEvent.mockResolvedValue({ action: 'saved' });
  await fireEvent.press(screen.getByRole('button', { name: 'Add to calendar' }));
  await waitFor(() =>
    expect(mockAddEvent).toHaveBeenCalledWith({
      title: 'Padel with Nour',
      startDate: new Date((mockBooking as { starts_at: string }).starts_at),
      endDate: new Date((mockBooking as { ends_at: string }).ends_at),
      location: 'Cedar Court Club',
      notes: 'Booking CFA-33333 · Coach For All',
    }),
  );
  // Back to the tabs underneath, not a new Home on top of them (SDK 58 drew that one without its tab bar).
  await fireEvent.press(screen.getByRole('link', { name: 'Back to Home' }));
  expect(mockRouter.dismissTo).toHaveBeenCalledWith('/');
  await view.unmount();
  mockBooking = booking({ display_status: 'pending', category_id: 'sports' });
  await render(<Confirmed />);
  expect(screen.getByRole('header', { name: 'Request sent.' })).toBeOnTheScreen();
  expect(screen.getByText('To pay after Nour confirms')).toBeOnTheScreen();
});

test('Remind me: a choice is saved for the booking and the sheet closes', async () => {
  mockParams = { ref: 'CFA-33333' };
  await render(<Remind />);
  await fireEvent.press(screen.getByRole('radio', { name: 'The evening before' }));
  expect(useReminders.getState().byRef['CFA-33333']).toBe('evening');
  expect(mockRouter.back).toHaveBeenCalled();
});

test('Review: a weekly series shows "4 weeks × 650 EGP", promo on every week, and books the series (R5.3)', async () => {
  useBookDraft.setState({ weeks: 4 });
  mockPromo.mockResolvedValue({ code: 'CFA10', percent_off: 10, discount_egp: 65 });
  mockPlace.mockResolvedValue({ ref: 'CFA-44444', status: 'confirmed', credit_egp: 0 });
  await render(<Review />);
  expect(screen.getByText('4 weeks × 650 EGP')).toBeOnTheScreen();
  expect(screen.getByText(/weekly · 4 weeks/)).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Pay 2,600 EGP' })).toBeOnTheScreen();
  await fireEvent.changeText(screen.getByPlaceholderText('Promo code'), 'cfa10');
  await fireEvent.press(screen.getByRole('button', { name: 'Apply' }));
  // 10% of each week (65), four times.
  expect(await screen.findByRole('button', { name: 'Pay 2,340 EGP' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('radio', { name: /Pay at the venue/ }));
  await fireEvent.press(screen.getByRole('button', { name: 'Confirm booking' }));
  await waitFor(() =>
    expect(mockPlace).toHaveBeenCalledWith(expect.objectContaining({ weeks: 4, method: 'venue' })),
  );
});
