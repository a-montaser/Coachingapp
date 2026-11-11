# Graph Report - Coaching app  (2026-11-11)

## Corpus Check
- 0 files · ~154,198 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1705 nodes · 5648 edges · 78 communities (73 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 376 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Cards & Booking Card
- Home Data & Time Rules
- Bookings Filter & Types
- Chat Requirements & Screens
- Interests Screen & Tests
- Decisions Log & Expo Docs Rule
- E2E Journey & Arabic Strings
- Settings, i18n Keys & Shell Tests
- Paymob
- Gallery Screen & Theme
- Workshop Seats
- Design Tokens Pipeline
- Date Formatting & Time Slots
- CI Jobs & Project Guide
- Payment Settlement & Reminders
- Mobile Runtime Dependencies
- Text & Time Slot Components
- Phase 1 Design: Auth, Payments & Boundaries
- Working Agreement & Phase 1 Design
- Explore, Map & Calendar Specs
- Accessibility & Glass Lens
- Product Overview (Handoff)
- CI Jobs & Checks
- Testing Strategy & Monorepo
- Expo App Config
- Mobile Package Manifest
- Project Guide & Design Sources
- Engagement Schema & CI Database Job
- Checkout, Demo Pay & Reminders
- Reminders
- Root Package & Scripts
- Instructor Profile Data
- Realtime
- Confirmed & Checkout Tests
- Phase 1 Requirements & Decisions
- Phone Sign-up & Verify
- Weekly Series & Phase 2 Functions
- Manual Test & Phase 3 Gate
- Root Stack
- Token Generator Script
- Theme Tokens & Basics Tests
- Concurrency
- Gallery E2E & Dev Setup
- Phase 1 Design Notes
- Mobile TypeScript Config
- Brand Tokens (Purple & Gold)
- Working Agreement
- Root Layout & Query Client
- Onboarding Screens
- Glass Component & Sheets
- Phase 0 Report & Requirements
- Onboarding Draft & Save
- Instructor Sign-in & Tabs
- Mobile Dev Dependencies
- Family, Account & Interests Data
- Glass Component
- Phase Boundaries & Skills
- Tokens Package Manifest
- Base TypeScript Config
- Book Screen Tests
- Arabic Copy & Dev Machine
- Design Handoff
- Ratings
- Text Field & Family Member Sheet
- Account Data & Supabase Client
- Time Slots
- Glass Chrome Specs (Tabs, Sheets)
- Tokens Test · Generate
- Category Tray & Hand-set Tokens
- Liquid Glass Materials
- Mobile npm Scripts
- Lint Config
- Jest Config
- Code Entry Screen
- Product in One Page (Handoff)
- Account Data & Gallery Copy
- Onboarding Layout
- Deno Config

## God Nodes (most connected - your core abstractions)
1. `react-native` - 110 edges
2. `useTheme()` - 93 edges
3. `T()` - 88 edges
4. `Decisions log (DECISIONS.md)` - 84 edges
5. `react` - 54 edges
6. `react-i18next` - 52 edges
7. `Arabic app strings to translate` - 52 edges
8. `useLang()` - 50 edges
9. `Icon()` - 45 edges
10. `expo-router` - 43 edges

## Surprising Connections (you probably didn't know these)
- `ThreadRow()` --implements--> `D71: T4 Messages and Chat (text) choices`  [INFERRED]
  apps/mobile/src/ui/ThreadRow.tsx → docs/DECISIONS.md
- `Floating map/list IconButton on Explore (D68)` --references--> `Explore()`  [INFERRED]
  specs/phase-2/design.md → apps/mobile/src/app/(tabs)/explore.tsx
- `R4.1 Floating round glass map button (D68)` --references--> `Explore()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/(tabs)/explore.tsx
- `BookingDetail()` --implements--> `D71: T4 Messages and Chat (text) choices`  [INFERRED]
  apps/mobile/src/app/booking/[ref].tsx → docs/DECISIONS.md
- `R1.9 Message entry points Phase 1 hid` --references--> `BookingDetail()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/booking/[ref].tsx

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

## Communities (78 total, 5 thin omitted)

### Community 0 - "Cards & Booking Card"
Cohesion: 0.05
Nodes (89): styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, formatNumber() (+81 more)

### Community 1 - "Home Data & Time Rules"
Cohesion: 0.05
Nodes (76): Favourites(), FiltersSheet(), styles, TYPES, WHEN, Levels(), SortSheet(), Explore() (+68 more)

### Community 2 - "Bookings Filter & Types"
Cohesion: 0.08
Nodes (61): BookingDetail(), styles, BookingsFilter(), KINDS, styles, TIMES, CancelSheet(), REASONS (+53 more)

### Community 3 - "Chat Requirements & Screens"
Cohesion: 0.06
Nodes (63): Chat(), GalleryRoute(), InstructorProfile(), INSTRUCTOR_TABS, ORDER, ROUTE, TabsLayout(), Messages() (+55 more)

### Community 4 - "Interests Screen & Tests"
Cohesion: 0.09
Nodes (49): Welcome(), styles, styles, GallerySheet(), styles, styles, Categories(), styles (+41 more)

### Community 5 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.05
Nodes (19): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Brand commitments, Platform: iPhone-first, adaptive, Positioning, Product principles (+11 more)

### Community 6 - "E2E Journey & Arabic Strings"
Cohesion: 0.07
Nodes (44): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 3. Category tray, 2. Sign up and verify, land on Home, Capabilities and constraints, Arabic app strings to translate, Add to calendar strings (3), App credit strings (review, cancel, profile) (+36 more)

### Community 7 - "Settings, i18n Keys & Shell Tests"
Cohesion: 0.09
Nodes (19): Preferences(), mockLines, clients, mockWrite, mockSave, mockRpc, mockParams, mockSave (+11 more)

### Community 8 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 9 - "Gallery Screen & Theme"
Cohesion: 0.14
Nodes (22): AppearanceSheet(), styles, THEMES, styles, TFn, styles, LANGS, LanguageSheet() (+14 more)

### Community 10 - "Workshop Seats"
Cohesion: 0.14
Nodes (29): Book(), KIDS_AGE, styles, Reschedule(), styles, Workshop(), repeatTexts(), useBookDraft (+21 more)

### Community 11 - "Design Tokens Pipeline"
Cohesion: 0.10
Nodes (27): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+19 more)

### Community 12 - "Date Formatting & Time Slots"
Cohesion: 0.12
Nodes (24): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, when() (+16 more)

### Community 13 - "CI Jobs & Project Guide"
Cohesion: 0.10
Nodes (20): CI workflow, checks job (lint, typecheck, tests, tokens), 15. Rate the finished 1:1 from Past, Evidence on hand, Coach For All app, Project Map page (build-data.mjs, republished artifact), Cancel sheet fits its content (fitToContents), Neutral photo placeholders (no real photos yet) (+12 more)

### Community 14 - "Payment Settlement & Reminders"
Cohesion: 0.09
Nodes (23): edge-functions job (Deno check and tests), 1. Onboarding: Categories, Interests, Levels, Who & where, 6. Pay by card with fake provider, Operating context: categories, journey, rules, Refresh bookings, seats and board after settled payment, useReminderSync, Review & pay, Confirmed strings (19) (+15 more)

### Community 15 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-calendar, expo-constants, expo-font, expo-glass-effect (+22 more)

### Community 16 - "Text & Time Slot Components"
Cohesion: 0.10
Nodes (22): styles, Family(), styles, Banner(), styles, Props, styles, DashedCard() (+14 more)

### Community 17 - "Phase 1 Design: Auth, Payments & Boundaries"
Cohesion: 0.11
Nodes (29): Review & pay "Use my app credit" switch, Phase 1 technical design, App shape and routes, apply_promo() SQL function, Auth (Supabase phone OTP), book() SQL function, Booking ref CFA-#####, Component library (+21 more)

### Community 18 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (27): cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, 14. Cancel every week (1,300 EGP credit), Migration 20261105120000_app_credit.sql, Cancel sheet credit wording ("Cancel and get N EGP credit"), Profile app credit row (+19 more)

### Community 19 - "Explore, Map & Calendar Specs"
Cohesion: 0.13
Nodes (24): Phase 2 Maestro journey additions (R8.1), 13. Book her 1:1 for two weeks (Repeat weekly), 11. Favourite Nour from Explore, 16. Nour in Profile Favourites, 12. Message Nour; reply arrives live, Explore map strings (7), Favourites and hearts strings (6), Weekly series strings (Repeat weekly, Cancel every week) (14) (+16 more)

### Community 20 - "Accessibility & Glass Lens"
Cohesion: 0.13
Nodes (19): A11yFlag, A11y, isContrast(), mergeA11y(), useA11y(), Props, styles, GlassLens() (+11 more)

### Community 21 - "Product Overview (Handoff)"
Cohesion: 0.11
Nodes (25): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+17 more)

### Community 22 - "CI Jobs & Checks"
Cohesion: 0.13
Nodes (18): Local Supabase with fake provider and fixture, e2e job (Maestro Phase 1 + Phase 2 journey on Android emulator), e2e screen recording artifact upload, Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, ci.sh script, helper.sh script (+10 more)

### Community 23 - "Testing Strategy & Monorepo"
Cohesion: 0.16
Nodes (22): Live chat Realtime test step (supabase/tests/realtime.mjs), react-native-maps, Testing and CI, Phase 2 technical design, bookings.series_id column, Chat client (idempotent send, typing broadcast, mark read), data/chat.ts (threads, messages, send, realtime hooks), Engagement migration (2026111xxxxxxx_engagement.sql) (+14 more)

### Community 24 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 25 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (24): expo, main, name, private, version, @cfa/tokens, expo, expo-blur (+16 more)

### Community 26 - "Project Guide & Design Sources"
Cohesion: 0.12
Nodes (18): 4. Book two workshop seats, Book screen, group_level_labels data migration, Group page, Groups and level-label migrations pushed to hosted project, MonthCalendar, Reschedule screen, T23 four UI fixes (nav fade, fact tiles, dark thumb, Home capital) (+10 more)

### Community 27 - "Engagement Schema & CI Database Job"
Cohesion: 0.25
Nodes (22): Last seat goes to one of 20 bookings step, Supabase CLI pinned to 2.121.0, supabase job (db reset, lint, pgTAP), T4: Concurrency test, R1.1 One thread per learner and instructor (RLS), T1: Engagement migration (done, CI green), 20261106120000_engagement.sql (engagement migration), bookings.series_id column + partial index (+14 more)

### Community 28 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.10
Nodes (21): CreditHistory(), creditSubtitle(), creditTitle(), DemoCheckout(), Profile(), MY_BOOKING_COLUMNS, Booking, cancelBooking() (+13 more)

### Community 29 - "Reminders"
Cohesion: 0.13
Nodes (17): MyBooking, DEFAULT_REMINDER, ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync() (+9 more)

### Community 30 - "Root Package & Scripts"
Cohesion: 0.09
Nodes (21): dependencies, expo, devDependencies, supabase, engines, node, expo, name (+13 more)

### Community 31 - "Instructor Profile Data"
Cohesion: 0.14
Nodes (14): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+6 more)

### Community 32 - "Realtime"
Cohesion: 0.10
Nodes (13): admin, arrived, coachMsgs, got, [learner, coach, outsider], learnerMsgs, learnerReads, outsiderMsgs (+5 more)

### Community 33 - "Confirmed & Checkout Tests"
Cohesion: 0.13
Nodes (18): Review(), applyPromo(), placeBooking(), booking(), inDays(), mockAddEvent, mockCheckout, mockDemoPay (+10 more)

### Community 34 - "Phase 1 Requirements & Decisions"
Cohesion: 0.13
Nodes (15): Booking card, Bookings Filter sheet, Explore Filters sheet, Booking detail strings (13), Bookings strings (41), Explore, Filters and Sort strings (43), Time slots strings (6), R11 Owner revision (D54) (+7 more)

### Community 35 - "Phone Sign-up & Verify"
Cohesion: 0.19
Nodes (14): SignUp(), styles, authErrorKey(), e164(), formatEgMobile(), isValidEgMobile(), Profile, sendCode() (+6 more)

### Community 36 - "Weekly Series & Phase 2 Functions"
Cohesion: 0.22
Nodes (18): my_bookings view, reschedule_booking() SQL function, book_series() SQL function (calls book() once per week), cancel_booking(every_week) branch, my_bookings gains series_id, reschedule_booking() wrapper (moved week leaves the series), R5.2 One atomic booking of all weeks (book_series), R5.5 Cancel every week switch (+10 more)

### Community 37 - "Manual Test & Phase 3 Gate"
Cohesion: 0.17
Nodes (13): Phase 2 waiting at the Phase 3 gate (draft specs/phase-3 on approval), grant_credit() ops function, refresh_demo_slots.sql demo times script, Manual end-to-end test on the iPhone (22 steps), Before you start: Metro, test sign-ins, second phone as Nour, Dark mode and background catch-up checks, Part 1: the booking loop (Phase 1), Part 2: what Phase 2 added (favourites, calendar, chat, series, rate, map, instructor side) (+5 more)

### Community 38 - "Root Stack"
Cohesion: 0.20
Nodes (11): Props, styles, TabBar(), TabIcon(), TABS, useMinimiseOnScroll(), useTabBarBottom(), useTabBarMinimised() (+3 more)

### Community 39 - "Token Generator Script"
Cohesion: 0.23
Nodes (14): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+6 more)

### Community 40 - "Theme Tokens & Basics Tests"
Cohesion: 0.15
Nodes (11): off, resolveScheme(), SegmentedControl(), blur, dark, light, radius, shadow (+3 more)

### Community 41 - "Concurrency"
Cohesion: 0.15
Nodes (10): b64(), jwt(), noSeats, seriesRefused, seriesWins, starts, taken, week0 (+2 more)

### Community 42 - "Gallery E2E & Dev Setup"
Cohesion: 0.22
Nodes (13): Maestro gallery E2E flow, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce), Sheet as formSheet route; CategoryTray as custom Modal with Reanimated (+5 more)

### Community 43 - "Phase 1 Design Notes"
Cohesion: 0.17
Nodes (12): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format, T21 CategoryTray + trigger (+4 more)

### Community 44 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 45 - "Brand Tokens (Purple & Gold)"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 46 - "Working Agreement"
Cohesion: 0.23
Nodes (8): The Glass Is Apple's Rule, Navigation (native tabs, glass), Android tab bar returns on landing on a tab, GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar, Segmented control, Tab bar strings (1)

### Community 47 - "Root Layout & Query Client"
Cohesion: 0.23
Nodes (10): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useApplyThemeOverride(), useToast (+2 more)

### Community 48 - "Onboarding Screens"
Cohesion: 0.17
Nodes (9): Interests(), Area, nearestArea(), mockAreas, mockBuilder, mockCalls, mockDisciplines, mockRefetch (+1 more)

### Community 49 - "Glass Component & Sheets"
Cohesion: 0.27
Nodes (8): useIsRTL(), Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props, flat(), useSheetOptions()

### Community 50 - "Phase 0 Report & Requirements"
Cohesion: 0.23
Nodes (12): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+4 more)

### Community 51 - "Onboarding Draft & Save"
Cohesion: 0.22
Nodes (10): Discipline, Draft, empty, finishOnboarding(), LEVELS, saveInterests(), useApplyDraftAfterSignUp(), useAreas() (+2 more)

### Community 52 - "Instructor Sign-in & Tabs"
Cohesion: 0.42
Nodes (9): Demo sign-in: Omar, code 111111 hosted / 482917 local and CI; instructors Yasmine and Nour, instructors.user_id column, Instructor journey gate (Messages and Profile tab bar, D69), R1.2 Instructor sign-in for chat (instructors.user_id; Messages and Profile tabs), T3: Seed and push; instructors see Messages and Profile (done, D69, D70), instructors.user_id column (unique, auth.users, on delete set null), demo_instructors.sql (demo instructor sign-ins and demo chat), Demo thread Omar and Nour (two messages) (+1 more)

### Community 53 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 54 - "Family, Account & Interests Data"
Cohesion: 0.22
Nodes (9): CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits(), usePendingKidsBookings(), useSaveFamilyMember() (+1 more)

### Community 55 - "Glass Component"
Cohesion: 0.29
Nodes (7): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray()

### Community 56 - "Phase Boundaries & Skills"
Cohesion: 0.20
Nodes (6): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, Boundaries, Proposed Phase 2 spec outline (Engagement), Phase 2 boundaries (always / ask first / never)

### Community 57 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 58 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 59 - "Book Screen Tests"
Cohesion: 0.22
Nodes (6): days, mockData, mockFamily, mockParams, now, weekDays()

### Community 60 - "Arabic Copy & Dev Machine"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 61 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 62 - "Ratings"
Cohesion: 0.39
Nodes (9): Rate sheet strings (11), rate_booking() SQL function, reviews table, R2 ratings (Rate sheet on completed bookings), R2.3 Instructor average and count update at once, T6: Rate sheet (done), reviews table (one per booking, 1-5 stars, body <= 1000), rate_booking() (one rating per completed booking, moves instructor average) (+1 more)

### Community 63 - "Text Field & Family Member Sheet"
Cohesion: 0.32
Nodes (6): FamilyMemberSheet(), styles, useFamily(), Props, styles, TextField()

### Community 64 - "Account Data & Supabase Client"
Cohesion: 0.29
Nodes (6): Interest, Level, useArea(), supabase, supabaseConfigured, @supabase/supabase-js

### Community 65 - "Time Slots"
Cohesion: 0.29
Nodes (7): setLanguage(), sat, slots, groupSlots(), PartOfDay, Slot, TimeSlots()

### Community 66 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 68 - "Category Tray & Hand-set Tokens"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 69 - "Liquid Glass Materials"
Cohesion: 0.47
Nodes (6): Gallery flow: Reduce Transparency / Increase Contrast screenshots, 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 70 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 71 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 72 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 74 - "Product in One Page (Handoff)"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **59 isolated node(s):** `expo`, `@cfa/tokens`, `expo`, `expo-localization`, `jest` (+54 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 543 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Phase 1 Requirements & Decisions`, `Chat Requirements & Screens`, `Manual Test & Phase 3 Gate`, `E2E Journey & Arabic Strings`, `Phase 1 Design Notes`, `Design Tokens Pipeline`, `CI Jobs & Project Guide`, `Payment Settlement & Reminders`, `Working Agreement`, `Working Agreement & Phase 1 Design`, `Explore, Map & Calendar Specs`, `Instructor Sign-in & Tabs`, `CI Jobs & Checks`, `Testing Strategy & Monorepo`, `Phase Boundaries & Skills`, `Project Guide & Design Sources`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **What connects `expo`, `@cfa/tokens`, `expo` to the rest of the system?**
  _59 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cards & Booking Card` be split into smaller, more focused modules?**
  _Cohesion score 0.04949314251639833 - nodes in this community are weakly interconnected._
- **Why does `D64: Refunds are app credit` connect `Working Agreement & Phase 1 Design` to `Bookings Filter & Types`, `Interests Screen & Tests`, `Decisions Log & Expo Docs Rule`, `Manual Test & Phase 3 Gate`, `E2E Journey & Arabic Strings`, `Weekly Series & Phase 2 Functions`, `Gallery Screen & Theme`, `Payment Settlement & Reminders`, `Phase 1 Design: Auth, Payments & Boundaries`, `Explore, Map & Calendar Specs`, `Project Guide & Design Sources`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `Home Data & Time Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.0506155950752394 - nodes in this community are weakly interconnected._
- **Why does `Phase 2 technical design` connect `Testing Strategy & Monorepo` to `Weekly Series & Phase 2 Functions`, `E2E Journey & Arabic Strings`, `Phase 1 Design: Auth, Payments & Boundaries`, `Working Agreement & Phase 1 Design`, `Explore, Map & Calendar Specs`, `Instructor Sign-in & Tabs`, `Phase Boundaries & Skills`, `Ratings`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._