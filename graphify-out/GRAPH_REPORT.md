# Graph Report - Coaching app  (2026-10-25)

## Corpus Check
- 1 files · ~100,767 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1208 nodes · 3977 edges · 61 communities (58 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 140 edges (avg confidence: 0.84)
- Token cost: 6,000 input · 2,500 output

## Community Hubs (Navigation)
- Onboarding Screens
- Explore Filters Sheet
- Tab Screens
- Arabic Copy & Dev Machine
- Text, Chips & Phone Inputs
- Token Generator Script
- Family Members
- Review & Pay Checkout
- Paymob
- Seed Data & Gallery Copy
- Explore & Test Images
- Working Agreement & Phase 1 Design
- Format · Timeslots
- Decisions Log & Expo Docs Rule
- Checkout, Demo Pay & Reminders
- Mobile Runtime Dependencies
- Workshop Seats
- Expo App Config
- Mobile Package Manifest
- Handoff Component Specs
- Family Member Sheet
- Buttons, Welcome & Demo Checkout
- Root Stack
- Project Guide & Design Sources
- Glass · Button
- Root Package & Scripts
- Search Field & Generated Tokens
- Phase 1 Tasks & Home Decisions
- Sign-up & Verify
- Instructor & Booking Data
- CI Jobs
- Seed · Gallerycopy
- Selection Lens & Segmented Control
- Task Plan & Handoff
- App Shape, Auth & Journey Gate
- Confirmed & Checkout Tests
- Reminders
- Mobile TypeScript Config
- Toast · Chrome Test
- Phase 1 Design Notes
- Mobile Dev Dependencies
- Categorytray · Categorytray Test
- Decisions · Design
- Tokens Package Manifest
- CI Supabase & Colour Lint
- Base TypeScript Config
- Usea11Y · Theme Test
- Category Tray Spec
- Working Agreement
- Category Tray
- CI Design & Tokens Package
- Mobile Scripts
- Design Tokens Pipeline
- Design Handoff · Design
- ESLint Config
- Handoff in Design
- Jest Config
- Tab Layout & Messages
-  Layout
- Design Handoff · Requirements
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 95 edges
2. `useTheme()` - 81 edges
3. `T()` - 79 edges
4. `Decisions log (D1–D53)` - 58 edges
5. `react-i18next` - 45 edges
6. `react` - 44 edges
7. `useLang()` - 42 edges
8. `useSettings` - 38 edges
9. `expo-router` - 37 edges
10. `Coach For All design handoff` - 33 edges

## Surprising Connections (you probably didn't know these)
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `Arabic strings: Onboarding` --references--> `T9: Onboarding (Categories, Interests, Levels, Who & where)`  [INFERRED]
  docs/translations/ar-app-strings.md → specs/phase-1/tasks.md
- `D51: T18 Cancel and Reschedule` --references--> `R8 manage`  [INFERRED]
  docs/DECISIONS.md → specs/phase-1/requirements.md
- `D53: T19 Local reminders` --references--> `R9 reminders`  [INFERRED]
  docs/DECISIONS.md → specs/phase-1/requirements.md
- `Accessibility & inclusion` --references--> `D26: RTL applied in JS`  [INFERRED]
  apps/mobile/PRODUCT.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Booking & payment pipeline** — specs_phase_1_tasks_t14, specs_phase_1_tasks_t15, specs_phase_1_tasks_t16, docs_decisions_d40, docs_decisions_d45, docs_decisions_d46 [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Testing aids to revert before Phase 1 report** — docs_decisions_d43, docs_decisions_d44, specs_phase_1_tasks_t22 [INFERRED 0.85]

## Communities (61 total, 3 thin omitted)

### Community 0 - "Onboarding Screens"
Cohesion: 0.06
Nodes (60): GalleryRoute(), AppToast(), RootLayout(), RootNavigator(), styles, Categories(), styles, Interests() (+52 more)

### Community 1 - "Explore Filters Sheet"
Cohesion: 0.06
Nodes (57): FiltersSheet(), styles, TYPES, WHEN, SORTS, SortSheet(), styles, Home() (+49 more)

### Community 2 - "Tab Screens"
Cohesion: 0.09
Nodes (31): DashedCard(), styles, styles, GroupedRow, styles, styles, directional, Icon() (+23 more)

### Community 3 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (34): Arabic app strings translation sheet, Arabic strings: Appearance sheet, Arabic strings: Book, Arabic strings: Buttons and messages, Arabic strings: Buttons (mostly screen-reader labels), Arabic strings: Category tray and its button, Arabic strings: Confirmed, Arabic strings: Date strip (+26 more)

### Community 4 - "Text, Chips & Phone Inputs"
Cohesion: 0.09
Nodes (29): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, BookingCard(), Props (+21 more)

### Community 5 - "Token Generator Script"
Cohesion: 0.08
Nodes (27): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+19 more)

### Community 6 - "Family Members"
Cohesion: 0.13
Nodes (25): styles, styles, styles, styles, styles, resolveScheme(), Scheme, useTheme() (+17 more)

### Community 7 - "Review & Pay Checkout"
Cohesion: 0.12
Nodes (30): BookingDetail(), BookingsFilter(), styles, Bookings(), styles, BookDraft, BookOffering, firstName() (+22 more)

### Community 8 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 9 - "Seed Data & Gallery Copy"
Cohesion: 0.11
Nodes (19): AppearanceSheet(), styles, THEMES, i18n, keys(), missingArabicKeys(), Tree, Lang (+11 more)

### Community 10 - "Explore & Test Images"
Cohesion: 0.12
Nodes (25): styles, styles, styles, Explore(), styles, styles, byCategory, byDiscipline (+17 more)

### Community 11 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (33): npm run check gate, Phase 1 technical design, apply_promo() SQL function, approve_booking() / decline_booking(), book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+25 more)

### Community 12 - "Date Formatting & Time Slots"
Cohesion: 0.12
Nodes (27): KIDS_AGE, styles, styles, dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatFullDate() (+19 more)

### Community 13 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.07
Nodes (6): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Decisions log (D1–D53)

### Community 14 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.09
Nodes (29): CancelSheet(), DemoCheckout(), RemindSheet(), styles, Reschedule(), Review(), useBookOptions(), cancelOutcome() (+21 more)

### Community 15 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 16 - "Workshop Seats"
Cohesion: 0.11
Nodes (23): Book(), Workshop(), days, mockData, mockFamily, mockParams, now, useBookDraft (+15 more)

### Community 17 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 18 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 19 - "Handoff Component Specs"
Cohesion: 0.12
Nodes (18): Brand commitments, Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Component specs (§5), Starting data model proposal, Motion specs (+10 more)

### Community 20 - "Family Member Sheet"
Cohesion: 0.13
Nodes (20): Family(), FamilyMemberSheet(), styles, LANGS, LanguageSheet(), styles, CHILD_AGE, FamilyMember (+12 more)

### Community 21 - "Buttons, Welcome & Demo Checkout"
Cohesion: 0.16
Nodes (17): InstructorProfile(), styles, styles, testHero(), formatDistance(), formatNumber(), formatPrice(), Card() (+9 more)

### Community 22 - "Root Stack"
Cohesion: 0.16
Nodes (16): ORDER, ROUTE, Messages(), Profile(), Props, restoreTabBar(), styles, TabBar() (+8 more)

### Community 23 - "Project Guide & Design Sources"
Cohesion: 0.15
Nodes (16): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CLAUDE.md (project instructions), After every task routine, CI-only database tests, Phase-branch git workflow, Testing aids to revert (D43), Phase 1 ordered tasks (+8 more)

### Community 24 - "Glass & Buttons"
Cohesion: 0.18
Nodes (12): Welcome(), Button(), ButtonVariant, Props, styles, Glass(), GlassGroup(), GlassMode (+4 more)

### Community 25 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 26 - "Search Field & Generated Tokens"
Cohesion: 0.18
Nodes (12): REASONS, styles, styles, GallerySheet(), styles, galleryCopy, useLang(), Banner() (+4 more)

### Community 27 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.15
Nodes (14): PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Evidence on hand, Platform: iPhone-first, adaptive, Positioning, Product principles, Product purpose: directory and booking (+6 more)

### Community 28 - "Sign-up & Verify"
Cohesion: 0.20
Nodes (13): SignUp(), submit(), styles, clock(), Verify(), authErrorKey(), formatEgMobile(), isValidEgMobile() (+5 more)

### Community 29 - "Instructor & Booking Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 30 - "CI Jobs"
Cohesion: 0.21
Nodes (10): Arabic strings: Bookings, Arabic strings: Cancel sheet, Arabic strings: Demo payment, Arabic strings: Reminder notification, Arabic strings: Reschedule, Resolved owner answers (17 Oct), T16: PaymentProvider + Edge Functions, T17: Bookings list + Booking detail (+2 more)

### Community 31 - "Seed Instructors & When Labels"
Cohesion: 0.17
Nodes (12): ar, en, nour, photoWalk, seedFor(), text, wheelTaster, when() (+4 more)

### Community 32 - "Selection Lens & Segmented Control"
Cohesion: 0.21
Nodes (10): GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles, react-native-gesture-handler (+2 more)

### Community 33 - "Task Plan & Handoff"
Cohesion: 0.17
Nodes (11): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format, T22 Maestro flow (not run in Phase 0) (+3 more)

### Community 34 - "App Shape, Auth & Journey Gate"
Cohesion: 0.32
Nodes (10): Operating context: categories, journey, rules, Demo sign-in, App shape and routes, Auth (Supabase phone OTP), Journey gate, Onboarding draft (useOnboardingDraft), Phase 1 requirements: MVP hobbies-first booking loop, R2 auth (+2 more)

### Community 35 - "Confirmed & Checkout Tests"
Cohesion: 0.18
Nodes (12): Confirmed(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace, mockPromo (+4 more)

### Community 36 - "Reminders"
Cohesion: 0.19
Nodes (9): TabsLayout(), MyBooking, ReminderChoice, REMINDED, syncReminders(), N, useReminderSync(), currentLang() (+1 more)

### Community 37 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 38 - "Toast & Sheet Options"
Cohesion: 0.23
Nodes (7): useIsRTL(), useSheetOptions(), Props, styles, Toast(), expo-glass-effect, zustand

### Community 39 - "Phase 1 Design Notes"
Cohesion: 0.29
Nodes (10): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce), Testing strategy (Jest+RNTL, Maestro, manual device), useA11y hook (+2 more)

### Community 40 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 41 - "Category Tray Picker"
Cohesion: 0.29
Nodes (7): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray()

### Community 42 - "Nav Bar & Selection Lens Spec"
Cohesion: 0.47
Nodes (5): Component library, NavigationBar, Selection lens (ui/GlassLens), R3 shell, R3.7 Navigation bar on pushed screens

### Community 43 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 44 - "CI Supabase & Colour Lint"
Cohesion: 0.29
Nodes (10): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+2 more)

### Community 45 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 46 - "Accessibility Flags"
Cohesion: 0.36
Nodes (6): A11yFlag, off, A11y, isContrast(), mergeA11y(), useA11y()

### Community 47 - "Category Tray Spec"
Cohesion: 0.33
Nodes (6): Gallery flow: open tray and pick Sports, Four categories: Hobbies, Sports, Education, Languages, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 48 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 49 - "Category Tray"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 50 - "CI Design & Tokens Package"
Cohesion: 0.33
Nodes (6): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), CI design (checks + supabase jobs), Design tokens package (packages/tokens, R4), T7 CI workflow

### Community 51 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 52 - "Design Tokens Pipeline"
Cohesion: 0.53
Nodes (6): Colour tokens (§3.1), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 53 - "Payments & Open Questions"
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

### Community 59 - "Gallery & Seed Content Spec"
Cohesion: 0.67
Nodes (3): Seed sample content (§14), R9 Gallery screen, T12 Gallery shell

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **22 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 425 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Family Members` to `Onboarding Screens`, `Explore Filters Sheet`, `Tab Screens`, `Text, Chips & Phone Inputs`, `Review & Pay Checkout`, `Seed Data & Gallery Copy`, `Explore & Test Images`, `Format · Timeslots`, `Checkout, Demo Pay & Reminders`, `Mobile Package Manifest`, `Family Member Sheet`, `Buttons, Welcome & Demo Checkout`, `Root Stack`, `Glass · Button`, `Search Field & Generated Tokens`, `Sign-up & Verify`, `Instructor & Booking Data`, `Seed · Gallerycopy`, `Selection Lens & Segmented Control`, `Toast · Chrome Test`, `Categorytray · Categorytray Test`, `Usea11Y · Theme Test`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.06342342342342343 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (D1–D53)` connect `Decisions Log & Expo Docs Rule` to `Task Plan & Handoff`, `App Shape, Auth & Journey Gate`, `Arabic Copy & Dev Machine`, `Decisions · Design`, `Working Agreement & Phase 1 Design`, `Working Agreement`, `Handoff Component Specs`, `Project Guide & Design Sources`, `Phase 1 Tasks & Home Decisions`, `CI Jobs`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `Explore Filters Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.05687645687645688 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._