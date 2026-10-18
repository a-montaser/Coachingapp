import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { create } from 'zustand';
import type { Category } from '@/theme/settings';
import type { Level } from './account';
import type { Profile } from './auth';
import { supabase } from './supabase';

export const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced', 'pro'];
export const CATEGORIES: Category[] = ['hobbies', 'sports', 'education', 'languages'];

export type Discipline = {
  id: string;
  category_id: Category;
  name_en: string;
  name_ar: string | null;
  icon: string | null;
  code: string | null;
  sort: number;
};
export const disciplineName = (d: Pick<Discipline, 'name_en' | 'name_ar'>, lang: 'en' | 'ar') =>
  lang === 'ar' ? (d.name_ar ?? d.name_en) : d.name_en;

export type Area = { id: string; name_en: string; name_ar: string | null; lat: number; lng: number };

export function useDisciplines() {
  return useQuery({
    queryKey: ['disciplines'],
    staleTime: Infinity,
    queryFn: async () => {
      const { data, error } = await supabase.from('disciplines').select('*').order('sort');
      if (error) throw error;
      return data as Discipline[];
    },
  });
}

export function useAreas() {
  return useQuery({
    queryKey: ['areas'],
    staleTime: Infinity,
    queryFn: async () => {
      const { data, error } = await supabase.from('areas').select('id, name_en, name_ar, lat, lng');
      if (error) throw error;
      return data as Area[];
    },
  });
}

/** The area whose centre is closest to a point (equirectangular distance is plenty inside Cairo). */
export function nearestArea(areas: Area[], lat: number, lng: number): Area | null {
  const d = (a: Area) => {
    const x = (a.lng - lng) * Math.cos(((a.lat + lat) / 2) * (Math.PI / 180));
    return x * x + (a.lat - lat) ** 2;
  };
  return areas.reduce<Area | null>((best, a) => (!best || d(a) < d(best) ? a : best), null);
}

/**
 * Onboarding answers while the learner moves through the three steps, which come before sign-up (D34).
 * `saved` holds what the database had, so editing from Profile only rewrites what changed.
 * `completed` + `answers`: finished while signed out; written to the account right after sign-up.
 * shortcut: in memory only; if the app is killed between step 3 and the code, onboarding starts again.
 */
type Draft = {
  /** Step 1: which of the four categories to show disciplines for. */
  categories: Category[];
  picks: string[];
  levels: Record<string, Level | null>;
  saved: Record<string, Level | null>;
  answers: Partial<WhoWhere>;
  completed: boolean;
  toggleCategory: (c: Category) => void;
  toggle: (id: string) => void;
  setLevel: (id: string, level: Level | null) => void;
  load: (saved: Record<string, Level | null>, categories: Category[]) => void;
  complete: (answers: Partial<WhoWhere>) => void;
  reset: () => void;
};

const empty = { categories: [], picks: [], levels: {}, saved: {}, answers: {}, completed: false };

export const useOnboardingDraft = create<Draft>()((set) => ({
  ...empty,
  toggleCategory: (c) =>
    set((s) => ({
      categories: s.categories.includes(c) ? s.categories.filter((x) => x !== c) : [...s.categories, c],
    })),
  toggle: (id) =>
    set((s) => ({ picks: s.picks.includes(id) ? s.picks.filter((p) => p !== id) : [...s.picks, id] })),
  setLevel: (id, level) => set((s) => ({ levels: { ...s.levels, [id]: level } })),
  load: (saved, categories) => set({ saved, categories, levels: { ...saved }, picks: Object.keys(saved) }),
  complete: (answers) => set({ answers, completed: true }),
  reset: () => set(empty),
}));

/** Writes the draft to `interests`: removes un-picked rows, upserts new or changed ones as self-rated. */
export async function saveInterests(userId: string) {
  const { picks, levels, saved } = useOnboardingDraft.getState();
  const removed = Object.keys(saved).filter((id) => !picks.includes(id));
  if (removed.length) {
    const { error } = await supabase.from('interests').delete().in('discipline_id', removed);
    if (error) throw error;
  }
  const changed = picks.filter((id) => !(id in saved) || saved[id] !== (levels[id] ?? null));
  if (changed.length) {
    const rows = changed.map((id) => ({
      user_id: userId,
      discipline_id: id,
      level: levels[id] ?? null,
      level_source: 'self',
      set_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('interests').upsert(rows);
    if (error) throw error;
  }
}

export type WhoWhere = Pick<Profile, 'who_for' | 'area_id' | 'instructor_pref'>;

/** Step 3 saves the answers and marks onboarding done, which lets the journey gate open the tabs. */
export async function finishOnboarding(userId: string, answers: Partial<WhoWhere>) {
  const { error } = await supabase
    .from('profiles')
    .update({ ...answers, onboarded_at: new Date().toISOString() })
    .eq('id', userId);
  if (error) throw error;
}

/**
 * Right after sign-up: writes onboarding finished while signed out to the new account, then lets the
 * gate open Home. Returns true while that is pending, so the gate shows nothing in between.
 * If saving fails, the learner lands on Interests signed in, with their picks still there, and finishes again.
 */
export function useApplyDraftAfterSignUp(userId: string | undefined, profile: Profile | undefined) {
  const qc = useQueryClient();
  const completed = useOnboardingDraft((s) => s.completed);
  const pending = Boolean(userId && profile && !profile.onboarded_at && completed);
  useEffect(() => {
    if (!pending || !userId) return;
    (async () => {
      try {
        await saveInterests(userId);
        await finishOnboarding(userId, useOnboardingDraft.getState().answers);
        await qc.invalidateQueries({ queryKey: ['profile', userId] });
        qc.invalidateQueries({ queryKey: ['interests', userId] });
        useOnboardingDraft.getState().reset();
      } catch {
        useOnboardingDraft.setState({ completed: false });
      }
    })();
  }, [pending, userId, qc]);
  return pending;
}
