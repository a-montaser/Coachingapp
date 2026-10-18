# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 11 files · ~63,655 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 833 nodes · 2446 edges · 35 communities (34 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 99 edges (avg confidence: 0.88)
- Token cost: 50,000 input · 11,888 output

## Community Hubs (Navigation)
- Auth, Family & Shared UI
- Onboarding Screens & Draft
- Dev Gallery & Language Sheet
- Home Screen & Read Models
- Working Agreement & Phase 1 Design
- Mobile Runtime Dependencies
- Token Generator Script
- Settings & Family Sheets
- Expo App Config
- Mobile Package Manifest
- Design Handoff Rules
- Phone Sign-up & Verify
- Decisions Log & Expo Docs Rule
- Phase 1 Tasks & Home Decisions
- Root Package & Scripts
- Maestro & Phase 0 Design
- Arabic & RTL Support
- Project Guide & Design Sources
- Mobile TypeScript Config
- Onboarding & Demo Sign-in Decisions
- Dev Machine & Expo Go Limits
- CI Supabase & Colour Lint
- Mobile Dev Dependencies
- Arabic Copy & Dev Machine
- Tokens Package Manifest
- CI Checks & Glass Rules
- Base TypeScript Config
- Handoff Open Questions & Boundaries
- Expo Agent Guide
- Mobile Scripts
- Design Token Specs
- ESLint Config
- Glass Accessibility Fallbacks
- Jest Native Mocks
- Jest Config

## God Nodes (most connected - your core abstractions)
1. `T()` - 81 edges
2. `useTheme()` - 63 edges
3. `react-native` - 60 edges
4. `Decisions log (D1-D36)` - 40 edges
5. `useLang()` - 38 edges
6. `Icon()` - 34 edges
7. `react-i18next` - 32 edges
8. `Coach For All design handoff` - 32 edges
9. `useSettings` - 29 edges
10. `react` - 27 edges

## Surprising Connections (you probably didn't know these)
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go on iPhone 16 Pro`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md
- `Phase branch git workflow (commit per task)` --conceptually_related_to--> `Phase 1 ordered tasks`  [INFERRED]
  CLAUDE.md → specs/phase-1/tasks.md
- `Assumption: Expo Go on iPhone, SDK 57` --references--> `D9: iOS testing in Expo Go on iPhone 16 Pro`  [INFERRED]
  specs/phase-0/requirements.md → docs/DECISIONS.md
- `Maestro gallery E2E flow` --implements--> `R9 Gallery screen`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/requirements.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Booking, payment and cancellation pipeline** — specs_phase_1_tasks_t2, specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, specs_phase_1_tasks_t18, docs_decisions_d29 [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Liquid Glass rendering rules** — docs_decisions_d16, docs_decisions_d17, docs_decisions_d20, docs_decisions_d33 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]
- **Onboarding-before-sign-up flow (Categories, Interests, Levels, Who & where)** — specs_phase_1_tasks_t9, docs_decisions_d32, docs_decisions_d34, docs_decisions_d35, docs_translations_ar_app_strings_onboarding_strings [INFERRED 0.95]

## Communities (35 total, 1 thin omitted)

### Community 0 - "Auth, Family & Shared UI"
Cohesion: 0.05
Nodes (110): styles, styles, styles, Welcome(), styles, GallerySheet(), styles, styles (+102 more)

### Community 1 - "Onboarding Screens & Draft"
Cohesion: 0.06
Nodes (65): unstable_settings, Family(), RootLayout(), RootNavigator(), styles, Categories(), styles, Interests() (+57 more)

### Community 2 - "Dev Gallery & Language Sheet"
Cohesion: 0.07
Nodes (51): clock(), GalleryRoute(), LANGS, LanguageSheet(), styles, Gallery(), ar, en (+43 more)

### Community 3 - "Home Screen & Read Models"
Cohesion: 0.06
Nodes (47): Home(), styles, cairo(), cairoDaysUntil(), distanceKm(), greetingPeriod(), GroupSessionRow, InstructorCardRow (+39 more)

### Community 4 - "Working Agreement & Phase 1 Design"
Cohesion: 0.09
Nodes (35): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops), book() SQL function, bookings table (+27 more)

### Community 5 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 7 - "Settings & Family Sheets"
Cohesion: 0.12
Nodes (24): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), Field(), FieldProps, styles, SignOutSheet() (+16 more)

### Community 8 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 9 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 10 - "Design Handoff Rules"
Cohesion: 0.14
Nodes (16): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Component specs (§5), Starting data model proposal, Motion specs (+8 more)

### Community 11 - "Phone Sign-up & Verify"
Cohesion: 0.22
Nodes (17): SignUp(), submit(), Verify(), onChange(), resend(), authErrorKey(), e164(), formatEgMobile() (+9 more)

### Community 12 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.13
Nodes (3): Decisions log (D1-D36), G1 GitHub push and CI green on phase-0, PR into main, G2 Supabase keys in .env, link and db push

### Community 13 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.20
Nodes (17): Home strings (home.*), Phase 1 ordered tasks, T1: Schema migration (tables, RLS, my_bookings view, profile trigger), T10: Home x4 + category tray, Sports Book again, T11: Explore with search, Filters and Sort sheets, empty state, T12: Instructor profile (canvas 8), T13: Workshop (canvas 9) with seat stepper, T14: Book screen (1:1, group, kids) (+9 more)

### Community 14 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 15 - "Maestro & Phase 0 Design"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 16 - "Arabic & RTL Support"
Cohesion: 0.15
Nodes (14): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), setLanguage RTL switch (forceRTL + reload), R10 Knowledge map (graphify), R5 Theme, direction and accessibility plumbing, R9 Gallery screen, Phase 0 ordered tasks (+6 more)

### Community 17 - "Project Guide & Design Sources"
Cohesion: 0.18
Nodes (7): CLAUDE.md (Coach For All project instructions), Coach For All (Cairo lesson-booking app), npm run check (lint + typecheck + tests + token freshness), Phase branch git workflow (commit per task), cfa design system artifact, Design canvas 'Coach For All · Hobbies' artifact, T22: Graphify --update, DECISIONS, phase report

### Community 18 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 19 - "Onboarding & Demo Sign-in Decisions"
Cohesion: 0.25
Nodes (7): Demo sign-in (Supabase test number), Sign-in and sign-out strings (auth.*), Onboarding strings (onboarding.*), T20: Maestro in CI (Android debug build, local Supabase, fake provider), T5: Data layer (Supabase client, QueryClient, AsyncStorage settings persistence), T6: Auth screens (Welcome, Sign up, Verify, auth gate, sign-out sheet), T9: Categories, Interests, Levels, Who & where onboarding before sign-up

### Community 20 - "Dev Machine & Expo Go Limits"
Cohesion: 0.20
Nodes (3): Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T22 Maestro flow (not run in Phase 0)

### Community 21 - "CI Supabase & Colour Lint"
Cohesion: 0.22
Nodes (10): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), Last-seat concurrency step (20 simultaneous bookings), CI Supabase job (db reset, lint, pgTAP), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), R3 Supabase foundation, T6 Supabase init (+2 more)

### Community 22 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 23 - "Arabic Copy & Dev Machine"
Cohesion: 0.24
Nodes (6): Arabic app strings to translate (Egyptian Arabic sheet), i18n app string keys (tabs, category, card, slots, auth), Double-brace placeholders kept verbatim, Profile and Family & kids strings, T21: Arabic pass (strings into ar-app-strings.md), T8: Profile, Family & kids, Language / Appearance sheets

### Community 24 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 25 - "CI Checks & Glass Rules"
Cohesion: 0.27
Nodes (10): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21 (+2 more)

### Community 26 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 27 - "Handoff Open Questions & Boundaries"
Cohesion: 0.22
Nodes (7): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal, Lint rule rejecting colour literals outside packages/tokens, R2 Quality gates, T5 Lint, format, typecheck, Jest

### Community 29 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 30 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 31 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 32 - "Glass Accessibility Fallbacks"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 33 - "Jest Native Mocks"
Cohesion: 0.50
Nodes (3): @react-native-async-storage/async-storage, react-native-gesture-handler, react-native-reanimated

### Community 34 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **31 isolated node(s):** `supabase`, `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 307 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Auth, Family & Shared UI` to `Onboarding Screens & Draft`, `Dev Gallery & Language Sheet`, `Home Screen & Read Models`, `Settings & Family Sheets`, `Mobile Package Manifest`, `Phone Sign-up & Verify`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `supabase`, `@cfa/tokens`, `expo` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth, Family & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.050552285737321616 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.06288568909785483 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1-D36)` connect `Decisions Log & Expo Docs Rule` to `Working Agreement & Phase 1 Design`, `Phase 1 Tasks & Home Decisions`, `Arabic & RTL Support`, `Project Guide & Design Sources`, `Onboarding & Demo Sign-in Decisions`, `Dev Machine & Expo Go Limits`, `Arabic Copy & Dev Machine`, `Expo Agent Guide`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._