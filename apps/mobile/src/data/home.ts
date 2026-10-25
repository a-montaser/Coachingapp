import { useQuery } from '@tanstack/react-query';
import type { Category } from '@/theme/settings';
import { supabase } from './supabase';

const cairo = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo', ...options });

/** Owner rule (requirements Resolved 11): morning 05–11, afternoon 12–16, evening 17–04, Cairo time. */
export function greetingPeriod(now: Date): 'morning' | 'afternoon' | 'evening' {
  const h = Number(cairo({ hour: 'numeric', hourCycle: 'h23' }).format(now));
  return h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 17 ? 'afternoon' : 'evening';
}

/** Whole Cairo calendar days from `now` to `at` (0 = today, 1 = tomorrow). */
export function cairoDaysUntil(at: Date, now: Date): number {
  const day = (d: Date) => Date.parse(cairo({ year: 'numeric', month: '2-digit', day: '2-digit' }).format(d));
  return Math.round((day(at) - day(now)) / 86_400_000);
}

/** Great-circle distance in km (haversine). */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export type InstructorCardRow = {
  id: string;
  display_name: string;
  gender: 'female' | 'male' | null;
  discipline_id: string;
  discipline_en: string;
  discipline_ar: string | null;
  category_id: Category;
  levels: string | null;
  rating_avg: number;
  rating_count: number;
  from_price: number;
  next_at: string | null;
  venue_name: string;
  area_en: string;
  area_ar: string | null;
  lat: number;
  lng: number;
};

/** People list (§7.4 item 7): this category's instructors, soonest availability first. */
export function useInstructorCards(category: Category) {
  return useQuery({
    queryKey: ['instructorCards', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('instructor_cards')
        .select('*')
        .eq('category_id', category)
        .order('next_at', { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data as InstructorCardRow[];
    },
  });
}

export type GroupSessionRow = {
  slot_id: string;
  starts_at: string;
  capacity: number;
  seats_free: number;
  offering_id: string;
  title: string;
  type: 'workshop' | 'group';
  level_label: string | null;
  price_egp: number;
  discipline_id: string;
  instructor_id: string;
  instructor_name: string;
  rating_avg: number;
  venue_name: string;
  area_en: string;
  area_ar: string | null;
  lat: number;
  lng: number;
};

/**
 * Groups (owner revision D54: workshops and small groups together), soonest first: Home's rail (first 6)
 * and Explore's Groups tab. Sports groups appear once the `group_sessions` view includes them.
 */
export function useGroupSessions(category: Category) {
  return useQuery({
    queryKey: ['groupSessions', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_sessions')
        .select(
          'slot_id, starts_at, capacity, seats_free, offering_id, title, type, level_label, price_egp, discipline_id, instructor_id, instructor_name, rating_avg, venue_name, area_en, area_ar, lat, lng',
        )
        .eq('category_id', category)
        .order('starts_at');
      if (error) throw error;
      return data as GroupSessionRow[];
    },
  });
}

export type MyBookingRow = {
  ref: string;
  display_status: string;
  starts_at: string;
  type: string;
  title: string;
  venue_name: string;
  discipline_id: string;
  discipline_en: string;
  discipline_ar: string | null;
  instructor_id: string;
  instructor_name: string;
};

/**
 * The learner's bookings in this category: the next upcoming one (§7.4 item 4) and, for Sports,
 * the last completed one ("Book again"). RLS limits `my_bookings` to the caller's own rows.
 */
export function useMyCategoryBookings(userId: string | undefined, category: Category) {
  return useQuery({
    queryKey: ['myBookings', userId, category],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('my_bookings')
        .select(
          'ref, display_status, starts_at, type, title, venue_name, discipline_id, discipline_en, discipline_ar, instructor_id, instructor_name',
        )
        .eq('category_id', category)
        .in('display_status', ['pending', 'payment_due', 'confirmed', 'completed'])
        .order('starts_at');
      if (error) throw error;
      const rows = data as MyBookingRow[];
      const now = Date.now();
      return {
        next: rows.find((b) => b.display_status !== 'completed' && Date.parse(b.starts_at) > now) ?? null,
        lastCompleted: rows.filter((b) => b.display_status === 'completed').at(-1) ?? null,
      };
    },
  });
}
