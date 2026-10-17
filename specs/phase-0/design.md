# Phase 0 — Technical design

Status: **APPROVED 17 Oct 2026** · pairs with `requirements.md`.

## 1. Environment (this Mac: MacBook Pro 2016, Intel, 8 GB RAM, macOS 12.7.4)

| Tool | Version | How it's installed (user space, no sudo) |
|---|---|---|
| Node | 22.23.3 LTS | Official `darwin-x64` tarball → `~/.local/node`; PATH in `~/.zshrc` |
| Java | Temurin 17 | Tarball → `~/.local/jdk17`; `JAVA_HOME` in `~/.zshrc` |
| Android SDK | cmdline-tools latest; platform-tools, emulator, `platforms;android-36`, `system-images;android-36;google_apis;x86_64` | `~/Library/Android/sdk`; `ANDROID_HOME` in `~/.zshrc`; AVD `cfa_pixel` with 2 GB RAM |
| Maestro | latest | Official install script → `~/.maestro` |
| Supabase CLI | latest | npm devDependency in the root `package.json` (`npx supabase`) |
| EAS CLI | latest | `npx eas-cli` (no global install) |
| uv + graphify | latest | `uv` installer → `~/.local/bin`; `uv tool install graphifyy` |

Risk: newer Android emulator builds may stop supporting macOS 12. If the latest emulator won't start, I'll stop and report before pinning an older emulator version.

## 2. Repo layout

```
coaching app/
├─ apps/mobile/                Expo app, SDK 57 (Expo Router, TS strict)
│  ├─ app/                     routes
│  │  ├─ _layout.tsx           providers: theme, i18n, a11y; Stack
│  │  ├─ index.tsx             dev → redirect to /gallery; otherwise placeholder
│  │  ├─ gallery.tsx           dev-only gallery (404 when !__DEV__)
│  │  └─ gallery-sheet.tsx     formSheet route used by the Sheet demo
│  ├─ src/ui/                  primitives (one file each) + index.ts
│  ├─ src/theme/               useTheme, useA11y, settings store (Zustand)
│  ├─ src/i18n/                i18next setup, en.json, ar.json, format.ts
│  ├─ src/dev/                 gallery sections + seed demo data (§14)
│  ├─ assets/fonts/            PlayfairDisplay-SemiBold.ttf (OFL)
│  ├─ e2e/gallery.yaml         Maestro flow
│  ├─ app.json
│  └─ __tests__/ beside sources as *.test.tsx
├─ packages/tokens/
│  ├─ scripts/generate.ts      parses DESIGN_HANDOFF.md §3 tables → src/generated.ts
│  ├─ src/generated.ts         GENERATED, do not edit
│  ├─ src/manual.ts            shadows + component dims, each with a § reference
│  └─ src/index.ts
├─ supabase/                   config.toml, migrations/, seed.sql, functions/
├─ specs/phase-0/              this spec
├─ docs/DESIGN_HANDOFF.md, docs/DECISIONS.md
├─ .github/workflows/ci.yml
├─ .env.example, .gitignore, .prettierrc, eslint.config.js, tsconfig.base.json
└─ package.json                npm workspaces: apps/*, packages/*
```

## 3. Dependencies

Named in your prompt, so already approved: expo, react-native, typescript, expo-router, i18next, zustand, eslint, prettier, jest, @testing-library/react-native, maestro, eas, supabase CLI. TanStack Query is approved but **not added in Phase 0**, because there's no server state yet.

**Needing your approval** (all Expo-maintained or in the default Expo template):

| Package | Why |
|---|---|
| `expo-glass-effect` | Native Liquid Glass (`GlassView`, `GlassContainer`, `isLiquidGlassAvailable`, `isGlassEffectAPIAvailable`) |
| `expo-blur` | The "blur on iOS < 26" fallback you specified |
| `expo-symbols` | SF Symbols on iOS (§5 "Icons: SF Symbols") and Material Symbols on Android |
| `react-native-reanimated`, `react-native-worklets` | Tray spring, radio scale, tab-bar minimise, toast, nav-title fade; `useReducedMotion` |
| `react-native-gesture-handler` | Swipe-down to close the tray |
| `react-native-safe-area-context`, `react-native-screens` | Required by Expo Router |
| `expo-font` | Bundle Playfair Display 600 (OFL font file, no npm font package) |
| `expo-localization` | Read the device language to pick `en` / `ar` |
| `react-i18next` | React bindings for the approved i18next |
| `jest-expo`, `eslint-config-expo` | Expo's Jest preset and lint config |

Nothing else. The segmented control, progress, time slots and so on are our own code. The switch is React Native's `Switch`.

## 4. Tokens pipeline

- `generate.ts` runs with Node 22's built-in TypeScript stripping (no ts-node). It finds `### 3.1`, `### 3.2` and `### 3.3` in the handoff and parses the markdown table rows:
  - colour rows → `light[token]` / `dark[token]`, with keys camelCased (`surface-2` → `surface2`)
  - radius, blur, touch and spacing rows → numbers
  - type rows → `{ fontSize, lineHeight, fontWeight, letterSpacing?, fontFamily? }`
- `manual.ts` holds:
  - the `shadow-glass` light/dark sets, `shadow-thumb` and the tray shadow, as RN shadow and `boxShadow` values (RN 0.76+ supports `boxShadow` with inset on both platforms)
  - the tray dim of 0.45
  - per-component dimensions quoted from §4–§6
- `tokens:check` regenerates in memory and diffs the result. It fails CI if the generated file is stale.

## 5. Theme, a11y and direction

```ts
// src/theme/settings.ts — the only Zustand store in Phase 0
type Settings = {
  theme: 'system' | 'light' | 'dark';
  category: 'hobbies' | 'sports' | 'education' | 'languages';
  devForce: { reduceTransparency: boolean; increaseContrast: boolean; reduceMotion: boolean };
};
```

- `useTheme()` combines `useColorScheme()` with `settings.theme` and returns `tokens.light` or `tokens.dark`.
- `useA11y()` reads `AccessibilityInfo`: `isReduceTransparencyEnabled`, `isReduceMotionEnabled`, `isDarkerSystemColorsEnabled` on iOS and `isHighTextContrastEnabled` on Android. It subscribes to change events and ORs in the `devForce` flags.
- Direction: `setLanguage('ar')` → `i18n.changeLanguage` → `I18nManager.allowRTL(true)` + `forceRTL(true)` → `DevSettings.reload()`. The gallery is dev-only, so a dev reload is enough. In Expo Go, `forceRTL` applies to the Expo Go app as a whole until it's switched back. Phase 1 needs a production reload (`expo-updates` `reloadAsync`), which I'll list in the Phase 1 spec.
- Layout uses `start`/`end` and `marginStart`/`End`, never left/right. Directional icons (chevrons, back arrows, week arrows) flip with `transform: [{ scaleX: -1 }]` when `I18nManager.isRTL`.

## 6. Glass decision table

| Condition | Renders |
|---|---|
| iOS, `isLiquidGlassAvailable() && isGlassEffectAPIAvailable()`, Reduce Transparency off | `GlassView` (`regular`, or `clear` over media) + `glass-stroke` 0.5 pt rim + `shadow-glass` |
| iOS < 26, Reduce Transparency off | `BlurView` (intensity mapped from `glass-blur` 24 / 14) + `glass-fill` + rim + shadow |
| Android, or Reduce Transparency on | `View` with `glass-frosted`; prominent gets a 1.5 pt `glass-label` border |
| Increase Contrast on (any branch) | Rim becomes 1.5 pt `label` |

- `BlurView` intensity is a 0–100 scale, not a blur radius, so the mapping is a judgement call. I'll mark it `shortcut:` and tune it by eye on device.
- Per the Expo docs, opacity animations on glass wrap the view and switch `glassEffectStyle`. They never set `opacity < 1` on `GlassView` itself.

## 7. TabBar (Phase 0 vs Phase 1)

- **Phase 0:** a custom `TabBar` primitive, glass capsule per §4.4, with a scroll-driven minimise using a Reanimated shared value from the host `ScrollView`. It is shown in the gallery inside a demo scroll area.
- **Phase 1 (proposal, decided in that spec):** iOS 26+ uses `NativeTabs` from `expo-router/native-tabs` (stable from SDK 58; recheck on SDK 57) with `minimizeBehavior="onScrollDown"`, SF Symbol icons and `Trigger.Badge` on Messages. Android and iOS < 26 use Expo Router `Tabs` with this custom `TabBar`, so the frosted floating capsule matches the handoff. Native tabs on Android render a Material bottom bar, which doesn't match §4.4.

## 8. Sheet and tray

- **Sheet:** an Expo Router route with `presentation: 'formSheet'` and `sheetGrabberVisible`. iOS 26 draws the glass and inset itself. On Android, react-native-screens renders a bottom sheet with `glass-frosted` content and radius 34. **Risk:** Android's native sheet may not support the 8 pt side inset. If not, I'll report it rather than hand-roll a sheet.
- **CategoryTray:** a custom `Modal` (transparent) holding Reanimated values:
  - dim opacity: 0 → 1 over 250 ms
  - card `translateY`: `withSpring` (damping tuned for slight overshoot, ~500 ms)
  - radio dot scale: 0 → 1 over 200 ms
  - pan gesture: dismiss when dragged down past a threshold
  - under Reduce Motion, translation is dropped and only opacity animates
  - `accessibilityViewIsModal` on iOS and `importantForAccessibility` on Android keep the screen reader inside

## 9. CI (`.github/workflows/ci.yml`)

```
on: [push, pull_request]
jobs:
  checks (ubuntu, node 22): npm ci → npm run lint → npm run typecheck → npm test → npm run tokens:check
  supabase (ubuntu): supabase/setup-cli → supabase db start → supabase db reset → supabase db lint
```

No EAS builds in Phase 0, because both platforms run in Expo Go.

## 10. Commands

```
npm ci                                   # install all workspaces
npm run check                            # lint + typecheck + test + tokens:check
npm run tokens                           # regenerate packages/tokens/src/generated.ts
npm run lint | npm run typecheck | npm test
npm run start -w apps/mobile             # Metro; scan the QR code with the iPhone camera → Expo Go
npm run android -w apps/mobile           # open in Expo Go on the running emulator (expo start --android)
maestro test apps/mobile/e2e/gallery.yaml
npx supabase db reset | npx supabase db push
```

## 11. Code style (example)

```tsx
// src/ui/Chip.tsx
export function Chip({ label, selected = false, onPress }: ChipProps) {
  const c = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      hitSlop={component.chip.hitSlop} // 36 visual → 44 touch
      onPress={onPress}
      style={[styles.chip, { backgroundColor: selected ? c.brand : c.surface2 }]}
    >
      <Text style={[type.subheadline, styles.label, { color: selected ? c.onBrand : c.label }]}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  chip: { height: component.chip.height, paddingHorizontal: space.space4, borderRadius: radius.pill, justifyContent: 'center' },
  label: { fontWeight: component.chip.fontWeight },
});
```

- Files and components: PascalCase. Hooks: `useX`. Tokens are imported from `@cfa/tokens`.
- No colour or size literals in components.
- Comments only for the reason behind a choice. Known limits are marked `shortcut: <limit>, <when to upgrade>`.

## 12. Testing strategy

- **Unit and component (Jest + RNTL):** token generator and freshness; number formatting; theme resolution; i18n fallback; `Glass` branch selection; each primitive's role, label, states and ≥44 touch (asserted from style + `hitSlop`); tray behaviour with fake timers.
- **E2E (Maestro, local emulator):** `gallery.yaml` toggles the theme, direction and each accessibility override, opens the tray and picks Sports, and takes screenshots of the four combinations.
- **Manual on device:** the same four combinations on the iPhone in Expo Go, plus real Liquid Glass and real Reduce Transparency from iOS Settings.
- No coverage percentage gate in Phase 0. Every primitive has at least one test.

## 13. Boundaries

- **Always:** tokens only; work from the spec's task list; tests green before each commit; update `docs/DECISIONS.md`.
- **Ask first:** any dependency not in §3; any change to the token generator's input format; editing the handoff; moving to Phase 1.
- **Never:** commit secrets; invent `[OPEN]` values or Arabic copy; use stock photos as instructors; put brand colour on glass.

## 14. Payment gateway: preliminary proposal (decided in the Phase 1 spec)

- **Paymob.** Its Egypt developer hub covers cards, Apple Pay/Google Pay ("Quick Payments"), mobile wallets and kiosk. Its mobile SDK flow uses an Intention API (server-side, so an Edge Function) that returns a client secret. Sandbox vs live is chosen by the keys and integration IDs.
- Note: its React Native SDK installs from GitHub, not npm, which is a supply-chain concern.
- A simpler option is Paymob's hosted checkout opened in an in-app browser. That's less native code, but I need to confirm Apple Pay works there.
- I'll compare both against the current docs in the Phase 1 spec.
