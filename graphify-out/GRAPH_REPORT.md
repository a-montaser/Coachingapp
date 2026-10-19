# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 12 files · ~99,906 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1197 nodes · 3947 edges · 63 communities (60 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.85)
- Token cost: 20,000 input · 4,000 output

## Community Hubs (Navigation)
- Seed Data & Gallery Copy
- Family Members
- Selection Lens & Segmented Control
- Search Field & Generated Tokens
- Decisions Log & Expo Docs Rule
- Arabic Copy & Dev Machine
- Buttons, Welcome & Demo Checkout
- Paymob
- Working Agreement & Phase 1 Design
- Review & Pay Checkout
- Explore Filters Sheet
- Mobile Runtime Dependencies
- Token Generator Script
- Family Member Sheet
- T · Chip
- Tab Screens
- Root Stack
- Expo App Config
- Demo Checkout & Checkout Tests
- Checkout · Package
- Mobile Package Manifest
- Accessibility & Theme
- Project Guide & Design Sources
- Gallery · Searchfield
- Workshop Seats
- Onboarding Screens & Draft
- Handoff Component Specs
- Root Package & Scripts
- CI Jobs
- Auth · Verify
- Home · Home Test
- Instructor & Booking Data
- Onboarding Test · Onboarding
- Testimages · Explore
- Task Plan & Handoff
- Confirmed & Checkout Tests
- Root Layout & Profile
- Explore Test · Explore
- Mobile TypeScript Config
- Phase 1 Tasks & Home Decisions
- Phase 1 Design Notes
- CI Supabase & Colour Lint
- App Shape, Auth & Journey Gate
- [Ref] · Checkout
- Account · Supabase
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Design · Requirements
- Working Agreement
- Search Field, Switch & Tokens
- Handoff in Design
- Category Tray Spec
- Mobile Scripts
- Design Tokens Pipeline
- Category Tray
- CI Design & Tokens Package
- ESLint Config
- Categorytray · Categorytray Test
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
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T1: Schema migration`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T2: Booking functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `CI-only database tests` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md
- `T19 TabBar with minimise` --implements--> `Floating glass tab bar with minimise on scroll`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (63 total, 3 thin omitted)

### Community 0 - "Seed Data & Gallery Copy"
Cohesion: 0.06
Nodes (54): LANGS, LanguageSheet(), styles, ar, en, galleryCopy, nour, photoWalk (+46 more)

### Community 1 - "Family Members"
Cohesion: 0.14
Nodes (26): styles, styles, styles, styles, styles, styles, styles, styles (+18 more)

### Community 2 - "Selection Lens & Segmented Control"
Cohesion: 0.11
Nodes (26): A11y, isContrast(), useA11y(), ButtonVariant, Props, styles, CATEGORIES, Props (+18 more)

### Community 3 - "Search Field & Generated Tokens"
Cohesion: 0.10
Nodes (29): Family(), InstructorProfile(), styles, styles, styles, styles, Avatar(), Props (+21 more)

### Community 4 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (8): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Decisions log (D1–D53), Assumption: Expo Go on iPhone, SDK 57, T22 Maestro flow (not run in Phase 0)

### Community 5 - "Arabic Copy & Dev Machine"
Cohesion: 0.09
Nodes (32): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+24 more)

### Community 6 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.11
Nodes (25): Scheme, useTheme(), styles, Props, styles, Card(), Props, styles (+17 more)

### Community 7 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 8 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 9 - "Review & Pay Checkout"
Cohesion: 0.15
Nodes (27): BookingDetail(), styles, BookingsFilter(), styles, Bookings(), styles, ACTIVE, bookingPolicy() (+19 more)

### Community 10 - "Explore Filters Sheet"
Cohesion: 0.11
Nodes (29): FiltersSheet(), styles, TYPES, WHEN, Availability, byKey(), DEFAULT_FILTERS, DISTANCES (+21 more)

### Community 11 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 12 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 13 - "Family Member Sheet"
Cohesion: 0.11
Nodes (25): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), styles, SignOutSheet(), SortSheet(), Profile() (+17 more)

### Community 14 - "Text, Chips & Phone Inputs"
Cohesion: 0.12
Nodes (20): styles, GallerySheet(), styles, formatEgMobile(), Chip(), Props, styles, OtpBoxes() (+12 more)

### Community 15 - "Tab Screens"
Cohesion: 0.13
Nodes (19): ConfirmationRing(), DashedCard(), styles, styles, Props, styles, directional, Icon() (+11 more)

### Community 16 - "Root Stack"
Cohesion: 0.12
Nodes (22): ORDER, ROUTE, TabsLayout(), useReminderSync(), GlassGroup(), GlassLens(), useGlassLens(), SegmentedControl() (+14 more)

### Community 17 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 18 - "Demo Checkout & Checkout Tests"
Cohesion: 0.15
Nodes (19): Book(), KIDS_AGE, styles, BookDraft, BookOffering, firstName(), days, mockData (+11 more)

### Community 19 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.11
Nodes (22): DemoCheckout(), RemindSheet(), Review(), MyBooking, applyPromo(), Booking, DEFAULT_REMINDER, demoPay() (+14 more)

### Community 20 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (21): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+13 more)

### Community 21 - "Accessibility & Theme"
Cohesion: 0.17
Nodes (10): Settings, useSettings, off, mergeA11y(), resolveScheme(), flat(), dark, light (+2 more)

### Community 22 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (18): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+10 more)

### Community 23 - "Gallery Screen"
Cohesion: 0.13
Nodes (17): GalleryRoute(), Levels(), DEMO_BASE, FLAGS, Gallery(), SLOTS, styles, THEMES (+9 more)

### Community 24 - "Workshop Seats"
Cohesion: 0.14
Nodes (14): Workshop(), syncReminders(), N, cairoOffset(), clampSeats(), fromCairo(), maxWorkshopSeats(), Policy (+6 more)

### Community 25 - "Onboarding Screens & Draft"
Cohesion: 0.16
Nodes (17): AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), CATEGORIES, Discipline (+9 more)

### Community 26 - "Handoff Component Specs"
Cohesion: 0.16
Nodes (15): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Motion specs, Navigation bar glass capsule (+7 more)

### Community 27 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 28 - "CI Jobs"
Cohesion: 0.20
Nodes (11): CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Bookings, Arabic strings: Cancel sheet, Arabic strings: Demo payment, Arabic strings: Reminder notification, Arabic strings: Reschedule, Resolved owner answers (17 Oct), T16: PaymentProvider + Edge Functions (+3 more)

### Community 29 - "Sign-up & Verify"
Cohesion: 0.18
Nodes (14): SignUp(), submit(), clock(), Verify(), Messages(), authErrorKey(), e164(), isValidEgMobile() (+6 more)

### Community 30 - "Home Data & Time Rules"
Cohesion: 0.18
Nodes (14): Home(), styles, cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, InstructorCardRow, MyBookingRow (+6 more)

### Community 31 - "Instructor & Booking Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 32 - "Onboarding Screens"
Cohesion: 0.16
Nodes (13): Welcome(), Categories(), Interests(), useSession(), Area, disciplineName(), mockAreas, mockBuilder (+5 more)

### Community 33 - "Explore & Test Images"
Cohesion: 0.19
Nodes (13): Explore(), styles, activeFilterCount(), byCategory, byDiscipline, heroes, people, TEST_IMAGES (+5 more)

### Community 34 - "Task Plan & Handoff"
Cohesion: 0.17
Nodes (13): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, setLanguage RTL switch (forceRTL + reload), R10 Knowledge map (graphify), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format (+5 more)

### Community 35 - "Confirmed & Checkout Tests"
Cohesion: 0.18
Nodes (12): Confirmed(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace, mockPromo (+4 more)

### Community 36 - "Root Layout & Profile"
Cohesion: 0.23
Nodes (11): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useApplyThemeOverride(), Toast(), useToast (+3 more)

### Community 37 - "Explore Tests"
Cohesion: 0.17
Nodes (11): OfferingPrice, at(), base, card(), dina, hany, mockRows, NOW (+3 more)

### Community 38 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 39 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.32
Nodes (7): Expo Go only, JS RTL, Theme, direction and accessibility plumbing (R5), Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens

### Community 40 - "Phase 1 Design Notes"
Cohesion: 0.19
Nodes (9): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Phase 0 technical design, Mac dev environment and toolchain, Paymob payment gateway proposal, Zustand settings store (theme, category, devForce), useA11y hook (+1 more)

### Community 41 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (12): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 42 - "App Shape, Auth & Journey Gate"
Cohesion: 0.35
Nodes (9): Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth, R4 onboarding (+1 more)

### Community 43 - "Cancel & Reschedule"
Cohesion: 0.31
Nodes (10): CancelSheet(), REASONS, styles, Reschedule(), cancelOutcome(), BookingErrorKey, cancelBooking(), rescheduleBooking() (+2 more)

### Community 44 - "Account Data & Supabase Client"
Cohesion: 0.25
Nodes (8): styles, Interest, Level, useArea(), useInterests(), supabase, supabaseConfigured, @supabase/supabase-js

### Community 45 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 46 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 47 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 48 - "Testing Strategy & Monorepo"
Cohesion: 0.29
Nodes (7): Maestro gallery E2E flow, Seed sample content (§14), Monorepo layout (apps/mobile, packages/tokens, supabase), Testing strategy (Jest+RNTL, Maestro, manual device), R1 Repo and toolchain, R9 Gallery screen, T12 Gallery shell

### Community 49 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 50 - "Search Field, Switch & Tokens"
Cohesion: 0.29
Nodes (6): blur, radius, shadow, space, touch, type

### Community 51 - "Handoff in Design"
Cohesion: 0.40
Nodes (6): Gallery flow: Reduce Transparency / Increase Contrast screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 52 - "Category Tray Spec"
Cohesion: 0.40
Nodes (5): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact)

### Community 53 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 54 - "Design Tokens Pipeline"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 55 - "Category Tray"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 56 - "CI Design & Tokens Package"
Cohesion: 0.40
Nodes (5): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), T7 CI workflow

### Community 57 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 58 - "Category Tray Button & Radio"
Cohesion: 0.50
Nodes (4): CategoryButton(), CategoryTray(), Radio(), openTray()

### Community 59 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **24 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 427 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seed Data & Gallery Copy` be split into smaller, more focused modules?**
  _Cohesion score 0.06335403726708075 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Buttons, Welcome & Demo Checkout` to `Seed Data & Gallery Copy`, `Family Members`, `Selection Lens & Segmented Control`, `Search Field & Generated Tokens`, `Review & Pay Checkout`, `Explore Filters Sheet`, `Family Member Sheet`, `T · Chip`, `Tab Screens`, `Root Stack`, `Demo Checkout & Checkout Tests`, `Mobile Package Manifest`, `Accessibility & Theme`, `Gallery · Searchfield`, `Onboarding Screens & Draft`, `Home · Home Test`, `Instructor & Booking Data`, `Testimages · Explore`, `Root Layout & Profile`, `[Ref] · Checkout`, `Account · Supabase`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `Family Members` be split into smaller, more focused modules?**
  _Cohesion score 0.13636363636363635 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D53)` connect `Decisions Log & Expo Docs Rule` to `Task Plan & Handoff`, `Arabic Copy & Dev Machine`, `Phase 1 Tasks & Home Decisions`, `Phase 1 Design Notes`, `Working Agreement & Phase 1 Design`, `App Shape, Auth & Journey Gate`, `Working Agreement`, `Project Guide & Design Sources`, `CI Jobs`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._