# Manual end-to-end test on your phone

The same journey CI runs on the Android emulator (`apps/mobile/e2e/phase1.yaml`, then `phase2.yaml`), by hand on your iPhone in Expo Go, against the hosted project. About 25 minutes. Tick each line as you go; anything that doesn't match, screenshot it.

## Before you start

1. **Start the app on the Mac** (in Terminal, from the project folder):
   ```
   cd ~/Desktop/Coaching\ app/apps/mobile
   npx expo start --clear
   ```
   Scan the QR code with the iPhone camera; it opens in Expo Go. The phone and the Mac need to be on the same Wi-Fi.
2. **Test sign-ins** (no SMS is sent; code **111111** for all three, valid until 29 Nov 2026):
   - Omar (learner): **+20 100 234 5678**
   - Nour El-Sayed (padel instructor, for chat): **+20 100 234 5680**
   - Yasmine Fathy (pottery instructor): **+20 100 234 5679**
3. **For the live chat test** you need a second phone signed in as Nour (your partner's), or sign in as Nour on the same phone afterwards to reply.
4. If Home or Explore shows no times, the demo times have run out: tell Claude to run `supabase/scripts/refresh_demo_slots.sql` on the hosted project.
5. If you were signed in before: Profile → Sign out first, so onboarding shows.

## Part 1: the booking loop (Phase 1)

1. **Onboarding:** Welcome → **Get started** → Hobbies → Continue → Pottery → **Continue · 1 picked** → Beginner → Continue → Me → Heliopolis → **Show my picks**.
2. **Sign in:** first name Omar → phone **1002345678** → Send code → **111111**. You land on Home ("Good morning/afternoon/evening, Omar").
3. **Category tray:** tap the category chip at the top → Sports: Home changes. Switch back to Hobbies.
4. **Book a workshop by card:** Explore → **Groups** → Wheel-throwing taster → pick a date with a gold dot → a time → **2 seats** → Reserve → Review & pay → **Pay … EGP** (demo card) → allow notifications if asked → "You're in."
   - Confirmed shows When, Where, Paid; **Directions** opens Maps; **Share** opens the share sheet.
   - **Add to calendar** (new): Apple's New Event sheet opens with "Wheel-throwing taster", the time, the venue and "Booking CFA-… · Coach For All" in the notes. Tap Add, then check the Calendar app.
   - **Remind me** opens the reminder sheet.
   - **Back to Home** returns to Home with the tab bar.
5. **Book a 1:1:** Home → an instructor (e.g. Dina Samir) → a **Next available** chip (now "Tomorrow 09:00 · 1:1 on the oud"-style) → Continue → Pay → "You're in."
6. **Bookings:** both bookings are under Upcoming. Try the filter button and the **Calendar** segment (dots on booked days).
7. **Cancel with credit:** open the workshop (more than 24 h away) → Cancel booking → the sheet says you get it back as app credit → confirm → toast "Booking cancelled · … added to your credit".
8. **Cancel without credit:** if you have a booking starting within 24 h, Cancel booking → "Less than 24 hours to go" → confirm → no credit.
9. **Reschedule:** on another upcoming booking more than 24 h away → Booking detail → Reschedule → pick a new time → Move booking.
10. **Profile → App credit:** the balance matches; tap it → the credit history lists the refund (new in Phase 2).

## Part 2: what Phase 2 added

11. **Favourites:** Home chip → Sports → Explore → **Lessons** → tap the heart on Nour El-Sayed's card (fills in). Open her profile: the heart on top is filled. Profile → **Favourites** lists her. Tap the heart again there to remove her, then add her back.
12. **Instructor profile calendar (new):** on Nour's profile, under Next available, a month calendar: days with times have a gold dot; tap a day → its times show as chips ("10:00 · Private 1:1"); tap one → Book opens at that time. Back.
13. **Chat:** on Nour's profile → **Message** → type "Is the court indoors?" → send. It shows with a tick.
    - On the second phone (signed in as Nour): the **Messages** tab has a badge, and a notification shows if the app is open on another screen (local notifications only, so nothing arrives while the app is closed, D74); open the chat → "Read" appears on Omar's side; start typing → Omar sees the typing dots; reply → it arrives on Omar's phone within a second.
    - **Swipe to reply:** swipe a message to the right → "Replying to …" bar → send → the quote shows above your message; tap the quote → it scrolls to the original.
    - Messages tab: search for "Nour" finds the conversation.
14. **Weekly series:** Nour's profile → a **Private 1:1** time chip → on Book turn on **Repeat weekly** → the stepper shows 2 weeks ("2 weeks · date – date"); try + and − → Continue → Review & pay shows "2 weeks × 650 EGP" → Pay (or **Confirm booking** if your credit covers it) → "You're on the court."
    - Bookings: each week is its own card with "repeats weekly".
15. **Cancel every week:** open the first week → Cancel booking → turn on **Cancel every week** → the amount adds up all the weeks more than 24 h out → confirm → all weeks leave Upcoming; Profile → App credit shows the credit back.
16. **Rate:** you need a past session; if Bookings → **Past** has a finished one, tap **Rate session** → pick 5 stars → optional text → **Send rating** → the card says "Rated 5★" and can't be changed. (If none is finished yet, skip; CI covers it.)
17. **Map (iPhone only):** Explore → the round **pin button** bottom-right → map with price pins → tap a pin → the card at the bottom; ‹ › arrows move between results; drag the map → **Search this area**; recenter button; the list button goes back.
18. **Filters:** Explore → filter button → **Max price**: the slider sits on its own line under the price and drags smoothly; Reset.
19. **Profile → Interests and levels:** change a level → **Save changes** sits at the bottom with no big empty space under it.
20. **Instructor side:** sign out → sign in as Nour (**1002345680**, 111111): only **Messages** and **Profile** tabs; the conversation with Omar is there.

## Dark mode and small things

21. Profile → Appearance → Dark: repeat a few screens above (Home, Explore, Chat, a sheet).
22. Put the app in the background while Nour sends a message, then reopen it: the chat catches up.

## What CI checks automatically

Every push runs the Android version of Parts 1 and 2 (except the map, chat with a real second phone, and calendar, which need a real device) and records the screen: GitHub → Actions → the run → Artifacts → **e2e-recording**.
