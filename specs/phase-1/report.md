# Phase 1 report

Status: **closed by the owner on 6 Nov 2026** ("start phase 2", D66). The gate questions below (side-by-sides, the pull request into `main`, carry-overs) are answered while writing the Phase 2 spec.

## What was built
The learner app for the hobbies-first booking loop, on the hosted Supabase project (`rcbpasqkzmseisujmxgt`):
- **Sign-up:** onboarding before sign-up (Categories → Interests → Levels → Who & where), then name, phone and code (D34, D35).
- **Home** for all four categories, switched from the category tray. It uses the "Departures board" look you picked (D58).
- **Explore:** Lessons | Groups lists with search, a Filters sheet and a Sort sheet.
- **Instructor profile, Workshop and Group pages:** a month calendar and a seat stepper.
- **Book:** 1:1, group and kids (Adults | Kids).
- **Review & pay:** card through the demo provider, pay at the venue, promo codes, and app credit (on by default, the learner can turn it off).
- **Confirmed:** with a "Remind me" sheet.
- **Bookings:** time first, with a filter and a month view; Booking detail.
- **Cancel and Reschedule:**
  - Cancelling more than 24 hours ahead refunds as app credit that never expires (D64).
  - Cancelling within 24 hours refunds nothing.
- **Profile:** Family & kids, Interests and levels, Language, Appearance, App credit, Sign out.
- **Reminders:** local notifications.
- **Backend:**
  - Every table has Row Level Security.
  - Booking, holds, seats, cancelling, rescheduling and credit all run as atomic Postgres functions. The app does no money maths.
  - Edge Functions handle checkout, the payment webhook and the demo payment.
  - Paymob is ready to switch on through secrets alone (D29, D46).

Decisions D28–D64 are in `docs/DECISIONS.md`. The ones that changed the plan the most:
- **D34, D35:** onboarding comes first.
- **D47:** native iOS tabs.
- **D54–D59:** your 33-note revision and the new look.
- **D63:** Arabic moved to the last phase.
- **D64:** refunds became app credit.

## How to run and demo it
```
npm ci && npm run check                    # lint, typecheck, 166 app tests, 6 token tests, token freshness
cd apps/mobile && npx expo start --clear   # then open the project in Expo Go on the iPhone
```
Sign in with **+20 100 234 5678**, code **482917**. It's a Supabase test number, so no SMS is sent. New learners can also tap **Get started** and onboard. A new phone number is also a test-only path: it only works with numbers set up in Supabase.

Tap path for the "done when" journey:
1. **Welcome → Get started:** pick Hobbies → Pottery → a level → who & where → name and phone → code. You land on Home.
2. **Home → category chip** at the top: switch to Sports and Home changes; switch back.
3. **Explore → Groups → Wheel-throwing taster:** choose a date → 2 seats → Reserve → **Pay** (demo card) → "You're in."
4. **Home → an instructor (Dina Samir) → a time → Continue → Pay** → "You're in."
5. **Bookings:** both are there.
6. **Cancel:**
   - Open the workshop → Cancel booking: "1,300 EGP back as app credit".
   - Open a lesson starting within 24 h → Cancel booking: no refund.
7. **Profile:** App credit shows the refund.

## Test results (CI on the final commit, all four jobs green)
- **checks:** lint, typecheck, 166 Jest + RNTL tests across 27 suites, 6 token tests.
- **supabase:** 56 pgTAP tests. They cover:
  - booking rules and every refund branch with frozen time (31)
  - seed times (2)
  - the Groups view (3)
  - app credit (20)

  The **concurrency test** sends 20 simultaneous bookings for the last seat, and exactly 1 succeeds.
- **edge-functions:** 8 Deno tests:
  - Paymob signatures: a tampered amount, a wrong secret or a missing signature is rejected
  - payment outcomes
  - provider choice: demo and fake are refused in production
- **e2e:** the whole journey above runs in Maestro on an Android emulator, against a debug build and local Supabase, with every step from R10.1 plus the credit on Profile.
- **On your iPhone 16 Pro:** you checked both themes from screenshots (D63). The four fixes from that check are in.

## Not done, or done differently
- **Canvas side-by-sides (R5 AC):** not made.
  - **Why:** the canvas artboards show the original look. You replaced it with "Departures board" (D55, D58), so a side-by-side would mostly show intended differences.
  - **What exists instead:** your iPhone screenshots (D63) are the visual check.
  - **If you still want them:** I can add screenshot steps to the e2e journey and set them beside your chosen look (the D58 proposal) instead of the old canvas.
- **Arabic (T21):** moved to the last phase (D63). All 471 strings have Egyptian Arabic drafts in `docs/translations/ar-app-strings.md`.
- **Phase 1 pull request into `main`:** not opened yet (G1, R10 AC). CI is green on `phase-1`, so it can be opened whenever you want.
- **Testing aids removed (D43):** the prototype illustrations are gone, so cards and profiles show neutral placeholders until real photos arrive. The resend-code timer is back to 60 s.

## [OPEN] items hit
- **Photos:** no instructor or workshop photos yet; placeholders until they arrive (D29).
- **Members' Circle:** terms still [OPEN]; hidden in Phase 1 (D31).
- **Google Maps API key** for in-app maps (D52). Directions already open Google Maps without a key.
- **Paymob live keys:** payments stay on the demo provider until you approve going live.
- **Credit history:** Profile shows the balance only; there is no list of credits yet.
- **Credit sources:** only refunds create credit for now. Goodwill and promo credit, which expire after 6 months, can only be granted by ops in Supabase.

## Risks
1. **No Apple Developer membership:**
   - no remote push, so reminders are local only
   - no Apple Pay
   - no native RTL
   - no TestFlight build
2. **Android has only been tested on the CI emulator.** It already caught one real bug: the cancel sheet hid its own button. Real Android phones haven't been tried.
3. **The hosted project is on the free tier.** Supabase paused it once for inactivity (D60). Demo times also run out; `refresh_demo_slots.sql` refills them.
4. **The e2e job is slow and sensitive.** It takes about 15 minutes on a software-GPU emulator, and the keyboard crashed it once (worked around in the flow).

## Proposed Phase 2 spec outline (Engagement)
From the working agreement, plus what Phase 1 left over:
- **R1 Chat:**
  - Supabase Realtime: text, image and video, voice notes.
  - Unread counts, typing indicator, read receipts.
  - The Messages tab and the "Message" buttons that Phase 1 hid.
  - RLS: only the learner and the instructor in a conversation can read it.
- **R2 Ratings:** after a past session, on Booking detail and the instructor profile.
- **R3 Favourites:** a heart on cards and profiles, plus a Favourites list.
- **R4 Explore map view:** needs the Google Maps key (D52).
- **R5 Recurring weekly bookings:** book the same slot for N weeks, each one atomic, using the existing rules.
- **R6 Calendar export:** the "Add to calendar" button Phase 1 hid.
- **Carry-overs to decide at the gate:**
  - a credit history list
  - real photos (instructor upload or ops)
  - the Phase 1 pull request
  - whether chat media needs Storage limits or moderation
