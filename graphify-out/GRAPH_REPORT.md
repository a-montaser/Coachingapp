# Graph Report - Coaching app  (2026-10-18)

## Corpus Check
- 15 files · ~73,948 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 939 nodes · 2869 edges · 46 communities (43 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 122 edges (avg confidence: 0.86)
- Token cost: 51,000 input · 13,405 output

## Community Hubs (Navigation)
- Auth, Family & Shared UI
- Onboarding Screens & Draft
- Discovery: Home & Explore Data
- Working Agreement & Phase 1 Design
- Buttons, Chips & Who & where
- Mobile Runtime Dependencies
- Token Generator Script
- Icons & Cards
- Mobile Package Manifest
- Sheets & Grouped Lists
- Settings & Family Sheets
- Dev Gallery & Cards
- Expo App Config
- Dev Gallery & Language Sheet
- Phone Sign-up & Verify
- Dates & Formatting
- Design Handoff Rules
- Text & Form Fields
- Decisions Log & Expo Docs Rule
- Phase 1 Tasks & Home Decisions
- Instructor Profile
- Project Guide & Design Sources
- Root Package & Scripts
- Arabic Copy & Dev Machine
- Dev Machine & Expo Go Limits
- Rules
- CI Supabase & Colour Lint
- Maestro & Phase 0 Design
- Time Slots
- Mobile TypeScript Config
- Arabic & RTL Support
- Discovery Decisions (D36–D39)
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Profile Data
- Handoff Screens & Flows
- Glass Accessibility Fallbacks
- Mobile Scripts
- Tab Layout
- Design Token Specs
- ESLint Config
- Onboarding & Demo Sign-in Decisions
- Jest Config
- Auth & Onboarding Layouts
- Stack Layouts

## God Nodes (most connected - your core abstractions)
1. `T()` - 82 edges
2. `useTheme()` - 68 edges
3. `react-native` - 67 edges
4. `useLang()` - 43 edges
5. `Icon()` - 43 edges
6. `DECISIONS.md (decisions log)` - 43 edges
7. `react-i18next` - 36 edges
8. `useSettings` - 34 edges
9. `react` - 32 edges
10. `Coach For All design handoff` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Risks carried into Phase 1` --semantically_similar_to--> `Dev machine constraints (macOS 12, 8 GB, no Docker/simulator)`  [INFERRED] [semantically similar]
  specs/phase-0/report.md → CLAUDE.md
- `Arabic strings: Date strip` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `Arabic strings: Time slots` --conceptually_related_to--> `T14 Book screen`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `TabBar Phase 0 custom vs Phase 1 NativeTabs` --conceptually_related_to--> `D25: Egyptian Arabic copy, dictation deferred, tab bar offset, Reduce Transparency button`  [INFERRED]
  specs/phase-0/design.md → docs/DECISIONS.md
- `T19 TabBar with minimise` --implements--> `Floating glass tab bar with minimise on scroll`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Onboarding flow (Categories, Interests, Levels, Who & where) before sign-up** — specs_phase_1_tasks_t9, docs_decisions_d32, docs_decisions_d34, docs_decisions_d35, docs_translations_ar_app_strings_onboarding_strings [EXTRACTED 1.00]
- **PaymentProvider implementations and Edge Functions** — specs_phase_1_design_payment_provider, specs_phase_1_design_demo_provider, specs_phase_1_design_paymob_provider, specs_phase_1_design_fake_provider, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_refund_function [EXTRACTED 1.00]
- **Phase 1 discovery screens and their open-point decisions** — specs_phase_1_tasks_t10, specs_phase_1_tasks_t11, specs_phase_1_tasks_t12, specs_phase_1_tasks_t13, docs_decisions_d36, docs_decisions_d37, docs_decisions_d38, docs_decisions_d39 [EXTRACTED 1.00]
- **Atomic booking and seat-hold flow** — specs_phase_1_design_book_function, specs_phase_1_design_slots_table, specs_phase_1_design_bookings_table, specs_phase_1_design_release_expired_holds, _github_workflows_ci_last_seat_concurrency_step, docs_working_agreement_atomic_booking_rule [INFERRED 0.85]
- **Expo Go-only device testing constraints** — docs_decisions_d9, docs_decisions_d14, docs_decisions_d22, docs_decisions_d26 [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Onboarding before sign-up journey** — docs_decisions_d34, docs_decisions_d35, specs_phase_1_design_journey_gate, specs_phase_1_design_onboarding_draft, specs_phase_1_design_use_apply_draft_after_sign_up, specs_phase_1_requirements_module_onboarding, specs_phase_1_tasks_t9 [INFERRED 0.85]

## Communities (46 total, 3 thin omitted)

### Community 0 - "Auth, Family & Shared UI"
Cohesion: 0.05
Nodes (71): RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), A11yFlag, Settings, ThemePref (+63 more)

### Community 1 - "Onboarding Screens & Draft"
Cohesion: 0.08
Nodes (45): Categories(), styles, Interests(), styles, Levels(), styles, WhoWhereScreen(), Level (+37 more)

### Community 2 - "Discovery: Home & Explore Data"
Cohesion: 0.07
Nodes (45): activeFilterCount(), Availability, byKey(), DEFAULT_FILTERS, DISTANCES, ExploreState, filterPeople(), Filters (+37 more)

### Community 3 - "Working Agreement & Phase 1 Design"
Cohesion: 0.08
Nodes (39): Last-seat concurrency step (20 simultaneous bookings), Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, NavigationBar P17 (one glass capsule), Phase 1 technical design, apply_promo() SQL function, approve_booking / decline_booking (ops) (+31 more)

### Community 4 - "Buttons, Chips & Who & where"
Cohesion: 0.12
Nodes (24): styles, Welcome(), GallerySheet(), styles, AREA_ORDER, Pref, PREFS, styles (+16 more)

### Community 5 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 7 - "Icons & Cards"
Cohesion: 0.15
Nodes (20): styles, Explore(), styles, Home(), styles, useOrigin(), cairoDaysUntil(), Card() (+12 more)

### Community 8 - "Mobile Package Manifest"
Cohesion: 0.07
Nodes (26): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+18 more)

### Community 9 - "Sheets & Grouped Lists"
Cohesion: 0.14
Nodes (21): AppearanceSheet(), styles, THEMES, FiltersSheet(), Group(), styles, TYPES, WHEN (+13 more)

### Community 10 - "Settings & Family Sheets"
Cohesion: 0.14
Nodes (21): Family(), FamilyMemberSheet(), Field(), FieldProps, styles, styles, CHILD_AGE, FamilyMember (+13 more)

### Community 11 - "Dev Gallery & Cards"
Cohesion: 0.15
Nodes (21): GalleryRoute(), FLAGS, Gallery(), Section(), SLOTS, styles, THEMES, WEEK (+13 more)

### Community 12 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 13 - "Dev Gallery & Language Sheet"
Cohesion: 0.12
Nodes (15): ar, en, galleryCopy, nour, photoWalk, text, wheelTaster, yasmine (+7 more)

### Community 14 - "Phone Sign-up & Verify"
Cohesion: 0.24
Nodes (18): SignUp(), submit(), styles, clock(), styles, Verify(), onChange(), resend() (+10 more)

### Community 15 - "Dates & Formatting"
Cohesion: 0.23
Nodes (19): when(), dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatFullDate(), formatMonth(), formatMonthYear() (+11 more)

### Community 16 - "Design Handoff Rules"
Cohesion: 0.13
Nodes (15): Coach For All design handoff, App navigation map, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Motion specs, Open questions for product owner (+7 more)

### Community 17 - "Text & Form Fields"
Cohesion: 0.15
Nodes (13): Messages(), styles, Props, styles, Props, styles, Props, styles (+5 more)

### Community 18 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.12
Nodes (3): Design canvas and design system artifacts, DECISIONS.md (decisions log), T22 Maestro flow (not run in Phase 0)

### Community 19 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.16
Nodes (16): Arabic strings: Messages tab, Phase 1 ordered tasks, G1 GitHub push, G2 Supabase keys, T1 Schema migration, T14 Book screen, T15 Review & pay + promo + Confirmed, T16 PaymentProvider + Edge Functions (+8 more)

### Community 20 - "Instructor Profile"
Cohesion: 0.15
Nodes (14): InstructorProfile(), Section(), bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+6 more)

### Community 21 - "Project Guide & Design Sources"
Cohesion: 0.11
Nodes (10): Coach For All (Cairo lesson-booking app), Coach For All app, Demo sign-in (Supabase test number), npm run check (lint + typecheck + tests + token freshness), Arabic strings: Buttons and messages, Arabic strings: Sign-in and sign out, Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values) (+2 more)

### Community 22 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 23 - "Arabic Copy & Dev Machine"
Cohesion: 0.21
Nodes (15): Arabic app strings to translate, Arabic strings: Appearance sheet, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Date strip, Arabic strings: Family & kids and its sheet, Arabic strings: Home, Arabic strings: Instructor and workshop cards (+7 more)

### Community 24 - "Dev Machine & Expo Go Limits"
Cohesion: 0.15
Nodes (4): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Theme, direction and accessibility plumbing (R5), Assumption: Expo Go on iPhone, SDK 57

### Community 25 - "Rules"
Cohesion: 0.22
Nodes (11): Section(), styles, Workshop(), clampSeats(), maxWorkshopSeats(), WORKSHOP_MAX_SEATS, mockData, mockParams (+3 more)

### Community 26 - "CI Supabase & Colour Lint"
Cohesion: 0.19
Nodes (15): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), CI Supabase job (db reset, lint, pgTAP), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9) (+7 more)

### Community 27 - "Maestro & Phase 0 Design"
Cohesion: 0.18
Nodes (15): Maestro gallery E2E flow, Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), setLanguage RTL switch (forceRTL + reload), Zustand settings store (theme, category, devForce) (+7 more)

### Community 28 - "Time Slots"
Cohesion: 0.21
Nodes (11): setLanguage(), sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState (+3 more)

### Community 29 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 30 - "Arabic & RTL Support"
Cohesion: 0.18
Nodes (12): Gallery flow: open tray and pick Sports, Category tray, Seed sample content (§14), CI design (checks + supabase jobs), Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), R9 Gallery screen, Phase 0 ordered tasks (+4 more)

### Community 31 - "Discovery Decisions (D36–D39)"
Cohesion: 0.27
Nodes (7): Arabic strings: Explore, Filters and Sort, Arabic strings: Instructor profile, Arabic strings: Workshop, T11 Explore (canvas 7), T12 Instructor profile (canvas 8), T13 Workshop (canvas 9), T17 Bookings list + Booking detail

### Community 32 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 33 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 34 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 35 - "Profile Data"
Cohesion: 0.36
Nodes (8): Profile(), styles, Interest, useArea(), useInterests(), useProfile(), useSession(), formatYear()

### Community 36 - "Handoff Screens & Flows"
Cohesion: 0.25
Nodes (7): Bottom action bar, Component specs (§5), Navigation bar glass capsule, Glass sheets, Floating glass tab bar with minimise on scroll, R7 Primitives P1-P21, T19 TabBar with minimise

### Community 37 - "Glass Accessibility Fallbacks"
Cohesion: 0.40
Nodes (6): Gallery flow: Reduce Transparency / Increase Contrast screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 38 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 39 - "Tab Layout"
Cohesion: 0.33
Nodes (5): ORDER, ROUTE, SF, TabsLayout(), TabKey

### Community 40 - "Design Token Specs"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 41 - "ESLint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 43 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to
- `T10 Home ×4 + tray` → `Arabic strings: Buttons (mostly screen-reader labels)`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `T14 Book screen` → `Arabic strings: Date strip`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to
- `T14 Book screen` → `Arabic strings: Time slots`  [AMBIGUOUS]
  docs/translations/ar-app-strings.md · relation: conceptually_related_to

## Knowledge Gaps
- **30 isolated node(s):** `supabase`, `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 347 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Text & Form Fields` to `Auth, Family & Shared UI`, `Onboarding Screens & Draft`, `Profile Data`, `Buttons, Chips & Who & where`, `Icons & Cards`, `Mobile Package Manifest`, `Sheets & Grouped Lists`, `Settings & Family Sheets`, `Tab Layout`, `Dev Gallery & Cards`, `Phone Sign-up & Verify`, `Dates & Formatting`, `Instructor Profile`, `Rules`, `Time Slots`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `supabase`, `@cfa/tokens`, `expo` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth, Family & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.050087361677344205 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `Onboarding Screens & Draft` be split into smaller, more focused modules?**
  _Cohesion score 0.07924984875983061 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `T10 Home ×4 + tray` and `Arabic strings: Buttons (mostly screen-reader labels)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._