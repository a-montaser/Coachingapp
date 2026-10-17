import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'pro';
export type Interest = {
  discipline_id: string;
  name_en: string;
  name_ar: string | null;
  level: Level | null;
  level_source: 'self' | 'instructor';
  set_at: string;
};

/** The learner's picks with their levels, for Profile's "Levels" list (§7.14). */
export function useInterests(userId: string | undefined) {
  return useQuery({
    queryKey: ['interests', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('interests')
        .select('discipline_id, level, level_source, set_at, discipline:disciplines(name_en, name_ar, sort)');
      if (error) throw error;
      type Row = Omit<Interest, 'name_en' | 'name_ar'> & {
        discipline: { name_en: string; name_ar: string | null; sort: number };
      };
      return (data as unknown as Row[])
        .sort((a, b) => a.discipline.sort - b.discipline.sort)
        .map(({ discipline, ...r }) => ({ ...r, name_en: discipline.name_en, name_ar: discipline.name_ar }));
    },
  });
}

export function useArea(areaId: string | null | undefined) {
  return useQuery({
    queryKey: ['area', areaId],
    enabled: Boolean(areaId),
    staleTime: Infinity,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('areas')
        .select('name_en, name_ar')
        .eq('id', areaId!)
        .single();
      if (error) throw error;
      return data as { name_en: string; name_ar: string | null };
    },
  });
}
