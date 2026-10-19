// Pure booking rules (design.md §1). The same rules are enforced in SQL (`book()` and friends);
// the app uses these only to shape what it offers, never to decide money or availability.

/** §9.4: a workshop booking takes 1–3 seats, never more than are left. */
export const WORKSHOP_MAX_SEATS = 3;
export const maxWorkshopSeats = (seatsLeft: number) => Math.max(0, Math.min(WORKSHOP_MAX_SEATS, seatsLeft));

/** Keeps a chosen seat count inside 1…max (e.g. after switching to a date with fewer seats). */
export const clampSeats = (seats: number, max: number) => (max < 1 ? 0 : Math.min(Math.max(seats, 1), max));

const cairoDay = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(d);

/**
 * Mirrors SQL `assert_bookable` (§9.6): the slot is in the future and, when it is later today in Cairo,
 * at least 60 minutes away. Seats are checked separately.
 */
export function isBookable(startsAt: Date, now: Date): boolean {
  if (startsAt <= now) return false;
  return cairoDay(startsAt) !== cairoDay(now) || startsAt.getTime() - now.getTime() >= 60 * 60_000;
}

/** Cairo wall-clock [hour, minute] of an instant (slots are stored in UTC, shown in Cairo). */
export function cairoHM(d: Date): [number, number] {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(d);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return [get('hour'), get('minute')];
}

/** Book's two weeks (§7.8 "this week / next week"): 7 Cairo days starting today, or the 7 after. */
export function weekDays(week: 0 | 1, now: Date): Date[] {
  // Noon UTC on each Cairo date keeps every day on the right calendar date whatever the offset.
  const [y, m, d] = cairoDay(now).split('-').map(Number) as [number, number, number];
  return Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(y, m - 1, d + week * 7 + i, 12)));
}

export const sameCairoDay = (a: Date, b: Date) => cairoDay(a) === cairoDay(b);

/** §9.7 price: the offering's price × seats, in whole EGP (VAT included). Mirrors `book()`. */
export const subtotal = (priceEgp: number, seats: number) => priceEgp * seats;

/** §9.8 promo: percent off the subtotal, rounded to whole EGP. Mirrors SQL `apply_promo`. */
export const promoDiscount = (subtotalEgp: number, percentOff: number) =>
  Math.round((subtotalEgp * percentOff) / 100);

export type Policy =
  | { kind: 'free'; until: Date } // "Free cancellation until Wed 14 Oct, 18:00."
  | { kind: 'sameDay' } // "This is a same-day booking, so it can't be refunded."
  | { kind: 'late' }; // "Less than 24 hours to go. Cancelling now isn't refunded."

/**
 * §9.1 policy line for a booking made `now` for a session starting `startsAt`. Mirrors `book()` /
 * `cancel_booking()`: refundable until 24 h before the start, never when booked on the start date.
 */
export function policyFor(startsAt: Date, now: Date): Policy {
  if (sameCairoDay(startsAt, now)) return { kind: 'sameDay' };
  const until = new Date(startsAt.getTime() - 24 * 60 * 60_000);
  return now < until ? { kind: 'free', until } : { kind: 'late' };
}
