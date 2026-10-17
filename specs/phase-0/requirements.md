# Phase 0 — Requirements: environment and foundations

Status: **APPROVED 17 Oct 2026** · 17 Oct 2026
Source of truth: `docs/DESIGN_HANDOFF.md` (sections 3, 4, 5, 6.2, 8, 12).

## Objective

Set up a working repo, toolchain and CI. Build the design tokens and every primitive from handoff section 5, plus the Category Tray from 6.2, shown on one dev-only **Gallery** screen. The gallery must prove light/dark, LTR/RTL and the Reduce Transparency / Increase Contrast / Reduce Motion fallbacks before any product screen is built. No product screens, no backend tables, no payments.

## Assumptions (correct me now)

1. **Expo SDK 57** (React Native 0.86), because Expo Go in the App Store runs SDK 57 today. Upgrade to SDK 58 as soon as Expo Go supports it (tracked in DECISIONS D14).
2. **Node 22 LTS** (22.23.3). Node 24 needs macOS 13.5, and this Mac is on 12.7.4. Expo SDK 58 accepts Node ^22.13.
3. **npm workspaces** (ships with Node, so no extra tool) instead of pnpm or yarn.
4. All tools are installed in user space (`~/.local`, `~/Library/Android/sdk`), with no sudo and no Homebrew. I will add PATH lines to `~/.zshrc`.
5. **iOS** runs in **Expo Go** on your iPhone 16 Pro (iOS 26.6.2, so real Liquid Glass). There's no Apple Developer membership, so an EAS dev build isn't possible. Expo Go includes every Phase 0 native module (glass effect, blur, symbols, Reanimated, Gesture Handler, fonts). It needs a free **Expo account** to log in.
6. **Supabase** is a hosted free dev project you create. Migrations live in `supabase/` and are pushed with the CLI. CI starts a throwaway local Supabase in Docker on Linux and applies the migrations (decision 4a).
7. **Android** uses the emulator, running from the command-line SDK with no Android Studio, on an x86_64 API 36 Google APIs image with 2 GB RAM to fit in 8 GB. It also runs **Expo Go**, so both platforms use the same runtime and there are no Gradle builds on this Mac.
8. **GitHub** hosts the repo and runs CI. I will commit task by task on a `phase-0` branch.
9. The gallery is reachable only in dev builds (`__DEV__`). Phase 0 has no production screen.
10. On Android, fonts use the system font (Roboto / Noto Naskh Arabic), because the handoff names only iOS fonts. Playfair Display 600 is bundled on both platforms.

## Requirements and acceptance criteria

### R1 — Repo and toolchain
- R1.1 Git repo initialised at `~/Desktop/coaching app` with the layout in design.md §2. `.gitignore` excludes `.env*` (except `.env.example`), `node_modules`, native build output and `graphify-out/` caches.
- R1.2 `.env.example` lists variable **names only**: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD`, `EXPO_TOKEN`.
- R1.3 Node 22, Java 17, the Android SDK and emulator, Maestro and the Supabase CLI all run from a fresh terminal (`node -v`, `java -version`, `adb version`, `maestro -v`, `npx supabase -v`).
- **AC:** `npm ci && npm run check` passes locally from a clean clone.

### R2 — Quality gates
- R2.1 TypeScript `strict` in every workspace.
- R2.2 ESLint (`eslint-config-expo`) and Prettier. A lint rule rejects colour literals (`#…`, `rgb(…)`, `rgba(…)`) anywhere outside `packages/tokens`.
- R2.3 Jest (`jest-expo`) and React Native Testing Library.
- R2.4 One Maestro flow (`apps/mobile/e2e/gallery.yaml`) runs locally on the emulator.
- R2.5 A GitHub Actions workflow runs on every push and PR: install → lint → typecheck → unit tests → token freshness check → Supabase migrations apply cleanly.
- **AC:** CI is green on the `phase-0` branch, and a pushed colour literal in `apps/mobile` fails lint.

### R3 — Supabase foundation
- R3.1 `supabase/` is initialised (`config.toml`, `migrations/`, `seed.sql`, `functions/`) and linked to your hosted dev project.
- R3.2 One baseline migration contains no tables, only a comment and the RLS-default convention note. Tables start in Phase 1.
- **AC:** `npx supabase db reset` succeeds in CI, and `npx supabase db push --dry-run` against the hosted project reports nothing to apply after the push.

### R4 — Design tokens (`packages/tokens`)
- R4.1 A generator reads the handoff's **section 3 tables** (colour 3.1; radius, blur, spacing and touch in 3.2; type scale 3.3) and writes `src/generated.ts`. Nothing is typed by hand from those tables.
- R4.2 Values that are not in tables are hand-written in `src/manual.ts`, each with its handoff section reference. These are the shadows from 3.2 (prose) and component dimensions from sections 4–6, e.g. tray radius 32, chip height 36, button 50 / 36.
- R4.3 It exports `light` and `dark` colour sets, `type`, `space`, `radius`, `blur`, `touch`, `shadow`, `component`.
- R4.4 `npm run tokens:check` regenerates the tokens in memory and fails if `generated.ts` is stale. It runs in CI.
- **AC:** A unit test asserts every 3.1 token exists in both themes with the exact handoff value, and spot-checks the type scale (e.g. `largeTitle` = 34/41/700/+0.4). The `space` gap is resolved per Open question 1.

### R5 — Theme, direction and accessibility plumbing
- R5.1 Theme preference System / Light / Dark lives in Zustand. `useTheme()` returns the active colour set and follows the system when set to System. In-memory only in Phase 0; persistence comes in Phase 1.
- R5.2 Direction: switching to Arabic sets i18next to `ar` and calls `I18nManager.forceRTL(true)`, then reloads the app. Switching back reverses it.
- R5.3 i18next has `en` and `ar` resources. In Arabic, a key with no approved Arabic string falls back to English. A dev-only list shows the missing keys, so no Arabic is invented (handoff 7.15).
- R5.4 Number helpers use `Intl` with `ar-EG` to give Arabic-Indic digits, `٫` decimals and `ج.م` prices (`٣٩٠ ج.م`, `١٧:٣٠`), and Latin digits with `EGP` in English.
- R5.5 Accessibility state: `useA11y()` exposes `reduceTransparency`, `reduceMotion` and `increaseContrast` from `AccessibilityInfo`. In dev builds, gallery switches can force each one on, so the fallbacks can be checked on the Android emulator.
- **AC:** Unit tests cover theme resolution, Arabic and English number formatting, and missing-key fallback. In the Maestro flow, toggling each override changes the rendered primitives.

### R6 — Glass material
- R6.1 One `Glass` primitive renders the handoff 4.2 material:
  - iOS 26 or later with Liquid Glass available and Reduce Transparency off: `expo-glass-effect` `GlassView` (`regular`, or `clear` over photos), 0.5 pt `glass-stroke` rim, `shadow-glass`.
  - iOS before 26: `expo-blur` `BlurView`, `glass-fill` overlay, rim and shadow.
  - Android, or Reduce Transparency on: solid `glass-frosted`, same radius.
- R6.2 Prominent variant: 1 pt rim and a 700 label. With Reduce Transparency it gets a 1.5 pt `glass-label` border.
- R6.3 Increase Contrast: the rim becomes 1.5 pt `label`.
- R6.4 `GlassGroup` wraps neighbouring controls in one shape (`GlassContainer` on iOS 26), never glass on glass.
- R6.5 Glass is colourless: no tint and no brand colour on glass (4.2).
- **AC:** A unit test renders `Glass` under each branch (mocked platform and flags) and asserts the chosen implementation and border width.

### R7 — Primitives (each in light, dark, LTR and RTL)
Every primitive has an accessibility label and role, has touch targets of at least 44 pt (`hitSlop` where the visual is smaller, e.g. the 36 pt chip), uses tokens only, and mirrors in RTL.

| # | Primitive | Handoff | Key acceptance checks |
|---|---|---|---|
| P1 | Button | §5 | Variants: prominent glass, glass, plain, destructive, destructive-filled, disabled. Sizes 50 and 36. Disabled is announced as disabled. |
| P2 | IconButton | §5 | 44 × 44, glass when `floating`, `accessibilityLabel` required by its type. |
| P3 | Chip | §5 | 36 high, selected = `brand` / `on-brand`, "Filters · N" variant = `surface` + hairline. `accessibilityState.selected`. |
| P4 | Pill | §5 | 24 high, 12/600; variants ok / warn / next / gold / neutral. |
| P5 | SearchField | §5 | 44 high glass capsule, magnifier, placeholder passed in, clear button. |
| P6 | SegmentedControl | §5 | Glass track 40 high, padding 3, `surface` thumb with `shadow-thumb`. Tab role, selected state. |
| P7 | Card | §5 | `surface`, radius 20, no shadow. |
| P8 | GroupedList | §5 | Rows at least 56 high, 32 × 32 icon tile (radius 9), hairlines inset 60 from the leading edge (mirrors in RTL). |
| P9 | InstructorCard | §5 | 96 × 120 photo slot (neutral silhouette placeholder, §13), name, meta, rating, "Next:" pill, "From N EGP". Optional filled heart. Uses seed data from §14. |
| P10 | WorkshopCard | §5 | 2:1 banner placeholder, title, meta, spots pill, price. Rail width 252 and full-width variants. |
| P11 | DateTile | §5 | 56 × 64, brand-tint/brand-text, neutral variant for past. |
| P12 | DayPicker | §5 | 7 flexible tiles, `success` dot, selected `brand`, empty days at 45% opacity, week arrows (mirrored in RTL). |
| P13 | TimeSlot (+ grid) | §5 | 3 columns, 44 high, states: open / selected / booked (struck through, disabled) / yours. Grouped Morning / Afternoon / Evening by the 12:00 and 17:00 thresholds. |
| P14 | Switch | §5 | Native switch, on = `success`. |
| P15 | Progress | §5 | 3 segments, 4 high, partial fill, fills from the leading edge (right in RTL). No "Step N of 3" text, but has an accessibility value. |
| P16 | Toast | §5, §8 | Glass capsule near the top, 15/600, auto-dismisses at ~2.6 s, announced with `announceForAccessibility`. Fade-only under Reduce Motion. |
| P17 | NavigationBar | §4.4 | One glass capsule 52 high, padding 4, inset 12; back · centred title (single line, ellipsis) · up to 2 actions with 0.5 × 22 hairlines. Scroll-edge fade. Title fades and rises 6 pt after ~150 pt of scroll. Back chevron mirrors in RTL. |
| P18 | TabBar | §4.4, §8 | Floating glass capsule 64 high, padding 4, inset 16, 26 above the home indicator. 5 tabs (Home, Explore, Bookings, Messages, Profile), `glass-selected` active capsule, `danger` badge on Messages. **Minimises on scroll down** to the active tab plus a round button (Messages, or Home when on Messages); scroll up or a tap restores it. ~0.25 s scale/opacity pop, fade-only under Reduce Motion. Tab order mirrors in RTL. |
| P19 | BottomActionBar | §4.4 | Glass slab, inset 8, radius 34, caption + price on the leading side, primary action on the trailing side. |
| P20 | Sheet | §4.4, §8 | Native sheet (Expo Router `formSheet`), glass on iOS 26, `glass-frosted` fallback, radius 34, grab handle 36 × 5, `scrim` dim, modal for VoiceOver. |
| P21 | **CategoryTray** | §6.2 exactly | See R8. |

### R8 — Category Tray (handoff 6.2, exact)
- R8.1 Trigger: a 40 high glass capsule with the category icon, name and chevron-down. Label: "Category: Hobbies. Change category".
- R8.2 Opens with the dim `rgba(0,0,0,0.45)` fading in over 0.25 s. A **solid `surface`** card (not glass) springs up over ~0.5 s with a slight overshoot. It is inset 8 from the left, right and bottom, radius 32, padding 22 / 22 / 10, with shadow `0 18 50 rgba(0,0,0,0.28)`, and sits above the tab bar.
- R8.3 Header: "Browse by" (20/700) and the subtitle (13, label-2), with a plain 36 pt ✕ (no glass) and a hairline below.
- R8.4 Four rows, each 56 high, in the order HOBBIES, SPORTS, EDUCATION, LANGUAGES. Each has a 22 pt `label` icon, a capitalised label (14/600, +0.02 em tracking) and a radio. The radio is a 22 pt circle: 1.5 pt `separator` border when off; 2 pt `label` border plus a 12 pt dot that scales in over 0.2 s when on.
- R8.5 Tapping a row selects it at once, then the tray closes ~0.25 s later and the category changes in Zustand. Tapping the dim area or ✕ closes with no change. Swiping down closes.
- R8.6 Reduce Motion makes the tray fade instead of slide, and the dot appears without scaling.
- R8.7 Accessibility: modal dialog, radio-group semantics, each row a radio with checked state, and focus kept inside while open.
- R8.8 Persisting the choice across launches is Phase 1 (with storage). In Phase 0 it lives in Zustand memory only.
- **AC:** RNTL tests cover: select, then the tray closes after 250 ms (fake timers) and the category changes; dim tap and ✕ make no change; accessibility roles and checked state; row order. Maestro opens the tray and picks Sports.

### R9 — Gallery screen
- R9.1 A dev-only route (`__DEV__`, which is always true in Expo Go) shows every primitive P1–P21, grouped by section, with all variants and states.
- R9.2 A sticky control panel has: Theme (System / Light / Dark), Language and direction (English LTR / العربية RTL), and forced Reduce Transparency, Increase Contrast and Reduce Motion.
- R9.3 Demo content is handoff §14 seed data, with neutral placeholder imagery and no stock photos.
- **AC:** The Maestro flow captures screenshots of the gallery in four combinations (light LTR, dark LTR, light RTL, dark RTL) on the emulator. You capture the same set on the iPhone in Expo Go. Both go in the phase report.

### R10 — Knowledge map
- R10.1 Graphify maps `docs/DESIGN_HANDOFF.md`, then the codebase at the end of the phase (`--update`), and writes the output to `graphify-out/`.
- **AC:** `graphify-out/GRAPH_REPORT.md` exists and covers the handoff and the Phase 0 code.

## Phase 0 "done when" (revised for this Mac)
1. The app runs in **Expo Go on your iPhone 16 Pro**. (No iOS simulator on macOS 12, and no dev build without an Apple Developer membership.) The Android emulator was dropped from Phase 0 on 17 Oct 2026 (DECISIONS D22): it boots on this Mac but crashes installing Expo Go under memory pressure.
2. CI is green.
3. The gallery shows every primitive in both themes, LTR and RTL, and each accessibility fallback works.

## Out of scope (Phase 0)
Product screens, auth, database tables, payments, the real app tab navigator (native tabs on iOS 26 come in Phase 1), storage persistence, TanStack Query, push notifications, Maestro in CI (see Open question 6).

## Resolved (17 Oct 2026)
1. Spacing: generate `space1`–`space7` from the 7 listed values and add no eighth.
2. Accounts: no Apple Developer membership; iPhone 16 Pro on iOS 26.6.2. iOS testing moves to Expo Go.
3. Icon mapping approved: `paintpalette` / `tennisball` / `book` / `bubble.left.and.bubble.right`; Android `palette` / `sports_tennis` / `menu_book` / `forum`.
4. All listed dependencies approved. `expo-dev-client` isn't needed while we use Expo Go, so it isn't added.
5. uv + graphify approved.
6. Maestro runs locally in Phase 0 and joins CI in Phase 1.
7. Bundle ID `com.coachforall.app` approved. Expo Go ignores it, so it doesn't matter until the first store or dev build.

## Open questions
A. **SDK version.** (1) **SDK 57 now**, so the iPhone works in Expo Go today, then upgrade to SDK 58 when Expo Go supports it; or (2) **SDK 58 now**, with iPhone testing waiting a few weeks for Expo Go SDK 58 and the Android emulator only until then.
B. **Apple Developer membership** isn't needed for Phase 0. It will be needed for Apple Pay (a merchant ID), iOS dev builds of any native SDK not in Expo Go (e.g. Paymob's), very likely iOS push reminders, and definitely TestFlight / App Store. I'll flag exactly where in the Phase 1 spec.
