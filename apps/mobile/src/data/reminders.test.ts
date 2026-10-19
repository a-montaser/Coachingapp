import '@/i18n';
import { useSettings } from '@/theme/settings';
import type { MyBooking } from './bookings';
import { syncReminders } from './reminders';
import { reminderAt } from './rules';

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  SchedulableTriggerInputTypes: { DATE: 'date' },
}));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
const N = jest.requireMock('expo-notifications');

const z = (iso: string) => new Date(iso);

test('minutes before the start, or off (R9.1)', () => {
  const start = z('2026-11-12T15:30:00Z');
  expect(reminderAt(start, 120)).toEqual(z('2026-11-12T13:30:00Z'));
  expect(reminderAt(start, 30)).toEqual(z('2026-11-12T15:00:00Z'));
  expect(reminderAt(start, 'off')).toBeNull();
});

test('"the evening before" is 20:00 Cairo the day before, in winter and summer time (D29)', () => {
  expect(reminderAt(z('2026-12-10T10:00:00Z'), 'evening')).toEqual(z('2026-12-09T18:00:00Z')); // UTC+2
  expect(reminderAt(z('2026-07-10T10:00:00Z'), 'evening')).toEqual(z('2026-07-09T17:00:00Z')); // UTC+3
  // A Cairo-early-morning start belongs to its Cairo date, not its UTC one: 01:00 Cairo Sat = 22:00 UTC Fri.
  expect(reminderAt(z('2026-12-11T23:00:00Z'), 'evening')).toEqual(z('2026-12-11T18:00:00Z'));
});

test('the evening before stays at 20:00 Cairo across both 2026 clock changes', () => {
  // Summer time starts at midnight before Fri 24 Apr; it ends at midnight after Thu 29 Oct.
  expect(reminderAt(z('2026-04-24T07:00:00Z'), 'evening')).toEqual(z('2026-04-23T18:00:00Z')); // Thu, still +2
  expect(reminderAt(z('2026-04-25T07:00:00Z'), 'evening')).toEqual(z('2026-04-24T17:00:00Z')); // Fri, now +3
  expect(reminderAt(z('2026-10-30T08:00:00Z'), 'evening')).toEqual(z('2026-10-29T17:00:00Z')); // Thu, still +3
  expect(reminderAt(z('2026-10-31T08:00:00Z'), 'evening')).toEqual(z('2026-10-30T18:00:00Z')); // Fri, back to +2
});

const row = (ref: string, extra: Partial<MyBooking> = {}) =>
  ({
    ref,
    display_status: 'confirmed',
    type: 'private',
    title: 'Private padel',
    child_name: null,
    discipline_en: 'Padel',
    discipline_ar: null,
    instructor_name: 'Nour El-Sayed',
    venue_name: 'Cedar Court Club',
    starts_at: '2026-11-12T15:30:00Z',
    ...extra,
  }) as MyBooking;

test('sync: one reminder per upcoming booking at its choice; none for cancelled, past or off', async () => {
  useSettings.setState({ lang: 'en' });
  N.getPermissionsAsync.mockResolvedValue({ status: 'granted' });
  const now = z('2026-11-10T09:00:00Z');
  const n = await syncReminders(
    [
      row('A'),
      row('B', { display_status: 'cancelled' }),
      row('C', { starts_at: '2026-11-10T09:30:00Z' }), // 2 h before is already past
      row('D'),
      row('E', {
        display_status: 'pending',
        child_name: 'Ali',
        instructor_name: 'Mariam Adel',
        discipline_en: 'Swimming',
      }),
    ],
    { D: 'off', E: 'evening' },
    now,
  );
  expect(n).toBe(2);
  expect(N.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
  expect(N.scheduleNotificationAsync).toHaveBeenCalledWith({
    identifier: 'A',
    content: { title: 'Padel with Nour', body: expect.stringMatching(/ at Cedar Court Club$/) },
    trigger: { type: 'date', date: z('2026-11-12T13:30:00Z') },
  });
  expect(N.scheduleNotificationAsync).toHaveBeenCalledWith(
    expect.objectContaining({
      identifier: 'E',
      content: expect.objectContaining({ title: 'Swimming · Ali with Mariam' }),
      trigger: { type: 'date', date: z('2026-11-11T18:00:00Z') },
    }),
  );
});

test('sync does nothing until the learner allows notifications (R9.2)', async () => {
  jest.clearAllMocks();
  N.getPermissionsAsync.mockResolvedValue({ status: 'undetermined' });
  expect(await syncReminders([row('A')], {}, z('2026-11-10T09:00:00Z'))).toBe(0);
  expect(N.cancelAllScheduledNotificationsAsync).not.toHaveBeenCalled();
});
