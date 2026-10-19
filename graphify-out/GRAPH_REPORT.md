# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 5 files · ~90,577 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1123 nodes · 3552 edges · 60 communities (58 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.84)
- Token cost: 20,000 input · 4,000 output

## Community Hubs (Navigation)
- Onboarding Step Screens
- Onboarding Screens & Draft
- Decisions Log & Expo Docs Rule
- Root Stack
- Paymob
- Cards & Pills
- Working Agreement & Phase 1 Design
- Arabic Copy & Dev Machine
- Mobile Runtime Dependencies
- Token Generator Script
- Discovery: Home & Explore Data
- Text & Text Fields
- Search Field & Generated Tokens
- Project Guide & Design Sources
- Expo App Config
- Mobile Package Manifest
- Chips & Icon Buttons
- Screens & Test Images
- Gallery · Segmentedcontrol
- Dates, Slots & Seed
- Tab Screens
- Design Handoff Rules
- Phone Sign-up & Verify
- Review & Pay Checkout
- Auth, Family & Shared UI
- i18n & Gallery Copy
- Checkout · [Ref]
- Instructor & Booking Data
- Explore Test · Sort
- Root Package & Scripts
- Settings Sheets
- Root Layout & Query Client
- Phase 1 Design Notes
- Task Plan & Handoff
- Mobile TypeScript Config
- CI Supabase & Colour Lint
- Testimages · Explore
- Home · Home Test
- Timeslots · Dates Test
- Design · Decisions
- Seed · Cards Test
- Phase 1 Tasks & Home Decisions
- Mobile Dev Dependencies
- Tasks · Decisions
- Tokens Package Manifest
- Base TypeScript Config
- Book · Demo Checkout
- Category Tray Spec
- Workshop Seats
- Level Options & Avatar
- Working Agreement
- Mobile Scripts
- Payment Methods & Open Questions
- Manual Layout Tokens
- ESLint Config
- Gallerycopy
- Handoff in Design
- Jest Config
- Decisions · Design Handoff
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 89 edges
2. `T()` - 79 edges
3. `useTheme()` - 78 edges
4. `Decisions log (D1–D48)` - 52 edges
5. `react-i18next` - 41 edges
6. `useLang()` - 37 edges
7. `react` - 37 edges
8. `useSettings` - 36 edges
9. `expo-router` - 32 edges
10. `Coach For All design handoff` - 32 edges

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

## Communities (60 total, 2 thin omitted)

### Community 0 - "Onboarding Step Screens"
Cohesion: 0.09
Nodes (47): Categories(), styles, Interests(), styles, Levels(), styles, AREA_ORDER, Pref (+39 more)

### Community 1 - "Onboarding Screens & Draft"
Cohesion: 0.07
Nodes (39): unstable_settings, SignUp(), submit(), styles, clock(), styles, Verify(), FamilyMemberSheet() (+31 more)

### Community 2 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (13): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, CLAUDE.md (project instructions), After every task routine, CI-only database tests, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact (+5 more)

### Community 3 - "Root Stack"
Cohesion: 0.10
Nodes (27): A11yFlag, A11y, isContrast(), mergeA11y(), useA11y(), CATEGORIES, CategoryButton(), Props (+19 more)

### Community 4 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 5 - "Cards & Pills"
Cohesion: 0.13
Nodes (21): styles, styles, styles, useTheme(), Banner(), styles, BottomActionBar(), Card() (+13 more)

### Community 6 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 7 - "Arabic Copy & Dev Machine"
Cohesion: 0.09
Nodes (28): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+20 more)

### Community 8 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 9 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 10 - "Discovery: Home & Explore Data"
Cohesion: 0.12
Nodes (27): FiltersSheet(), styles, TYPES, WHEN, Availability, byKey(), DEFAULT_FILTERS, DISTANCES (+19 more)

### Community 11 - "Text & Text Fields"
Cohesion: 0.11
Nodes (21): styles, Day, DayPicker(), Props, styles, EmptyState(), Props, styles (+13 more)

### Community 12 - "Search Field & Generated Tokens"
Cohesion: 0.13
Nodes (19): off, resolveScheme(), Scheme, Props, styles, flat(), Props, styles (+11 more)

### Community 13 - "Project Guide & Design Sources"
Cohesion: 0.10
Nodes (21): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), Phase-branch git workflow, Arabic strings: Demo payment, Design tokens package (packages/tokens, R4) (+13 more)

### Community 14 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 15 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (24): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+16 more)

### Community 16 - "Chips & Icon Buttons"
Cohesion: 0.14
Nodes (14): styles, Welcome(), GallerySheet(), styles, Button(), ButtonVariant, Props, styles (+6 more)

### Community 17 - "Screens & Test Images"
Cohesion: 0.19
Nodes (21): GalleryRoute(), Screen(), Explore(), Home(), styles, Messages(), Profile(), Gallery() (+13 more)

### Community 18 - "Gallery Demo Data"
Cohesion: 0.13
Nodes (17): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, DateTile(), Progress() (+9 more)

### Community 19 - "Dates, Slots & Seed"
Cohesion: 0.20
Nodes (19): when(), dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth() (+11 more)

### Community 20 - "Tab Screens"
Cohesion: 0.13
Nodes (16): Props, styles, DashedCard(), styles, styles, directional, Icon(), IconName (+8 more)

### Community 21 - "Design Handoff Rules"
Cohesion: 0.14
Nodes (19): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Colour tokens (§3.1), Component specs (§5), Starting data model proposal, Motion specs (+11 more)

### Community 22 - "Phone Sign-up & Verify"
Cohesion: 0.18
Nodes (16): Book(), KIDS_AGE, styles, days, mockData, mockFamily, mockParams, now (+8 more)

### Community 23 - "Review & Pay Checkout"
Cohesion: 0.17
Nodes (19): Review(), styles, applyPromo(), BookingErrorKey, placeBooking(), startCheckout(), booking(), inDays() (+11 more)

### Community 24 - "Auth, Family & Shared UI"
Cohesion: 0.18
Nodes (14): ORDER, ROUTE, TabsLayout(), Props, restoreTabBar(), styles, TabBar(), TabIcon() (+6 more)

### Community 25 - "i18n & Gallery Copy"
Cohesion: 0.18
Nodes (8): i18n, keys(), missingArabicKeys(), Tree, Settings, useSettings, @react-native-async-storage/async-storage, @testing-library/react-native

### Community 26 - "Confirmed & Reminders"
Cohesion: 0.16
Nodes (17): Confirmed(), styles, RemindSheet(), styles, firstName(), Booking, ConfirmedBooking, DEFAULT_REMINDER (+9 more)

### Community 27 - "Instructor & Booking Data"
Cohesion: 0.13
Nodes (15): InstructorProfile(), InstructorCardRow, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+7 more)

### Community 28 - "Sort Sheet & Explore Tests"
Cohesion: 0.12
Nodes (16): SORTS, SortSheet(), styles, OfferingPrice, SortKey, at(), base, card() (+8 more)

### Community 29 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 30 - "Settings Sheets"
Cohesion: 0.15
Nodes (15): AppearanceSheet(), styles, THEMES, Family(), LANGS, LanguageSheet(), styles, FamilyMember (+7 more)

### Community 31 - "Root Layout & Query Client"
Cohesion: 0.16
Nodes (11): RootLayout(), RootNavigator(), styles, useProfile(), queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions() (+3 more)

### Community 32 - "Phase 1 Design Notes"
Cohesion: 0.20
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 33 - "Task Plan & Handoff"
Cohesion: 0.14
Nodes (12): Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R10 Knowledge map (graphify), R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+4 more)

### Community 34 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 35 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (13): Phase 0 requirements, Theme, direction and accessibility plumbing (R5), Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21 (+5 more)

### Community 36 - "Test Images & Category Tray"
Cohesion: 0.17
Nodes (10): styles, activeFilterCount(), byCategory, byDiscipline, heroes, people, TEST_IMAGES, CategoryTray() (+2 more)

### Community 37 - "Home Data & Time Rules"
Cohesion: 0.24
Nodes (9): cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, MyBookingRow, mockBookings, mockRows, useMyCategoryBookings() (+1 more)

### Community 38 - "Time Slots"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 39 - "App Shape, Auth & Journey Gate"
Cohesion: 0.35
Nodes (9): Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth, R4 onboarding (+1 more)

### Community 40 - "Seed Instructors & Workshops"
Cohesion: 0.25
Nodes (8): nour, photoWalk, seedFor(), text, wheelTaster, yasmine, Instructor, Workshop

### Community 41 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.44
Nodes (5): Component library, NavigationBar, R3 shell, R3.7 Navigation bar on pushed screens, Resolved owner answers (17 Oct)

### Community 42 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 43 - "Explore, Instructor & Workshop Tasks"
Cohesion: 0.29
Nodes (7): Arabic strings: Explore, Filters and Sort, Arabic strings: Instructor profile, Arabic strings: Workshop, T11: Explore with search, filters, sort, T12: Instructor profile (canvas 8), T13: Workshop (canvas 9) with the seat stepper, T17: Bookings list + Booking detail

### Community 44 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 45 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 46 - "Book Draft & Demo Checkout"
Cohesion: 0.32
Nodes (6): DemoCheckout(), styles, BookDraft, BookOffering, useBookDraft, demoPay()

### Community 47 - "Category Tray Spec"
Cohesion: 0.33
Nodes (6): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 48 - "Workshop Seats"
Cohesion: 0.38
Nodes (5): Workshop(), clampSeats(), maxWorkshopSeats(), mockData, mockParams

### Community 49 - "Level Options & Avatar"
Cohesion: 0.38
Nodes (5): LevelGlyph(), styles, Props, styles, react-native

### Community 50 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 51 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 52 - "Payment Methods & Open Questions"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 53 - "Manual Layout Tokens"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 54 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 55 - "Gallerycopy"
Cohesion: 0.40
Nodes (3): ar, en, galleryCopy

### Community 56 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 57 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 413 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Level Options & Avatar` to `Onboarding Step Screens`, `Onboarding Screens & Draft`, `Root Stack`, `Cards & Pills`, `Discovery: Home & Explore Data`, `Text & Text Fields`, `Search Field & Generated Tokens`, `Mobile Package Manifest`, `Chips & Icon Buttons`, `Screens & Test Images`, `Gallery · Segmentedcontrol`, `Dates, Slots & Seed`, `Tab Screens`, `Phone Sign-up & Verify`, `Review & Pay Checkout`, `Auth, Family & Shared UI`, `i18n & Gallery Copy`, `Checkout · [Ref]`, `Instructor & Booking Data`, `Explore Test · Sort`, `Settings Sheets`, `Root Layout & Query Client`, `Testimages · Explore`, `Timeslots · Dates Test`, `Seed · Cards Test`, `Book · Demo Checkout`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Step Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.08834586466165413 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.07205387205387205 - nodes in this community are weakly interconnected._
- **Why does `expo-router` connect `Onboarding Screens & Draft` to `Onboarding Step Screens`, `Testimages · Explore`, `Cards & Pills`, `Discovery: Home & Explore Data`, `Text & Text Fields`, `Book · Demo Checkout`, `Mobile Package Manifest`, `Chips & Icon Buttons`, `Screens & Test Images`, `Gallery · Segmentedcontrol`, `Phone Sign-up & Verify`, `Review & Pay Checkout`, `Auth, Family & Shared UI`, `Checkout · [Ref]`, `Explore Test · Sort`, `Root Layout & Query Client`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._