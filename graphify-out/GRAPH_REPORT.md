# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 14 files · ~98,243 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1180 nodes · 3879 edges · 64 communities (60 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 22,000 input · 4,500 output

## Community Hubs (Navigation)
- Review & Pay Checkout
- Demo Checkout & Checkout Tests
- Discovery: Home & Explore Data
- Arabic Copy & Dev Machine
- Decisions Log & Expo Docs Rule
- Seed Data & Gallery Copy
- Token Generator Script
- Paymob
- Family Members
- Search Field & Generated Tokens
- Tab Screens
- Working Agreement & Phase 1 Design
- i18n & Gallery Copy
- Mobile Runtime Dependencies
- Mobile Package Manifest
- Expo App Config
- Buttons, Welcome & Demo Checkout
- Root Stack
- i18n Keys
- Dates, Slots & Seed
- Explore · Filters
- Project Guide & Design Sources
- Handoff Component Specs
- Explore Test · Sort
- Selection Lens & Segmented Control
- Onboarding Screens & Draft
- Instructor & Booking Data
- Root Package & Scripts
- Gallery Demo Data & Avatar
- CI Jobs
- Phase 1 Design Notes
- Home · Home Test
- Phase 1 Tasks & Home Decisions
- Root Layout & Profile
- Mobile TypeScript Config
- Instructor Profile & Hero
- Onboarding Steps & Nav Bar
- Theme Test · Glass Test
- App Shape, Auth & Journey Gate
- Task Plan & Handoff
- Onboarding Step Screens
- CI Supabase & Colour Lint
- Mobile Dev Dependencies
- Onboarding Test · Welcome
- Onboarding · Package
- Categorytray · Categorytray Test
- Tokens Package Manifest
- Base TypeScript Config
- Chip · Gallery Sheet
- Account · Profile
- Working Agreement
- Glass, Icon Buttons & Bottom Bar
- Category Tray Spec
- Mobile Scripts
- Explore · Home
- Design Handoff · Design
- Design Handoff Rules
- ESLint Config
- Handoff in Design
- Jest Config
- Tab Layout & Messages
- Gallery & Category Tray
-  Layout
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 96 edges
2. `useTheme()` - 81 edges
3. `T()` - 79 edges
4. `Decisions log (D1–D51)` - 55 edges
5. `react-i18next` - 45 edges
6. `useLang()` - 42 edges
7. `react` - 42 edges
8. `useSettings` - 37 edges
9. `expo-router` - 37 edges
10. `Phase 1 technical design` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T1: Schema migration`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T2: Booking functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `CI-only database tests` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (64 total, 4 thin omitted)

### Community 0 - "Review & Pay Checkout"
Cohesion: 0.07
Nodes (54): BookingDetail(), BookingsFilter(), styles, CancelSheet(), REASONS, styles, Confirmed(), DemoCheckout() (+46 more)

### Community 1 - "Demo Checkout & Checkout Tests"
Cohesion: 0.08
Nodes (37): Book(), KIDS_AGE, styles, Workshop(), BookDraft, BookOffering, firstName(), days (+29 more)

### Community 2 - "Discovery: Home & Explore Data"
Cohesion: 0.12
Nodes (35): styles, styles, styles, Explore(), styles, styles, styles, byCategory (+27 more)

### Community 3 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (34): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+26 more)

### Community 4 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (9): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Expo Go only, JS RTL, Decisions log (D1–D51), Assumption: Expo Go on iPhone, SDK 57 (+1 more)

### Community 5 - "Seed Data & Gallery Copy"
Cohesion: 0.10
Nodes (31): ar, en, galleryCopy, nour, photoWalk, seedFor(), text, wheelTaster (+23 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.08
Nodes (27): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+19 more)

### Community 7 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 8 - "Family Members"
Cohesion: 0.10
Nodes (29): AppearanceSheet(), styles, THEMES, Family(), FamilyMemberSheet(), styles, LANGS, LanguageSheet() (+21 more)

### Community 9 - "Search Field & Generated Tokens"
Cohesion: 0.11
Nodes (24): styles, styles, formatEgMobile(), Banner(), styles, DashedCard(), styles, Day (+16 more)

### Community 10 - "Tab Screens"
Cohesion: 0.10
Nodes (23): styles, styles, ConfirmationRing(), styles, GroupedRow, styles, directional, disciplineIcon() (+15 more)

### Community 11 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 12 - "i18n & Gallery Copy"
Cohesion: 0.15
Nodes (22): styles, styles, Scheme, useTheme(), BottomActionBar(), Props, styles, Glass() (+14 more)

### Community 13 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 14 - "Mobile Package Manifest"
Cohesion: 0.07
Nodes (26): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+18 more)

### Community 15 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 16 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.17
Nodes (14): styles, styles, styles, styles, Button(), ButtonVariant, Props, styles (+6 more)

### Community 17 - "Root Stack"
Cohesion: 0.16
Nodes (17): ORDER, ROUTE, TabsLayout(), GlassGroup(), liquidAvailable(), Props, restoreTabBar(), styles (+9 more)

### Community 18 - "i18n Keys"
Cohesion: 0.16
Nodes (11): i18n, keys(), missingArabicKeys(), setLanguage(), Tree, Lang, Settings, useSettings (+3 more)

### Community 19 - "Dates, Slots & Seed"
Cohesion: 0.14
Nodes (15): formatDistance(), BookingCard(), Props, styles, Card(), Props, styles, styles (+7 more)

### Community 20 - "Explore Filters Sheet"
Cohesion: 0.13
Nodes (21): FiltersSheet(), styles, TYPES, WHEN, Availability, DEFAULT_FILTERS, DISTANCES, ExploreState (+13 more)

### Community 21 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (18): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+10 more)

### Community 22 - "Handoff Component Specs"
Cohesion: 0.14
Nodes (17): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Motion specs, Navigation bar glass capsule (+9 more)

### Community 23 - "Sort Sheet & Explore Tests"
Cohesion: 0.12
Nodes (17): SORTS, SortSheet(), styles, activeFilterCount(), OfferingPrice, SortKey, at(), base (+9 more)

### Community 24 - "Selection Lens & Segmented Control"
Cohesion: 0.17
Nodes (14): A11yFlag, A11y, isContrast(), mergeA11y(), useA11y(), GlassLens(), Lens, styles (+6 more)

### Community 25 - "Onboarding Screens & Draft"
Cohesion: 0.16
Nodes (15): SignUp(), submit(), clock(), Verify(), Messages(), authErrorKey(), e164(), isValidEgMobile() (+7 more)

### Community 26 - "Instructor & Booking Data"
Cohesion: 0.13
Nodes (14): InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel (+6 more)

### Community 27 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 28 - "Gallery Demo Data & Avatar"
Cohesion: 0.14
Nodes (13): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, DateButton(), Props (+5 more)

### Community 29 - "CI Jobs"
Cohesion: 0.17
Nodes (12): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Bookings, Arabic strings: Cancel sheet, Arabic strings: Demo payment, Arabic strings: Reschedule, Design tokens package (packages/tokens, R4) (+4 more)

### Community 30 - "Phase 1 Design Notes"
Cohesion: 0.17
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 31 - "Home Data & Time Rules"
Cohesion: 0.17
Nodes (12): Home(), cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, MyBookingRow, mockBookings, mockRows (+4 more)

### Community 32 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.32
Nodes (6): Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens, Resolved owner answers (17 Oct)

### Community 33 - "Root Layout & Profile"
Cohesion: 0.26
Nodes (10): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions() (+2 more)

### Community 34 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 35 - "Instructor Profile & Hero"
Cohesion: 0.24
Nodes (9): InstructorProfile(), styles, testHero(), DateTile(), Hero(), styles, Props, SessionRow() (+1 more)

### Community 36 - "Onboarding Steps & Nav Bar"
Cohesion: 0.29
Nodes (10): Categories(), styles, Interests(), CATEGORIES, disciplineName(), useDisciplines(), useOnboardingDraft, NavigationBar() (+2 more)

### Community 37 - "Theme & Glass Modes"
Cohesion: 0.20
Nodes (8): off, resolveScheme(), GlassMode, flat(), fitLines(), dark, light, @testing-library/react-native

### Community 38 - "App Shape, Auth & Journey Gate"
Cohesion: 0.35
Nodes (9): Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth, R4 onboarding (+1 more)

### Community 39 - "Task Plan & Handoff"
Cohesion: 0.17
Nodes (12): Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+4 more)

### Community 40 - "Onboarding Step Screens"
Cohesion: 0.24
Nodes (10): AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), useSession(), nearestArea() (+2 more)

### Community 41 - "CI Supabase & Colour Lint"
Cohesion: 0.25
Nodes (11): Phase 0 requirements, Theme, direction and accessibility plumbing (R5), Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21 (+3 more)

### Community 42 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 43 - "Welcome & Onboarding Tests"
Cohesion: 0.20
Nodes (7): Welcome(), Levels(), mockAreas, mockBuilder, mockCalls, mockDisciplines, mockSaved

### Community 44 - "Onboarding Draft & Save"
Cohesion: 0.24
Nodes (9): Area, Discipline, Draft, empty, finishOnboarding(), LEVELS, saveInterests(), useApplyDraftAfterSignUp() (+1 more)

### Community 45 - "Category Tray"
Cohesion: 0.29
Nodes (7): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray()

### Community 46 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 47 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 48 - "Chips & Gallery Sheet"
Cohesion: 0.33
Nodes (5): GallerySheet(), styles, Chip(), Props, styles

### Community 49 - "Account & Interests Data"
Cohesion: 0.43
Nodes (5): styles, Interest, Level, useArea(), useInterests()

### Community 50 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 51 - "Glass, Icon Buttons & Bottom Bar"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 52 - "Category Tray Spec"
Cohesion: 0.40
Nodes (5): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact)

### Community 53 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 54 - "Explore Filter Rules"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 55 - "Design Tokens Pipeline"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 56 - "Design Handoff Rules"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 57 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 58 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 59 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 426 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Buttons, Welcome & Demo Checkout` to `Review & Pay Checkout`, `Demo Checkout & Checkout Tests`, `Discovery: Home & Explore Data`, `Seed Data & Gallery Copy`, `Family Members`, `Search Field & Generated Tokens`, `Tab Screens`, `i18n & Gallery Copy`, `Mobile Package Manifest`, `Root Stack`, `i18n Keys`, `Dates, Slots & Seed`, `Explore · Filters`, `Explore Test · Sort`, `Selection Lens & Segmented Control`, `Instructor & Booking Data`, `Gallery Demo Data & Avatar`, `Home · Home Test`, `Root Layout & Profile`, `Instructor Profile & Hero`, `Onboarding Steps & Nav Bar`, `Theme Test · Glass Test`, `Onboarding Step Screens`, `Categorytray · Categorytray Test`, `Chip · Gallery Sheet`, `Account · Profile`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Review & Pay Checkout` be split into smaller, more focused modules?**
  _Cohesion score 0.06885245901639345 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `Demo Checkout & Checkout Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.08019323671497584 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D51)` connect `Decisions Log & Expo Docs Rule` to `Phase 1 Tasks & Home Decisions`, `Arabic Copy & Dev Machine`, `App Shape, Auth & Journey Gate`, `Task Plan & Handoff`, `Working Agreement`, `Project Guide & Design Sources`, `CI Jobs`, `Phase 1 Design Notes`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._