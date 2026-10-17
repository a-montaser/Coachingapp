# Decisions log

| # | Date | Decision | Why | Approved by |
|---|---|---|---|---|
| D1 | 2026-10-17 | One spec per phase in `/specs/phase-N/` (requirements, design, tasks) with a single approval, instead of the spec-driven skill's separate plan/tasks gates and `tasks/` folder | Owner's prompt; the skill allows project conventions | Owner |
| D2 | 2026-10-17 | Project lives at `~/Desktop/coaching app` | Owner choice | Owner |
| D3 | 2026-10-17 | iOS via EAS cloud dev builds on a physical iPhone; no local iOS simulator | Dev Mac is a 2016 MBP stuck on macOS 12.7.4; Xcode 26 needs macOS 15.6 | Owner |
| D4 | 2026-10-17 | Hosted Supabase dev project; local Docker Supabase only in Linux CI | Docker Desktop doesn't support macOS 12 | Owner |
| D5 | 2026-10-17 | Android testing on the emulator | Owner choice | Owner |
| D6 | 2026-10-17 | Install the toolchain (Node, Java, Android SDK, Maestro, Supabase CLI) | Owner approved | Owner |
| D7 | 2026-10-17 | Proposed: Expo SDK 58, Node 22 LTS, npm workspaces | SDK 58 is latest stable (15 Oct 2026); Node 24 needs macOS 13.5 | Pending (Phase 0 spec) |
| D8 | 2026-10-17 | Spacing tokens: `space1`–`space7` only (handoff lists 7 values for "space-1…8") | Don't invent a missing value | Owner |
| D9 | 2026-10-17 | iOS testing in **Expo Go** on iPhone 16 Pro (iOS 26.6.2); Android emulator also uses Expo Go. Replaces D3's EAS dev build for Phase 0 | No Apple Developer membership; no Gradle builds on the 8 GB Mac | Owner (pending SDK choice) |
| D10 | 2026-10-17 | Category icons: SF `paintpalette`, `tennisball`, `book`, `bubble.left.and.bubble.right`; Material `palette`, `sports_tennis`, `menu_book`, `forum` | Handoff 6.3 describes but doesn't name them | Owner |
| D11 | 2026-10-17 | Approved deps: expo-glass-effect, expo-blur, expo-symbols, reanimated, worklets, gesture-handler, safe-area-context, screens, expo-font, expo-localization, react-i18next, jest-expo, eslint-config-expo, uv + graphify | Phase 0 needs | Owner |
| D12 | 2026-10-17 | Maestro local-only in Phase 0; joins CI in Phase 1 | CI time vs risk | Owner |
| D13 | 2026-10-17 | Bundle ID / package `com.coachforall.app`; display name changeable any time; ID frozen at first store upload | See Q7 answer | Owner |
| D14 | 2026-10-17 | **Expo SDK 57** now (supersedes D7's SDK 58); upgrade to SDK 58 as soon as App Store Expo Go supports it | iPhone testing in Expo Go needs it today | Owner |
| D15 | 2026-10-17 | Phase 0 spec approved | — | Owner |
| D16 | 2026-10-17 | On native Liquid Glass (iOS 26+) we add no CSS rim/shadow (the system draws its own); the 0.5 pt rim + `shadow-glass` apply to the blur fallback; Increase Contrast rim applies everywhere | Avoid a double rim over the real material | Pending (Phase 0 report) |
| D17 | 2026-10-17 | No separate `GlassGroup`: grouped controls share one `Glass` shape (e.g. nav capsule) | §4.2 "one container"; less code | Pending (Phase 0 report) |
| D18 | 2026-10-17 | Tokens package tested with Node's built-in test runner; Prettier runs as its own check (no eslint-plugin-prettier) | No extra dependencies | Pending (Phase 0 report) |
| D19 | 2026-10-17 | App routes live in `apps/mobile/src/app` (SDK 57 default), not `app/` | Expo convention | Pending (Phase 0 report) |
| D20 | 2026-10-17 | Motion that wraps glass (toast, tab-bar minimise) slides or scales instead of fading; under Reduce Motion it does not animate | expo-glass-effect: opacity < 1 on a GlassView or its parents breaks the material; §8 allows "fades or nothing" | Pending (Phase 0 report) |
| D21 | 2026-10-17 | Gallery control panel sits at the top (nav-bar action scrolls back to it) rather than sticky; gallery demo copy is English handoff/seed text, not product strings | A sticky header would slide under the floating nav bar; gallery is dev-only | Pending (Phase 0 report) |
| D22 | 2026-10-17 | Android emulator dropped from Phase 0; device testing is Expo Go on the iPhone 16 Pro only. Maestro flow is written but not run until an Android device or CI emulator exists | Emulator boots but system_server crashes installing Expo Go (8 GB Mac, memory pressure); failed the same way twice | Owner |
| D23 | 2026-10-17 | The design canvas "Coach For All · Hobbies" (https://claude.ai/artifact/T5HG8bjkJWWg48RsUwrGhC) and its `cfa` design system answer design questions the handoff leaves open. Where the two conflict, the handoff wins (prompt: source of truth). Applied: spacing `space1–6, space8` (resolves D8), 1 px blur on glass inner highlights, icon sizes 22/17/14, component paddings and type, neutral unread badge on glass; kept from the handoff over the canvas: SF Symbols (canvas draws web SVGs) and glass-label for every label on glass | Owner said "use this for all your design questions" | Owner |
