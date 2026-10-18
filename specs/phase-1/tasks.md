# Phase 1 — Ordered tasks

Each task ends with "✅ [task] · files touched · tests added or passed". A task that fails the same way twice gets stopped and reported.

## Gate items carried over from Phase 0 (need you)
- [ ] **G1 GitHub push**, then CI green on `phase-0` and a pull request into `main`.
- [x] **G2 Supabase keys** in `.env`, then `supabase link` and `db push` of the baseline.

## A. Data (`data`)
- [ ] **T1 Schema migration.** Tables and RLS from design.md §2; the `my_bookings` view; the profile trigger.
  - Verify: pgTAP RLS tests (two users can't see each other's rows).
- [ ] **T2 Booking functions.** `book`, `cancel_booking`, `reschedule_booking`, `apply_promo`.
  - Verify: pgTAP tests for every rule and refund branch, with frozen time.
- [ ] **T3 Seed.** Handoff §14 in full, plus 14 days of generated slots and Omar + Ali.
  - Verify: the seed applies with `supabase db reset`; counts match §14.
- [ ] **T4 Concurrency test** script, run in the CI Supabase job.
  - Verify: 1 of 20 succeeds.

## B. App foundations (`auth`, `shell`)
- [x] **T5 Data layer.** Supabase client, QueryClient, AsyncStorage persistence of the settings store.
  - Verify: unit tests for persistence.
- [x] **T6 Auth screens.** Welcome, Sign up, Verify; the auth gate in `_layout`; sign-out sheet.
  - Verify: RNTL tests; manual sign-in on the iPhone with the test number.
- [x] **T7 Tab shell.** `(tabs)` with the TabBar, the Messages empty state, push-hides-tabs behaviour.
  - Verify: RNTL.
- [x] **T8 Profile, Family & kids, Language / Appearance sheets.**
  - Verify: RNTL tests, including family-member validation.

## C. Onboarding
- [x] **T9 Categories (D35), Interests (canvas 6), Levels, Who & where**, before sign-up (D34), saving to `interests` and `profiles`.
  - Verify: RNTL tests; Arabic screenshot.

## D. Discovery
- [x] **T10 Home ×4 + tray** (canvas 1–5), including Sports "Book again".
  - Verify: RNTL for 4 categories; side-by-side screenshots against canvas.
- [x] **T11 Explore (canvas 7)** with search, the Filters and Sort sheets, empty state.
  - Verify: filter and sort rule tests.
- [x] **T12 Instructor profile (canvas 8).**
  - Verify: RNTL for the hobbies and sports variants.
- [x] **T13 Workshop (canvas 9)** with the seat stepper.
  - Verify: RNTL for stepper limits and full dates.

## E. Booking and payments
- [ ] **T14 Book screen** (1:1, group, kids).
  - Verify: RNTL tests; bookable-rule tests.
- [ ] **T15 Review & pay + promo + Confirmed** (ring, Remind me sheet).
  - Verify: rule tests for the policy line and promo.
- [ ] **T16 PaymentProvider + Edge Functions** (create-checkout, payment-webhook, refund) with paymob and fake.
  - Verify: deno tests; one manual sandbox card payment on the iPhone.

## F. Manage and reminders
- [ ] **T17 Bookings list + Booking detail.**
  - Verify: RNTL for upcoming, past, cancelled and empty.
- [ ] **T18 Cancel sheet + refund flow; Reschedule.**
  - Verify: SQL tests (T2) plus RNTL for the outcome sentences.
- [ ] **T19 Local reminders.**
  - Verify: reminder-time tests; manual notification on the iPhone.

## G. End to end and close
- [ ] **T20 Maestro in CI** (Android debug build, local Supabase, fake provider), with the flows in R10.1.
  - Verify: CI green.
- [ ] **T21 Arabic pass.** Every new string goes into `docs/translations/ar-app-strings.md` for you.
  - Verify: no hard-coded English in screens (lint/grep).
- [ ] **T22 Graphify `--update`, DECISIONS, phase report** with canvas side-by-sides.
  - Verify: CI green on the final commit. **STOP for the Phase 2 gate.**
