# Graph Report - Coaching app  (2026-11-09)

## Corpus Check
- 22 files · ~136,277 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1562 nodes · 5033 edges · 78 communities (73 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 334 edges (avg confidence: 0.85)
- Token cost: 60,000 input · 9,000 output

## Community Hubs (Navigation)
- Cards & Booking Card
- Interests Screen & Tests
- Date Formatting & Time Slots
- Bookings Filter & Types
- Chat Requirements & Screens
- Gallery Screen & Theme
- Decisions Log & Expo Docs Rule
- Token Generator Script
- Paymob
- CI Jobs & Project Guide
- E2E Journey & Arabic Strings
- Text & Time Slot Components
- Design Tokens Pipeline
- Payment Settlement & Reminders
- Mobile Runtime Dependencies
- Explore, Map & Calendar Specs
- Settings, i18n Keys & Shell Tests
- Phase 1 Design: Auth, Payments & Boundaries
- Expo App Config
- Root Stack
- Project Guide & Design Sources
- Phone Sign-up & Verify
- Product Overview (Handoff)
- Mobile Package Manifest
- Testing Strategy & Monorepo
- Home Data & Time Rules
- Explore Filters Sheet
- Phase 1 Requirements & Decisions
- Working Agreement & Phase 1 Design
- Checkout, Demo Pay & Reminders
- Root Package & Scripts
- Accessibility & Glass Lens
- Family, Account & Interests Data
- Instructor Profile Data
- Working Agreement
- Workshop Seats
- Explore Tests
- Arabic Strings & Phase 1 Report
- Engagement Schema & CI Database Job
- CI Jobs & Checks
- Book & Reschedule Screens
- Gallery E2E & Dev Setup
- Product Brief
- Confirmed & Checkout Tests
- Reminders
- Phase 1 Design Notes
- Arabic Copy & Dev Machine
- Level Options & Colour Types
- Theme Tokens & Basics Tests
- Mobile TypeScript Config
- Brand Tokens (Purple & Gold)
- Glass Component & Sheets
- Weekly Series & Phase 2 Functions
- Ratings
- Rules
- Favourites & Series Schema
- Mobile Dev Dependencies
- Root Layout & Query Client
- Instructor Sign-in & Tabs
- Glass Component
- Tokens Package Manifest
- Phase 0 Report & Requirements
- Base TypeScript Config
- Book Screen Tests
- Design Handoff
- Glass Chrome Specs (Tabs, Sheets)
- Category Tray & Explore Specs
- Category Tray & Hand-set Tokens
- Mobile npm Scripts
- Lint Config
- Liquid Glass Materials
- Jest Config
- Code Entry Screen
- Product in One Page (Handoff)
- Account Data & Gallery Copy
- Onboarding Layout
- E2E CI Script
- Deno Config

## God Nodes (most connected - your core abstractions)
1. `react-native` - 102 edges
2. `useTheme()` - 86 edges
3. `T()` - 82 edges
4. `Decisions log (DECISIONS.md)` - 75 edges
5. `react` - 49 edges
6. `react-i18next` - 49 edges
7. `useLang()` - 47 edges
8. `Arabic app strings to translate` - 47 edges
9. `useSettings` - 40 edges
10. `expo-router` - 40 edges

## Surprising Connections (you probably didn't know these)
- `R6 calendar (Add to calendar)` --references--> `Confirmed()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/confirmed/[ref].tsx
- `Demo instructor sign-ins Yasmine Fathy and Nour El-Sayed (test numbers)` --semantically_similar_to--> `nour`  [INFERRED] [semantically similar]
  supabase/scripts/demo_instructors.sql → apps/mobile/src/dev/seed.ts
- `Demo instructor sign-ins Yasmine Fathy and Nour El-Sayed (test numbers)` --semantically_similar_to--> `yasmine`  [INFERRED] [semantically similar]
  supabase/scripts/demo_instructors.sql → apps/mobile/src/dev/seed.ts
- `cancel_one_booking() (renamed Phase 1 cancel, not app-callable)` --references--> `D64: Refunds are app credit`  [INFERRED]
  supabase/migrations/20261106130000_engagement_functions.sql → docs/DECISIONS.md
- `supabase job (db reset, lint, pgTAP)` --references--> `pgTAP 08_series (18 tests: week bounds, series type, unavailable week all-or-nothing, promo per week, cancel one/every week, reschedule leaves series, credit refunds)`  [INFERRED]
  .github/workflows/ci.yml → supabase/tests/database/08_series.test.sql

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Chat RLS model (membership, own markers, server time)** — supabase_migrations_20261106120000_engagement_threads, supabase_migrations_20261106120000_engagement_messages, supabase_migrations_20261106120000_engagement_thread_reads, supabase_migrations_20261106120000_engagement_is_thread_member, supabase_migrations_20261106120000_engagement_my_instructor_id, supabase_migrations_20261106120000_engagement_my_threads [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Phase 2 text chat flow** — specs_phase_2_requirements_r1, specs_phase_2_design_threads_table, specs_phase_2_design_messages_table, specs_phase_2_design_thread_reads_table, specs_phase_2_design_start_thread, specs_phase_2_design_realtime_channels, specs_phase_2_design_chat_client, specs_phase_2_tasks_t4, specs_phase_2_tasks_t5 [EXTRACTED 1.00]
- **Recurring weekly series (book, pay, cancel)** — specs_phase_2_requirements_r5, specs_phase_2_design_book_series, specs_phase_1_design_book, specs_phase_2_design_series_payments, specs_phase_2_design_cancel_booking_every_week, specs_phase_2_design_bookings_series_id, specs_phase_2_tasks_t10, specs_phase_2_tasks_t11 [EXTRACTED 1.00]
- **Weekly series functions (book_series, cancel every week, reschedule leaves series)** — supabase_migrations_20261106130000_engagement_functions_book_series, supabase_migrations_20261106130000_engagement_functions_cancel_booking, supabase_migrations_20261106130000_engagement_functions_reschedule_booking, supabase_migrations_20261106130000_engagement_functions_my_bookings, supabase_tests_database_08_series_test [EXTRACTED 1.00]
- **Phase 2 spec gate (draft, owner answers, approval)** — docs_decisions_d66, docs_decisions_d67, docs_decisions_d68, specs_phase_2_requirements, specs_phase_2_design, specs_phase_2_tasks, specs_phase_1_report_phase2_outline [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]
- **T4 Messages and Chat (text)** — docs_decisions_d71, specs_phase_2_tasks_t4, apps_mobile_src_app_tabs_messages_messages, apps_mobile_src_app_chat_threadid_chat, apps_mobile_src_data_chat, apps_mobile_src_ui_threadrow_threadrow, apps_mobile_src_ui_chatbubble_chatbubble, apps_mobile_src_ui_composer_composer [INFERRED 0.85]

## Communities (78 total, 5 thin omitted)

### Community 0 - "Cards & Booking Card"
Cohesion: 0.06
Nodes (79): styles, styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK (+71 more)

### Community 1 - "Interests Screen & Tests"
Cohesion: 0.07
Nodes (55): SignUp(), Welcome(), FiltersSheet(), styles, TYPES, WHEN, GallerySheet(), styles (+47 more)

### Community 2 - "Date Formatting & Time Slots"
Cohesion: 0.06
Nodes (47): ar, en, galleryCopy, nour, photoWalk, seedFor(), text, wheelTaster (+39 more)

### Community 3 - "Bookings Filter & Types"
Cohesion: 0.07
Nodes (48): styles, BookingsFilter(), KINDS, styles, TIMES, CancelSheet(), REASONS, styles (+40 more)

### Community 4 - "Chat Requirements & Screens"
Cohesion: 0.09
Nodes (47): BookingDetail(), Chat(), styles, GalleryRoute(), InstructorProfile(), Bookings(), Messages(), styles (+39 more)

### Community 5 - "Gallery Screen & Theme"
Cohesion: 0.12
Nodes (26): AppearanceSheet(), styles, THEMES, styles, FamilyMemberSheet(), styles, LANGS, LanguageSheet() (+18 more)

### Community 6 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (8): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Brand commitments, Design canvas and design system artifacts, cfa design system artifact, Decisions log (DECISIONS.md), GlassGroup (GlassEffectContainer), Buttons (mostly screen-reader labels) strings (6)

### Community 7 - "Token Generator Script"
Cohesion: 0.08
Nodes (26): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+18 more)

### Community 8 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 9 - "CI Jobs & Project Guide"
Cohesion: 0.08
Nodes (23): CI workflow, checks job (lint, typecheck, tests, tokens), edge-functions job (Deno check and tests), Evidence on hand, Coach For All app, Project Map page (build-data.mjs, republished artifact), Archived Impeccable mocks (apps/mobile/.impeccable/mocks/), Neutral photo placeholders (no real photos yet) (+15 more)

### Community 10 - "E2E Journey & Arabic Strings"
Cohesion: 0.09
Nodes (28): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 3. Category tray, 2. Sign up and verify, land on Home, Demo sign-in (Supabase test number), Category tray and its button strings (8), Date strip strings (5), Explore strings (7) (+20 more)

### Community 11 - "Text & Time Slot Components"
Cohesion: 0.10
Nodes (26): styles, styles, BookingCard(), Props, styles, ButtonVariant, Props, styles (+18 more)

### Community 12 - "Design Tokens Pipeline"
Cohesion: 0.10
Nodes (26): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+18 more)

### Community 13 - "Payment Settlement & Reminders"
Cohesion: 0.10
Nodes (22): 1. Onboarding: Categories, Interests, Levels, Who & where, 6. Pay by card with fake provider, Operating context: categories, journey, rules, Refresh bookings, seats and board after settled payment, useReminderSync, Review & pay, Confirmed strings (19), Demo payment strings (5) (+14 more)

### Community 14 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+21 more)

### Community 15 - "Explore, Map & Calendar Specs"
Cohesion: 0.14
Nodes (25): Explore(), Pure rules in data/rules.ts, Canvas side-by-sides (R5 AC) not made, expo-calendar (createEventInCalendarAsync), Floating map/list IconButton on Explore (D68), groupByVenue() and inRegion() map rules, Phase 2 requirements: Engagement, Phase 2 capability map (data2, chat, ratings, favourites, map, recurring, calendar, credit-history, e2e2) (+17 more)

### Community 16 - "Settings, i18n Keys & Shell Tests"
Cohesion: 0.11
Nodes (13): mockSave, mockParams, mockSave, mockSignOut, i18n, keys(), missingArabicKeys(), Tree (+5 more)

### Community 17 - "Phase 1 Design: Auth, Payments & Boundaries"
Cohesion: 0.12
Nodes (25): Phase 1 technical design, App shape and routes, apply_promo() SQL function, Auth (Supabase phone OTP), book() SQL function, Booking ref CFA-#####, Boundaries, Component library (+17 more)

### Community 18 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 19 - "Root Stack"
Cohesion: 0.13
Nodes (18): INSTRUCTOR_TABS, ORDER, ROUTE, useMyInstructorId(), Props, restoreTabBar(), styles, TabBar() (+10 more)

### Community 20 - "Project Guide & Design Sources"
Cohesion: 0.12
Nodes (18): 4. Book two workshop seats, Book screen, Cancel sheet fits its content (fitToContents), group_level_labels data migration, Group page, Groups and level-label migrations pushed to hosted project, refresh_demo_slots.sql demo times script, Reschedule screen (+10 more)

### Community 21 - "Phone Sign-up & Verify"
Cohesion: 0.17
Nodes (17): styles, styles, authErrorKey(), e164(), formatEgMobile(), isValidEgMobile(), sendCode(), mockSend (+9 more)

### Community 22 - "Product Overview (Handoff)"
Cohesion: 0.13
Nodes (22): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+14 more)

### Community 23 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (21): main, name, private, version, @cfa/tokens, expo, expo-constants, expo-localization (+13 more)

### Community 24 - "Testing Strategy & Monorepo"
Cohesion: 0.17
Nodes (20): react-native-maps, Testing and CI, Phase 2 technical design, bookings.series_id column, Chat client (idempotent send, typing broadcast, mark read), data/chat.ts (threads, messages, send, realtime hooks), Engagement migration (2026111xxxxxxx_engagement.sql), MapPin custom marker (+12 more)

### Community 25 - "Home Data & Time Rules"
Cohesion: 0.17
Nodes (18): Home(), styles, cairo(), cairoDaysUntil(), Departure, distanceKm(), greetingPeriod(), GroupSessionRow (+10 more)

### Community 26 - "Explore Filters Sheet"
Cohesion: 0.14
Nodes (21): Availability, byKey(), DISTANCES, ExploreState, filterPeople(), filterWorkshops(), matchesAvailability(), PersonResult (+13 more)

### Community 27 - "Phase 1 Requirements & Decisions"
Cohesion: 0.12
Nodes (19): Booking card, Bookings Filter sheet, Explore Filters sheet, MonthCalendar, Bookings strings (41), Explore, Filters and Sort strings (43), Month calendar strings (4), Time slots strings (6) (+11 more)

### Community 28 - "Working Agreement & Phase 1 Design"
Cohesion: 0.22
Nodes (17): cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, Cancel sheet credit wording ("Cancel and get N EGP credit"), grant_credit() ops function, Profile app credit row (+9 more)

### Community 29 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.11
Nodes (18): DemoCheckout(), Profile(), MY_BOOKING_COLUMNS, applyPromo(), Booking, cancelBooking(), demoPay(), KNOWN (+10 more)

### Community 30 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 31 - "Accessibility & Glass Lens"
Cohesion: 0.17
Nodes (14): A11y, isContrast(), mergeA11y(), useA11y(), GlassLens(), Lens, styles, useGlassLens() (+6 more)

### Community 32 - "Family, Account & Interests Data"
Cohesion: 0.13
Nodes (15): Interest, Level, useArea(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking (+7 more)

### Community 33 - "Instructor Profile Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 34 - "Working Agreement"
Cohesion: 0.19
Nodes (10): The Glass Is Apple's Rule, Navigation (native tabs, glass), Android tab bar returns on landing on a tab, GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar, Segmented control, Tab bar strings (1) (+2 more)

### Community 35 - "Workshop Seats"
Cohesion: 0.17
Nodes (12): styles, Workshop(), BookDraft, BookOffering, useBookDraft, clampSeats(), maxWorkshopSeats(), mockData (+4 more)

### Community 36 - "Explore Tests"
Cohesion: 0.13
Nodes (14): activeFilterCount(), DEFAULT_FILTERS, Filters, OfferingPrice, at(), base, card(), dina (+6 more)

### Community 37 - "Arabic Strings & Phase 1 Report"
Cohesion: 0.18
Nodes (15): Arabic app strings to translate, App credit strings (review, cancel, profile), Appearance sheet strings (3), Buttons and messages strings (5), Cancel sheet strings (15), Egyptian Arabic drafts (await owner; Arabic in last phase), Family & kids and its sheet strings (19), Instructor and workshop cards strings (6) (+7 more)

### Community 38 - "Engagement Schema & CI Database Job"
Cohesion: 0.38
Nodes (16): R1.1 One thread per learner and instructor (RLS), T1: Engagement migration (done 6 Nov, CI green; pushed to hosted with T3), 20261106120000_engagement.sql (engagement migration), instructors.user_id column (unique, auth.users, on delete set null), is_thread_member() (RLS membership check), messages table (text 1-2000 chars, sender_id default auth.uid()), my_instructor_id() (caller's instructor row or null), my_threads view (Messages list read model) (+8 more)

### Community 39 - "CI Jobs & Checks"
Cohesion: 0.22
Nodes (11): Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, Phase 1 Maestro journey (R10.1), apps/mobile/e2e/fixture.sql (pins two class times), Venue panel instead of map on Android without Maps key (+3 more)

### Community 40 - "Book & Reschedule Screens"
Cohesion: 0.27
Nodes (12): KIDS_AGE, styles, Reschedule(), styles, useBookOptions(), cairoHM(), cairoKey, isBookable() (+4 more)

### Community 41 - "Gallery E2E & Dev Setup"
Cohesion: 0.20
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 42 - "Product Brief"
Cohesion: 0.20
Nodes (10): PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Platform: iPhone-first, adaptive, Positioning, Product principles, Product purpose: directory and booking, Users: Cairo adults booking lessons (+2 more)

### Community 43 - "Confirmed & Checkout Tests"
Cohesion: 0.16
Nodes (13): Review(), booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate, mockParams, mockPlace (+5 more)

### Community 44 - "Reminders"
Cohesion: 0.20
Nodes (10): MyBooking, DEFAULT_REMINDER, ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync() (+2 more)

### Community 45 - "Phase 1 Design Notes"
Cohesion: 0.14
Nodes (13): 14. Sample content (seed data), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+5 more)

### Community 46 - "Arabic Copy & Dev Machine"
Cohesion: 0.16
Nodes (13): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Booking detail strings (13), Phase 1 requirements: hobbies-first booking loop, R1 data, R10 e2e (+5 more)

### Community 47 - "Level Options & Colour Types"
Cohesion: 0.26
Nodes (10): Family(), styles, styles, Method, useFamily(), formatDayMonth(), Banner(), styles (+2 more)

### Community 48 - "Theme Tokens & Basics Tests"
Cohesion: 0.18
Nodes (9): off, blur, dark, light, radius, shadow, space, touch (+1 more)

### Community 49 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 50 - "Brand Tokens (Purple & Gold)"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 51 - "Glass Component & Sheets"
Cohesion: 0.24
Nodes (8): useIsRTL(), GlassGroup(), GlassMode, liquidAvailable(), Props, flat(), useSheetOptions(), expo-blur

### Community 52 - "Weekly Series & Phase 2 Functions"
Cohesion: 0.29
Nodes (12): my_bookings view, reschedule_booking() SQL function, my_bookings gains series_id, reschedule_booking() wrapper (moved week leaves the series), R5.6 Reschedule moves one week, leaves the series, 20261106130000_engagement_functions.sql (Phase 2 functions migration), cancel_booking(p_every_week) wrapper, cancel_one_booking() (renamed Phase 1 cancel, not app-callable) (+4 more)

### Community 53 - "Ratings"
Cohesion: 0.31
Nodes (11): Last seat goes to one of 20 bookings step, Supabase CLI pinned to 2.121.0, supabase job (db reset, lint, pgTAP), T4: Concurrency test, rate_booking() SQL function, reviews table, R2 ratings (Rate sheet on completed bookings), R2.3 Instructor average and count update at once (+3 more)

### Community 54 - "Rules"
Cohesion: 0.29
Nodes (10): cairoDay(), cairoOffset(), fromCairo(), monthGrid(), monthsAhead(), Policy, policyFor(), sameCairoDay() (+2 more)

### Community 55 - "Favourites & Series Schema"
Cohesion: 0.27
Nodes (11): Review & pay "Use my app credit" switch, book_series() SQL function (calls book() once per week), favourites table, R3 favourites (heart on instructors, Profile Favourites list), R5 recurring weekly bookings (2-8 weeks, paid up front), R5.2 One atomic booking of all weeks (book_series), R5.3 Series paid at once on one checkout, bookings.series_id column + partial index (+3 more)

### Community 56 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 57 - "Root Layout & Query Client"
Cohesion: 0.27
Nodes (9): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), useSettings, useApplyThemeOverride(), expo-font (+1 more)

### Community 58 - "Instructor Sign-in & Tabs"
Cohesion: 0.44
Nodes (8): TabsLayout(), instructors.user_id column, Instructor journey gate (Messages and Profile tab bar, D69), R1.2 Instructor sign-in for chat (instructors.user_id; Messages and Profile tabs), T3: Seed and push (done 6 Nov: migrations pushed, demo_instructors.sql run on hosted; Messages and Profile only, D69), demo_instructors.sql (demo instructor sign-ins and demo chat), Demo thread Omar and Nour (two messages), Demo instructor sign-ins Yasmine Fathy and Nour El-Sayed (test numbers)

### Community 59 - "Glass Component"
Cohesion: 0.29
Nodes (7): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray()

### Community 60 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 61 - "Phase 0 Report & Requirements"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 62 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 63 - "Book Screen Tests"
Cohesion: 0.22
Nodes (6): Book(), days, mockData, mockFamily, mockParams, now

### Community 64 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 65 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 66 - "Category Tray & Explore Specs"
Cohesion: 0.33
Nodes (7): Gallery flow: open tray and pick Sports, 6.2 Category tray, 7.5 Explore, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), R5 discovery, R5.3 Explore

### Community 67 - "Category Tray & Hand-set Tokens"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 68 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 69 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 70 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 71 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 73 - "Product in One Page (Handoff)"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **55 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+50 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 494 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Working Agreement & Phase 1 Design` to `Bookings Filter & Types`, `Gallery Screen & Theme`, `Decisions Log & Expo Docs Rule`, `Ar App Strings · Tasks`, `Report · Claude`, `Payment Settlement & Reminders`, `Arabic Copy & Dev Machine`, `Level Options & Colour Types`, `Explore, Map & Calendar Specs`, `Phase 1 Design: Auth, Payments & Boundaries`, `Project Guide & Design Sources`, `Weekly Series & Phase 2 Functions`, `Requirements · Design`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cards & Booking Card` be split into smaller, more focused modules?**
  _Cohesion score 0.055997642204538754 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Working Agreement`, `Chat Requirements & Screens`, `Ar App Strings · Tasks`, `CI Jobs & Checks`, `Report · Claude`, `Product Brief`, `E2E Journey & Arabic Strings`, `Design Tokens Pipeline`, `Payment Settlement & Reminders`, `Phase 1 Design Notes`, `Arabic Copy & Dev Machine`, `Explore, Map & Calendar Specs`, `Project Guide & Design Sources`, `Instructor Sign-in & Tabs`, `Phase 1 Requirements & Decisions`, `Working Agreement & Phase 1 Design`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Should `Interests Screen & Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.07243195785776997 - nodes in this community are weakly interconnected._
- **Why does `Coach For All design handoff` connect `Product Overview (Handoff)` to `Design Handoff`, `Glass Chrome Specs (Tabs, Sheets)`, `Category Tray & Explore Specs`, `Decisions Log & Expo Docs Rule`, `Liquid Glass Materials`, `Report · Claude`, `Product in One Page (Handoff)`, `Gallery E2E & Dev Setup`, `Design Tokens Pipeline`, `Phase 1 Design Notes`, `Arabic Copy & Dev Machine`, `Explore, Map & Calendar Specs`, `Brand Tokens (Purple & Gold)`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._