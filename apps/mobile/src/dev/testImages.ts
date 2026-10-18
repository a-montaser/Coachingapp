import type { ImageSourcePropType } from 'react-native';

/**
 * TESTING ONLY (owner, D43): the design prototypes' illustrations stand in for real photos so the app
 * looks complete on the device. They are drawings, not photos of the real instructors (§13).
 * Revert before the Phase 1 report: set TEST_IMAGES to false, then delete this file and
 * assets/test-images/ (tasks.md T22 tracks it). Every screen falls back to the neutral placeholders.
 */
export const TEST_IMAGES = true;

const people: Record<string, ImageSourcePropType> = {
  'Yasmine Fathy': require('../../assets/test-images/yasmine.png'),
  'Rana Mostafa': require('../../assets/test-images/rana.png'),
  'Hany Adel': require('../../assets/test-images/hany.png'),
  'Dina Samir': require('../../assets/test-images/dina.png'),
  'Ahmed Ezz': require('../../assets/test-images/ahmed.png'),
  'Nour El-Sayed': require('../../assets/test-images/nour.png'),
  'Karim Fawzy': require('../../assets/test-images/karim.png'),
  'Laila Hassan': require('../../assets/test-images/laila.png'),
  'Mariam Tarek': require('../../assets/test-images/mariam.png'),
  'Hazem Shafik': require('../../assets/test-images/hazem.png'),
  'Mona Ashraf': require('../../assets/test-images/mona.png'),
  'Sherif Nabil': require('../../assets/test-images/sherif.png'),
  'Claire Dubois': require('../../assets/test-images/claire.png'),
  'Nada Youssef': require('../../assets/test-images/nada.png'),
};
const heroes: Record<string, ImageSourcePropType> = {
  'Nour El-Sayed': require('../../assets/test-images/nour-hero.png'),
};
const byDiscipline: Record<string, ImageSourcePropType> = {
  pottery: require('../../assets/test-images/w-pottery.png'),
  painting: require('../../assets/test-images/w-painting.png'),
  photography: require('../../assets/test-images/w-photography.png'),
  calligraphy: require('../../assets/test-images/w-calligraphy.png'),
};
const byCategory: Record<string, ImageSourcePropType> = {
  education: require('../../assets/test-images/w-education.png'),
  languages: require('../../assets/test-images/w-languages.png'),
};

/** A coach's portrait (4:5), or undefined: the card keeps its neutral silhouette. */
export const testPhoto = (name?: string | null) => (TEST_IMAGES && name ? people[name] : undefined);

/** The instructor profile hero: a wide scene where the prototype has one, else the portrait. */
export const testHero = (name?: string | null) =>
  TEST_IMAGES && name ? (heroes[name] ?? people[name]) : undefined;

/** A workshop or group banner (2:1) by discipline, then by category. */
export const testBanner = (discipline?: string | null, category?: string | null) =>
  TEST_IMAGES
    ? ((discipline ? byDiscipline[discipline] : undefined) ?? (category ? byCategory[category] : undefined))
    : undefined;
