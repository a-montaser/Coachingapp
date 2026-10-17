import { create } from 'zustand';

export type ThemePref = 'system' | 'light' | 'dark';
export type Category = 'hobbies' | 'sports' | 'education' | 'languages';
export type A11yFlag = 'reduceTransparency' | 'increaseContrast' | 'reduceMotion';
export type Lang = 'en' | 'ar';

type Settings = {
  theme: ThemePref;
  category: Category;
  /** Arabic lays the app out right-to-left (in JS; see i18n/index.ts). */
  lang: Lang;
  /** Dev-only switches that force an accessibility fallback on (gallery). */
  devForce: Record<A11yFlag, boolean>;
  setTheme: (theme: ThemePref) => void;
  setCategory: (category: Category) => void;
  setLang: (lang: Lang) => void;
  setDevForce: (flag: A11yFlag, on: boolean) => void;
};

// shortcut: in-memory only; Phase 1 persists theme, category and language across launches (§6.2, §7.14).
export const useSettings = create<Settings>()((set) => ({
  theme: 'system',
  category: 'hobbies',
  lang: 'en',
  devForce: { reduceTransparency: false, increaseContrast: false, reduceMotion: false },
  setTheme: (theme) => set({ theme }),
  setCategory: (category) => set({ category }),
  setLang: (lang) => set({ lang }),
  setDevForce: (flag, on) => set((s) => ({ devForce: { ...s.devForce, [flag]: on } })),
}));
