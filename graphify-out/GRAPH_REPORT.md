# Graph Report - Coaching app  (2026-10-17)

## Corpus Check
- Corpus is ~47,409 words - fits in a single context window. You may not need a graph.

## Summary
- 492 nodes · 1289 edges · 25 communities
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.88)
- Token cost: 85,098 input · 0 output

## Community Hubs (Navigation)
- Seed Data and Strings
- Gallery Screens
- Lint and Dev Tooling
- App Config
- Buttons and Sheet Demo
- Handoff Product Spec
- Runtime Dependencies
- Settings Store and Tests
- Token Generator
- Root Layout and A11y
- Root Workspace Config
- Expo Agent Guide
- Process Decisions
- Navigation Bar and Chrome Tests
- Theme Resolution
- Cards and Lists
- Arabic RTL and Tab Bar
- App TypeScript Config
- Tokens Package Config
- Base TypeScript Config
- Glass and Accessibility
- CI and Supabase
- Design Tokens Spec
- Category Tray
- Phase 0 Design

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 59 edges
2. `T()` - 39 edges
3. `react-native` - 36 edges
4. `Coach For All design handoff` - 35 edges
5. `Gallery()` - 33 edges
6. `Glass()` - 23 edges
7. `component` - 21 edges
8. `Decisions log` - 19 edges
9. `Icon()` - 18 edges
10. `radius` - 18 edges

## Surprising Connections (you probably didn't know these)
- `CI checks job (lint, typecheck, test, tokens:check)` --implements--> `Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check)`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-0/design.md
- `CI workflow (ci.yml)` --implements--> `R2 Quality gates`  [INFERRED]
  .github/workflows/ci.yml → specs/phase-0/requirements.md
- `D12 Maestro local-only in Phase 0; CI in Phase 1` --rationale_for--> `Maestro gallery E2E flow`  [INFERRED]
  docs/DECISIONS.md → apps/mobile/e2e/gallery.yaml
- `Gallery flow: Arabic/RTL screenshots` --conceptually_related_to--> `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md
- `Gallery flow: Reduce Transparency / Increase Contrast screenshots` --shares_data_with--> `useA11y hook`  [INFERRED]
  apps/mobile/e2e/gallery.yaml → specs/phase-0/design.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Glass material spec to implementation** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, specs_phase_0_requirements_r6, specs_phase_0_design_glass_decision_table, specs_phase_0_tasks_t11, docs_decisions_d16, docs_decisions_d17 [INFERRED 0.85]
- **Category tray spec, requirement, implementation and E2E check** — docs_design_handoff_category_tray, specs_phase_0_requirements_r8, specs_phase_0_design_sheet_tray_impl, specs_phase_0_tasks_t21, apps_mobile_e2e_gallery_category_tray_check [INFERRED 0.85]
- **Quality gates pipeline (CI, tokens check, lint, Supabase)** — _github_workflows_ci, _github_workflows_ci_checks_job, _github_workflows_ci_supabase_job, specs_phase_0_requirements_r2, specs_phase_0_design_ci_design, specs_phase_0_tasks_t7, specs_phase_0_design_tokens_pipeline [INFERRED 0.85]

## Communities (25 total, 0 thin omitted)

### Community 0 - "Seed Data and Strings"
Cohesion: 0.09
Nodes (43): nour, photoWalk, wheelTaster, yasmine, dateFormat(), formatDayOfMonth(), formatDistance(), formatFullDate() (+35 more)

### Community 1 - "Gallery Screens"
Cohesion: 0.12
Nodes (43): GalleryRoute(), GallerySheet(), FLAGS, Gallery(), Section(), SLOTS, styles, THEMES (+35 more)

### Community 2 - "Lint and Dev Tooling"
Cohesion: 0.04
Nodes (44): { defineConfig }, expoConfig, devDependencies, eslint, eslint-config-expo, jest, jest-expo, prettier (+36 more)

### Community 3 - "App Config"
Cohesion: 0.08
Nodes (24): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes (+16 more)

### Community 4 - "Buttons and Sheet Demo"
Cohesion: 0.13
Nodes (17): styles, TYPES, ButtonVariant, Props, styles, Props, styles, PillTone (+9 more)

### Community 5 - "Handoff Product Spec"
Cohesion: 0.13
Nodes (17): Coach For All design handoff, App navigation map, Bottom action bar, Business rules (cancellation, availability, status, promo), Four categories: Hobbies, Sports, Education, Languages, Starting data model proposal, Members' Circle credit membership, Navigation bar glass capsule (+9 more)

### Community 6 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (22): dependencies, @cfa/tokens, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-linking (+14 more)

### Community 7 - "Settings Store and Tests"
Cohesion: 0.11
Nodes (16): A11yFlag, Category, Settings, ThemePref, CATEGORIES, Props, styles, openTray() (+8 more)

### Community 8 - "Token Generator"
Cohesion: 0.16
Nodes (16): build(), camel(), cssShadow(), glassShadow(), handoffPath, leadingNumber(), outPath, PLAYFAIR (+8 more)

### Community 9 - "Root Layout and A11y"
Cohesion: 0.19
Nodes (15): RootLayout(), styles, useSettings, A11y, isContrast(), mergeA11y(), useA11y(), useApplyThemeOverride() (+7 more)

### Community 10 - "Root Workspace Config"
Cohesion: 0.11
Nodes (18): devDependencies, supabase, engines, node, name, overrides, react, private (+10 more)

### Community 11 - "Expo Agent Guide"
Cohesion: 0.15
Nodes (6): Mobile AGENTS.md (Expo agent guide), EAS build/submit/update, Decisions log, Motion specs, Mac dev environment and toolchain, Assumption: Expo Go on iPhone, SDK 57

### Community 12 - "Process Decisions"
Cohesion: 0.17
Nodes (11): Maestro gallery E2E flow, Seed sample content (§14), Monorepo layout (apps/mobile, packages/tokens, supabase), Testing strategy (Jest+RNTL, Maestro, manual device), Phase 0 requirements, Lint rule rejecting colour literals outside packages/tokens, R1 Repo and toolchain, R2 Quality gates (+3 more)

### Community 13 - "Navigation Bar and Chrome Tests"
Cohesion: 0.16
Nodes (11): NavAction, Props, styles, Props, styles, TabKey, TABS, expo-glass-effect (+3 more)

### Community 14 - "Theme Resolution"
Cohesion: 0.23
Nodes (11): off, resolveScheme(), Scheme, Props, styles, dark, light, shadow (+3 more)

### Community 15 - "Cards and Lists"
Cohesion: 0.15
Nodes (12): Props, styles, GroupedRow, styles, directional, IconName, Names, Props (+4 more)

### Community 16 - "Arabic RTL and Tab Bar"
Cohesion: 0.19
Nodes (11): Gallery flow: Arabic/RTL screenshots, Arabic / RTL support with Arabic-Indic digits, Floating glass tab bar with minimise on scroll, setLanguage RTL switch (forceRTL + reload), R5 Theme, direction and accessibility plumbing, Phase 0 ordered tasks, T10 i18n + RTL + number format, T19 TabBar with minimise (+3 more)

### Community 17 - "App TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, allowImportingTsExtensions, noUncheckedIndexedAccess, paths, strict, types, extends, include (+1 more)

### Community 18 - "Tokens Package Config"
Cohesion: 0.20
Nodes (9): main, name, private, scripts, check, generate, test, type (+1 more)

### Community 19 - "Base TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, esModuleInterop, module, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck, strict (+1 more)

### Community 20 - "Glass and Accessibility"
Cohesion: 0.31
Nodes (6): Gallery flow: Reduce Transparency / Increase Contrast screenshots, Accessibility acceptance criteria, Glass accessibility fallbacks (Reduce Transparency, Increase Contrast, Reduce Motion), Glass decision table (GlassView / BlurView / frosted), R6 Glass material primitive, T11 Glass + GlassGroup + Icon

### Community 21 - "CI and Supabase"
Cohesion: 0.32
Nodes (7): CI workflow (ci.yml), CI checks job (lint, typecheck, test, tokens:check), CI supabase job (db start, reset, lint), CI design (checks + supabase jobs), R3 Supabase foundation, T6 Supabase init, T7 CI workflow

### Community 22 - "Design Tokens Spec"
Cohesion: 0.36
Nodes (7): Colour tokens (§3.1), Component specs (§5), Shadow, blur, radius, spacing tokens (§3.2), Type scale (§3.3), Tokens generator pipeline (generate.ts → generated.ts, manual.ts, tokens:check), R4 Design tokens package, T8 Tokens generator

### Community 23 - "Category Tray"
Cohesion: 0.40
Nodes (5): Gallery flow: open tray and pick Sports, Category tray, Sheet as formSheet route; CategoryTray as custom Modal with Reanimated, R8 Category Tray (exact), T21 CategoryTray + trigger

### Community 24 - "Phase 0 Design"
Cohesion: 0.60
Nodes (5): Phase 0 technical design, Paymob payment gateway proposal, Zustand settings store (theme, category, devForce), useA11y hook, useTheme hook

## Ambiguous Edges - Review These
- `Gallery flow: Arabic/RTL screenshots` → `setLanguage RTL switch (forceRTL + reload)`  [AMBIGUOUS]
  apps/mobile/e2e/gallery.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **16 isolated node(s):** `@cfa/tokens`, `expo`, `expo-constants`, `expo-linking`, `expo-localization` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Buttons and Sheet Demo` to `Seed Data and Strings`, `Gallery Screens`, `Lint and Dev Tooling`, `Settings Store and Tests`, `Root Layout and A11y`, `Navigation Bar and Chrome Tests`, `Theme Resolution`, `Cards and Lists`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `@cfa/tokens`, `expo`, `expo-constants` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seed Data and Strings` be split into smaller, more focused modules?**
  _Cohesion score 0.08961038961038961 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Runtime Dependencies` to `Lint and Dev Tooling`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `Gallery Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.12470588235294118 - nodes in this community are weakly interconnected._
- **Should `Lint and Dev Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Gallery flow: Arabic/RTL screenshots` and `setLanguage RTL switch (forceRTL + reload)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._