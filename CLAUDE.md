# Coach For All

Cairo lesson-booking app (Hobbies first, then Sports, Education, Languages). Expo SDK 57 + Expo Router + TypeScript strict, Supabase backend.

## Read first, every session
1. `docs/WORKING_AGREEMENT.md`: the owner's rules (phases, spec gates, what to ask before doing).
2. `docs/DECISIONS.md`: D1–D30+. These override the working agreement where they differ.
3. The current phase's spec in `specs/phase-N/` (requirements, design, tasks). **Phase 1 is in progress; next task is in `specs/phase-1/tasks.md`.**
4. `docs/DESIGN_HANDOFF.md` (source of truth) and `graphify-out/GRAPH_REPORT.md` (map; query it before cross-screen changes).

Design questions the handoff leaves open: the design canvas https://claude.ai/artifact/T5HG8bjkJWWg48RsUwrGhC and its design system https://claude.ai/artifact/MEfnwmckrfLtf6ccKrnFbW (read with the Artifact tool). The handoff wins on conflict (D23).

Skills in use: spec-driven-development, graphify, ponytail.

## Commands
```
npm ci && npm run check            # lint + typecheck + tests + token freshness (run before every commit)
npm run tokens                     # regenerate packages/tokens/src/generated.ts from the handoff
cd apps/mobile && npx expo start   # Metro; the owner opens it in Expo Go on an iPhone 16 Pro (iOS 26)
set -a; . ./.env; set +a; npx supabase db push --password "$SUPABASE_DB_PASSWORD"   # migrations → hosted project
```
Demo sign-in: +20 100 234 5678, code 482917 (Supabase test number; no real SMS).

## Things that bite on this machine and setup
- Mac is macOS 12, 8 GB RAM, no Docker, no iOS simulator, no working Android emulator. Database tests run in **CI only** (`.github/workflows/ci.yml`), or with `npx supabase db query --linked` (read-only) against the hosted project.
- Expo Go only (no Apple Developer membership). RTL is applied in JS, not `I18nManager` (D26). Native tabs don't mirror in Arabic.
- `.env` lives at the repo root; `apps/mobile/.env` is a symlink to it. Metro must be restarted (with `--clear`) after `.env` changes. Never print `.env` values.
- Run Prettier from the repo root, never from `apps/mobile` (the root `.prettierignore` protects `generated.ts`).
- Git: work on the phase branch (`phase-1`), commit per task, push with `git push origin phase-1` (credentials are in the macOS keychain). Commit messages end with the co-author line from the session reminder.
