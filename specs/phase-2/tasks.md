# Phase 2 — Ordered tasks

Status: **APPROVED 6 Nov 2026** (D68). Follows the owner's answers Q1–Q4 (D67). Each task ends with "✅ [task] · files touched · tests added or passed", a commit on `phase-2`, and the map/Project Map update from CLAUDE.md. A task that fails the same way twice gets stopped and reported.

## Gate items from Phase 1
- [x] **G1 Phase 1 pull request** `phase-1` → `main` *(Q5)*: https://github.com/a-montaser/Coachingapp/pull/1 (6 Nov), waiting for the owner to merge.

## A. Data (`data2`)
- [x] **T1 Engagement migration.** Tables, columns, RLS, `my_threads`, triggers (design §2).
  - Verify: pgTAP RLS tests `05_chat`, `07_favourites`; CI supabase job.
  - Done 6 Nov: migration `20261106120000_engagement.sql`; CI run 42267559972 green on all four jobs (89 pgTAP tests, 33 new). Pushed to the hosted project with T3 (D70).
- [x] **T2 Functions.** `start_thread`, `rate_booking`, `book_series`, `cancel_booking(every_week)`.
  - Verify: pgTAP `06_ratings`, `08_series` with frozen time; Phase 1 tests unchanged and green; series concurrency script.
  - Done 6 Nov: migration `20261106130000_engagement_functions.sql`; CI run 42291508370 green on all four jobs (120 pgTAP tests; 20 parallel series over two one-seat weeks → 1 success, no seat oversold). Phase 1 test 28 caught a reschedule bug on the first run (fixed).
- [x] **T3 Seed and push.** Two seeded instructors linked to test numbers *(Q1, D67)*; a signed-in instructor skips onboarding and sees Messages and Profile only (D69); a seeded thread for the demo learner; migration pushed to the hosted project.
  - Verify: `supabase db push`; read-only query shows the counts.
  - Done 6 Nov: CI run 42292972446 green; both migrations pushed to the hosted project; `demo_instructors.sql` run there (Yasmine and Nour linked and onboarded, demo chat with 2 messages); the owner added their test numbers (code 111111 on hosted, list valid until 29 Nov).

## B. Chat
- [ ] **T4 Messages tab + tab badge + entry points** (R1.3, R1.4, R1.9), text-only Chat with send, retry, mark read (R1.5, R1.8 without typing).
  - Verify: RNTL; on the iPhone with the demo instructor signed in on a second device.
- [ ] **T5b Swipe to reply and message notifications** (owner, 10 Nov, R1.10 revised, R1.11, D74): `messages.reply_to` with the same-thread check (pgTAP `09_replies`), swipe and VoiceOver reply, quote in the bubble, reply bar in the composer; local notifications for new messages, tap opens the chat.
  - Verify: RNTL; pgTAP; on the iPhone with two accounts.
- [ ] **T5 Realtime:** live messages, typing, read receipts, in-app toast (R1.8, R1.10); `supabase/tests/realtime.mjs` in CI.
  - Verify: CI realtime test; on the iPhone.
## C. Ratings, favourites, credit
- [x] **T6 Rate sheet** from Bookings and Booking detail; "Rated 5★" (R2).
  - Verify: RNTL; pgTAP from T2.
- [x] **T7 Favourites:** heart on the profile and cards, Profile → Favourites (R3).
  - Verify: RNTL.
- [ ] **T8 App credit history** (R7).
  - Verify: RNTL.

## D. Explore map
- [ ] **T9 Map** opened from the floating pin button (D68), with pins by venue, selected card, arrows, recenter, "Search this area" (R4).
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
