import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { useProfile, useSession } from './auth';
import type { Category } from '@/theme/settings';
import {
  cairoDaysUntil,
  distanceKm,
  useGroupSessions,
  useInstructorCards,
  type GroupSessionRow,
  type InstructorCardRow,
} from './home';
import { useAreas } from './onboarding';
import { supabase } from './supabase';

export type SessionType = 'private' | 'group' | 'kids' | 'workshop';
export type Availability = 'any' | 'today' | 'week' | 'weekend';
export type SortKey = 'soonest' | 'price' | 'rating' | 'nearest';

export const PRICE = { min: 300, max: 1200, step: 50 } as const; // §7.5; max = "Any"
export const RATINGS = [4.5, 4.8] as const;
export const DISTANCES = [2, 5, 10] as const;

export type Filters = {
  maxPrice: number;
  type: SessionType | null;
  gender: 'female' | 'male' | null;
  minRating: number | null;
  maxKm: number | null;
  availability: Availability;
};
export const DEFAULT_FILTERS: Filters = {
  maxPrice: PRICE.max,
  type: null,
  gender: null,
  minRating: null,
  maxKm: null,
  availability: 'any',
};

/** "Filters · N": how many filters differ from the defaults. */
export const activeFilterCount = (f: Filters) =>
  (Object.keys(DEFAULT_FILTERS) as (keyof Filters)[]).filter((k) => f[k] !== DEFAULT_FILTERS[k]).length;

/** Explore's state, shared with the Filters and Sort sheets (client state: Zustand, design.md §1). */
type ExploreState = {
  query: string;
  discipline: string | null;
  tab: 'workshops' | 'people';
  sort: SortKey;
  filters: Filters;
  set: (patch: Partial<Omit<ExploreState, 'set' | 'setFilter' | 'clear'>>) => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  clear: () => void;
};
export const useExplore = create<ExploreState>()((set) => ({
  query: '',
  discipline: null,
  tab: 'people', // Lessons first (owner revision D54)
  sort: 'soonest',
  filters: DEFAULT_FILTERS,
  set: (patch) => set(patch),
  setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),
  clear: () => set({ query: '', discipline: null, filters: DEFAULT_FILTERS }),
}));

/** §7.5 availability: today, the next 7 days, or the Egyptian weekend (Fri–Sat), all in Cairo time. */
export function matchesAvailability(iso: string | null, a: Availability, now: Date): boolean {
  if (a === 'any') return true;
  if (!iso) return false;
  const at = new Date(iso);
  const days = cairoDaysUntil(at, now);
  if (days < 0) return false;
  if (a === 'today') return days === 0;
  if (a === 'week') return days < 7;
  const weekday = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', weekday: 'short' }).format(at);
  return days < 7 && (weekday === 'Fri' || weekday === 'Sat');
}

export type OfferingPrice = {
  instructor_id: string;
  discipline_id: string;
  type: SessionType;
  price_egp: number;
};
export type Point = { lat: number; lng: number };

/** One instructor card as Explore shows it: its "From" price and distance for the current filters. */
export type PersonResult = InstructorCardRow & { price: number; km: number | null };

const text = (...parts: (string | null | undefined)[]) => parts.filter(Boolean).join(' ').toLowerCase();

/**
 * Filters and sorts instructor cards (§7.5). "From" is the lowest price offered, or the lowest for the
 * selected session type (§9.7); an instructor without that type drops out.
 */
export function filterPeople(
  rows: InstructorCardRow[],
  offerings: OfferingPrice[],
  s: Pick<ExploreState, 'query' | 'discipline' | 'sort' | 'filters'>,
  origin: Point | null,
  now: Date,
): PersonResult[] {
  const f = s.filters;
  const q = s.query.trim().toLowerCase();
  const out: PersonResult[] = [];
  for (const r of rows) {
    // Lessons are 1:1 and Kids (owner revision D54); groups and workshops are the Groups tab.
    const mine = offerings.filter(
      (o) =>
        o.instructor_id === r.id &&
        o.discipline_id === r.discipline_id &&
        (o.type === 'private' || o.type === 'kids'),
    );
    if (offerings.length && mine.length === 0) continue;
    const typed = f.type ? mine.filter((o) => o.type === f.type) : mine;
    if (f.type && typed.length === 0) continue;
    const price = typed.length ? Math.min(...typed.map((o) => o.price_egp)) : r.from_price;
    const km = origin ? distanceKm(origin, r) : null;
    if (s.discipline && r.discipline_id !== s.discipline) continue;
    if (
      q &&
      !text(r.display_name, r.discipline_en, r.discipline_ar, r.area_en, r.area_ar, r.venue_name).includes(q)
    )
      continue;
    if (f.maxPrice < PRICE.max && price > f.maxPrice) continue;
    if (f.gender && r.gender !== f.gender) continue;
    if (f.minRating && r.rating_avg < f.minRating) continue;
    if (f.maxKm && (km === null || km > f.maxKm)) continue;
    // shortcut: availability uses the soonest slot of any session type, not of the selected one; per-type next slots arrive with the map view (Phase 2).
    if (!matchesAvailability(r.next_at, f.availability, now)) continue;
    out.push({ ...r, price, km });
  }
  return out.sort(
    byKey(
      s.sort,
      (r) => r.next_at,
      (r) => r.price,
      (r) => r.rating_avg,
      (r) => r.km,
    ),
  );
}

export type WorkshopResult = GroupSessionRow & { km: number | null };

/** Workshops tab (Hobbies): the same search, discipline, price, rating, distance and availability rules. */
export function filterWorkshops(
  rows: GroupSessionRow[],
  s: Pick<ExploreState, 'query' | 'discipline' | 'sort' | 'filters'>,
  origin: Point | null,
  now: Date,
  /** `group_sessions` has no gender column: taken from the instructor cards already loaded. */
  genderOf: (instructorId: string) => string | null | undefined,
): WorkshopResult[] {
  const f = s.filters;
  const q = s.query.trim().toLowerCase();
  const out: WorkshopResult[] = [];
  for (const r of rows) {
    const km = origin ? distanceKm(origin, r) : null;
    if (s.discipline && r.discipline_id !== s.discipline) continue;
    if (q && !text(r.title, r.instructor_name, r.area_en, r.area_ar, r.venue_name).includes(q)) continue;
    if (f.maxPrice < PRICE.max && r.price_egp > f.maxPrice) continue;
    if (f.gender && genderOf(r.instructor_id) !== f.gender) continue;
    if (f.minRating && r.rating_avg < f.minRating) continue;
    if (f.maxKm && (km === null || km > f.maxKm)) continue;
    if (!matchesAvailability(r.starts_at, f.availability, now)) continue;
    out.push({ ...r, km });
  }
  return out.sort(
    byKey(
      s.sort,
      (r) => r.starts_at,
      (r) => r.price_egp,
      (r) => r.rating_avg,
      (r) => r.km,
    ),
  );
}

/** Sort comparator; missing values go last. Ties fall back to soonest. */
function byKey<T>(
  sort: SortKey,
  soonest: (r: T) => string | null,
  price: (r: T) => number,
  rating: (r: T) => number,
  km: (r: T) => number | null,
) {
  const time = (r: T) => {
    const s = soonest(r);
    return s ? Date.parse(s) : Infinity;
  };
  const key: (r: T) => number =
    sort === 'price'
      ? price
      : sort === 'rating'
        ? (r) => -rating(r)
        : sort === 'nearest'
          ? (r) => km(r) ?? Infinity
          : time;
  return (a: T, b: T) => key(a) - key(b) || time(a) - time(b);
}

export function useOfferingPrices(category: string) {
  return useQuery({
    queryKey: ['offeringPrices', category],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offerings')
        .select('instructor_id, discipline_id, type, price_egp, disciplines!inner(category_id)')
        .eq('published', true)
        .eq('disciplines.category_id', category);
      if (error) throw error;
      return data as unknown as OfferingPrice[];
    },
  });
}

/**
 * Where distances are measured from (requirements Resolved 9): the device, when location was already
 * allowed (Who & where asks), otherwise the centre of the learner's area. Never prompts here.
 */
export function useOrigin(): Point | null {
  const userId = useSession().session?.user.id;
  const areaId = useProfile(userId).data?.area_id;
  const area = useAreas().data?.find((a) => a.id === areaId);
  const [device, setDevice] = useState<Point | null>(null);
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const { granted } = await Location.getForegroundPermissionsAsync();
        if (!granted) return;
        const p = await Location.getLastKnownPositionAsync();
        if (live && p) setDevice({ lat: p.coords.latitude, lng: p.coords.longitude });
      } catch {
        // Location Services off: the area centre stands in.
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  return device ?? (area ? { lat: area.lat, lng: area.lng } : null);
}

/** What Explore lists for a category right now; the Filters sheet uses it for its live count. */
export function useExploreResults(category: Category) {
  const s = useExplore();
  const cards = useInstructorCards(category);
  const offerings = useOfferingPrices(category).data ?? [];
  const groups = useGroupSessions(category);
  const origin = useOrigin();
  const now = new Date();
  // Lessons | Groups in every category (owner revision D54); map is Phase 2.
  const workshopsTab = s.tab === 'workshops';
  const rows = cards.data ?? [];
  const gender = new Map(rows.map((r) => [r.id, r.gender]));
  return {
    workshopsTab,
    loading: workshopsTab ? groups.isLoading : cards.isLoading,
    people: workshopsTab ? [] : filterPeople(rows, offerings, s, origin, now),
    workshops: workshopsTab ? filterWorkshops(groups.data ?? [], s, origin, now, (id) => gender.get(id)) : [],
  };
}
