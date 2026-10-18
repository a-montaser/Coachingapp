# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 13 files · ~77,002 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 964 nodes · 2953 edges · 45 communities (44 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 118 edges (avg confidence: 0.85)
- Token cost: 50,000 input · 13,304 output

## Community Hubs (Navigation)
- Auth, Family & Shared UI
- Dev Gallery & Cards
- Onboarding Screens & Draft
- Instructor Profile
- Working Agreement & Phase 1 Design
- Settings & Family Sheets
- Mobile Runtime Dependencies
- Token Generator Script
- Mobile Package Manifest
- Decisions Log & Expo Docs Rule
- Expo App Config
- Phone Sign-up & Verify
- Arabic Copy & Dev Machine
- Discovery: Home & Explore Data
- Design Handoff Rules
- Root Package & Scripts
- Project Guide & Design Sources
- Home Read Models
- Phase 1 Tasks & Home Decisions
- Explore Rule Tests
- Maestro & Phase 0 Design
- CI Supabase & Colour Lint
- Settings Store & Appearance
- Mobile TypeScript Config
- Root Layout & Query Client
- Phase 1 Design Notes
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Maestro & E2E Plans
- Category Tray
- Discovery Decisions & Strings
- Dev Machine & Expo Go Limits
- Glass Accessibility Fallbacks
- Mobile Scripts
- Explore Location & Results
- Booking Decisions & Strings
- Design Token Specs
- Manual Layout Tokens
- Arabic & RTL Support
- ESLint Config
- Onboarding & Demo Sign-in Decisions
- Jest Config
- Phase 0 Report
- Arabic Strings Pipeline

## God Nodes (most connected - your core abstractions)
1. `T()` - 83 edges
2. `useTheme()` - 69 edges
3. `react-native` - 68 edges
4. `useLang()` - 44 edges
5. `Icon()` - 41 edges
6. `react-i18next` - 37 edges
7. `useSettings` - 35 edges
8. `react` - 33 edges
9. `Coach For All design handoff` - 32 edges
10. `formatNumber()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `Arabic strings: Instructor and workshop cards` --conceptually_related_to--> `T10 Home ×4 + tray`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Time slots` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go on iPhone 16 Pro (iOS 26.6.2); Android emulator also uses Expo Go. …`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `Assumption: Expo Go on iPhone, SDK 57` --references--> `D9: iOS testing in Expo Go on iPhone 16 Pro (iOS 26.6.2); Android emulator also uses Expo Go. …`  [INFERRED]
  specs/phase-0/requirements.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Onboarding redesign: categories first, before sign-up** — docs_decisions_d32, docs_decisions_d34, docs_decisions_d35, specs_phase_1_tasks_t9, docs_translations_ar_app_strings_onboarding_strings [EXTRACTED 1.00]
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Arabic translation pipeline (Egyptian Arabic, JS RTL, owner-supplied sheet)** — docs_decisions_d25, docs_decisions_d26, docs_decisions_d27, specs_phase_1_tasks_t21, docs_translations_ar_app_strings [INFERRED 0.85]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]
- **Phase 1 discovery screens (Home, Explore, Instructor, Workshop, Book) and their open-question decisions** — specs_phase_1_tasks_t10, specs_phase_1_tasks_t11, specs_phase_1_tasks_t12, specs_phase_1_tasks_t13, specs_phase_1_tasks_t14, docs_decisions_d36, docs_decisions_d37, docs_decisions_d38, docs_decisions_d39, docs_decisions_d40 [INFERRED 0.85]

## Communities (45 total, 1 thin omitted)

### Community 0 - "Auth, Family & Shared UI"
Cohesion: 0.05
Nodes (93): styles, styles, styles, styles, styles, styles, A11yFlag, off (+85 more)

### Community 1 - "Dev Gallery & Cards"
Cohesion: 0.05
Nodes (85): Welcome(), Family(), GalleryRoute(), GallerySheet(), Screen(), Explore(), styles, ORDER (+77 more)

### Community 2 - "Onboarding Screens & Draft"
Cohesion: 0.08
Nodes (52): Categories(), styles, Interests(), styles, Levels(), styles, AREA_ORDER, Pref (+44 more)

### Community 3 - "Instructor Profile"
Cohesion: 0.06
Nodes (41): Book(), KIDS_AGE, styles, InstructorProfile(), Section(), Section(), Workshop(), BookDraft (+33 more)

### Community 4 - "Working Agreement & Phase 1 Design"
Cohesion: 0.08
Nodes (39): Last-seat concurrency step (20 simultaneous bookings), Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, NavigationBar P17 (one glass capsule), Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops) (+31 more)

### Community 5 - "Settings & Family Sheets"
Cohesion: 0.08
Nodes (32): unstable_settings, FamilyMemberSheet(), Field(), FieldProps, styles, LANGS, LanguageSheet(), styles (+24 more)

### Community 6 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 7 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 8 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (25): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+17 more)

### Community 9 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.10
Nodes (23): Design canvas and design system artifacts, D1: One spec per phase in /specs/phase-N/ (requirements, design, tasks) with a single approval…, D10: Category icons: SF paintpalette, tennisball, book, bubble.left.and.bubble.right; Material …, D12: Maestro local-only in Phase 0; joins CI in Phase 1, D13: Bundle ID / package com.coachforall.app; display name changeable any time; ID frozen at fi…, D14: Expo SDK 57 now (supersedes D7's SDK 58); upgrade to SDK 58 as soon as App Store Expo Go s…, D15: Phase 0 spec approved, D16: On native Liquid Glass (iOS 26+) we add no CSS rim/shadow (the system draws its own); the … (+15 more)

### Community 10 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 11 - "Phone Sign-up & Verify"
Cohesion: 0.20
Nodes (20): SignUp(), submit(), styles, clock(), styles, Verify(), onChange(), resend() (+12 more)

### Community 12 - "Arabic Copy & Dev Machine"
Cohesion: 0.12
Nodes (22): Demo sign-in (Supabase test number), D25: (1) Arabic prices show without "From" (٣٩٠ ج.م); all future Arabic copy is Egyptian Arabic…, D26: Right-to-left is applied in JS (store-driven direction style on the app root, the tray's M…, D27: Gallery demo copy and seed content are bilingual: English handoff samples plus Claude's Eg…, D31: T8 Profile scope, Arabic strings: Appearance sheet, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels) (+14 more)

### Community 13 - "Discovery: Home & Explore Data"
Cohesion: 0.14
Nodes (21): FiltersSheet(), Group(), styles, TYPES, WHEN, Availability, DEFAULT_FILTERS, DISTANCES (+13 more)

### Community 14 - "Design Handoff Rules"
Cohesion: 0.14
Nodes (16): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Component specs (§5), Starting data model proposal, Motion specs (+8 more)

### Community 15 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 16 - "Project Guide & Design Sources"
Cohesion: 0.13
Nodes (8): CI Supabase job (db reset, lint, pgTAP), Coach For All (Cairo lesson-booking app), Coach For All app, npm run check (lint + typecheck + tests + token freshness), D3: iOS via EAS cloud dev builds on a physical iPhone; no local iOS simulator, D4: Hosted Supabase dev project; local Docker Supabase only in Linux CI, D9: iOS testing in Expo Go on iPhone 16 Pro (iOS 26.6.2); Android emulator also uses Expo Go. …, T22 Graphify `--update`, DECISIONS, phase report

### Community 17 - "Home Read Models"
Cohesion: 0.23
Nodes (12): Home(), styles, cairo(), cairoDaysUntil(), greetingPeriod(), MyBookingRow, mockBookings, mockRows (+4 more)

### Community 18 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.23
Nodes (16): D28: Phase 0 closed by the owner (components approved on iPhone); CI run and Supabase link carr…, D29: Phase 1 spec approved with owner answers: placeholders until images arrive; demo payment p…, D30: Hosted Supabase project rcbpasqkzmseisujmxgt linked; schema + seed pushed. Two seed bugs f…, Phase 1 tasks.md, G1 GitHub push, G2 Supabase keys, T1 Schema migration, T15 Review & pay + promo + Confirmed (+8 more)

### Community 19 - "Explore Rule Tests"
Cohesion: 0.14
Nodes (13): activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany, mockRows (+5 more)

### Community 20 - "Maestro & Phase 0 Design"
Cohesion: 0.15
Nodes (14): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R10 Knowledge map (graphify), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks (+6 more)

### Community 21 - "CI Supabase & Colour Lint"
Cohesion: 0.22
Nodes (13): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Assumption: Expo Go on iPhone, SDK 57, Dev-only component gallery (R9) (+5 more)

### Community 22 - "Settings Store & Appearance"
Cohesion: 0.23
Nodes (9): AppearanceSheet(), styles, THEMES, i18n, Settings, ThemePref, useSettings, openTray() (+1 more)

### Community 23 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 24 - "Root Layout & Query Client"
Cohesion: 0.21
Nodes (10): RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions(), expo-font (+2 more)

### Community 25 - "Phase 1 Design Notes"
Cohesion: 0.24
Nodes (9): Members' Circle credit membership, Open questions for product owner, Payment methods (Apple Pay, InstaPay, Vodafone Cash, Fawry, card, venue), Phase 0 technical design, Mac dev environment and toolchain, Paymob payment gateway proposal, Zustand settings store (theme, category, devForce), useA11y hook (+1 more)

### Community 26 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 27 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 28 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 29 - "Maestro & E2E Plans"
Cohesion: 0.25
Nodes (8): Maestro gallery E2E flow, Seed sample content (§14), Monorepo layout (apps/mobile, packages/tokens, supabase), Testing strategy (Jest+RNTL, Maestro, manual device), R1 Repo and toolchain, R9 Gallery screen, T12 Gallery shell, T22 Maestro flow (not run in Phase 0)

### Community 30 - "Category Tray"
Cohesion: 0.25
Nodes (4): CATEGORIES, Props, Radio(), styles

### Community 31 - "Discovery Decisions & Strings"
Cohesion: 0.33
Nodes (7): D36: T10 Home, D37: T11 Explore, Arabic strings: Category tray and its button, Arabic strings: Explore, Filters and Sort, Arabic strings: Home, T10 Home ×4 + tray, T11 Explore (canvas 7)

### Community 32 - "Dev Machine & Expo Go Limits"
Cohesion: 0.33
Nodes (3): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, D11: Approved deps: expo-glass-effect, expo-blur, expo-symbols, reanimated, worklets, gesture-h…

### Community 33 - "Glass Accessibility Fallbacks"
Cohesion: 0.40
Nodes (6): Gallery flow: Reduce Transparency / Increase Contrast screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 34 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 35 - "Explore Location & Results"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 36 - "Booking Decisions & Strings"
Cohesion: 0.47
Nodes (6): D39: T13 Workshop, D40: T14 Book, Arabic strings: Book, Arabic strings: Workshop, T13 Workshop (canvas 9), T14 Book screen

### Community 37 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 38 - "Manual Layout Tokens"
Cohesion: 0.33
Nodes (5): homeIndicator, icon, layout, motion, tray

### Community 39 - "Arabic & RTL Support"
Cohesion: 0.50
Nodes (5): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 40 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 41 - "Onboarding & Demo Sign-in Decisions"
Cohesion: 0.80
Nodes (5): D32: T9 onboarding, D34: Onboarding comes before sign-up: Welcome "Get started" → Interests → Levels → Who & where …, D35: Onboarding starts with a Categories page: Hobbies, Sports, Education and Languages as thei…, Arabic strings: Onboarding, T9 Categories (D35), Interests (canvas 6), Levels, Who & where

### Community 42 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 44 - "Arabic Strings Pipeline"
Cohesion: 1.00
Nodes (3): D38: T12 Instructor profile, Arabic strings: Instructor profile, T12 Instructor profile (canvas 8)

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to
- `T10 Home ×4 + tray` → `Arabic strings: Instructor and workshop cards`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `T12 Instructor profile (canvas 8)` → `Arabic strings: Buttons (mostly screen-reader labels)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `T14 Book screen` → `Arabic strings: Date strip`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `T14 Book screen` → `Arabic strings: Time slots`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to

## Knowledge Gaps
- **39 isolated node(s):** `supabase`, `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 356 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Auth, Family & Shared UI` to `Dev Gallery & Cards`, `Onboarding Screens & Draft`, `Instructor Profile`, `Settings & Family Sheets`, `Mobile Package Manifest`, `Phone Sign-up & Verify`, `Discovery: Home & Explore Data`, `Home Read Models`, `Settings Store & Appearance`, `Root Layout & Query Client`, `Category Tray`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `supabase`, `@cfa/tokens`, `expo` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth, Family & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.05159301130524152 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `Dev Gallery & Cards` be split into smaller, more focused modules?**
  _Cohesion score 0.05337781484570475 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `T10 Home ×4 + tray` and `Arabic strings: Instructor and workshop cards`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._