import { useQuery } from '@tanstack/react-query';
import type { InstructorCardRow } from './home';
import { supabase } from './supabase';

export type Offering = {
  id: string;
  type: 'private' | 'group' | 'kids' | 'workshop';
  title: string;
  description: string | null;
  level_label: string | null;
  duration_min: number;
  price_egp: number;
  capacity: number;
  min_age: number | null;
  max_age: number | null;
  included: string | null;
  what_to_bring: string | null;
  venue: { name: string; notes: string | null } | null;
};
export type OpenSlot = {
  id: string;
  offering_id: string;
  starts_at: string;
  ends_at: string;
  seats_free: number;
};

/** The bookable floor (§9.6): future, and at least 60 minutes ahead. Mirrors `bookable_after()` in SQL. */
export const bookableAfter = (now: Date) => new Date(now.getTime() + 60 * 60_000);

const NEXT_SLOTS = 3;

/**
 * Instructor profile (§7.6) for one discipline: the card row, published offerings with their venue,
 * and the soonest open slots across those offerings ("Next available").
 */
export function useInstructor(id: string, discipline: string) {
  return useQuery({
    queryKey: ['instructor', id, discipline],
    queryFn: async () => {
      const [card, offerings] = await Promise.all([
        supabase.from('instructor_cards').select('*').eq('id', id).eq('discipline_id', discipline).single(),
        supabase
          .from('offerings')
          .select(
            'id, type, title, description, level_label, duration_min, price_egp, capacity, min_age, max_age, included, what_to_bring, venue:venues(name, notes)',
          )
          .eq('instructor_id', id)
          .eq('discipline_id', discipline)
          .eq('published', true)
          .order('price_egp'),
      ]);
      if (card.error) throw card.error;
      if (offerings.error) throw offerings.error;
      const list = offerings.data as unknown as Offering[];
      const slots = list.length
        ? await supabase
            .from('slot_availability')
            .select('id, offering_id, starts_at, ends_at, seats_free')
            .in(
              'offering_id',
              list.map((o) => o.id),
            )
            .gt('seats_free', 0)
            .gt('starts_at', bookableAfter(new Date()).toISOString())
            .order('starts_at')
        : { data: [], error: null };
      if (slots.error) throw slots.error;
      return {
        card: card.data as InstructorCardRow & InstructorExtras,
        offerings: list,
        slots: slots.data as OpenSlot[],
      };
    },
  });
}
type InstructorExtras = {
  years: number | null;
  certification: string | null;
  reply_label: string | null;
  bio: string | null;
};

/** "Next available": the three soonest open slots of the instructor's non-workshop sessions. */
export const nextAvailable = (slots: OpenSlot[], offerings: Offering[]) => {
  const lesson = new Set(offerings.filter((o) => o.type !== 'workshop').map((o) => o.id));
  return slots.filter((s) => lesson.has(s.offering_id)).slice(0, NEXT_SLOTS);
};

export type WorkshopDetail = Offering & {
  take_home: string | null;
  instructor_id: string;
  discipline_id: string;
};
export type WorkshopInstructor = {
  display_name: string;
  rating_avg: number;
  rating_count: number;
  area_en: string;
  area_ar: string | null;
};

const GROUP_WINDOW_DAYS = 62; // this month and next, for the month calendar (owner revision D54)

/**
 * Group page (§7.7, owner revision D54): the offering, its instructor card and its dates over about two
 * months. Full dates are kept (shown disabled) so the learner can see the session is popular.
 */
export function useWorkshop(offeringId: string) {
  return useQuery({
    queryKey: ['workshop', offeringId],
    queryFn: async () => {
      const off = await supabase
        .from('offerings')
        .select(
          'id, type, title, description, level_label, duration_min, price_egp, capacity, min_age, max_age, included, take_home, what_to_bring, instructor_id, discipline_id, venue:venues(name, notes)',
        )
        .eq('id', offeringId)
        .eq('published', true)
        .single();
      if (off.error) throw off.error;
      const o = off.data as unknown as WorkshopDetail;
      const [card, slots] = await Promise.all([
        supabase
          .from('instructor_cards')
          .select('display_name, rating_avg, rating_count, area_en, area_ar')
          .eq('id', o.instructor_id)
          .eq('discipline_id', o.discipline_id)
          .single(),
        supabase
          .from('slot_availability')
          .select('id, offering_id, starts_at, ends_at, seats_free')
          .eq('offering_id', offeringId)
          .gt('starts_at', bookableAfter(new Date()).toISOString())
          .lt('starts_at', new Date(Date.now() + GROUP_WINDOW_DAYS * 86_400_000).toISOString())
          .order('starts_at'),
      ]);
      if (card.error) throw card.error;
      if (slots.error) throw slots.error;
      return { offering: o, instructor: card.data as WorkshopInstructor, slots: slots.data as OpenSlot[] };
    },
  });
}
