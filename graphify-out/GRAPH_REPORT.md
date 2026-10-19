# Graph Report - Coaching app  (2026-10-19)

## Corpus Check
- 22 files · ~95,722 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1159 nodes · 3751 edges · 61 communities (59 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 119 edges (avg confidence: 0.84)
- Token cost: 25,000 input · 5,000 output

## Community Hubs (Navigation)
- Discovery: Home & Explore Data
- Arabic Copy & Dev Machine
- Search Field & Generated Tokens
- Decisions Log & Expo Docs Rule
- Paymob
- Tab Screens
- Working Agreement & Phase 1 Design
- i18n & Gallery Copy
- Cards & Pills
- Mobile Runtime Dependencies
- Token Generator Script
- Root Stack
- Onboarding Step Screens
- Onboarding Screens & Draft
- Navigationbar · Onboarding
- Expo App Config
- Phone Sign-up & Verify
- Review & Pay Checkout
- Demo Checkout & Checkout Tests
- Handoff Component Specs
- Mobile Package Manifest
- Dates, Slots & Seed
- Project Guide & Design Sources
- Glass, Icon Buttons & Bottom Bar
- Root Package & Scripts
- Settings · Usea11Y
- Format · Seed
- Phase 1 Tasks & Home Decisions
- Emptystate · Section
- Instructor & Booking Data
-  Layout · Account
- Checkout · Review
- Button · Welcome
- Family · Family Member
- Gallery · Avatar
- Seed · Gallerycopy
- Phase 1 Design Notes
- Glasslens · Segmentedcontrol
- Task Plan & Handoff
- Timeslots · Dates Test
- Mobile TypeScript Config
- CI Supabase & Colour Lint
- App Shape, Auth & Journey Gate
- Confirmed & Reminders
- Mobile Dev Dependencies
-  Layout · Messages
- Gallery · Categorytray
- Tokens Package Manifest
- Base TypeScript Config
- Ci · Decisions
- Index · Settings Test
- Category Tray Spec
- Chrome Test · Sheet
- Working Agreement
- Mobile Scripts
- Design Handoff Rules
- ESLint Config
- Handoff in Design
- Jest Config
- Decisions · Design Handoff
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 94 edges
2. `useTheme()` - 80 edges
3. `T()` - 79 edges
4. `Decisions log (D1–D50)` - 54 edges
5. `react-i18next` - 43 edges
6. `useLang()` - 40 edges
7. `react` - 40 edges
8. `useSettings` - 37 edges
9. `expo-router` - 35 edges
10. `Phase 1 technical design` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T1: Schema migration`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T2: Booking functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `Maestro gallery E2E flow` --implements--> `R9 Gallery screen`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/requirements.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (61 total, 2 thin omitted)

### Community 0 - "Discovery: Home & Explore Data"
Cohesion: 0.05
Nodes (69): FiltersSheet(), styles, TYPES, WHEN, Explore(), styles, Home(), styles (+61 more)

### Community 1 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (34): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+26 more)

### Community 2 - "Search Field & Generated Tokens"
Cohesion: 0.10
Nodes (24): DateTile(), styles, Day, DayPicker(), Props, styles, LevelGlyph(), styles (+16 more)

### Community 3 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (8): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Expo Go only, JS RTL, Decisions log (D1–D50), Assumption: Expo Go on iPhone, SDK 57

### Community 4 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 5 - "Tab Screens"
Cohesion: 0.09
Nodes (24): CATEGORIES, Props, styles, ConfirmationRing(), styles, DashedCard(), styles, DisciplineTile() (+16 more)

### Community 6 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 7 - "i18n & Gallery Copy"
Cohesion: 0.11
Nodes (21): off, resolveScheme(), Scheme, styles, Chip(), Props, styles, Props (+13 more)

### Community 8 - "Cards & Pills"
Cohesion: 0.14
Nodes (21): styles, Family(), styles, LANGS, LanguageSheet(), styles, SignOutSheet(), styles (+13 more)

### Community 9 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 10 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 11 - "Root Stack"
Cohesion: 0.13
Nodes (21): ORDER, ROUTE, TabsLayout(), Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props (+13 more)

### Community 12 - "Onboarding Step Screens"
Cohesion: 0.12
Nodes (23): AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), Profile, Area (+15 more)

### Community 13 - "Onboarding Screens & Draft"
Cohesion: 0.17
Nodes (20): SignUp(), submit(), styles, clock(), styles, Verify(), authErrorKey(), e164() (+12 more)

### Community 14 - "Onboarding Steps & Nav Bar"
Cohesion: 0.18
Nodes (22): Categories(), styles, Interests(), styles, Levels(), styles, useInterests(), useSession() (+14 more)

### Community 15 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 16 - "Phone Sign-up & Verify"
Cohesion: 0.14
Nodes (20): Book(), KIDS_AGE, styles, BookDraft, BookOffering, firstName(), days, mockData (+12 more)

### Community 17 - "Review & Pay Checkout"
Cohesion: 0.17
Nodes (21): BookingDetail(), styles, BookingsFilter(), Bookings(), styles, ACTIVE, bookingPolicy(), MY_BOOKING_COLUMNS (+13 more)

### Community 18 - "Demo Checkout & Checkout Tests"
Cohesion: 0.12
Nodes (19): Workshop(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace, mockPromo (+11 more)

### Community 19 - "Handoff Component Specs"
Cohesion: 0.14
Nodes (19): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Colour tokens (§3.1), Component specs (§5), Starting data model proposal, Motion specs (+11 more)

### Community 20 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (21): main, name, private, version, @cfa/tokens, expo, expo-constants, expo-font (+13 more)

### Community 21 - "Dates, Slots & Seed"
Cohesion: 0.18
Nodes (15): styles, Props, styles, Card(), Props, styles, styles, Pill() (+7 more)

### Community 22 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (18): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+10 more)

### Community 23 - "Glass, Icon Buttons & Bottom Bar"
Cohesion: 0.14
Nodes (15): useTheme(), BottomActionBar(), Props, styles, Props, Switch(), Props, styles (+7 more)

### Community 24 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 25 - "Settings & Accessibility"
Cohesion: 0.17
Nodes (12): AppearanceSheet(), styles, THEMES, A11yFlag, Settings, ThemePref, useSettings, A11y (+4 more)

### Community 26 - "Date & Number Formatting"
Cohesion: 0.25
Nodes (16): when(), dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth() (+8 more)

### Community 27 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.24
Nodes (9): Arabic strings: Bookings, Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens, Resolved owner answers (17 Oct), T17: Bookings list + Booking detail (+1 more)

### Community 28 - "Instructor Profile & Hero"
Cohesion: 0.17
Nodes (13): InstructorProfile(), styles, testHero(), EmptyState(), Props, styles, Hero(), styles (+5 more)

### Community 29 - "Instructor & Booking Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 30 - "Root Layout & Profile"
Cohesion: 0.17
Nodes (12): RootLayout(), RootNavigator(), styles, Profile(), styles, Interest, Level, useArea() (+4 more)

### Community 31 - "Review & Pay"
Cohesion: 0.20
Nodes (14): Review(), styles, applyPromo(), Booking, KNOWN, placeBooking(), ReminderChoice, ReviewData (+6 more)

### Community 32 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.18
Nodes (11): styles, Welcome(), DemoCheckout(), styles, GallerySheet(), styles, demoPay(), Button() (+3 more)

### Community 33 - "Family Members"
Cohesion: 0.20
Nodes (13): FamilyMemberSheet(), styles, CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking, toLatinDigits() (+5 more)

### Community 34 - "Gallery Demo Data & Avatar"
Cohesion: 0.15
Nodes (12): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, Avatar(), Props (+4 more)

### Community 35 - "Seed Data & Gallery Copy"
Cohesion: 0.17
Nodes (11): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, yasmine (+3 more)

### Community 36 - "Phase 1 Design Notes"
Cohesion: 0.20
Nodes (14): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+6 more)

### Community 37 - "Selection Lens & Segmented Control"
Cohesion: 0.21
Nodes (10): GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles, @react-native-async-storage/async-storage (+2 more)

### Community 38 - "Task Plan & Handoff"
Cohesion: 0.14
Nodes (12): Seed sample content (§14), CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R10 Knowledge map (graphify), R9 Gallery screen, Phase 0 ordered tasks, T10 i18n + RTL + number format, T12 Gallery shell (+4 more)

### Community 39 - "Time Slots & Language"
Cohesion: 0.23
Nodes (11): setLanguage(), sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState (+3 more)

### Community 40 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 41 - "CI Supabase & Colour Lint"
Cohesion: 0.21
Nodes (13): Phase 0 requirements, Theme, direction and accessibility plumbing (R5), Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21 (+5 more)

### Community 42 - "App Shape, Auth & Journey Gate"
Cohesion: 0.35
Nodes (9): Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth, R4 onboarding (+1 more)

### Community 43 - "Confirmed & Reminders"
Cohesion: 0.27
Nodes (9): Confirmed(), styles, RemindSheet(), styles, directionsUrl(), DEFAULT_REMINDER, REMINDER_CHOICES, useMyBooking() (+1 more)

### Community 44 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 45 - "Tab Layout & Messages"
Cohesion: 0.20
Nodes (5): unstable_settings, unstable_settings, Messages(), styles, expo-router

### Community 46 - "Gallery & Category Tray"
Cohesion: 0.24
Nodes (6): GalleryRoute(), Gallery(), CategoryTray(), Radio(), openTray(), @testing-library/react-native

### Community 47 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 48 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 49 - "CI Jobs"
Cohesion: 0.28
Nodes (7): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Arabic strings: Demo payment, Design tokens package (packages/tokens, R4), T16: PaymentProvider + Edge Functions, T19: Local reminders

### Community 50 - "i18n Keys"
Cohesion: 0.28
Nodes (4): i18n, keys(), missingArabicKeys(), Tree

### Community 51 - "Category Tray Spec"
Cohesion: 0.33
Nodes (6): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 52 - "RTL & Sheet Options"
Cohesion: 0.38
Nodes (3): useIsRTL(), useSheetOptions(), expo-glass-effect

### Community 53 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 54 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 55 - "Design Handoff Rules"
Cohesion: 0.33
Nodes (4): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Paymob payment gateway proposal

### Community 56 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 57 - "Handoff in Design"
Cohesion: 0.50
Nodes (5): Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 58 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `expo-notifications` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 419 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Dates, Slots & Seed` to `Discovery: Home & Explore Data`, `Search Field & Generated Tokens`, `Tab Screens`, `i18n & Gallery Copy`, `Cards & Pills`, `Root Stack`, `Onboarding Step Screens`, `Onboarding Screens & Draft`, `Navigationbar · Onboarding`, `Phone Sign-up & Verify`, `Review & Pay Checkout`, `Mobile Package Manifest`, `Glass, Icon Buttons & Bottom Bar`, `Settings · Usea11Y`, `Format · Seed`, `Emptystate · Section`, `Instructor & Booking Data`, ` Layout · Account`, `Checkout · Review`, `Button · Welcome`, `Family · Family Member`, `Gallery · Avatar`, `Seed · Gallerycopy`, `Glasslens · Segmentedcontrol`, `Timeslots · Dates Test`, `Confirmed & Reminders`, ` Layout · Messages`, `Gallery · Categorytray`, `Chrome Test · Sheet`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Discovery: Home & Explore Data` be split into smaller, more focused modules?**
  _Cohesion score 0.0519311911716975 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `Arabic Copy & Dev Machine` be split into smaller, more focused modules?**
  _Cohesion score 0.07804878048780488 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D50)` connect `Decisions Log & Expo Docs Rule` to `Arabic Copy & Dev Machine`, `Task Plan & Handoff`, `Phase 1 Tasks & Home Decisions`, `App Shape, Auth & Journey Gate`, `Ci · Decisions`, `Working Agreement`, `Project Guide & Design Sources`, `Decisions · Design Handoff`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._