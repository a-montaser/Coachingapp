# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 2 files · ~90,166 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1118 nodes · 3524 edges · 60 communities (56 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.84)
- Token cost: 14,000 input · 4,000 output

## Community Hubs (Navigation)
- Onboarding Screens & Draft
- Cards & Pills
- Buttons, Text & Code Boxes
- Decisions Log & Expo Docs Rule
- Dates, Slots & Seed
- Token Generator Script
- Settings Sheets
- Paymob
- Working Agreement & Phase 1 Design
- Tab Screens
- Arabic Copy & Dev Machine
- Mobile Runtime Dependencies
- Who Where · Categories
- Expo App Config
- Phone Sign-up & Verify
- Auth, Family & Shared UI
- Mobile Package Manifest
- Discovery: Home & Explore Data
- Chip · Iconbutton
- Instructor & Booking Data
- Project Guide & Design Sources
- Design Handoff Rules
- Home · Home Test
- Review & Pay Checkout
- Root Package & Scripts
- Phone Sign-in
- Explore · Gallery
- Phase 1 Design Notes
- Checkout.Test
- Root Stack
- Explore Test · Explore
- Handoff Rules & Decisions
- Categorytray · Package
- Mobile TypeScript Config
-  Layout · Queryclient
- Design Decisions
- Task Plan & Handoff
- Chrome Test · Overmedia Test
- i18n & Gallery Copy
- Ci · Tasks
- Mobile Dev Dependencies
- Tokens Package Manifest
- CI Supabase & Colour Lint
- Base TypeScript Config
- Family · Banner
- Decisions · Tasks
- Workshop Test
- Testimages
- Working Agreement
- Mobile Scripts
- Explore · Home
- Phase 1 Tasks & Home Decisions
- Manual Layout Tokens
- ESLint Config
- Handoff in Design
- Gallery · Design Handoff
- Jest Config
-  Layout
-  Layout 2
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 87 edges
2. `T()` - 79 edges
3. `useTheme()` - 78 edges
4. `Decisions log (D1–D46)` - 50 edges
5. `react-i18next` - 40 edges
6. `useLang()` - 37 edges
7. `react` - 37 edges
8. `useSettings` - 36 edges
9. `Icon()` - 32 edges
10. `expo-router` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
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

## Communities (60 total, 4 thin omitted)

### Community 0 - "Onboarding Screens & Draft"
Cohesion: 0.06
Nodes (49): SignUp(), submit(), styles, clock(), Verify(), Welcome(), WhoWhereScreen(), Messages() (+41 more)

### Community 1 - "Cards & Pills"
Cohesion: 0.09
Nodes (36): styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, formatDistance() (+28 more)

### Community 2 - "Buttons, Text & Code Boxes"
Cohesion: 0.09
Nodes (31): styles, ThemePref, Scheme, DateTile(), styles, styles, Props, styles (+23 more)

### Community 3 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (14): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, CLAUDE.md (project instructions), After every task routine, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Expo Go only, JS RTL (+6 more)

### Community 4 - "Dates, Slots & Seed"
Cohesion: 0.09
Nodes (35): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, dateFormat() (+27 more)

### Community 5 - "Token Generator Script"
Cohesion: 0.07
Nodes (29): Props, styles, build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber() (+21 more)

### Community 6 - "Settings Sheets"
Cohesion: 0.13
Nodes (25): AppearanceSheet(), styles, THEMES, styles, styles, styles, LANGS, LanguageSheet() (+17 more)

### Community 7 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 8 - "Working Agreement & Phase 1 Design"
Cohesion: 0.14
Nodes (34): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+26 more)

### Community 9 - "Tab Screens"
Cohesion: 0.11
Nodes (23): styles, InstructorProfile(), styles, styles, Props, styles, ConfirmationRing(), styles (+15 more)

### Community 10 - "Arabic Copy & Dev Machine"
Cohesion: 0.10
Nodes (27): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+19 more)

### Community 11 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 12 - "Who Where · Categories"
Cohesion: 0.18
Nodes (21): Categories(), styles, Interests(), styles, Levels(), styles, AREA_ORDER, Pref (+13 more)

### Community 13 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 14 - "Phone Sign-up & Verify"
Cohesion: 0.15
Nodes (20): Book(), KIDS_AGE, styles, firstName(), days, mockData, mockFamily, mockParams (+12 more)

### Community 15 - "Auth, Family & Shared UI"
Cohesion: 0.16
Nodes (18): ORDER, ROUTE, TabsLayout(), Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props (+10 more)

### Community 16 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 17 - "Discovery: Home & Explore Data"
Cohesion: 0.11
Nodes (22): FiltersSheet(), styles, TYPES, WHEN, SortSheet(), Availability, DEFAULT_FILTERS, DISTANCES (+14 more)

### Community 18 - "Chips & Icon Buttons"
Cohesion: 0.13
Nodes (15): GallerySheet(), styles, Chip(), Props, styles, IconName, IconButton(), Props (+7 more)

### Community 19 - "Instructor & Booking Data"
Cohesion: 0.12
Nodes (17): BookDraft, BookOffering, InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot (+9 more)

### Community 20 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (16): Phase-branch git workflow, Arabic strings: Explore, Filters and Sort, Arabic strings: Instructor profile, Arabic strings: Workshop, Phase 1 ordered tasks, G1: GitHub push, CI green and PR into main, G2: Supabase keys, link and db push, T11: Explore with search, filters, sort (+8 more)

### Community 21 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 22 - "Home Data & Time Rules"
Cohesion: 0.17
Nodes (16): styles, useExploreResults(), useOrigin(), cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, MyBookingRow (+8 more)

### Community 23 - "Review & Pay Checkout"
Cohesion: 0.18
Nodes (17): Review(), styles, applyPromo(), Booking, BookingErrorKey, ConfirmedBooking, DEFAULT_REMINDER, KNOWN (+9 more)

### Community 24 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 25 - "Phone Sign-in"
Cohesion: 0.13
Nodes (16): FamilyMemberSheet(), Profile(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits() (+8 more)

### Community 26 - "Screens & Test Images"
Cohesion: 0.24
Nodes (16): GalleryRoute(), Screen(), Explore(), styles, Home(), Gallery(), testBanner(), testPhoto() (+8 more)

### Community 27 - "Phase 1 Design Notes"
Cohesion: 0.17
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 28 - "Confirmed, Demo Checkout & Remind"
Cohesion: 0.16
Nodes (15): Confirmed(), DemoCheckout(), RemindSheet(), demoPay(), booking(), inDays(), mockCheckout, mockDemoPay (+7 more)

### Community 29 - "Root Stack"
Cohesion: 0.21
Nodes (12): A11yFlag, Lang, Settings, useSettings, off, A11y, isContrast(), mergeA11y() (+4 more)

### Community 30 - "Explore Filters Tests"
Cohesion: 0.15
Nodes (12): activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany, mockRows (+4 more)

### Community 31 - "Handoff Rules & Decisions"
Cohesion: 0.19
Nodes (13): Bottom action bar, Colour tokens (§3.1), Component specs (§5), Navigation bar glass capsule, Shadow, blur, radius, spacing tokens (§3.2), Glass sheets, Floating glass tab bar with minimise on scroll, Type scale (§3.3) (+5 more)

### Community 32 - "Category Tray & Radio"
Cohesion: 0.19
Nodes (9): CATEGORIES, CategoryTray(), Props, Radio(), styles, openTray(), @react-native-async-storage/async-storage, react-native-gesture-handler (+1 more)

### Community 33 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 34 - "Root Layout & Query Client"
Cohesion: 0.24
Nodes (9): RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions(), expo-font (+1 more)

### Community 35 - "Design Decisions"
Cohesion: 0.29
Nodes (9): Demo sign-in, Arabic strings: Onboarding, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), R2 auth, R4 onboarding (+1 more)

### Community 36 - "Task Plan & Handoff"
Cohesion: 0.17
Nodes (12): Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+4 more)

### Community 38 - "i18n & Gallery Copy"
Cohesion: 0.27
Nodes (5): i18n, keys(), missingArabicKeys(), setLanguage(), Tree

### Community 39 - "CI Jobs & Race Test"
Cohesion: 0.20
Nodes (9): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CI-only database tests, Design tokens package (packages/tokens, R4), T1: Schema migration, T2: Booking functions (+1 more)

### Community 40 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 41 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 42 - "CI Supabase & Colour Lint"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 43 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 44 - "Family Sheet & Banners"
Cohesion: 0.31
Nodes (6): Family(), styles, Banner(), styles, DashedCard(), styles

### Community 45 - "Payments Deploy & Edge CI"
Cohesion: 0.32
Nodes (5): CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Demo payment, Resolved owner answers (17 Oct), T16: PaymentProvider + Edge Functions, T19: Local reminders

### Community 46 - "Workshop Seats"
Cohesion: 0.38
Nodes (5): Workshop(), clampSeats(), maxWorkshopSeats(), mockData, mockParams

### Community 47 - "Test Images (revert in T22)"
Cohesion: 0.29
Nodes (6): byCategory, byDiscipline, heroes, people, TEST_IMAGES, testHero()

### Community 48 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 49 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 50 - "Explore Filter Rules"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 51 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.73
Nodes (4): Component library, NavigationBar, R3 shell, R3.7 Navigation bar on pushed screens

### Community 52 - "Manual Layout Tokens"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 53 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 54 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 55 - "Category Tray Spec"
Cohesion: 0.67
Nodes (4): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact)

### Community 56 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **28 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 414 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Buttons, Text & Code Boxes` to `Onboarding Screens & Draft`, `Cards & Pills`, `Dates, Slots & Seed`, `Token Generator Script`, `Settings Sheets`, `Tab Screens`, `Who Where · Categories`, `Phone Sign-up & Verify`, `Auth, Family & Shared UI`, `Mobile Package Manifest`, `Discovery: Home & Explore Data`, `Chip · Iconbutton`, `Instructor & Booking Data`, `Home · Home Test`, `Review & Pay Checkout`, `Explore · Gallery`, `Root Stack`, `Categorytray · Package`, ` Layout · Queryclient`, `Chrome Test · Overmedia Test`, `i18n & Gallery Copy`, `Family · Banner`, `Testimages`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.055299539170506916 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `Cards & Pills` be split into smaller, more focused modules?**
  _Cohesion score 0.09306122448979592 - nodes in this community are weakly interconnected._
- **Why does `expo-router` connect `Settings Sheets` to `Onboarding Screens & Draft`, `Cards & Pills`, `Buttons, Text & Code Boxes`, ` Layout · Queryclient`, ` Layout 2`, `Tab Screens`, `Family · Banner`, `Who Where · Categories`, `Phone Sign-up & Verify`, `Auth, Family & Shared UI`, `Mobile Package Manifest`, `Discovery: Home & Explore Data`, `Chip · Iconbutton`, `Home · Home Test`, `Review & Pay Checkout`, ` Layout`, `Explore · Gallery`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._