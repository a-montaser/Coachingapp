# Graph Report - Coaching app  (2026-11-05)

## Corpus Check
- 26 files · ~120,668 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1394 nodes · 4403 edges · 67 communities (61 shown, 6 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.83)
- Token cost: 52,000 input · 9,000 output

## Community Hubs (Navigation)
- Onboarding Screens
- Explore Filters Sheet
- Gallery Screen & Theme
- Small UI Pieces (Icons, Rows, Filter Button)
- Cards & Booking Card
- Decisions Log & Expo Docs Rule
- CI Jobs & Checks
- Icon Buttons & Navigation Bar
- Root Stack
- Token Generator Script
- Paymob
- Date Formatting & Time Slots
- Phase 1 Design Notes
- Mobile Runtime Dependencies
- Review & Pay Checkout
- Working Agreement & Phase 1 Design
- Workshop Seats
- Project Guide & Design Sources
- Text, Chips & Phone Inputs
- Handoff Component Specs
- Expo App Config
- Arabic Copy & Dev Machine
- Handoff Chrome Specs
- Seed Data & Gallery Copy
- Booking Rules & Database Tests
- Nav Bar & Selection Lens Spec
- Checkout, Demo Pay & Reminders
- Design Tokens Pipeline
- Mobile Package Manifest
- Date Tiles, Banners & Day Picker
- Root Package & Scripts
- App Entry & Package
- Instructor Profile Data
- Ar App Strings · Tasks
- Bookings · Bookings Filter
- Payments & Open Questions
- Phase 0 Report & Requirements
- Book & Group Page Journey
- Review, Pay & Confirmed
- Design Handoff
- Category Tray
- Root Layout & Query Client
- Mobile TypeScript Config
- Workshop Test · Book
- Confirmed & Checkout Tests
- Package
- Test Images & Gallery
- Reminders
- Dates Test · Overmedia Test
- Tokens Package Manifest
- Base TypeScript Config
- Cancel & Reschedule
- Handoff Chrome Specs 2
- Working Agreement
- Hand-set Tokens (Components, Motion)
- Package 2
- Family Member Sheet & Rules
- Lint Config
- Payments & Open Questions 2 3 4
- Package 2 3
- Code Entry Screen
- Design Handoff 2
- Account Data & Gallery Copy
- Gallery · Gallery
-  Layout
- Ci
- Deno

## God Nodes (most connected - your core abstractions)
1. `react-native` - 99 edges
2. `useTheme()` - 82 edges
3. `T()` - 79 edges
4. `Decisions log (DECISIONS.md)` - 69 edges
5. `react-i18next` - 48 edges
6. `react` - 46 edges
7. `useLang()` - 44 edges
8. `Arabic app strings to translate` - 43 edges
9. `Button()` - 39 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Departures board (signature)` --semantically_similar_to--> `Departures board (Starting soon near you)`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `Home band` --semantically_similar_to--> `Home aubergine band`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `edge-functions job (Deno check and tests)` --implements--> `T16: PaymentProvider + Edge Functions`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-1/tasks.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md
- `The Class First Rule` --references--> `D54: Owner revision of Phase 1 (R11, T23-T27)`  [INFERRED]
  apps/mobile/DESIGN.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **App credit refund flow (D64)** — docs_decisions_d64, specs_phase_1_design_credits_table, specs_phase_1_design_credit_spends_table, specs_phase_1_design_cancel_booking, specs_phase_1_design_book, docs_decisions_use_credit_switch, docs_decisions_profile_credit_row, docs_decisions_cancel_sheet_credit_wording [EXTRACTED 1.00]
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Fewest taps booking flow** — docs_decisions_d59, apps_mobile_e2e_phase1_book_group_seats, apps_mobile_e2e_phase1_book_one_to_one, specs_phase_1_tasks_t26 [INFERRED 0.75]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Bugs found by e2e and fixed** — docs_decisions_d61, docs_decisions_d62, apps_mobile_e2e_phase1, docs_decisions_post_payment_refresh, docs_decisions_android_tab_bar_restore, docs_decisions_venue_panel_fallback [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (67 total, 6 thin omitted)

### Community 0 - "Onboarding Screens"
Cohesion: 0.05
Nodes (71): SignUp(), Welcome(), FamilyMemberSheet(), styles, FiltersSheet(), Categories(), styles, Interests() (+63 more)

### Community 1 - "Explore Filters Sheet"
Cohesion: 0.06
Nodes (59): styles, TYPES, WHEN, SORTS, SortSheet(), styles, Explore(), Home() (+51 more)

### Community 2 - "Gallery Screen & Theme"
Cohesion: 0.10
Nodes (40): styles, styles, styles, styles, styles, styles, styles, Messages() (+32 more)

### Community 3 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.07
Nodes (39): styles, useTheme(), ConfirmationRing(), styles, DashedCard(), styles, DisciplineTile(), styles (+31 more)

### Community 4 - "Cards & Booking Card"
Cohesion: 0.07
Nodes (37): DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, ar, en (+29 more)

### Community 5 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.06
Nodes (13): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Brand commitments, CLAUDE.md (project instructions), After every task routine, CI-only database tests, Coach For All app, Design canvas (Coach For All · Hobbies) (+5 more)

### Community 6 - "CI Jobs & Checks"
Cohesion: 0.08
Nodes (32): CI workflow, Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), edge-functions job (Deno check and tests), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step, Last seat goes to one of 20 bookings step (+24 more)

### Community 7 - "Icon Buttons & Navigation Bar"
Cohesion: 0.11
Nodes (24): styles, styles, Scheme, ButtonVariant, Props, styles, Props, styles (+16 more)

### Community 8 - "Root Stack"
Cohesion: 0.10
Nodes (25): ORDER, ROUTE, Glass(), GlassGroup(), GlassMode, liquidAvailable(), Props, GlassLens() (+17 more)

### Community 9 - "Token Generator Script"
Cohesion: 0.08
Nodes (27): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+19 more)

### Community 10 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 11 - "Date Formatting & Time Slots"
Cohesion: 0.14
Nodes (23): dateFormat(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth(), formatMonthYear(), formatNumber(), formatPrice() (+15 more)

### Community 12 - "Phase 1 Design Notes"
Cohesion: 0.09
Nodes (29): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, Gallery flow: Arabic/RTL screenshots, 6.2 Category tray, 7.15 Arabic / RTL, Phase 0 technical design, CI design (checks + supabase jobs) (+21 more)

### Community 13 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 14 - "Review & Pay Checkout"
Cohesion: 0.14
Nodes (27): BookingDetail(), styles, Confirmed(), Bookings(), styles, Tab, TABS, firstName() (+19 more)

### Community 15 - "Working Agreement & Phase 1 Design"
Cohesion: 0.11
Nodes (29): MonthCalendar, Month calendar strings (4), Phase 1 technical design, App shape and routes, apply_promo() SQL function, book() SQL function, Booking ref CFA-#####, Boundaries (+21 more)

### Community 16 - "Workshop Seats"
Cohesion: 0.11
Nodes (25): Book(), Reschedule(), days, mockData, mockFamily, mockParams, now, useBookOptions() (+17 more)

### Community 17 - "Project Guide & Design Sources"
Cohesion: 0.09
Nodes (23): Home surface brief (app-wide look, T23), Booking card, Bookings Filter sheet, Departures board (Starting soon near you), Explore Filters sheet, Refresh bookings, seats and board after settled payment, Review & pay, Bookings strings (41) (+15 more)

### Community 18 - "Text, Chips & Phone Inputs"
Cohesion: 0.15
Nodes (20): KIDS_AGE, styles, Family(), styles, GallerySheet(), styles, formatTime(), useLang() (+12 more)

### Community 19 - "Handoff Component Specs"
Cohesion: 0.11
Nodes (25): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+17 more)

### Community 20 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 21 - "Arabic Copy & Dev Machine"
Cohesion: 0.12
Nodes (21): 1. Onboarding: Categories, Interests, Levels, Who & where, 2. Sign up and verify, land on Home, Arabic app strings to translate, Appearance sheet strings (3), Buttons and messages strings (5), Family & kids and its sheet strings (19), Instructor and workshop cards strings (6), Interests and levels strings (3) (+13 more)

### Community 22 - "Handoff Chrome Specs"
Cohesion: 0.10
Nodes (22): PRODUCT.md (product record), Accessibility & inclusion, Capabilities and constraints, Operating context: categories, journey, rules, Platform: iPhone-first, adaptive, Positioning, Product principles, Product purpose: directory and booking (+14 more)

### Community 23 - "Seed Data & Gallery Copy"
Cohesion: 0.13
Nodes (16): AppearanceSheet(), styles, THEMES, N, A11yFlag, Settings, ThemePref, useSettings (+8 more)

### Community 24 - "Booking Rules & Database Tests"
Cohesion: 0.17
Nodes (20): Phase 1 Maestro journey (R10.1), cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, grant_credit() ops function, Profile app credit row (+12 more)

### Community 25 - "Nav Bar & Selection Lens Spec"
Cohesion: 0.15
Nodes (13): The Glass Is Apple's Rule, Navigation (native tabs, glass), Evidence on hand, Testing aids to revert (D43), GlassGroup (GlassEffectContainer), GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar (+5 more)

### Community 26 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.13
Nodes (20): DemoCheckout(), RemindSheet(), styles, Review(), useBookDraft, applyPromo(), Booking, DEFAULT_REMINDER (+12 more)

### Community 27 - "Design Tokens Pipeline"
Cohesion: 0.16
Nodes (18): Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature), Creative North Star: The evening class board (+10 more)

### Community 28 - "Mobile Package Manifest"
Cohesion: 0.10
Nodes (20): main, name, private, version, @cfa/tokens, expo, expo-constants, expo-font (+12 more)

### Community 29 - "Date Tiles, Banners & Day Picker"
Cohesion: 0.15
Nodes (13): styles, formatEgMobile(), PhoneField(), Props, styles, arabic, fitLines(), Props (+5 more)

### Community 30 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 31 - "App Entry & Package"
Cohesion: 0.16
Nodes (12): LANGS, LanguageSheet(), styles, SignOutSheet(), signOut(), i18n, keys(), missingArabicKeys() (+4 more)

### Community 32 - "Instructor Profile Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 33 - "E2E Journey & Arabic Strings"
Cohesion: 0.18
Nodes (12): 5. Book soonest 1:1 oud time, 3. Category tray, Category tray and its button strings (8), Date strip strings (5), Explore strings (7), Instructor profile strings (26), Workshop strings (16), T10: Home x4 + tray (+4 more)

### Community 34 - "Bookings Filter & Types"
Cohesion: 0.18
Nodes (14): BookingsFilter(), KINDS, styles, TIMES, ACTIVE, BookingKind, BookingTime, DEFAULT_BOOKINGS_FILTER (+6 more)

### Community 35 - "Payments & Open Questions"
Cohesion: 0.18
Nodes (16): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+8 more)

### Community 36 - "Phase 0 Report & Requirements"
Cohesion: 0.17
Nodes (14): checks job (lint, typecheck, tests, tokens), Phase 0 report, Phase 0 [OPEN] items (Arabic copy, final copy, provisional values), Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Design tokens package (packages/tokens, R4), Dev-only component gallery (R9) (+6 more)

### Community 37 - "Book & Group Page Journey"
Cohesion: 0.18
Nodes (12): 4. Book two workshop seats, Book screen, group_level_labels data migration, Group page, refresh_demo_slots.sql demo times script, Reschedule screen, Book strings (22), Group page strings (6) (+4 more)

### Community 38 - "Review, Pay & Confirmed"
Cohesion: 0.16
Nodes (11): 6. Pay by card with fake provider, useReminderSync, Booking errors strings (4), Confirmed strings (19), Demo payment strings (5), Remind me sheet strings (6), Reminder notification strings (1), R9 reminders (+3 more)

### Community 39 - "Design Handoff"
Cohesion: 0.16
Nodes (15): Bottom action bar, Button, Chip, 5. Components, Date tile, Day picker, Instructor card, Navigation bar (glass capsule) (+7 more)

### Community 40 - "Category Tray"
Cohesion: 0.21
Nodes (9): CATEGORIES, CategoryButton(), CategoryTray(), Props, Radio(), styles, openTray(), @react-native-async-storage/async-storage (+1 more)

### Community 41 - "Root Layout & Query Client"
Cohesion: 0.23
Nodes (10): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useIsRTL(), useApplyThemeOverride(), useSheetOptions() (+2 more)

### Community 42 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 43 - "Group Page Seats & Book Draft"
Cohesion: 0.18
Nodes (8): Workshop(), BookDraft, BookOffering, clampSeats(), maxWorkshopSeats(), mockData, mockParams, zustand

### Community 44 - "Confirmed & Checkout Tests"
Cohesion: 0.22
Nodes (10): booking(), inDays(), mockCheckout, mockDemoPay, mockInvalidate, mockParams, mockPlace, mockPromo (+2 more)

### Community 45 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 46 - "Test Images & Gallery"
Cohesion: 0.29
Nodes (8): InstructorProfile(), styles, testHero(), DateTile(), Hero(), Props, SessionRow(), styles

### Community 47 - "Reminders"
Cohesion: 0.24
Nodes (9): MyBooking, useMyBookings(), ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), useReminderSync(), currentLang() (+1 more)

### Community 48 - "Time Slots & UI Tests"
Cohesion: 0.22
Nodes (5): sat, slots, groupSlots(), PartOfDay, @testing-library/react-native

### Community 49 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 50 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 51 - "Cancel & Reschedule"
Cohesion: 0.31
Nodes (8): CancelSheet(), REASONS, styles, cancelOutcome(), BookingErrorKey, cancelBooking(), showToast(), Cancel sheet credit wording ("Cancel and get N EGP credit")

### Community 52 - "Booking Rules in the Handoff"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 53 - "Working Agreement"
Cohesion: 0.29
Nodes (3): Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail

### Community 54 - "Hand-set Tokens (Components, Motion)"
Cohesion: 0.29
Nodes (6): component, homeIndicator, icon, layout, motion, tray

### Community 55 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 56 - "Family Member Sheet & Rules"
Cohesion: 0.33
Nodes (5): Profile(), useCredit(), mockParams, mockSave, mockSignOut

### Community 57 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 58 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 59 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 61 - "Product in One Page"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **57 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+52 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 486 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Booking Rules & Database Tests` to `Gallery Screen & Theme`, `Decisions Log & Expo Docs Rule`, `CI Jobs & Checks`, `Working Agreement & Phase 1 Design`, `Project Guide & Design Sources`, `Cancel & Reschedule`, `Handoff Chrome Specs`?**
  _High betweenness centrality (0.366) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _57 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Onboarding Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.054858934169279 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Ar App Strings · Tasks`, `Book & Group Page Journey`, `CI Jobs & Checks`, `Review, Pay & Confirmed`, `Phase 1 Design Notes`, `Project Guide & Design Sources`, `Arabic Copy & Dev Machine`, `Handoff Chrome Specs`, `Working Agreement`, `Booking Rules & Database Tests`, `Nav Bar & Selection Lens Spec`, `Design Tokens Pipeline`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **Should `Explore Filters Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.05834464043419267 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Icon Buttons & Navigation Bar` to `Onboarding Screens`, `Explore Filters Sheet`, `Gallery Screen & Theme`, `Small UI Pieces (Icons, Rows, Filter Button)`, `Cards & Booking Card`, `Root Stack`, `Date Formatting & Time Slots`, `Review & Pay Checkout`, `Text, Chips & Phone Inputs`, `Seed Data & Gallery Copy`, `Checkout, Demo Pay & Reminders`, `Mobile Package Manifest`, `Date Tiles, Banners & Day Picker`, `App Entry & Package`, `Instructor Profile Data`, `Bookings · Bookings Filter`, `Category Tray`, `Root Layout & Query Client`, `Test Images & Gallery`, `Dates Test · Overmedia Test`, `Cancel & Reschedule`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._