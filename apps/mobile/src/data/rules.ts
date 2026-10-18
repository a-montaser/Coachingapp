// Pure booking rules (design.md §1). The same rules are enforced in SQL (`book()` and friends);
// the app uses these only to shape what it offers, never to decide money or availability.

/** §9.4: a workshop booking takes 1–3 seats, never more than are left. */
export const WORKSHOP_MAX_SEATS = 3;
export const maxWorkshopSeats = (seatsLeft: number) => Math.max(0, Math.min(WORKSHOP_MAX_SEATS, seatsLeft));

/** Keeps a chosen seat count inside 1…max (e.g. after switching to a date with fewer seats). */
export const clampSeats = (seats: number, max: number) => (max < 1 ? 0 : Math.min(Math.max(seats, 1), max));
