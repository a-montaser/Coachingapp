# Graph Report - Coaching app  (2026-11-14)

## Corpus Check
- 33 files · ~151,722 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1689 nodes · 5512 edges · 80 communities (78 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 398 edges (avg confidence: 0.86)
- Token cost: 60,000 input · 9,000 output

## Community Hubs (Navigation)
- Bookings Filter & Types
- Chat Requirements & Screens
- Accessibility & Glass Lens
- Cards & Booking Card
- Settings, i18n Keys & Shell Tests
- Interests Screen & Tests
- E2E Journey & Arabic Strings
- Gallery Screen & Theme
- Workshop Seats
- Icon · Card
- Paymob
- Decisions Log & Expo Docs Rule
- Phase 1 Requirements & Decisions
- Onboarding Screens
- Mobile Runtime Dependencies
- Gallery · Daypicker
- Explore, Instructor & Workshop Tasks
- Manual Test & Phase 3 Gate
- Payment Settlement & Reminders
- Mobile Package Manifest
- Explore, Map & Calendar Specs
- Phase 1 Design: Auth, Payments & Boundaries
- CI Jobs & Checks
- Expo App Config
- Confirmed & Checkout Tests
- Theme Tokens & Basics Tests
- Product Overview (Handoff)
- Working Agreement & Phase 1 Design
- Engagement Schema & CI Database Job
- Onboarding · Categories
- Date Formatting & Time Slots
- Phase Boundaries & Skills
- Phone Sign-up & Verify
- Root Package & Scripts
- Product Record & Agent Guides
- Home Data & Time Rules
- Home Data & Time Rules 2
- Instructor Profile Data
- Realtime
- Decisions · Requirements
- Testing Strategy & Monorepo
- Weekly Series & Phase 2 Functions
- Design Tokens Pipeline
- Project Guide & Design Sources
- Starrating · Stepper
- Brand Tokens (Purple & Gold)
- Working Agreement
- Gallery E2E & Dev Setup
- Explore Tests
- Avatar · Leveloption
- Token Generator Script
- Ratings
- Concurrency
- Gallery Sheet & Copy
- Explore · Rules
- Time Slots
- Glass Component
- Mobile TypeScript Config
- Phase 0 Report & Requirements
- Root Layout & Query Client
- Phase 1 Design Notes
- Phase2 · Helper
- Seed Instructors & Workshops
- Instructor Sign-in & Tabs
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Arabic Copy & Dev Machine
- Design Handoff
- Glass Chrome Specs (Tabs, Sheets)
- Checkout, Demo Pay & Reminders
- Favourites · Home
- Tokens Test · Generate
- Mobile npm Scripts
- Category Tray & Hand-set Tokens
- Lint Config
- Liquid Glass Materials
- Jest Config
- Product in One Page (Handoff)
- Deno Config

## God Nodes (most connected - your core abstractions)
1. `react-native` - 108 edges
2. `useTheme()` - 91 edges
3. `Decisions log (DECISIONS.md)` - 86 edges
4. `T()` - 84 edges
5. `react` - 53 edges
6. `Arabic app strings to translate` - 52 edges
7. `react-i18next` - 50 edges
8. `useLang()` - 47 edges
9. `Icon()` - 44 edges
10. `useSettings` - 43 edges

## Surprising Connections (you probably didn't know these)
- `Floating map/list IconButton on Explore (D68)` --references--> `Explore()`  [INFERRED]
  specs/phase-2/design.md → apps/mobile/src/app/(tabs)/explore.tsx
- `R4.1 Floating round glass map button (D68)` --references--> `Explore()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/(tabs)/explore.tsx
- `BookingDetail()` --implements--> `D71: T4 Messages and Chat (text) choices`  [INFERRED]
  apps/mobile/src/app/booking/[ref].tsx → docs/DECISIONS.md
- `R1.9 Message entry points Phase 1 hid` --references--> `BookingDetail()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/booking/[ref].tsx
- `R6 calendar (Add to calendar)` --references--> `Confirmed()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/confirmed/[ref].tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Chat RLS model (membership, own markers, server time)** — supabase_migrations_20261106120000_engagement_threads, supabase_migrations_20261106120000_engagement_messages, supabase_migrations_20261106120000_engagement_thread_reads, supabase_migrations_20261106120000_engagement_is_thread_member, supabase_migrations_20261106120000_engagement_my_instructor_id, supabase_migrations_20261106120000_engagement_my_threads [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Weekly series functions (book_series, cancel every week, reschedule leaves series)** — supabase_migrations_20261106130000_engagement_functions_book_series, supabase_migrations_20261106130000_engagement_functions_cancel_booking, supabase_migrations_20261106130000_engagement_functions_reschedule_booking, supabase_migrations_20261106130000_engagement_functions_my_bookings, supabase_tests_database_08_series_test [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Live chat stack (tables, Realtime, CI test, e2e)** — specs_phase_2_design_messages_table, specs_phase_2_design_realtime_channels, _github_workflows_ci_realtime_step, apps_mobile_e2e_phase2_message_live_reply, docs_decisions_d72 [INFERRED 0.85]
- **Weekly series flow (book, pay, cancel every week)** — specs_phase_2_requirements_r5, specs_phase_2_design_book_series, specs_phase_2_design_series_payments, specs_phase_2_design_cancel_booking_every_week, apps_mobile_e2e_phase2_book_two_weeks, apps_mobile_e2e_phase2_cancel_every_week [INFERRED 0.85]

## Communities (80 total, 2 thin omitted)

### Community 0 - "Bookings Filter & Types"
Cohesion: 0.05
Nodes (83): BookingDetail(), styles, BookingsFilter(), CancelSheet(), REASONS, styles, Confirmed(), RateSheet() (+75 more)

### Community 1 - "Chat Requirements & Screens"
Cohesion: 0.07
Nodes (53): Chat(), styles, InstructorProfile(), INSTRUCTOR_TABS, ORDER, ROUTE, TabsLayout(), Messages() (+45 more)

### Community 2 - "Accessibility & Glass Lens"
Cohesion: 0.08
Nodes (39): useIsRTL(), A11y, isContrast(), mergeA11y(), useA11y(), styles, Glass(), GlassGroup() (+31 more)

### Community 3 - "Cards & Booking Card"
Cohesion: 0.09
Nodes (30): styles, Props, styles, DashedCard(), styles, DateTile(), styles, DeparturesBoard() (+22 more)

### Community 4 - "Settings, i18n Keys & Shell Tests"
Cohesion: 0.09
Nodes (21): GalleryRoute(), Preferences(), mockLines, clients, mockWrite, mockSave, mockRpc, mockParams (+13 more)

### Community 5 - "Interests Screen & Tests"
Cohesion: 0.11
Nodes (29): styles, Welcome(), KINDS, styles, TIMES, styles, styles, WHEN (+21 more)

### Community 6 - "E2E Journey & Arabic Strings"
Cohesion: 0.08
Nodes (33): 5. Book soonest 1:1 oud time, 3. Category tray, 2. Sign up and verify, land on Home, Arabic app strings to translate, Add to calendar strings (3), App credit strings (review, cancel, profile), Appearance sheet strings (3), Buttons and messages strings (5) (+25 more)

### Community 7 - "Gallery Screen & Theme"
Cohesion: 0.10
Nodes (24): AppearanceSheet(), styles, THEMES, unstable_settings, DemoCheckout(), styles, styles, LANGS (+16 more)

### Community 8 - "Workshop Seats"
Cohesion: 0.12
Nodes (29): Book(), styles, Reschedule(), styles, styles, Workshop(), repeatTexts(), days (+21 more)

### Community 9 - "Icon · Card"
Cohesion: 0.09
Nodes (26): BookingCard(), Card(), Props, styles, ConfirmationRing(), DisciplineTile(), styles, FilterButton() (+18 more)

### Community 10 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 11 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.08
Nodes (7): Brand commitments, Design canvas and design system artifacts, cfa design system artifact, Decisions log (DECISIONS.md), GlassGroup (GlassEffectContainer), Buttons (mostly screen-reader labels) strings (6), G2: Supabase keys and link

### Community 12 - "Phase 1 Requirements & Decisions"
Cohesion: 0.07
Nodes (26): Home surface brief (app-wide look, T23), Booking card, Bookings Filter sheet, Departures board (Starting soon near you), Explore Filters sheet, Home aubergine band, Archived Impeccable mocks (apps/mobile/.impeccable/mocks/), MonthCalendar (+18 more)

### Community 13 - "Onboarding Screens"
Cohesion: 0.10
Nodes (25): AREA_ORDER, Pref, PREFS, styles, Level, Profile, Area, Draft (+17 more)

### Community 14 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-calendar, expo-constants, expo-font, expo-glass-effect (+22 more)

### Community 15 - "Gallery · Daypicker"
Cohesion: 0.11
Nodes (22): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, A11yFlag, Composer() (+14 more)

### Community 16 - "Explore, Instructor & Workshop Tasks"
Cohesion: 0.15
Nodes (20): 7. Both in Bookings, Evidence on hand, Groups and level-label migrations pushed to hosted project, Neutral photo placeholders (no real photos yet), T23 four UI fixes (nav fade, fact tiles, dark thumb, Home capital), Not done, or done differently, What was built (Phase 1 learner app and backend), Phase 1 ordered tasks (+12 more)

### Community 17 - "Manual Test & Phase 3 Gate"
Cohesion: 0.11
Nodes (20): 15. Rate the finished 1:1 from Past, SignOutSheet(), Phase 2 waiting at the Phase 3 gate (draft specs/phase-3 on approval), Cancel sheet fits its content (fitToContents), grant_credit() ops function, refresh_demo_slots.sql demo times script, Manual end-to-end test on the iPhone (22 steps), Before you start: Metro, test sign-ins, second phone as Nour (+12 more)

### Community 18 - "Payment Settlement & Reminders"
Cohesion: 0.11
Nodes (20): 1. Onboarding: Categories, Interests, Levels, Where (no "who for" since D80), Operating context: categories, journey, rules, WhoWhereScreen(), Migration 20261114120000_descope_kids (unpublishes kids sessions), family_members table and book() kids rules kept dormant, useReminderSync, pgTAP 12_descope_kids, Interests and levels strings (3) (+12 more)

### Community 19 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (25): expo, main, name, private, version, @cfa/tokens, expo, expo-blur (+17 more)

### Community 20 - "Explore, Map & Calendar Specs"
Cohesion: 0.14
Nodes (23): 7.5 Explore, Explore map strings (7), Weekly series strings (Repeat weekly, Cancel every week) (14), Canvas side-by-sides (R5 AC) not made, R5 discovery, R5.3 Explore, expo-calendar (createEventInCalendarAsync), Floating map/list IconButton on Explore (D68) (+15 more)

### Community 21 - "Phase 1 Design: Auth, Payments & Boundaries"
Cohesion: 0.14
Nodes (25): Phase 1 technical design, App shape and routes, apply_promo() SQL function, Auth (Supabase phone OTP), book() SQL function, Booking ref CFA-#####, Component library, create-checkout Edge Function (+17 more)

### Community 22 - "CI Jobs & Checks"
Cohesion: 0.12
Nodes (19): Local Supabase with fake provider and fixture, e2e job (Maestro Phase 1 + Phase 2 journey on Android emulator), e2e screen recording artifact upload, Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, ci.sh script, Phase 1 Maestro journey (R10.1) (+11 more)

### Community 23 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 24 - "Confirmed & Checkout Tests"
Cohesion: 0.10
Nodes (23): booking(), inDays(), mockAddEvent, mockCheckout, mockDemoPay, mockInvalidate, mockParams, mockPlace (+15 more)

### Community 25 - "Theme Tokens & Basics Tests"
Cohesion: 0.12
Nodes (19): ThemePref, off, resolveScheme(), Scheme, Props, styles, Dot(), styles (+11 more)

### Community 26 - "Product Overview (Handoff)"
Cohesion: 0.12
Nodes (23): Gallery flow: Arabic/RTL screenshots, Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 6.3 Category icons, Confirmation ring, 11. Content style (+15 more)

### Community 27 - "Working Agreement & Phase 1 Design"
Cohesion: 0.15
Nodes (23): Migration 20261105120000_app_credit.sql, Cancel sheet credit wording ("Cancel and get N EGP credit"), Profile app credit row, SQL tests 04_app_credit, Review & pay "Use my app credit" switch, 7.11 Bookings, cancel_booking() SQL function, credit_spends table (+15 more)

### Community 28 - "Engagement Schema & CI Database Job"
Cohesion: 0.24
Nodes (23): Engagement migration (2026111xxxxxxx_engagement.sql), favourites table, my_threads view (security_invoker), start_thread() SQL function, thread_reads table (read receipts), threads table, R1.1 One thread per learner and instructor (RLS), T1: Engagement migration (done, CI green) (+15 more)

### Community 29 - "Onboarding · Categories"
Cohesion: 0.20
Nodes (17): Categories(), styles, styles, styles, styles, useInterests(), useSession(), CATEGORIES (+9 more)

### Community 30 - "Date Formatting & Time Slots"
Cohesion: 0.18
Nodes (19): dateFormat(), formatClock(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth(), formatMonthYear(), formatNumber() (+11 more)

### Community 31 - "Phase Boundaries & Skills"
Cohesion: 0.10
Nodes (14): Coach For All app, Project Map page (build-data.mjs, republished artifact), Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Boundaries (+6 more)

### Community 32 - "Phone Sign-up & Verify"
Cohesion: 0.16
Nodes (15): SignUp(), styles, clock(), styles, Verify(), authErrorKey(), e164(), formatEgMobile() (+7 more)

### Community 33 - "Root Package & Scripts"
Cohesion: 0.09
Nodes (21): dependencies, expo, devDependencies, supabase, engines, node, expo, name (+13 more)

### Community 34 - "Product Record & Agent Guides"
Cohesion: 0.12
Nodes (12): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Platform: iPhone-first, adaptive, Positioning, Product principles (+4 more)

### Community 35 - "Home Data & Time Rules"
Cohesion: 0.15
Nodes (20): FiltersSheet(), Availability, byKey(), DISTANCES, ExploreState, filterPeople(), filterWorkshops(), LIVE_MAP (+12 more)

### Community 36 - "Home Data & Time Rules 2"
Cohesion: 0.18
Nodes (17): styles, cairo(), cairoDaysUntil(), Departure, distanceKm(), greetingPeriod(), GroupSessionRow, MyBookingRow (+9 more)

### Community 37 - "Instructor Profile Data"
Cohesion: 0.14
Nodes (14): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+6 more)

### Community 38 - "Realtime"
Cohesion: 0.10
Nodes (13): admin, arrived, coachMsgs, got, [learner, coach, outsider], learnerMsgs, learnerReads, outsiderMsgs (+5 more)

### Community 39 - "Decisions · Requirements"
Cohesion: 0.13
Nodes (15): CI workflow, edge-functions job (Deno check and tests), 6. Pay by card with fake provider, Refresh bookings, seats and board after settled payment, Review & pay, Confirmed strings (19), Demo payment strings (5), Test results (CI, four jobs green) (+7 more)

### Community 40 - "Testing Strategy & Monorepo"
Cohesion: 0.21
Nodes (15): Live chat Realtime test step (supabase/tests/realtime.mjs), react-native-maps, Testing and CI, Phase 2 technical design, Chat client (idempotent send, typing broadcast, mark read), data/chat.ts (threads, messages, send, realtime hooks), MapPin custom marker, messages.reply_to (migration 20261110120000_message_replies) (+7 more)

### Community 41 - "Weekly Series & Phase 2 Functions"
Cohesion: 0.22
Nodes (17): my_bookings view, reschedule_booking() SQL function, book_series() SQL function (calls book() once per week), bookings.series_id column, my_bookings gains series_id, reschedule_booking() wrapper (moved week leaves the series), R5.2 One atomic booking of all weeks (book_series), R5.6 Reschedule moves one week, leaves the series (+9 more)

### Community 42 - "Design Tokens Pipeline"
Cohesion: 0.18
Nodes (16): Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature), Creative North Star: The evening class board (+8 more)

### Community 43 - "Project Guide & Design Sources"
Cohesion: 0.17
Nodes (12): 4. Book two workshop seats, Book screen, group_level_labels data migration, Group page, Reschedule screen, Book strings (13), Booking errors strings (4), Group page strings (6) (+4 more)

### Community 44 - "Starrating · Stepper"
Cohesion: 0.17
Nodes (11): useTheme(), Props, styles, Props, StarRating(), styles, Props, Stepper() (+3 more)

### Community 45 - "Brand Tokens (Purple & Gold)"
Cohesion: 0.18
Nodes (16): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+8 more)

### Community 46 - "Working Agreement"
Cohesion: 0.18
Nodes (10): The Glass Is Apple's Rule, Navigation (native tabs, glass), Android tab bar returns on landing on a tab, GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar, Segmented control, Tab bar strings (1) (+2 more)

### Community 47 - "Gallery E2E & Dev Setup"
Cohesion: 0.19
Nodes (15): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+7 more)

### Community 48 - "Explore Tests"
Cohesion: 0.14
Nodes (13): DEFAULT_FILTERS, Filters, OfferingPrice, at(), base, card(), dina, hany (+5 more)

### Community 49 - "Avatar · Leveloption"
Cohesion: 0.17
Nodes (10): Avatar(), Props, styles, LevelGlyph(), styles, LevelOption(), Props, styles (+2 more)

### Community 50 - "Token Generator Script"
Cohesion: 0.23
Nodes (14): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+6 more)

### Community 51 - "Ratings"
Cohesion: 0.22
Nodes (14): Last seat goes to one of 20 bookings step, Supabase CLI pinned to 2.121.0, supabase job (db reset, lint, pgTAP), Rate sheet strings (11), T4: Concurrency test, rate_booking() SQL function, reviews table, R2 ratings (Rate sheet on completed bookings) (+6 more)

### Community 52 - "Concurrency"
Cohesion: 0.15
Nodes (10): b64(), jwt(), noSeats, seriesRefused, seriesWins, starts, taken, week0 (+2 more)

### Community 53 - "Gallery Sheet & Copy"
Cohesion: 0.21
Nodes (9): GallerySheet(), styles, styles, Interest, useArea(), ar, en, galleryCopy (+1 more)

### Community 54 - "Explore · Rules"
Cohesion: 0.26
Nodes (12): Levels(), Explore(), styles, Home(), activeFilterCount(), useLocationGranted(), useOrigin(), groupByVenue() (+4 more)

### Community 55 - "Time Slots"
Cohesion: 0.23
Nodes (11): setLanguage(), sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState (+3 more)

### Community 56 - "Glass Component"
Cohesion: 0.17
Nodes (10): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, ChatBubble(), Props (+2 more)

### Community 57 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 58 - "Phase 0 Report & Requirements"
Cohesion: 0.23
Nodes (12): checks job (lint, typecheck, tests, tokens), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 59 - "Root Layout & Query Client"
Cohesion: 0.21
Nodes (10): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useApplyThemeOverride(), useToast (+2 more)

### Community 60 - "Phase 1 Design Notes"
Cohesion: 0.17
Nodes (11): CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format, T22 Maestro flow (not run in Phase 0), T24 Graphify update and phase report (+3 more)

### Community 61 - "Phase2 · Helper"
Cohesion: 0.20
Nodes (10): helper.sh script, Phase 2 Maestro journey additions (R8.1), 13. Book her 1:1 for two weeks (Repeat weekly), 14. Cancel every week (1,300 EGP credit), 11. Favourite Nour from Explore, 16. Nour in Profile Favourites, 12. Message Nour; reply arrives live, Favourites and hearts strings (6) (+2 more)

### Community 62 - "Seed Instructors & Workshops"
Cohesion: 0.27
Nodes (9): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, Instructor (+1 more)

### Community 63 - "Instructor Sign-in & Tabs"
Cohesion: 0.42
Nodes (9): Demo sign-in: Omar, code 111111 hosted / 482917 local and CI; instructors Yasmine and Nour, instructors.user_id column, Instructor journey gate (Messages and Profile tab bar, D69), R1.2 Instructor sign-in for chat (instructors.user_id; Messages and Profile tabs), T3: Seed and push; instructors see Messages and Profile (done, D69, D70), instructors.user_id column (unique, auth.users, on delete set null), demo_instructors.sql (demo instructor sign-ins and demo chat), Demo thread Omar and Nour (two messages) (+1 more)

### Community 64 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 65 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 66 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 67 - "Arabic Copy & Dev Machine"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 68 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 69 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 70 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.43
Nodes (6): CreditHistory(), creditSubtitle(), creditTitle(), styles, TFn, useCreditHistory()

### Community 71 - "Favourites · Home"
Cohesion: 0.43
Nodes (6): Favourites(), useFavouriteCards(), useFavouriteIds(), useFavourites(), useToggleFavourite(), InstructorCardRow

### Community 73 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 74 - "Category Tray & Hand-set Tokens"
Cohesion: 0.33
Nodes (5): component, homeIndicator, icon, layout, tray

### Community 75 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 76 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 77 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 78 - "Product in One Page (Handoff)"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **60 isolated node(s):** `expo`, `@cfa/tokens`, `expo`, `expo-localization`, `jest` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 536 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Chat Requirements & Screens`, `Product Record & Agent Guides`, `E2E Journey & Arabic Strings`, `Decisions · Requirements`, `Testing Strategy & Monorepo`, `Project Guide & Design Sources`, `Phase 1 Requirements & Decisions`, `Working Agreement`, `Explore, Instructor & Workshop Tasks`, `Manual Test & Phase 3 Gate`, `Payment Settlement & Reminders`, `Explore, Map & Calendar Specs`, `CI Jobs & Checks`, `Working Agreement & Phase 1 Design`, `Phase 1 Design Notes`, `Instructor Sign-in & Tabs`, `Phase Boundaries & Skills`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **What connects `expo`, `@cfa/tokens`, `expo` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Bookings Filter & Types` be split into smaller, more focused modules?**
  _Cohesion score 0.05195968645016797 - nodes in this community are weakly interconnected._
- **Why does `D80: Kids and family descoped until after all phases` connect `Payment Settlement & Reminders` to `Home Data & Time Rules`, `Interests Screen & Tests`, `E2E Journey & Arabic Strings`, `Decisions · Requirements`, `Workshop Seats`, `Decisions Log & Expo Docs Rule`, `Project Guide & Design Sources`, `Onboarding Screens`, `Phase 1 Requirements & Decisions`, `Manual Test & Phase 3 Gate`, `Ratings`, `Gallery Sheet & Copy`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `Chat Requirements & Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.07071887784921099 - nodes in this community are weakly interconnected._
- **Why does `D64: Refunds are app credit` connect `Working Agreement & Phase 1 Design` to `Bookings Filter & Types`, `Interests Screen & Tests`, `E2E Journey & Arabic Strings`, `Decisions · Requirements`, `Decisions Log & Expo Docs Rule`, `Explore, Instructor & Workshop Tasks`, `Manual Test & Phase 3 Gate`, `Payment Settlement & Reminders`, `Explore, Map & Calendar Specs`, `Gallery Sheet & Copy`, `CI Jobs & Checks`, `Phase 1 Design: Auth, Payments & Boundaries`, `Phase Boundaries & Skills`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._