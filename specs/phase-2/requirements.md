# Phase 2 — Requirements: Engagement

Status: **APPROVED 6 Nov 2026** (D68), with the map button change in R4.1.
**Owner answers, 6 Nov (D67):** Q1 instructors sign in for chat; Q2 a series is paid up front; Q3 photos wait for Phase 3; Q4 chat is text only in Phase 2. The text below already follows these answers.
Sources: the Phase 1 report's outline (`specs/phase-1/report.md`), the working agreement's Phase 2 line, `docs/DESIGN_HANDOFF.md` §5 (chat bubbles), §6.1, §7.5 (map view), §7.6, §7.10–§7.13, §9.2, and `docs/DECISIONS.md` (D1–D66 still apply, D23 for design questions).

## Objective

A learner who has booked once has reasons to come back:

- message an instructor (text) and see replies arrive live, with unread counts, typing and read receipts
- rate a session they took
- keep favourite instructors and find them again
- browse Explore on a map
- book the same weekly time for several weeks in one go
- put a booking in their phone's calendar
- see where their app credit came from and went

Everything still runs in Expo Go on the owner's iPhone, against the hosted dev project. There is still no instructor app (Phase 3). For chat to have a second side, instructors get a sign-in for chat only (R1.2, question Q1).

## Capability map (one spec, built in this order)

| Module           | What it covers                                                                                   | Depends on                           |
| ---------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `data2`          | New tables, RLS, functions (`start_thread`, `rate_booking`, `book_series`, cancel-series branch) | Phase 1 `data`                       |
| `chat`           | Messages tab, Chat (text), unread badge, typing, read receipts, the Message buttons              | data2                                |
| `ratings`        | Rate sheet from Bookings and Booking detail; the instructor's average updates                    | data2                                |
| `favourites`     | Heart on instructor cards and profile; Favourites list in Profile                                | data2                                |
| `map`            | Explore List/Map, pins, selected card, "Search this area", recenter                              | Phase 1 `discovery`                  |
| `recurring`      | "Repeat weekly" on Book, paying for the series, cancel "this week only / every week"             | data2, Phase 1 `booking`, `payments` |
| `calendar`       | "Add to calendar" on Confirmed and Booking detail                                                | Phase 1 `manage`                     |
| `credit-history` | Profile → App credit list                                                                        | Phase 1 credit (D64)                 |
| `e2e2`           | Maestro flows and the two-sided realtime test in CI                                              | all                                  |

## Requirements and acceptance criteria

### R1 `chat` (handoff §7.13, §5 chat bubbles)

- R1.1 **One thread per learner and instructor**, created on the first message. Only those two people can read or write it (RLS). An instructor sees the learner's first name only, never the phone number (§9.10).
- R1.2 **The other side** _(Q1, D67)_: an `instructors.user_id` link lets an instructor sign in with their phone. A signed-in instructor skips onboarding (ops mark their profile onboarded when linking them) and sees only the Messages and Profile tabs (Profile for sign-out, language and appearance, D69), with their learners' threads (instructor mode is Phase 3). Dev and CI give two seeded instructors Supabase test numbers.
- R1.3 **Messages tab:** largeTitle, glass search (names and message text), one row per thread: photo (placeholder until photos arrive), name, time of last activity, context line in `brand-text` ("Padel · Today, 17:30" for the next booking together, "Squash · last session 6 Oct" otherwise, nothing if they never booked), last message (bold when unread) and an unread count badge. Sorted by latest activity. Empty state stays when there are no threads.
- R1.4 **Tab badge:** the Messages tab shows the total unread count (native tabs on iOS, the TabBar on Android) and updates live.
- R1.5 **Chat:** back + glass capsule with the instructor (name, "Padel coach · replies within an hour" from `reply_label`; tap opens the profile). When a booking with them is upcoming, a card under it: "Next: Today 17:30–18:30 · Cedar Court Club · View" (opens Booking detail). Bubbles as §5: theirs `surface-2`, mine `brand`, max width 260, radius 20 with a 6 pt tail corner, "Delivered" / "Read" under my last message.
- R1.6 **Composer:** glass text field and a send button, enabled once there's text. The "+" and mic buttons are hidden until media arrives (Q4, D67).
- R1.7 Text only _(Q4, D67)_: up to 2,000 characters a message. Photos, video and voice notes move to Later.
- R1.8 **Live:** new messages, typing ("…" pulsing dots per §8) and read receipts arrive without a refresh while the chat is open. Opening a chat clears its unread count. Sending shows the bubble at once; a failed send shows "Not sent · Retry".
- R1.9 **Entry points** that Phase 1 hid: "Message" on the Instructor profile's bottom bar, on Booking detail, and on upcoming Bookings cards. Chat → Instructor profile and Chat → Booking detail work back the other way (§6.1).
- R1.10 _(revised by the owner, 10 Nov, D74)_ A new message for a chat that isn't on screen shows as a phone notification, the same way session reminders do: the sender's name, the message text and a sound; tapping it opens that chat. Opening a chat asks for notification permission once (the same permission as reminders); without it, an in-app toast shows instead. These are local notifications posted while the app runs: real push for a closed app needs a development build and an Apple Developer account (Later).
- R1.11 _(owner, 10 Nov, D74)_ **Swipe to reply:** swipe right on any message (left in Arabic) to reply to it; a "Replying to Nour" bar with the quoted text and ✕ sits above the message field until sent or cancelled. The sent message shows the quote above its text; tapping the quote scrolls to the original. VoiceOver offers "Reply" as an action on each message. A reply can only quote a message from the same thread.
- **AC:**
  - pgTAP: a third user can't read or post in a thread; an instructor sees only their own threads; the unread count and the read marker are correct.
  - A Node test in the CI Supabase job signs in two users (learner, instructor) and checks a message, a typing event and a read receipt arrive over Realtime.
  - RNTL: Messages list states, Chat bubbles, composer, failed-send retry.
  - On the iPhone: send messages to an instructor signed in on a second device (or the owner's demo instructor account) and see it arrive live.

### R2 `ratings` (handoff §7.11, §7.12 Rate sheet)

- R2.1 A learner can rate a **completed** booking once: five stars (34 pt, gold when on) and optional text, "Shared with Nour only", "Send rating". Stars are required.
- R2.2 Entry points: "Rate session" on a past Bookings card and "Rate" on a past Booking detail. After rating they read "Rated 5★" and can't be changed.
- R2.3 The instructor's ★ average and review count (Instructor profile, cards) include the new rating at once. The text is visible only to the learner, that instructor and ops. No public review list in Phase 2.
- R2.4 Cancelled bookings can't be rated. _(Rating a child's booking went with the kids descope, D80.)_
- **AC:** pgTAP for `rate_booking`: not completed, not mine, cancelled, second rating, stars outside 1–5 are refused; the average and count update correctly from the seeded values. RNTL for the sheet and the "Rated" state.

### R3 `favourites`

- R3.1 A heart on the Instructor profile's glass cluster and on instructor cards (Explore Lessons, Favourites). Tapping toggles it at once (optimistic), with an accessibility label "Add Nour to favourites" / "Remove Nour from favourites".
- R3.2 **Profile → Favourites** lists favourite instructors as instructor cards, newest first, with an empty state ("No favourites yet · Tap the heart on a coach to keep them here").
- R3.3 Instructors only; workshops and groups can't be favourited in Phase 2.
- **AC:** pgTAP RLS (only your own favourites); RNTL toggle, list and empty state.

### R4 `map` (handoff §7.5 Map view)

- R4.1 _(D68)_ A **floating round glass button** in Explore's bottom-right corner, above the tab bar, with a map-pin icon (a teardrop pin like Google Maps', drawn in the app's own icon style, not Google's logo), opens the map. On the map the same button shows a list icon and goes back to the list. Either way the current search, filters, sort and segment are kept. Accessibility labels "Show map" / "Show list"; 44 pt or larger.
- R4.2 Map: full screen, one pin per venue with the lowest "From" price of its results ("390 EGP"; selected pin `brand` and slightly larger), the learner's location dot when allowed, glass recenter button (device location, else the area centre), "Search this area" small glass button that limits results to the visible region.
- R4.3 Bottom: the selected result's card floating, with previous/next arrows and "2 of 6 coaches" (or "2 of 6 groups"). Tapping the card opens the profile or Group page as in the list. The tab bar is minimised on the map.
- R4.5 _(owner, 11 Nov, D75)_ **Instructor profile calendar:** under "Next available", a month calendar (the Group page's, Saturday first) marks every day with open lesson times; the first open day is chosen; tapping a day lists its times as chips ("09:00 · Small group"), each opening Book at that session and time. "Next available" chips also name the session type, since several types can share a time.
- R4.4 Apple Maps on iOS and Google Maps on Android, through the installed `react-native-maps`: Expo Go needs no API key for either, so D52's key is not a blocker here.
- **AC:** RNTL: the floating button switches List ↔ Map and keeps filters; pins group by venue; arrows walk the results; "Search this area" filters by region (pure function, tested). Checked on the iPhone.

### R5 `recurring` (handoff §7.8, §7.9, §9.2) _(Q2)_

- R5.1 Book shows a "Repeat weekly" switch for **1:1 and group** sessions (not kids, not workshops): "Same time every Tuesday". When on, a stepper picks **2–8 weeks**, capped at the number of following weeks that have the same time open; the line under it reads "4 weeks · 24 Nov – 15 Dec".
- R5.2 **One atomic booking of all the weeks** (`book_series`): every week's slot is locked in time order in one transaction; if any week is no longer open, nothing is booked and the learner sees which week failed. Each week is its own booking (own ref, own status, own refund window), linked by a series id.
- R5.3 **Paying:** the whole series is paid at once, on one checkout (card, with app credit, per D64) or at the venue each week. Review & pay shows "4 weeks × 450 EGP". Promo codes apply to every week.
- R5.4 Bookings and Booking detail show "repeats weekly" / "· weekly".
- R5.5 **Cancel sheet:** for a series, a "Cancel every week" switch (§7.12). Off cancels this week only; on cancels this week and every later week. Each cancelled week follows its own 24-hour rule: more than 24 h out returns its share as app credit, inside 24 h nothing (D64). The sentence and button total add these up ("Cancel and get 1,350 EGP credit").
- R5.6 Reschedule moves one week only; it leaves the series.
- **AC:** pgTAP: series all-or-nothing (one week full → nothing booked, seats unchanged); every week priced and promo'd; cancel every week with a mix of in- and out-of-window weeks; concurrency: 20 parallel series bookings over the same weeks → no seat oversold. Deno test: a series checkout confirms every week on paid and releases every week on failed. RNTL for the switch, stepper and the cancel sheet sums.

### R6 `calendar` (handoff §7.10, §7.12)

- R6.1 "Add to calendar" on Confirmed (a row under Remind me) and Booking detail (a button, upcoming bookings) opens the system's add-event sheet with the title ("Padel with Nour"), start and end, venue name and address, and the booking ref in the notes. The learner confirms it in the system sheet; the app asks for no calendar permission it doesn't need.
- R6.2 Calendar sync (Bookings capsule) stays hidden: it needs a calendar feed or full calendar access. Moved to Later.
- **AC:** RNTL: the event passed to the calendar has the right fields (Cairo times, venue, ref). Checked on the iPhone.

### R7 `credit-history` (carry-over, D64 shortcut)

- R7.1 Profile → App credit opens a list: each grant (Refund for CFA-12345 · 1,300 EGP · never expires / Goodwill · 200 EGP · expires 6 May) and each spend (Used on CFA-67890 · −540 EGP), newest first, with the balance on top.
- **AC:** RNTL with seeded grants and spends; pgTAP: you read only your own.

### R8 `e2e2`

- R8.1 The Maestro journey in CI adds: favourite an instructor and find them in Profile → Favourites; send a text message and see an instructor reply that CI inserts; rate a past booking; book a 1:1 for 2 weeks, cancel every week; switch Explore to Map and back _(not in CI: Android builds hide the map until the Google Maps key is set, D77)_.
- **AC:** CI green on all jobs.

## Out of scope in Phase 2 (hidden, not shown disabled)

- **Phase 3:** instructor mode beyond chat (inbox only in Phase 2), ops admin web, availability rules (slots are still seeded and refreshed by `refresh_demo_slots.sql`), message moderation and "Report"
- **Phase 4:** InstaPay, Fawry, Vodafone Cash; Members' Circle (`[OPEN]`)
- **Last phase:** Arabic copy (D63); new strings go into `docs/translations/ar-app-strings.md`
- **Later:** chat photos, video and voice notes (D67), real photos (Phase 3, D67), push notifications (needs a development build), calendar sync, public review lists, favouriting workshops, Payments & receipts and Notifications screens, Edit profile, Share, search dictation (D25)

## Gate questions from Phase 1 (answered with this spec)

- **Canvas side-by-sides:** dropped _(Q5)_. The look changed (D58); the owner's iPhone screenshots stay the visual check.
- **Phase 1 pull request into `main`:** opened 6 Nov, https://github.com/a-montaser/Coachingapp/pull/1 _(Q5)_.
- **Real photos:** wait for Phase 3 (Q3, D67); placeholders stay.
- **Credit history:** in scope as R7.
- **Chat media limits / moderation:** no media in Phase 2 (Q4, D67), so no limits or moderation yet.

## Questions for the owner (all answered 6 Nov, D67, D68)

- **Q1 Who answers chat in Phase 2?** (a) Instructors sign in with a phone number and get the Messages tab only (`instructors.user_id`, test numbers in dev). (b) Ops answer from Supabase Studio with a SQL function; no instructor sign-in. (c) Chat waits for Phase 3. → **Answer: (a)**
- **Q2 Recurring bookings (money flow):** (a) pay all weeks up front, 2–8 weeks, promo on every week, each week refunds on its own 24-hour rule. (b) Pay each week separately, a day before. (c) Recurring only with pay at the venue. → **Answer: (a)**
- **Q3 Real photos:** (a) Ops upload instructor and workshop photos to a public Storage bucket in Studio and the app shows them (you send the photos). (b) Keep placeholders until the instructor app (Phase 3). → **Answer: (b)**
- **Q4 Chat media:** (a) the limits in R1.7, no automatic moderation, a "Report" button with Phase 3's ops admin. (b) Text only in Phase 2. → **Answer: (b)**
- **Q5 Phase 1 leftovers:** open the Phase 1 pull request into `main` now, and drop the canvas side-by-sides. → **Answer: yes**
