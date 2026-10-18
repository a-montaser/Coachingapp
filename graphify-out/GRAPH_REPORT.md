# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 42 files · ~80,804 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1023 nodes · 3229 edges · 51 communities
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 146 edges (avg confidence: 0.86)
- Token cost: 70,000 input · 14,400 output

## Community Hubs (Navigation)
- Dates, Slots & Seed
- Discovery: Home & Explore Data
- Onboarding Screens & Draft
- Phone Sign-up & Verify
- Buttons, Text & Code Boxes
- Auth, Family & Shared UI
- Decisions Log & Expo Docs Rule
- Arabic Copy & Dev Machine
- Gallery Controls
- Mobile Runtime Dependencies
- Token Generator Script
- Working Agreement & Phase 1 Design
- Expo App Config
- Icons & Lists
- Mobile Package Manifest
- Chips, Icon Buttons & Search
- Tab Bar & Navigation
- Design Handoff Rules
- Settings & Family Sheets
- Root Package & Scripts
- Date & Session Rows
- Project Guide & Design Sources
- Cards & Pills
- Settings & Accessibility
- Phase 1 Design Notes
- Gallery Seed Data
- Settings Sheets
- Mobile TypeScript Config
- CI Supabase & Colour Lint
- Task Plan & Handoff
- Time Slots
- Design Decisions
- Phase 1 Tasks & Home Decisions
- Mobile Dev Dependencies
- i18n Setup
- Tokens Package Manifest
- Base TypeScript Config
- CI & Requirements
- Root Stack
- Handoff Screens & Flows
- Sections & Links
- Project Rules & Decisions
- Working Agreement
- Mobile Scripts
- Sign Out & Query Cache
- Decision–Task Links
- Design Token Specs
- Manual Layout Tokens
- ESLint Config
- Handoff Rules in Design
- Jest Config

## God Nodes (most connected - your core abstractions)
1. `react-native` - 81 edges
2. `T()` - 79 edges
3. `useTheme()` - 76 edges
4. `Decisions log` - 47 edges
5. `react-i18next` - 36 edges
6. `useLang()` - 34 edges
7. `react` - 34 edges
8. `useSettings` - 34 edges
9. `Coach For All design handoff` - 32 edges
10. `Icon()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Date strip` --conceptually_related_to--> `T14 Book screen (1:1, group, kids)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Time slots` --conceptually_related_to--> `T14 Book screen (1:1, group, kids)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Buttons (mostly screen-reader labels)` --conceptually_related_to--> `T12 Instructor profile`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Instructor and workshop cards` --conceptually_related_to--> `T10 Home x4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Onboarding` --conceptually_related_to--> `T9 Categories, Interests, Levels, Who & where (before sign-up)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Component library rollout (D43)** — docs_decisions_d43, specs_phase_1_design_component_library, specs_phase_1_design_navigation_bar, specs_phase_1_requirements_r3_7, claude_testing_aids_to_revert, specs_phase_1_tasks_t22 [EXTRACTED 1.00]
- **Onboarding before sign-up** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_requirements_r4, specs_phase_1_requirements_r2, specs_phase_1_tasks_t9 [EXTRACTED 1.00]
- **Arabic translation pipeline (Egyptian Arabic, JS RTL, owner-supplied sheet)** — docs_decisions_d25, docs_decisions_d26, docs_decisions_d27, specs_phase_1_tasks_t21, docs_translations_ar_app_strings [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]

## Communities (51 total, 0 thin omitted)

### Community 0 - "Dates, Slots & Seed"
Cohesion: 0.05
Nodes (72): unstable_settings, Book(), KIDS_AGE, styles, GalleryRoute(), InstructorProfile(), styles, unstable_settings (+64 more)

### Community 1 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (56): FiltersSheet(), styles, TYPES, WHEN, SORTS, SortSheet(), styles, styles (+48 more)

### Community 2 - "Onboarding Screens & Draft"
Cohesion: 0.08
Nodes (47): Categories(), styles, Interests(), styles, Levels(), styles, AREA_ORDER, Pref (+39 more)

### Community 3 - "Phone Sign-up & Verify"
Cohesion: 0.07
Nodes (36): SignUp(), submit(), styles, clock(), Verify(), Messages(), authErrorKey(), e164() (+28 more)

### Community 4 - "Buttons, Text & Code Boxes"
Cohesion: 0.10
Nodes (25): styles, styles, Welcome(), styles, styles, Banner(), styles, Button() (+17 more)

### Community 5 - "Auth, Family & Shared UI"
Cohesion: 0.10
Nodes (29): useIsRTL(), A11yFlag, off, A11y, isContrast(), mergeA11y(), useA11y(), resolveScheme() (+21 more)

### Community 6 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (9): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Expo Go only, JS RTL, Decisions log, Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T22 Maestro flow (not run in Phase 0) (+1 more)

### Community 7 - "Arabic Copy & Dev Machine"
Cohesion: 0.10
Nodes (27): Arabic strings: Appearance sheet, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Date strip, Arabic strings: Explore, Filters and Sort, Arabic strings: Family & kids and its sheet, Arabic strings: Home (+19 more)

### Community 8 - "Gallery Controls"
Cohesion: 0.12
Nodes (26): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, isSameCairoDay(), useTheme() (+18 more)

### Community 9 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 10 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 11 - "Working Agreement & Phase 1 Design"
Cohesion: 0.17
Nodes (30): Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function, create-checkout Edge Function (+22 more)

### Community 12 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 13 - "Icons & Lists"
Cohesion: 0.14
Nodes (16): Props, styles, DashedCard(), styles, styles, GroupedRow, styles, styles (+8 more)

### Community 14 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 15 - "Chips, Icon Buttons & Search"
Cohesion: 0.13
Nodes (14): GallerySheet(), styles, galleryCopy, Chip(), Props, styles, Props, SegmentedControl() (+6 more)

### Community 16 - "Tab Bar & Navigation"
Cohesion: 0.15
Nodes (14): ORDER, ROUTE, TabsLayout(), useSheetOptions(), Props, restoreTabBar(), styles, TabBar() (+6 more)

### Community 17 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 18 - "Settings & Family Sheets"
Cohesion: 0.16
Nodes (17): Family(), FamilyMemberSheet(), styles, CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking (+9 more)

### Community 19 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 20 - "Date & Session Rows"
Cohesion: 0.14
Nodes (12): Props, styles, DateTile(), styles, LevelGlyph(), styles, Props, styles (+4 more)

### Community 21 - "Project Guide & Design Sources"
Cohesion: 0.19
Nodes (15): CLAUDE.md (project instructions), After every task routine, CI-only database tests, npm run check gate, Phase-branch git workflow, Testing aids to revert (D43), Testing and CI, R10 e2e (+7 more)

### Community 22 - "Cards & Pills"
Cohesion: 0.21
Nodes (11): Card(), Props, styles, styles, Pill(), PillTone, styles, Props (+3 more)

### Community 23 - "Settings & Accessibility"
Cohesion: 0.23
Nodes (7): Settings, useSettings, CategoryTray(), Radio(), openTray(), flat(), @testing-library/react-native

### Community 24 - "Phase 1 Design Notes"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 25 - "Gallery Seed Data"
Cohesion: 0.19
Nodes (10): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, yasmine (+2 more)

### Community 26 - "Settings Sheets"
Cohesion: 0.23
Nodes (11): AppearanceSheet(), styles, THEMES, LANGS, LanguageSheet(), styles, setLanguage(), Lang (+3 more)

### Community 27 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 28 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (12): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 29 - "Task Plan & Handoff"
Cohesion: 0.18
Nodes (12): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), setLanguage RTL switch (forceRTL + reload), R5 Theme, direction and accessibility plumbing, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format (+4 more)

### Community 30 - "Time Slots"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 31 - "Design Decisions"
Cohesion: 0.35
Nodes (9): Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), R2 auth, R4 onboarding, T5 Data layer (+1 more)

### Community 32 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.33
Nodes (8): Component library, NavigationBar, R3 shell, R3.7 Navigation bar on pushed screens, R8 manage, Resolved owner answers (17 Oct), T17 Bookings list + Booking detail, T18 Cancel sheet + refund flow; Reschedule

### Community 33 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 34 - "i18n Setup"
Cohesion: 0.24
Nodes (5): i18n, keys(), missingArabicKeys(), Tree, @react-native-async-storage/async-storage

### Community 35 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 36 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 37 - "CI & Requirements"
Cohesion: 0.25
Nodes (9): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), Last-seat concurrency step (20 simultaneous bookings), CI Supabase job (db reset, lint, pgTAP), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), R3 Supabase foundation, T6 Supabase init (+1 more)

### Community 38 - "Root Stack"
Cohesion: 0.29
Nodes (7): RootLayout(), RootNavigator(), styles, useApplyThemeOverride(), expo-font, expo-status-bar, react-native-gesture-handler

### Community 39 - "Handoff Screens & Flows"
Cohesion: 0.29
Nodes (7): Bottom action bar, Component specs (§5), Navigation bar glass capsule, Glass sheets, Floating glass tab bar with minimise on scroll, R7 Primitives P1-P21, T19 TabBar with minimise

### Community 40 - "Sections & Links"
Cohesion: 0.29
Nodes (5): Props, styles, TypeVariant, Props, styles

### Community 41 - "Project Rules & Decisions"
Cohesion: 0.38
Nodes (4): Design canvas (Coach For All · Hobbies), cfa design system artifact, Screens: canvas fidelity, Phase 1 requirements: MVP hobbies-first booking loop

### Community 42 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 43 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 44 - "Sign Out & Query Cache"
Cohesion: 0.47
Nodes (4): SignOutSheet(), styles, signOut(), queryClient

### Community 45 - "Decision–Task Links"
Cohesion: 0.47
Nodes (3): Arabic strings: Book, T14 Book screen (1:1, group, kids), T15 Review & pay + promo + Confirmed

### Community 46 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 47 - "Manual Layout Tokens"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 48 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 49 - "Handoff Rules in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 50 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Arabic strings: Buttons (mostly screen-reader labels)` → `T12 Instructor profile`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Date strip` → `T14 Book screen (1:1, group, kids)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Instructor and workshop cards` → `T10 Home x4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Time slots` → `T14 Book screen (1:1, group, kids)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking`, `expo-localization` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 377 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Cards & Pills` to `Dates, Slots & Seed`, `Discovery: Home & Explore Data`, `Onboarding Screens & Draft`, `Phone Sign-up & Verify`, `Buttons, Text & Code Boxes`, `Auth, Family & Shared UI`, `Gallery Controls`, `Icons & Lists`, `Mobile Package Manifest`, `Chips, Icon Buttons & Search`, `Tab Bar & Navigation`, `Settings & Family Sheets`, `Date & Session Rows`, `Settings & Accessibility`, `Gallery Seed Data`, `Settings Sheets`, `Time Slots`, `Root Stack`, `Sections & Links`, `Sign Out & Query Cache`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dates, Slots & Seed` be split into smaller, more focused modules?**
  _Cohesion score 0.05446727185857621 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `Discovery: Home & Explore Data` be split into smaller, more focused modules?**
  _Cohesion score 0.061057692307692306 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Arabic strings: Buttons (mostly screen-reader labels)` and `T12 Instructor profile`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Arabic strings: Date strip` and `T14 Book screen (1:1, group, kids)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._