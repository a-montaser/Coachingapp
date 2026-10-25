# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

iPhone first (iOS 26: Liquid Glass, Apple's native tab bar); Android ships the same app with its own fallbacks. Built with Expo + Expo Router (TypeScript), Supabase backend; tested in Expo Go on an iPhone 16 Pro.

## Users

Adults in Cairo booking lessons for themselves: people who want to pick up a new hobby, sport, school subject or language and need a coach or class to start. Parents booking for their children (family members) are a secondary flow, not the main one.

Their situation today: there is no directory to browse. To try something new they ask around until someone passes on an instructor's phone number, then arrange times over WhatsApp.

## Product Purpose

Coach For All is a directory and booking app for local lessons in Cairo, hobbies first, then sports, education and languages. A learner finds a nearby, trusted instructor or class, sees real open times, books and pays in the app, and manages the booking (reschedule, cancel, reminders).

It also gives people ideas: it suggests new hobbies to try, so discovery is part of the job, not only search.

Success: a learner goes from "I'd like to try pottery" to a confirmed session with a vetted instructor near them, without asking around or messaging anyone.

## Positioning

- **A real directory where none exists.** Today finding an instructor means word of mouth and a phone number; here they are listed, browsable and comparable.
- **Ideas, not just search.** The app suggests hobbies and classes to try, for people who don't yet know what they want.
- **Trusted, vetted instructors.** Verified coaches with ratings and clear cancellation and refund rules.
- **Local and nearby.** Classes in your Cairo area, sorted by distance and time.

## Operating Context

- Four categories: Hobbies (first), Sports, Education, Languages; each has disciplines (pottery, oud, padel, maths, …).
- Offering types today: private 1:1, small group, kids, and one-off workshops (with seats).
- Journey: onboarding before sign-up (categories → interests → levels → who and where), phone sign-up with a one-time code, Home, Explore (search, filters, sort), instructor profile, workshop page, book (day and time), Review & pay, Confirmed, Bookings (Upcoming / Past), Booking detail, Cancel, Reschedule, reminders, Profile, Family.
- Prices in EGP, VAT included. Payment by card (demo checkout now, Paymob later) or pay at the venue. Kids bookings are requests the instructor approves before payment.
- Rules: free cancellation until 24 h before the start; inside 24 h or same-day bookings are not refunded; reschedule until 24 h before; reminders 2 h before by default.
- Used in Cairo time (Africa/Cairo, with summer time).

## Capabilities and Constraints

- Bilingual: English and Egyptian Arabic, right-to-left applied in JavaScript. Most Arabic copy is still waiting for a translator (`docs/translations/ar-app-strings.md`); the Arabic pass (T21) is deferred by the owner.
- Expo Go only (no Apple Developer membership): no custom native modules; Google map views and remote push are not available on iPhone in Expo Go.
- Phase 1 scope excludes chat, ratings, favourites, map view, recurring bookings and calendar export (Phase 2), the instructor app (Phase 3), and other payment methods (Phase 4). The owner may pull items forward.
- Secrets never live in the app; payments stay in sandbox until the owner approves.
- Undecided: whether workshops are renamed "Groups"; whether bookmarks (favourites) come into Phase 1.

## Brand Commitments

- Name: **Coach For All**.
- Voice: plain, friendly, short; Egyptian Arabic, not formal Arabic.
- References the owner named for the app's feel: **Breadfast** and **noon** (Egyptian consumer apps). The owner finds the current app too bland and too white.
- The design handoff (`docs/DESIGN_HANDOFF.md`) and the owner's iOS 26 prototype were the starting design sources; the owner's later decisions override them (`docs/DECISIONS.md`).

## Evidence on Hand

- No real instructor photos, venue photos, testimonials, ratings or customers yet. Seed instructors and classes are sample data.
- `apps/mobile/assets/test-images/`: prototype illustrations standing in for photos during testing only; they are removed before the Phase 1 report. Do not present them as real.
- Do not invent instructors, reviews, prices or partner claims.

## Product Principles

1. **Fewest taps to a booked session.** Every extra step between "I want to try this" and "booked" needs a reason.
2. **Inspire, then decide.** Help people discover something to try before asking them to filter and compare.
3. **Trust is shown, not claimed.** Vetting, ratings, real times and clear refund rules are visible where the decision is made.
4. **Near me, in my language.** Cairo areas, Cairo time, EGP, English and Egyptian Arabic are defaults, not settings.
5. **Money is never a surprise.** The total and the cancellation outcome are clear before paying or cancelling.

## Accessibility & Inclusion

- VoiceOver labels on every control; Dynamic Type respected; touch targets at least 44 pt.
- Reduce Motion, Reduce Transparency and Increase Contrast are honoured (glass falls back to solid surfaces).
- Full right-to-left mirroring for Arabic, Arabic-Indic digits and Arabic prices.
