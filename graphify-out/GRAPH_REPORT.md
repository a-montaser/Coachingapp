# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 31 files · ~90,062 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1117 nodes · 3525 edges · 55 communities (54 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 118 edges (avg confidence: 0.84)
- Token cost: 55,000 input · 17,400 output

## Community Hubs (Navigation)
- Tab Screens
- Discovery: Home & Explore Data
- Auth, Family & Shared UI
- Onboarding Screens & Draft
- Phone Sign-in
- Buttons, Text & Code Boxes
- Paymob
- Decisions Log & Expo Docs Rule
- Working Agreement & Phase 1 Design
- Bars & Fields on Glass
- Mobile Runtime Dependencies
- Token Generator Script
- Arabic Copy & Dev Machine
- Expo App Config
- Theme Tokens
- Cards & Pills
- Mobile Package Manifest
- Phone Sign-up & Verify
- Project Guide & Design Sources
- Instructor & Booking Data
- Dates, Slots & Seed
- Design Handoff Rules
- Root Stack
- Root Package & Scripts
- Task Plan & Handoff
- Checkout
- Icons & Lists
- CI Supabase & Colour Lint
- Phase 1 Design Notes
- Expo Guide & Decisions
- Time Slots
- Mobile TypeScript Config
- Decision–Task Links
- Checkout.Test
- Design Decisions
- Settings Sheets
- i18n & Gallery Copy
- Mobile Dev Dependencies
- Review & Pay Checkout
- Handoff Rules & Decisions
- Tokens Package Manifest
- Base TypeScript Config
- Workshop Test
- Gallery Seed Data
- Icon Buttons & Sheet Header
- Tab Layout
- Working Agreement
- Mobile Scripts
- Phase 1 Tasks & Home Decisions
- Design Token Specs
- Manual Layout Tokens
- ESLint Config
- Handoff in Design
- Jest Config
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 87 edges
2. `T()` - 79 edges
3. `useTheme()` - 78 edges
4. `Decisions log (D1–D45)` - 49 edges
5. `react-i18next` - 40 edges
6. `useLang()` - 37 edges
7. `react` - 37 edges
8. `useSettings` - 36 edges
9. `expo-router` - 32 edges
10. `Coach For All design handoff` - 32 edges

## Surprising Connections (you probably didn't know these)
- `T19 TabBar with minimise` --implements--> `Floating glass tab bar with minimise on scroll`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md
- `After every task routine` --references--> `Phase 1 ordered tasks`  [INFERRED]
  CLAUDE.md → specs/phase-1/tasks.md
- `CI-only database tests` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md
- `npm run check gate` --conceptually_related_to--> `Testing and CI`  [INFERRED]
  CLAUDE.md → specs/phase-1/design.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go on iPhone 16 Pro; replaces D3's EAS dev build f`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Testing aids added and reverted in T22** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [EXTRACTED 1.00]
- **Booking & payment pipeline (T14–T16)** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, _github_workflows_ci_edge_functions_job [INFERRED 0.85]
- **Design sources: handoff over canvas and design system** — docs_decisions_d23, docs_decisions_d24, docs_decisions_d41 [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]

## Communities (55 total, 1 thin omitted)

### Community 0 - "Tab Screens"
Cohesion: 0.06
Nodes (62): unstable_settings, styles, GalleryRoute(), InstructorProfile(), unstable_settings, Screen(), Explore(), styles (+54 more)

### Community 1 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (54): FiltersSheet(), styles, TYPES, WHEN, SORTS, SortSheet(), styles, activeFilterCount() (+46 more)

### Community 2 - "Auth, Family & Shared UI"
Cohesion: 0.09
Nodes (34): styles, Welcome(), useIsRTL(), A11y, isContrast(), mergeA11y(), useA11y(), Button() (+26 more)

### Community 3 - "Onboarding Screens & Draft"
Cohesion: 0.08
Nodes (43): Categories(), Interests(), styles, Levels(), AREA_ORDER, Pref, PREFS, styles (+35 more)

### Community 4 - "Phone Sign-in"
Cohesion: 0.08
Nodes (37): SignUp(), submit(), styles, clock(), styles, Verify(), Family(), FamilyMemberSheet() (+29 more)

### Community 5 - "Buttons, Text & Code Boxes"
Cohesion: 0.08
Nodes (29): GallerySheet(), styles, styles, Chip(), Props, styles, Props, styles (+21 more)

### Community 6 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 7 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.08
Nodes (11): CLAUDE.md (project instructions), After every task routine, CI-only database tests, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Testing aids to revert (D43), Decisions log (D1–D45) (+3 more)

### Community 8 - "Working Agreement & Phase 1 Design"
Cohesion: 0.15
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 9 - "Bars & Fields on Glass"
Cohesion: 0.12
Nodes (21): styles, styles, styles, useTheme(), BottomActionBar(), Props, styles, GroupedRow (+13 more)

### Community 10 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 11 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 12 - "Arabic Copy & Dev Machine"
Cohesion: 0.11
Nodes (25): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+17 more)

### Community 13 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 14 - "Theme Tokens"
Cohesion: 0.14
Nodes (17): styles, styles, off, resolveScheme(), Scheme, styles, Props, styles (+9 more)

### Community 15 - "Cards & Pills"
Cohesion: 0.14
Nodes (16): styles, Card(), Props, styles, DashedCard(), styles, Icon(), styles (+8 more)

### Community 16 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 17 - "Phone Sign-up & Verify"
Cohesion: 0.16
Nodes (19): Book(), KIDS_AGE, styles, firstName(), days, mockData, mockFamily, mockParams (+11 more)

### Community 18 - "Project Guide & Design Sources"
Cohesion: 0.12
Nodes (19): CI workflow (ci.yml), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), Phase-branch git workflow, Arabic strings: Demo payment, Phase 1 ordered tasks, G1 GitHub push and CI green (+11 more)

### Community 19 - "Instructor & Booking Data"
Cohesion: 0.12
Nodes (16): BookDraft, BookOffering, InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot (+8 more)

### Community 20 - "Dates, Slots & Seed"
Cohesion: 0.21
Nodes (18): seedFor(), when(), dateFormat(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth(), formatMonthYear() (+10 more)

### Community 21 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 22 - "Root Stack"
Cohesion: 0.14
Nodes (13): RootLayout(), RootNavigator(), styles, i18n, A11yFlag, Lang, Settings, useSettings (+5 more)

### Community 23 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 24 - "Task Plan & Handoff"
Cohesion: 0.13
Nodes (16): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, R9 Gallery screen (+8 more)

### Community 25 - "Checkout"
Cohesion: 0.17
Nodes (14): Confirmed(), RemindSheet(), styles, Booking, ConfirmedBooking, DEFAULT_REMINDER, KNOWN, Method (+6 more)

### Community 26 - "Icons & Lists"
Cohesion: 0.16
Nodes (11): styles, Props, styles, directional, IconName, Names, Props, Props (+3 more)

### Community 27 - "CI Supabase & Colour Lint"
Cohesion: 0.17
Nodes (14): CI checks job (lint, typecheck, tests, token freshness), Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9) (+6 more)

### Community 28 - "Phase 1 Design Notes"
Cohesion: 0.21
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 29 - "Expo Guide & Decisions"
Cohesion: 0.15
Nodes (5): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Expo Go only, JS RTL, Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57

### Community 30 - "Time Slots"
Cohesion: 0.23
Nodes (11): sat, slots, DayPicker(), groupSlots(), PartOfDay, Props, Slot, SlotState (+3 more)

### Community 31 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 32 - "Decision–Task Links"
Cohesion: 0.21
Nodes (8): Arabic strings: Explore, Filters and Sort, Arabic strings: Instructor profile, Arabic strings: Workshop, Resolved owner answers (17 Oct), T11 Explore, T12 Instructor profile, T13 Workshop with seat stepper, T17 Bookings list + Booking detail

### Community 33 - "Checkout.Test"
Cohesion: 0.20
Nodes (11): DemoCheckout(), demoPay(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace (+3 more)

### Community 34 - "Design Decisions"
Cohesion: 0.29
Nodes (9): Demo sign-in, Arabic strings: Onboarding, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), R2 auth, R4 onboarding (+1 more)

### Community 35 - "Settings Sheets"
Cohesion: 0.24
Nodes (9): AppearanceSheet(), styles, THEMES, LANGS, LanguageSheet(), styles, setLanguage(), ThemePref (+1 more)

### Community 36 - "i18n & Gallery Copy"
Cohesion: 0.20
Nodes (5): ar, en, keys(), missingArabicKeys(), Tree

### Community 37 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 38 - "Review & Pay Checkout"
Cohesion: 0.36
Nodes (9): Review(), styles, applyPromo(), BookingErrorKey, placeBooking(), startCheckout(), useReview(), promoDiscount() (+1 more)

### Community 39 - "Handoff Rules & Decisions"
Cohesion: 0.22
Nodes (7): Bottom action bar, Component specs (§5), Navigation bar glass capsule, Glass sheets, Floating glass tab bar with minimise on scroll, R7 Primitives P1-P21, T19 TabBar with minimise

### Community 40 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 41 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 42 - "Workshop Test"
Cohesion: 0.28
Nodes (6): Workshop(), clampSeats(), maxWorkshopSeats(), mockData, mockParams, @testing-library/react-native

### Community 43 - "Gallery Seed Data"
Cohesion: 0.33
Nodes (7): nour, photoWalk, text, wheelTaster, yasmine, Instructor, Workshop

### Community 44 - "Icon Buttons & Sheet Header"
Cohesion: 0.28
Nodes (5): IconButton(), Props, styles, styles, touch

### Community 45 - "Tab Layout"
Cohesion: 0.32
Nodes (7): ORDER, ROUTE, TabsLayout(), restoreTabBar(), TabKey, useTabBarMinimised(), useTabBarStore

### Community 46 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 47 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 48 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.73
Nodes (4): Component library, NavigationBar, R3 shell, R3.7 Navigation bar on pushed screens

### Community 49 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 50 - "Manual Layout Tokens"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 51 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 52 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 53 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 413 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Bars & Fields on Glass` to `Tab Screens`, `Discovery: Home & Explore Data`, `Auth, Family & Shared UI`, `Onboarding Screens & Draft`, `Phone Sign-in`, `Buttons, Text & Code Boxes`, `Theme Tokens`, `Cards & Pills`, `Mobile Package Manifest`, `Phone Sign-up & Verify`, `Instructor & Booking Data`, `Dates, Slots & Seed`, `Root Stack`, `Checkout`, `Icons & Lists`, `Time Slots`, `Settings Sheets`, `Review & Pay Checkout`, `Workshop Test`, `Gallery Seed Data`, `Icon Buttons & Sheet Header`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tab Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.062317429406037 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `Discovery: Home & Explore Data` be split into smaller, more focused modules?**
  _Cohesion score 0.060285563194077206 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D45)` connect `Decisions Log & Expo Docs Rule` to `Decision–Task Links`, `Design Decisions`, `Handoff Rules & Decisions`, `Arabic Copy & Dev Machine`, `Working Agreement`, `Phase 1 Tasks & Home Decisions`, `Project Guide & Design Sources`, `Task Plan & Handoff`, `Expo Guide & Decisions`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._