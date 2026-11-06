# Phase 2 — Ordered tasks

Status: **DRAFT 6 Nov 2026, waiting for approval.** Follows the owner's answers Q1–Q4 (D67). Each task ends with "✅ [task] · files touched · tests added or passed", a commit on `phase-2`, and the map/Project Map update from CLAUDE.md. A task that fails the same way twice gets stopped and reported.

## Gate items from Phase 1
- [ ] **G1 Phase 1 pull request** `phase-1` → `main` *(Q5)*.

## A. Data (`data2`)
- [ ] **T1 Engagement migration.** Tables, columns, RLS, `my_threads`, triggers (design §2).
  - Verify: pgTAP RLS tests `05_chat`, `07_favourites`; CI supabase job.
- [ ] **T2 Functions.** `start_thread`, `rate_booking`, `_book_one` + `book_series`, `cancel_booking(every_week)`.
  - Verify: pgTAP `06_ratings`, `08_series` with frozen time; Phase 1 tests unchanged and green; series concurrency script.
- [ ] **T3 Seed and push.** Two seeded instructors linked to test numbers *(Q1, D67)*; a signed-in instructor skips onboarding and sees Messages only (journey gate); a seeded thread for the demo learner; migration pushed to the hosted project.
  - Verify: `supabase db push`; read-only query shows the counts.

## B. Chat
- [ ] **T4 Messages tab + tab badge + entry points** (R1.3, R1.4, R1.9), text-only Chat with send, retry, mark read (R1.5, R1.8 without typing).
  - Verify: RNTL; on the iPhone with the demo instructor signed in on a second device.
- [ ] **T5 Realtime:** live messages, typing, read receipts, in-app toast (R1.8, R1.10); `scripts/realtime-test.mjs` in CI.
  - Verify: CI realtime test; on the iPhone.
## C. Ratings, favourites, credit
- [ ] **T6 Rate sheet** from Bookings and Booking detail; "Rated 5★" (R2).
  - Verify: RNTL; pgTAP from T2.
- [ ] **T7 Favourites:** heart on the profile and cards, Profile → Favourites (R3).
  - Verify: RNTL.
- [ ] **T8 App credit history** (R7).
  - Verify: RNTL.

## D. Explore map
- [ ] **T9 List | Map** with pins by venue, selected card, arrows, recenter, "Search this area" (R4).
  - Verify: rules tests; RNTL toggle; on the iPhone.

## E. Recurring and calendar
- [ ] **T10 Repeat weekly on Book, Review & pay for a series, series checkout** (R5.1–R5.4, design §5).
  - Verify: RNTL; Deno series tests; on the iPhone with the demo provider.
- [ ] **T11 Cancel every week; Reschedule one week** (R5.5, R5.6).
  - Verify: RNTL for the sums; pgTAP from T2.
- [ ] **T12 Add to calendar** on Confirmed and Booking detail (R6).
  - Verify: RNTL for the event fields; on the iPhone.

## F. End to end and close
- [ ] **T13 Maestro:** the R8.1 additions to the CI journey.
  - Verify: CI green on all jobs.
- [ ] **T14 Graphify `--update`, DECISIONS, Phase 2 report** with the Phase 3 outline.
  - Verify: CI green on the final commit. **STOP for the Phase 3 gate.**
