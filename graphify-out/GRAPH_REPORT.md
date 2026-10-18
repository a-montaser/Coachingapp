# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 86 files · ~60,305 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 788 nodes · 2313 edges · 31 communities
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.89)
- Token cost: 70,000 input · 14,208 output

## Community Hubs (Navigation)
- Account & Onboarding Screens
- Tabs Shell & Dev Gallery
- Lint & Test Tooling
- Phase 1 Design & Booking SQL
- Settings & Family Sheets
- Tab Screens & Cards
- Mobile Runtime Dependencies
- Token Generator Script
- Phone Sign-up & Verify
- Design Handoff Rules
- Accessibility & Glass Chrome
- Expo App Config
- Expo Agent Guide
- Maestro & Phase 0 Decisions
- Persisted Settings Store
- Theme, Glass & Icons
- Buttons, Chips & Sheet Demo
- Root Package & Scripts
- Project Guide & Design Sources
- Journey Gate & Root Layout
- Mobile TypeScript Config
- CI Supabase & Colour Lint
- CI Checks & Glass Rules
- Category Tray Component
- Arabic Copy & Dev Machine
- Tokens Package Manifest
- Base TypeScript Config
- Design Token Specs
- Category Tray Decisions
- Manual Layout Tokens
- Gallery Screen Spec

## God Nodes (most connected - your core abstractions)
1. `T()` - 82 edges
2. `useTheme()` - 63 edges
3. `react-native` - 60 edges
4. `useLang()` - 37 edges
5. `Icon()` - 33 edges
6. `Coach For All design handoff` - 32 edges
7. `react-i18next` - 32 edges
8. `Decisions log` - 30 edges
9. `useSettings` - 27 edges
10. `react` - 26 edges

## Surprising Connections (you probably didn't know these)
- `npm run check command` --semantically_similar_to--> `CI checks job (lint, typecheck, test, tokens:check)`  [INFERRED] [semantically similar]
  CLAUDE.md → .github/workflows/ci.yml
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md
- `Atomic bookings / no double booking` --implements--> `book() SQL function`  [INFERRED]
  docs/WORKING_AGREEMENT.md → specs/phase-1/design.md
- `EAS build/submit/update` --conceptually_related_to--> `D9 Expo Go on iPhone 16 Pro`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `Maestro gallery E2E flow` --implements--> `R9 Gallery screen`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/requirements.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]

## Communities (31 total, 0 thin omitted)

### Community 0 - "Account & Onboarding Screens"
Cohesion: 0.06
Nodes (77): unstable_settings, styles, Welcome(), Family(), styles, GallerySheet(), Categories(), styles (+69 more)

### Community 1 - "Tabs Shell & Dev Gallery"
Cohesion: 0.05
Nodes (72): GalleryRoute(), ORDER, ROUTE, SF, TabsLayout(), FLAGS, Gallery(), Section() (+64 more)

### Community 2 - "Lint & Test Tooling"
Cohesion: 0.04
Nodes (47): { defineConfig }, expoConfig, devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier (+39 more)

### Community 3 - "Phase 1 Design & Booking SQL"
Cohesion: 0.08
Nodes (44): Last-seat concurrency step (20 simultaneous bookings), Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops), book() SQL function, bookings table, cancel_booking() SQL function, create-checkout Edge Function (+36 more)

### Community 4 - "Settings & Family Sheets"
Cohesion: 0.11
Nodes (28): AppearanceSheet(), styles, THEMES, FamilyMemberSheet(), Field(), FieldProps, styles, LANGS (+20 more)

### Community 5 - "Tab Screens & Cards"
Cohesion: 0.10
Nodes (21): Screen(), Screen(), Screen(), Card(), Props, styles, styles, styles (+13 more)

### Community 6 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 7 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 8 - "Phone Sign-up & Verify"
Cohesion: 0.18
Nodes (22): SignUp(), submit(), styles, clock(), styles, Verify(), onChange(), resend() (+14 more)

### Community 9 - "Design Handoff Rules"
Cohesion: 0.11
Nodes (21): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs (+13 more)

### Community 10 - "Accessibility & Glass Chrome"
Cohesion: 0.14
Nodes (18): A11y, isContrast(), mergeA11y(), useA11y(), BottomActionBar(), Props, styles, glassMode (+10 more)

### Community 11 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 12 - "Expo Agent Guide"
Cohesion: 0.12
Nodes (9): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Decisions log, Mac dev environment and toolchain, Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T22 Maestro flow (not run in Phase 0), G2 Supabase keys and link (+1 more)

### Community 13 - "Maestro & Phase 0 Decisions"
Cohesion: 0.12
Nodes (20): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Glass decision table (GlassView / BlurView / frosted) (+12 more)

### Community 14 - "Persisted Settings Store"
Cohesion: 0.17
Nodes (14): Category, Settings, ThemePref, useSettings, off, resolveScheme(), Scheme, useApplyThemeOverride() (+6 more)

### Community 15 - "Theme, Glass & Icons"
Cohesion: 0.19
Nodes (15): useTheme(), Glass(), IconName, IconButton(), Props, styles, styles, Props (+7 more)

### Community 16 - "Buttons, Chips & Sheet Demo"
Cohesion: 0.14
Nodes (14): styles, ButtonVariant, Props, styles, Chip(), Props, styles, Props (+6 more)

### Community 17 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 18 - "Project Guide & Design Sources"
Cohesion: 0.15
Nodes (10): CLAUDE.md project guide, Coach For All (Cairo lesson-booking app), Demo sign-in test number (+20 100 234 5678 / 482917), cfa design system artifact, Design canvas 'Coach For All · Hobbies' artifact, Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail (+2 more)

### Community 19 - "Journey Gate & Root Layout"
Cohesion: 0.22
Nodes (12): RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useIsRTL(), CategoryTray(), Radio() (+4 more)

### Community 20 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 21 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (11): CI workflow (ci.yml), CI Supabase job (db reset, lint, pgTAP), CI design (checks + supabase jobs), Lint rule rejecting colour literals outside packages/tokens, R2 Quality gates, R3 Supabase foundation, Phase 0 ordered tasks, T24 Graphify update and phase report (+3 more)

### Community 22 - "CI Checks & Glass Rules"
Cohesion: 0.21
Nodes (10): CI checks job (lint, typecheck, test, tokens:check), npm run check command, Phase 0 requirements, Category Tray (R8, handoff 6.2), Design tokens package (packages/tokens, R4), Dev-only component gallery (R9), Glass material primitive (R6), Phase 0 primitives P1-P21 (+2 more)

### Community 23 - "Category Tray Component"
Cohesion: 0.22
Nodes (6): CATEGORIES, Props, styles, react-native-gesture-handler, react-native-reanimated, react-native-worklets

### Community 24 - "Arabic Copy & Dev Machine"
Cohesion: 0.20
Nodes (5): Arabic app strings sheet, i18n app string keys (tabs, category, card, slots, auth), Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), T21 Arabic pass

### Community 25 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 26 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 27 - "Design Token Specs"
Cohesion: 0.31
Nodes (7): Colour tokens (§3.1), Component specs (§5), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 28 - "Category Tray Decisions"
Cohesion: 0.40
Nodes (5): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 29 - "Manual Layout Tokens"
Cohesion: 0.40
Nodes (4): homeIndicator, icon, layout, tray

### Community 30 - "Gallery Screen Spec"
Cohesion: 0.50
Nodes (3): Seed sample content (§14), R9 Gallery screen, T12 Gallery shell

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **30 isolated node(s):** `supabase`, `Motion specs`, `App navigation map`, `Screen specs (Welcome to Profile)`, `@cfa/tokens` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Tab Screens & Cards` to `Account & Onboarding Screens`, `Tabs Shell & Dev Gallery`, `Lint & Test Tooling`, `Settings & Family Sheets`, `Phone Sign-up & Verify`, `Accessibility & Glass Chrome`, `Persisted Settings Store`, `Theme, Glass & Icons`, `Buttons, Chips & Sheet Demo`, `Journey Gate & Root Layout`, `Category Tray Component`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `supabase`, `Motion specs`, `App navigation map` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Account & Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.061414141414141414 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Lint & Test Tooling`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `Tabs Shell & Dev Gallery` be split into smaller, more focused modules?**
  _Cohesion score 0.053763440860215055 - nodes in this community are weakly interconnected._
- **Why does `T()` connect `Account & Onboarding Screens` to `Tabs Shell & Dev Gallery`, `Settings & Family Sheets`, `Tab Screens & Cards`, `Phone Sign-up & Verify`, `Accessibility & Glass Chrome`, `Theme, Glass & Icons`, `Buttons, Chips & Sheet Demo`, `Journey Gate & Root Layout`, `Category Tray Component`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._