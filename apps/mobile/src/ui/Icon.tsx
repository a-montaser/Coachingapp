import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useIsRTL } from '@/i18n';

type Names = Extract<SymbolViewProps['name'], object>;

// §5: SF Symbols, non-circled, regular weight, filled only to show state. Android uses Material Symbols.
// Category icons per DECISIONS D10. Tab and utility icons are not named in the handoff (listed in the Phase 0 report).
const names = {
  hobbies: { ios: 'paintpalette', android: 'palette' },
  sports: { ios: 'tennisball', android: 'sports_tennis' },
  education: { ios: 'book', android: 'menu_book' },
  languages: { ios: 'bubble.left.and.bubble.right', android: 'forum' },
  home: { ios: 'house', android: 'home' },
  explore: { ios: 'magnifyingglass', android: 'search' },
  bookings: { ios: 'calendar', android: 'calendar_month' },
  messages: { ios: 'bubble.left', android: 'chat_bubble' },
  profile: { ios: 'person', android: 'person' },
  search: { ios: 'magnifyingglass', android: 'search' },
  back: { ios: 'chevron.backward', android: 'arrow_back' },
  forward: { ios: 'chevron.forward', android: 'chevron_right' },
  chevronDown: { ios: 'chevron.down', android: 'expand_more' },
  close: { ios: 'xmark', android: 'close' },
  clear: { ios: 'xmark.circle.fill', android: 'cancel' },
  heart: { ios: 'heart', android: 'favorite_border' },
  heartFill: { ios: 'heart.fill', android: 'favorite' },
  star: { ios: 'star.fill', android: 'star' },
  share: { ios: 'square.and.arrow.up', android: 'share' },
  more: { ios: 'ellipsis', android: 'more_horiz' },
  plus: { ios: 'plus', android: 'add' },
  minus: { ios: 'minus', android: 'remove' },
  check: { ios: 'checkmark', android: 'check' },
  family: { ios: 'person.2', android: 'group' },
  language: { ios: 'globe', android: 'language' },
  appearance: { ios: 'circle.lefthalf.filled', android: 'contrast' },
  signOut: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout' },
  clock: { ios: 'clock', android: 'schedule' },
  card: { ios: 'creditcard', android: 'credit_card' },
  pin: { ios: 'mappin.and.ellipse', android: 'location_on' },
  bell: { ios: 'bell', android: 'notifications' },
  // Disciplines, keyed by `disciplines.icon` (not named in the handoff; picked to match the canvas drawings).
  pottery: { ios: 'cup.and.saucer', android: 'emoji_food_beverage' },
  painting: { ios: 'paintbrush', android: 'brush' },
  photography: { ios: 'camera', android: 'photo_camera' },
  oud: { ios: 'guitars', android: 'music_note' },
  calligraphy: { ios: 'scribble', android: 'draw' },
  cooking: { ios: 'frying.pan', android: 'skillet' },
  chess: { ios: 'checkerboard.rectangle', android: 'chess' },
  dance: { ios: 'figure.dance', android: 'nightlife' },
  baking: { ios: 'birthday.cake', android: 'cake' },
  padel: { ios: 'figure.pickleball', android: 'sports_tennis' },
  tennis: { ios: 'tennis.racket', android: 'sports_tennis' },
  squash: { ios: 'figure.squash', android: 'sports_tennis' },
  swimming: { ios: 'figure.pool.swim', android: 'pool' },
  basketball: { ios: 'basketball', android: 'sports_basketball' },
  fitness: { ios: 'dumbbell', android: 'fitness_center' },
  boxing: { ios: 'figure.boxing', android: 'sports_mma' },
  football: { ios: 'soccerball', android: 'sports_soccer' },
  volleyball: { ios: 'volleyball', android: 'sports_volleyball' },
  golf: { ios: 'figure.golf', android: 'sports_golf' },
  maths: { ios: 'function', android: 'functions' },
  physics: { ios: 'atom', android: 'science' },
  chemistry: { ios: 'flask', android: 'science' },
  biology: { ios: 'leaf', android: 'eco' },
  coding: { ios: 'chevron.left.forwardslash.chevron.right', android: 'code' },
  sat: { ios: 'pencil.and.list.clipboard', android: 'quiz' },
  igcse: { ios: 'graduationcap', android: 'school' },
} satisfies Record<string, Names>;

export type IconName = keyof typeof names;

/** A discipline's `icon` column → an icon we draw, or null (languages show their code instead). */
export const disciplineIcon = (key: string | null): IconName | null =>
  key && key in names ? (key as IconName) : null;

// Direction is applied in JS (D26), so the system doesn't mirror symbols for us: flip directional ones.
// When native RTL arrives (Phase 1 dev build), iOS backward/forward symbols self-mirror: flip Android only then.
const directional = new Set<IconName>(['back', 'forward']);

type Props = { name: IconName; size: number; color: string };

export function Icon({ name, size, color }: Props) {
  const flip = useIsRTL() && directional.has(name);
  return (
    <SymbolView
      name={names[name]}
      size={size}
      tintColor={color}
      style={[{ width: size, height: size }, flip && { transform: [{ scaleX: -1 }] }]}
      accessible={false}
    />
  );
}
