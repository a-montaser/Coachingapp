# Graph Report - Coaching app  (2026-11-03)

## Corpus Check
- 15 files · ~109,125 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1330 nodes · 4293 edges · 60 communities (56 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 148 edges (avg confidence: 0.84)
- Token cost: 30,000 input · 12,000 output

## Community Hubs (Navigation)
- Date Formatting & Time Slots
- Phase 1 Design Notes
- Glass Controls & Search Field
- Project Guide & Design Sources
- Decisions Log & Expo Docs Rule
- Onboarding Steps & Navigation Bar
- Review & Pay Checkout
- Arabic Copy & Dev Machine
- Gallery Screen & Theme
- Workshop Seats
- Paymob
- Design Tokens Pipeline
- Checkout, Demo Pay & Reminders
- Handoff Component Specs
- Mobile Runtime Dependencies
- Token Generator Script
- Booking Rules & Database Tests
- Seed Data & Gallery Copy
- Small UI Pieces (Icons, Rows, Filter Button)
- Working Agreement & Phase 1 Design
- Selection Lens & Segmented Control
- Bookingcard · Card
- Requirements · Decisions
- Handoff Chrome Specs
- Expo App Config
- Explore Filters Sheet
- Onboarding Screens
- Auth · Onboarding
- Explore Tests
- Mobile Package Manifest
- Family Member Sheet & Rules
- Home Data & Time Rules
- Root Package & Scripts
- Instructor · Instructor Test
- Root Layout & Query Client
- Generated Tokens (Space, Radius, Type)
- Root Stack
- Mobile TypeScript Config
- Confirmed & Checkout Tests
- Format · I18N Test
- Text, Chips & Phone Inputs
- Language · Appearance
- Account · Gallerycopy
- Seed Instructors & When Labels
- Category Tray
- Mobile Dev Dependencies
- Reminders
- Tokens Package Manifest
- Base TypeScript Config
- RTL & Sheet Options
- Hand-set Tokens (Components, Motion)
- Mobile Scripts
- Usea11Y · Settings
- Lint Config
- Jest Config
- Sign-up & Verify
- Screens Using Shared Data
-  Layout
-  Layout 2
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 99 edges
2. `useTheme()` - 82 edges
3. `T()` - 80 edges
4. `Decisions log` - 63 edges
5. `react-i18next` - 48 edges
6. `useLang()` - 45 edges
7. `react` - 45 edges
8. `Button()` - 40 edges
9. `Arabic app strings translation table` - 40 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `T19 TabBar with minimise` --implements--> `Tab bar (floating glass capsule)`  [INFERRED]
  specs/phase-0/tasks.md → docs/DESIGN_HANDOFF.md
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go on iPhone 16 Pro`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `Accessibility & inclusion` --references--> `D26: RTL applied in JS, not I18nManager`  [INFERRED]
  apps/mobile/PRODUCT.md → docs/DECISIONS.md
- `Capabilities and constraints` --references--> `D9: iOS testing in Expo Go on iPhone 16 Pro`  [INFERRED]
  apps/mobile/PRODUCT.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Departures board on Home (D58)** — docs_decisions_d58, docs_decisions_departures_board, docs_design_handoff_board_tokens, docs_translations_ar_app_strings_home_board_strings, specs_phase_1_requirements_r11_5, docs_decisions_home_band [EXTRACTED 1.00]
- **MonthCalendar used on Book, Group page, Reschedule and Bookings** — docs_decisions_monthcalendar, docs_decisions_book_screen, docs_decisions_group_page, docs_decisions_reschedule_screen, docs_decisions_bookingcard, docs_decisions_d56, docs_decisions_d57 [EXTRACTED 1.00]
- **Owner revision R11: D54 split into tasks T23-T27** — docs_decisions_d54, specs_phase_1_tasks_r11, specs_phase_1_tasks_t23, specs_phase_1_tasks_t24, specs_phase_1_tasks_t25, specs_phase_1_tasks_t26, specs_phase_1_tasks_t27 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]

## Communities (60 total, 4 thin omitted)

### Community 0 - "Date Formatting & Time Slots"
Cohesion: 0.11
Nodes (41): styles, Family(), styles, InstructorProfile(), styles, styles, styles, styles (+33 more)

### Community 1 - "Phase 1 Design Notes"
Cohesion: 0.06
Nodes (51): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Gallery flow: Arabic/RTL screenshots, 6.2 Category tray, 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, 7.15 Arabic / RTL (+43 more)

### Community 2 - "Glass Controls & Search Field"
Cohesion: 0.08
Nodes (34): styles, styles, KIDS_AGE, styles, styles, formatEgMobile(), Props, styles (+26 more)

### Community 3 - "Project Guide & Design Sources"
Cohesion: 0.07
Nodes (40): Book screen, BookingCard (Bookings card), Bookings Filter sheet, Explore Filters sheet, Group page, MonthCalendar, Review & pay, Segmented control (+32 more)

### Community 4 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.05
Nodes (19): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Platform: iPhone-first, adaptive, CLAUDE.md (project instructions), After every task routine, CI-only database tests, Coach For All app, Design canvas (Coach For All · Hobbies) (+11 more)

### Community 5 - "Onboarding Steps & Navigation Bar"
Cohesion: 0.09
Nodes (36): styles, Welcome(), GallerySheet(), styles, styles, Interests(), styles, styles (+28 more)

### Community 6 - "Review & Pay Checkout"
Cohesion: 0.09
Nodes (41): BookingDetail(), BookingsFilter(), KINDS, styles, TIMES, Confirmed(), Bookings(), styles (+33 more)

### Community 7 - "Arabic Copy & Dev Machine"
Cohesion: 0.06
Nodes (40): PRODUCT.md (product record), Accessibility & inclusion, Brand commitments, Capabilities and constraints, Positioning, Product principles, Product purpose: directory and booking, Users: Cairo adults booking lessons (+32 more)

### Community 8 - "Gallery Screen & Theme"
Cohesion: 0.09
Nodes (30): styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, Scheme (+22 more)

### Community 9 - "Workshop Seats"
Cohesion: 0.10
Nodes (32): Book(), Reschedule(), Workshop(), BookDraft, BookOffering, days, mockData, mockFamily (+24 more)

### Community 10 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 11 - "Design Tokens Pipeline"
Cohesion: 0.10
Nodes (26): Home surface brief (app-wide look, T23), Starting soon near you departures board, Home aubergine band, band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, Button, 3.1 Colour (+18 more)

### Community 12 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.10
Nodes (29): CancelSheet(), REASONS, styles, DemoCheckout(), RemindSheet(), styles, Review(), cancelOutcome() (+21 more)

### Community 13 - "Handoff Component Specs"
Cohesion: 0.08
Nodes (29): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), Four categories (Hobbies, Sports, Education, Languages), 6.3 Category icons, Confirmation ring, 11. Content style (+21 more)

### Community 14 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 15 - "Token Generator Script"
Cohesion: 0.10
Nodes (21): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+13 more)

### Community 16 - "Booking Rules & Database Tests"
Cohesion: 0.10
Nodes (26): Last seat goes to exactly one of 20 simultaneous bookings, CI supabase job (db reset, lint, pgTAP), cancel_booking() / cancelOutcome, Reschedule screen, Atomic slot and seat holds, Booking reference CFA-#####, 7.11 Bookings, 9. Business rules (+18 more)

### Community 17 - "Seed Data & Gallery Copy"
Cohesion: 0.12
Nodes (14): styles, THEMES, i18n, keys(), missingArabicKeys(), Tree, Settings, ThemePref (+6 more)

### Community 18 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.11
Nodes (20): styles, ConfirmationRing(), styles, GroupedRow, styles, styles, directional, IconName (+12 more)

### Community 19 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (27): Phase 1 technical design, App shape and routes, apply_promo() SQL function, book() SQL function, Booking ref CFA-#####, Boundaries, cancel_booking() SQL function, Component library (+19 more)

### Community 20 - "Selection Lens & Segmented Control"
Cohesion: 0.15
Nodes (19): Glass(), GlassGroup(), liquidAvailable(), Props, GlassLens(), Lens, styles, useGlassLens() (+11 more)

### Community 21 - "Cards & Booking Card"
Cohesion: 0.15
Nodes (18): BookingCard(), Props, styles, Card(), Props, styles, FilterButton(), styles (+10 more)

### Community 22 - "Phase 1 Requirements & Decisions"
Cohesion: 0.10
Nodes (19): CI workflow (ci.yml), CI checks job (lint, typecheck, tests, token freshness), CI edge-functions job (Deno check + deno test of payment providers, R7 AC), Operating context: categories, journey, rules, Demo sign-in, reminderAt / useReminderSync, Design tokens package (packages/tokens, R4), Auth (Supabase phone OTP) (+11 more)

### Community 23 - "Handoff Chrome Specs"
Cohesion: 0.12
Nodes (17): Evidence on hand, Testing aids to revert (D43), BottomActionBar, GlassGroup, GlassLens / useGlassLens, NativeTabs (Apple native tab bar), TabBar (floating prototype tab bar), testImages.ts testing aid (+9 more)

### Community 24 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 25 - "Explore Filters Sheet"
Cohesion: 0.14
Nodes (23): styles, TYPES, WHEN, Availability, byKey(), DEFAULT_FILTERS, DISTANCES, ExploreState (+15 more)

### Community 26 - "Onboarding Screens"
Cohesion: 0.13
Nodes (18): SignUp(), FiltersSheet(), Categories(), Levels(), Preferences(), Area, disciplineName(), saveInterests() (+10 more)

### Community 27 - "Sign-in & Onboarding Data"
Cohesion: 0.13
Nodes (19): WhoWhereScreen(), Level, authErrorKey(), e164(), isValidEgMobile(), Profile, sendCode(), mockSend (+11 more)

### Community 28 - "Explore Tests"
Cohesion: 0.11
Nodes (19): SORTS, SortSheet(), styles, Explore(), activeFilterCount(), Filters, OfferingPrice, SortKey (+11 more)

### Community 29 - "Mobile Package Manifest"
Cohesion: 0.10
Nodes (19): main, name, private, version, @cfa/tokens, expo, expo-constants, expo-localization (+11 more)

### Community 30 - "Family Member Sheet & Rules"
Cohesion: 0.16
Nodes (16): FamilyMemberSheet(), styles, Profile(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking (+8 more)

### Community 31 - "Home Data & Time Rules"
Cohesion: 0.21
Nodes (16): Home(), cairo(), cairoDaysUntil(), Departure, distanceKm(), greetingPeriod(), GroupSessionRow, InstructorCardRow (+8 more)

### Community 32 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 33 - "Instructor Profile Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 34 - "Root Layout & Query Client"
Cohesion: 0.18
Nodes (13): AppToast(), RootLayout(), RootNavigator(), styles, useProfile(), useApplyDraftAfterSignUp(), queryClient, useApplyThemeOverride() (+5 more)

### Community 35 - "Generated Tokens (Space, Radius, Type)"
Cohesion: 0.15
Nodes (12): off, resolveScheme(), GlassMode, flat(), blur, dark, light, radius (+4 more)

### Community 36 - "Root Stack"
Cohesion: 0.19
Nodes (11): ORDER, ROUTE, TabsLayout(), Messages(), useReminderSync(), restoreTabBar(), TabKey, useMinimiseOnScroll() (+3 more)

### Community 37 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 38 - "Confirmed & Checkout Tests"
Cohesion: 0.20
Nodes (11): booking(), inDays(), mockCheckout, mockDemoPay, mockParams, mockPlace, mockPromo, mockReview (+3 more)

### Community 39 - "Formatting & i18n Tests"
Cohesion: 0.32
Nodes (10): dateFormat(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth(), formatMonthYear(), formatTime(), formatYear() (+2 more)

### Community 40 - "Text, Chips & Phone Inputs"
Cohesion: 0.26
Nodes (10): sat, slots, groupSlots(), PartOfDay, Props, Slot, SlotState, styles (+2 more)

### Community 41 - "Language & Appearance Sheets"
Cohesion: 0.25
Nodes (10): AppearanceSheet(), LANGS, LanguageSheet(), styles, SignOutSheet(), signOut(), setLanguage(), Lang (+2 more)

### Community 42 - "Account Data & Gallery Copy"
Cohesion: 0.25
Nodes (7): styles, Interest, useArea(), useInterests(), ar, en, galleryCopy

### Community 43 - "Seed Instructors & When Labels"
Cohesion: 0.27
Nodes (9): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, Instructor (+1 more)

### Community 44 - "Category Tray"
Cohesion: 0.25
Nodes (8): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray(), react-native-worklets

### Community 45 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 46 - "Reminders"
Cohesion: 0.22
Nodes (6): MyBooking, ReminderChoice, REMINDED, N, currentLang(), expo-notifications

### Community 47 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 48 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 49 - "RTL & Sheet Options"
Cohesion: 0.38
Nodes (3): useIsRTL(), useSheetOptions(), expo-glass-effect

### Community 50 - "Hand-set Tokens (Components, Motion)"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 51 - "Mobile Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 52 - "Accessibility & Settings"
Cohesion: 0.47
Nodes (5): A11yFlag, A11y, isContrast(), mergeA11y(), useA11y()

### Community 53 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 54 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 56 - "Screens Using Shared Data"
Cohesion: 0.67
Nodes (3): GalleryRoute(), Gallery(), DeparturesBoard()

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **68 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-localization`, `jest` (+63 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 487 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Decisions log` connect `Decisions Log & Expo Docs Rule` to `Phase 1 Design Notes`, `Project Guide & Design Sources`, `Arabic Copy & Dev Machine`, `Design Tokens Pipeline`, `Handoff Component Specs`, `Booking Rules & Database Tests`, `Requirements · Decisions`, `Handoff Chrome Specs`?**
  _High betweenness centrality (0.298) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _68 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Date Formatting & Time Slots` be split into smaller, more focused modules?**
  _Cohesion score 0.10774410774410774 - nodes in this community are weakly interconnected._
- **Why does `D53: T19 Local reminders` connect `Requirements · Decisions` to `Workshop Seats`, `Decisions Log & Expo Docs Rule`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Should `Phase 1 Design Notes` be split into smaller, more focused modules?**
  _Cohesion score 0.06033182503770739 - nodes in this community are weakly interconnected._
- **Why does `D39: T13 Workshop choices` connect `Project Guide & Design Sources` to `Workshop Seats`, `Decisions Log & Expo Docs Rule`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._