# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 4 files · ~90,436 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1120 nodes · 3543 edges · 58 communities (57 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.84)
- Token cost: 30,000 input · 6,000 output

## Community Hubs (Navigation)
- Discovery: Home & Explore Data
- Who Where · Categories
- Dates, Slots & Seed
- Working Agreement & Phase 1 Design
- Screens & Test Images
- Arabic Copy & Dev Machine
- Decisions Log & Expo Docs Rule
- Paymob
- Settings Sheets
- Mobile Runtime Dependencies
- Tab Screens
- Token Generator Script
- i18n & Gallery Copy
- Mobile Package Manifest
- Onboarding Screens & Draft
- Auth, Family & Shared UI
- Expo App Config
- Instructor & Booking Data
- Chips & Icon Buttons
- Phone Sign-up & Verify
- Cards & Pills
- Project Guide & Design Sources
- Phone Sign-in
- Buttons, Text & Code Boxes
- Design Handoff Rules
- Root Package & Scripts
- Phase 1 Design Notes
- Review & Pay Checkout
- Confirmed, Demo Checkout & Remind
- T · Textfield
- Generated · Searchfield
- Mobile TypeScript Config
- CI Supabase & Colour Lint
- Root Layout & Query Client
- Root Stack
- Segmentedcontrol · Stepper
- Phase 1 Tasks & Home Decisions
- Leveloption · Avatar
- Category Tray & Radio
- Mobile Dev Dependencies
- Task Plan & Handoff
- Tokens Package Manifest
- Base TypeScript Config
- Payments Deploy & Edge CI
- Account · Profile
- Manual Layout Tokens
-  Layout 2
- Workshop Seats
- Bottomactionbar · Chrome Test
- Working Agreement
- Category Tray Spec
- Mobile Scripts
- Handoff Rules & Decisions
- Design Handoff · Design
- ESLint Config
- Handoff in Design
- Jest Config
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 88 edges
2. `T()` - 79 edges
3. `useTheme()` - 78 edges
4. `Decisions log (D1–D47)` - 51 edges
5. `react-i18next` - 41 edges
6. `useLang()` - 37 edges
7. `react` - 37 edges
8. `useSettings` - 36 edges
9. `Icon()` - 32 edges
10. `expo-router` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Appearance sheet` --references--> `T8: Profile, Family & kids, Language / Appearance sheets`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Book` --references--> `T14: Book screen (1:1, group, kids)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Category tray and its button` --references--> `T10: Home ×4 + tray (canvas 1–5), including Sports "Book again"`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Confirmed` --references--> `T15: Review & pay + promo + Confirmed (ring, Remind me sheet)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (58 total, 1 thin omitted)

### Community 0 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (49): FiltersSheet(), styles, TYPES, WHEN, activeFilterCount(), Availability, byKey(), DEFAULT_FILTERS (+41 more)

### Community 1 - "Onboarding Step Screens"
Cohesion: 0.10
Nodes (42): Categories(), styles, Interests(), styles, Levels(), styles, AREA_ORDER, Pref (+34 more)

### Community 2 - "Dates, Slots & Seed"
Cohesion: 0.08
Nodes (38): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, when() (+30 more)

### Community 3 - "Working Agreement & Phase 1 Design"
Cohesion: 0.11
Nodes (42): Demo sign-in, npm run check gate, Phase 1 technical design, App shape and routes, apply_promo() SQL function, approve_booking() / decline_booking(), Auth (Supabase phone OTP), book() SQL function (+34 more)

### Community 4 - "Screens & Test Images"
Cohesion: 0.12
Nodes (36): GalleryRoute(), InstructorProfile(), Explore(), styles, Home(), styles, cairoDaysUntil(), DEMO_BASE (+28 more)

### Community 5 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (33): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+25 more)

### Community 6 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (8): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Decisions log (D1–D47), Assumption: Expo Go on iPhone, SDK 57, T22 Maestro flow (not run in Phase 0)

### Community 7 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 8 - "Settings Sheets"
Cohesion: 0.14
Nodes (22): AppearanceSheet(), styles, THEMES, styles, styles, LANGS, LanguageSheet(), styles (+14 more)

### Community 9 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 10 - "Tab Screens"
Cohesion: 0.12
Nodes (20): ConfirmationRing(), styles, DashedCard(), styles, styles, Props, styles, styles (+12 more)

### Community 11 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 12 - "i18n & Gallery Copy"
Cohesion: 0.11
Nodes (14): i18n, keys(), missingArabicKeys(), setLanguage(), Tree, A11yFlag, Lang, Settings (+6 more)

### Community 13 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (25): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+17 more)

### Community 14 - "Onboarding Screens & Draft"
Cohesion: 0.16
Nodes (19): SignUp(), submit(), styles, clock(), styles, Verify(), Messages(), authErrorKey() (+11 more)

### Community 15 - "Auth, Family & Shared UI"
Cohesion: 0.14
Nodes (18): ORDER, ROUTE, SF, Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props (+10 more)

### Community 16 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 17 - "Instructor & Booking Data"
Cohesion: 0.11
Nodes (18): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+10 more)

### Community 18 - "Chips & Icon Buttons"
Cohesion: 0.13
Nodes (18): styles, Welcome(), GallerySheet(), styles, styles, styles, galleryCopy, Button() (+10 more)

### Community 19 - "Phone Sign-up & Verify"
Cohesion: 0.16
Nodes (19): Book(), KIDS_AGE, styles, firstName(), days, mockData, mockFamily, mockParams (+11 more)

### Community 20 - "Cards & Pills"
Cohesion: 0.17
Nodes (15): styles, Card(), Props, styles, DateButton(), Props, styles, styles (+7 more)

### Community 21 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (19): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+11 more)

### Community 22 - "Phone Sign-in"
Cohesion: 0.15
Nodes (18): Family(), FamilyMemberSheet(), styles, styles, Profile(), CHILD_AGE, FamilyMember, FamilyMemberErrors (+10 more)

### Community 23 - "Buttons, Text & Code Boxes"
Cohesion: 0.14
Nodes (14): Screen(), resolveScheme(), Scheme, useTheme(), Banner(), styles, DateTile(), styles (+6 more)

### Community 24 - "Design Handoff Rules"
Cohesion: 0.14
Nodes (17): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Motion specs, Navigation bar glass capsule (+9 more)

### Community 25 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 26 - "Phase 1 Design Notes"
Cohesion: 0.15
Nodes (16): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), setLanguage RTL switch (forceRTL + reload) (+8 more)

### Community 27 - "Review & Pay Checkout"
Cohesion: 0.20
Nodes (16): Review(), styles, applyPromo(), Booking, BookingErrorKey, ConfirmedBooking, KNOWN, Method (+8 more)

### Community 28 - "Confirmed, Demo Checkout & Remind"
Cohesion: 0.16
Nodes (15): Confirmed(), DemoCheckout(), RemindSheet(), demoPay(), booking(), inDays(), mockCheckout, mockDemoPay (+7 more)

### Community 29 - "Text & Text Fields"
Cohesion: 0.15
Nodes (11): Props, styles, arabic, Props, TypeVariant, Weight, Props, styles (+3 more)

### Community 30 - "Search Field & Generated Tokens"
Cohesion: 0.17
Nodes (10): Props, styles, blur, dark, light, radius, shadow, space (+2 more)

### Community 31 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 32 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (12): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 33 - "Root Layout & Query Client"
Cohesion: 0.24
Nodes (10): RootLayout(), RootNavigator(), styles, useProfile(), useIsRTL(), useSettings, useApplyThemeOverride(), useSheetOptions() (+2 more)

### Community 34 - "Root Stack"
Cohesion: 0.27
Nodes (9): off, A11y, isContrast(), mergeA11y(), useA11y(), Props, styles, Toast() (+1 more)

### Community 35 - "Segmented Control & Stepper"
Cohesion: 0.17
Nodes (8): Props, styles, Props, SegmentedControl(), styles, Props, Stepper(), styles

### Community 36 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.35
Nodes (7): Expo Go only, JS RTL, Theme, direction and accessibility plumbing (R5), Component library, NavigationBar, R3 shell, R3.7 Navigation bar on pushed screens, Resolved owner answers (17 Oct)

### Community 37 - "Level Options & Avatar"
Cohesion: 0.22
Nodes (7): Props, styles, LevelGlyph(), styles, LevelOption(), Props, styles

### Community 38 - "Category Tray & Radio"
Cohesion: 0.22
Nodes (6): CATEGORIES, Props, Radio(), styles, react-native-gesture-handler, react-native-reanimated

### Community 39 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 40 - "Task Plan & Handoff"
Cohesion: 0.20
Nodes (10): Seed sample content (§14), CI design (checks + supabase jobs), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T12 Gallery shell, T21 CategoryTray + trigger, T24 Graphify update and phase report (+2 more)

### Community 41 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 42 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 43 - "Payments Deploy & Edge CI"
Cohesion: 0.28
Nodes (7): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Demo payment, Design tokens package (packages/tokens, R4), T16: PaymentProvider + Edge Functions, T19: Local reminders

### Community 44 - "Account & Interests Data"
Cohesion: 0.31
Nodes (6): styles, Interest, useArea(), useInterests(), queryClient, @tanstack/react-query

### Community 45 - "Manual Layout Tokens"
Cohesion: 0.22
Nodes (7): openTray(), component, homeIndicator, icon, layout, motion, tray

### Community 46 - " Layout 2"
Cohesion: 0.29
Nodes (3): unstable_settings, unstable_settings, expo-router

### Community 47 - "Workshop Seats"
Cohesion: 0.38
Nodes (5): Workshop(), clampSeats(), maxWorkshopSeats(), mockData, mockParams

### Community 48 - "Bottom Action Bar"
Cohesion: 0.33
Nodes (4): BottomActionBar(), Props, styles, expo-glass-effect

### Community 49 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 50 - "Category Tray Spec"
Cohesion: 0.40
Nodes (5): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact)

### Community 51 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 52 - "Handoff Rules & Decisions"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 53 - "Payment Methods & Open Questions"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 54 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 55 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 56 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 415 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Cards & Pills` to `Discovery: Home & Explore Data`, `Who Where · Categories`, `Dates, Slots & Seed`, `Screens & Test Images`, `Settings Sheets`, `Tab Screens`, `i18n & Gallery Copy`, `Mobile Package Manifest`, `Onboarding Screens & Draft`, `Auth, Family & Shared UI`, `Instructor & Booking Data`, `Chips & Icon Buttons`, `Phone Sign-up & Verify`, `Phone Sign-in`, `Buttons, Text & Code Boxes`, `Review & Pay Checkout`, `T · Textfield`, `Generated · Searchfield`, `Root Layout & Query Client`, `Root Stack`, `Segmentedcontrol · Stepper`, `Leveloption · Avatar`, `Category Tray & Radio`, `Account · Profile`, `Bottomactionbar · Chrome Test`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Discovery: Home & Explore Data` be split into smaller, more focused modules?**
  _Cohesion score 0.06493506493506493 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `Who Where · Categories` be split into smaller, more focused modules?**
  _Cohesion score 0.0988235294117647 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D47)` connect `Decisions Log & Expo Docs Rule` to `Working Agreement & Phase 1 Design`, `Phase 1 Tasks & Home Decisions`, `Arabic Copy & Dev Machine`, `Task Plan & Handoff`, `Payments Deploy & Edge CI`, `Working Agreement`, `Project Guide & Design Sources`, `Phase 1 Design Notes`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._