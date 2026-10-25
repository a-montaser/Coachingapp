# Graph Report - Coaching app  (2026-10-25)

## Corpus Check
- 59 files · ~107,650 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1313 nodes · 4286 edges · 60 communities (56 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 161 edges (avg confidence: 0.84)
- Token cost: 66,000 input · 16,000 output

## Community Hubs (Navigation)
- Onboarding Screens
- Date Formatting & Time Slots
- Working Agreement & Phase 1 Design
- Phase 1 Design Notes
- Decisions Log & Expo Docs Rule
- Who Where · Navigationbar
- Review & Pay Checkout
- Project Guide & Design Sources
- Workshop Seats
- Gallery Screen & Theme
- Arabic Copy & Dev Machine
- Paymob
- Glass Controls & Search Field
- Tab Screens
- Checkout, Demo Pay & Reminders
- Handoff Component Specs
- Mobile Runtime Dependencies
- Token Generator Script
- Icon · Stepper
- Family Member Sheet & Rules
- Design Tokens Pipeline
- Phase 1 Tasks & Home Decisions
- Expo App Config
- Mobile Package Manifest
- Seed Data & Gallery Copy
- Explore Filters Sheet
- Index · Gallery
- Root Stack
- Selection Lens & Segmented Control
- Root Layout & Query Client
- Root Package & Scripts
- Handoff Chrome Specs
- CI Jobs
- Explore Tests
- Family Members
- Confirmed & Checkout Tests
- Mobile TypeScript Config
- Design Handoff · Tasks
- Text, Chips & Phone Inputs
- Reminders
- Home Data & Time Rules
- Seed Instructors & When Labels
- Mobile Dev Dependencies
- T · Section
- Accessibility Flags
- Tokens Package Manifest
- Base TypeScript Config
- Category Tray
- Language & i18n Keys
- Sort Sheet
- Generated
- Manual
- Mobile Scripts
- Explore Filter Rules
- Eslint Config · Package
- Jest Config
- Sign-up & Verify
-  Layout
-  Layout 2
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 98 edges
2. `useTheme()` - 81 edges
3. `T()` - 79 edges
4. `Decisions log` - 62 edges
5. `react-i18next` - 48 edges
6. `useLang()` - 45 edges
7. `react` - 45 edges
8. `Button()` - 41 edges
9. `useSettings` - 39 edges
10. `Arabic app strings translation table` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `CI supabase job (db reset, lint, pgTAP)` --references--> `T1: Schema migration`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `R11.1 More colour, clearer hierarchy, distinct controls` --conceptually_related_to--> `Brand commitments`  [INFERRED]
  specs/phase-1/requirements.md → apps/mobile/PRODUCT.md
- `Resolved owner answers (17 Oct)` --references--> `D26: RTL applied in JS, not I18nManager`  [EXTRACTED]
  specs/phase-1/requirements.md → docs/DECISIONS.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go on iPhone 16 Pro`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **MonthCalendar used on Book, Group page, Reschedule and Bookings** — docs_decisions_monthcalendar, docs_decisions_book_screen, docs_decisions_group_page, docs_decisions_reschedule_screen, docs_decisions_bookingcard, docs_decisions_d56, docs_decisions_d57 [EXTRACTED 1.00]
- **Owner revision R11: D54 split into tasks T23-T27** — docs_decisions_d54, specs_phase_1_tasks_r11, specs_phase_1_tasks_t23, specs_phase_1_tasks_t24, specs_phase_1_tasks_t25, specs_phase_1_tasks_t26, specs_phase_1_tasks_t27 [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Purple-and-gold look (T23)** — docs_decisions_d55, specs_phase_1_tasks_t23, apps_mobile__impeccable_surfaces_src_app_tabs_index_tsx_purple_and_gold_world, docs_design_handoff_band_tokens, docs_design_handoff_shadow_card, docs_design_handoff_shadow_primary, docs_decisions_home_band [INFERRED 0.85]

## Communities (60 total, 4 thin omitted)

### Community 0 - "Onboarding Screens"
Cohesion: 0.05
Nodes (54): SignUp(), styles, Preferences(), Interest, Level, useArea(), authErrorKey(), e164() (+46 more)

### Community 1 - "Date Formatting & Time Slots"
Cohesion: 0.10
Nodes (44): styles, styles, InstructorProfile(), styles, styles, styles, styles, styles (+36 more)

### Community 2 - "Working Agreement & Phase 1 Design"
Cohesion: 0.08
Nodes (54): Operating context: categories, journey, rules, Demo sign-in, npm run check gate, Navigation bar (glass capsule), Phase 1 technical design, App shape and routes, apply_promo() SQL function, approve_booking() / decline_booking() (+46 more)

### Community 3 - "Phase 1 Design Notes"
Cohesion: 0.06
Nodes (50): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass (+42 more)

### Community 4 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (21): Evidence on hand, CLAUDE.md (project instructions), After every task routine, Coach For All app, Design canvas (Coach For All · Hobbies), cfa design system artifact, Phase-branch git workflow, Testing aids to revert (D43) (+13 more)

### Community 5 - "Onboarding Steps & Navigation Bar"
Cohesion: 0.12
Nodes (34): GallerySheet(), styles, Categories(), styles, Interests(), styles, styles, AREA_ORDER (+26 more)

### Community 6 - "Review & Pay Checkout"
Cohesion: 0.11
Nodes (37): BookingDetail(), BookingsFilter(), KINDS, styles, TIMES, Bookings(), styles, Tab (+29 more)

### Community 7 - "Project Guide & Design Sources"
Cohesion: 0.10
Nodes (32): Book screen, BookingCard (Bookings card), Bookings Filter sheet, Explore Filters sheet, Group page, MonthCalendar, Segmented control, 7.8 Book (1:1, group, kids) (+24 more)

### Community 8 - "Workshop Seats"
Cohesion: 0.11
Nodes (31): Book(), Reschedule(), styles, Workshop(), days, mockData, mockFamily, mockParams (+23 more)

### Community 9 - "Gallery Screen & Theme"
Cohesion: 0.10
Nodes (25): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, Props, styles (+17 more)

### Community 10 - "Arabic Copy & Dev Machine"
Cohesion: 0.06
Nodes (35): cancel_booking() / cancelOutcome, Reschedule screen, Arabic app strings translation table, AR strings: Appearance sheet, AR strings: Booking detail, AR strings: Booking errors, AR strings: Buttons and messages, AR strings: Buttons (mostly screen-reader labels) (+27 more)

### Community 11 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 12 - "Glass Controls & Search Field"
Cohesion: 0.11
Nodes (21): styles, isSameCairoDay(), Day, DayPicker(), Props, styles, IconButton(), Props (+13 more)

### Community 13 - "Tab Screens"
Cohesion: 0.12
Nodes (21): KIDS_AGE, styles, styles, styles, styles, useFamily(), Scheme, Props (+13 more)

### Community 14 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.10
Nodes (29): CancelSheet(), REASONS, styles, DemoCheckout(), RemindSheet(), styles, Review(), cancelOutcome() (+21 more)

### Community 15 - "Handoff Component Specs"
Cohesion: 0.09
Nodes (24): Gallery flow: Arabic/RTL screenshots, Coach For All design handoff, 12. Accessibility, 6.1 App map, Four categories (Hobbies, Sports, Education, Languages), 6.3 Category icons, 11. Content style, 10. Data model (+16 more)

### Community 16 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 17 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 18 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.11
Nodes (20): ConfirmationRing(), styles, DashedCard(), styles, styles, FilterButton(), styles, GroupedRow (+12 more)

### Community 19 - "Family Member Sheet & Rules"
Cohesion: 0.08
Nodes (23): FamilyMemberSheet(), LANGS, LanguageSheet(), styles, SignOutSheet(), Profile(), signOut(), CHILD_AGE (+15 more)

### Community 20 - "Design Tokens Pipeline"
Cohesion: 0.12
Nodes (19): Home surface brief (app-wide look, T23), Home aubergine band, band / band-label / band-control tokens, brand / brand-text / brand-tint tokens, Button, 3.1 Colour, 3. Design tokens, glass-* tokens (+11 more)

### Community 21 - "Phase 1 Tasks & Home Decisions"
Cohesion: 0.11
Nodes (16): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Brand commitments, Capabilities and constraints, Platform: iPhone-first, adaptive, Positioning (+8 more)

### Community 22 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 23 - "Mobile Package Manifest"
Cohesion: 0.08
Nodes (23): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+15 more)

### Community 24 - "Seed Data & Gallery Copy"
Cohesion: 0.15
Nodes (14): AppearanceSheet(), styles, THEMES, A11yFlag, Settings, ThemePref, useSettings, off (+6 more)

### Community 25 - "Explore Filters Sheet"
Cohesion: 0.15
Nodes (19): styles, TYPES, WHEN, Availability, DEFAULT_FILTERS, DISTANCES, ExploreState, PersonResult (+11 more)

### Community 26 - "Screens Using Shared Data"
Cohesion: 0.20
Nodes (19): FiltersSheet(), GalleryRoute(), Levels(), Explore(), Home(), styles, useProfile(), useMyCategoryBookings() (+11 more)

### Community 27 - "Root Stack"
Cohesion: 0.16
Nodes (17): ORDER, ROUTE, TabsLayout(), Messages(), useReminderSync(), Props, restoreTabBar(), styles (+9 more)

### Community 28 - "Selection Lens & Segmented Control"
Cohesion: 0.14
Nodes (14): GlassLens(), Lens, styles, useGlassLens(), Props, SegmentedControl(), styles, Props (+6 more)

### Community 29 - "Root Layout & Query Client"
Cohesion: 0.16
Nodes (13): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions() (+5 more)

### Community 30 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 31 - "Handoff Chrome Specs"
Cohesion: 0.18
Nodes (12): BottomActionBar, GlassLens / useGlassLens, NativeTabs (Apple native tab bar), TabBar (floating prototype tab bar), Bottom action bar, Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule) (+4 more)

### Community 32 - "CI Jobs"
Cohesion: 0.18
Nodes (11): CI edge-functions job (Deno check + deno test of payment providers, R7 AC), reminderAt / useReminderSync, Review & pay, Confirmation ring, Payment methods (card, pay at the venue), 7.9 Review & pay, Paymob payment gateway proposal, Resolved owner answers (17 Oct) (+3 more)

### Community 33 - "Explore Tests"
Cohesion: 0.14
Nodes (13): activeFilterCount(), Filters, OfferingPrice, at(), base, card(), dina, hany (+5 more)

### Community 34 - "Family Members"
Cohesion: 0.20
Nodes (10): styles, Welcome(), Family(), styles, Banner(), styles, Button(), ButtonVariant (+2 more)

### Community 35 - "Confirmed & Checkout Tests"
Cohesion: 0.16
Nodes (13): Confirmed(), booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace, mockPromo (+5 more)

### Community 36 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 37 - "Booking Rules & Database Tests"
Cohesion: 0.18
Nodes (11): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), CI-only database tests, Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle (+3 more)

### Community 38 - "Text, Chips & Phone Inputs"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 39 - "Reminders"
Cohesion: 0.22
Nodes (7): MyBooking, ReminderChoice, REMINDED, syncReminders(), N, currentLang(), expo-notifications

### Community 40 - "Home Data & Time Rules"
Cohesion: 0.27
Nodes (8): cairo(), cairoDaysUntil(), greetingPeriod(), GroupSessionRow, MyBookingRow, mockBookings, mockRows, Category

### Community 41 - "Seed Instructors & When Labels"
Cohesion: 0.27
Nodes (9): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, Instructor (+1 more)

### Community 42 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 43 - "Text Component"
Cohesion: 0.24
Nodes (7): Props, styles, arabic, fitLines(), Props, TypeVariant, Weight

### Community 44 - "Accessibility Flags"
Cohesion: 0.31
Nodes (6): Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props, flat()

### Community 45 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 46 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 47 - "Category Tray"
Cohesion: 0.31
Nodes (6): CATEGORIES, CategoryTray(), Props, Radio(), styles, openTray()

### Community 48 - "Language & i18n Keys"
Cohesion: 0.32
Nodes (4): i18n, keys(), missingArabicKeys(), Tree

### Community 49 - "Sort Sheet"
Cohesion: 0.38
Nodes (6): SORTS, SortSheet(), styles, SortKey, useExplore, SheetHeader()

### Community 50 - "Generated Tokens (Space, Radius, Type)"
Cohesion: 0.29
Nodes (6): blur, radius, shadow, space, touch, type

### Community 51 - "Hand-set Tokens (Components, Motion)"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 52 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 53 - "Explore Filter Rules"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 54 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 55 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **61 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Decisions log` connect `Decisions Log & Expo Docs Rule` to `CI Jobs`, `Working Agreement & Phase 1 Design`, `Phase 1 Design Notes`, `Design Handoff · Tasks`, `Project Guide & Design Sources`, `Arabic Copy & Dev Machine`, `Handoff Component Specs`, `Design Tokens Pipeline`, `Phase 1 Tasks & Home Decisions`, `Handoff Chrome Specs`?**
  _High betweenness centrality (0.321) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.050078247261345854 - nodes in this community are weakly interconnected._
- **Why does `D39: T13 Workshop choices` connect `Project Guide & Design Sources` to `Workshop Seats`, `Decisions Log & Expo Docs Rule`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Should `Date Formatting & Time Slots` be split into smaller, more focused modules?**
  _Cohesion score 0.10163339382940109 - nodes in this community are weakly interconnected._
- **Why does `D53: T19 Local reminders` connect `CI Jobs` to `Workshop Seats`, `Decisions Log & Expo Docs Rule`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._