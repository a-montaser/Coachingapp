# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 15 files · ~77,849 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 970 nodes · 2942 edges · 41 communities (39 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.87)
- Token cost: 38,000 input · 10,663 output

## Community Hubs (Navigation)
- Dates, Slots & Seed
- Onboarding Screens & Draft
- Settings & Accessibility
- Discovery: Home & Explore Data
- Phone Sign-up & Verify
- Working Agreement & Phase 1 Design
- Mobile Runtime Dependencies
- Icons & Lists
- Decisions Log & Expo Docs Rule
- Token Generator Script
- Gallery Controls
- Mobile Package Manifest
- Expo App Config
- Arabic Copy & Dev Machine
- Auth, Family & Shared UI
- Tab Bar & Navigation
- Instructor, Workshop & Book Data
- Detail Screens & Theme
- Design Handoff Rules
- Project Guide & Design Sources
- Root Package & Scripts
- Task Plan & Handoff
- Chips, Icon Buttons & Search
- Phase 1 Tasks & Home Decisions
- Settings & Family Sheets
- Phase 1 Design Notes
- Mobile TypeScript Config
- Handoff Screens & Flows
- CI Supabase & Colour Lint
- Mobile Dev Dependencies
- Manual Layout Tokens
- Tokens Package Manifest
- Base TypeScript Config
- Dev Machine & Expo Go Limits
- Mobile Scripts
- Discovery Decisions & Strings
- Design Token Specs
- ESLint Config
- Decision–Task Links
- Jest Config
- Phase 0 Report

## God Nodes (most connected - your core abstractions)
1. `T()` - 85 edges
2. `react-native` - 70 edges
3. `useTheme()` - 65 edges
4. `Decisions log (D1–D42)` - 46 edges
5. `useLang()` - 40 edges
6. `react-i18next` - 37 edges
7. `useSettings` - 36 edges
8. `Icon()` - 34 edges
9. `react` - 33 edges
10. `Coach For All design handoff` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Buttons (mostly screen-reader labels)` --conceptually_related_to--> `T12 Instructor profile (canvas 8)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Date strip` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Time slots` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Instructor and workshop cards` --conceptually_related_to--> `T10 Home ×4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Onboarding redesign: categories first, before sign-up** — docs_decisions_d32, docs_decisions_d34, docs_decisions_d35, specs_phase_1_tasks_t9, docs_translations_ar_app_strings_onboarding_strings [EXTRACTED 1.00]
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Arabic translation pipeline (Egyptian Arabic, JS RTL, owner-supplied sheet)** — docs_decisions_d25, docs_decisions_d26, docs_decisions_d27, specs_phase_1_tasks_t21, docs_translations_ar_app_strings [INFERRED 0.85]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Design canvas / design system answer open handoff questions** — docs_decisions_d23, docs_decisions_d24, docs_decisions_d41 [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]
- **Onboarding flow decisions** — docs_decisions_d32, docs_decisions_d34, docs_decisions_d35 [INFERRED 0.85]

## Communities (41 total, 2 thin omitted)

### Community 0 - "Dates, Slots & Seed"
Cohesion: 0.07
Nodes (70): GalleryRoute(), GallerySheet(), InstructorProfile(), Section(), styles, styles, Home(), styles (+62 more)

### Community 1 - "Onboarding Screens & Draft"
Cohesion: 0.07
Nodes (60): unstable_settings, styles, Welcome(), Family(), styles, Categories(), styles, Interests() (+52 more)

### Community 2 - "Settings & Accessibility"
Cohesion: 0.05
Nodes (43): AppearanceSheet(), styles, THEMES, LANGS, LanguageSheet(), styles, RootLayout(), RootNavigator() (+35 more)

### Community 3 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (54): FiltersSheet(), Group(), styles, TYPES, WHEN, SORTS, SortSheet(), styles (+46 more)

### Community 4 - "Phone Sign-up & Verify"
Cohesion: 0.08
Nodes (39): SignUp(), submit(), styles, clock(), styles, Verify(), onChange(), resend() (+31 more)

### Community 5 - "Working Agreement & Phase 1 Design"
Cohesion: 0.07
Nodes (39): Last-seat concurrency step (20 simultaneous bookings), Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, NavigationBar P17 (one glass capsule), Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops) (+31 more)

### Community 6 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 7 - "Icons & Lists"
Cohesion: 0.12
Nodes (20): styles, Props, styles, GroupedRow, styles, styles, directional, Icon() (+12 more)

### Community 8 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.09
Nodes (3): Design canvas and design system artifacts, Decisions log (D1–D42), T22 Maestro flow (not run in Phase 0)

### Community 9 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 10 - "Gallery Controls"
Cohesion: 0.14
Nodes (22): FLAGS, SLOTS, styles, THEMES, WEEK, useTheme(), BottomActionBar(), Glass() (+14 more)

### Community 11 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (25): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+17 more)

### Community 12 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 13 - "Arabic Copy & Dev Machine"
Cohesion: 0.11
Nodes (23): Demo sign-in (Supabase test number), Arabic strings: Appearance sheet, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Date strip, Arabic strings: Explore, Filters and Sort, Arabic strings: Family & kids and its sheet (+15 more)

### Community 14 - "Auth, Family & Shared UI"
Cohesion: 0.14
Nodes (17): useIsRTL(), A11yFlag, A11y, isContrast(), mergeA11y(), useA11y(), ButtonVariant, Props (+9 more)

### Community 15 - "Tab Bar & Navigation"
Cohesion: 0.13
Nodes (16): ORDER, ROUTE, SF, TabsLayout(), NavAction, Props, styles, Props (+8 more)

### Community 16 - "Instructor, Workshop & Book Data"
Cohesion: 0.18
Nodes (17): Book(), KIDS_AGE, styles, firstName(), days, mockData, mockFamily, mockParams (+9 more)

### Community 17 - "Detail Screens & Theme"
Cohesion: 0.16
Nodes (16): off, resolveScheme(), Scheme, Props, styles, Props, styles, blur (+8 more)

### Community 18 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 19 - "Project Guide & Design Sources"
Cohesion: 0.12
Nodes (7): CI Supabase job (db reset, lint, pgTAP), Coach For All (Cairo lesson-booking app), Coach For All app, npm run check (lint + typecheck + tests + token freshness), Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T22 Graphify `--update`, DECISIONS, phase report

### Community 20 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 21 - "Task Plan & Handoff"
Cohesion: 0.13
Nodes (16): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, R9 Gallery screen (+8 more)

### Community 22 - "Chips, Icon Buttons & Search"
Cohesion: 0.15
Nodes (9): styles, galleryCopy, Props, styles, styles, PillTone, styles, touch (+1 more)

### Community 23 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.18
Nodes (15): Arabic strings: Onboarding, Phase 1 tasks.md, G1 GitHub push, G2 Supabase keys, T1 Schema migration, T16 PaymentProvider + Edge Functions, T17 Bookings list + Booking detail, T18 Cancel sheet + refund flow; Reschedule (+7 more)

### Community 24 - "Settings & Family Sheets"
Cohesion: 0.23
Nodes (13): FamilyMemberSheet(), Field(), FieldProps, styles, CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX (+5 more)

### Community 25 - "Phase 1 Design Notes"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 26 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 27 - "Handoff Screens & Flows"
Cohesion: 0.18
Nodes (12): Accessibility acceptance criteria, Bottom action bar, Component specs (§5), Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Navigation bar glass capsule, Glass sheets, Floating glass tab bar with minimise on scroll, Glass decision table (GlassView / BlurView / frosted) (+4 more)

### Community 28 - "CI Supabase & Colour Lint"
Cohesion: 0.24
Nodes (12): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9), Glass material primitive (R6) (+4 more)

### Community 29 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 30 - "Manual Layout Tokens"
Cohesion: 0.24
Nodes (8): Props, styles, component, homeIndicator, icon, layout, motion, tray

### Community 31 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 32 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 34 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 35 - "Discovery Decisions & Strings"
Cohesion: 0.60
Nodes (3): T11 Explore (canvas 7), T12 Instructor profile (canvas 8), T13 Workshop (canvas 9)

### Community 36 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 37 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 38 - "Decision–Task Links"
Cohesion: 0.70
Nodes (3): Arabic strings: Book, T14 Book screen, T15 Review & pay + promo + Confirmed

### Community 39 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Arabic strings: Buttons (mostly screen-reader labels)` → `T12 Instructor profile (canvas 8)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Date strip` → `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Instructor and workshop cards` → `T10 Home ×4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Time slots` → `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **31 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking`, `expo-localization` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 363 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Chips, Icon Buttons & Search` to `Dates, Slots & Seed`, `Onboarding Screens & Draft`, `Settings & Accessibility`, `Discovery: Home & Explore Data`, `Phone Sign-up & Verify`, `Icons & Lists`, `Gallery Controls`, `Mobile Package Manifest`, `Auth, Family & Shared UI`, `Tab Bar & Navigation`, `Instructor, Workshop & Book Data`, `Detail Screens & Theme`, `Settings & Family Sheets`, `Manual Layout Tokens`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dates, Slots & Seed` be split into smaller, more focused modules?**
  _Cohesion score 0.06869820903501737 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.06635802469135803 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Arabic strings: Buttons (mostly screen-reader labels)` and `T12 Instructor profile (canvas 8)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Arabic strings: Date strip` and `T14 Book screen`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._