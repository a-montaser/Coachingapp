# Graph Report - Coaching app  (2026-11-06)

## Corpus Check
- 2 files · ~120,697 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1394 nodes · 4399 edges · 66 communities (61 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Onboarding Screens
- Decisions Log & Expo Docs Rule
- Explore Filters Sheet
- Gallery Screen & Theme
- Date Formatting & Time Slots
- Token Generator Script
- Paymob
- Arabic Copy & Dev Machine
- Bookings Filter & Types
- E2E Journey & Arabic Strings
- Icon Buttons & Navigation Bar
- Design Tokens Pipeline
- Small UI Pieces (Icons, Rows, Filter Button)
- Test Images, Avatar & Row Cards
- Mobile Runtime Dependencies
- Date Tiles, Banners & Day Picker
- Cards & Booking Card
- Level Options & Colour Types
- Working Agreement & Phase 1 Design
- Booking Rules & Database Tests
- Workshop Seats
- Handoff Component Specs
- Expo App Config
- Book & Group Page Journey
- Checkout, Demo Pay & Reminders
- CI Jobs & Checks
- Mobile Package Manifest
- Review & Pay Checkout
- Root Stack
- Seed Data & Gallery Copy
- Root Package & Scripts
- Category Tray
- Review, Pay & Confirmed
- Cairo Time & Workshop Policy
- Instructor Profile Data
- Project Guide & Design Sources
- Time Slots & UI Tests
- Phase 0 Report & Requirements
- Phase 1 Design Notes
- Family Member Sheet & Rules
- App Entry & Package
- Reminders
- Gallery E2E & Dev Setup
- Confirmed & Checkout Tests
- Mobile TypeScript Config
- Payments & Open Questions
- Root Layout & Query Client
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Accessibility & Theme
- Glass Component
- Booking Rules in the Handoff
- Design Handoff
- Glass Chrome Specs (Tabs, Sheets)
- Working Agreement
- Mobile npm Scripts
- Lint Config
- Liquid Glass Materials
- Jest Config
- Code Entry Screen
- Product in One Page
- Account Data & Gallery Copy
- Onboarding Layout
- E2E CI Script
- Deno Config

## God Nodes (most connected - your core abstractions)
1. `react-native` - 99 edges
2. `useTheme()` - 82 edges
3. `T()` - 79 edges
4. `Decisions log (DECISIONS.md)` - 69 edges
5. `react-i18next` - 48 edges
6. `react` - 46 edges
7. `useLang()` - 44 edges
8. `Arabic app strings to translate` - 43 edges
9. `Button()` - 39 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Departures board (signature)` --semantically_similar_to--> `Departures board (Starting soon near you)`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `Home band` --semantically_similar_to--> `Home aubergine band`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `edge-functions job (Deno check and tests)` --implements--> `T16: PaymentProvider + Edge Functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `Maestro gallery E2E flow` --implements--> `R9 Gallery screen`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/requirements.md
- `Gallery flow: Reduce Transparency / Increase Contrast screenshots` --references--> `4.3 Fallbacks`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → docs/DESIGN_HANDOFF.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **App credit refund flow (D64)** — docs_decisions_d64, specs_phase_1_design_credits_table, specs_phase_1_design_credit_spends_table, specs_phase_1_design_cancel_booking, specs_phase_1_design_book, docs_decisions_use_credit_switch, docs_decisions_profile_credit_row, docs_decisions_cancel_sheet_credit_wording [EXTRACTED 1.00]
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Fewest taps booking flow** — docs_decisions_d59, apps_mobile_e2e_phase1_book_group_seats, apps_mobile_e2e_phase1_book_one_to_one, specs_phase_1_tasks_t26 [INFERRED 0.75]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Bugs found by e2e and fixed** — docs_decisions_d61, docs_decisions_d62, apps_mobile_e2e_phase1, docs_decisions_post_payment_refresh, docs_decisions_android_tab_bar_restore, docs_decisions_venue_panel_fallback [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (66 total, 5 thin omitted)

### Community 0 - "Onboarding Screens"
Cohesion: 0.06
Nodes (69): SignUp(), Welcome(), FiltersSheet(), Categories(), styles, Interests(), styles, Levels() (+61 more)

### Community 1 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.04
Nodes (32): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, The Glass Is Apple's Rule, Navigation (native tabs, glass), Accessibility & inclusion, Brand commitments, Evidence on hand, Platform: iPhone-first, adaptive (+24 more)

### Community 2 - "Explore Filters Sheet"
Cohesion: 0.06
Nodes (59): styles, TYPES, WHEN, SORTS, SortSheet(), styles, Explore(), Home() (+51 more)

### Community 3 - "Gallery Screen & Theme"
Cohesion: 0.11
Nodes (32): styles, styles, styles, styles, styles, Family(), styles, styles (+24 more)

### Community 4 - "Date Formatting & Time Slots"
Cohesion: 0.09
Nodes (37): GallerySheet(), styles, Interest, useArea(), ar, en, galleryCopy, dateFormat() (+29 more)

### Community 5 - "Token Generator Script"
Cohesion: 0.08
Nodes (27): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+19 more)

### Community 6 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 7 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (31): 1. Onboarding: Categories, Interests, Levels, Who & where, 2. Sign up and verify, land on Home, Capabilities and constraints, Demo sign-in, useReminderSync, Arabic app strings to translate, Appearance sheet strings (3), Egyptian Arabic drafts (await owner; Arabic in last phase) (+23 more)

### Community 8 - "Bookings Filter & Types"
Cohesion: 0.09
Nodes (30): BookingsFilter(), KINDS, styles, TIMES, CancelSheet(), REASONS, styles, ACTIVE (+22 more)

### Community 9 - "E2E Journey & Arabic Strings"
Cohesion: 0.09
Nodes (27): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 3. Category tray, Buttons and messages strings (5), Category tray and its button strings (8), Date strip strings (5), Explore strings (7), Instructor and workshop cards strings (6) (+19 more)

### Community 10 - "Icon Buttons & Navigation Bar"
Cohesion: 0.12
Nodes (23): styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, useTheme() (+15 more)

### Community 11 - "Design Tokens Pipeline"
Cohesion: 0.10
Nodes (27): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+19 more)

### Community 12 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.11
Nodes (23): InstructorProfile(), styles, testHero(), ConfirmationRing(), styles, DashedCard(), styles, EmptyState() (+15 more)

### Community 13 - "Test Images, Avatar & Row Cards"
Cohesion: 0.11
Nodes (23): styles, styles, styles, byCategory, byDiscipline, heroes, people, TEST_IMAGES (+15 more)

### Community 14 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 15 - "Date Tiles, Banners & Day Picker"
Cohesion: 0.11
Nodes (21): formatEgMobile(), DateTile(), DayPicker(), InterestTile(), Props, styles, OtpBoxes(), Props (+13 more)

### Community 16 - "Cards & Booking Card"
Cohesion: 0.13
Nodes (21): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, Props (+13 more)

### Community 17 - "Level Options & Colour Types"
Cohesion: 0.12
Nodes (16): Scheme, Props, styles, Props, styles, LevelGlyph(), styles, LevelOption() (+8 more)

### Community 18 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (26): Phase 1 technical design, App shape and routes, apply_promo() SQL function, book() SQL function, Booking ref CFA-#####, Boundaries, Component library, create-checkout Edge Function (+18 more)

### Community 19 - "Booking Rules & Database Tests"
Cohesion: 0.14
Nodes (23): Phase 1 Maestro journey (R10.1), cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, grant_credit() ops function, Profile app credit row (+15 more)

### Community 20 - "Workshop Seats"
Cohesion: 0.14
Nodes (20): Book(), KIDS_AGE, styles, Reschedule(), styles, BookDraft, BookOffering, days (+12 more)

### Community 21 - "Handoff Component Specs"
Cohesion: 0.11
Nodes (25): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+17 more)

### Community 22 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 23 - "Book & Group Page Journey"
Cohesion: 0.11
Nodes (19): 4. Book two workshop seats, Book screen, group_level_labels data migration, Group page, Groups and level-label migrations pushed to hosted project, MonthCalendar, refresh_demo_slots.sql demo times script, Reschedule screen (+11 more)

### Community 24 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.13
Nodes (20): DemoCheckout(), RemindSheet(), styles, Review(), useBookDraft, applyPromo(), Booking, DEFAULT_REMINDER (+12 more)

### Community 25 - "CI Jobs & Checks"
Cohesion: 0.12
Nodes (17): CI workflow, Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), edge-functions job (Deno check and tests), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, Last seat goes to one of 20 bookings step (+9 more)

### Community 26 - "Mobile Package Manifest"
Cohesion: 0.10
Nodes (20): main, name, private, version, @cfa/tokens, expo, expo-constants, expo-font (+12 more)

### Community 27 - "Review & Pay Checkout"
Cohesion: 0.21
Nodes (19): BookingDetail(), styles, Confirmed(), Bookings(), styles, Tab, TABS, firstName() (+11 more)

### Community 28 - "Root Stack"
Cohesion: 0.16
Nodes (15): ORDER, ROUTE, GlassLens(), useGlassLens(), Props, restoreTabBar(), styles, TabBar() (+7 more)

### Community 29 - "Seed Data & Gallery Copy"
Cohesion: 0.15
Nodes (14): AppearanceSheet(), styles, THEMES, GalleryRoute(), Profile(), useCredit(), mockParams, mockSave (+6 more)

### Community 30 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 31 - "Category Tray"
Cohesion: 0.15
Nodes (12): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray(), Lens (+4 more)

### Community 32 - "Review, Pay & Confirmed"
Cohesion: 0.16
Nodes (13): 6. Pay by card with fake provider, PRODUCT.md (product record), Operating context: categories, journey, rules, Positioning, Product principles, Product purpose: directory and booking, Users: Cairo adults booking lessons, Confirmed strings (19) (+5 more)

### Community 33 - "Cairo Time & Workshop Policy"
Cohesion: 0.17
Nodes (14): Workshop(), cairoDay(), cairoOffset(), clampSeats(), fromCairo(), maxWorkshopSeats(), monthGrid(), Policy (+6 more)

### Community 34 - "Instructor Profile Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 35 - "Project Guide & Design Sources"
Cohesion: 0.15
Nodes (14): Booking card, Bookings Filter sheet, Explore Filters sheet, Bookings strings (41), Explore, Filters and Sort strings (43), Time slots strings (6), R11 Owner revision (D54), R11.12 Bookings time first, filter, calendar (+6 more)

### Community 36 - "Time Slots & UI Tests"
Cohesion: 0.15
Nodes (9): sat, slots, groupSlots(), PartOfDay, Slot, TimeSlots(), Toast(), expo-glass-effect (+1 more)

### Community 37 - "Phase 0 Report & Requirements"
Cohesion: 0.17
Nodes (14): checks job (lint, typecheck, tests, tokens), Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9) (+6 more)

### Community 38 - "Phase 1 Design Notes"
Cohesion: 0.14
Nodes (14): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format (+6 more)

### Community 39 - "Family Member Sheet & Rules"
Cohesion: 0.20
Nodes (13): FamilyMemberSheet(), styles, CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits() (+5 more)

### Community 40 - "App Entry & Package"
Cohesion: 0.19
Nodes (10): LANGS, LanguageSheet(), styles, i18n, keys(), missingArabicKeys(), setLanguage(), Tree (+2 more)

### Community 41 - "Reminders"
Cohesion: 0.19
Nodes (11): MyBooking, useMyBookings(), ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync() (+3 more)

### Community 42 - "Gallery E2E & Dev Setup"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 43 - "Confirmed & Checkout Tests"
Cohesion: 0.18
Nodes (12): booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate, mockParams, mockPlace, mockPromo (+4 more)

### Community 44 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 45 - "Payments & Open Questions"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 46 - "Root Layout & Query Client"
Cohesion: 0.26
Nodes (9): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions() (+1 more)

### Community 47 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 48 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 49 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 50 - "Accessibility & Theme"
Cohesion: 0.31
Nodes (7): off, A11y, isContrast(), mergeA11y(), useA11y(), resolveScheme(), dark

### Community 51 - "Glass Component"
Cohesion: 0.28
Nodes (6): GlassGroup(), GlassMode, liquidAvailable(), Props, flat(), expo-blur

### Community 52 - "Booking Rules in the Handoff"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 53 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 54 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 55 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 56 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 57 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 58 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 59 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 61 - "Product in One Page"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **57 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+52 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 486 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Booking Rules & Database Tests` to `Decisions Log & Expo Docs Rule`, `Date Formatting & Time Slots`, `Arabic Copy & Dev Machine`, `Bookings Filter & Types`, `Test Images, Avatar & Row Cards`, `Working Agreement & Phase 1 Design`, `Book & Group Page Journey`?**
  _High betweenness centrality (0.359) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _57 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.057181942544459644 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Review, Pay & Confirmed`, `Project Guide & Design Sources`, `Phase 1 Design Notes`, `Arabic Copy & Dev Machine`, `E2E Journey & Arabic Strings`, `Design Tokens Pipeline`, `Booking Rules & Database Tests`, `Working Agreement`, `Book & Group Page Journey`, `CI Jobs & Checks`?**
  _High betweenness centrality (0.268) - this node is a cross-community bridge._
- **Should `Decisions Log & Expo Docs Rule` be split into smaller, more focused modules?**
  _Cohesion score 0.04386317907444668 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Gallery Screen & Theme` to `Onboarding Screens`, `Explore Filters Sheet`, `Date Formatting & Time Slots`, `Bookings Filter & Types`, `Icon Buttons & Navigation Bar`, `Small UI Pieces (Icons, Rows, Filter Button)`, `Test Images, Avatar & Row Cards`, `Date Tiles, Banners & Day Picker`, `Cards & Booking Card`, `Level Options & Colour Types`, `Workshop Seats`, `Checkout, Demo Pay & Reminders`, `Mobile Package Manifest`, `Review & Pay Checkout`, `Root Stack`, `Seed Data & Gallery Copy`, `Category Tray`, `Instructor Profile Data`, `Time Slots & UI Tests`, `Family Member Sheet & Rules`, `App Entry & Package`, `Root Layout & Query Client`, `Accessibility & Theme`, `Glass Component`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._