# Phase 0 — Ordered tasks

Each task ends with a report line: "✅ [task] · files touched · tests added or passed". If a task fails the same way twice, I stop and report.

## A. Environment

- [ ] **T1 Toolchain install.** Node 22.23.3, Temurin 17, Android cmdline-tools + SDK packages + AVD, Maestro, uv + graphify (design §1). Add PATH and env lines to `~/.zshrc`.
  - Verify: `node -v`, `java -version`, `adb version`, `emulator -list-avds`, `maestro -v`, `graphify --help`. The emulator boots.
- [ ] **T2 Graphify map of the handoff.** Run `/graphify docs`.
  - Verify: `graphify-out/GRAPH_REPORT.md` exists. I summarise its main nodes in the task report.

## B. Repo and quality gates

- [ ] **T3 Repo skeleton.** `git init`, `phase-0` branch, root `package.json` (workspaces), `.gitignore`, `.env.example`, `.prettierrc`, `tsconfig.base.json`, `docs/DECISIONS.md`.
  - Verify: `npm install` succeeds; `git status` is clean after the commit.
- [ ] **T4 Expo app.** `create-expo-app` (SDK 57) into `apps/mobile`, stripped to a single Stack. Add the approved deps and `app.json` (name "Coach For All", scheme `coachforall`, bundle ID / package `com.coachforall.app`, `supportsRTL`).
  - Verify: `npx expo-doctor` is clean; the app opens in Expo Go on the emulator and on your iPhone.
- [ ] **T5 Lint, format, typecheck, Jest.** `eslint.config.js` with the colour-literal rule, Prettier, `jest-expo` preset, one smoke test.
  - Verify: `npm run check` passes; a deliberate `#fff` in `apps/mobile` fails lint.
- [ ] **T6 Supabase.** `supabase init`, baseline migration, link to the hosted project (needs your keys in `.env`), `db push`.
  - Verify: `npx supabase db push --dry-run` reports nothing to apply.
- [ ] **T7 CI.** `.github/workflows/ci.yml` (design §9). Push the branch.
  - Verify: both jobs are green on GitHub.

## C. Tokens and plumbing

- [ ] **T8 Tokens generator.** `generate.ts`, `generated.ts`, `manual.ts`, `index.ts`, `tokens:check`.
  - Verify: the token tests from R4 AC pass; `tokens:check` fails after hand-editing `generated.ts`.
- [ ] **T9 Theme + a11y + settings store.** `settings.ts`, `useTheme`, `useA11y`. Load Playfair in `_layout`.
  - Verify: unit tests for theme resolution and devForce OR-ing.
- [ ] **T10 i18n + RTL + number format.** i18next setup, `en.json` / `ar.json` (approved Arabic only), `setLanguage`, `format.ts`.
  - Verify: tests for `٣٩٠ ج.م`, `١٧:٣٠`, `٢٫٤ كم`, `390 EGP`, and missing-key fallback.
- [ ] **T11 Glass + GlassGroup + Icon.** Branch table (design §6). The `Icon` wrapper maps SF ↔ Material names.
  - Verify: `Glass` branch tests (4 conditions).

## D. Primitives (gallery section added with each)

- [ ] **T12 Gallery shell.** `gallery.tsx` with the sticky control panel (theme, language, three a11y forces), dev-only guard.
  - Verify: test that the route renders nothing when `__DEV__` is false. Manual: toggles work on the emulator.
- [ ] **T13 Button, IconButton, Chip, Pill.** Verify: component tests.
- [ ] **T14 SearchField, SegmentedControl, Switch, Progress.** Verify: component tests.
- [ ] **T15 Card, GroupedList, InstructorCard, WorkshopCard** (§14 seed demo data, placeholder imagery). Verify: component tests.
- [ ] **T16 DateTile, DayPicker, TimeSlot grid.** Verify: tests for part-of-day grouping and booked/disabled state.
- [ ] **T17 Toast.** Verify: test for auto-dismiss at 2.6 s and the announce call.
- [ ] **T18 NavigationBar.** Includes scroll-edge fade and title fade. Verify: component test; manual scroll check.
- [ ] **T19 TabBar with minimise.** Verify: test for minimise/restore state transitions; manual scroll check.
- [ ] **T20 BottomActionBar, Sheet (formSheet route).** Verify: component tests; manual on both platforms (Android inset risk).
- [ ] **T21 CategoryTray + trigger.** Verify: R8 AC tests.

## E. Verification and close

- [~] **T22 Maestro flow** `e2e/gallery.yaml` written; **not run in Phase 0** (Android emulator dropped, D22). Runs once an Android device or CI emulator exists (Phase 1).
- [ ] **T23 iPhone check in Expo Go.** You scan the QR code. Capture the four combinations plus the real Reduce Transparency and Increase Contrast checks from iOS Settings. Verify: your screenshots.
- [ ] **T24 Graphify update** over handoff + code. Update `DECISIONS.md`. Write the phase report. Verify: CI is green on the final commit. **STOP for the Phase 1 gate.**
