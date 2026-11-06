import { useEffect } from 'react';
import { Appearance, useColorScheme, type ColorSchemeName } from 'react-native';
import { dark, light, shadow, type Palette } from '@cfa/tokens';
import { useSettings, type ThemePref } from './settings';

export type Scheme = 'light' | 'dark';

export function resolveScheme(pref: ThemePref, system: ColorSchemeName | null | undefined): Scheme {
  if (pref !== 'system') return pref;
  return system === 'dark' ? 'dark' : 'light';
}

export function useTheme(): { c: Palette; scheme: Scheme; shadow: (typeof shadow)[Scheme] } {
  const scheme = resolveScheme(
    useSettings((s) => s.theme),
    useColorScheme(),
  );
  return { c: scheme === 'dark' ? dark : light, scheme, shadow: shadow[scheme] };
}

/** Keeps native views (switches, glass, sheets) on the same scheme as the manual override. */
export function useApplyThemeOverride() {
  const pref = useSettings((s) => s.theme);
  useEffect(() => Appearance.setColorScheme(pref === 'system' ? 'unspecified' : pref), [pref]);
}
