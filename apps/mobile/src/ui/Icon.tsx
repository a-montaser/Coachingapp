import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { I18nManager, Platform } from 'react-native';

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
  check: { ios: 'checkmark', android: 'check' },
} satisfies Record<string, Names>;

export type IconName = keyof typeof names;

// iOS "backward/forward" symbols mirror themselves in RTL; Material ones need flipping.
const directional = new Set<IconName>(['back', 'forward']);

type Props = { name: IconName; size: number; color: string };

export function Icon({ name, size, color }: Props) {
  const flip = Platform.OS !== 'ios' && I18nManager.isRTL && directional.has(name);
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
