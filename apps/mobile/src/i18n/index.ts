import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DevSettings, I18nManager } from 'react-native';
import ar from './ar.json';
import en from './en.json';

export type Lang = 'en' | 'ar';

// Only handoff-approved Arabic lives in ar.json (§7.15); anything else falls back to English.
// New Arabic copy is Egyptian Arabic (owner, DECISIONS D25). Arabic prices drop "From": card.from = the price.
// shortcut: language follows the native RTL flag (persists across reloads); Phase 1 stores it explicitly.
export const currentLang = (): Lang => (I18nManager.isRTL ? 'ar' : 'en');

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: currentLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

/** Switches language and direction. Direction needs a reload to apply (dev reload; Phase 1: expo-updates). */
export function setLanguage(lang: Lang) {
  const rtl = lang === 'ar';
  i18n.changeLanguage(lang);
  if (I18nManager.isRTL === rtl) return;
  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
  DevSettings.reload();
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
