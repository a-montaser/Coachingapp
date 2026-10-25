# Graph Report - Coaching app  (2026-10-25)

## Corpus Check
- 1 files · ~99,931 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1197 nodes · 3949 edges · 62 communities (59 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.85)
- Token cost: 4,000 input · 1,000 output

## Community Hubs (Navigation)
- Seed Data & Gallery Copy
- Root Stack
- Selection Lens & Segmented Control
- Arabic Copy & Dev Machine
- Family Members
- Paymob
- Working Agreement & Phase 1 Design
- Decisions Log & Expo Docs Rule
- Mobile Runtime Dependencies
- Token Generator Script
- Family Member Sheet
- Buttons, Welcome & Demo Checkout
- Review & Pay Checkout
- Tab Screens
- Text, Chips & Phone Inputs
- Search Field & Generated Tokens
- Gallery Screen
- Expo App Config
- Onboarding Screens
- Explore Filters Sheet
- Mobile Package Manifest
- Demo Checkout & Checkout Tests
- Project Guide & Design Sources
- Sign-up & Verify
- Handoff Component Specs
- Home Data & Time Rules
- Phase 1 Tasks & Home Decisions
- Root Package & Scripts
- Checkout, Demo Pay & Reminders
- Instructor & Booking Data
- Confirmed & Checkout Tests
- Workshop Seats
- Leveloption · Levels
- Phase 1 Design Notes
- Root Layout & Profile
- Explore & Test Images
- Explore Tests
- Mobile TypeScript Config
- Reminders Test · Reminders
- App Shape, Auth & Journey Gate
- Task Plan & Handoff
- Onboarding Screens & Draft
- Account Data & Supabase Client
- Category Tray
- Mobile Dev Dependencies
- Design Handoff · Decisions
- Tokens Package Manifest
- CI Supabase & Colour Lint
- Base TypeScript Config
- CI Jobs
- Working Agreement
- Mobile Scripts
- Explore · Home
- Design Tokens Pipeline
- CI Design & Tokens Package
- Category Tray Spec
- ESLint Config
- Handoff in Design
- Jest Config
- Tab Layout & Messages
-  Layout
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 95 edges
2. `useTheme()` - 81 edges
3. `T()` - 79 edges
4. `Decisions log (D1–D53)` - 57 edges
5. `react-i18next` - 45 edges
6. `react` - 44 edges
7. `useLang()` - 42 edges
8. `useSettings` - 38 edges
9. `expo-router` - 37 edges
10. `Phase 1 technical design` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `D51: T18 Cancel and Reschedule` --references--> `R8 manage`  [INFERRED]
  docs/DECISIONS.md → specs/phase-1/requirements.md
- `D53: T19 Local reminders` --references--> `R9 reminders`  [INFERRED]
  docs/DECISIONS.md → specs/phase-1/requirements.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `Expo Go only, JS RTL` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  CLAUDE.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (62 total, 3 thin omitted)

### Community 0 - "Seed Data & Gallery Copy"
Cohesion: 0.07
Nodes (52): LANGS, LanguageSheet(), styles, nour, photoWalk, seedFor(), text, wheelTaster (+44 more)

### Community 1 - "Root Stack"
Cohesion: 0.06
Nodes (42): ORDER, ROUTE, TabsLayout(), useReminderSync(), A11yFlag, Settings, useSettings, off (+34 more)

### Community 2 - "Selection Lens & Segmented Control"
Cohesion: 0.11
Nodes (29): A11y, isContrast(), useA11y(), CATEGORIES, Props, styles, styles, Glass() (+21 more)

### Community 3 - "Arabic Copy & Dev Machine"
Cohesion: 0.07
Nodes (37): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Bookings, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Cancel sheet, Arabic strings: Category tray and its button (+29 more)

### Community 4 - "Family Members"
Cohesion: 0.14
Nodes (25): styles, styles, styles, styles, styles, styles, styles, styles (+17 more)

### Community 5 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 6 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (34): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+26 more)

### Community 7 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (7): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Decisions log (D1–D53), Assumption: Expo Go on iPhone, SDK 57

### Community 8 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 9 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 10 - "Family Member Sheet"
Cohesion: 0.11
Nodes (25): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), styles, SignOutSheet(), SortSheet(), Profile() (+17 more)

### Community 11 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.13
Nodes (20): styles, styles, Scheme, Avatar(), Props, styles, Props, styles (+12 more)

### Community 12 - "Review & Pay Checkout"
Cohesion: 0.16
Nodes (25): BookingDetail(), BookingsFilter(), styles, Bookings(), styles, ACTIVE, bookingPolicy(), bookingTitle() (+17 more)

### Community 13 - "Tab Screens"
Cohesion: 0.11
Nodes (20): ConfirmationRing(), DashedCard(), styles, styles, EmptyState(), Props, styles, styles (+12 more)

### Community 14 - "Text, Chips & Phone Inputs"
Cohesion: 0.12
Nodes (19): styles, GallerySheet(), formatEgMobile(), InterestTile(), Props, styles, OtpBoxes(), Props (+11 more)

### Community 15 - "Search Field & Generated Tokens"
Cohesion: 0.14
Nodes (21): CancelSheet(), REASONS, styles, Reschedule(), styles, styles, BookingErrorKey, useMyBooking() (+13 more)

### Community 16 - "Gallery Screen"
Cohesion: 0.12
Nodes (21): Family(), GalleryRoute(), InstructorProfile(), styles, DEMO_BASE, FLAGS, Gallery(), SLOTS (+13 more)

### Community 17 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 18 - "Onboarding Screens"
Cohesion: 0.13
Nodes (20): Welcome(), Categories(), Interests(), Area, CATEGORIES, Discipline, disciplineName(), Draft (+12 more)

### Community 19 - "Explore Filters Sheet"
Cohesion: 0.13
Nodes (22): FiltersSheet(), styles, TYPES, WHEN, Availability, DEFAULT_FILTERS, DISTANCES, ExploreState (+14 more)

### Community 20 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (22): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+14 more)

### Community 21 - "Demo Checkout & Checkout Tests"
Cohesion: 0.16
Nodes (17): Book(), KIDS_AGE, styles, BookDraft, BookOffering, firstName(), days, mockData (+9 more)

### Community 22 - "Project Guide & Design Sources"
Cohesion: 0.14
Nodes (18): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+10 more)

### Community 23 - "Sign-up & Verify"
Cohesion: 0.15
Nodes (16): SignUp(), submit(), clock(), Verify(), Messages(), authErrorKey(), e164(), isValidEgMobile() (+8 more)

### Community 24 - "Handoff Component Specs"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 25 - "Home Data & Time Rules"
Cohesion: 0.18
Nodes (15): Home(), styles, cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, InstructorCardRow, MyBookingRow (+7 more)

### Community 26 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.23
Nodes (9): Expo Go only, JS RTL, Theme, direction and accessibility plumbing (R5), Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens, Resolved owner answers (17 Oct) (+1 more)

### Community 27 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 28 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.14
Nodes (17): DemoCheckout(), Review(), MY_BOOKING_COLUMNS, applyPromo(), Booking, cancelBooking(), demoPay(), KNOWN (+9 more)

### Community 29 - "Instructor & Booking Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 30 - "Confirmed & Checkout Tests"
Cohesion: 0.14
Nodes (15): Confirmed(), RemindSheet(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace (+7 more)

### Community 31 - "Workshop Seats"
Cohesion: 0.20
Nodes (13): Workshop(), cairoDay(), cairoOffset(), clampSeats(), fromCairo(), maxWorkshopSeats(), Policy, policyFor() (+5 more)

### Community 32 - "Level Options"
Cohesion: 0.23
Nodes (10): Levels(), styles, useTheme(), LevelGlyph(), styles, LevelOption(), Props, styles (+2 more)

### Community 33 - "Phase 1 Design Notes"
Cohesion: 0.20
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 34 - "Root Layout & Profile"
Cohesion: 0.21
Nodes (12): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useApplyThemeOverride(), Toast() (+4 more)

### Community 35 - "Explore & Test Images"
Cohesion: 0.21
Nodes (12): Explore(), styles, byCategory, byDiscipline, heroes, people, TEST_IMAGES, testBanner() (+4 more)

### Community 36 - "Explore Tests"
Cohesion: 0.15
Nodes (12): activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany, mockRows (+4 more)

### Community 37 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 38 - "Reminders"
Cohesion: 0.20
Nodes (8): MyBooking, DEFAULT_REMINDER, ReminderChoice, REMINDED, syncReminders(), N, currentLang(), expo-notifications

### Community 39 - "App Shape, Auth & Journey Gate"
Cohesion: 0.29
Nodes (9): Demo sign-in, Arabic strings: Onboarding, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), R2 auth, R4 onboarding (+1 more)

### Community 40 - "Task Plan & Handoff"
Cohesion: 0.17
Nodes (10): Seed sample content (§14), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell, T22 Maestro flow (not run in Phase 0) (+2 more)

### Community 41 - "Onboarding Screens & Draft"
Cohesion: 0.24
Nodes (10): AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), useSession(), nearestArea() (+2 more)

### Community 42 - "Account Data & Supabase Client"
Cohesion: 0.25
Nodes (8): styles, Interest, Level, useArea(), useInterests(), ar, en, galleryCopy

### Community 43 - "Category Tray"
Cohesion: 0.20
Nodes (9): CategoryButton(), CategoryTray(), Radio(), openTray(), homeIndicator, icon, layout, motion (+1 more)

### Community 44 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 45 - "Handoff & Decisions Links"
Cohesion: 0.22
Nodes (7): Bottom action bar, Component specs (§5), Navigation bar glass capsule, Glass sheets, Floating glass tab bar with minimise on scroll, R7 Primitives P1-P21, T19 TabBar with minimise

### Community 46 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 47 - "CI Supabase & Colour Lint"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 48 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 49 - "CI Jobs"
Cohesion: 0.36
Nodes (5): CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Demo payment, Arabic strings: Reminder notification, T16: PaymentProvider + Edge Functions, T19: Local reminders

### Community 50 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 51 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 52 - "Explore Filter Rules"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 53 - "Design Tokens Pipeline"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 54 - "CI Design & Tokens Package"
Cohesion: 0.40
Nodes (5): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), T7 CI workflow

### Community 55 - "Category Tray Spec"
Cohesion: 0.50
Nodes (5): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 56 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 57 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 58 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **22 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 425 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seed Data & Gallery Copy` be split into smaller, more focused modules?**
  _Cohesion score 0.06892010535557506 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Selection Lens & Segmented Control` to `Seed Data & Gallery Copy`, `Root Stack`, `Family Members`, `Family Member Sheet`, `Buttons, Welcome & Demo Checkout`, `Review & Pay Checkout`, `Tab Screens`, `Text, Chips & Phone Inputs`, `Search Field & Generated Tokens`, `Gallery Screen`, `Explore Filters Sheet`, `Mobile Package Manifest`, `Demo Checkout & Checkout Tests`, `Sign-up & Verify`, `Home Data & Time Rules`, `Instructor & Booking Data`, `Leveloption · Levels`, `Root Layout & Profile`, `Explore & Test Images`, `Onboarding Screens & Draft`, `Account Data & Supabase Client`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `Root Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.055811571940604196 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D53)` connect `Decisions Log & Expo Docs Rule` to `Arabic Copy & Dev Machine`, `Working Agreement & Phase 1 Design`, `App Shape, Auth & Journey Gate`, `Task Plan & Handoff`, `Design Handoff · Decisions`, `CI Jobs`, `Working Agreement`, `Project Guide & Design Sources`, `Phase 1 Tasks & Home Decisions`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._