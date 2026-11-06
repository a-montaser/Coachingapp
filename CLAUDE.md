# Coach For All

Cairo lesson-booking app (Hobbies first, then Sports, Education, Languages). Expo SDK 57 + Expo Router + TypeScript strict, Supabase backend.

## Read first, every session
1. `docs/WORKING_AGREEMENT.md`: the owner's rules (phases, spec gates, what to ask before doing).
2. `docs/DECISIONS.md`: D1–D30+. These override the working agreement where they differ.
3. The current phase's spec in `specs/phase-N/` (requirements, design, tasks). **Phase 1 is in progress; next task is in `specs/phase-1/tasks.md`.**
4. `docs/DESIGN_HANDOFF.md` (source of truth) and `graphify-out/GRAPH_REPORT.md` (map; query it before cross-screen changes).

Design questions the handoff leaves open: the design canvas https://claude.ai/artifact/T5HG8bjkJWWg48RsUwrGhC and its design system https://claude.ai/artifact/MEfnwmckrfLtf6ccKrnFbW (read with the Artifact tool). The handoff wins on conflict (D23).

Skills in use: spec-driven-development, graphify, ponytail. Load ponytail at the start of every task and query the graph (`graphify query "…"` or `GRAPH_REPORT.md`) before any change that crosses screens.

## After every task (and every owner-requested change)
1. **Spec:** if the change alters what `specs/phase-N/` says (flow, scope, acceptance), update `requirements.md` / `design.md` / `tasks.md` in the same commit, and log it in `docs/DECISIONS.md`.
2. **Map:** `/graphify --update`, in three steps: `"$(cat graphify-out/.graphify_python)" docs/project-map/graph_update.py prepare` (lists the changed docs), one graphify extraction agent for those docs writing `graphify-out/.graphify_chunk_01.json` (prompt: the skill's `references/extraction-spec.md`; keep ids `docs_decisions_d<N>` and `specs_phase_1_tasks_t<N>`), then `… graph_update.py finish <tokens in> <tokens out>`. App icons and `docs/project-map/` are excluded in `graphify-out/.graphify_build.json`. Rename any auto-named group that reads badly.
3. **Project Map page:** `node docs/project-map/build-data.mjs --note "<task or change, in plain words>"`, then republish `docs/project-map/index.html` with `files: {"map-data.json": "docs/project-map/map-data.json", "history.json": "docs/project-map/history.json"}` to https://claude.ai/artifact/GfusiNaPh1op1RCBeHZkuv (pass it as `url` from a new session). Each run adds one entry to the page's "What changed" history.
4. Commit `graphify-out/` and `docs/project-map/` with the task.

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
