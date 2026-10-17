# Phase 0 report

Status: **closed by the owner on 17 Oct 2026** ("all components look great, start working on the application"). Two gate items are still open: CI has not run, and Supabase is not linked yet.

## What was built
- **Repo:** npm workspaces with `apps/mobile` (Expo SDK 57 + Expo Router, TS strict) and `packages/tokens` (generated from handoff §3, plus `manual.ts` holding values from the design system). Also `supabase/` with config and a baseline migration, `specs/`, `docs/`, and CI at `.github/workflows/ci.yml`.
- **Quality checks:** ESLint with a rule that rejects raw colours, Prettier, `tsc`, Jest + RNTL, Node's own test runner for the tokens package, and a token freshness check.
- **Primitives:** all 21 from §5 and §6.2, in `apps/mobile/src/ui/`. They support light/dark, English/Arabic in RTL with Arabic-Indic digits, and the Reduce Transparency, Increase Contrast and Reduce Motion fallbacks.
- **Dev-only gallery:** shows every primitive with switches for theme, language and the three accessibility flags.
- **Graphify map:** covers the handoff, specs and code (`graphify-out/`).

## How to run
```
cd ~/Desktop/"coaching app"
npm ci && npm run check                 # lint, typecheck, tests, token freshness
cd apps/mobile && npx expo start        # then Expo Go on the iPhone, same Expo account as `npx expo login`
```
Tap path: Expo Go → this project → Component gallery. Theme and language switches are at the top; the tray sits under Overlays.

## Test results
- 49 Jest tests and 6 token tests pass. `npm run check` exits 0.
- The owner checked the gallery on an iPhone 16 Pro (iOS 26.6.2) in Expo Go and approved it.
- **Not yet run:** CI on GitHub (waiting for the first push) and the Maestro flow (no Android device; moves to CI in Phase 1).

## [OPEN] items hit
- **Arabic copy:** 32 app strings are waiting for the owner's translations (`docs/translations/ar-app-strings.md`).
- **Final copy:** the Welcome and Confirmed text is still to be decided (handoff §15.1).
- **Provisional values:** toast styling, the tray's spring and swipe-dismiss thresholds, and the tab icon names. Neither the handoff nor the design system gives them.

## Decisions taken
D1–D27 in `docs/DECISIONS.md`. The largest ones:
- **D9, D22:** Expo Go only; the Android emulator was dropped.
- **D14:** Expo SDK 57.
- **D23, D24:** the design artifacts answer questions the handoff leaves open.
- **D26:** RTL is handled in JS, because Expo Go can't switch native RTL at runtime.

## Risks carried into Phase 1
1. **No Apple Developer membership.** That rules out native RTL, Apple Pay, remote push and any native SDK that Expo Go doesn't include.
2. **No local simulator or emulator.** Maestro has to run in CI, on an Android build.
3. **This Mac struggles under load.** It has 8 GB of RAM on macOS 12; Metro, the tests and graphify compete for it.
4. **CI has never run.** The first push may expose problems specific to the Linux runner.
