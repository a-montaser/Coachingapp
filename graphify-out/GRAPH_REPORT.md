# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 8 files · ~98,652 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1182 nodes · 3882 edges · 56 communities (53 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.85)
- Token cost: 15,000 input · 3,000 output

## Community Hubs (Navigation)
- Onboarding Screens & Draft
- Seed Data & Gallery Copy
- Explore Filters Sheet
- Review & Pay Checkout
- Arabic Copy & Dev Machine
- Family Members
- Paymob
- Search Field & Generated Tokens
- Working Agreement & Phase 1 Design
- Decisions Log & Expo Docs Rule
- Buttons, Welcome & Demo Checkout
- Mobile Runtime Dependencies
- Token Generator Script
- Expo App Config
- Button · Chip
- Tab Screens
- Mobile Package Manifest
- Root Layout & Profile
- Project Guide & Design Sources
- Handoff Component Specs
- Demo Checkout & Checkout Tests
- Instructor & Booking Data
- Family · Shell Test
- Root Package & Scripts
- Category Tray
- CI Jobs
- Phase 1 Design Notes
- Generated · Searchfield
- Selection Lens & Segmented Control
- Navigationbar · Dashedcard
- Root Stack
- Phase 1 Tasks & Home Decisions
- Usea11Y · Theme Test
- i18n & Gallery Copy
- Mobile TypeScript Config
- Task Plan & Handoff
- Checkout Test · [Ref]
- Workshop Test · [Id]
- App Shape, Auth & Journey Gate
- Mobile Dev Dependencies
- Tokens Package Manifest
- CI Supabase & Colour Lint
- Base TypeScript Config
- Category Tray Spec
- Working Agreement
- Mobile Scripts
- Design Tokens Pipeline
- Design Handoff Rules
- Ci · Design
- ESLint Config
- Handoff in Design
- Jest Config
- Instructor Profile & Hero
- Tab Layout & Messages
-  Layout
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 95 edges
2. `useTheme()` - 81 edges
3. `T()` - 79 edges
4. `Decisions log (D1–D52)` - 56 edges
5. `react-i18next` - 45 edges
6. `useLang()` - 42 edges
7. `react` - 42 edges
8. `useSettings` - 37 edges
9. `expo-router` - 37 edges
10. `Phase 1 technical design` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `Assumption: Expo Go on iPhone, SDK 57` --references--> `D9: iOS testing in Expo Go`  [INFERRED]
  specs/phase-0/requirements.md → docs/DECISIONS.md
- `npm run check gate` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md
- `CI-only database tests` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (56 total, 3 thin omitted)

### Community 0 - "Onboarding Screens & Draft"
Cohesion: 0.06
Nodes (69): SignUp(), submit(), styles, clock(), Verify(), Categories(), styles, Interests() (+61 more)

### Community 1 - "Seed Data & Gallery Copy"
Cohesion: 0.05
Nodes (64): GalleryRoute(), DEMO_BASE, FLAGS, Gallery(), SLOTS, styles, THEMES, WEEK (+56 more)

### Community 2 - "Explore Filters Sheet"
Cohesion: 0.05
Nodes (70): FiltersSheet(), styles, TYPES, WHEN, Explore(), styles, Home(), styles (+62 more)

### Community 3 - "Review & Pay Checkout"
Cohesion: 0.06
Nodes (62): BookingDetail(), styles, BookingsFilter(), CancelSheet(), REASONS, styles, DemoCheckout(), Family() (+54 more)

### Community 4 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (34): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+26 more)

### Community 5 - "Family Members"
Cohesion: 0.13
Nodes (25): AppearanceSheet(), styles, THEMES, styles, styles, styles, LANGS, LanguageSheet() (+17 more)

### Community 6 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 7 - "Search Field & Generated Tokens"
Cohesion: 0.11
Nodes (23): styles, styles, OtpBoxes(), Props, styles, Props, styles, Props (+15 more)

### Community 8 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 9 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.08
Nodes (6): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Decisions log (D1–D52)

### Community 10 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.11
Nodes (23): KIDS_AGE, styles, styles, resolveScheme(), Scheme, useTheme(), Day, DayPicker() (+15 more)

### Community 11 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 12 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 13 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 14 - "Buttons & Chips"
Cohesion: 0.15
Nodes (14): styles, Welcome(), GallerySheet(), styles, styles, Button(), ButtonVariant, Props (+6 more)

### Community 15 - "Tab Screens"
Cohesion: 0.12
Nodes (17): Props, styles, ConfirmationRing(), styles, styles, directional, Icon(), IconName (+9 more)

### Community 16 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (21): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+13 more)

### Community 17 - "Root Layout & Profile"
Cohesion: 0.15
Nodes (15): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useSheetOptions(), useTabBarBottom() (+7 more)

### Community 18 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (18): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+10 more)

### Community 19 - "Handoff Component Specs"
Cohesion: 0.14
Nodes (17): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Motion specs, Navigation bar glass capsule (+9 more)

### Community 20 - "Demo Checkout & Checkout Tests"
Cohesion: 0.16
Nodes (16): Book(), days, mockData, mockFamily, mockParams, now, cairoDay(), cairoHM() (+8 more)

### Community 21 - "Instructor & Booking Data"
Cohesion: 0.14
Nodes (14): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+6 more)

### Community 22 - "Family Member Sheet"
Cohesion: 0.17
Nodes (16): FamilyMemberSheet(), styles, CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits() (+8 more)

### Community 23 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 24 - "Category Tray"
Cohesion: 0.15
Nodes (13): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray(), component (+5 more)

### Community 25 - "CI Jobs"
Cohesion: 0.22
Nodes (10): CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Bookings, Arabic strings: Cancel sheet, Arabic strings: Demo payment, Arabic strings: Reschedule, Resolved owner answers (17 Oct), T16: PaymentProvider + Edge Functions, T17: Bookings list + Booking detail (+2 more)

### Community 26 - "Phase 1 Design Notes"
Cohesion: 0.17
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 27 - "Search Field, Switch & Tokens"
Cohesion: 0.16
Nodes (12): Props, styles, Props, Switch(), blur, dark, light, radius (+4 more)

### Community 28 - "Selection Lens & Segmented Control"
Cohesion: 0.20
Nodes (12): GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles, TabBar() (+4 more)

### Community 29 - "Nav Bar & Dashed Card"
Cohesion: 0.20
Nodes (8): styles, styles, DashedCard(), styles, styles, NavAction, Props, styles

### Community 30 - "Root Stack"
Cohesion: 0.23
Nodes (11): ORDER, ROUTE, TabsLayout(), Props, restoreTabBar(), styles, TabKey, TABS (+3 more)

### Community 31 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.28
Nodes (8): Expo Go only, JS RTL, Theme, direction and accessibility plumbing (R5), App shape and routes, Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens

### Community 32 - "Accessibility & Theme"
Cohesion: 0.23
Nodes (9): useSettings, off, A11y, isContrast(), mergeA11y(), useA11y(), useApplyThemeOverride(), react (+1 more)

### Community 33 - "i18n & Gallery Copy"
Cohesion: 0.23
Nodes (9): BottomActionBar(), Props, styles, Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props (+1 more)

### Community 34 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 35 - "Task Plan & Handoff"
Cohesion: 0.15
Nodes (11): Seed sample content (§14), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell, T22 Maestro flow (not run in Phase 0) (+3 more)

### Community 36 - "Confirmed & Checkout Tests"
Cohesion: 0.22
Nodes (10): Confirmed(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace, mockPromo (+2 more)

### Community 37 - "Workshop Seats"
Cohesion: 0.29
Nodes (8): styles, Workshop(), useBookDraft, clampSeats(), maxWorkshopSeats(), mockData, mockParams, DateButton()

### Community 38 - "App Shape, Auth & Journey Gate"
Cohesion: 0.36
Nodes (8): Demo sign-in, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth, R4 onboarding, T9: Onboarding (Categories, Interests, Levels, Who & where)

### Community 39 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 40 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 41 - "CI Supabase & Colour Lint"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Assumption: Expo Go on iPhone, SDK 57, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21 (+2 more)

### Community 42 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 43 - "Category Tray Spec"
Cohesion: 0.33
Nodes (6): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 44 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 45 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 46 - "Design Tokens Pipeline"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 47 - "Design Handoff Rules"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 48 - "CI Design & Tokens Package"
Cohesion: 0.40
Nodes (5): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), T7 CI workflow

### Community 49 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 50 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 51 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 52 - "Instructor Profile & Hero"
Cohesion: 0.50
Nodes (4): InstructorProfile(), testHero(), Hero(), SessionRow()

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 426 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Button · Chip` to `Onboarding Screens & Draft`, `Seed Data & Gallery Copy`, `Explore Filters Sheet`, `Review & Pay Checkout`, `Family Members`, `Search Field & Generated Tokens`, `Buttons, Welcome & Demo Checkout`, `Tab Screens`, `Mobile Package Manifest`, `Root Layout & Profile`, `Instructor & Booking Data`, `Family · Shell Test`, `Category Tray`, `Generated · Searchfield`, `Selection Lens & Segmented Control`, `Navigationbar · Dashedcard`, `Root Stack`, `Usea11Y · Theme Test`, `i18n & Gallery Copy`, `Workshop Test · [Id]`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.057455540355677154 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `Seed Data & Gallery Copy` be split into smaller, more focused modules?**
  _Cohesion score 0.05266106442577031 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D52)` connect `Decisions Log & Expo Docs Rule` to `Task Plan & Handoff`, `Arabic Copy & Dev Machine`, `App Shape, Auth & Journey Gate`, `Working Agreement & Phase 1 Design`, `Working Agreement`, `Project Guide & Design Sources`, `CI Jobs`, `Phase 1 Design Notes`, `Phase 1 Tasks & Home Decisions`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._