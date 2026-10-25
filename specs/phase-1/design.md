# Phase 1 — Technical design

Status: **APPROVED 17 Oct 2026**; revised 18 Oct 2026 for D33–D35 (routes, journey gate, onboarding state); the "Resolved" answers in requirements.md override this text where they differ (statuses, hold time, providers, tabs). The schema (§2) is locked once you approve this spec; changing it after that needs your sign-off (prompt rule).

## 1. Shape of the app

```
apps/mobile/src/
  app/                         Expo Router routes
    _layout.tsx                providers: QueryClient, settings hydration, journey gate (below), theme, direction
    (auth)/welcome.tsx  sign-up.tsx  verify.tsx
    (onboarding)/categories.tsx  interests.tsx  levels.tsx  who-where.tsx   (open to everyone, D34)
    (tabs)/_layout.tsx         NativeTabs on iOS (D47); Tabs + the Phase 0 TabBar on Android (D43); minimising on scroll
    (tabs)/index.tsx  explore.tsx  bookings.tsx  messages.tsx  profile.tsx
    instructor/[id].tsx  workshop/[id].tsx  book/[offeringId].tsx  review.tsx
    confirmed/[ref].tsx  booking/[ref].tsx  family.tsx
    sheets: filters, sort, cancel/[ref], family-member, language, appearance, sign-out, remind/[ref]
    (dev)/gallery.tsx          Phase 0 gallery, dev only
  data/                        supabase client, TanStack Query hooks per table/function, pure rules
  features/<module>/           screen bodies, one folder per module from requirements.md
  ui/  theme/  i18n/           Phase 0, unchanged contracts
supabase/
  migrations/                  one migration per module (data, then payments)
  seed.sql                     handoff §14 + 14 days of generated slots
  tests/                       pgTAP: RLS, book/cancel/reschedule rules
  functions/_shared/payments/  PaymentProvider + paymob, venue, fake
  functions/create-checkout/   functions/payment-webhook/   functions/refund/
```

- **Journey gate** *(D34)*: signed out → `(auth)` (Welcome); signed in and onboarded → `(tabs)`; signed in, not onboarded → `(onboarding)`. `(onboarding)` is unguarded and listed after `(tabs)`, so new learners reach it from Welcome before sign-up, and Profile reopens it. Right after Verify, `useApplyDraftAfterSignUp` writes answers kept from a signed-out run (`interests` upsert, `profiles` update with `onboarded_at`) and the gate renders nothing until it finishes.
- **Onboarding draft** (Zustand, `useOnboardingDraft`): categories, picks, levels, the saved levels (so Profile edits only rewrite what changed), and step-3 answers when finished signed out. In memory only (`shortcut:` comment): killing the app before Verify loses it.
- **Server state:** TanStack Query only. **Client state:** Zustand only (theme, language, category, plus the Book screen's draft selection).
- **Pure rules** (price, promo, refund outcome, policy line, availability, reminder time) live in `data/rules.ts`. The same rules are enforced in SQL. Both sides are tested against the same table of cases.

## 2. Schema (Postgres, all `timestamptz` in UTC, shown in Cairo time)

| Table | Key columns | RLS |
|---|---|---|
| `profiles` | `id` = `auth.users.id`, `first_name`, `area`, `lang`, `theme`, `who_for` (me/child/both), `instructor_pref` (none/female/male), `created_at` | self read/update |
| `family_members` | `id`, `user_id`, `first_name`, `age` check 6–14 | self all |
| `categories` | `id` (hobbies/sports/education/languages), `sort` | public read |
| `disciplines` | `id`, `category_id`, `name_en`, `name_ar` null, `icon`, `code` (EN, FR… for languages), `sort` | public read |
| `interests` | `user_id`, `discipline_id`, `level` (beginner…pro, null = skipped), `level_source` (self/instructor), `set_at` | self all |
| `areas` | `id`, `name_en`, `name_ar`, `lat`, `lng` (centroid used for distance) | public read |
| `venues` | `id`, `name`, `area_id`, `lat`, `lng`, `notes` | public read |
| `instructors` | `id`, `display_name`, `bio`, `gender`, `years`, `certification`, `rating_avg`, `rating_count`, `reply_label`, `photo_path`, `verified` | public read where verified |
| `instructor_disciplines` | `instructor_id`, `discipline_id`, `levels` text | public read |
| `offerings` | `id`, `instructor_id`, `discipline_id`, `venue_id`, `type` (private/group/kids/workshop), `title`, `description`, `duration_min`, `price_egp`, `capacity`, `min_age`, `max_age`, `included`, `take_home`, `what_to_bring`, `needs_approval`, `published` | public read where published |
| `slots` | `id`, `offering_id`, `starts_at`, `ends_at`, `capacity`, `seats_taken`, **check `0 ≤ seats_taken ≤ capacity`** | public read |
| `promo_codes` | `code`, `percent_off`, `active`, `valid_until` | no direct read (`apply_promo` only) |
| `bookings` | `id`, `ref` unique, `user_id`, `slot_id`, `family_member_id`, `seats`, `status` (awaiting_payment/pending/payment_due/confirmed/cancelled), `approved_at`, `pay_by`, `method` (card/venue), `subtotal_egp`, `discount_egp`, `total_egp`, `promo_code`, `note`, `hold_expires_at`, `refundable_until`, `same_day`, `reminder_min` default 120, `created_at`, `cancelled_at`, `cancel_reason`, `refund_egp` | self read; **no direct writes** |
| `payments` | `id`, `booking_id`, `provider`, `provider_ref`, `amount_egp`, `status` (initiated/paid/failed/refunded), `raw` jsonb, `created_at` | self read through the booking; writes from the service role only |
| `refunds` | `id`, `payment_id`, `amount_egp`, `status`, `provider_ref`, `created_at` | self read; service role writes |

- **Status:** `completed` (§9.5) is derived, not stored: a view `my_bookings` shows `completed` once a confirmed booking has ended. `awaiting_payment` is internal and never shown. It is a seat hold.
- **Availability rules:** Phase 1 has no `availability_rules` table, since ops seed slots directly. Rules arrive with the instructor app (Phase 3).

## 3. Atomic functions (`security definer`, `auth.uid()` checked, one transaction each)

```sql
book(slot uuid, seats int, child uuid, method text, promo text, note text) returns bookings
  -- 1. free expired holds on this slot (lazy release: no cron)
  -- 2. select … from slots where id = slot for update      -- serialises concurrent bookings
  -- 3. reject: past / today < now()+60 min / seats > free / workshop > 3 / private ≠ 1 / kids without a 6–14 child
  -- 4. price = offering.price × seats; promo % off subtotal (rounded to whole EGP)
  -- 5. insert booking: venue → confirmed (pending if needs_approval or kids);
  --    card → awaiting_payment, hold_expires_at = now() + 5 min; kids/needs_approval → pending (seats held, no charge)
  -- 6. seats_taken += seats;  refundable_until = starts_at − 24 h;  same_day = booked on the start date (Cairo)
cancel_booking(ref text, reason text) returns { refund_egp }
  -- lock booking + slot; refund = paid ∧ now() < refundable_until ∧ ¬same_day ? amount paid : 0
  -- status cancelled, seats freed; a refund row is queued for the refund Edge Function (OQ5)
reschedule_booking(ref text, new_slot uuid) returns bookings
  -- lock both slots in id order (no deadlock); same offering; new slot passes book()'s checks
  -- allowed only while now() < starts_at − 24 h; move seats, keep ref and payment, recompute refundable_until / same_day
apply_promo(code text, subtotal int) returns { percent_off, discount_egp } | error 'invalid'
approve_booking(ref text) / decline_booking(ref text)          -- ops only (service role, Studio)
  -- approve: card → payment_due, pay_by = least(now() + 24 h, starts_at); venue → confirmed
  -- decline: cancelled, seats freed, nothing charged
release_expired_holds()                                         -- pg_cron every minute + lazily inside book()
  -- awaiting_payment past hold_expires_at, payment_due past pay_by → cancelled, seats freed
```

- **Ref:** `'CFA-' || lpad(floor(random()*1e5)::text, 5, '0')`, retried if it collides.
- **Concurrency test:** a Node script in CI calls `book` on a 1-seat slot through 20 parallel REST calls, as 20 seeded users. It asserts exactly 1 row and 19 `no_seats` errors.

## 4. Auth

- Supabase phone OTP via `@supabase/supabase-js`, with the session kept in AsyncStorage (Supabase's documented Expo pattern).
  - shortcut: tokens are unencrypted on the device; Phase 5 hardening moves them to SecureStore with encryption.
- Test number `+201002345678` → `482917`, in `config.toml` (local and CI) and in the hosted project's "test phone numbers".
- **Risk:** the hosted project may refuse phone sign-in until an SMS provider is configured, even for test numbers. If so, I'll stop and ask before picking one (cost).
- A trigger on `auth.users` insert creates the `profiles` row.

## 5. Dependencies

Already approved and installed: Expo SDK 57 set, Zustand, i18next. Approved, now to install: `@tanstack/react-query`.

**Need your approval** (all run in Expo Go):

| Package | Why |
|---|---|
| `@supabase/supabase-js` | Locked backend's client |
| `@react-native-async-storage/async-storage` | Persist settings (R3.2) and the auth session |
| `expo-web-browser` | Hosted gateway checkout (R7.2); Terms/Privacy links |
| `expo-notifications` | Local booking reminders (R9) |
| `@react-native-community/slider` | Filters max-price slider (R5.3) |
| `react-native-maps` | Booking detail map header (approved) |
| `expo-location` | "Use my location" and distances (approved) |

Edge Functions use Deno's standard library only. pgTAP is built into the Supabase CLI.

## 6. Payments (`supabase/functions`)

```ts
interface PaymentProvider {
  createCheckout(b: { ref: string; amountEgp: number; phone: string; returnUrl: string }): Promise<{ url: string; providerRef: string }>;
  verifyWebhook(req: Request): Promise<{ providerRef: string; status: 'paid' | 'failed' }>; // throws on bad HMAC
  refund(p: { providerRef: string; amountEgp: number }): Promise<{ providerRef: string }>;
}
```

- **create-checkout** (signed-in user): loads the caller's `awaiting_payment` booking, calls `provider.createCheckout`, inserts a `payments` row as `initiated`, and returns the URL. The app opens it with `WebBrowser.openAuthSessionAsync(url, Linking.createURL('payment-return'))`, then refetches the booking.
- **payment-webhook** (public, HMAC-verified): marks `paid` or `failed` idempotently on `provider_ref`. When paid, the booking becomes confirmed, or pending if it needs approval. When failed, the hold is released.
- **refund** (service): sends queued refunds through `provider.refund` and records the outcome.
- **Provider choice:** `PAYMENT_PROVIDER` = `demo` (default now) | `paymob` | `fake` (CI). `demo` and `fake` are refused whenever `ENV=production`.
- **`demo` provider:** `createCheckout` returns an in-app URL (`coachforall://demo-checkout?ref=…`) instead of a web page. The app opens it as a route showing "Demo payment · Pay N EGP / Fail". The buttons call the `demo-pay` function, which records the outcome through the same code path the real webhook uses. When the URL is `https`, the app opens it in the in-app browser instead, so switching to Paymob needs no app change.
- **Paymob details to verify at task start:** Intention API, hosted (unified) checkout URL, HMAC fields, refund endpoint, sandbox test cards. I've only confirmed the Intention flow so far.

## 7. Screens: canvas fidelity

- Each screen is built from its canvas artboard (D23): **Main / HomeSports / HomeEducation / HomeLanguages / HomeTray, Interests, Explore, Instructor, Workshop**. The handoff wins where they conflict, and every deviation is logged.
- Screens with no artboard (Welcome, Sign up, Verify, Levels, Who & where, Book, Review & pay, Confirmed, Bookings, Booking detail, Profile, Family) follow the handoff §7 text, the design-system READMEs and the Phase 0 primitives.
- **New shared pieces** (small, inside `ui/`): EmptyState (§5), Stepper (workshop seats), Hero (image + scrim + content sheet overlapping by 28), ConfirmationRing (§5, §8), OtpBoxes, LevelGlyph (4 bars), InterestTile (92 high), DashedCard (Add a family member), SheetHeader (sheets' close · title).
- **NavigationBar** *(D33, D43)*: floating glass back circle + one trailing glass cluster (icon or text actions), with an optional inline title + subtitle; Bookings (T17) adds the one-capsule `.navglass` variant from the prototype.
- **Selection lens** *(D49)*: `ui/GlassLens.tsx` (`useGlassLens` + `GlassLens`) drives the sliding selection of SegmentedControl and the floating TabBar the iOS 26 way: swell on touch, follow a drag with stretch, spring onto the segment let go on; springs are `motion.lens*` tokens; Reduce Motion drops swell and stretch.
- **Component library** *(D43)*: every visible element is an instance of a `ui/` component, and the dev Gallery (`/gallery`) shows each one in both themes and languages. Added: Avatar, IconTile, RowCard, DisciplineTile, DateButton, LevelOption, SessionRow, Banner, Section, TextField, TextLink.

- **Owner revision (D54, R11):** *Groups* is a UI grouping of the `workshop` and `group` offering types (no schema change); *Lessons* are `private` and `kids`, shown as "Adults | Kids". A `MonthCalendar` component (marked days, Cairo dates) replaces the week `DayPicker` where dates are picked and adds a month view to Bookings. Explore's category and discipline choices move into the Filters sheet. Visual direction and tokens come from Impeccable (`apps/mobile/DESIGN.md`).

## 8. Testing and CI

| Level | Tool | What |
|---|---|---|
| Rules | Jest | `data/rules.ts` table tests: price, promo, refund outcome, policy line, bookable, reminder time |
| Components and screens | Jest + RNTL | Each screen's key states, in English and Arabic |
| Database | pgTAP (`supabase test db`) | RLS isolation; `book`, `cancel_booking`, `reschedule_booking` rules; refund branches with frozen time |
| Concurrency | Node script against local Supabase | 20 parallel `book` calls on the last seat → 1 success |
| Edge Functions | `deno test` | HMAC good, tampered and replayed; idempotent webhook; fake-provider refusal in production |
| End to end | Maestro, in CI | Android emulator (ubuntu runner, KVM), `expo prebuild` + Gradle debug build, local Supabase, fake provider; flows in R10.1 |

- **iPhone:** checked by you in Expo Go against the hosted dev project, including one real sandbox card payment.
- **Not covered:** iOS is not under Maestro, since there's no simulator on this Mac.

## 9. Boundaries
- **Always:** money logic only in SQL functions or Edge Functions, never in the app; RLS on every new table; every [OPEN] value shown as a visible placeholder; every screen in light, dark, English and Arabic.
- **Ask first:** schema changes after approval; the SMS provider; any real (non-sandbox) payment key; new dependencies beyond §5.
- **Never:** the service-role or gateway secret in the app or the repo; fake payments outside CI; inventing Arabic copy for app strings (D27).
