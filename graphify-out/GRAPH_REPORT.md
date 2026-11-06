# Graph Report - Coaching app  (2026-11-06)

## Corpus Check
- 13 files · ~131,878 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1516 nodes · 4797 edges · 72 communities (67 shown, 5 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 305 edges (avg confidence: 0.85)
- Token cost: 60,000 input · 12,000 output

## Community Hubs (Navigation)
- Root Stack
- Date Formatting & Time Slots
- E2E Journey & Arabic Strings
- Gallery Screen & Theme
- Text & Time Slot Components
- Explore Filters Sheet
- Level Options & Colour Types
- Token Generator Script
- Cards & Booking Card
- Decisions Log & Expo Docs Rule
- Paymob
- Explore, Map & Calendar Specs
- Checkout, Demo Pay & Reminders
- Workshop Seats
- Bookings Filter & Types
- Mobile Runtime Dependencies
- Working Agreement & Phase 1 Design
- Onboarding Screens
- Project Guide & Design Sources
- Expo App Config
- Engagement Schema & CI Database Job
- Phase 1 Requirements & Decisions
- Mobile Package Manifest
- Glass Component
- CI Jobs & Checks
- Testing Strategy & Monorepo
- Working Agreement
- Interests Screen & Tests
- Day Picker, Icon Button & Theme Types
- Product Overview (Handoff)
- Phase 1 Design: Auth, Payments & Boundaries
- Product Brief
- Design Tokens Pipeline
- Icons, Rows & Interest Tiles
- Instructor Profile Data
- Home Data & Time Rules
- Arabic Copy & Dev Machine
- Root Package & Scripts
- Phone Sign-up & Verify
- Phase 1 Design Notes
- Weekly Series & Phase 2 Functions
- Payment Settlement & Reminders
- Gallery E2E & Dev Setup
- Bookings Screens & Rules
- Confirmed & Checkout Tests
- Brand Tokens (Purple & Gold)
- Reminders
- Mobile TypeScript Config
- Root Layout & Query Client
- Instructor Sign-in & Tabs
- Mobile Dev Dependencies
- Chat Requirements & Screens
- Tokens Package Manifest
- Phase 0 Report & Requirements
- Base TypeScript Config
- Nav Bar & Selection Lens Spec
- Design Handoff
- Glass Chrome Specs (Tabs, Sheets)
- Level Option & Glyph
- Category Tray & Hand-set Tokens
- Ratings
- Mobile npm Scripts
- App Entry & Package
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
1. `react-native` - 98 edges
2. `useTheme()` - 82 edges
3. `T()` - 79 edges
4. `Decisions log (DECISIONS.md)` - 73 edges
5. `react-i18next` - 48 edges
6. `react` - 46 edges
7. `Arabic app strings to translate` - 46 edges
8. `useLang()` - 44 edges
9. `Button()` - 39 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `R1.9 Message entry points Phase 1 hid` --references--> `InstructorProfile()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/instructor/[id].tsx
- `R6 calendar (Add to calendar)` --references--> `Confirmed()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/confirmed/[ref].tsx
- `Demo instructor sign-ins Yasmine Fathy and Nour El-Sayed (test numbers)` --semantically_similar_to--> `nour`  [INFERRED] [semantically similar]
  supabase/scripts/demo_instructors.sql → apps/mobile/src/dev/seed.ts
- `Demo instructor sign-ins Yasmine Fathy and Nour El-Sayed (test numbers)` --semantically_similar_to--> `yasmine`  [INFERRED] [semantically similar]
  supabase/scripts/demo_instructors.sql → apps/mobile/src/dev/seed.ts
- `supabase job (db reset, lint, pgTAP)` --references--> `pgTAP 06_ratings (13 tests: star bounds, completed-only, rate once, average and count, review RLS, signed-out refused)`  [INFERRED]
  .github/workflows/ci.yml → supabase/tests/database/06_ratings.test.sql

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

## Communities (72 total, 5 thin omitted)

### Community 0 - "Root Stack"
Cohesion: 0.07
Nodes (48): INSTRUCTOR_TABS, ORDER, ROUTE, useIsRTL(), useSettings, off, A11y, isContrast() (+40 more)

### Community 1 - "Date Formatting & Time Slots"
Cohesion: 0.09
Nodes (43): styles, styles, styles, dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatDistance() (+35 more)

### Community 2 - "E2E Journey & Arabic Strings"
Cohesion: 0.07
Nodes (44): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 3. Category tray, 2. Sign up and verify, land on Home, Demo sign-in (Supabase test number), Arabic app strings to translate, App credit strings (review, cancel, profile), Appearance sheet strings (3) (+36 more)

### Community 3 - "Gallery Screen & Theme"
Cohesion: 0.06
Nodes (41): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), styles, LANGS, LanguageSheet(), styles (+33 more)

### Community 4 - "Text & Time Slot Components"
Cohesion: 0.08
Nodes (33): styles, GallerySheet(), styles, styles, EmptyState(), Props, styles, IconName (+25 more)

### Community 5 - "Explore Filters Sheet"
Cohesion: 0.07
Nodes (42): styles, TYPES, WHEN, SORTS, SortSheet(), styles, activeFilterCount(), Availability (+34 more)

### Community 6 - "Level Options & Colour Types"
Cohesion: 0.13
Nodes (29): styles, Welcome(), KIDS_AGE, styles, styles, Family(), styles, styles (+21 more)

### Community 7 - "Token Generator Script"
Cohesion: 0.06
Nodes (32): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+24 more)

### Community 8 - "Cards & Booking Card"
Cohesion: 0.09
Nodes (32): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, galleryCopy, BookingCard() (+24 more)

### Community 9 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (10): Brand commitments, Coach For All app, Design canvas and design system artifacts, cfa design system artifact, Project Map page (build-data.mjs, republished artifact), Decisions log (DECISIONS.md), Buttons (mostly screen-reader labels) strings (6), Working agreement (+2 more)

### Community 10 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 11 - "Explore, Map & Calendar Specs"
Cohesion: 0.11
Nodes (32): Explore(), Review & pay "Use my app credit" switch, 7.5 Explore, Pure rules in data/rules.ts, Canvas side-by-sides (R5 AC) not made, Not done, or done differently, R5 discovery, R5.3 Explore (+24 more)

### Community 12 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.08
Nodes (28): CancelSheet(), REASONS, styles, DemoCheckout(), RemindSheet(), styles, cancelOutcome(), MY_BOOKING_COLUMNS (+20 more)

### Community 13 - "Workshop Seats"
Cohesion: 0.10
Nodes (25): Book(), Reschedule(), Workshop(), days, mockData, mockFamily, mockParams, now (+17 more)

### Community 14 - "Bookings Filter & Types"
Cohesion: 0.11
Nodes (27): BookingsFilter(), KINDS, styles, TIMES, ACTIVE, BookingKind, bookingPolicy(), BookingsFilter (+19 more)

### Community 15 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+21 more)

### Community 16 - "Working Agreement & Phase 1 Design"
Cohesion: 0.14
Nodes (25): cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, Cancel sheet credit wording ("Cancel and get N EGP credit"), grant_credit() ops function, Profile app credit row (+17 more)

### Community 17 - "Onboarding Screens"
Cohesion: 0.16
Nodes (24): FiltersSheet(), Categories(), Levels(), Preferences(), styles, Interest, Level, useArea() (+16 more)

### Community 18 - "Project Guide & Design Sources"
Cohesion: 0.10
Nodes (21): 4. Book two workshop seats, Book screen, Cancel sheet fits its content (fitToContents), group_level_labels data migration, Group page, Groups and level-label migrations pushed to hosted project, MonthCalendar, refresh_demo_slots.sql demo times script (+13 more)

### Community 19 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 20 - "Engagement Schema & CI Database Job"
Cohesion: 0.22
Nodes (24): Last seat goes to one of 20 bookings step, Supabase CLI pinned to 2.121.0, supabase job (db reset, lint, pgTAP), T4: Concurrency test, R1.1 One thread per learner and instructor (RLS), R3 favourites (heart on instructors, Profile Favourites list), T1: Engagement migration (done 6 Nov, CI green, not pushed to hosted yet), 20261106120000_engagement.sql (engagement migration) (+16 more)

### Community 21 - "Phase 1 Requirements & Decisions"
Cohesion: 0.11
Nodes (20): Home surface brief (app-wide look, T23), Booking card, Bookings Filter sheet, Departures board (Starting soon near you), Explore Filters sheet, Archived Impeccable mocks (apps/mobile/.impeccable/mocks/), Bookings strings (41), Explore, Filters and Sort strings (43) (+12 more)

### Community 22 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 23 - "Glass Component"
Cohesion: 0.13
Nodes (15): styles, CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray() (+7 more)

### Community 24 - "CI Jobs & Checks"
Cohesion: 0.13
Nodes (19): CI workflow, checks job (lint, typecheck, tests, tokens), Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), edge-functions job (Deno check and tests), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step (+11 more)

### Community 25 - "Testing Strategy & Monorepo"
Cohesion: 0.16
Nodes (21): react-native-maps, Testing and CI, Phase 2 technical design, bookings.series_id column, Chat client (idempotent send, typing broadcast, mark read), data/chat.ts (threads, messages, send, realtime hooks), Engagement migration (2026111xxxxxxx_engagement.sql), favourites table (+13 more)

### Community 26 - "Working Agreement"
Cohesion: 0.15
Nodes (14): Evidence on hand, Android tab bar returns on landing on a tab, NativeTabs (Apple tab bar), Neutral photo placeholders (no real photos yet), Floating TabBar, Tab bar strings (1), Phase 1 report, [OPEN] items hit (photos, Members Circle, Maps key, Paymob live keys, credit history, credit sources) (+6 more)

### Community 27 - "Interests Screen & Tests"
Cohesion: 0.10
Nodes (19): Interests(), AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), Profile (+11 more)

### Community 28 - "Day Picker, Icon Button & Theme Types"
Cohesion: 0.14
Nodes (14): styles, FilterButton(), styles, IconButton(), Props, styles, styles, Props (+6 more)

### Community 29 - "Product Overview (Handoff)"
Cohesion: 0.13
Nodes (22): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+14 more)

### Community 30 - "Phase 1 Design: Auth, Payments & Boundaries"
Cohesion: 0.14
Nodes (21): Phase 1 technical design, App shape and routes, Auth (Supabase phone OTP), Boundaries, Component library, create-checkout Edge Function, demo-pay Edge Function, demo provider (+13 more)

### Community 31 - "Product Brief"
Cohesion: 0.11
Nodes (14): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Platform: iPhone-first, adaptive, Positioning, Product principles (+6 more)

### Community 32 - "Design Tokens Pipeline"
Cohesion: 0.14
Nodes (21): Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature), Creative North Star: The evening class board (+13 more)

### Community 33 - "Icons, Rows & Interest Tiles"
Cohesion: 0.16
Nodes (15): styles, styles, useTheme(), Avatar(), Props, styles, Banner(), styles (+7 more)

### Community 34 - "Instructor Profile Data"
Cohesion: 0.12
Nodes (16): BookDraft, BookOffering, InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot (+8 more)

### Community 35 - "Home Data & Time Rules"
Cohesion: 0.16
Nodes (16): Home(), matchesAvailability(), cairo(), cairoDaysUntil(), Departure, distanceKm(), greetingPeriod(), GroupSessionRow (+8 more)

### Community 36 - "Arabic Copy & Dev Machine"
Cohesion: 0.15
Nodes (16): 1. Onboarding: Categories, Interests, Levels, Who & where, Operating context: categories, journey, rules, Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Members' Circle, Interests and levels strings (3), Onboarding levels strings (1) (+8 more)

### Community 37 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 38 - "Phone Sign-up & Verify"
Cohesion: 0.20
Nodes (13): SignUp(), styles, authErrorKey(), e164(), formatEgMobile(), isValidEgMobile(), sendCode(), mockSend (+5 more)

### Community 39 - "Phase 1 Design Notes"
Cohesion: 0.12
Nodes (16): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, 14. Sample content (seed data), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, R9 Gallery screen (+8 more)

### Community 40 - "Weekly Series & Phase 2 Functions"
Cohesion: 0.20
Nodes (17): apply_promo() SQL function, book() SQL function, Booking ref CFA-#####, my_bookings view, release_expired_holds(), reschedule_booking() SQL function, book_series() SQL function (calls book() once per week), my_bookings gains series_id (+9 more)

### Community 41 - "Payment Settlement & Reminders"
Cohesion: 0.16
Nodes (13): 6. Pay by card with fake provider, Refresh bookings, seats and board after settled payment, useReminderSync, Review & pay, Confirmed strings (19), Demo payment strings (5), Remind me sheet strings (6), Reminder notification strings (1) (+5 more)

### Community 42 - "Gallery E2E & Dev Setup"
Cohesion: 0.19
Nodes (15): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+7 more)

### Community 43 - "Bookings Screens & Rules"
Cohesion: 0.25
Nodes (14): Confirmed(), Bookings(), styles, Tab, TABS, firstName(), bookingTitle(), canReschedule() (+6 more)

### Community 44 - "Confirmed & Checkout Tests"
Cohesion: 0.15
Nodes (14): Review(), booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate, mockParams, mockPlace (+6 more)

### Community 45 - "Brand Tokens (Purple & Gold)"
Cohesion: 0.21
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 46 - "Reminders"
Cohesion: 0.19
Nodes (9): MyBooking, ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync(), currentLang() (+1 more)

### Community 47 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 48 - "Root Layout & Query Client"
Cohesion: 0.21
Nodes (10): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useApplyThemeOverride(), useToast (+2 more)

### Community 49 - "Instructor Sign-in & Tabs"
Cohesion: 0.35
Nodes (11): TabsLayout(), useMyInstructorId(), restoreTabBar(), D69: Instructors get Messages and Profile tabs; demo instructor sign-ins, instructors.user_id column, Instructor journey gate (Messages and Profile tab bar, D69), R1.2 Instructor sign-in for chat (instructors.user_id; Messages and Profile tabs), T3: Seed instructors with test numbers and push (Messages and Profile only, D69) (+3 more)

### Community 50 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 51 - "Chat Requirements & Screens"
Cohesion: 0.27
Nodes (10): BookingDetail(), InstructorProfile(), Messages(), R1 chat (text, realtime, unread, typing, read receipts), R1.3 Messages tab thread list, R1.4 Messages tab unread badge, R1.5 Chat screen (bubbles, next-booking card), R1.7 Text only, 2,000 characters (+2 more)

### Community 52 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 53 - "Phase 0 Report & Requirements"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 54 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 55 - "Nav Bar & Selection Lens Spec"
Cohesion: 0.28
Nodes (5): The Glass Is Apple's Rule, Navigation (native tabs, glass), GlassGroup (GlassEffectContainer), GlassLens / useGlassLens, Segmented control

### Community 56 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 57 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 58 - "Level Option & Glyph"
Cohesion: 0.33
Nodes (5): LevelGlyph(), styles, LevelOption(), Props, styles

### Community 59 - "Category Tray & Hand-set Tokens"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 60 - "Ratings"
Cohesion: 0.57
Nodes (7): rate_booking() SQL function, reviews table, R2 ratings (Rate sheet on completed bookings), R2.3 Instructor average and count update at once, reviews table (one per booking, 1-5 stars, body <= 1000), rate_booking() (one rating per completed booking, moves instructor average), pgTAP 06_ratings (13 tests: star bounds, completed-only, rate once, average and count, review RLS, signed-out refused)

### Community 61 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 62 - "App Entry & Package"
Cohesion: 0.40
Nodes (3): GalleryRoute(), Gallery(), @testing-library/react-native

### Community 63 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 64 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 65 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 67 - "Product in One Page (Handoff)"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **55 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+50 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 481 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Working Agreement & Phase 1 Design` to `Date Formatting & Time Slots`, `Icons, Rows & Interest Tiles`, `E2E Journey & Arabic Strings`, `Arabic Copy & Dev Machine`, `Design · 20261106130000 Engagement Functions`, `Decisions Log & Expo Docs Rule`, `Payment Settlement & Reminders`, `Phase 2 Engagement (Spec, Schema, Screens)`, `Checkout, Demo Pay & Reminders`, `Project Guide & Design Sources`, `Working Agreement`, `Design · Working Agreement`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Root Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.07198748043818466 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Design Tokens Pipeline`, `E2E Journey & Arabic Strings`, `Arabic Copy & Dev Machine`, `Phase 1 Design Notes`, `Payment Settlement & Reminders`, `Phase 2 Engagement (Spec, Schema, Screens)`, `Working Agreement & Phase 1 Design`, `Design · Demo Instructors`, `Project Guide & Design Sources`, `Phase 1 Requirements & Decisions`, `Nav Bar & Selection Lens Spec`, `CI Jobs & Checks`, `Working Agreement`, `Product Brief`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **Should `Date Formatting & Time Slots` be split into smaller, more focused modules?**
  _Cohesion score 0.08583959899749373 - nodes in this community are weakly interconnected._
- **Why does `Phase 2 technical design` connect `Testing Strategy & Monorepo` to `E2E Journey & Arabic Strings`, `Design · 20261106130000 Engagement Functions`, `Phase 2 Engagement (Spec, Schema, Screens)`, `Working Agreement & Phase 1 Design`, `Design · Demo Instructors`, `Testing Strategy & Monorepo 2`, `Design · Working Agreement`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._