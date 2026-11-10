import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';

/** The caller's own ratings, by booking id (RLS: the author reads theirs; Phase 2 R2). */
export function useMyRatings(userId: string | undefined) {
  return useQuery({
    queryKey: ['ratings', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase.from('reviews').select('booking_id, stars');
      if (error) throw error;
      return new Map((data as { booking_id: string; stars: number }[]).map((r) => [r.booking_id, r.stars]));
    },
  });
}

/** SQL `rate_booking()`: once per completed booking; the instructor's average moves at once (R2.1, R2.3). */
export async function rateBooking(ref: string, stars: number, body: string) {
  const { error } = await supabase.rpc('rate_booking', { p_ref: ref, p_stars: stars, p_body: body });
  if (error) throw error;
}

/** "Rated 5★": a finished, uncancelled session that has a rating, or can still get one. */
export const canRate = (status: string) => status === 'completed';
