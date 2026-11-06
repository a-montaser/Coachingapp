# Graph Report - Coaching app  (2026-11-06)

## Corpus Check
- 6 files · ~126,129 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1475 nodes · 4630 edges · 73 communities (68 shown, 5 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 255 edges (avg confidence: 0.84)
- Token cost: 62,000 input · 11,000 output

## Community Hubs (Navigation)
- Small UI Pieces (Icons, Rows, Filter Button)
- Level Options & Colour Types
- Decisions Log & Expo Docs Rule
- Onboarding Screens
- Bookings Filter & Types
- E2E Journey & Arabic Strings
- Gallery Screen & Theme
- Paymob
- Text & Time Slot Components
- Root Stack
- Workshop Seats
- Explore Filters Sheet
- Token Generator Script
- Mobile Runtime Dependencies
- Nav Bar & Selection Lens Spec
- Date Formatting & Time Slots
- Working Agreement & Phase 1 Design
- CI Jobs & Checks
- Project Guide & Design Sources
- Phase 2 Requirements (Map, Ratings, Calendar)
- Expo App Config
- App Credit, Cancel & Refunds
- Design Tokens Pipeline
- Mobile Package Manifest
- Review, Pay & Confirmed
- Phase 2 Database Design
- App Entry & Package
- Instructor Profile Data
- Phase 2 Chat (Messages, Realtime)
- Seed Data & Gallery Copy
- Checkout, Demo Pay & Reminders
- Root Package & Scripts
- Arabic Copy & Dev Machine
- Home Data & Time Rules
- Who & Where Onboarding
- Product Overview (Handoff)
- Payment Settlement & Reminders
- Confirmed & Checkout Tests
- Gallery E2E & Dev Setup
- Discovery Strings & Tasks
- Family Member Sheet & Rules
- Phase 1 Design Notes
- Explore Tests
- Working Agreement
- Root Layout & Query Client
- Glass Component
- Segmented Control & Switch
- Mobile TypeScript Config
- Brand Tokens (Purple & Gold)
- Phase 0 Report & Requirements
- Interests Screen & Tests
- Reminders
- Phone Sign-up & Verify
- Mobile Dev Dependencies
- Category Tray
- Tokens Package Manifest
- Base TypeScript Config
- Booking Rules in the Handoff
- Design Handoff
- Booking & Payment Screens (Handoff)
- Month Calendar
- Category Tray & Hand-set Tokens
- Mobile npm Scripts
- Glass Chrome Specs (Tabs, Sheets)
- Lint Config
- Product
- Liquid Glass Materials
- Jest Config
- Code Entry Screen
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
- `Departures board (signature)` --semantically_similar_to--> `Departures board (Starting soon near you)`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `R1.9 Message entry points Phase 1 hid` --references--> `BookingDetail()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/booking/[ref].tsx
- `R1.3 Messages tab thread list` --references--> `Messages()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/(tabs)/messages.tsx
- `R1.9 Message entry points Phase 1 hid` --references--> `InstructorProfile()`  [INFERRED]
  specs/phase-2/requirements.md → apps/mobile/src/app/instructor/[id].tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Phase 2 text chat flow** — specs_phase_2_requirements_r1, specs_phase_2_design_threads_table, specs_phase_2_design_messages_table, specs_phase_2_design_thread_reads_table, specs_phase_2_design_start_thread, specs_phase_2_design_realtime_channels, specs_phase_2_design_chat_client, specs_phase_2_tasks_t4, specs_phase_2_tasks_t5 [EXTRACTED 1.00]
- **Recurring weekly series (book, pay, cancel)** — specs_phase_2_requirements_r5, specs_phase_2_design_book_series, specs_phase_2_design_book_one, specs_phase_2_design_series_payments, specs_phase_2_design_cancel_booking_every_week, specs_phase_2_design_bookings_series_id, specs_phase_2_tasks_t10, specs_phase_2_tasks_t11 [EXTRACTED 1.00]
- **Phase 2 spec gate (draft, owner answers, approval)** — docs_decisions_d66, docs_decisions_d67, docs_decisions_d68, specs_phase_2_requirements, specs_phase_2_design, specs_phase_2_tasks, specs_phase_1_report_phase2_outline [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (73 total, 5 thin omitted)

### Community 0 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.06
Nodes (79): styles, styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK (+71 more)

### Community 1 - "Level Options & Colour Types"
Cohesion: 0.11
Nodes (41): KIDS_AGE, styles, styles, styles, Family(), styles, styles, styles (+33 more)

### Community 2 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.05
Nodes (16): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Accessibility & inclusion, Brand commitments, Platform: iPhone-first, adaptive, Coach For All app, Design canvas and design system artifacts, cfa design system artifact (+8 more)

### Community 3 - "Onboarding Screens"
Cohesion: 0.11
Nodes (36): Welcome(), GallerySheet(), styles, LanguageSheet(), Categories(), styles, styles, Levels() (+28 more)

### Community 4 - "Bookings Filter & Types"
Cohesion: 0.10
Nodes (38): BookingsFilter(), KINDS, styles, TIMES, CancelSheet(), Bookings(), styles, Tab (+30 more)

### Community 5 - "E2E Journey & Arabic Strings"
Cohesion: 0.08
Nodes (36): 7. Both in Bookings, 2. Sign up and verify, land on Home, Capabilities and constraints, Demo sign-in (Supabase test number), Groups and level-label migrations pushed to hosted project, T23 four UI fixes (nav fade, fact tiles, dark thumb, Home capital), Arabic app strings to translate, Appearance sheet strings (3) (+28 more)

### Community 6 - "Gallery Screen & Theme"
Cohesion: 0.11
Nodes (26): AppearanceSheet(), styles, THEMES, styles, REASONS, styles, styles, LANGS (+18 more)

### Community 7 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 8 - "Text & Time Slot Components"
Cohesion: 0.10
Nodes (25): SignUp(), styles, FamilyMemberSheet(), styles, DayPicker(), PhoneField(), Props, styles (+17 more)

### Community 9 - "Root Stack"
Cohesion: 0.11
Nodes (21): ORDER, ROUTE, GlassLens(), Lens, styles, useGlassLens(), Props, restoreTabBar() (+13 more)

### Community 10 - "Workshop Seats"
Cohesion: 0.09
Nodes (25): Book(), Reschedule(), Workshop(), days, mockData, mockFamily, mockParams, now (+17 more)

### Community 11 - "Explore Filters Sheet"
Cohesion: 0.12
Nodes (28): FiltersSheet(), styles, TYPES, WHEN, SortSheet(), Availability, byKey(), DEFAULT_FILTERS (+20 more)

### Community 12 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 13 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+21 more)

### Community 14 - "Nav Bar & Selection Lens Spec"
Cohesion: 0.13
Nodes (20): The Glass Is Apple's Rule, Navigation (native tabs, glass), Evidence on hand, Android tab bar returns on landing on a tab, GlassLens / useGlassLens, NativeTabs (Apple tab bar), Neutral photo placeholders (no real photos yet), Floating TabBar (+12 more)

### Community 15 - "Date Formatting & Time Slots"
Cohesion: 0.12
Nodes (22): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, when() (+14 more)

### Community 16 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (27): Phase 1 technical design, App shape and routes, apply_promo() SQL function, Auth (Supabase phone OTP), book() SQL function, Booking ref CFA-#####, Component library, create-checkout Edge Function (+19 more)

### Community 17 - "CI Jobs & Checks"
Cohesion: 0.11
Nodes (21): CI workflow, Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), edge-functions job (Deno check and tests), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, Last seat goes to one of 20 bookings step (+13 more)

### Community 18 - "Project Guide & Design Sources"
Cohesion: 0.10
Nodes (22): Home surface brief (app-wide look, T23), Booking card, Bookings Filter sheet, Departures board (Starting soon near you), Explore Filters sheet, Archived Impeccable mocks (apps/mobile/.impeccable/mocks/), 7.5 Explore, Bookings strings (41) (+14 more)

### Community 19 - "Phase 2 Requirements (Map, Ratings, Calendar)"
Cohesion: 0.14
Nodes (24): Explore(), 7.11 Bookings, expo-calendar (createEventInCalendarAsync), Floating map/list IconButton on Explore (D68), Phase 2 requirements: Engagement, Phase 2 capability map (data2, chat, ratings, favourites, map, recurring, calendar, credit-history, e2e2), Owner questions Q1-Q5 (answered D67, D68), R1.2 Instructor sign-in for chat only (instructors.user_id) (+16 more)

### Community 20 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 21 - "App Credit, Cancel & Refunds"
Cohesion: 0.17
Nodes (22): cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, Cancel sheet credit wording ("Cancel and get N EGP credit"), grant_credit() ops function, Profile app credit row (+14 more)

### Community 22 - "Design Tokens Pipeline"
Cohesion: 0.13
Nodes (21): Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature), Creative North Star: The evening class board (+13 more)

### Community 23 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (22): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+14 more)

### Community 24 - "Review, Pay & Confirmed"
Cohesion: 0.12
Nodes (17): 4. Book two workshop seats, Book screen, Cancel sheet fits its content (fitToContents), group_level_labels data migration, Group page, MonthCalendar, refresh_demo_slots.sql demo times script, Reschedule screen (+9 more)

### Community 25 - "Phase 2 Database Design"
Cohesion: 0.19
Nodes (21): react-native-maps, Phase 2 technical design, _book_one() shared booking body, book_series() SQL function, bookings.series_id column, Engagement migration (2026111xxxxxxx_engagement.sql), favourites table, instructors.user_id column (+13 more)

### Community 26 - "App Entry & Package"
Cohesion: 0.12
Nodes (12): mockSave, keys(), missingArabicKeys(), setLanguage(), Tree, useIsRTL(), sat, slots (+4 more)

### Community 27 - "Instructor Profile Data"
Cohesion: 0.13
Nodes (15): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+7 more)

### Community 28 - "Phase 2 Chat (Messages, Realtime)"
Cohesion: 0.14
Nodes (19): BookingDetail(), InstructorProfile(), Messages(), Testing and CI, Chat client (idempotent send, typing broadcast, mark read), data/chat.ts (threads, messages, send, realtime hooks), Realtime channels (thread:<id> per chat + app-wide messages subscription), scripts/realtime-test.mjs two-client Realtime check (+11 more)

### Community 29 - "Seed Data & Gallery Copy"
Cohesion: 0.16
Nodes (14): GalleryRoute(), Gallery(), A11yFlag, Lang, Settings, useSettings, off, A11y (+6 more)

### Community 30 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.11
Nodes (18): DemoCheckout(), MY_BOOKING_COLUMNS, applyPromo(), Booking, cancelBooking(), DEFAULT_REMINDER, demoPay(), KNOWN (+10 more)

### Community 31 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 32 - "Arabic Copy & Dev Machine"
Cohesion: 0.15
Nodes (14): 1. Onboarding: Categories, Interests, Levels, Who & where, Operating context: categories, journey, rules, Booking detail strings (13), Interests and levels strings (3), Onboarding levels strings (1), Onboarding strings (36), Phase 1 requirements: hobbies-first booking loop, R2 auth (+6 more)

### Community 33 - "Home Data & Time Rules"
Cohesion: 0.18
Nodes (15): Home(), matchesAvailability(), cairo(), cairoDaysUntil(), Departure, distanceKm(), greetingPeriod(), GroupSessionRow (+7 more)

### Community 34 - "Who & Where Onboarding"
Cohesion: 0.14
Nodes (15): Interest, Level, useArea(), Profile, CATEGORIES, Discipline, Draft, empty (+7 more)

### Community 35 - "Product Overview (Handoff)"
Cohesion: 0.14
Nodes (17): Coach For All design handoff, 12. Accessibility, 6.1 App map, Four categories (Hobbies, Sports, Education, Languages), 6.3 Category icons, 11. Content style, 10. Data model, Hobbies-first (+9 more)

### Community 36 - "Payment Settlement & Reminders"
Cohesion: 0.15
Nodes (14): 6. Pay by card with fake provider, Refresh bookings, seats and board after settled payment, useReminderSync, Review & pay, Confirmed strings (19), Demo payment strings (5), Remind me sheet strings (6), Reminder notification strings (1) (+6 more)

### Community 37 - "Confirmed & Checkout Tests"
Cohesion: 0.14
Nodes (16): Confirmed(), RemindSheet(), Review(), booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate (+8 more)

### Community 38 - "Gallery E2E & Dev Setup"
Cohesion: 0.17
Nodes (15): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+7 more)

### Community 39 - "Discovery Strings & Tasks"
Cohesion: 0.18
Nodes (12): 5. Book soonest 1:1 oud time, 3. Category tray, Category tray and its button strings (8), Date strip strings (5), Explore strings (7), Instructor profile strings (26), Workshop strings (16), T10: Home x4 + tray (+4 more)

### Community 40 - "Family Member Sheet & Rules"
Cohesion: 0.14
Nodes (14): Profile(), useCredit(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits() (+6 more)

### Community 41 - "Phase 1 Design Notes"
Cohesion: 0.14
Nodes (14): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format (+6 more)

### Community 42 - "Explore Tests"
Cohesion: 0.14
Nodes (13): activeFilterCount(), Filters, OfferingPrice, at(), base, card(), dina, hany (+5 more)

### Community 43 - "Working Agreement"
Cohesion: 0.13
Nodes (11): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, Boundaries, No credit history list yet (balance only), Proposed Phase 2 spec outline (Engagement), Phase 2 boundaries (always / ask first / never), R5.2 One atomic booking of all weeks (book_series) (+3 more)

### Community 44 - "Root Layout & Query Client"
Cohesion: 0.19
Nodes (12): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useApplyThemeOverride(), Toast() (+4 more)

### Community 45 - "Glass Component"
Cohesion: 0.23
Nodes (8): Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props, flat(), Props, styles

### Community 46 - "Segmented Control & Switch"
Cohesion: 0.17
Nodes (10): SegmentedControl(), Props, Switch(), blur, light, radius, shadow, space (+2 more)

### Community 47 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 48 - "Brand Tokens (Purple & Gold)"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 49 - "Phase 0 Report & Requirements"
Cohesion: 0.23
Nodes (12): checks job (lint, typecheck, tests, tokens), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 50 - "Interests Screen & Tests"
Cohesion: 0.17
Nodes (9): Interests(), Area, nearestArea(), mockAreas, mockBuilder, mockCalls, mockDisciplines, mockRefetch (+1 more)

### Community 51 - "Reminders"
Cohesion: 0.24
Nodes (8): MyBooking, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync(), reminderAt(), currentLang()

### Community 52 - "Phone Sign-up & Verify"
Cohesion: 0.27
Nodes (9): authErrorKey(), e164(), formatEgMobile(), isValidEgMobile(), sendCode(), signOut(), mockSend, mockVerify (+1 more)

### Community 53 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 54 - "Category Tray"
Cohesion: 0.29
Nodes (7): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray()

### Community 55 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 56 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 57 - "Booking Rules in the Handoff"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 58 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 59 - "Booking & Payment Screens (Handoff)"
Cohesion: 0.32
Nodes (8): 7.8 Book (1:1, group, kids), Confirmation ring, 7.4 Home (per category), Payment methods (card, pay at the venue), 7.9 Review & pay, 7. Screens, Paymob payment gateway proposal, R6 booking

### Community 60 - "Month Calendar"
Cohesion: 0.38
Nodes (6): cairoKey, monthGrid(), MonthCalendar(), Props, styles, WEEK

### Community 61 - "Category Tray & Hand-set Tokens"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 62 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 63 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.53
Nodes (6): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21

### Community 64 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 65 - "Product"
Cohesion: 0.60
Nodes (5): PRODUCT.md (product record), Positioning, Product principles, Product purpose: directory and booking, Users: Cairo adults booking lessons

### Community 66 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 67 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **55 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+50 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Booking Rules & Database Tests` to `Arabic Copy & Dev Machine`, `Level Options & Colour Types`, `Decisions Log & Expo Docs Rule`, `Onboarding Screens`, `Review, Pay & Confirmed 2`, `E2E Journey & Arabic Strings`, `Gallery Screen & Theme`, `Working Agreement`, `Nav Bar & Selection Lens Spec`, `Working Agreement & Phase 1 Design`, `Handoff Component Specs`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Small UI Pieces (Icons, Rows, Filter Button)` be split into smaller, more focused modules?**
  _Cohesion score 0.058220773171867725 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Arabic Copy & Dev Machine`, `Review, Pay & Confirmed 2`, `E2E Journey & Arabic Strings`, `Ar App Strings · Tasks`, `Phase 1 Design Notes`, `Working Agreement`, `Nav Bar & Selection Lens Spec`, `CI Jobs & Checks`, `Project Guide & Design Sources`, `Handoff Component Specs`, `Booking Rules & Database Tests`, `Design Tokens Pipeline`, `Review, Pay & Confirmed`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Should `Level Options & Colour Types` be split into smaller, more focused modules?**
  _Cohesion score 0.10909090909090909 - nodes in this community are weakly interconnected._
- **Why does `Phase 2 technical design` connect `Testing Strategy & Monorepo` to `Ar App Strings · Tasks`, `Working Agreement`, `Working Agreement & Phase 1 Design`, `Handoff Component Specs`, `Booking Rules & Database Tests`, `Requirements · Design`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._