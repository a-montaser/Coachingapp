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
- [x] **T14 Book screen** (1:1, group, kids).
  - Verify: RNTL tests; bookable-rule tests.
- [x] **T15 Review & pay + promo + Confirmed** (ring, Remind me sheet).
  - Verify: rule tests for the policy line and promo.
- [x] **T16 PaymentProvider + Edge Functions** (create-checkout, payment-webhook, refund) with paymob and fake.
  - Verify: deno tests; one manual sandbox card payment on the iPhone.
  - Deployed 19 Oct (D46); demo card payment verified end to end on the hosted project. Paymob sandbox payment waits for a Paymob merchant account.

## F. Manage and reminders
- [x] **T17 Bookings list + Booking detail.** (D50)
  - Verify: RNTL for upcoming, past, cancelled and empty.
- [x] **T18 Cancel sheet + refund flow; Reschedule.** (D51; sending queued refunds needs a scheduled call, owner)
  - Verify: SQL tests (T2) plus RNTL for the outcome sentences.
- [x] **T19 Local reminders.** (D53; the manual notification on the iPhone is for the owner)
  - Verify: reminder-time tests; manual notification on the iPhone.

## F2. Owner revision (25 Oct, D54, R11) — before T20
- [ ] **T23 New look** (`/impeccable`): visual direction with the owner, tokens and components re-themed app-wide, DESIGN.md written. (R11.1)
- [x] **T24 Sign-up name, one-page levels, Skip all, Profile header and one-page preferences edit.** (R11.2–R11.4; Profile → Interests and levels is `app/preferences.tsx`)
- [x] **T25 Home and Explore:** "Classes near you", cards without price and with level, Lessons | Groups everywhere, filters in the Filters sheet as in the prototype. (R11.5–R11.8)
  - Sports small groups join Groups through migration `20261025120000_groups_include_all_group_types.sql` (tested in CI); **pushing it to the hosted project waits for the owner**.
- [x] **T26 MonthCalendar; Book "Adults | Kids"; Group page (calendar, seats, one button); price only on Review.** (R11.7, R11.9–R11.11, R11.13)
- [ ] **T27 Bookings:** time first, filter by type and time, month calendar view. (R11.12)
  - Verify (each): RNTL for the changed journey; `npm run check`; both themes looked at on the iPhone.

## G. End to end and close
- [ ] **T20 Maestro in CI** (Android debug build, local Supabase, fake provider), with the flows in R10.1.
  - Verify: CI green.
- [ ] **T21 Arabic pass.** Every new string goes into `docs/translations/ar-app-strings.md` for you.
  - **Deferred by the owner (25 Oct):** do it after T20; remind the owner before T22. The table has 426 rows waiting for Egyptian Arabic.
  - Verify: no hard-coded English in screens (lint/grep).
- [ ] **T22 Graphify `--update`, DECISIONS, phase report** with canvas side-by-sides.
  - **Revert the testing aids first (D43):** `TEST_IMAGES = false` in `src/dev/testImages.ts`, then delete it and `assets/test-images/`; `component.otp.resendSeconds` back to 60.
  - Verify: CI green on the final commit. **STOP for the Phase 2 gate.**
