# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 7 files · ~77,470 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 967 nodes · 2949 edges · 53 communities (51 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 99 edges (avg confidence: 0.87)
- Token cost: 38,000 input · 10,017 output

## Community Hubs (Navigation)
- Discovery: Home & Explore Data
- Dates, Slots & Seed
- Instructor, Workshop & Book Data
- Working Agreement & Phase 1 Design
- Auth, Family & Shared UI
- Onboarding Screens & Draft
- Detail Screens & Theme
- Mobile Runtime Dependencies
- Token Generator Script
- Phone Sign-up & Verify
- Decisions Log & Expo Docs Rule
- Design Handoff Rules
- Buttons & Who & where
- Expo App Config
- Mobile Package Manifest
- Settings & Family Sheets
- Arabic Copy & Dev Machine
- Chips, Icon Buttons & Search
- Category Tray & Empty State
- Root Package & Scripts
- Project Guide & Design Sources
- Settings Sheets
- Settings & Accessibility
- Phase 1 Tasks & Home Decisions
- Gallery Controls
- Icons & Lists
- Mobile TypeScript Config
- CI Supabase & Colour Lint
- Maestro & Phase 0 Design
- Phase 1 Design Notes
- Task Plan & Handoff
- Root Layout & Query Client
- Gallery Route
- Mobile Dev Dependencies
- Instructor, Workshop & Book Data Tests
- Profile Data
- i18n Setup
- Manual Layout Tokens
- Text & Stepper
- Tokens Package Manifest
- Base TypeScript Config
- Dev Machine & Expo Go Limits
- Discovery Decisions & Strings
- Root Stack
- Arabic & RTL Support
- Mobile Scripts
- Tab Layout
- Gallery Copy
- Design Token Specs
- ESLint Config
- Glass Accessibility Fallbacks
- Jest Config
- Onboarding & Demo Sign-in Decisions

## God Nodes (most connected - your core abstractions)
1. `T()` - 80 edges
2. `react-native` - 70 edges
3. `useTheme()` - 68 edges
4. `DECISIONS.md (decisions log)` - 45 edges
5. `useLang()` - 43 edges
6. `Icon()` - 39 edges
7. `react-i18next` - 37 edges
8. `useSettings` - 36 edges
9. `react` - 33 edges
10. `Coach For All design handoff` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Buttons (mostly screen-reader labels)` --conceptually_related_to--> `T12 Instructor profile (canvas 8)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Time slots` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Date strip` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Instructor and workshop cards` --conceptually_related_to--> `T10 Home ×4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `EAS build/submit/update` --conceptually_related_to--> `D9 iOS testing in Expo Go on iPhone 16 Pro (iOS 26.6.2); Androi`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Onboarding redesign: categories first, before sign-up** — docs_decisions_d32, docs_decisions_d34, docs_decisions_d35, specs_phase_1_tasks_t9, docs_translations_ar_app_strings_onboarding_strings [EXTRACTED 1.00]
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Arabic translation pipeline (Egyptian Arabic, JS RTL, owner-supplied sheet)** — docs_decisions_d25, docs_decisions_d26, docs_decisions_d27, specs_phase_1_tasks_t21, docs_translations_ar_app_strings [INFERRED 0.85]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Design canvas / design system vs handoff precedence** — docs_decisions_d23, docs_decisions_d24, docs_decisions_d33, docs_decisions_d41 [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]
- **Phase 1 per-task screen scope decisions** — docs_decisions_d31, docs_decisions_d32, docs_decisions_d36, docs_decisions_d37, docs_decisions_d38, docs_decisions_d39, docs_decisions_d40 [INFERRED 0.85]

## Communities (53 total, 2 thin omitted)

### Community 0 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (54): FiltersSheet(), Group(), styles, TYPES, WHEN, SORTS, SortSheet(), styles (+46 more)

### Community 1 - "Dates, Slots & Seed"
Cohesion: 0.09
Nodes (42): styles, nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine (+34 more)

### Community 2 - "Instructor, Workshop & Book Data"
Cohesion: 0.08
Nodes (35): Book(), KIDS_AGE, styles, Section(), Workshop(), BookDraft, BookOffering, firstName() (+27 more)

### Community 3 - "Working Agreement & Phase 1 Design"
Cohesion: 0.08
Nodes (35): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops), book() SQL function, bookings table (+27 more)

### Community 4 - "Auth, Family & Shared UI"
Cohesion: 0.11
Nodes (25): useA11y(), Glass(), glassMode, liquidAvailable(), Props, flat(), NavAction, Props (+17 more)

### Community 5 - "Onboarding Screens & Draft"
Cohesion: 0.13
Nodes (28): Categories(), styles, Interests(), Levels(), WhoWhereScreen(), Profile, Area, CATEGORIES (+20 more)

### Community 6 - "Detail Screens & Theme"
Cohesion: 0.14
Nodes (22): styles, styles, resolveScheme(), Scheme, useTheme(), BottomActionBar(), Props, styles (+14 more)

### Community 7 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 8 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 9 - "Phone Sign-up & Verify"
Cohesion: 0.17
Nodes (23): SignUp(), submit(), styles, clock(), styles, Verify(), onChange(), resend() (+15 more)

### Community 10 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.09
Nodes (3): Design canvas and design system artifacts, DECISIONS.md (decisions log), T22 Maestro flow (not run in Phase 0)

### Community 11 - "Design Handoff Rules"
Cohesion: 0.11
Nodes (21): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Members' Circle credit membership, Motion specs (+13 more)

### Community 12 - "Buttons & Who & where"
Cohesion: 0.13
Nodes (18): styles, Welcome(), styles, styles, AREA_ORDER, Pref, PREFS, styles (+10 more)

### Community 13 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 14 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (24): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+16 more)

### Community 15 - "Settings & Family Sheets"
Cohesion: 0.16
Nodes (21): Family(), FamilyMemberSheet(), Field(), FieldProps, styles, styles, useSession(), CHILD_AGE (+13 more)

### Community 16 - "Arabic Copy & Dev Machine"
Cohesion: 0.12
Nodes (21): Demo sign-in (Supabase test number), Arabic strings: Appearance sheet, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Date strip, Arabic strings: Family & kids and its sheet, Arabic strings: Home (+13 more)

### Community 17 - "Chips, Icon Buttons & Search"
Cohesion: 0.18
Nodes (14): styles, Chip(), Props, styles, IconButton(), Props, styles, Props (+6 more)

### Community 18 - "Category Tray & Empty State"
Cohesion: 0.18
Nodes (14): Explore(), styles, styles, CATEGORIES, CategoryButton(), Props, styles, EmptyState() (+6 more)

### Community 19 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 20 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (6): Coach For All (Cairo lesson-booking app), Coach For All app, npm run check (lint + typecheck + tests + token freshness), Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T22 Graphify `--update`, DECISIONS, phase report

### Community 21 - "Settings Sheets"
Cohesion: 0.19
Nodes (12): AppearanceSheet(), styles, THEMES, LANGS, LanguageSheet(), styles, SignOutSheet(), styles (+4 more)

### Community 22 - "Settings & Accessibility"
Cohesion: 0.18
Nodes (10): A11yFlag, Settings, ThemePref, useSettings, off, A11y, isContrast(), mergeA11y() (+2 more)

### Community 23 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.21
Nodes (15): Arabic strings: Book, Phase 1 tasks.md, G1 GitHub push, G2 Supabase keys, T1 Schema migration, T14 Book screen, T15 Review & pay + promo + Confirmed, T16 PaymentProvider + Edge Functions (+7 more)

### Community 24 - "Gallery Controls"
Cohesion: 0.18
Nodes (11): FLAGS, SLOTS, styles, THEMES, WEEK, Props, SegmentedControl(), styles (+3 more)

### Community 25 - "Icons & Lists"
Cohesion: 0.19
Nodes (9): styles, GroupedRow, styles, directional, IconName, Names, Props, Props (+1 more)

### Community 26 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 27 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (13): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+5 more)

### Community 28 - "Maestro & Phase 0 Design"
Cohesion: 0.18
Nodes (10): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), Last-seat concurrency step (20 simultaneous bookings), CI Supabase job (db reset, lint, pgTAP), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), R3 Supabase foundation, T6 Supabase init (+2 more)

### Community 29 - "Phase 1 Design Notes"
Cohesion: 0.23
Nodes (10): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce), Testing strategy (Jest+RNTL, Maestro, manual device), useA11y hook (+2 more)

### Community 30 - "Task Plan & Handoff"
Cohesion: 0.18
Nodes (12): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), setLanguage RTL switch (forceRTL + reload), R5 Theme, direction and accessibility plumbing, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format (+4 more)

### Community 31 - "Root Layout & Query Client"
Cohesion: 0.20
Nodes (9): RootLayout(), RootNavigator(), styles, useIsRTL(), useSheetOptions(), expo-font, expo-status-bar, @react-native-async-storage/async-storage (+1 more)

### Community 32 - "Gallery Route"
Cohesion: 0.23
Nodes (11): GalleryRoute(), GallerySheet(), Screen(), Messages(), Gallery(), Section(), setLanguage(), InterestTile() (+3 more)

### Community 33 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 34 - "Instructor, Workshop & Book Data Tests"
Cohesion: 0.20
Nodes (6): InstructorProfile(), Section(), nextAvailable(), mockParams, padel, pottery

### Community 35 - "Profile Data"
Cohesion: 0.33
Nodes (8): Profile(), styles, Interest, Level, useArea(), useInterests(), useProfile(), @tanstack/react-query

### Community 36 - "i18n Setup"
Cohesion: 0.24
Nodes (5): i18n, keys(), missingArabicKeys(), Tree, i18next

### Community 37 - "Manual Layout Tokens"
Cohesion: 0.22
Nodes (8): CategoryTray(), Radio(), openTray(), homeIndicator, icon, layout, motion, tray

### Community 38 - "Text & Stepper"
Cohesion: 0.20
Nodes (7): Props, Stepper(), styles, arabic, Props, TypeVariant, Weight

### Community 39 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 40 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 42 - "Discovery Decisions & Strings"
Cohesion: 0.33
Nodes (6): Arabic strings: Explore, Filters and Sort, Arabic strings: Instructor profile, Arabic strings: Workshop, T11 Explore (canvas 7), T12 Instructor profile (canvas 8), T13 Workshop (canvas 9)

### Community 43 - "Root Stack"
Cohesion: 0.29
Nodes (3): unstable_settings, unstable_settings, expo-router

### Community 44 - "Arabic & RTL Support"
Cohesion: 0.40
Nodes (5): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact)

### Community 45 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 46 - "Tab Layout"
Cohesion: 0.33
Nodes (5): ORDER, ROUTE, SF, TabsLayout(), TabKey

### Community 47 - "Gallery Copy"
Cohesion: 0.33
Nodes (4): ar, en, galleryCopy, Lang

### Community 48 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 49 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 50 - "Glass Accessibility Fallbacks"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 51 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Arabic strings: Buttons (mostly screen-reader labels)` → `T12 Instructor profile (canvas 8)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Instructor and workshop cards` → `T10 Home ×4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Time slots` → `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to
- `T14 Book screen` → `Arabic strings: Date strip`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to

## Knowledge Gaps
- **31 isolated node(s):** `supabase`, `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 363 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Chips, Icon Buttons & Search` to `Discovery: Home & Explore Data`, `Dates, Slots & Seed`, `Instructor, Workshop & Book Data`, `Auth, Family & Shared UI`, `Onboarding Screens & Draft`, `Detail Screens & Theme`, `Phone Sign-up & Verify`, `Buttons & Who & where`, `Mobile Package Manifest`, `Settings & Family Sheets`, `Category Tray & Empty State`, `Settings Sheets`, `Settings & Accessibility`, `Gallery Controls`, `Icons & Lists`, `Root Layout & Query Client`, `Instructor, Workshop & Book Data Tests`, `Profile Data`, `Text & Stepper`, `Tab Layout`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `supabase`, `@cfa/tokens`, `expo` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Discovery: Home & Explore Data` be split into smaller, more focused modules?**
  _Cohesion score 0.060814383923849816 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `Dates, Slots & Seed` be split into smaller, more focused modules?**
  _Cohesion score 0.09200603318250378 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Arabic strings: Buttons (mostly screen-reader labels)` and `T12 Instructor profile (canvas 8)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Arabic strings: Instructor and workshop cards` and `T10 Home ×4 + tray`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._