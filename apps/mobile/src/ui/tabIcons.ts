import type { ImageSourcePropType } from 'react-native';
import type { TabKey } from './TabBar';

/**
 * The prototype's own tab icons ("Shared · Floating glass tab bar": 22 pt outline strokes, 1.8 wide,
 * round caps), drawn black on transparent so they can be tinted: iOS's native tab bar as template
 * images, the floating TabBar with `tintColor` (D48).
 */
export const TAB_ICON: Record<TabKey, ImageSourcePropType> = {
  home: require('../../assets/tab-icons/tab-home.png'),
  explore: require('../../assets/tab-icons/tab-explore.png'),
  bookings: require('../../assets/tab-icons/tab-bookings.png'),
  messages: require('../../assets/tab-icons/tab-messages.png'),
  profile: require('../../assets/tab-icons/tab-profile.png'),
};
