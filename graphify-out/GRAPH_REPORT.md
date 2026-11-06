# Graph Report - Coaching app  (2026-11-06)

## Corpus Check
- 13 files · ~121,724 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1400 nodes · 4392 edges · 73 communities (66 shown, 7 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 198 edges (avg confidence: 0.83)
- Token cost: 38,000 input · 9,000 output

## Community Hubs (Navigation)
- Root Stack
- Decisions Log & Expo Docs Rule
- Gallery Screen & Theme
- E2E Journey & Arabic Strings
- Small UI Pieces (Icons, Rows, Filter Button)
- CI Jobs & Checks
- Cards & Booking Card
- Token Generator Script
- Paymob
- Level Options & Colour Types
- Project Guide & Design Sources
- Onboarding Screens
- Design Tokens Pipeline
- Mobile Runtime Dependencies
- Bookings Filter & Types
- Working Agreement & Phase 1 Design
- Confirmed & Checkout Tests
- Expo App Config
- Booking Detail & Cancel Sheet
- Explore Filters Sheet
- Handoff Component Specs
- Booking Rules & Database Tests
- Workshop Seats
- Checkout, Demo Pay & Reminders
- Mobile Package Manifest
- Seed Data & Gallery Copy
- Test Images, Avatar & Row Cards
- Root Package & Scripts
- Who & Where Onboarding
- Date Formatting & Time Slots
- Time Slots & Day Picker
- App Entry & Package
- Instructor Profile Data
- Arabic Copy & Dev Machine
- Phone Sign-up & Verify
- Family Member Sheet & Rules
- Home Data & Time Rules
- Payments & Open Questions
- Nav Bar & Selection Lens Spec
- Gallery E2E & Dev Setup
- Phase 1 Design Notes
- Explore Tests
- Cairo Time & Workshop Policy
- Working Agreement
- Review, Pay & Confirmed
- Profile Screen & Credit
- Reminders
- Mobile TypeScript Config
- Root Layout & Query Client
- Interests Screen & Tests
- Seed Instructors & Workshops
- Category Tray & Hand-set Tokens
- Mobile Dev Dependencies
- Tokens Package Manifest
- Base TypeScript Config
- Booking Rules in the Handoff
- Design Handoff
- Phase 0 Report & Requirements
- Sort & Sign-out Sheets
- Glass Chrome Specs (Tabs, Sheets)
- Mobile npm Scripts
- Explore Filter Rules
- Lint Config
- Liquid Glass Materials
- Jest Config
- Code Entry Screen
- Gallery Route
- Icon Buttons & Navigation Bar
- Product in One Page
- Account Data & Gallery Copy
- Onboarding Layout
- E2E CI Script
- Deno Config

## God Nodes (most connected - your core abstractions)
1. `react-native` - 98 edges
2. `useTheme()` - 82 edges
3. `T()` - 79 edges
4. `Decisions log (DECISIONS.md)` - 69 edges
5. `react-i18next` - 48 edges
6. `react` - 46 edges
7. `useLang()` - 44 edges
8. `Arabic app strings to translate` - 44 edges
9. `Button()` - 39 edges
10. `useSettings` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Departures board (signature)` --semantically_similar_to--> `Departures board (Starting soon near you)`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `Home band` --semantically_similar_to--> `Home aubergine band`  [INFERRED] [semantically similar]
  apps/mobile/DESIGN.md → docs/DECISIONS.md
- `After-every-task routine (spec, map, Project Map page, commit)` --conceptually_related_to--> `T22: Graphify update, DECISIONS, phase report (done 6 Nov)`  [INFERRED]
  CLAUDE.md → specs/phase-1/tasks.md
- `Evidence on hand` --semantically_similar_to--> `Neutral photo placeholders (no real photos yet)`  [INFERRED] [semantically similar]
  apps/mobile/PRODUCT.md → docs/DECISIONS.md
- `EAS build/submit/update` --conceptually_related_to--> `D9: iOS testing in Expo Go`  [INFERRED]
  apps/mobile/AGENTS.md → docs/DECISIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **App credit refund flow (D64)** — docs_decisions_d64, specs_phase_1_design_credits_table, specs_phase_1_design_credit_spends_table, specs_phase_1_design_cancel_booking, specs_phase_1_design_book, docs_decisions_use_credit_switch, docs_decisions_profile_credit_row, docs_decisions_cancel_sheet_credit_wording [EXTRACTED 1.00]
- **Booking and payment pipeline** — specs_phase_1_design_book, specs_phase_1_design_apply_promo, specs_phase_1_design_create_checkout, specs_phase_1_design_payment_webhook, specs_phase_1_design_payment_provider, specs_phase_1_design_cancel_booking, specs_phase_1_design_refund, specs_phase_1_design_release_expired_holds, specs_phase_1_requirements_r6, specs_phase_1_requirements_r7, specs_phase_1_requirements_r8 [EXTRACTED 1.00]
- **Owner revision: D54 specified as R11 items** — docs_decisions_d54, specs_phase_1_requirements_r11, specs_phase_1_requirements_r11_1, specs_phase_1_requirements_r11_5, specs_phase_1_requirements_r11_9, specs_phase_1_requirements_r11_12 [EXTRACTED 1.00]
- **Phase 1 close-out for the Phase 2 gate** — docs_decisions_d65, specs_phase_1_tasks_t22, specs_phase_1_report, specs_phase_1_report_not_done, specs_phase_1_report_phase2_outline [EXTRACTED 1.00]
- **Fewest taps booking flow** — docs_decisions_d59, apps_mobile_e2e_phase1_book_group_seats, apps_mobile_e2e_phase1_book_one_to_one, specs_phase_1_tasks_t26 [INFERRED 0.75]
- **Product record: who, why, how** — apps_mobile_product_users, apps_mobile_product_purpose, apps_mobile_product_positioning, apps_mobile_product_principles [INFERRED 0.75]
- **Bugs found by e2e and fixed** — docs_decisions_d61, docs_decisions_d62, apps_mobile_e2e_phase1, docs_decisions_post_payment_refresh, docs_decisions_android_tab_bar_restore, docs_decisions_venue_panel_fallback [INFERRED 0.85]
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **New look: purple and gold with departures board** — specs_phase_1_tasks_t23, apps_mobile_design, docs_decisions_d55, docs_decisions_d58, apps_mobile_design_departures_board [INFERRED 0.85]
- **Phase 1 journey runs in CI** — _github_workflows_ci_e2e_job, apps_mobile_e2e_phase1, specs_phase_1_tasks_t20, docs_decisions_d12 [INFERRED 0.85]

## Communities (73 total, 7 thin omitted)

### Community 0 - "Root Stack"
Cohesion: 0.08
Nodes (43): ORDER, ROUTE, useIsRTL(), A11y, isContrast(), mergeA11y(), useA11y(), ButtonVariant (+35 more)

### Community 1 - "Decisions Log & Expo Docs Rule"
Cohesion: 0.04
Nodes (22): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, PRODUCT.md (product record), Accessibility & inclusion, Brand commitments, Operating context: categories, journey, rules, Platform: iPhone-first, adaptive, Positioning (+14 more)

### Community 2 - "Gallery Screen & Theme"
Cohesion: 0.10
Nodes (35): styles, styles, styles, KIDS_AGE, styles, styles, GallerySheet(), styles (+27 more)

### Community 3 - "E2E Journey & Arabic Strings"
Cohesion: 0.07
Nodes (45): 5. Book soonest 1:1 oud time, 3. Category tray, 2. Sign up and verify, land on Home, Capabilities and constraints, Demo sign-in (Supabase test number), Review & pay, Arabic app strings to translate, App credit strings (review, cancel, profile) (+37 more)

### Community 4 - "Small UI Pieces (Icons, Rows, Filter Button)"
Cohesion: 0.10
Nodes (31): styles, useTheme(), styles, DashedCard(), styles, styles, EmptyState(), Props (+23 more)

### Community 5 - "CI Jobs & Checks"
Cohesion: 0.07
Nodes (35): CI workflow, checks job (lint, typecheck, tests, tokens), Local Supabase with fake provider and fixture, e2e job (Maestro on Android emulator), edge-functions job (Deno check and tests), Emulator: API 34, swangle_indirect GPU, 4 GB, Edge Function log and bookings on failure, Free disk space step (+27 more)

### Community 6 - "Cards & Booking Card"
Cohesion: 0.10
Nodes (29): styles, DEMO_BASE, FLAGS, SLOTS, styles, THEMES, WEEK, BookingCard() (+21 more)

### Community 7 - "Token Generator Script"
Cohesion: 0.08
Nodes (27): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+19 more)

### Community 8 - "Paymob"
Cohesion: 0.11
Nodes (20): demo, fake, sample, at(), env(), HMAC_FIELDS, hmacSha512(), hmacString() (+12 more)

### Community 9 - "Level Options & Colour Types"
Cohesion: 0.10
Nodes (23): Family(), styles, styles, off, resolveScheme(), Scheme, Banner(), styles (+15 more)

### Community 10 - "Project Guide & Design Sources"
Cohesion: 0.08
Nodes (28): 4. Book two workshop seats, Book screen, Booking card, Bookings Filter sheet, Explore Filters sheet, Group page, MonthCalendar, Reschedule screen (+20 more)

### Community 11 - "Onboarding Screens"
Cohesion: 0.18
Nodes (25): Welcome(), Categories(), styles, styles, Levels(), styles, Preferences(), styles (+17 more)

### Community 12 - "Design Tokens Pipeline"
Cohesion: 0.11
Nodes (25): Home surface brief (app-wide look, T23), Design System: Coach For All (DESIGN.md), Aubergine (#3b0a6b) action colour, Buttons (primary, secondary, plain), Cards, Chips, The Class First Rule, Departures board (signature) (+17 more)

### Community 13 - "Mobile Runtime Dependencies"
Cohesion: 0.07
Nodes (30): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+22 more)

### Community 14 - "Bookings Filter & Types"
Cohesion: 0.14
Nodes (26): BookingsFilter(), KINDS, styles, TIMES, Bookings(), styles, Tab, TABS (+18 more)

### Community 15 - "Working Agreement & Phase 1 Design"
Cohesion: 0.13
Nodes (27): Phase 1 technical design, App shape and routes, apply_promo() SQL function, Auth (Supabase phone OTP), book() SQL function, Booking ref CFA-#####, Boundaries, Component library (+19 more)

### Community 16 - "Confirmed & Checkout Tests"
Cohesion: 0.10
Nodes (23): Review(), styles, BookDraft, BookOffering, applyPromo(), Method, placeBooking(), booking() (+15 more)

### Community 17 - "Expo App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 18 - "Booking Detail & Cancel Sheet"
Cohesion: 0.11
Nodes (22): BookingDetail(), styles, CancelSheet(), REASONS, styles, bookingPolicy(), BookingsFilter, canCancel() (+14 more)

### Community 19 - "Explore Filters Sheet"
Cohesion: 0.13
Nodes (23): FiltersSheet(), styles, TYPES, WHEN, Availability, DEFAULT_FILTERS, DISTANCES, ExploreState (+15 more)

### Community 20 - "Handoff Component Specs"
Cohesion: 0.12
Nodes (24): Coach For All design handoff, 12. Accessibility, 6.1 App map, 7.8 Book (1:1, group, kids), 7.11 Bookings, 6.3 Category icons, Confirmation ring, 11. Content style (+16 more)

### Community 21 - "Booking Rules & Database Tests"
Cohesion: 0.16
Nodes (21): Phase 1 Maestro journey (R10.1), 7. Both in Bookings, cancel-confirm test ID, 8. Cancel with refund as app credit, 9. Cancel without refund (within 24 h), 10. Refund shows as app credit on Profile, Migration 20261105120000_app_credit.sql, grant_credit() ops function (+13 more)

### Community 22 - "Workshop Seats"
Cohesion: 0.13
Nodes (20): Book(), Reschedule(), days, mockData, mockFamily, mockParams, now, useBookDraft (+12 more)

### Community 23 - "Checkout, Demo Pay & Reminders"
Cohesion: 0.12
Nodes (21): Confirmed(), styles, DemoCheckout(), RemindSheet(), styles, directionsUrl(), MY_BOOKING_COLUMNS, Booking (+13 more)

### Community 24 - "Mobile Package Manifest"
Cohesion: 0.09
Nodes (21): main, name, private, version, @cfa/tokens, expo, expo-blur, expo-constants (+13 more)

### Community 25 - "Seed Data & Gallery Copy"
Cohesion: 0.16
Nodes (14): AppearanceSheet(), styles, THEMES, mockSave, mockParams, mockSave, mockSignOut, i18n (+6 more)

### Community 26 - "Test Images, Avatar & Row Cards"
Cohesion: 0.14
Nodes (13): styles, styles, Props, styles, Hero(), Props, Section(), styles (+5 more)

### Community 27 - "Root Package & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 28 - "Who & Where Onboarding"
Cohesion: 0.16
Nodes (16): AREA_ORDER, Pref, PREFS, styles, Who, WhoWhereScreen(), Profile, Discipline (+8 more)

### Community 29 - "Date Formatting & Time Slots"
Cohesion: 0.26
Nodes (15): dateFormat(), formatClock(), formatDayMonth(), formatDayOfMonth(), formatDistance(), formatFullDate(), formatMonth(), formatMonthYear() (+7 more)

### Community 30 - "Time Slots & Day Picker"
Cohesion: 0.16
Nodes (15): isSameCairoDay(), sat, slots, Day, DayPicker(), Props, styles, groupSlots() (+7 more)

### Community 31 - "App Entry & Package"
Cohesion: 0.15
Nodes (11): LANGS, LanguageSheet(), styles, ar, en, galleryCopy, keys(), missingArabicKeys() (+3 more)

### Community 32 - "Instructor Profile Data"
Cohesion: 0.15
Nodes (12): bookableAfter(), InstructorExtras, nextAvailable(), Offering, OpenSlot, mockParams, padel, pottery (+4 more)

### Community 33 - "Arabic Copy & Dev Machine"
Cohesion: 0.17
Nodes (13): 1. Onboarding: Categories, Interests, Levels, Who & where, useReminderSync, Interests and levels strings (3), Onboarding levels strings (1), Onboarding strings (36), Reminder notification strings (1), Phase 1 requirements: hobbies-first booking loop, R2 auth (+5 more)

### Community 34 - "Phone Sign-up & Verify"
Cohesion: 0.18
Nodes (12): SignUp(), authErrorKey(), e164(), formatEgMobile(), isValidEgMobile(), sendCode(), mockSend, mockVerify (+4 more)

### Community 35 - "Family Member Sheet & Rules"
Cohesion: 0.18
Nodes (14): FamilyMemberSheet(), styles, useSession(), CHILD_AGE, FamilyMember, FamilyMemberErrors, NAME_MAX, PendingKidsBooking (+6 more)

### Community 36 - "Home Data & Time Rules"
Cohesion: 0.20
Nodes (13): Home(), cairo(), cairoDaysUntil(), Departure, greetingPeriod(), GroupSessionRow, InstructorCardRow, MyBookingRow (+5 more)

### Community 37 - "Payments & Open Questions"
Cohesion: 0.18
Nodes (16): band / band-label / band-control tokens, board / board-line tokens, brand / brand-text / brand-tint tokens, 3.1 Colour, 3. Design tokens, glass-* tokens, gold / gold-ink / gold-tint tokens, Playfair Display brand type styles (+8 more)

### Community 38 - "Nav Bar & Selection Lens Spec"
Cohesion: 0.18
Nodes (10): The Glass Is Apple's Rule, Navigation (native tabs, glass), Android tab bar returns on landing on a tab, GlassLens / useGlassLens, NativeTabs (Apple tab bar), Floating TabBar, Segmented control, Tab bar strings (1) (+2 more)

### Community 39 - "Gallery E2E & Dev Setup"
Cohesion: 0.19
Nodes (15): Maestro gallery E2E flow, Gallery flow: Reduce Transparency / Increase Contrast screenshots, Gallery flow: open tray and pick Sports, 6.2 Category tray, Phase 0 technical design, Mac dev environment and toolchain, Monorepo layout (apps/mobile, packages/tokens, supabase), Zustand settings store (theme, category, devForce) (+7 more)

### Community 40 - "Phase 1 Design Notes"
Cohesion: 0.14
Nodes (14): Gallery flow: Arabic/RTL screenshots, 7.15 Arabic / RTL, CI design (checks + supabase jobs), setLanguage RTL switch (forceRTL + reload), R3 Supabase foundation, R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format (+6 more)

### Community 41 - "Explore Tests"
Cohesion: 0.14
Nodes (13): Explore(), activeFilterCount(), OfferingPrice, at(), base, card(), dina, hany (+5 more)

### Community 42 - "Cairo Time & Workshop Policy"
Cohesion: 0.13
Nodes (7): Workshop(), clampSeats(), maxWorkshopSeats(), mockData, mockParams, fitLines(), @testing-library/react-native

### Community 43 - "Working Agreement"
Cohesion: 0.16
Nodes (7): Venue panel instead of map on Android without Maps key, Working agreement, DESIGN_HANDOFF.md (source of truth), Required skills: spec-driven-development, graphify, ponytail, No credit history list yet (balance only), [OPEN] items hit (photos, Members Circle, Maps key, Paymob live keys, credit history, credit sources), Proposed Phase 2 spec outline (Engagement)

### Community 44 - "Review, Pay & Confirmed"
Cohesion: 0.22
Nodes (8): 6. Pay by card with fake provider, Confirmed strings (19), Demo payment strings (5), Remind me sheet strings (6), What was built (Phase 1 learner app and backend), T15: Review & pay + promo + Confirmed, T16: PaymentProvider + Edge Functions, T19: Local reminders

### Community 45 - "Profile Screen & Credit"
Cohesion: 0.21
Nodes (10): Profile(), styles, Interest, Level, useArea(), useProfile(), useCredit(), Avatar() (+2 more)

### Community 46 - "Reminders"
Cohesion: 0.19
Nodes (9): MyBooking, ReminderChoice, askReminderPermission(), REMINDED, syncReminders(), N, useReminderSync(), currentLang() (+1 more)

### Community 47 - "Mobile TypeScript Config"
Cohesion: 0.15
Nodes (11): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+3 more)

### Community 48 - "Root Layout & Query Client"
Cohesion: 0.24
Nodes (9): AppToast(), RootLayout(), RootNavigator(), styles, queryClient, useApplyThemeOverride(), useToast, expo-font (+1 more)

### Community 49 - "Interests Screen & Tests"
Cohesion: 0.18
Nodes (8): Interests(), Area, mockAreas, mockBuilder, mockCalls, mockDisciplines, mockRefetch, mockSaved

### Community 50 - "Seed Instructors & Workshops"
Cohesion: 0.27
Nodes (9): nour, photoWalk, seedFor(), text, wheelTaster, when(), yasmine, Instructor (+1 more)

### Community 51 - "Category Tray & Hand-set Tokens"
Cohesion: 0.20
Nodes (9): CategoryTray(), Radio(), openTray(), component, homeIndicator, icon, layout, motion (+1 more)

### Community 52 - "Mobile Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier, @testing-library/react-native, @types/jest (+2 more)

### Community 53 - "Tokens Package Manifest"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 54 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 55 - "Booking Rules in the Handoff"
Cohesion: 0.25
Nodes (9): Atomic slot and seat holds, Booking reference CFA-#####, 9. Business rules, Cancellation rule (24 h), Members' Circle, 14. Sample content (seed data), R9 Gallery screen, T12 Gallery shell (+1 more)

### Community 56 - "Design Handoff"
Cohesion: 0.22
Nodes (9): Button, Chip, 5. Components, Date tile, Day picker, Instructor card, One primary action per screen, Time slot (+1 more)

### Community 57 - "Phase 0 Report & Requirements"
Cohesion: 0.33
Nodes (9): Phase 0 requirements, Category Tray (R8, handoff 6.2), Lint rule rejecting colour literals outside packages/tokens, Dev-only component gallery (R9), Glass material primitive (R6), NavigationBar P17 (one glass capsule), Phase 0 primitives P1-P21, R2 Quality gates (+1 more)

### Community 58 - "Sort & Sign-out Sheets"
Cohesion: 0.29
Nodes (7): SignOutSheet(), SORTS, SortSheet(), styles, signOut(), SortKey, SheetHeader()

### Community 59 - "Glass Chrome Specs (Tabs, Sheets)"
Cohesion: 0.36
Nodes (7): Bottom action bar, Navigation bar (glass capsule), Sheets, 4.4 Signature glass components, Tab bar (floating glass capsule), R7 Primitives P1-P21, T19 TabBar with minimise

### Community 60 - "Mobile npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, android, lint, start, test, typecheck

### Community 61 - "Explore Filter Rules"
Cohesion: 0.53
Nodes (6): byKey(), filterPeople(), filterWorkshops(), matchesAvailability(), text(), distanceKm()

### Community 62 - "Lint Config"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 63 - "Liquid Glass Materials"
Cohesion: 0.60
Nodes (5): 4.3 Fallbacks, 4. Materials and the rules of Liquid Glass, Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 64 - "Jest Config"
Cohesion: 0.50
Nodes (4): jest, preset, resolver, setupFiles

### Community 68 - "Product in One Page"
Cohesion: 0.50
Nodes (4): Four categories (Hobbies, Sports, Education, Languages), Hobbies-first, 1. Product in one page, Roles: Learner, Instructor, Ops admin

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **56 isolated node(s):** `@cfa/tokens`, `expo`, `expo-localization`, `jest`, `jest-expo` (+51 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 482 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D64: Refunds are app credit` connect `Booking Rules & Database Tests` to `Decisions Log & Expo Docs Rule`, `Arabic Copy & Dev Machine`, `E2E Journey & Arabic Strings`, `CI Jobs & Checks`, `Working Agreement`, `Review, Pay & Confirmed`, `Profile Screen & Credit`, `Working Agreement & Phase 1 Design`, `Confirmed & Checkout Tests`, `Booking Detail & Cancel Sheet`?**
  _High betweenness centrality (0.325) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-localization` to the rest of the system?**
  _56 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Root Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.07589285714285714 - nodes in this community are weakly interconnected._
- **Why does `Decisions log (DECISIONS.md)` connect `Decisions Log & Expo Docs Rule` to `Arabic Copy & Dev Machine`, `E2E Journey & Arabic Strings`, `CI Jobs & Checks`, `Nav Bar & Selection Lens Spec`, `Phase 1 Design Notes`, `Project Guide & Design Sources`, `Working Agreement`, `Review, Pay & Confirmed`, `Design Tokens Pipeline`, `Booking Rules & Database Tests`?**
  _High betweenness centrality (0.223) - this node is a cross-community bridge._
- **Should `Decisions Log & Expo Docs Rule` be split into smaller, more focused modules?**
  _Cohesion score 0.04426229508196721 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Mobile Runtime Dependencies` to `Mobile Package Manifest`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._