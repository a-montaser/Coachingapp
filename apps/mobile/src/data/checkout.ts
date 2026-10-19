import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Category } from '@/theme/settings';
import { MY_BOOKING_COLUMNS, type MyBooking } from './bookings';
import type { Offering } from './instructor';
import { supabase } from './supabase';

export type Method = 'card' | 'venue';

export type ReviewData = {
  offering: Offering & { instructor_id: string; discipline_id: string; needs_approval: boolean };
  slot: { id: string; starts_at: string; ends_at: string; seats_free: number };
  instructor: {
    display_name: string;
    discipline_en: string;
    discipline_ar: string | null;
    category_id: Category;
  };
};

/** Review & pay (§7.9): what is being booked, read fresh so the price and seats are current. */
export function useReview(offeringId: string | null, slotId: string | null) {
  return useQuery({
    queryKey: ['review', offeringId, slotId],
    enabled: Boolean(offeringId && slotId),
    queryFn: async (): Promise<ReviewData> => {
      const [off, slot] = await Promise.all([
        supabase
          .from('offerings')
          .select(
            'id, type, title, description, level_label, duration_min, price_egp, capacity, min_age, max_age, included, what_to_bring, needs_approval, instructor_id, discipline_id, venue:venues(name, notes)',
          )
          .eq('id', offeringId!)
          .single(),
        supabase
          .from('slot_availability')
          .select('id, starts_at, ends_at, seats_free')
          .eq('id', slotId!)
          .single(),
      ]);
      if (off.error) throw off.error;
      if (slot.error) throw slot.error;
      const o = off.data as unknown as ReviewData['offering'];
      const card = await supabase
        .from('instructor_cards')
        .select('display_name, discipline_en, discipline_ar, category_id')
        .eq('id', o.instructor_id)
        .eq('discipline_id', o.discipline_id)
        .single();
      if (card.error) throw card.error;
      return {
        offering: o,
        slot: slot.data as ReviewData['slot'],
        instructor: card.data as ReviewData['instructor'],
      };
    },
  });
}

/** SQL `apply_promo`: the code's percent and discount, or an error ('promo_invalid'). */
export async function applyPromo(code: string, subtotalEgp: number) {
  const { data, error } = await supabase.rpc('apply_promo', { p_code: code, p_subtotal: subtotalEgp });
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as {
    code: string;
    percent_off: number;
    discount_egp: number;
  };
  return row;
}

export type Booking = { id: string; ref: string; status: string; total_egp: number; method: Method };

/** SQL `book()`: holds the seats atomically. Card → awaiting payment (5 min); venue → confirmed; kids/approval → pending. */
export async function placeBooking(b: {
  slotId: string;
  seats: number;
  childId: string | null;
  method: Method;
  promo: string | null;
  note: string;
}) {
  const { data, error } = await supabase.rpc('book', {
    p_slot: b.slotId,
    p_seats: b.seats,
    p_child: b.childId,
    p_method: b.method,
    p_promo: b.promo,
    p_note: b.note || null,
  });
  if (error) throw error;
  return data as Booking;
}

/** Edge Function create-checkout: the hosted (or demo) checkout URL for an awaiting-payment booking. */
export async function startCheckout(ref: string) {
  const { data, error } = await supabase.functions.invoke('create-checkout', { body: { ref } });
  if (error) throw error;
  return data as { url: string; amountEgp: number };
}

/**
 * Pays for a held booking (awaiting payment, or payment due after approval): 'demo' when the in-app demo
 * checkout must open next; 'done' when it settled (fake provider) or the learner is back from Paymob's
 * hosted checkout, where the webhook records the outcome.
 */
export async function runCheckout(ref: string): Promise<'done' | 'demo'> {
  const { url } = await startCheckout(ref);
  if (url.startsWith('coachforall://payment-return')) return 'done';
  if (url.startsWith('coachforall://')) return 'demo';
  await WebBrowser.openAuthSessionAsync(url, Linking.createURL('payment-return'));
  return 'done';
}

/** Edge Function demo-pay (demo provider only): records Pay / Fail through the webhook's code path. */
export async function demoPay(ref: string, outcome: 'paid' | 'failed') {
  const { data, error } = await supabase.functions.invoke('demo-pay', { body: { ref, outcome } });
  if (error) throw error;
  return data as { status: string };
}

const KNOWN = [
  'no_seats',
  'too_soon',
  'slot_past',
  'child_required',
  'child_age',
  'promo_invalid',
  'too_many_seats',
  'not_signed_in',
] as const;
export type BookingErrorKey = (typeof KNOWN)[number] | 'generic';

/** SQL exception names (e.g. "no_seats") → our copy keys. Anything else is a generic failure. */
export function bookingErrorKey(error: { message?: string } | null | undefined): BookingErrorKey {
  const m = error?.message ?? '';
  return KNOWN.find((k) => m.includes(k)) ?? 'generic';
}

/** One of the learner's bookings by ref (RLS: own rows only): Confirmed and Booking detail. */
export function useMyBooking(ref: string | undefined) {
  return useQuery({
    queryKey: ['booking', ref],
    enabled: Boolean(ref),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('my_bookings')
        .select(MY_BOOKING_COLUMNS)
        .eq('ref', ref!)
        .single();
      if (error) throw error;
      return data as MyBooking;
    },
  });
}

/** §7.10 "Remind me" choices; minutes before the start, the evening before (20:00, D29), or off. */
export type ReminderChoice = 30 | 60 | 120 | 'evening' | 'off';
export const REMINDER_CHOICES: ReminderChoice[] = [30, 60, 120, 'evening', 'off'];
export const DEFAULT_REMINDER: ReminderChoice = 120; // bookings.reminder_min default

/** Per-booking reminder choice, kept on the device; T19 schedules the local notifications from it. */
export const useReminders = create<{
  byRef: Record<string, ReminderChoice>;
  setReminder: (ref: string, choice: ReminderChoice) => void;
}>()(
  persist(
    (set) => ({
      byRef: {},
      setReminder: (ref, choice) => set((s) => ({ byRef: { ...s.byRef, [ref]: choice } })),
    }),
    { name: 'cfa-reminders', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
