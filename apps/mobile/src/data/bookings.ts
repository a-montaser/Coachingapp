import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { component } from '@cfa/tokens';
import type { Category } from '@/theme/settings';
import type { PillTone } from '@/ui/Pill';
import { firstName } from './book';
import type { Method } from './checkout';
import { supabase } from './supabase';

/** One row of `my_bookings` (RLS: the caller's own), as Bookings and Booking detail show it. */
export type MyBooking = {
  ref: string;
  display_status: string;
  method: Method;
  seats: number;
  total_egp: number;
  refund_egp: number | null;
  refundable_until: string | null;
  same_day: boolean;
  pay_by: string | null;
  slot_id: string;
  starts_at: string;
  ends_at: string;
  offering_id: string;
  type: string;
  title: string;
  what_to_bring: string | null;
  discipline_id: string;
  discipline_en: string;
  discipline_ar: string | null;
  category_id: Category;
  instructor_id: string;
  instructor_name: string;
  venue_name: string;
  venue_notes: string | null;
  venue_lat: number;
  venue_lng: number;
  child_name: string | null;
};

export const MY_BOOKING_COLUMNS =
  'ref, display_status, method, seats, total_egp, refund_egp, refundable_until, same_day, pay_by, slot_id, starts_at, ends_at, offering_id, type, title, what_to_bring, discipline_id, discipline_en, discipline_ar, category_id, instructor_id, instructor_name, venue_name, venue_notes, venue_lat, venue_lng, child_name';

/** "Padel with Nour", "Swimming · Ali with Mariam", or a workshop's own title (§7.11). */
export function bookingTitle(
  b: Pick<MyBooking, 'type' | 'title' | 'child_name' | 'discipline_en' | 'discipline_ar' | 'instructor_name'>,
  t: (key: string, o: Record<string, string>) => string,
  lang: 'en' | 'ar',
) {
  const discipline = (lang === 'ar' && b.discipline_ar) || b.discipline_en;
  const name = firstName(b.instructor_name);
  if (b.type === 'workshop') return b.title;
  return b.child_name
    ? t('bookings.titleChild', { discipline, child: b.child_name, name })
    : t('bookings.title', { discipline, name });
}

/** All of the learner's bookings, soonest first. An unpaid card hold that lapsed reads as cancelled (the view). */
export function useMyBookings(userId: string | undefined) {
  return useQuery({
    queryKey: ['myBookings', userId, 'all'],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('my_bookings')
        .select(MY_BOOKING_COLUMNS)
        .order('starts_at');
      if (error) throw error;
      return data as MyBooking[];
    },
  });
}

const ACTIVE = ['pending', 'payment_due', 'awaiting_payment', 'confirmed'];

/**
 * §7.11: Upcoming = still on and not yet started, soonest first; Past = finished (completed, §9.5) or
 * cancelled, latest first. `discipline` narrows both (the Filter sheet).
 */
export function splitBookings(rows: MyBooking[], now: Date, discipline: string | null = null) {
  const mine = discipline ? rows.filter((b) => b.discipline_id === discipline) : rows;
  const upcoming = mine.filter(
    (b) => ACTIVE.includes(b.display_status) && Date.parse(b.ends_at) > now.getTime(),
  );
  const past = mine.filter((b) => !upcoming.includes(b)).reverse();
  return { upcoming, past };
}

/** The status pill: copy key under `bookings.status` and its tone (§5 Pill). */
export function statusPill(status: string): { key: string; tone: PillTone } {
  switch (status) {
    case 'confirmed':
      return { key: 'confirmed', tone: 'ok' };
    case 'pending':
      return { key: 'pending', tone: 'warn' };
    case 'payment_due':
    case 'awaiting_payment':
      return { key: 'paymentDue', tone: 'warn' };
    case 'completed':
      return { key: 'completed', tone: 'neutral' };
    default:
      return { key: 'cancelled', tone: 'neutral' };
  }
}

/**
 * §7.12 policy banner from the booking's own `refundable_until` (set by `book()`, §9.1). Venue bookings
 * have nothing to refund, so no banner.
 */
export function bookingPolicy(
  b: Pick<MyBooking, 'method' | 'same_day' | 'refundable_until'>,
  now: Date,
): { kind: 'free'; until: Date } | { kind: 'late' } | null {
  if (b.method === 'venue') return null;
  if (!b.same_day && b.refundable_until && Date.parse(b.refundable_until) > now.getTime())
    return { kind: 'free', until: new Date(b.refundable_until) };
  return { kind: 'late' };
}

const HOUR = 3_600_000;

/** Cancel (§9.1) while the session hasn't started; reschedule (§9.3, D29) until 24 h before it. Mirrors the SQL. */
export const canCancel = (b: Pick<MyBooking, 'display_status' | 'starts_at'>, now: Date) =>
  ACTIVE.includes(b.display_status) && Date.parse(b.starts_at) > now.getTime();
export const canReschedule = (b: Pick<MyBooking, 'display_status' | 'starts_at'>, now: Date) =>
  ['pending', 'payment_due', 'confirmed'].includes(b.display_status) &&
  Date.parse(b.starts_at) - 24 * HOUR > now.getTime();

/**
 * The Cancel sheet's outcome (§9.1), as `cancel_booking()` decides it: a paid card booking more than
 * 24 h out is refunded in full; inside 24 h, or booked the same day, it isn't; nothing was charged for
 * pay-at-venue or not-yet-paid bookings.
 */
export function cancelOutcome(
  b: Pick<MyBooking, 'method' | 'display_status' | 'same_day' | 'refundable_until' | 'total_egp'>,
  now: Date,
): { kind: 'refund'; amount: number } | { kind: 'late' } | { kind: 'sameDay' } | { kind: 'nothing' } {
  if (b.method === 'venue' || b.display_status !== 'confirmed') return { kind: 'nothing' };
  if (b.same_day) return { kind: 'sameDay' };
  if (b.refundable_until && Date.parse(b.refundable_until) > now.getTime())
    return { kind: 'refund', amount: b.total_egp };
  return { kind: 'late' };
}

/**
 * Google Maps directions to the venue (owner, D52): opens the Google Maps app when it's installed,
 * otherwise Google Maps in the browser, on iOS and Android alike.
 */
export const directionsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

/**
 * A still Google map of the venue with its pin (Maps Static API, D52), or null until the owner's key is set
 * (`EXPO_PUBLIC_GOOGLE_MAPS_KEY`, restricted to the Static Maps API). The key ships in the app by design.
 */
export function staticMapUrl(lat: number, lng: number, lang: 'en' | 'ar') {
  const key = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;
  if (!key) return null;
  const m = component.bookingMap;
  return (
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${m.zoom}` +
    `&size=${m.width}x${m.height}&scale=2&markers=${encodeURIComponent(`${lat},${lng}`)}&language=${lang}&key=${key}`
  );
}

/** Bookings' discipline filter (the capsule's Filter button). */
export const useBookingsFilter = create<{ discipline: string | null; set: (d: string | null) => void }>()(
  (set) => ({ discipline: null, set: (discipline) => set({ discipline }) }),
);
