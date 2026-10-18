# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 10 files · ~81,567 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1027 nodes · 3226 edges · 54 communities (53 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.87)
- Token cost: 38,000 input · 11,000 output

## Community Hubs (Navigation)
- Auth, Family & Shared UI
- Onboarding Screens & Draft
- Phone Sign-up & Verify
- Decisions Log & Expo Docs Rule
- Dates, Slots & Seed
- Mobile Runtime Dependencies
- Token Generator Script
- Discovery: Home & Explore Data
- Tab Screens
- Gallery Controls
- Expo App Config
- Icons & Lists
- Arabic Copy & Dev Machine
- Working Agreement & Phase 1 Design
- Mobile Package Manifest
- Cards & Pills
- Design Handoff Rules
- Phone Sign-in
- Settings & Family Sheets
- Chips, Icon Buttons & Search
- Time Slots
- Root Package & Scripts
- Date & Session Rows
- Project Guide & Design Sources
- Settings Sheets
- Buttons, Text & Code Boxes
- Navigation Bar & Banner
- Root Stack
- Explore Rule Tests
- Home Read Models
- Decision–Task Links
- Phase 1 Design Notes
- Mobile TypeScript Config
- Design Decisions
- CI Supabase & Colour Lint
- Phase 1 Tasks & Home Decisions
- Task Plan & Handoff
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- CI & Requirements
- Spec Cross-references
- Test Images (temporary)
- Supabase Client Setup
- Project Rules & Decisions
- Handoff & Gallery Flows
- Working Agreement
- Manual Layout Tokens
- Mobile Scripts
- Design Token Specs
- ESLint Config
- Jest Config
- Workshop Test
- Otpboxes

## God Nodes (most connected - your core abstractions)
1. `react-native` - 82 edges
2. `T()` - 76 edges
3. `useTheme()` - 74 edges
4. `Decisions log (D1–D44)` - 48 edges
5. `react-i18next` - 36 edges
6. `useSettings` - 35 edges
7. `useLang()` - 34 edges
8. `react` - 34 edges
9. `Coach For All design handoff` - 32 edges
10. `Icon()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Buttons (mostly screen-reader labels)` --conceptually_related_to--> `T12 Instructor profile`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Date strip` --conceptually_related_to--> `T14 Book screen (1:1, group, kids)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Time slots` --conceptually_related_to--> `T14 Book screen (1:1, group, kids)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Explore, Filters and Sort` --conceptually_related_to--> `T11 Explore with search, Filters and Sort`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Instructor and workshop cards` --conceptually_related_to--> `T10 Home x4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Design sources: handoff, canvas, design system, prototype** — docs_decisions_d23, docs_decisions_d24, docs_decisions_d33, docs_decisions_d43 [INFERRED 0.75]
- **Arabic translation pipeline (Egyptian Arabic, JS RTL, owner-supplied sheet)** — docs_decisions_d25, docs_decisions_d26, docs_decisions_d27, specs_phase_1_tasks_t21, docs_translations_ar_app_strings [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Liquid Glass rendering rules** — docs_decisions_d16, docs_decisions_d17, docs_decisions_d20, docs_decisions_d41, docs_decisions_d44 [INFERRED 0.85]

## Communities (54 total, 1 thin omitted)

### Community 0 - "Auth, Family & Shared UI"
Cohesion: 0.05
Nodes (55): ORDER, ROUTE, TabsLayout(), keys(), missingArabicKeys(), Tree, useIsRTL(), useSettings (+47 more)

### Community 1 - "Onboarding Screens & Draft"
Cohesion: 0.06
Nodes (60): unstable_settings, Welcome(), LANGS, LanguageSheet(), styles, Categories(), styles, Interests() (+52 more)

### Community 2 - "Phone Sign-up & Verify"
Cohesion: 0.07
Nodes (32): KIDS_AGE, styles, BookDraft, BookOffering, firstName(), days, mockData, mockFamily (+24 more)

### Community 3 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (8): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Expo Go only, JS RTL, Decisions log (D1–D44), Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57, T15 Review & pay + promo + Confirmed

### Community 4 - "Dates, Slots & Seed"
Cohesion: 0.14
Nodes (27): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, dateFormat() (+19 more)

### Community 5 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 7 - "Discovery: Home & Explore Data"
Cohesion: 0.13
Nodes (26): FiltersSheet(), styles, TYPES, WHEN, Availability, byKey(), DEFAULT_FILTERS, DISTANCES (+18 more)

### Community 8 - "Tab Screens"
Cohesion: 0.20
Nodes (23): Book(), GalleryRoute(), Screen(), Explore(), styles, Home(), styles, Workshop() (+15 more)

### Community 9 - "Gallery Controls"
Cohesion: 0.11
Nodes (19): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, useTheme(), CATEGORIES (+11 more)

### Community 10 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 11 - "Icons & Lists"
Cohesion: 0.14
Nodes (16): DashedCard(), styles, styles, GroupedRow, styles, styles, directional, Icon() (+8 more)

### Community 12 - "Arabic Copy & Dev Machine"
Cohesion: 0.11
Nodes (23): Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Date strip, Arabic strings: Explore, Filters and Sort, Arabic strings: Family & kids and its sheet (+15 more)

### Community 13 - "Working Agreement & Phase 1 Design"
Cohesion: 0.22
Nodes (25): Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function, create-checkout Edge Function (+17 more)

### Community 14 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 15 - "Cards & Pills"
Cohesion: 0.16
Nodes (15): styles, Card(), Props, styles, styles, Pill(), PillTone, styles (+7 more)

### Community 16 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (19): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Members' Circle credit membership, Motion specs (+11 more)

### Community 17 - "Phone Sign-in"
Cohesion: 0.20
Nodes (16): SignUp(), submit(), styles, clock(), styles, Verify(), Messages(), authErrorKey() (+8 more)

### Community 18 - "Settings & Family Sheets"
Cohesion: 0.15
Nodes (17): Family(), FamilyMemberSheet(), styles, Profile(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX (+9 more)

### Community 19 - "Chips, Icon Buttons & Search"
Cohesion: 0.15
Nodes (14): GallerySheet(), styles, styles, styles, BottomActionBar(), Props, styles, Chip() (+6 more)

### Community 20 - "Time Slots"
Cohesion: 0.17
Nodes (16): sat, slots, DateTile(), styles, DayPicker(), Props, styles, T() (+8 more)

### Community 21 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 22 - "Date & Session Rows"
Cohesion: 0.16
Nodes (12): resolveScheme(), Scheme, Props, styles, Props, styles, LevelGlyph(), styles (+4 more)

### Community 23 - "Project Guide & Design Sources"
Cohesion: 0.18
Nodes (17): CLAUDE.md (project instructions), After every task routine, CI-only database tests, npm run check gate, Phase-branch git workflow, Testing aids to revert (D43), Testing and CI, R10 e2e (+9 more)

### Community 24 - "Settings Sheets"
Cohesion: 0.15
Nodes (13): AppearanceSheet(), styles, THEMES, SORTS, SortSheet(), styles, SortKey, useExplore (+5 more)

### Community 25 - "Buttons, Text & Code Boxes"
Cohesion: 0.15
Nodes (11): Props, styles, Props, styles, arabic, fitLines(), Props, TypeVariant (+3 more)

### Community 26 - "Navigation Bar & Banner"
Cohesion: 0.22
Nodes (9): styles, styles, Banner(), styles, NavAction, Props, styles, react-i18next (+1 more)

### Community 27 - "Root Stack"
Cohesion: 0.18
Nodes (12): RootLayout(), RootNavigator(), styles, SignOutSheet(), styles, signOut(), useProfile(), queryClient (+4 more)

### Community 28 - "Explore Rule Tests"
Cohesion: 0.15
Nodes (12): activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany, mockRows (+4 more)

### Community 29 - "Home Read Models"
Cohesion: 0.20
Nodes (11): cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, InstructorCardRow, MyBookingRow, mockBookings, mockRows (+3 more)

### Community 30 - "Decision–Task Links"
Cohesion: 0.23
Nodes (9): Dependencies, Pure rules in data/rules.ts, R5 discovery, R5.3 Explore search, filters and sort, R9 reminders, T11 Explore with search, Filters and Sort, T12 Instructor profile, T13 Workshop with seat stepper (+1 more)

### Community 31 - "Phase 1 Design Notes"
Cohesion: 0.21
Nodes (11): Gallery flow: Reduce Transparency / Increase Contrast screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Phase 0 technical design, Mac dev environment and toolchain, Glass decision table (GlassView / BlurView / frosted), Zustand settings store (theme, category, devForce), useA11y hook (+3 more)

### Community 32 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 33 - "Design Decisions"
Cohesion: 0.27
Nodes (10): Demo sign-in, Arabic strings: Onboarding, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), R2 auth, R4 onboarding (+2 more)

### Community 34 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (12): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 35 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.31
Nodes (8): Component library, NavigationBar, R3 shell, R3.7 Navigation bar on pushed screens, R8 manage, Resolved owner answers (17 Oct), T17 Bookings list + Booking detail, T18 Cancel sheet + refund flow; Reschedule

### Community 36 - "Task Plan & Handoff"
Cohesion: 0.22
Nodes (10): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, setLanguage RTL switch (forceRTL + reload), R10 Knowledge map (graphify), R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format, T2 Graphify map of handoff (+2 more)

### Community 37 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 38 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 39 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 40 - "CI & Requirements"
Cohesion: 0.25
Nodes (9): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), Last-seat concurrency step (20 simultaneous bookings), CI Supabase job (db reset, lint, pgTAP), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), R3 Supabase foundation, T6 Supabase init (+1 more)

### Community 41 - "Spec Cross-references"
Cohesion: 0.22
Nodes (8): Maestro gallery E2E flow, Seed sample content (§14), Monorepo layout (apps/mobile, packages/tokens, supabase), Testing strategy (Jest+RNTL, Maestro, manual device), R1 Repo and toolchain, R9 Gallery screen, T12 Gallery shell, T22 Maestro flow (not run in Phase 0)

### Community 42 - "Test Images (temporary)"
Cohesion: 0.22
Nodes (8): InstructorProfile(), byCategory, byDiscipline, heroes, people, TEST_IMAGES, testHero(), SessionRow()

### Community 43 - "Supabase Client Setup"
Cohesion: 0.25
Nodes (5): supabaseConfigured, i18n, @react-native-async-storage/async-storage, react-native-gesture-handler, @supabase/supabase-js

### Community 44 - "Project Rules & Decisions"
Cohesion: 0.29
Nodes (4): Design canvas (Coach For All · Hobbies), cfa design system artifact, Screens: canvas fidelity, Phase 1 requirements: MVP hobbies-first booking loop

### Community 45 - "Handoff & Gallery Flows"
Cohesion: 0.33
Nodes (6): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 46 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 47 - "Manual Layout Tokens"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 48 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 49 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 50 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 51 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 53 - "Otpboxes"
Cohesion: 0.50
Nodes (3): OtpBoxes(), Props, styles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to
- `T14 Book screen (1:1, group, kids)` → `Arabic strings: Date strip`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `T14 Book screen (1:1, group, kids)` → `Arabic strings: Time slots`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Buttons (mostly screen-reader labels)` → `T12 Instructor profile`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `Arabic strings: Instructor and workshop cards` → `T10 Home x4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to

## Knowledge Gaps
- **26 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking`, `expo-localization` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 385 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Chips, Icon Buttons & Search` to `Auth, Family & Shared UI`, `Onboarding Screens & Draft`, `Phone Sign-up & Verify`, `Dates, Slots & Seed`, `Discovery: Home & Explore Data`, `Tab Screens`, `Gallery Controls`, `Icons & Lists`, `Mobile Package Manifest`, `Cards & Pills`, `Phone Sign-in`, `Settings & Family Sheets`, `Time Slots`, `Date & Session Rows`, `Settings Sheets`, `Buttons, Text & Code Boxes`, `Navigation Bar & Banner`, `Root Stack`, `Test Images (temporary)`, `Supabase Client Setup`, `Otpboxes`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth, Family & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.05198358413132695 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D44)` connect `Decisions Log & Expo Docs Rule` to `Design Decisions`, `Phase 1 Tasks & Home Decisions`, `Task Plan & Handoff`, `Spec Cross-references`, `Project Rules & Decisions`, `Arabic Copy & Dev Machine`, `Working Agreement`, `Project Guide & Design Sources`, `Decision–Task Links`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.05827505827505827 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `T14 Book screen (1:1, group, kids)` and `Arabic strings: Date strip`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._