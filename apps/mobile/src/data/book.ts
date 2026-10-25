import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import type { Offering, OpenSlot } from './instructor';
import { supabase } from './supabase';

export type BookOffering = Offering & { instructor_id: string; discipline_id: string };

const WINDOW_DAYS = 62; // about two months, for the month calendar (owner revision D54)

/**
 * Book (§7.8): the chosen offering, its sibling session types (same instructor and discipline,
 * workshops excluded: they book from the Workshop screen), the instructor's name, and two weeks of slots.
 */
export function useBookOptions(offeringId: string) {
  return useQuery({
    queryKey: ['book', offeringId],
    enabled: Boolean(offeringId),
    queryFn: async () => {
      const cols =
        'id, type, title, description, level_label, duration_min, price_egp, capacity, min_age, max_age, included, what_to_bring, instructor_id, discipline_id, venue:venues(name, notes)';
      const off = await supabase
        .from('offerings')
        .select(cols)
        .eq('id', offeringId)
        .eq('published', true)
        .single();
      if (off.error) throw off.error;
      const o = off.data as unknown as BookOffering;
      const now = new Date();
      const [siblings, card, slots] = await Promise.all([
        supabase
          .from('offerings')
          .select(cols)
          .eq('instructor_id', o.instructor_id)
          .eq('discipline_id', o.discipline_id)
          .eq('published', true)
          // Lessons only: Adults (1:1) or Kids; groups book on the Group page (D54).
          .in('type', ['private', 'kids']),
        supabase
          .from('instructor_cards')
          .select('display_name, discipline_en, discipline_ar')
          .eq('id', o.instructor_id)
          .eq('discipline_id', o.discipline_id)
          .single(),
        supabase
          .from('slot_availability')
          .select('id, offering_id, starts_at, ends_at, seats_free')
          .eq('offering_id', offeringId)
          .gt('starts_at', now.toISOString())
          .lt('starts_at', new Date(now.getTime() + WINDOW_DAYS * 86_400_000).toISOString())
          .order('starts_at'),
      ]);
      if (siblings.error) throw siblings.error;
      if (card.error) throw card.error;
      if (slots.error) throw slots.error;
      const order = { private: 0, group: 1, kids: 2, workshop: 3 };
      return {
        offering: o,
        siblings: (siblings.data as unknown as BookOffering[]).sort((a, b) => order[a.type] - order[b.type]),
        instructor: card.data as {
          display_name: string;
          discipline_en: string;
          discipline_ar: string | null;
        },
        slots: slots.data as OpenSlot[],
      };
    },
  });
}

/** The learner's choice on Book, handed to Review & pay (client state: Zustand, design.md §1). */
type BookDraft = {
  offeringId: string | null;
  slotId: string | null;
  /** 1, except workshops (1–3, §9.4). */
  seats: number;
  childId: string | null;
  note: string;
  /** A card booking already holding seats (awaiting payment): retrying pays for it, not a new hold. */
  pendingRef: string | null;
  /** The last card payment failed (demo Fail, or the gateway said no). */
  failed: boolean;
  set: (patch: Partial<Omit<BookDraft, 'set'>>) => void;
};
export const useBookDraft = create<BookDraft>()((set) => ({
  offeringId: null,
  slotId: null,
  seats: 1,
  childId: null,
  note: '',
  pendingRef: null,
  failed: false,
  set: (patch) => set(patch),
}));

/** First name for "Book with Nour" (§7.8). */
export const firstName = (displayName: string) => displayName.split(' ')[0] ?? displayName;
