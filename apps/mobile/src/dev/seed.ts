import type { Lang } from '@/i18n';
import { formatDayOfMonth, formatMonth, formatTime, formatWeekday } from '@/i18n/format';
import type { Instructor } from '@/ui/InstructorCard';
import type { Workshop } from '@/ui/WorkshopCard';

// Handoff §14 sample content (all fictional). Distance and "Next" come from the handoff's own
// examples (§5, §7.15); the seed gives no levels, so none are shown.
// Arabic names and places are Claude's Egyptian Arabic draft for the gallery (DECISIONS D27).

const when = (iso: string, lang: Lang) => {
  const d = new Date(iso);
  const [h, m] = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo',
    hour: 'numeric',
    minute: 'numeric',
  })
    .format(d)
    .split(':')
    .map(Number);
  return `${formatWeekday(d, lang)} ${formatDayOfMonth(d, lang)} ${formatMonth(d, lang)} · ${formatTime(h ?? 0, m ?? 0, lang)}`;
};

const text = {
  en: {
    yasmine: 'Yasmine Fathy',
    nour: 'Nour El-Sayed',
    pottery: 'Pottery',
    padel: 'Padel',
    zamalek: 'Zamalek',
    newCairo: 'New Cairo',
    downtown: 'Downtown',
    today: 'Today 17:30',
    taster: 'Wheel-throwing taster',
    photoWalk: 'Photo walk on Al-Muizz Street',
  },
  ar: {
    yasmine: 'ياسمين فتحي',
    nour: 'نور السيد',
    pottery: 'فخار',
    padel: 'بادل',
    zamalek: 'الزمالك',
    newCairo: 'القاهرة الجديدة',
    downtown: 'وسط البلد',
    today: 'النهارده ١٧:٣٠',
    taster: 'تجربة التشكيل على العجلة',
    photoWalk: 'جولة تصوير في شارع المعز',
  },
};

export function seedFor(lang: Lang) {
  const t = text[lang];
  const yasmine: Instructor = {
    name: t.yasmine,
    discipline: t.pottery,
    rating: 4.9,
    reviews: 112,
    distanceKm: 2.4,
    area: t.zamalek,
    next: t.today,
    fromPrice: 450,
    favourite: true,
  };
  const nour: Instructor = {
    name: t.nour,
    discipline: t.padel,
    rating: 4.9,
    reviews: 128,
    area: t.newCairo,
    fromPrice: 390,
  };
  const wheelTaster: Workshop = {
    title: t.taster,
    when: when('2026-10-17T08:00:00Z', lang), // Sat 17 Oct, 11:00 Cairo
    area: t.zamalek,
    spotsLeft: 3,
    capacity: 8,
    price: 650,
  };
  const photoWalk: Workshop = {
    title: t.photoWalk,
    when: when('2026-10-18T05:00:00Z', lang), // Sun 18 Oct, 08:00 Cairo
    area: t.downtown,
    spotsLeft: 0,
    capacity: 12,
    price: 350,
  };
  return { yasmine, nour, wheelTaster, photoWalk };
}

export const { yasmine, nour, wheelTaster, photoWalk } = seedFor('en');
