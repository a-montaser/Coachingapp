import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useSettings, type Lang } from '@/theme/settings';
import ar from './ar.json';
import en from './en.json';

export type { Lang };

// Only handoff-approved Arabic lives in ar.json (§7.15); anything else falls back to English.
// New Arabic copy is Egyptian Arabic (owner, DECISIONS D25). Arabic prices drop "From": card.from = the price.
// Direction is applied in JS (a `direction` style at each root), not with I18nManager.forceRTL + reload:
// Expo Go resets native RTL and does not support switching it at runtime (DECISIONS D26).
// shortcut: native RTL (system nav bars, swipe-back) needs a development build; planned for Phase 1.
export const currentLang = (): Lang => useSettings.getState().lang;
export const useLang = (): Lang => useSettings((s) => s.lang);
export const useIsRTL = (): boolean => useLang() === 'ar';

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: currentLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// The store is the source of truth: any change (a tap, or saved settings loading at launch) moves i18next.
useSettings.subscribe((s, prev) => {
  if (s.lang !== prev.lang) i18n.changeLanguage(s.lang);
});

/** Switches language and layout direction at once; no reload. */
export function setLanguage(lang: Lang) {
  useSettings.getState().setLang(lang);
}

type Tree = { [k: string]: string | Tree };
const keys = (t: Tree, prefix = ''): string[] =>
  Object.entries(t).flatMap(([k, v]) => (typeof v === 'string' ? [prefix + k] : keys(v, `${prefix}${k}.`)));

/** English keys that have no approved Arabic string yet ([OPEN]: needs a translator). */
export function missingArabicKeys(): string[] {
  const have = new Set(keys(ar));
  return keys(en).filter((k) => !have.has(k));
}

export default i18n;
