# Phase 2 report (Engagement)

Status: **built, waiting at the Phase 3 gate.** CI is green on `phase-2`. Nothing in Phase 3 starts until you approve.

## What was built

On top of the Phase 1 booking loop, still in Expo Go on the hosted project (`rcbpasqkzmseisujmxgt`):

- **Chat (R1):**
  - A Messages tab with search and an unread badge; Message buttons on instructor profiles, Bookings cards and Booking detail.
  - Text chat with send, retry and read receipts. Messages, typing dots and "Read" arrive live over Supabase Realtime (about 0.2 s in CI).
  - **Swipe to reply** with a quote that scrolls to the original (D74).
  - **Message notifications** show the way reminders do: local notifications while the app runs (D74).
  - Instructors sign in by phone and see only Messages and Profile (D67, D69). Only the two people in a conversation can read it (RLS).
- **Ratings (R2):** "Rate session" on past bookings; five stars and an optional note, once per booking. The instructor's average updates at once.
- **Favourites (R3):** a heart on instructor cards and profiles, and a Favourites list in Profile.
- **Explore map (R4):** a floating pin button opens a map with price pins per venue, Search this area, recenter, and a result card with arrows (D68). Plus, at your request, a **month calendar under Next available** on instructor profiles (D75).
- **Weekly series (R5):** Repeat weekly for 2–8 weeks on 1:1 and small-group sessions, booked all-or-nothing and paid in one checkout; "Cancel every week" with each week on its own 24-hour rule.
- **Add to calendar (R6):** on Confirmed and Booking detail, through the phone's own New Event sheet (D76).
- **App credit history (R7):** Profile → App credit lists every refund and spend.
- **Also done:** the Expo SDK 58 upgrade (D73), the Max price slider fix, the empty space under Save on Interests and levels, and two bugs the end-to-end test found (D77, D78).

Decisions D67–D78 are in `docs/DECISIONS.md`.

## How to try it

The full checklist is in `specs/phase-2/manual-test.md`: 23 steps, about 25 minutes on your iPhone. It covers Phase 1 and Phase 2.

## Test results (CI, all four jobs green)

- **checks:** lint, typecheck, 188 Jest and RNTL tests in 31 suites, token tests.
- **supabase:** 135 pgTAP tests across 11 files. Phase 2 added:
  - chat: only thread members can read or write
  - ratings, favourites and replies
  - series booking and paying a series
  - credit history

  Also in this job:
  - **concurrency:** 20 simultaneous bookings for the last seat, and a race for a two-week series; exactly one wins each.
  - **realtime:** two signed-in users exchange messages, typing and read receipts, and an outsider receives nothing.

- **edge-functions:** 8 Deno tests (signatures, outcomes, provider choice; checkout now prices a whole series).
- **e2e:** Maestro on an Android emulator runs the Phase 1 journey, then Phase 2:
  - favourite Nour
  - message her and see her reply arrive live
  - book her 1:1 for two weeks, then cancel every week (1,300 EGP credit back)
  - rate a finished session
  - find her in Favourites

  The screen is recorded on every run (GitHub → Actions → run → Artifacts → e2e-recording).

## Not done, or done differently

- **Map on Android builds:** hidden until the Google Maps key exists (D52). Opening a map without the key crashes an Android build. Expo Go and iPhone are unaffected. So the e2e test doesn't cover the map (D77).
- **Push for a closed app:** needs a development build and an Apple Developer account. Message notifications are local, shown while the app runs (D74).
- **Chat media** (photos, video, voice notes): moved to Later (D67).
- **Calendar sync:** Later. Add to calendar covers single events (R6.2).
- **Your iPhone check is still open** for: chat with your partner, swipe to reply, notifications, the map, weekly booking, Add to calendar, the instructor calendar, and the slider and spacing fixes. Tasks T4, T5 and T5b are ticked on CI; the device check is the manual test above.

## [OPEN] items hit

- **Google Maps API key** (D52): Android maps.
- **Apple Developer membership:** remote push, TestFlight, Apple Pay.
- **Hosted test numbers expire 29 Nov 2026:** Omar, Yasmine and Nour need renewing in the Supabase dashboard after that.
- **Instructor sign-in** is set by ops in the database (`instructors.user_id`). Phase 3's instructor onboarding replaces this.

## Risks

1. **The e2e job is slow (about 20 minutes) and timing-sensitive.** Two flaky waits were relaxed this phase (a toast fading, a hidden button).
2. **Typing indicators use a plain broadcast channel, not an RLS-checked private one** (D72). It only carries "typing" and a user id, but it should be locked down in the Phase 5 security review.
3. **Free-tier hosted project:** it can pause, and demo times run out (`refresh_demo_slots.sql`).
4. **Real Android phones are still untested.** Only the CI emulator has run the app.

## Proposed Phase 3 spec outline (Supply side)

From the working agreement:

- **R1 Instructor mode** in the same app, after phone sign-in:
  - onboarding: profile, disciplines, levels, venue, bio
  - **real photos** (Storage, with size limits), which replace the placeholders (D67 Q3)
- **R2 Verification:** documents uploaded, reviewed by ops, then the "Verified" badge.
- **R3 Availability rules:** weekly hours and exceptions, which generate slots.
- **R4 Offerings and workshops:** create, edit and publish 1:1, group, kids and workshop sessions, with prices and capacity.
- **R5 Accepting bookings:** approve or decline requests (sessions that need approval, D29), the day's schedule, and messaging from the bookings.
- **R6 Earnings:** per-session earnings and a payout summary. The payout ledger itself is Phase 4.
- **R7 Ops admin web:** verification queue, refunds and credits (`grant_credit`), support view of bookings and chats, instructor sign-in linking.
- **Carry-overs to decide at the gate:**
  - the Google Maps key, for Android maps
  - whether Phase 3 needs a development build: instructor photo upload works in Expo Go; push doesn't
  - chat media
  - the Phase 2 pull request into `main`

## Descoped after the report (14 Nov 2026, D80)

**Kids and family are out of scope until after all phases** (owner). The app no longer asks who sessions are for, and has no Family & kids screen. There's no Adults | Kids switch on Book or in Filters, and no kids sessions anywhere. The database keeps everything (kids sessions are unpublished, not deleted; `family_members` and the kids booking rules stay), so it can come back after Phase 5. This also takes "deeper kids and guardian flows" out of Phase 4.
