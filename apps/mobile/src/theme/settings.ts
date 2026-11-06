import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemePref = 'system' | 'light' | 'dark';
export type Category = 'hobbies' | 'sports' | 'education' | 'languages';
export type A11yFlag = 'reduceTransparency' | 'increaseContrast' | 'reduceMotion';
export type Lang = 'en' | 'ar';

type Settings = {
  theme: ThemePref;
  category: Category;
  /** Arabic lays the app out right-to-left (in JS; see i18n/index.ts). */
  lang: Lang;
  /** Dev-only switches that force an accessibility fallback on (gallery). Not persisted. */
  devForce: Record<A11yFlag, boolean>;
  setTheme: (theme: ThemePref) => void;
  setCategory: (category: Category) => void;
  setLang: (lang: Lang) => void;
  setDevForce: (flag: A11yFlag, on: boolean) => void;
};

// Theme, category and language persist across launches (§6.2, §7.14, R3.2).
export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      theme: 'system',
      category: 'hobbies',
      lang: 'en',
      devForce: { reduceTransparency: false, increaseContrast: false, reduceMotion: false },
      setTheme: (theme) => set({ theme }),
      setCategory: (category) => set({ category }),
      setLang: (lang) => set({ lang }),
      setDevForce: (flag, on) => set((s) => ({ devForce: { ...s.devForce, [flag]: on } })),
    }),
    {
      name: 'cfa-settings',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ theme, category, lang }) => ({ theme, category, lang }),
    },
  ),
);
