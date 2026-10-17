import { create } from 'zustand';

export type ThemePref = 'system' | 'light' | 'dark';
export type Category = 'hobbies' | 'sports' | 'education' | 'languages';
export type A11yFlag = 'reduceTransparency' | 'increaseContrast' | 'reduceMotion';

type Settings = {
  theme: ThemePref;
  category: Category;
  /** Dev-only switches that force an accessibility fallback on (gallery). */
  devForce: Record<A11yFlag, boolean>;
  setTheme: (theme: ThemePref) => void;
  setCategory: (category: Category) => void;
  setDevForce: (flag: A11yFlag, on: boolean) => void;
};

// shortcut: in-memory only; Phase 1 persists theme and category across launches (§6.2, §7.14).
export const useSettings = create<Settings>()((set) => ({
  theme: 'system',
  category: 'hobbies',
  devForce: { reduceTransparency: false, increaseContrast: false, reduceMotion: false },
  setTheme: (theme) => set({ theme }),
  setCategory: (category) => set({ category }),
  setDevForce: (flag, on) => set((s) => ({ devForce: { ...s.devForce, [flag]: on } })),
}));
