import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import i18n, { currentLang } from '@/i18n';
import { formatClock, formatWeekday } from '@/i18n/format';
import { useSession } from './auth';
import { bookingTitle, useMyBookings, type MyBooking } from './bookings';
import { DEFAULT_REMINDER, useReminders, type ReminderChoice } from './checkout';
import { reminderAt } from './rules';

// A reminder that comes due while the app is open still shows as a banner.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const REMINDED = ['pending', 'payment_due', 'confirmed'];

/**
 * R9.1: replaces every scheduled reminder with one per upcoming booking, at its chosen time (default 2 h
 * before). A full resync, so cancelling, rescheduling or changing the choice needs nothing else. Does
 * nothing without permission (asked at the first booking, R9.2). Returns how many it scheduled.
 */
export async function syncReminders(
  rows: MyBooking[],
  byRef: Record<string, ReminderChoice>,
  now = new Date(),
) {
  if ((await Notifications.getPermissionsAsync()).status !== 'granted') return 0;
  await Notifications.cancelAllScheduledNotificationsAsync();
  const lang = currentLang();
  let scheduled = 0;
  for (const b of rows) {
    if (!REMINDED.includes(b.display_status)) continue;
    const start = new Date(b.starts_at);
    const at = reminderAt(start, byRef[b.ref] ?? DEFAULT_REMINDER);
    if (!at || at <= now) continue;
    await Notifications.scheduleNotificationAsync({
      identifier: b.ref,
      content: {
        title: bookingTitle(b, (k, o) => i18n.t(k, o), lang),
        body: i18n.t('reminder.body', {
          when: `${formatWeekday(start, lang)} ${formatClock(start, lang)}`,
          venue: b.venue_name,
        }),
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at },
    });
    scheduled++;
  }
  return scheduled;
}

/** Keeps the phone's reminders in step with the learner's bookings and choices (mounted with the tabs). */
export function useReminderSync() {
  const rows = useMyBookings(useSession().session?.user.id).data;
  const byRef = useReminders((s) => s.byRef);
  useEffect(() => {
    if (rows) syncReminders(rows, byRef).catch(() => {});
  }, [rows, byRef]);
}

/** R9.2: asks once, at the first booking (Confirmed), never at launch; a yes schedules straight away. */
export async function askReminderPermission() {
  const { status, canAskAgain } = await Notifications.getPermissionsAsync();
  if (status !== 'undetermined' || !canAskAgain) return;
  if ((await Notifications.requestPermissionsAsync()).status === 'granted')
    useReminders.setState((s) => ({ byRef: { ...s.byRef } })); // re-runs useReminderSync
}
