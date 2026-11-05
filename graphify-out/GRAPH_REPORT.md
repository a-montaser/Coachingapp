# Graph Report - Coaching app  (2026-11-05)

## Corpus Check
- 11 files · ~116,223 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1378 nodes · 4333 edges · 67 communities (61 shown, 6 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 171 edges (avg confidence: 0.82)
- Token cost: 30,000 input · 13,000 output

## Community Hubs (Navigation)
- Onboarding Screens
- Explore Filters Sheet
- Arabic Copy & Dev Machine
- Mobile Runtime Dependencies
- Decisions Log & Expo Docs Rule
- Workshop Seats
- Review & Pay Checkout
- Paymob
- Date Tiles, Banners & Day Picker
- Date Formatting & Time Slots
- Glass Controls & Search Field
- Gallery Screen & Theme
- Design Tokens Pipeline
- CI Jobs & Checks
- Iconbutton · Navigationbar
- Token Generator Script
- Handoff Chrome Specs
- Mobile Package Manifest
- Family Member Sheet & Rules
- Testimages · Gallery
- Working Agreement & Phase 1 Design
- Checkout, Demo Pay & Reminders
- Expo App Config
- Root Stack
- Seed Data & Gallery Copy
- Cards & Booking Card
- Review, Pay & Confirmed
- Root Package & Scripts
- Phase 1 Requirements & Decisions
- Small UI Pieces (Icons, Rows, Filter Button)
- Instructor Profile Data
- Project Guide & Design Sources
- Book & Group Page Journey
- Confirmed & Checkout Tests
- Root Layout & Query Client
- Seed Data & Gallery Copy 2
- Phase 1 Design Notes
- Booking Rules & Database Tests
- Selection Lens & Segmented Control 2
- Reminders
- Handoff Component Specs
- Phase 0 Arabic, CI & Theme Plumbing
- Mobile TypeScript Config
- Payments & Open Questions
- Phase 0 Report & Requirements
- Language & Appearance Sheets
- Text, Chips & Phone Inputs
- Selection Lens & Segmented Control
- Payments & Open Questions 2
- Index · Package
- Category Tray
- Tokens Package Manifest
- Base TypeScript Config
- Handoff Chrome Specs 2
- Design Handoff
- Payments & Open Questions 2 3
- Working Agreement
- Generated Tokens (Space, Radius, Type)
- Hand-set Tokens (Components, Motion)
- Payments & Open Questions 2 3 4
- Code Entry Screen
- Design Handoff 2
- Account Data & Gallery Copy
- Gallery · Gallery
-  Layout
- Ci
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 99 edges
2. `useTheme()` - 82 edges
3. `T()` - 79 edges
4. `Decisions log (DECISIONS.md)` - 67 edges
5. `react-i18next` - 48 edges
6. `react` - 46 edges
7. `useLang()` - 44 edges
8. `Button()` - 43 edges
9. `Arabic app strings to translate` - 41 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Departures board (signature)` --semantically_similar_to--> `Departures board (Starting soon near you)`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `Home band` --semantically_similar_to--> `Home aubergine band`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `edge-functions job (Deno check and tests)` --implements--> `T16: PaymentProvider + Edge Functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `The Class First Rule` --references--> `D54: Owner revision of Phase 1 (R11, T23-T27)`  [INFERRED]
  apps/mobile/DESIGN.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Fewest taps booking flow** — docs_decisions_d59, apps_mobile_e2e_phase1_book_group_seats, apps_mobile_e2e_phase1_book_one_to_one, specs_phase_1_tasks_t26 [INFERRED 0.75]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Bugs found by e2e and fixed** — docs_decisions_d61, docs_decisions_d62, apps_mobile_e2e_phase1, docs_decisions_post_payment_refresh, docs_decisions_android_tab_bar_restore, docs_decisions_venue_panel_fallback [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (67 total, 6 thin omitted)

### Community 0 - "Onboarding Screens"
Cohesion: 0.06
Nodes (66): SignUp(), styles, Welcome(), BookingDetail(), FiltersSheet(), Categories(), styles, Interests() (+58 more)

### Community 1 - "Explore Filters Sheet"
Cohesion: 0.06
Nodes (58): styles, TYPES, WHEN, SORTS, SortSheet(), styles, Explore(), Home() (+50 more)

### Community 2 - "Arabic Copy & Dev Machine"
Cohesion: 0.07
Nodes (42): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 3. Category tray, 2. Sign up and verify, land on Home, Capabilities and constraints, Arabic app strings to translate, Appearance sheet strings (3), Buttons and messages strings (5) (+34 more)

### Community 3 - "Mobile Runtime Dependencies"
Cohesion: 0.04
Nodes (46): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+38 more)

### Community 4 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (14): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Brand commitments, CLAUDE.md (project instructions), After every task routine, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact (+6 more)

### Community 5 - "Workshop Seats"
Cohesion: 0.10
Nodes (34): Book(), KIDS_AGE, styles, Reschedule(), styles, Workshop(), BookDraft, BookOffering (+26 more)

### Community 6 - "Review & Pay Checkout"
Cohesion: 0.10
Nodes (37): BookingsFilter(), KINDS, styles, TIMES, Bookings(), styles, Tab, TABS (+29 more)

### Community 7 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 8 - "Date Tiles, Banners & Day Picker"
Cohesion: 0.12
Nodes (22): styles, styles, styles, Banner(), styles, ButtonVariant, Props, styles (+14 more)

### Community 9 - "Date Formatting & Time Slots"
Cohesion: 0.13
Nodes (27): styles, dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth() (+19 more)

### Community 10 - "Glass Controls & Search Field"
Cohesion: 0.11
Nodes (23): styles, resolveScheme(), Scheme, useTheme(), Props, styles, ConfirmationRing(), styles (+15 more)

### Community 11 - "Gallery Screen & Theme"
Cohesion: 0.12
Nodes (22): styles, GallerySheet(), styles, styles, styles, styles, styles, galleryCopy (+14 more)

### Community 12 - "Design Tokens Pipeline"
Cohesion: 0.10
Nodes (26): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+18 more)

### Community 13 - "CI Jobs & Checks"
Cohesion: 0.09
Nodes (25): CI workflow, checks job (lint, typecheck, tests, tokens), Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), edge-functions job (Deno check and tests), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step (+17 more)

### Community 14 - "Icon Buttons & Navigation Bar"
Cohesion: 0.12
Nodes (20): styles, styles, styles, FilterButton(), styles, IconButton(), Props, styles (+12 more)

### Community 15 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 16 - "Handoff Chrome Specs"
Cohesion: 0.10
Nodes (19): The Glass Is Apple's Rule, Navigation (native tabs, glass), PRODUCT.md (product record), Accessibility & inclusion, Evidence on hand, Platform: iPhone-first, adaptive, Positioning, Product principles (+11 more)

### Community 17 - "Mobile Package Manifest"
Cohesion: 0.07
Nodes (26): { defineConfig }, expoConfig, jest, preset, resolver, setupFiles, main, name (+18 more)

### Community 18 - "Family Member Sheet & Rules"
Cohesion: 0.10
Nodes (24): AppearanceSheet(), styles, THEMES, Family(), FamilyMemberSheet(), styles, SignOutSheet(), Profile() (+16 more)

### Community 19 - "Test Images & Gallery"
Cohesion: 0.11
Nodes (23): InstructorProfile(), styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK (+15 more)

### Community 20 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (27): Phase 1 technical design, App shape and routes, apply_promo() SQL function, book() SQL function, Booking ref CFA-#####, Boundaries, Component library, create-checkout Edge Function (+19 more)

### Community 21 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.09
Nodes (25): CancelSheet(), REASONS, styles, DemoCheckout(), cancelOutcome(), MY_BOOKING_COLUMNS, applyPromo(), Booking (+17 more)

### Community 22 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 23 - "Root Stack"
Cohesion: 0.13
Nodes (17): ORDER, ROUTE, Messages(), Props, restoreTabBar(), styles, TabBar(), TabIcon() (+9 more)

### Community 24 - "Seed Data & Gallery Copy"
Cohesion: 0.14
Nodes (13): A11yFlag, Lang, Settings, useSettings, off, A11y, isContrast(), mergeA11y() (+5 more)

### Community 25 - "Cards & Booking Card"
Cohesion: 0.17
Nodes (17): Props, styles, Card(), Props, styles, Icon(), InstructorCard(), styles (+9 more)

### Community 26 - "Review, Pay & Confirmed"
Cohesion: 0.13
Nodes (15): 6. Pay by card with fake provider, Refresh bookings, seats and board after settled payment, useReminderSync, Review & pay, Booking errors strings (4), Confirmed strings (19), Demo payment strings (5), Remind me sheet strings (6) (+7 more)

### Community 27 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 28 - "Phase 1 Requirements & Decisions"
Cohesion: 0.15
Nodes (15): 1. Onboarding: Categories, Interests, Levels, Who & where, Operating context: categories, journey, rules, Demo sign-in, Interests and levels strings (3), Onboarding levels strings (1), Onboarding strings (36), Auth (Supabase phone OTP), Phase 1 requirements: hobbies-first booking loop (+7 more)

### Community 29 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.15
Nodes (13): styles, DisciplineTile(), styles, directional, disciplineIcon(), IconName, Names, Props (+5 more)

### Community 30 - "Instructor Profile Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 31 - "Project Guide & Design Sources"
Cohesion: 0.15
Nodes (14): Booking card, Bookings Filter sheet, Explore Filters sheet, Bookings strings (41), Explore, Filters and Sort strings (43), Time slots strings (6), R11 Owner revision (D54), R11.12 Bookings time first, filter, calendar (+6 more)

### Community 32 - "Book & Group Page Journey"
Cohesion: 0.17
Nodes (13): 4. Book two workshop seats, Book screen, group_level_labels data migration, Group page, MonthCalendar, refresh_demo_slots.sql demo times script, Book strings (22), Group page strings (6) (+5 more)

### Community 33 - "Confirmed & Checkout Tests"
Cohesion: 0.14
Nodes (15): RemindSheet(), Review(), booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate, mockParams (+7 more)

### Community 34 - "Root Layout & Query Client"
Cohesion: 0.19
Nodes (12): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useIsRTL(), useApplyThemeOverride() (+4 more)

### Community 35 - "Seed Data & Gallery Copy 2"
Cohesion: 0.18
Nodes (11): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, when() (+3 more)

### Community 36 - "Phase 1 Design Notes"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 37 - "Booking Rules & Database Tests"
Cohesion: 0.21
Nodes (12): cancel-confirm test ID, 8. Cancel with refund, 9. Cancel without refund (within 24 h), Reschedule screen, 7.11 Bookings, Booking detail strings (13), Cancel sheet strings (15), Reschedule strings (8) (+4 more)

### Community 38 - "Selection Lens & Segmented Control 2"
Cohesion: 0.21
Nodes (10): GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles, react-native-gesture-handler (+2 more)

### Community 39 - "Reminders"
Cohesion: 0.20
Nodes (10): Confirmed(), MyBooking, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync(), reminderAt() (+2 more)

### Community 40 - "Handoff Component Specs"
Cohesion: 0.19
Nodes (13): Coach For All design handoff, 12. Accessibility, 6.1 App map, 6.3 Category icons, 11. Content style, 10. Data model, 13. Imagery, 8. Motion (+5 more)

### Community 41 - "Phase 0 Arabic, CI & Theme Plumbing"
Cohesion: 0.17
Nodes (12): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format, T21 CategoryTray + trigger (+4 more)

### Community 42 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 43 - "Payments & Open Questions"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 44 - "Phase 0 Report & Requirements"
Cohesion: 0.21
Nodes (12): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 45 - "Language & Appearance Sheets"
Cohesion: 0.26
Nodes (8): LANGS, LanguageSheet(), styles, styles, setLanguage(), GroupedList(), GroupedRow, styles

### Community 46 - "Text, Chips & Phone Inputs"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 47 - "Selection Lens & Segmented Control"
Cohesion: 0.27
Nodes (7): Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props, flat(), expo-blur

### Community 48 - "Payments & Open Questions 2"
Cohesion: 0.22
Nodes (11): 7.8 Book (1:1, group, kids), Confirmation ring, 7.5 Explore, 7.4 Home (per category), Payment methods (card, pay at the venue), 7.9 Review & pay, 7. Screens, Paymob payment gateway proposal (+3 more)

### Community 49 - "App Entry & Package"
Cohesion: 0.24
Nodes (6): i18n, keys(), missingArabicKeys(), Tree, i18next, @react-native-async-storage/async-storage

### Community 50 - "Category Tray"
Cohesion: 0.29
Nodes (7): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray()

### Community 51 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 52 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 53 - "Handoff Chrome Specs 2"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 54 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 55 - "Payments & Open Questions 2 3"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 56 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 57 - "Generated Tokens (Space, Radius, Type)"
Cohesion: 0.29
Nodes (6): blur, dark, radius, shadow, space, type

### Community 58 - "Hand-set Tokens (Components, Motion)"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 59 - "Payments & Open Questions 2 3 4"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 61 - "Design Handoff 2"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **55 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+50 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 484 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.060534822215692036 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Book & Group Page Journey`, `Arabic Copy & Dev Machine`, `Booking Rules & Database Tests`, `Phase 0 Arabic, CI & Theme Plumbing`, `Design Tokens Pipeline`, `CI Jobs & Checks`, `Handoff Chrome Specs`, `Working Agreement`, `Review, Pay & Confirmed`, `Phase 1 Requirements & Decisions`, `Project Guide & Design Sources`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `Explore Filters Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Cards & Booking Card` to `Onboarding Screens`, `Explore Filters Sheet`, `Workshop Seats`, `Review & Pay Checkout`, `Date Tiles, Banners & Day Picker`, `Date Formatting & Time Slots`, `Glass Controls & Search Field`, `Gallery Screen & Theme`, `Iconbutton · Navigationbar`, `Mobile Package Manifest`, `Family Member Sheet & Rules`, `Testimages · Gallery`, `Checkout, Demo Pay & Reminders`, `Root Stack`, `Seed Data & Gallery Copy`, `Small UI Pieces (Icons, Rows, Filter Button)`, `Instructor Profile Data`, `Root Layout & Query Client`, `Seed Data & Gallery Copy 2`, `Selection Lens & Segmented Control 2`, `Language & Appearance Sheets`, `Text, Chips & Phone Inputs`, `Selection Lens & Segmented Control`, `Category Tray`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._