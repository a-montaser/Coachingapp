import { useQuery } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { create } from 'zustand';
import type { Category } from '@/theme/settings';
import type { PillTone } from '@/ui/Pill';
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
  'ref, display_status, method, seats, total_egp, refund_egp, refundable_until, same_day, pay_by, starts_at, ends_at, offering_id, type, title, what_to_bring, discipline_id, discipline_en, discipline_ar, category_id, instructor_id, instructor_name, venue_name, venue_notes, venue_lat, venue_lng, child_name';

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

/** Opens the phone's maps app with directions to the venue. */
export function directionsUrl(lat: number, lng: number, name: string) {
  return Platform.OS === 'ios'
    ? `http://maps.apple.com/?daddr=${lat},${lng}`
    : `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(name)})`;
}

/** Bookings' discipline filter (the capsule's Filter button). */
export const useBookingsFilter = create<{ discipline: string | null; set: (d: string | null) => void }>()(
  (set) => ({ discipline: null, set: (discipline) => set({ discipline }) }),
);
