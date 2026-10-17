import { useQuery } from '@tanstack/react-query';
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
 * Picks and levels while the learner moves between Interests and Levels; saved when Levels finishes.
 * `saved` holds what the database had, so editing from Profile only rewrites what changed.
 */
type Draft = {
  picks: string[];
  levels: Record<string, Level | null>;
  saved: Record<string, Level | null>;
  toggle: (id: string) => void;
  setLevel: (id: string, level: Level | null) => void;
  load: (saved: Record<string, Level | null>) => void;
};

export const useOnboardingDraft = create<Draft>()((set) => ({
  picks: [],
  levels: {},
  saved: {},
  toggle: (id) =>
    set((s) => ({ picks: s.picks.includes(id) ? s.picks.filter((p) => p !== id) : [...s.picks, id] })),
  setLevel: (id, level) => set((s) => ({ levels: { ...s.levels, [id]: level } })),
  load: (saved) => set({ saved, levels: { ...saved }, picks: Object.keys(saved) }),
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
