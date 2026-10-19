# Phase 1 — Requirements: MVP, the hobbies-first booking loop

Status: **APPROVED 17 Oct 2026** with the answers in "Resolved" below (they override any text above).
**Revised 18 Oct 2026** for owner changes D31–D35 (`docs/DECISIONS.md`): onboarding before sign-up, a Categories step, the floating navigation bar, Phase 1 Profile scope. Revised lines are marked *(D3x)*.
Sources: `docs/DESIGN_HANDOFF.md` (§1 and §6–§14 win on conflict), the design canvas https://claude.ai/artifact/T5HG8bjkJWWg48RsUwrGhC (its 10 artboards are the look) and its design system https://claude.ai/artifact/MEfnwmckrfLtf6ccKrnFbW (D23, D24).

## Objective
A new learner in Cairo can do all of the following on an iPhone in Expo Go:
- pick categories and hobbies, then sign up with a phone OTP *(D34, D35)*
- switch categories in the tray
- book a workshop seat and a 1:1 lesson, paying in the gateway sandbox or at the venue
- see both bookings in Bookings, and cancel one with the correct refund

Each screen matches the canvas artboard it comes from and follows the handoff's journeys (§6.1). There's no instructor app: ops manage instructors, offerings, slots and workshops in Supabase Studio, starting from the §14 seed.

## Capability map (one spec, built in this order)

| Module | What it covers | Depends on |
|---|---|---|
| `data` | Schema, RLS, §14 seed, atomic booking/cancel/reschedule functions | — |
| `auth` | Phone OTP sign-up and sign-in, session, sign out | data |
| `shell` | Tab navigator, persisted settings (theme, language, category), Profile, Family & kids, Language, Appearance, Sign out | auth |
| `onboarding` | Welcome → Categories → Interests → Levels → Who & where → Sign up → Verify *(D34, D35)* | auth, shell |
| `discovery` | Home ×4 with the tray, Explore (search, filters, sort), Instructor profile, Workshop | data, shell |
| `booking` | Book (1:1, group, kids), workshop seats, Review & pay, promo, Confirmed | discovery |
| `payments` | `PaymentProvider` interface: gateway sandbox + pay at the venue; Edge Functions for checkout, webhook and refund | booking |
| `manage` | Bookings (Upcoming/Past), Booking detail, Cancel with the 24-hour rule, Reschedule | booking, payments |
| `reminders` | Local notification before each booking ("Remind me") | manage |
| `e2e` | Maestro flows in CI; the "last seat" concurrency test | all |

## Requirements and acceptance criteria

### R1 `data`
- R1.1 Tables are as in design.md §2. **RLS is enabled on every table** in the same migration that creates it. A learner reads and changes only their own rows; catalogue tables are public read; nobody writes bookings directly.
- R1.2 All writes to bookings, slots and payments go through `security definer` Postgres functions: `book`, `cancel_booking`, `reschedule_booking`, `apply_promo`. Each one locks the slot row (`for update`) inside one transaction. A check constraint keeps `0 ≤ seats_taken ≤ capacity`.
- R1.3 A slot is bookable when (§9.6):
  - it starts in the future, and at least 60 minutes ahead if it's today (Cairo time)
  - it has enough free seats
  - it belongs to a published offering of a verified instructor
- R1.4 Workshop bookings take at most 3 seats (§9.4). Private 1:1 is always 1 seat. Group bookings allow up to 4 people per slot. Kids bookings need a family member aged 6–14.
- R1.5 Every booking gets a reference `CFA-` plus 5 random digits, unique (§9.9).
- R1.6 The seed loads all of §14: every instructor, venue, offering and workshop, the learner Omar with his child Ali, and promo `CFA10` at 10%. It adds generated slots for the next 14 days.
- **AC:**
  - SQL tests (pgTAP via `supabase test db`) cover RLS isolation between two users, each `book` rejection (past, under 60 minutes, full, over 3 seats, a kids booking without a child), and the price and promo maths.
  - **Two simultaneous `book` calls for the last seat give exactly one success.** A concurrency test in CI runs 20 parallel calls and asserts 1 success and 19 "no seats".

### R2 `auth`
- R2.1 Sign up (§7.2): fixed "EG +20" prefix and 10 digits, with an inline error. "Send code" uses Supabase phone OTP.
- R2.2 Verify:
  - 6 boxes, the current one with a 2 pt `brand` ring
  - iOS one-time-code autofill, and auto-submit at the 6th digit
  - a wrong code shows an inline error and clears the boxes
  - a resend countdown, then a "Resend code" link
  - "Change number" goes back
- R2.3 The session persists across launches. Sign out goes through a confirmation sheet (§7.14).
- R2.4 Dev and CI use Supabase test numbers: `+20 100 234 5678` signs in with code `482917` (§14). No SMS is sent.
- R2.5 *(D34)* Sign up comes after onboarding for new learners. Answers given while signed out are kept on the device and written to the account right after Verify, before Home shows; an account that is already onboarded keeps its saved answers. If that save fails, the learner lands on Categories signed in, with the picks kept. "Sign in" on Welcome goes straight to Sign up (returning learners skip onboarding).
- **AC:** A Maestro flow finishes onboarding, signs up with the test number, verifies, and lands on Home with the picks saved. Unit tests cover the phone validation and the save-after-verify step.

### R3 `shell`
- R3.1 Five tabs (Home, Explore, Bookings, Messages, Profile), using Apple's native tab bar on iOS (system Liquid Glass and its selection animation, with the prototype's own tab icons, D48) and the Phase 0 `TabBar` (the prototype's floating glass tab bar) on Android, both minimising on scroll *(D47: the native bar is back on iOS; D43 had replaced it)*. Pushed screens hide the tab bar; tapping a tab returns to its root (§6.1).
- R3.2 Theme, language and category persist across launches.
- R3.3 Language changes take effect immediately, in JS-level RTL (D26).
- R3.4 Profile (§7.14), limited to Phase 1 *(D31: no Edit button, no Members' Circle card)*:
  - header with photo slot, name and "Area · member since 2026"
  - "Levels" list with "Change interests and levels", which reopens Categories → Interests → Levels and returns to Profile *(D35)*
  - Settings: Family & kids, Language (sheet), Appearance (sheet: Light / Dark / System), Sign out
- R3.5 Family & kids (§7.14):
  - an explainer line
  - child cards with name, age and Edit (no per-child discipline · level: not in the schema, D31), any pending kids booking as a warning row, and "Book a session for <name>"
  - "Add a family member" dashed card, opening a sheet with first name and age 6–14, validated
  - info rows
- R3.7 *(D33, D43)* Navigation bar on pushed screens (canvas Instructor/Workshop artboards): a round glass back button and the trailing actions (or a text action such as "Skip") in one glass cluster with hairline dividers, 16 pt in from the sides; an inline centred title (and subtitle) where the prototype has one (Book: "Book with Nour" over "Padel"); on hero detail screens the title appears once the hero scrolls away (§8).
- R3.6 Messages tab: the §5 empty state ("No messages yet · Chat with instructors after you book" [copy to confirm]). Chat is Phase 2.
- **AC:** RNTL tests cover persistence of theme, language and category and family-member validation. Maestro switches the theme and language from Profile.

### R4 `onboarding`
- R4.1 Welcome (§7.1):
  - full-bleed hero illustration [see Open question 1]
  - Playfair wordmark and a glass "Sign in" button
  - surface panel with the brandHero headline "Learn something new in Cairo." **[OPEN: final copy]**, one line of copy, and the "Get started" primary
- R4.2 *(D35)* Categories (new first step): Hobbies, Sports, Education and Languages as their own list, multi-select, each row listing a few of its disciplines; progress fills half of segment 1; "Continue", or disabled "Pick at least one".
- R4.3 Interests (§7.3, canvas artboard 6):
  - progress 1 of 3; a back button
  - only the categories picked in R4.2, together on one page, each with "N picked"; picks from an un-picked category are dropped *(D35)*
  - 3-column tiles: 92 high, brand-tint when selected, tick badge
  - sticky "Continue · N picked", or disabled "Pick at least one"
- R4.4 Levels:
  - floating glass back button and a glass "Skip" (R3.7) *(D33: the pick's name is in the question, not the bar)*
  - per pick: a 56 pt icon, "How experienced are you with pottery?" (one form for every pick, D32), and four level rows with 4-bar glyphs and a one-line description that advance on tap
  - a "You're all set" summary; tapping a pick edits it and returns to the summary
  - the progress bar fills per item answered
- R4.5 Who & where:
  - radio: Me / My child / Both
  - area chips: New Cairo, Zamalek, Maadi, Sheikh Zayed, Heliopolis, Downtown, and "Use my location" (nearest area; the position itself is not stored, D32)
  - instructor preference chips
  - "Show my picks": signed in → Home (and Family & kids for My child / Both); signed out → Sign up *(D34)*. "Skip" does the same with nothing set
- **AC:** Maestro covers Welcome → Categories → Interests (2 hobbies) → Levels → Who & where → Sign up → Verify → Home *(D34)*. Interests, levels and preferences are saved to `interests` and `profiles`.

### R5 `discovery`
- R5.1 Home per category (§7.4, canvas artboards 1–5):
  - wordmark and category button; greeting by time of day; per-category subline from the canvas
  - glass search, which opens Explore with focus
  - next-booking card, or the empty card
  - disciplines rail and group-product rail. Sports has no group rail in v1.
  - people list sorted by soonest availability
  - Sports also shows a "Book again" card
- R5.2 The category tray is the only way to change category (§6.2). It persists (R3.2). Explore's category button opens Home's tray.
- R5.3 Explore (§7.5, canvas artboard 7):
  - large title; glass search with live filtering by name, discipline, area or venue
  - segmented "Workshops | 1:1 lessons" on Hobbies. Other categories show the list only, since the map is Phase 2.
  - "Filters · N" chip, then discipline chips; result line; Sort sheet
  - Filters sheet: max price 300–1,200 in steps of 50 (1,200 = "Any"); session type, gender, rating, distance and availability chips; live count; "Show N coaches", disabled "No matches" at 0
  - empty state "No matches · Loosen a filter or try another search · Clear search and filters"
- R5.4 Instructor profile (§7.6, canvas artboard 8):
  - 340 hero with scrim; glass back and a Share cluster (favourite is Phase 2)
  - brandTitle name and meta line; "Next available" card with three slot pills and "All times"
  - Hobbies: upcoming workshops, then private lessons. Other categories: session types with prices.
  - venue and "What to bring" rows; two policy lines
  - bottom bar "From X EGP" · primary "Book". The Message button is Phase 2.
- R5.5 Workshop (§7.7, canvas artboard 9):
  - 260 banner, pill, title, description, instructor row
  - up to 3 date buttons, with full dates disabled
  - seats stepper 1…min(3, left) with "Come with a friend, up to N"
  - Included / Take home / Cancellation rows
  - bottom bar summary and total · "Reserve"
- **AC:**
  - RNTL tests cover the Home variants for all 4 categories, filter and sort logic as pure functions, and the seat-stepper limits.
  - Maestro switches category in the tray and sees Home change.
  - Side-by-side screenshots against canvas artboards 1–9 go in the phase report.

### R6 `booking`
- R6.1 Book (§7.8):
  - header "Book with <first name>" · discipline
  - segmented session type showing only the types offered, with a one-line description
  - for Kids, a child card ("For Ali, age 9 · A guardian stays on site · Change"), or "Add a child…"
  - month label with week arrows; day picker with "Today" (D24)
  - slots by part of day; "No times on <day> · <name> isn't coaching that day."
  - note field
  - bottom bar summary + price · "Continue", or disabled "Pick a time" with its reason
  - "Repeat weekly" is Phase 2 and hidden.
- R6.2 Review & pay (§7.9):
  - summary card with Edit
  - Pay with: **only the Phase 1 methods** (Open question 2)
  - promo field with Apply/Remove and inline errors or success ("CFA10 applied: 10% off this session")
  - breakdown with the policy line ("Free cancellation until …" or "This is a same-day booking, so it can't be refunded.")
  - bottom bar "Total" or "Due at the venue" · "Pay N EGP" or "Confirm booking", with an inline "Processing" spinner that disables the button
- R6.3 Choosing a payment method holds the seats atomically (`book`) before any money moves. An unpaid hold expires after **[10 min, Open question 3]** and its seats are freed.
- R6.4 Confirmed (§7.10):
  - gold ring then tick (Reduce Motion: no draw)
  - brandConfirm headline per category **[OPEN: final copy]**, using the handoff's examples
  - "Request sent." when the booking is pending; ref line; details list
  - Directions and Share tiles. Add to calendar is Phase 2.
  - "Remind me · 2 hours before" row
  - "View booking" and "Back to Home"
- **AC:**
  - unit tests for the price, promo and policy-line rules and the same-day rule
  - Maestro books a workshop seat (2 seats) and a 1:1 lesson end to end, one paid in the sandbox and one at the venue

### R7 `payments`
- R7.1 `PaymentProvider` interface: `createCheckout(booking) → { url }`, `verifyWebhook(req) → PaymentEvent`, `refund(payment, amount)`. Implementations:
  - **gateway sandbox** (Open question 2)
  - **venue**: no charge
  - **fake**: CI only, auto-succeeds
- R7.2 Card payment opens the gateway's hosted checkout in an in-app browser (works in Expo Go). The webhook Edge Function verifies the gateway's HMAC, marks the payment `paid` and confirms the booking, or sets it to pending when it needs approval. The app shows the outcome after the browser returns.
- R7.3 Secrets (gateway keys, HMAC secret, service role) live only in Edge Function secrets, never in the app. Sandbox only (prompt rule).
- **AC:** Deno tests for webhook HMAC verification (good, tampered, replayed) and the provider contract. One manual sandbox payment on the iPhone goes in the phase report.

### R8 `manage`
- R8.1 Bookings (§7.11):
  - one glass capsule bar: Filter · "Bookings" · "+" (New booking → Explore); Calendar sync is Phase 2 *(D50)*, with the Upcoming | Past segment under it, as in the iOS 26 prototype's Bookings artboard *(D43)*
  - segmented "Upcoming · N | Past"
  - cards with date tile, title, time · type, venue and status pill
  - actions: upcoming shows Directions + Reschedule (T18); past shows Book again; cancelled shows Book again + Details; an approved kids booking is paid from Booking detail *(D50)*
  - an empty state per tab
  - `completed` is derived once the end time passes (§9.5)
- R8.2 Booking detail (§7.12):
  - venue header [map: Open question 8] with "Directions"
  - status pill, title, date and time, venue, payment row
  - policy banner (warning-tint) with the two §7.12 texts
  - primary Reschedule, destructive Cancel booking; Share
- R8.3 Cancel sheet:
  - outcome sentence per §9.1, reason chips
  - primary "Keep booking"; destructive "Cancel and refund N EGP" or "Cancel booking"
  - afterwards: back to Bookings with a toast
- R8.4 Refund rules (§9.1):
  - more than 24 h before the start: full refund of the amount paid
  - less than 24 h, or a same-day booking: cancelled, no refund
  - pay at venue: nothing charged, nothing refunded
  - wording after the window: `[late-cancellation policy]`; timing: `[refund timing]`. Both stay as visible placeholders.
- R8.5 Reschedule (§9.3) moves the same booking (same ref) to another open slot of the same offering, atomically. Status is recalculated. When rescheduling is allowed: Open question 6.
- **AC:**
  - SQL tests for every refund branch, with times frozen
  - Maestro cancels the paid booking more than 24 h out and sees the "Refunded" outcome, then cancels a same-day one and sees "no refund"
  - Maestro reschedules a booking

### R9 `reminders`
- R9.1 After a booking, schedule a local notification `reminder` minutes before the start, by default 120 (§9.11). The Confirmed "Remind me" sheet offers 30 min, 1 h, 2 h, the evening before [time: Open question 7], or Off. Cancelling or rescheduling reschedules or removes it.
- R9.2 Notification permission is asked at the first booking, not at launch.
- **AC:** Unit tests for the reminder-time maths, with Cairo time and DST-safe timestamps.

### R10 `e2e`
- R10.1 Maestro flows in CI on an Android emulator against a debug build and local Supabase:
  1. onboarding (Categories → Interests → Levels → Who & where)
  2. sign up and verify, landing on Home with the picks saved *(D34)*
  3. tray switch
  4. book workshop seats
  5. book 1:1
  6. pay (fake provider)
  7. see both in Bookings
  8. cancel with refund
  9. cancel without refund
- R10.2 The concurrency test (R1 AC) runs in the Supabase CI job.
- **AC:** Both CI jobs are green on the Phase 1 pull request.

## Phase 1 "done when" (prompt)
1. A new user on the iPhone (Expo Go):
   - picks categories and hobbies, then signs up *(D34, D35)*
   - switches categories in the tray
   - books a workshop seat and a 1:1 lesson, paying in the sandbox
   - sees both in Bookings
   - cancels one with the right refund outcome
2. Maestro covers each of those steps (in CI, Android).
3. Two simultaneous bookings for the last seat give exactly one success.

## Out of scope in Phase 1 (hidden, not shown disabled)
- **Phase 2:** chat and Message buttons, ratings, favourites, map view, recurring weekly bookings, calendar export
- **Phase 3:** the instructor app, Become an instructor
- **Phase 4:** InstaPay, Fawry, Vodafone Cash; Members' Circle (`[OPEN]`)
- **Later:** Payments & receipts and Notifications screens, Edit profile, Apple/Google sign-in, Email receipt, Report a problem, search dictation (D25)

## Resolved (owner, 17 Oct 2026) — these override the text above
1. **Pictures:** neutral placeholders until the owner provides images. The schema keeps `photo_path` / `banner_path`, so real images drop in without code changes.
2. **Payments:** a **demo provider** works end to end on the device now: an in-app demo checkout with Pay or Fail. **Paymob** is built behind the same `PaymentProvider` interface and switched on by secrets plus `PAYMENT_PROVIDER=paymob`, with no app release needed. Phase 1 methods: card (demo, then Paymob test) and pay at the venue.
3. **Unpaid card hold:** 5 minutes.
4. **Kids bookings:** `pending` with seats held, no charge. Once confirmed: a card booking becomes `payment_due`, payable from Booking detail within **24 h of confirmation or by the start time, whichever is first**, after which the seat is released; a venue booking becomes `confirmed`. In Phase 1 ops confirm with `approve_booking(ref)` / `decline_booking(ref)` in Studio. A push to the parent needs remote push (development build), so Phase 1 shows it in Bookings and on Booking detail.
5. **Refunds:** cancelling more than 24 h before the start refunds the amount paid automatically through the provider. Inside 24 h, or for same-day bookings: no refund.
6. **Reschedule:** allowed until 24 h before the start.
7. **"The evening before":** 20:00 Cairo time, the day before.
8. **Booking detail:** a real map header: a still Google map picture (Maps Static API, owner's key), the live `react-native-maps` map until the key is set; Directions open Google Maps *(D52)*.
9. **"Use my location":** included (`expo-location`). Distance uses the device location when granted, otherwise the chosen area's centre.
10. **Tab bar:** Apple's native tabs on iOS (`NativeTabs`, `minimizeBehavior="onScrollDown"`, Messages badge). Android keeps the Phase 0 frosted `TabBar` (locked architecture). Known limit: in Arabic under JS-level RTL (D26) the native tab order doesn't mirror inside Expo Go.
11. **Greetings:** morning 05:00–11:59, afternoon 12:00–16:59, evening 17:00–04:59 (Cairo time).
12. **Dependencies** in design.md §5: all approved, including maps and location.
13. **Still needs the owner:** G1 GitHub push, G2 Supabase keys. Without Docker on this Mac, database tests run only against the hosted dev project or in CI, so both gate items block the `data` tasks' verification.
