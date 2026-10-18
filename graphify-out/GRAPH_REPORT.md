# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 14 files · ~68,381 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 895 nodes · 2668 edges · 37 communities (36 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.86)
- Token cost: 50,000 input · 11,334 output

## Community Hubs (Navigation)
- Auth, Family & Shared UI
- Dev Gallery & Language Sheet
- Discovery: Home & Explore Data
- Onboarding Screens & Draft
- Working Agreement & Phase 1 Design
- Mobile Runtime Dependencies
- Token Generator Script
- Settings & Family Sheets
- Expo App Config
- Mobile Package Manifest
- Arabic Copy & Dev Machine
- Design Handoff Rules
- Decisions Log & Expo Docs Rule
- Phone Sign-up & Verify
- Root Package & Scripts
- CI Supabase & Colour Lint
- Dev Machine & Expo Go Limits
- Maestro & Phase 0 Design
- Arabic & RTL Support
- Mobile TypeScript Config
- Phase 1 Tasks & Home Decisions
- Root Layout & Journey Gate
- Project Guide & Design Sources
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Phase 0 Report & Risks
- Open Phase 1 Tasks
- Mobile Scripts
- Tab Layout
- Design Token Specs
- Handoff Open Questions & Boundaries
- Manual Layout Tokens
- ESLint Config
- Onboarding & Demo Sign-in Decisions
- Glass Accessibility Fallbacks
- Jest Config

## God Nodes (most connected - your core abstractions)
1. `T()` - 80 edges
2. `useTheme()` - 64 edges
3. `react-native` - 62 edges
4. `useLang()` - 40 edges
5. `Decisions log` - 40 edges
6. `Icon()` - 35 edges
7. `react-i18next` - 34 edges
8. `useSettings` - 32 edges
9. `Coach For All design handoff` - 32 edges
10. `react` - 30 edges

## Surprising Connections (you probably didn't know these)
- `Phase branch git workflow (commit per task)` --conceptually_related_to--> `Phase 1 ordered tasks`  [INFERRED]
  CLAUDE.md → specs/phase-1/tasks.md
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md
- `T19 TabBar with minimise` --implements--> `Floating glass tab bar with minimise on scroll`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md
- `Maestro gallery E2E flow` --implements--> `R9 Gallery screen`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/requirements.md
- `Gallery flow: Reduce Transparency / Increase Contrast screenshots` --references--> `Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion)`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → docs/DESIGN_HANDOFF.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Discovery tasks and their open-question decisions** — specs_phase_1_tasks_t10, specs_phase_1_tasks_t11, docs_decisions_d36, docs_decisions_d37, docs_translations_ar_app_strings_home_strings, docs_translations_ar_app_strings_explore_strings [INFERRED 0.85]
- **Expo Go on iPhone-only testing constraints** — docs_decisions_d3, docs_decisions_d9, docs_decisions_d14, docs_decisions_d22, docs_decisions_d26 [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]
- **Onboarding before sign-up flow** — docs_decisions_d34, docs_decisions_d35, docs_decisions_d32, specs_phase_1_tasks_t9, docs_translations_ar_app_strings_onboarding_strings [INFERRED 0.85]

## Communities (37 total, 1 thin omitted)

### Community 0 - "Auth, Family & Shared UI"
Cohesion: 0.05
Nodes (103): styles, styles, Welcome(), styles, GallerySheet(), styles, styles, Screen() (+95 more)

### Community 1 - "Dev Gallery & Language Sheet"
Cohesion: 0.06
Nodes (82): GalleryRoute(), LANGS, LanguageSheet(), styles, styles, styles, FLAGS, Gallery() (+74 more)

### Community 2 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (62): FiltersSheet(), Group(), styles, TYPES, WHEN, SORTS, SortSheet(), styles (+54 more)

### Community 3 - "Onboarding Screens & Draft"
Cohesion: 0.07
Nodes (53): unstable_settings, Categories(), styles, Interests(), styles, unstable_settings, Levels(), styles (+45 more)

### Community 4 - "Working Agreement & Phase 1 Design"
Cohesion: 0.08
Nodes (39): Last-seat concurrency step (20 simultaneous bookings), Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, NavigationBar P17 (one glass capsule), Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops) (+31 more)

### Community 5 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 7 - "Settings & Family Sheets"
Cohesion: 0.12
Nodes (23): AppearanceSheet(), styles, THEMES, Family(), FamilyMemberSheet(), Field(), FieldProps, styles (+15 more)

### Community 8 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 9 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (24): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+16 more)

### Community 10 - "Arabic Copy & Dev Machine"
Cohesion: 0.14
Nodes (23): Demo sign-in (Supabase test number), Arabic app strings to translate, i18n app string keys (tabs, category, card, slots, auth), Appearance sheet strings, Sign-in and sign-out strings (auth.*), Buttons (screen-reader labels) strings, Buttons and messages strings, Instructor and workshop cards strings (+15 more)

### Community 11 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (18): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Component specs (§5), Starting data model proposal, Motion specs (+10 more)

### Community 12 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.11
Nodes (4): Decisions log, G1 GitHub push and CI green, G2 Supabase keys, link and db push, T3 Seed

### Community 13 - "Phone Sign-up & Verify"
Cohesion: 0.25
Nodes (17): SignUp(), submit(), clock(), styles, Verify(), onChange(), resend(), authErrorKey() (+9 more)

### Community 14 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 15 - "CI Supabase & Colour Lint"
Cohesion: 0.19
Nodes (15): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), CI Supabase job (db reset, lint, pgTAP), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9) (+7 more)

### Community 16 - "Dev Machine & Expo Go Limits"
Cohesion: 0.14
Nodes (5): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T21 Arabic pass

### Community 17 - "Maestro & Phase 0 Design"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 18 - "Arabic & RTL Support"
Cohesion: 0.15
Nodes (14): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R5 Theme, direction and accessibility plumbing, R9 Gallery screen, Phase 0 ordered tasks (+6 more)

### Community 19 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 20 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.19
Nodes (12): Messages tab strings, Phase 1 ordered tasks, T1 Schema migration, T15 Review & pay + promo + Confirmed, T16 PaymentProvider + Edge Functions, T18 Cancel sheet + refund flow; Reschedule, T19 Local reminders, T2 Booking functions (+4 more)

### Community 21 - "Root Layout & Journey Gate"
Cohesion: 0.20
Nodes (8): RootLayout(), RootNavigator(), styles, queryClient, useApplyThemeOverride(), expo-font, expo-status-bar, react-native-gesture-handler

### Community 22 - "Project Guide & Design Sources"
Cohesion: 0.24
Nodes (6): CLAUDE.md (Coach For All project instructions), Coach For All (Cairo lesson-booking app), npm run check (lint + typecheck + tests + token freshness), Phase branch git workflow (commit per task), cfa design system artifact, Design canvas 'Coach For All · Hobbies' artifact

### Community 23 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 24 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 25 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 26 - "Phase 0 Report & Risks"
Cohesion: 0.22
Nodes (4): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), T22 Maestro flow (not run in Phase 0), T20 Maestro in CI

### Community 27 - "Open Phase 1 Tasks"
Cohesion: 0.48
Nodes (5): Explore, Filters and Sort strings, T11 Explore with Filters and Sort sheets, T12 Instructor profile, T13 Workshop with seat stepper, T17 Bookings list + Booking detail

### Community 28 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 29 - "Tab Layout"
Cohesion: 0.33
Nodes (5): ORDER, ROUTE, SF, TabsLayout(), TabKey

### Community 30 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 31 - "Handoff Open Questions & Boundaries"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 32 - "Manual Layout Tokens"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 33 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 35 - "Glass Accessibility Fallbacks"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 36 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to
- `T14 Book screen` → `Date strip strings`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: implements
- `T14 Book screen` → `Time slots strings`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: implements

## Knowledge Gaps
- **36 isolated node(s):** `supabase`, `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 329 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Auth, Family & Shared UI` to `Dev Gallery & Language Sheet`, `Discovery: Home & Explore Data`, `Onboarding Screens & Draft`, `Settings & Family Sheets`, `Mobile Package Manifest`, `Phone Sign-up & Verify`, `Root Layout & Journey Gate`, `Tab Layout`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `supabase`, `@cfa/tokens`, `expo` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth, Family & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.050017427675148135 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `Dev Gallery & Language Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.05504587155963303 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `T14 Book screen` and `Date strip strings`?**
  _Edge tagged AMBIGUOUS (relation: implements) - confidence is low._