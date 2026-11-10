import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import i18n from '@/i18n';
import { showToast } from '@/ui/Toast';
import { useSession } from './auth';
import type { InstructorCardRow } from './home';
import { supabase } from './supabase';

/** The caller's favourite instructors, newest first (RLS: own rows only; Phase 2 R3). */
export function useFavouriteIds(userId: string | undefined) {
  return useQuery({
    queryKey: ['favourites', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favourites')
        .select('instructor_id')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as { instructor_id: string }[]).map((r) => r.instructor_id);
    },
  });
}

/** The heart (R3.1): flips at once, then saves; a failed save flips it back and calls `onError`. */
export function useToggleFavourite(userId: string | undefined, onError: () => void) {
  const qc = useQueryClient();
  return useCallback(
    async (instructorId: string, on: boolean) => {
      const key = ['favourites', userId];
      const before = qc.getQueryData<string[]>(key) ?? [];
      qc.setQueryData<string[]>(
        key,
        on ? [instructorId, ...before] : before.filter((x) => x !== instructorId),
      );
      const { error } = on
        ? await supabase.from('favourites').insert({ instructor_id: instructorId })
        : await supabase.from('favourites').delete().eq('instructor_id', instructorId);
      // 23505: already a favourite (a double tap), which is what we wanted.
      if (error && error.code !== '23505') {
        qc.setQueryData(key, before);
        onError();
        return;
      }
      void qc.invalidateQueries({ queryKey: ['favourite-cards'] });
    },
    [qc, userId, onError],
  );
}

/** Profile → Favourites (R3.2): one card per favourite instructor (their first discipline), in heart order. */
export function useFavouriteCards(ids: string[] | undefined) {
  return useQuery({
    queryKey: ['favourite-cards', ids],
    enabled: Boolean(ids?.length),
    queryFn: async () => {
      const { data, error } = await supabase.from('instructor_cards').select('*').in('id', ids!);
      if (error) throw error;
      const first = new Map<string, InstructorCardRow>();
      for (const r of data as InstructorCardRow[]) if (!first.has(r.id)) first.set(r.id, r);
      return ids!.flatMap((id) => first.get(id) ?? []);
    },
  });
}

/** Everything a screen needs for hearts: whether one is on, and a toggle (R3.1). */
export function useFavourites() {
  const userId = useSession().session?.user.id;
  const ids = useFavouriteIds(userId).data;
  const toggle = useToggleFavourite(userId, () => showToast(i18n.t('favourites.error')));
  const has = (id: string) => Boolean(ids?.includes(id));
  return { ids, has, toggle: (id: string) => void toggle(id, !has(id)) };
}
