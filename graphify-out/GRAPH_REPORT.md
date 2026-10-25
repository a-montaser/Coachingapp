# Graph Report - Coaching app  (2026-10-25)

## Corpus Check
- 4 files · ~101,570 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1222 nodes · 4033 edges · 61 communities (60 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 151 edges (avg confidence: 0.84)
- Token cost: 30,000 input · 7,000 output

## Community Hubs (Navigation)
- Onboarding Screens
- Tab Screens
- Arabic Copy & Dev Machine
- Date Formatting & Time Slots
- Decisions Log & Expo Docs Rule
- Family Members
- Paymob
- Text, Chips & Phone Inputs
- Working Agreement & Phase 1 Design
- Explore & Test Images
- Mobile Runtime Dependencies
- Review & Pay Checkout
- Token Generator Script
- Gallery · Bookingcard
- Mobile Package Manifest
- Expo App Config
- Project Guide & Design Sources
- Checkout, Demo Pay & Reminders
- CI Jobs
- Sign-up & Verify
- Explore Filters Sheet
- Generated · Iconbutton
- Workshop Seats
- Handoff Component Specs
- Phase 1 Tasks & Home Decisions
- Confirmed & Checkout Tests
- Reminders
- Root Package & Scripts
- Instructor & Booking Data
- Seed Data & Gallery Copy
- Root Stack
- Task Plan & Handoff
-  Layout · Queryclient
- Accessibility Flags
- Phase 1 Design Notes
- Family Member Sheet
- Family · Family Member
- Explore Test · Explore
- CI Supabase & Colour Lint
- App Shape, Auth & Journey Gate
- Home · Home Test
- Mobile TypeScript Config
- Selection Lens & Segmented Control
- Index · Language
- Seed Instructors & When Labels
- Category Tray
- Mobile Dev Dependencies
- Buttons, Welcome & Demo Checkout
- Tokens Package Manifest
- Base TypeScript Config
- Design Handoff · Requirements
- Workshop Test · Rules
- Working Agreement
- CI Design & Tokens Package
- Mobile Scripts
- Sort · Explore
- Explore · Home
- Design Tokens Pipeline
- Category Tray Spec
- Jest Config
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 95 edges
2. `useTheme()` - 81 edges
3. `T()` - 79 edges
4. `Decisions log (D1–D54)` - 59 edges
5. `react-i18next` - 45 edges
6. `react` - 44 edges
7. `useLang()` - 42 edges
8. `useSettings` - 38 edges
9. `expo-router` - 37 edges
10. `Phase 1 technical design` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `npm run check gate` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `R11.1 More colour, clearer hierarchy, distinct controls` --conceptually_related_to--> `Brand commitments`  [INFERRED]
  specs/phase-1/requirements.md → apps/mobile/PRODUCT.md
- `T19 TabBar with minimise` --implements--> `Floating glass tab bar with minimise on scroll`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Phase 1 owner revision (D54, R11, T23–T27)** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_design_owner_revision, specs_phase_1_tasks_t23, specs_phase_1_tasks_t24, specs_phase_1_tasks_t25, specs_phase_1_tasks_t26, specs_phase_1_tasks_t27 [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (61 total, 1 thin omitted)

### Community 0 - "Onboarding Screens"
Cohesion: 0.06
Nodes (62): unstable_settings, Welcome(), GalleryRoute(), GallerySheet(), styles, Categories(), styles, Interests() (+54 more)

### Community 1 - "Tab Screens"
Cohesion: 0.08
Nodes (32): styles, Props, styles, DisciplineTile(), styles, GroupedRow, styles, styles (+24 more)

### Community 2 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (36): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Bookings, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Cancel sheet, Arabic strings: Category tray and its button (+28 more)

### Community 3 - "Date Formatting & Time Slots"
Cohesion: 0.12
Nodes (30): KIDS_AGE, styles, styles, styles, styles, BookDraft, BookOffering, firstName() (+22 more)

### Community 4 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (13): Brand commitments, CLAUDE.md (project instructions), After every task routine, CI-only database tests, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Phase-branch git workflow (+5 more)

### Community 5 - "Family Members"
Cohesion: 0.12
Nodes (26): styles, styles, styles, styles, styles, Messages(), styles, Scheme (+18 more)

### Community 6 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 7 - "Text, Chips & Phone Inputs"
Cohesion: 0.10
Nodes (26): sat, slots, DateTile(), styles, DayPicker(), Props, styles, Props (+18 more)

### Community 8 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (32): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+24 more)

### Community 9 - "Explore & Test Images"
Cohesion: 0.12
Nodes (24): styles, Explore(), styles, styles, byCategory, byDiscipline, heroes, people (+16 more)

### Community 10 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 11 - "Review & Pay Checkout"
Cohesion: 0.15
Nodes (26): BookingDetail(), BookingsFilter(), styles, Bookings(), styles, ACTIVE, bookingPolicy(), bookingTitle() (+18 more)

### Community 12 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 13 - "Gallery Screen & Theme"
Cohesion: 0.13
Nodes (22): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, resolveScheme(), useTheme() (+14 more)

### Community 14 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (25): { defineConfig }, expoConfig, main, name, private, version, @cfa/tokens, eslint (+17 more)

### Community 15 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 16 - "Project Guide & Design Sources"
Cohesion: 0.18
Nodes (23): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), Owner revision: Groups, MonthCalendar, Filters sheet, R11 Owner revision (25 Oct), R11.1 More colour, clearer hierarchy, distinct controls, R11.11 Price only at Review & pay, R11.12 Bookings: time first, filters, month view, R11.7 Lessons | Groups everywhere; Book Adults | Kids (+15 more)

### Community 17 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.14
Nodes (22): CancelSheet(), REASONS, styles, DemoCheckout(), Reschedule(), Review(), cancelOutcome(), MY_BOOKING_COLUMNS (+14 more)

### Community 18 - "CI Jobs"
Cohesion: 0.20
Nodes (12): Arabic strings: Demo payment, Arabic strings: Reminder notification, Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens, R8 manage (+4 more)

### Community 19 - "Sign-up & Verify"
Cohesion: 0.17
Nodes (17): SignUp(), submit(), styles, clock(), Verify(), authErrorKey(), e164(), formatEgMobile() (+9 more)

### Community 20 - "Explore Filters Sheet"
Cohesion: 0.13
Nodes (21): FiltersSheet(), styles, TYPES, WHEN, Availability, DEFAULT_FILTERS, DISTANCES, ExploreState (+13 more)

### Community 21 - "Glass Controls & Search Field"
Cohesion: 0.13
Nodes (15): CategoryButton(), Glass(), IconButton(), Props, styles, Props, SearchField(), styles (+7 more)

### Community 22 - "Workshop Seats"
Cohesion: 0.16
Nodes (17): Book(), days, mockData, mockFamily, mockParams, now, cairoDay(), cairoHM() (+9 more)

### Community 23 - "Handoff Component Specs"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 24 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.13
Nodes (13): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Evidence on hand, Platform: iPhone-first, adaptive, Positioning (+5 more)

### Community 25 - "Confirmed & Checkout Tests"
Cohesion: 0.12
Nodes (18): Confirmed(), RemindSheet(), styles, DEFAULT_REMINDER, REMINDER_CHOICES, booking(), inDays(), mockCheckout (+10 more)

### Community 26 - "Reminders"
Cohesion: 0.14
Nodes (14): ORDER, ROUTE, TabsLayout(), MyBooking, ReminderChoice, REMINDED, syncReminders(), N (+6 more)

### Community 27 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 28 - "Instructor & Booking Data"
Cohesion: 0.14
Nodes (13): InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel (+5 more)

### Community 29 - "Seed Data & Gallery Copy"
Cohesion: 0.16
Nodes (9): i18n, Settings, ThemePref, off, flat(), dark, light, @react-native-async-storage/async-storage (+1 more)

### Community 30 - "Root Stack"
Cohesion: 0.16
Nodes (12): GlassGroup(), liquidAvailable(), Props, styles, TabBar(), TabIcon(), TABS, useTabBarBottom() (+4 more)

### Community 31 - "Task Plan & Handoff"
Cohesion: 0.13
Nodes (14): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, R9 Gallery screen, Phase 0 ordered tasks (+6 more)

### Community 32 - "Root Layout & Query Client"
Cohesion: 0.19
Nodes (13): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useIsRTL(), useApplyThemeOverride() (+5 more)

### Community 33 - "Accessibility Flags"
Cohesion: 0.17
Nodes (11): A11yFlag, A11y, isContrast(), mergeA11y(), useA11y(), CATEGORIES, Props, styles (+3 more)

### Community 34 - "Phase 1 Design Notes"
Cohesion: 0.19
Nodes (15): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Phase 0 technical design, Mac dev environment and toolchain, Glass decision table (GlassView / BlurView / frosted), Monorepo layout (apps/mobile, packages/tokens, supabase) (+7 more)

### Community 35 - "Family Member Sheet"
Cohesion: 0.20
Nodes (12): AppearanceSheet(), styles, THEMES, Family(), SignOutSheet(), Profile(), signOut(), mockParams (+4 more)

### Community 36 - "Family Member Sheet & Rules"
Cohesion: 0.21
Nodes (12): FamilyMemberSheet(), styles, CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits() (+4 more)

### Community 37 - "Explore Tests"
Cohesion: 0.15
Nodes (12): activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany, mockRows (+4 more)

### Community 38 - "CI Supabase & Colour Lint"
Cohesion: 0.19
Nodes (13): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Theme, direction and accessibility plumbing (R5), Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6) (+5 more)

### Community 39 - "App Shape, Auth & Journey Gate"
Cohesion: 0.32
Nodes (10): Operating context: categories, journey, rules, Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth (+2 more)

### Community 40 - "Home Data & Time Rules"
Cohesion: 0.22
Nodes (10): Home(), cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, MyBookingRow, mockBookings, mockRows (+2 more)

### Community 41 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 42 - "Selection Lens & Segmented Control"
Cohesion: 0.24
Nodes (9): GlassMode, GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles (+1 more)

### Community 43 - "Language & i18n Keys"
Cohesion: 0.23
Nodes (8): LANGS, LanguageSheet(), styles, keys(), missingArabicKeys(), setLanguage(), Tree, Lang

### Community 44 - "Seed Instructors & When Labels"
Cohesion: 0.26
Nodes (10): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, formatMonth() (+2 more)

### Community 45 - "Category Tray"
Cohesion: 0.20
Nodes (9): CategoryTray(), Radio(), openTray(), component, homeIndicator, icon, layout, motion (+1 more)

### Community 46 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 47 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.29
Nodes (8): InstructorProfile(), styles, testHero(), BottomActionBar(), Props, styles, Hero(), SessionRow()

### Community 48 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 49 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 50 - "Handoff Chrome Specs"
Cohesion: 0.29
Nodes (7): Bottom action bar, Component specs (§5), Navigation bar glass capsule, Glass sheets, Floating glass tab bar with minimise on scroll, R7 Primitives P1-P21, T19 TabBar with minimise

### Community 51 - "Workshop Page & Seat Rules"
Cohesion: 0.38
Nodes (5): Workshop(), clampSeats(), maxWorkshopSeats(), mockData, mockParams

### Community 52 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 53 - "CI Design & Tokens Package"
Cohesion: 0.33
Nodes (6): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), T7 CI workflow

### Community 54 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 55 - "Sort Sheet"
Cohesion: 0.40
Nodes (5): SORTS, SortSheet(), styles, SortKey, useExplore

### Community 56 - "Explore Filter Rules"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 57 - "Design Tokens Pipeline"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 58 - "Category Tray Spec"
Cohesion: 0.50
Nodes (5): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 59 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **22 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 425 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Family Members` to `Onboarding Screens`, `Tab Screens`, `Date Formatting & Time Slots`, `Text, Chips & Phone Inputs`, `Explore & Test Images`, `Review & Pay Checkout`, `Gallery · Bookingcard`, `Mobile Package Manifest`, `Checkout, Demo Pay & Reminders`, `Sign-up & Verify`, `Explore Filters Sheet`, `Generated · Iconbutton`, `Confirmed & Checkout Tests`, `Reminders`, `Instructor & Booking Data`, `Seed Data & Gallery Copy`, `Root Stack`, ` Layout · Queryclient`, `Accessibility Flags`, `Family Member Sheet`, `Family · Family Member`, `Selection Lens & Segmented Control`, `Index · Language`, `Seed Instructors & When Labels`, `Buttons, Welcome & Demo Checkout`, `Sort · Explore`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.058333333333333334 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D54)` connect `Decisions Log & Expo Docs Rule` to `Arabic Copy & Dev Machine`, `App Shape, Auth & Journey Gate`, `Working Agreement & Phase 1 Design`, `Project Guide & Design Sources`, `CI Jobs`, `Working Agreement`, `Phase 1 Tasks & Home Decisions`, `Task Plan & Handoff`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `Tab Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.08078231292517007 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._