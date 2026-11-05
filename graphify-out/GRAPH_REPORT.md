# Graph Report - Coaching app  (2026-11-05)

## Corpus Check
- 21 files · ~113,819 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1363 nodes · 4314 edges · 69 communities (67 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 163 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Explore Filters Sheet
- Glass Controls & Search Field
- Review & Pay Checkout
- Cards & Booking Card
- Arabic Copy & Dev Machine
- Workshop Seats
- Token Generator Script
- Date Formatting & Time Slots
- T · Daypicker
- Paymob
- Design Tokens Pipeline
- Decisions Log & Expo Docs Rule
- Seed Data & Gallery Copy
- Mobile Runtime Dependencies
- Onboarding Steps & Navigation Bar
- Checkout, Demo Pay & Reminders
- Gallery Screen & Theme
- Working Agreement & Phase 1 Design
- Onboarding Screens
- Expo App Config
- Phase 1 Requirements & Decisions
- Project Guide & Design Sources
- Mobile Package Manifest
- Small UI Pieces (Icons, Rows, Filter Button)
- Handoff Chrome Specs
- Instructor Profile Data
- Product · Agents
- Family Member Sheet & Rules
- Root Stack
- Root Package & Scripts
- Root Layout & Query Client
- Handoff Component Specs
- Language & Appearance Sheets
- Confirmed & Checkout Tests
- Phase 1 Design Notes
- Tasks · Design
- Sign-in & Onboarding Data
- Reminders
- Selection Lens & Segmented Control
- Selection Lens & Segmented Control 2
- Account Data & Gallery Copy
- Verify · Otpboxes
- Ci · Claude
- Booking Rules & Database Tests
- Decisions · Ar App Strings
- Mobile TypeScript Config
- Payments & Open Questions
- Requirements · Report
- Decisions · Ar App Strings 2
- Text, Chips & Phone Inputs
- Handoff Chrome Specs 2
- Mobile Dev Dependencies
- Hand-set Tokens (Components, Motion)
- Navigationbar · Usea11Y
- Tokens Package Manifest
- Base TypeScript Config
- Category Tray
- Design Handoff
- Gallerycopy · Gallery Sheet
- Payments & Open Questions 2
- Payments & Open Questions 2 3
- Requirements · Design Handoff
- Sign Out · Queryclient
- Working Agreement
- Mobile Scripts
- Lint Config
- Jest Config
- Ci
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 99 edges
2. `useTheme()` - 82 edges
3. `T()` - 79 edges
4. `Decisions log (DECISIONS.md)` - 65 edges
5. `react-i18next` - 48 edges
6. `react` - 45 edges
7. `useLang()` - 44 edges
8. `Button()` - 40 edges
9. `useSettings` - 39 edges
10. `Arabic app strings to translate` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Departures board (signature)` --semantically_similar_to--> `Departures board (Starting soon near you)`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `Home band` --semantically_similar_to--> `Home aubergine band`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `edge-functions job (Deno check and tests)` --implements--> `T16: PaymentProvider + Edge Functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `Maestro gallery E2E flow` --implements--> `R9 Gallery screen`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/requirements.md
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Fewest taps booking flow** — docs_decisions_d59, apps_mobile_e2e_phase1_book_group_seats, apps_mobile_e2e_phase1_book_one_to_one, specs_phase_1_tasks_t26 [INFERRED 0.75]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (69 total, 2 thin omitted)

### Community 0 - "Explore Filters Sheet"
Cohesion: 0.06
Nodes (54): styles, TYPES, WHEN, SORTS, SortSheet(), styles, activeFilterCount(), Availability (+46 more)

### Community 1 - "Glass Controls & Search Field"
Cohesion: 0.08
Nodes (33): styles, formatEgMobile(), resolveScheme(), Scheme, useTheme(), Props, styles, Props (+25 more)

### Community 2 - "Review & Pay Checkout"
Cohesion: 0.11
Nodes (39): BookingDetail(), styles, BookingsFilter(), KINDS, styles, TIMES, Bookings(), styles (+31 more)

### Community 3 - "Cards & Booking Card"
Cohesion: 0.10
Nodes (30): Explore(), styles, nour, photoWalk, seedFor(), text, wheelTaster, when() (+22 more)

### Community 4 - "Arabic Copy & Dev Machine"
Cohesion: 0.08
Nodes (34): 5. Book soonest 1:1 oud time, 7. Both in Bookings, 2. Sign up and verify, land on Home, Arabic app strings to translate, Appearance sheet strings (3), Booking detail strings (13), Buttons and messages strings (5), Date strip strings (5) (+26 more)

### Community 5 - "Workshop Seats"
Cohesion: 0.11
Nodes (31): Book(), KIDS_AGE, styles, Reschedule(), styles, Workshop(), days, mockData (+23 more)

### Community 6 - "Token Generator Script"
Cohesion: 0.08
Nodes (27): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+19 more)

### Community 7 - "Date Formatting & Time Slots"
Cohesion: 0.13
Nodes (28): styles, styles, styles, dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatDistance() (+20 more)

### Community 8 - "Date Tiles, Banners & Day Picker"
Cohesion: 0.10
Nodes (26): styles, styles, isSameCairoDay(), Banner(), styles, DashedCard(), styles, DateTile() (+18 more)

### Community 9 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 10 - "Design Tokens Pipeline"
Cohesion: 0.10
Nodes (27): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+19 more)

### Community 11 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.08
Nodes (8): Brand commitments, CLAUDE.md (project instructions), After every task routine, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Decisions log (DECISIONS.md), Buttons (mostly screen-reader labels) strings (6)

### Community 12 - "Seed Data & Gallery Copy"
Cohesion: 0.11
Nodes (17): mockSave, i18n, keys(), missingArabicKeys(), Tree, A11yFlag, Lang, Settings (+9 more)

### Community 13 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 14 - "Onboarding Steps & Navigation Bar"
Cohesion: 0.17
Nodes (23): SignUp(), Welcome(), Family(), FiltersSheet(), styles, Interests(), styles, Levels() (+15 more)

### Community 15 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.11
Nodes (26): CancelSheet(), REASONS, styles, RemindSheet(), styles, Review(), cancelOutcome(), applyPromo() (+18 more)

### Community 16 - "Gallery Screen & Theme"
Cohesion: 0.11
Nodes (23): Home(), styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK (+15 more)

### Community 17 - "Working Agreement & Phase 1 Design"
Cohesion: 0.12
Nodes (28): Cancel sheet strings (15), Phase 1 technical design, App shape and routes, apply_promo() SQL function, book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function (+20 more)

### Community 18 - "Onboarding Screens"
Cohesion: 0.11
Nodes (22): AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), useSession(), Area (+14 more)

### Community 19 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 20 - "Phase 1 Requirements & Decisions"
Cohesion: 0.10
Nodes (20): 1. Onboarding: Categories, Interests, Levels, Who & where, Operating context: categories, journey, rules, Demo sign-in, useReminderSync, Interests and levels strings (3), Onboarding levels strings (1), Onboarding strings (36), Remind me sheet strings (6) (+12 more)

### Community 21 - "Project Guide & Design Sources"
Cohesion: 0.11
Nodes (20): Booking card, Bookings Filter sheet, Explore Filters sheet, MonthCalendar, Bookings strings (41), Explore, Filters and Sort strings (43), Instructor and workshop cards strings (6), Month calendar strings (4) (+12 more)

### Community 22 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (22): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+14 more)

### Community 23 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.13
Nodes (17): InstructorProfile(), styles, testHero(), Props, styles, GroupedRow, styles, Hero() (+9 more)

### Community 24 - "Handoff Chrome Specs"
Cohesion: 0.15
Nodes (14): The Glass Is Apple's Rule, Navigation (native tabs, glass), Evidence on hand, Testing aids to revert (D43), GlassGroup (GlassEffectContainer), GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar (+6 more)

### Community 25 - "Instructor Profile Data"
Cohesion: 0.13
Nodes (15): BookDraft, BookOffering, bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams (+7 more)

### Community 26 - "Product Record & Agent Guides"
Cohesion: 0.12
Nodes (14): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Platform: iPhone-first, adaptive, Positioning, Product principles (+6 more)

### Community 27 - "Family Member Sheet & Rules"
Cohesion: 0.16
Nodes (16): FamilyMemberSheet(), styles, Profile(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking (+8 more)

### Community 28 - "Root Stack"
Cohesion: 0.18
Nodes (15): ORDER, ROUTE, Messages(), Props, restoreTabBar(), styles, TabBar(), TabIcon() (+7 more)

### Community 29 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 30 - "Root Layout & Query Client"
Cohesion: 0.18
Nodes (13): AppToast(), RootLayout(), RootNavigator(), styles, useIsRTL(), useSheetOptions(), Props, styles (+5 more)

### Community 31 - "Handoff Component Specs"
Cohesion: 0.14
Nodes (17): Coach For All design handoff, 12. Accessibility, 6.1 App map, Four categories (Hobbies, Sports, Education, Languages), 6.3 Category icons, 11. Content style, 10. Data model, Hobbies-first (+9 more)

### Community 32 - "Language & Appearance Sheets"
Cohesion: 0.20
Nodes (13): AppearanceSheet(), styles, THEMES, LANGS, LanguageSheet(), styles, Categories(), setLanguage() (+5 more)

### Community 33 - "Confirmed & Checkout Tests"
Cohesion: 0.15
Nodes (15): DemoCheckout(), styles, useBookDraft, demoPay(), booking(), inDays(), mockCheckout, mockDemoPay (+7 more)

### Community 34 - "Phase 1 Design Notes"
Cohesion: 0.20
Nodes (15): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Phase 0 technical design, Mac dev environment and toolchain, Glass decision table (GlassView / BlurView / frosted), Monorepo layout (apps/mobile, packages/tokens, supabase) (+7 more)

### Community 35 - "Phase 0 Arabic, CI & Theme Plumbing"
Cohesion: 0.14
Nodes (14): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format (+6 more)

### Community 36 - "Sign-in & Onboarding Data"
Cohesion: 0.21
Nodes (12): styles, authErrorKey(), e164(), isValidEgMobile(), Profile, sendCode(), mockSend, mockVerify (+4 more)

### Community 37 - "Reminders"
Cohesion: 0.16
Nodes (11): Confirmed(), TabsLayout(), MyBooking, ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N (+3 more)

### Community 38 - "Selection Lens & Segmented Control"
Cohesion: 0.21
Nodes (9): ButtonVariant, Props, styles, Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props (+1 more)

### Community 39 - "Selection Lens & Segmented Control 2"
Cohesion: 0.22
Nodes (10): GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles, react-native-gesture-handler (+2 more)

### Community 40 - "Account Data & Gallery Copy"
Cohesion: 0.18
Nodes (8): unstable_settings, unstable_settings, styles, Interest, Level, useArea(), useInterests(), expo-router

### Community 41 - "Code Entry Screen"
Cohesion: 0.19
Nodes (9): clock(), styles, Verify(), OtpBoxes(), Props, styles, Props, styles (+1 more)

### Community 42 - "CI Jobs & Checks"
Cohesion: 0.17
Nodes (12): CI workflow, checks job (lint, typecheck, tests, tokens), edge-functions job (Deno check and tests), Last seat goes to one of 20 bookings step, supabase job (db reset, lint, pgTAP), CI-only database tests, npm run check gate, Phase-branch git workflow (+4 more)

### Community 43 - "Booking Rules & Database Tests"
Cohesion: 0.22
Nodes (11): e2e job (Maestro on Android emulator), Phase 1 Maestro journey (R10.1), 8. Cancel with refund, 9. Cancel without refund (within 24 h), 3. Category tray, Reschedule screen, Category tray and its button strings (8), Reschedule strings (8) (+3 more)

### Community 44 - "Review, Pay & Confirmed"
Cohesion: 0.19
Nodes (9): 6. Pay by card with fake provider, Review & pay, Booking errors strings (4), Confirmed strings (19), Demo payment strings (5), Review & pay strings (39), R11.11 Price only on Review & pay, T15: Review & pay + promo + Confirmed (+1 more)

### Community 45 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 46 - "Payments & Open Questions"
Cohesion: 0.23
Nodes (13): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+5 more)

### Community 47 - "Phase 0 Report & Requirements"
Cohesion: 0.21
Nodes (12): Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule) (+4 more)

### Community 48 - "Book & Group Page Journey"
Cohesion: 0.24
Nodes (9): 4. Book two workshop seats, Book screen, group_level_labels data migration, Group page, refresh_demo_slots.sql demo times script, Book strings (23), Group page strings (6), R11.10 Group page (+1 more)

### Community 49 - "Text, Chips & Phone Inputs"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 50 - "Handoff Chrome Specs 2"
Cohesion: 0.20
Nodes (11): Atomic slot and seat holds, Booking reference CFA-#####, 7.11 Bookings, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen (+3 more)

### Community 51 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 52 - "Hand-set Tokens (Components, Motion)"
Cohesion: 0.20
Nodes (8): GalleryRoute(), Gallery(), component, homeIndicator, icon, layout, motion, tray

### Community 53 - "Accessibility Flags & Nav Bar"
Cohesion: 0.24
Nodes (7): isContrast(), useA11y(), styles, NavAction, Props, styles, react

### Community 54 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 55 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 56 - "Category Tray"
Cohesion: 0.31
Nodes (6): CATEGORIES, CategoryTray(), Props, Radio(), styles, openTray()

### Community 57 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 58 - "Gallery Sheet & Copy"
Cohesion: 0.29
Nodes (6): GallerySheet(), styles, ar, en, galleryCopy, IconButton()

### Community 59 - "Payments & Open Questions 2"
Cohesion: 0.32
Nodes (8): 7.8 Book (1:1, group, kids), Confirmation ring, 7.4 Home (per category), Payment methods (card, pay at the venue), 7.9 Review & pay, 7. Screens, Paymob payment gateway proposal, R6 booking

### Community 60 - "Payments & Open Questions 2 3"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 61 - "Category Tray & Explore Specs"
Cohesion: 0.33
Nodes (7): Gallery flow: open tray and pick Sports, 6.2 Category tray, 7.5 Explore, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), R5 discovery, R5.3 Explore

### Community 62 - "Sign Out & Query Client"
Cohesion: 0.38
Nodes (5): SignOutSheet(), styles, signOut(), queryClient, @tanstack/react-query

### Community 63 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 64 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 65 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 66 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **53 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 481 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _53 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Explore Filters Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.06345848757271286 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `T · Daypicker` to `Explore Filters Sheet`, `Glass Controls & Search Field`, `Review & Pay Checkout`, `Cards & Booking Card`, `Workshop Seats`, `Date Formatting & Time Slots`, `Seed Data & Gallery Copy`, `Onboarding Steps & Navigation Bar`, `Checkout, Demo Pay & Reminders`, `Gallery Screen & Theme`, `Onboarding Screens`, `Mobile Package Manifest`, `Small UI Pieces (Icons, Rows, Filter Button)`, `Instructor Profile Data`, `Family Member Sheet & Rules`, `Root Stack`, `Root Layout & Query Client`, `Language & Appearance Sheets`, `Confirmed & Checkout Tests`, `Sign-in & Onboarding Data`, `Selection Lens & Segmented Control`, `Selection Lens & Segmented Control 2`, `Account Data & Gallery Copy`, `Verify · Otpboxes`, `Text, Chips & Phone Inputs`, `Navigationbar · Usea11Y`, `Category Tray`, `Gallerycopy · Gallery Sheet`, `Sign Out · Queryclient`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `Glass Controls & Search Field` be split into smaller, more focused modules?**
  _Cohesion score 0.07918367346938776 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Tasks · Design`, `Arabic Copy & Dev Machine`, `Ci · Claude`, `Booking Rules & Database Tests`, `Decisions · Ar App Strings`, `Design Tokens Pipeline`, `Decisions · Ar App Strings 2`, `Phase 1 Requirements & Decisions`, `Project Guide & Design Sources`, `Handoff Chrome Specs`, `Product · Agents`, `Working Agreement`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._