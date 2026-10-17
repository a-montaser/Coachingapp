import type { Instructor } from '@/ui/InstructorCard';
import type { Workshop } from '@/ui/WorkshopCard';

// Handoff §14 sample content (all fictional). Distance and "Next" come from the handoff's own
// examples (§5, §7.15); the seed gives no levels, so none are shown.
export const yasmine: Instructor = {
  name: 'Yasmine Fathy',
  discipline: 'Pottery',
  rating: 4.9,
  reviews: 112,
  distanceKm: 2.4,
  area: 'Zamalek',
  next: 'Today 17:30',
  fromPrice: 450,
  favourite: true,
};

export const nour: Instructor = {
  name: 'Nour El-Sayed',
  discipline: 'Padel',
  rating: 4.9,
  reviews: 128,
  area: 'New Cairo',
  fromPrice: 390,
};

export const wheelTaster: Workshop = {
  title: 'Wheel-throwing taster',
  when: 'Sat 17 Oct · 11:00',
  area: 'Zamalek',
  spotsLeft: 3,
  capacity: 8,
  price: 650,
};

export const photoWalk: Workshop = {
  title: 'Photo walk on Al-Muizz Street',
  when: 'Sun 18 Oct · 08:00',
  area: 'Downtown',
  spotsLeft: 0,
  capacity: 12,
  price: 350,
};
