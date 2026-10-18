# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 16 files · ~71,428 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 925 nodes · 2765 edges · 42 communities (39 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.87)
- Token cost: 52,000 input · 12,950 output

## Community Hubs (Navigation)
- Auth, Family & Shared UI
- Dev Gallery & Language Sheet
- Onboarding Screens & Draft
- Working Agreement & Phase 1 Design
- Tokens & Accessibility Settings
- Mobile Runtime Dependencies
- Token Generator Script
- Settings & Family Sheets
- Mobile Package Manifest
- Discovery: Home & Explore Data
- Arabic Copy & Dev Machine
- Decisions Log & Expo Docs Rule
- Expo App Config
- Design Handoff Rules
- Phase 1 Tasks & Home Decisions
- Phone Sign-up & Verify
- Instructor Profile
- Home Read Models
- Root Package & Scripts
- CI Supabase & Colour Lint
- Maestro & Phase 0 Design
- Arabic & RTL Support
- Explore Rule Tests
- Dev Machine & Expo Go Limits
- Mobile TypeScript Config
- Root Layout & Journey Gate
- Project Guide & Design Sources
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Phase 0 Report & Risks
- Mobile Scripts
- Explore Location & Results
- Onboarding & Demo Sign-in Decisions
- Design Token Specs
- Handoff Open Questions & Boundaries
- ESLint Config
- Glass Accessibility Fallbacks
- Jest Config
- Decision–Task Links
- Auth & Onboarding Layouts
- Stack Layouts

## God Nodes (most connected - your core abstractions)
1. `T()` - 80 edges
2. `useTheme()` - 66 edges
3. `react-native` - 65 edges
4. `useLang()` - 41 edges
5. `Decisions log` - 41 edges
6. `Icon()` - 37 edges
7. `react-i18next` - 35 edges
8. `useSettings` - 33 edges
9. `Coach For All design handoff` - 32 edges
10. `react` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md
- `D1: One spec per phase in /specs/phase-N/ (requirements, design, tasks) with a single…` --semantically_similar_to--> `After-every-task routine (spec, map, Project Map page, commit)`  [INFERRED] [semantically similar]
  docs/DECISIONS.md → CLAUDE.md
- `T19 TabBar with minimise` --implements--> `Floating glass tab bar with minimise on scroll`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md
- `CI Supabase job (db reset, lint, pgTAP)` --implements--> `D4: Hosted Supabase dev project; local Docker Supabase only in Linux CI`  [INFERRED]
  .github/workflows/ci.yml → docs/DECISIONS.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go on iPhone 16 Pro (iOS 26.6.2); Android emulator also uses Expo…`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Discovery screens (Home, Explore, Instructor profile)** — specs_phase_1_tasks_t10, specs_phase_1_tasks_t11, specs_phase_1_tasks_t12, docs_decisions_d36, docs_decisions_d37, docs_decisions_d38 [INFERRED 0.85]
- **Expo Go device-testing constraints** — docs_decisions_d9, docs_decisions_d14, docs_decisions_d22, docs_decisions_d26, claude_expo_go_js_rtl [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]
- **Onboarding before sign-up flow** — docs_decisions_d34, docs_decisions_d35, docs_decisions_d32, specs_phase_1_tasks_t9, docs_translations_ar_app_strings_onboarding_strings [INFERRED 0.85]

## Communities (42 total, 3 thin omitted)

### Community 0 - "Auth, Family & Shared UI"
Cohesion: 0.05
Nodes (118): styles, styles, Welcome(), styles, styles, styles, styles, styles (+110 more)

### Community 1 - "Dev Gallery & Language Sheet"
Cohesion: 0.06
Nodes (55): GalleryRoute(), LANGS, LanguageSheet(), styles, Gallery(), Section(), ar, en (+47 more)

### Community 2 - "Onboarding Screens & Draft"
Cohesion: 0.08
Nodes (49): Family(), GallerySheet(), Categories(), styles, Interests(), Levels(), AREA_ORDER, Pref (+41 more)

### Community 3 - "Working Agreement & Phase 1 Design"
Cohesion: 0.08
Nodes (39): Last-seat concurrency step (20 simultaneous bookings), Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, NavigationBar P17 (one glass capsule), Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops) (+31 more)

### Community 4 - "Tokens & Accessibility Settings"
Cohesion: 0.09
Nodes (26): A11yFlag, Settings, useSettings, off, A11y, isContrast(), mergeA11y(), useA11y() (+18 more)

### Community 5 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 7 - "Settings & Family Sheets"
Cohesion: 0.12
Nodes (24): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), Field(), FieldProps, styles, SignOutSheet() (+16 more)

### Community 8 - "Mobile Package Manifest"
Cohesion: 0.07
Nodes (26): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+18 more)

### Community 9 - "Discovery: Home & Explore Data"
Cohesion: 0.12
Nodes (24): FiltersSheet(), Group(), styles, TYPES, WHEN, SORTS, SortSheet(), styles (+16 more)

### Community 10 - "Arabic Copy & Dev Machine"
Cohesion: 0.13
Nodes (25): Demo sign-in (Supabase test number), Arabic app strings to translate, i18n app string keys (tabs, category, card, slots, auth), Appearance sheet strings, Sign-in and sign-out strings (auth.*), Buttons (screen-reader labels) strings, Buttons and messages strings, Buttons (mostly screen-reader labels) strings (+17 more)

### Community 11 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.10
Nodes (4): Design canvas and design system artifacts, Decisions log, cfa design system artifact, Design canvas 'Coach For All · Hobbies' artifact

### Community 12 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 13 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (18): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Component specs (§5), Starting data model proposal, Motion specs (+10 more)

### Community 14 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.14
Nodes (18): Explore, Filters and Sort strings, Instructor profile strings, Phase 1 ordered tasks, T1 Schema migration, T11 Explore (canvas 7), T12 Instructor profile (canvas 8), T13 Workshop (canvas 9), T14 Book screen (+10 more)

### Community 15 - "Phone Sign-up & Verify"
Cohesion: 0.25
Nodes (17): SignUp(), submit(), clock(), styles, Verify(), onChange(), resend(), authErrorKey() (+9 more)

### Community 16 - "Instructor Profile"
Cohesion: 0.14
Nodes (14): InstructorProfile(), Section(), InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot (+6 more)

### Community 17 - "Home Read Models"
Cohesion: 0.17
Nodes (15): Explore(), Home(), cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, MyBookingRow, mockBookings (+7 more)

### Community 18 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 19 - "CI Supabase & Colour Lint"
Cohesion: 0.19
Nodes (15): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), CI Supabase job (db reset, lint, pgTAP), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9) (+7 more)

### Community 20 - "Maestro & Phase 0 Design"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 21 - "Arabic & RTL Support"
Cohesion: 0.15
Nodes (14): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R5 Theme, direction and accessibility plumbing, R9 Gallery screen, Phase 0 ordered tasks (+6 more)

### Community 22 - "Explore Rule Tests"
Cohesion: 0.15
Nodes (12): activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany, mockRows (+4 more)

### Community 23 - "Dev Machine & Expo Go Limits"
Cohesion: 0.18
Nodes (4): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57

### Community 24 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 25 - "Root Layout & Journey Gate"
Cohesion: 0.20
Nodes (8): RootLayout(), RootNavigator(), styles, queryClient, useApplyThemeOverride(), expo-font, expo-status-bar, react-native-gesture-handler

### Community 26 - "Project Guide & Design Sources"
Cohesion: 0.18
Nodes (4): Coach For All (Cairo lesson-booking app), Coach For All app, npm run check (lint + typecheck + tests + token freshness), T22 Graphify `--update`, DECISIONS, phase report

### Community 27 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 28 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 29 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 30 - "Phase 0 Report & Risks"
Cohesion: 0.29
Nodes (3): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), T22 Maestro flow (not run in Phase 0)

### Community 31 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 32 - "Explore Location & Results"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 33 - "Onboarding & Demo Sign-in Decisions"
Cohesion: 0.47
Nodes (3): Onboarding strings, T20 Maestro in CI, T9 Categories (D35), Interests (canvas 6), Levels, Who & where

### Community 34 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 35 - "Handoff Open Questions & Boundaries"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 36 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 37 - "Glass Accessibility Fallbacks"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 38 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to
- `D27: Gallery demo copy and seed content are bilingual: English handoff samples plus…` → `Instructor and workshop cards strings`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `D27: Gallery demo copy and seed content are bilingual: English handoff samples plus…` → `Buttons (mostly screen-reader labels) strings`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `D27: Gallery demo copy and seed content are bilingual: English handoff samples plus…` → `Date strip strings`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `D27: Gallery demo copy and seed content are bilingual: English handoff samples plus…` → `Time slots strings`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to

## Knowledge Gaps
- **40 isolated node(s):** `supabase`, `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking` (+35 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 348 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Auth, Family & Shared UI` to `Dev Gallery & Language Sheet`, `Onboarding Screens & Draft`, `Tokens & Accessibility Settings`, `Settings & Family Sheets`, `Mobile Package Manifest`, `Discovery: Home & Explore Data`, `Phone Sign-up & Verify`, `Instructor Profile`, `Home Read Models`, `Root Layout & Journey Gate`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `supabase`, `@cfa/tokens`, `expo` to the rest of the system?**
  _40 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth, Family & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.052554647531725465 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `Dev Gallery & Language Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.06455399061032864 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `D27: Gallery demo copy and seed content are bilingual: English handoff samples plus…` and `Instructor and workshop cards strings`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._