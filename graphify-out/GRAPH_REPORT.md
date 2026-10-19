# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 6 files · ~91,678 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1130 nodes · 3591 edges · 46 communities (45 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 118 edges (avg confidence: 0.84)
- Token cost: 20,000 input · 4,000 output

## Community Hubs (Navigation)
- Dates, Slots & Seed
- Onboarding Screens & Draft
- i18n & Gallery Copy
- Discovery: Home & Explore Data
- Onboarding Step Screens
- Decisions Log & Expo Docs Rule
- Arabic Copy & Dev Machine
- Root Stack
- Cards & Pills
- Search Field & Generated Tokens
- Paymob
- Mobile Runtime Dependencies
- Tab Screens
- Token Generator Script
- Working Agreement & Phase 1 Design
- Text & Text Fields
- Bottomactionbar · Iconbutton
- Project Guide & Design Sources
- Expo App Config
- Mobile Package Manifest
- Instructor & Booking Data
- Design Handoff Rules
- Root Package & Scripts
- Phone Sign-up & Verify
- Review & Pay Checkout
- Phase 1 Design Notes
- Phase 1 Tasks & Home Decisions
- Design Handoff · Requirements
- Mobile TypeScript Config
- Confirmed & Reminders
- Checkout Test · Demo Checkout
- App Shape, Auth & Journey Gate
- Task Plan & Handoff
- Mobile Dev Dependencies
- Auth, Family & Shared UI
- Tokens Package Manifest
- CI Supabase & Colour Lint
- Base TypeScript Config
- Working Agreement
- Mobile Scripts
- Claude · Requirements
- ESLint Config
- Handoff in Design
- Category Tray Spec
- Jest Config
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 90 edges
2. `T()` - 78 edges
3. `useTheme()` - 78 edges
4. `Decisions log (D1–D49)` - 53 edges
5. `react-i18next` - 41 edges
6. `react` - 38 edges
7. `useLang()` - 37 edges
8. `useSettings` - 36 edges
9. `Phase 1 technical design` - 33 edges
10. `expo-router` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --rationale_for--> `D4: Hosted Supabase dev project`  [INFERRED]
  .github/workflows/ci.yml → docs/DECISIONS.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T1: Schema migration`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T2: Booking functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (46 total, 1 thin omitted)

### Community 0 - "Dates, Slots & Seed"
Cohesion: 0.05
Nodes (92): GalleryRoute(), InstructorProfile(), LanguageSheet(), Screen(), Explore(), styles, Home(), styles (+84 more)

### Community 1 - "Onboarding Screens & Draft"
Cohesion: 0.05
Nodes (50): unstable_settings, SignUp(), submit(), styles, clock(), styles, Verify(), Family() (+42 more)

### Community 2 - "i18n & Gallery Copy"
Cohesion: 0.05
Nodes (39): AppearanceSheet(), styles, THEMES, LANGS, styles, Workshop(), clampSeats(), maxWorkshopSeats() (+31 more)

### Community 3 - "Discovery: Home & Explore Data"
Cohesion: 0.06
Nodes (54): FiltersSheet(), styles, TYPES, WHEN, SORTS, SortSheet(), styles, activeFilterCount() (+46 more)

### Community 4 - "Onboarding Step Screens"
Cohesion: 0.07
Nodes (45): RootLayout(), RootNavigator(), styles, Categories(), Interests(), styles, Levels(), AREA_ORDER (+37 more)

### Community 5 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (13): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, CLAUDE.md (project instructions), After every task routine, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Expo Go only, JS RTL (+5 more)

### Community 6 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (35): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+27 more)

### Community 7 - "Root Stack"
Cohesion: 0.11
Nodes (27): useIsRTL(), A11y, isContrast(), mergeA11y(), useA11y(), CATEGORIES, Props, styles (+19 more)

### Community 8 - "Cards & Pills"
Cohesion: 0.15
Nodes (21): styles, Welcome(), styles, styles, styles, styles, styles, styles (+13 more)

### Community 9 - "Search Field & Generated Tokens"
Cohesion: 0.10
Nodes (23): resolveScheme(), Scheme, Props, styles, styles, LevelGlyph(), styles, Props (+15 more)

### Community 10 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 11 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 12 - "Tab Screens"
Cohesion: 0.10
Nodes (20): KIDS_AGE, styles, Day, DayPicker(), Props, styles, styles, EmptyState() (+12 more)

### Community 13 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 14 - "Working Agreement & Phase 1 Design"
Cohesion: 0.16
Nodes (29): Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function, create-checkout Edge Function (+21 more)

### Community 15 - "Text & Text Fields"
Cohesion: 0.11
Nodes (19): GallerySheet(), styles, Chip(), Props, styles, DashedCard(), styles, Props (+11 more)

### Community 16 - "Glass, Icon Buttons & Bottom Bar"
Cohesion: 0.13
Nodes (20): BottomActionBar(), Props, styles, Glass(), Icon(), IconButton(), Props, styles (+12 more)

### Community 17 - "Project Guide & Design Sources"
Cohesion: 0.10
Nodes (21): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), Phase-branch git workflow, Arabic strings: Demo payment, Design tokens package (packages/tokens, R4) (+13 more)

### Community 18 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 19 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (22): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+14 more)

### Community 20 - "Instructor & Booking Data"
Cohesion: 0.11
Nodes (17): BookDraft, BookOffering, useBookOptions(), InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering (+9 more)

### Community 21 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 22 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 23 - "Phone Sign-up & Verify"
Cohesion: 0.18
Nodes (14): Book(), days, mockData, mockFamily, mockParams, now, cairoDay(), cairoHM() (+6 more)

### Community 24 - "Review & Pay Checkout"
Cohesion: 0.20
Nodes (16): Review(), styles, useBookDraft, applyPromo(), Booking, BookingErrorKey, ConfirmedBooking, KNOWN (+8 more)

### Community 25 - "Phase 1 Design Notes"
Cohesion: 0.17
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 26 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.29
Nodes (7): Theme, direction and accessibility plumbing (R5), Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens, Resolved owner answers (17 Oct)

### Community 27 - "Handoff Component Specs"
Cohesion: 0.19
Nodes (13): Bottom action bar, Colour tokens (§3.1), Component specs (§5), Navigation bar glass capsule, Shadow, blur, radius, spacing tokens (§3.2), Glass sheets, Floating glass tab bar with minimise on scroll, Type scale (§3.3) (+5 more)

### Community 28 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 29 - "Confirmed & Reminders"
Cohesion: 0.26
Nodes (10): Confirmed(), styles, RemindSheet(), styles, firstName(), DEFAULT_REMINDER, REMINDER_CHOICES, useMyBooking() (+2 more)

### Community 30 - "Demo Checkout & Checkout Tests"
Cohesion: 0.20
Nodes (11): DemoCheckout(), demoPay(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace (+3 more)

### Community 31 - "App Shape, Auth & Journey Gate"
Cohesion: 0.35
Nodes (9): Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth, R4 onboarding (+1 more)

### Community 32 - "Task Plan & Handoff"
Cohesion: 0.17
Nodes (12): Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+4 more)

### Community 33 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 34 - "Auth, Family & Shared UI"
Cohesion: 0.29
Nodes (8): ORDER, ROUTE, TabsLayout(), restoreTabBar(), TabKey, useTabBarMinimised(), useTabBarStore, TAB_ICON

### Community 35 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 36 - "CI Supabase & Colour Lint"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 37 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 38 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 39 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 40 - "Testing & CI Rules"
Cohesion: 0.40
Nodes (5): CI-only database tests, npm run check gate, Testing and CI, R10 e2e, R10.1 Maestro flows (onboarding to cancel without refund)

### Community 41 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 42 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 43 - "Category Tray Spec"
Cohesion: 0.67
Nodes (4): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact)

### Community 44 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 414 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Search Field & Generated Tokens` to `Dates, Slots & Seed`, `Onboarding Screens & Draft`, `i18n & Gallery Copy`, `Discovery: Home & Explore Data`, `Onboarding Step Screens`, `Auth, Family & Shared UI`, `Root Stack`, `Cards & Pills`, `Tab Screens`, `Text & Text Fields`, `Bottomactionbar · Iconbutton`, `Mobile Package Manifest`, `Instructor & Booking Data`, `Review & Pay Checkout`, `Confirmed & Reminders`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dates, Slots & Seed` be split into smaller, more focused modules?**
  _Cohesion score 0.05028665028665029 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.053821800090456805 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `i18n & Gallery Copy` to `Dates, Slots & Seed`, `Onboarding Screens & Draft`, `Discovery: Home & Explore Data`, `Onboarding Step Screens`, `Bottomactionbar · Iconbutton`, `Mobile Package Manifest`, `Instructor & Booking Data`, `Phone Sign-up & Verify`, `Checkout Test · Demo Checkout`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._