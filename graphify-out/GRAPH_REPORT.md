# Graph Report - Coaching app  (2026-11-06)

## Corpus Check
- 4 files · ~128,429 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1492 nodes · 4710 edges · 72 communities (67 shown, 5 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 289 edges (avg confidence: 0.85)
- Token cost: 32,000 input · 9,000 output

## Community Hubs (Navigation)
- Phase 2 Engagement (Spec, Schema, Screens)
- Level Options & Colour Types
- Working Agreement & Phase 1 Design
- E2E Journey & Arabic Strings
- Bookings Filter & Types
- Small UI Pieces (Icons, Rows, Filter Button)
- Day Picker, Icon Button & Theme Types
- Icons, Rows & Interest Tiles
- Gallery Screen & Theme
- Design Tokens Pipeline
- Token Generator Script
- Decisions Log & Expo Docs Rule
- Paymob
- Workshop Seats
- Working Agreement
- Glass Component
- Project Guide & Design Sources
- Explore Filters Sheet
- Interests Screen & Tests
- Mobile Runtime Dependencies
- Text & Time Slot Components
- Checkout, Demo Pay & Reminders
- Expo App Config
- Mobile Package Manifest
- Cards & Booking Card
- Product Overview (Handoff)
- Root Stack
- Arabic Copy & Dev Machine
- Instructor Profile Data
- Root Package & Scripts
- Review, Pay & Confirmed
- CI Jobs & Checks
- Product Brief
- Confirmed & Checkout Tests
- Nav Bar & Selection Lens Spec
- Phone Sign-up & Verify
- Explore Tests
- Gallery E2E & Dev Setup
- App Entry & Package
- Root Layout & Query Client
- Home Data & Time Rules
- Reminders
- Phase 1 Design Notes
- Seed Data & Gallery Copy
- Mobile TypeScript Config
- Brand Tokens (Purple & Gold)
- Onboarding Screens
- Date Formatting & Time Slots
- Time Slots
- Seed Instructors & Workshops
- i18n Keys
- Category Tray & Hand-set Tokens
- Mobile Dev Dependencies
- Tokens Package Manifest
- Phase 0 Report & Requirements
- Base TypeScript Config
- Who & Where Onboarding
- Design Handoff
- Payment Settlement & Reminders
- Glass Chrome Specs (Tabs, Sheets)
- Category Tray & Explore Specs
- Mobile npm Scripts
- Lint Config
- Gallerycopy
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
4. `Decisions log (DECISIONS.md)` - 72 edges
5. `react-i18next` - 48 edges
6. `react` - 46 edges
7. `Arabic app strings to translate` - 46 edges
8. `useLang()` - 44 edges
9. `Button()` - 39 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `R6 calendar (Add to calendar)` --references--> `Confirmed()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/confirmed/[ref].tsx
- `Floating map/list IconButton on Explore (D68)` --references--> `Icon()`  [EXTRACTED]
  specs/phase-2/design.md → apps/mobile/src/ui/Icon.tsx
- `Floating map/list IconButton on Explore (D68)` --references--> `Explore()`  [INFERRED]
  specs/phase-2/design.md → apps/mobile/src/app/(tabs)/explore.tsx
- `R4.1 Floating round glass map button (D68)` --references--> `Explore()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/(tabs)/explore.tsx
- `R1.9 Message entry points Phase 1 hid` --references--> `BookingDetail()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/booking/[ref].tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Chat RLS model (membership, own markers, server time)** — supabase_migrations_20261106120000_engagement_threads, supabase_migrations_20261106120000_engagement_messages, supabase_migrations_20261106120000_engagement_thread_reads, supabase_migrations_20261106120000_engagement_is_thread_member, supabase_migrations_20261106120000_engagement_my_instructor_id, supabase_migrations_20261106120000_engagement_my_threads [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Phase 2 text chat flow** — specs_phase_2_requirements_r1, specs_phase_2_design_threads_table, specs_phase_2_design_messages_table, specs_phase_2_design_thread_reads_table, specs_phase_2_design_start_thread, specs_phase_2_design_realtime_channels, specs_phase_2_design_chat_client, specs_phase_2_tasks_t4, specs_phase_2_tasks_t5 [EXTRACTED 1.00]
- **Recurring weekly series (book, pay, cancel)** — specs_phase_2_requirements_r5, specs_phase_2_design_book_series, specs_phase_2_design_book_one, specs_phase_2_design_series_payments, specs_phase_2_design_cancel_booking_every_week, specs_phase_2_design_bookings_series_id, specs_phase_2_tasks_t10, specs_phase_2_tasks_t11 [EXTRACTED 1.00]
- **Phase 2 spec gate (draft, owner answers, approval)** — docs_decisions_d66, docs_decisions_d67, docs_decisions_d68, specs_phase_2_requirements, specs_phase_2_design, specs_phase_2_tasks, specs_phase_1_report_phase2_outline [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (72 total, 5 thin omitted)

### Community 0 - "Phase 2 Engagement (Spec, Schema, Screens)"
Cohesion: 0.05
Nodes (92): Last seat goes to one of 20 bookings step, Supabase CLI pinned to 2.121.0, supabase job (db reset, lint, pgTAP), react-native-maps, BookingDetail(), InstructorProfile(), Explore(), Messages() (+84 more)

### Community 1 - "Level Options & Colour Types"
Cohesion: 0.13
Nodes (40): styles, Welcome(), KIDS_AGE, styles, styles, styles, styles, styles (+32 more)

### Community 2 - "Working Agreement & Phase 1 Design"
Cohesion: 0.07
Nodes (50): cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, Cancel sheet credit wording ("Cancel and get N EGP credit"), grant_credit() ops function, Profile app credit row (+42 more)

### Community 3 - "E2E Journey & Arabic Strings"
Cohesion: 0.06
Nodes (45): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 3. Category tray, 2. Sign up and verify, land on Home, Demo sign-in (Supabase test number), Arabic app strings to translate, App credit strings (review, cancel, profile), Appearance sheet strings (3) (+37 more)

### Community 4 - "Bookings Filter & Types"
Cohesion: 0.09
Nodes (40): BookingsFilter(), KINDS, styles, TIMES, Confirmed(), Bookings(), styles, Tab (+32 more)

### Community 5 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.09
Nodes (33): styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, useTheme() (+25 more)

### Community 6 - "Day Picker, Icon Button & Theme Types"
Cohesion: 0.09
Nodes (29): styles, GallerySheet(), styles, Scheme, Props, styles, Day, DayPicker() (+21 more)

### Community 7 - "Icons, Rows & Interest Tiles"
Cohesion: 0.09
Nodes (28): styles, Props, styles, ConfirmationRing(), styles, styles, Props, styles (+20 more)

### Community 8 - "Gallery Screen & Theme"
Cohesion: 0.08
Nodes (31): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), styles, LANGS, LanguageSheet(), styles (+23 more)

### Community 9 - "Design Tokens Pipeline"
Cohesion: 0.09
Nodes (32): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+24 more)

### Community 10 - "Token Generator Script"
Cohesion: 0.08
Nodes (28): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+20 more)

### Community 11 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (8): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Brand commitments, Design canvas and design system artifacts, cfa design system artifact, Decisions log (DECISIONS.md), GlassGroup (GlassEffectContainer), Buttons (mostly screen-reader labels) strings (6)

### Community 12 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 13 - "Workshop Seats"
Cohesion: 0.09
Nodes (27): Book(), Reschedule(), Workshop(), days, mockData, mockFamily, mockParams, now (+19 more)

### Community 14 - "Working Agreement"
Cohesion: 0.09
Nodes (20): CI workflow, checks job (lint, typecheck, tests, tokens), edge-functions job (Deno check and tests), Evidence on hand, Coach For All app, Project Map page (build-data.mjs, republished artifact), Neutral photo placeholders (no real photos yet), Working agreement (+12 more)

### Community 15 - "Glass Component"
Cohesion: 0.13
Nodes (19): useIsRTL(), useA11y(), ButtonVariant, Props, styles, CATEGORIES, CategoryButton(), Props (+11 more)

### Community 16 - "Project Guide & Design Sources"
Cohesion: 0.08
Nodes (27): 4. Book two workshop seats, Book screen, Booking card, Bookings Filter sheet, Explore Filters sheet, Group page, MonthCalendar, Reschedule screen (+19 more)

### Community 17 - "Explore Filters Sheet"
Cohesion: 0.12
Nodes (28): styles, TYPES, WHEN, Availability, byKey(), DEFAULT_FILTERS, DISTANCES, ExploreState (+20 more)

### Community 18 - "Interests Screen & Tests"
Cohesion: 0.10
Nodes (25): Interests(), AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), Profile (+17 more)

### Community 19 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+21 more)

### Community 20 - "Text & Time Slot Components"
Cohesion: 0.14
Nodes (18): styles, Family(), styles, formatEgMobile(), Banner(), styles, DashedCard(), styles (+10 more)

### Community 21 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.09
Nodes (24): CancelSheet(), REASONS, styles, DemoCheckout(), cancelOutcome(), MY_BOOKING_COLUMNS, applyPromo(), Booking (+16 more)

### Community 22 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 23 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (22): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+14 more)

### Community 24 - "Cards & Booking Card"
Cohesion: 0.16
Nodes (16): styles, formatNumber(), BookingCard(), Props, styles, Card(), Props, styles (+8 more)

### Community 25 - "Product Overview (Handoff)"
Cohesion: 0.13
Nodes (22): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+14 more)

### Community 26 - "Root Stack"
Cohesion: 0.15
Nodes (17): ORDER, ROUTE, GlassGroup(), GlassLens(), useGlassLens(), Props, restoreTabBar(), styles (+9 more)

### Community 27 - "Arabic Copy & Dev Machine"
Cohesion: 0.13
Nodes (16): 1. Onboarding: Categories, Interests, Levels, Who & where, Operating context: categories, journey, rules, useReminderSync, Interests and levels strings (3), Onboarding levels strings (1), Onboarding strings (36), Remind me sheet strings (6), Reminder notification strings (1) (+8 more)

### Community 28 - "Instructor Profile Data"
Cohesion: 0.13
Nodes (15): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+7 more)

### Community 29 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 30 - "Review, Pay & Confirmed"
Cohesion: 0.17
Nodes (13): Cancel sheet fits its content (fitToContents), group_level_labels data migration, Groups and level-label migrations pushed to hosted project, refresh_demo_slots.sql demo times script, T23 four UI fixes (nav fade, fact tiles, dark thumb, Home capital), Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules (+5 more)

### Community 31 - "CI Jobs & Checks"
Cohesion: 0.20
Nodes (12): Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, Phase 1 Maestro journey (R10.1), apps/mobile/e2e/fixture.sql (pins two class times), Venue panel instead of map on Android without Maps key (+4 more)

### Community 32 - "Product Brief"
Cohesion: 0.17
Nodes (12): PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Platform: iPhone-first, adaptive, Positioning, Product principles, Product purpose: directory and booking, Users: Cairo adults booking lessons (+4 more)

### Community 33 - "Confirmed & Checkout Tests"
Cohesion: 0.14
Nodes (15): RemindSheet(), Review(), booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate, mockParams (+7 more)

### Community 34 - "Nav Bar & Selection Lens Spec"
Cohesion: 0.18
Nodes (10): The Glass Is Apple's Rule, Navigation (native tabs, glass), Android tab bar returns on landing on a tab, GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar, Segmented control, Tab bar strings (1) (+2 more)

### Community 35 - "Phone Sign-up & Verify"
Cohesion: 0.19
Nodes (12): SignOutSheet(), authErrorKey(), e164(), isValidEgMobile(), sendCode(), signOut(), mockSend, mockVerify (+4 more)

### Community 36 - "Explore Tests"
Cohesion: 0.14
Nodes (13): activeFilterCount(), Filters, OfferingPrice, at(), base, card(), dina, hany (+5 more)

### Community 37 - "Gallery E2E & Dev Setup"
Cohesion: 0.20
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 38 - "App Entry & Package"
Cohesion: 0.19
Nodes (6): GalleryRoute(), mockSave, Gallery(), useSettings, useApplyThemeOverride(), @testing-library/react-native

### Community 39 - "Root Layout & Query Client"
Cohesion: 0.19
Nodes (10): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useSheetOptions(), Toast() (+2 more)

### Community 40 - "Home Data & Time Rules"
Cohesion: 0.20
Nodes (11): Home(), cairo(), Departure, greetingPeriod(), GroupSessionRow, InstructorCardRow, MyBookingRow, mockBookings (+3 more)

### Community 41 - "Reminders"
Cohesion: 0.18
Nodes (10): MyBooking, DEFAULT_REMINDER, ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync() (+2 more)

### Community 42 - "Phase 1 Design Notes"
Cohesion: 0.14
Nodes (13): 14. Sample content (seed data), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+5 more)

### Community 43 - "Seed Data & Gallery Copy"
Cohesion: 0.19
Nodes (9): A11yFlag, Settings, off, A11y, isContrast(), mergeA11y(), resolveScheme(), @react-native-async-storage/async-storage (+1 more)

### Community 44 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 45 - "Brand Tokens (Purple & Gold)"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 46 - "Onboarding Screens"
Cohesion: 0.30
Nodes (11): SignUp(), FiltersSheet(), Categories(), Levels(), Preferences(), disciplineName(), saveInterests(), useApplyDraftAfterSignUp() (+3 more)

### Community 47 - "Date Formatting & Time Slots"
Cohesion: 0.32
Nodes (10): dateFormat(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth(), formatMonthYear(), formatTime(), formatYear() (+2 more)

### Community 48 - "Time Slots"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 49 - "Seed Instructors & Workshops"
Cohesion: 0.27
Nodes (9): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, Instructor (+1 more)

### Community 50 - "i18n Keys"
Cohesion: 0.22
Nodes (6): i18n, keys(), missingArabicKeys(), Tree, Lang, fitLines()

### Community 51 - "Category Tray & Hand-set Tokens"
Cohesion: 0.20
Nodes (9): CategoryTray(), Radio(), openTray(), component, homeIndicator, icon, layout, motion (+1 more)

### Community 52 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 53 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 54 - "Phase 0 Report & Requirements"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 55 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 56 - "Who & Where Onboarding"
Cohesion: 0.33
Nodes (7): Profile(), styles, Interest, Level, useArea(), useInterests(), useCredit()

### Community 57 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 58 - "Payment Settlement & Reminders"
Cohesion: 0.36
Nodes (6): 6. Pay by card with fake provider, Refresh bookings, seats and board after settled payment, Review & pay, Demo payment strings (5), R11.11 Price only on Review & pay, T16: PaymentProvider + Edge Functions

### Community 59 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 60 - "Category Tray & Explore Specs"
Cohesion: 0.33
Nodes (7): Gallery flow: open tray and pick Sports, 6.2 Category tray, 7.5 Explore, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), R5 discovery, R5.3 Explore

### Community 61 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 62 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 63 - "Gallerycopy"
Cohesion: 0.40
Nodes (3): ar, en, galleryCopy

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Working Agreement & Phase 1 Design` to `Phase 2 Requirements (Map, Ratings, Calendar)`, `Level Options & Colour Types`, `E2E Journey & Arabic Strings`, `Design Tokens Pipeline`, `Decisions Log & Expo Docs Rule`, `Working Agreement`, `Checkout, Demo Pay & Reminders`, `Who & Where Onboarding`, `Payment Settlement & Reminders`, `Arabic Copy & Dev Machine`, `Review, Pay & Confirmed`?**
  _High betweenness centrality (0.289) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Phase 2 Requirements (Map, Ratings, Calendar)` be split into smaller, more focused modules?**
  _Cohesion score 0.0537280701754386 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Product · Decisions`, `Phase 2 Requirements (Map, Ratings, Calendar)`, `Nav Bar & Selection Lens Spec`, `E2E Journey & Arabic Strings`, `Working Agreement & Phase 1 Design`, `Design Tokens Pipeline`, `Phase 1 Design Notes`, `Working Agreement`, `Project Guide & Design Sources`, `Payment Settlement & Reminders`, `Arabic Copy & Dev Machine`, `Review, Pay & Confirmed`, `CI Jobs & Checks`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Should `Level Options & Colour Types` be split into smaller, more focused modules?**
  _Cohesion score 0.12764670296430733 - nodes in this community are weakly interconnected._
- **Why does `Coach For All design handoff` connect `Product Overview (Handoff)` to `Liquid Glass Materials`, `Phase 2 Requirements (Map, Ratings, Calendar)`, `Design Handoff 2`, `Gallery E2E & Dev Setup`, `Arabic Copy & Dev Machine`, `Design Tokens Pipeline`, `Phase 1 Design Notes`, `Decisions Log & Expo Docs Rule`, `Brand Tokens (Purple & Gold)`, `Working Agreement`, `Design Handoff`, `Glass Chrome Specs (Tabs, Sheets)`, `Category Tray & Explore Specs`, `Review, Pay & Confirmed`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._