# Phase 2 — Technical design

Status: **DRAFT 6 Nov 2026, waiting for approval.** Follows the owner's answers to Q1–Q4 (D67): instructor sign-in for chat, series paid up front, no photos, text-only chat. The schema below locks on approval (working agreement: schema changes after approval need the owner).

## 1. Shape of the app (new and changed only)

```
apps/mobile/src/
  app/
    (tabs)/messages.tsx        thread list (replaces the empty-state-only screen)
    chat/[threadId].tsx        Chat
    chat/new.tsx               ?instructor= → start_thread → replace with chat/[id]
    rate/[ref].tsx             Rate sheet
    favourites.tsx             Profile → Favourites
    credit.tsx                 Profile → App credit
    (tabs)/explore.tsx         + List | Map switch; map body in ui/ExploreMap.tsx
  data/
    chat.ts                    threads, messages, send, mark read, realtime hooks
    ratings.ts  favourites.ts  credit.ts  calendar.ts
    rules.ts                   + series weeks, series cancel sum, map grouping/region filter, chat context line
  ui/
    ChatBubble.tsx  Composer.tsx  TypingDots.tsx  StarRating.tsx  HeartButton.tsx  MapPin.tsx
supabase/
  migrations/2026111xxxxxxx_engagement.sql      tables, RLS, functions below
  tests/                                        05_chat, 06_ratings, 07_favourites, 08_series
  functions/create-checkout, payment-webhook    series-aware (§5)
scripts/realtime-test.mjs                        two-client Realtime check, CI supabase job
```

- **Journey gate** *(D67)*: a signed-in user whose id is an instructor's `user_id` skips onboarding and gets a tab bar with Messages only; Chat's header shows the learner's first name. Everything else is unchanged for learners.
- Server state stays in TanStack Query. Realtime events update the query cache (`setQueryData`) instead of refetching.
- One Realtime channel per open chat (`thread:<id>`: postgres inserts on `messages` for that thread, plus broadcast `typing`), and one app-wide subscription to `messages` inserts and `thread_reads` updates that RLS already narrows to my threads (tab badge, list, toast).

## 2. Schema additions (all with RLS in the same migration)

| Table / change | Key columns | RLS |
|---|---|---|
| `instructors.user_id` *(Q1)* | `uuid null unique references auth.users` | unchanged (public read where verified); the column itself is not selected by the app |
| `threads` | `id`, `learner_id`, `instructor_id`, `created_at`, `last_message_at`; unique (`learner_id`, `instructor_id`) | members read; no direct insert (`start_thread`) |
| `messages` | `id`, `thread_id`, `sender_id`, `body` (1–2,000 characters), `created_at`. Media columns come with media (D67) | members read; insert only as yourself into your thread; no update or delete |
| `thread_reads` | `thread_id`, `user_id`, `last_read_at`; pk both | members read (the other side's marker = read receipts); write your own row only |
| `reviews` | `booking_id` pk, `user_id`, `instructor_id`, `stars` 1–5, `body`, `created_at` | author and that instructor read; no direct writes (`rate_booking`) |
| `favourites` | `user_id`, `instructor_id`, `created_at`; pk both | self all |
| `bookings.series_id` | `uuid null`, indexed | unchanged (self read, no direct writes) |

- **Unread count** = messages in the thread not sent by me, after my `last_read_at`. **Delivered** = the row exists; **Read** = the other side's `last_read_at` ≥ my message's `created_at`. No per-message read flag.
- **View `my_threads`** (`security_invoker`): thread, the other party's name (instructor `display_name`, or learner `first_name`), `reply_label`, last message preview, unread count, next/last booking between the two for the context line.
- A trigger keeps `threads.last_message_at`.

## 3. Functions (`security definer`, `auth.uid()` checked)

```sql
start_thread(instructor uuid) returns uuid           -- get-or-create for (me, instructor); instructor must be verified
rate_booking(ref text, stars int, body text) returns reviews
  -- mine (or my child's), confirmed and ended, not rated yet; 1 ≤ stars ≤ 5
  -- instructors: rating_count += 1; rating_avg = round((avg × count + stars) / (count + 1), 1), row locked
book_series(slot uuid, weeks int, method text, promo text, note text) returns setof bookings
  -- 2 ≤ weeks ≤ 8; type private or group; slots = this slot + the same offering's slots exactly 7·k days later
  -- lock all slots `for update` in starts_at order (no deadlocks), then the existing book() checks for each
  -- any failure raises with the failing week's date → the whole transaction rolls back
  -- each booking: own ref, same series_id, own refundable_until / same_day; promo on each
cancel_booking(ref, reason, every_week boolean default false)
  -- every_week: this booking and the series' later non-cancelled bookings, each through the existing refund branch (D64)
```

`book()`'s body moves into an internal `_book_one(…)` that both `book` and `book_series` call, so the rules stay in one place (Phase 1 tests keep passing unchanged).

## 4. Chat client
- **Send:** insert the row with a client-made `id` (idempotent retry); show it at once from the cache; on error mark it "Not sent · Retry".
- **Typing:** broadcast `typing` at most every 2 s while the field changes; the dots hide 4 s after the last event.
- **Mark read:** upsert `thread_reads` when the chat opens and when a message arrives while it is open.

## 5. Payments for a series *(Q2)*
- `create-checkout` accepts a series: it loads every `awaiting_payment` booking with that `series_id` for the caller and charges their total (after credit, per D64) in one checkout. The `payments` row points at the series' first booking and stores `series_id`.
- `payment-webhook` / `demo-pay`: paid → every booking in the series confirmed; failed → every hold released. Same idempotency as Phase 1.
- Credit spends are recorded per booking (each week's share), so a cancelled week returns its own share to the grants it came from (D64 rule 4 unchanged).

## 6. Map
- `react-native-maps` (installed): Apple on iOS, Google on Android; no key in Expo Go. `showsUserLocation` only when location is already granted (D37: Explore never prompts).
- Pure functions in `rules.ts`: `groupByVenue(results)` → pins with the lowest price; `inRegion(results, region)` for "Search this area". Tested.
- Pins are custom markers (`MapPin`, tokens only); tracksViewChanges off after first render (performance).

## 7. Calendar
- `expo-calendar`'s `createEventInCalendarAsync` opens the system add-event sheet; no full calendar permission is needed for it. Times are the booking's UTC instants; the notes hold the ref and venue address.

## 8. Dependencies — **need your approval** (runs in Expo Go, SDK 57 version via `npx expo install`)

| Package | Why |
|---|---|
| `expo-calendar` | Add to calendar (R6) |

No other new packages. Realtime comes with `@supabase/supabase-js`.

## 9. Testing and CI

| Level | Tool | What |
|---|---|---|
| Rules | Jest | series weeks and sums, map grouping and region filter, chat context line, unread maths |
| Screens | Jest + RNTL | Messages, Chat (bubbles, composer, retry), Rate sheet, Favourites, Map toggle, Repeat weekly, Cancel every week, Credit list, Add to calendar event |
| Database | pgTAP | RLS for threads, messages, reads, reviews and favourites; `rate_booking`, `book_series`, cancel every week, with frozen time |
| Concurrency | Node script | 20 parallel `book_series` over shared weeks → no oversold slot |
| Realtime | Node script (`scripts/realtime-test.mjs`) | two signed-in clients: message, typing, read receipt arrive |
| Edge Functions | `deno test` | series checkout: paid confirms all, failed releases all, replay is a no-op |
| End to end | Maestro, CI | R8.1 |

## 10. Boundaries
- **Always:** RLS on every new table; money only in SQL and Edge Functions; tokens only; every new string added to `docs/translations/ar-app-strings.md`; accessibility labels and 44 pt targets (chat bubbles announce sender, time and status).
- **Ask first:** schema changes after approval; any dependency beyond §8; anything that touches money beyond §5; pushing migrations to the hosted project if they change existing data.
- **Never:** the service-role key in the app; showing a learner's phone number in chat.
