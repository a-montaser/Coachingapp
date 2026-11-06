import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { create } from 'zustand';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, homeIndicator, motion, radius, space } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass, GlassGroup, glassMode, liquidAvailable } from './Glass';
import { GlassLens, useGlassLens } from './GlassLens';
import { T } from './T';
import { TAB_ICON } from './tabIcons';

export type TabKey = 'home' | 'explore' | 'bookings' | 'messages' | 'profile';
const TABS: TabKey[] = ['home', 'explore', 'bookings', 'messages', 'profile'];

/** The app's tab bar state: tab screens report their scroll here, the (tabs) layout reads it. */
const useTabBarStore = create<{ minimised: boolean; setMinimised: (m: boolean) => void }>()((set) => ({
  minimised: false,
  setMinimised: (minimised) => set({ minimised }),
}));
export const useTabBarMinimised = () => useTabBarStore((s) => s.minimised);
export const restoreTabBar = () => useTabBarStore.getState().setMinimised(false);

/**
 * Minimise on scroll down, restore on scroll up or at the top (§4.4 tabBarMinimizeBehavior onScrollDown).
 * `shared`: drive the app's tab bar (tab screens); otherwise local state (the gallery demo).
 */
export function useMinimiseOnScroll(threshold = 8, shared = false) {
  const [local, setLocal] = useState(false);
  const sharedValue = useTabBarStore((s) => s.minimised);
  const setShared = useTabBarStore((s) => s.setMinimised);
  const setMinimised = shared ? setShared : setLocal;
  const minimised = shared ? sharedValue : local;
  const last = useRef(0);
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      if (y <= 0) {
        last.current = 0;
        setMinimised(false);
        return;
      }
      const dy = y - last.current;
      if (Math.abs(dy) < threshold) return;
      last.current = y;
      setMinimised(dy > 0);
    },
    [threshold, setMinimised],
  );
  return { minimised, onScroll, restore: useCallback(() => setMinimised(false), [setMinimised]) };
}

type Props = {
  active: TabKey;
  onSelect: (tab: TabKey) => void;
  unreadMessages?: number;
  minimised?: boolean;
  onRestore?: () => void;
};

const tb = component.tabBar;

/** The prototype's tab icon (D48), tinted like the label. */
const TabIcon = ({ tab, color }: { tab: TabKey; color: string }) => (
  <Image
    source={TAB_ICON[tab]}
    style={{ width: tb.iconSize, height: tb.iconSize, tintColor: color }}
    accessibilityIgnoresInvertColors
  />
);

/**
 * Distance from the screen's bottom edge to the tab bar: §4.4 "26 pt above the home indicator"
 * (DECISIONS D25). iOS: above the indicator's top (39 pt on an iPhone 16 Pro); no indicator: 26 pt.
 * Android: above the gesture or button bar, which is the bottom inset.
 */
export function useTabBarBottom() {
  const { bottom } = useSafeAreaInsets();
  const indicatorTop =
    Platform.OS === 'ios' ? (bottom > 0 ? homeIndicator.fromBottom + homeIndicator.height : 0) : bottom;
  return indicatorTop + tb.aboveHomeIndicator;
}

/** §4.4 floating glass tab bar (prototype "Shared · Floating glass tab bar"), on iOS and Android (D43). */
export function TabBar({ active, onSelect, unreadMessages = 0, minimised = false, onRestore }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const { reduceMotion } = useA11y();
  const lang = useLang();
  const bottom = useTabBarBottom();
  const { reduceTransparency } = useA11y();
  const liquid = glassMode(Platform.OS, liquidAvailable(), reduceTransparency) === 'liquid';
  // The iOS 26 lens under the finger (D49): swells, follows a drag, springs onto the tab let go on.
  const lens = useGlassLens({
    count: TABS.length,
    index: TABS.indexOf(active),
    inset: tb.padding,
    onChange: (i) => onSelect(TABS[i]!),
  });
  // Scale only: fading a parent of native glass breaks it (DECISIONS D20).
  const pop = reduceMotion ? undefined : ZoomIn.duration(motion.tabMinimiseMs);

  const label = (tab: TabKey) =>
    tab === 'messages' && unreadMessages > 0
      ? `${t('tabs.messages')}, ${t('tabs.unread', { count: formatNumber(unreadMessages, lang) })}`
      : t(`tabs.${tab}`);

  const content = (tab: TabKey, selected: boolean) => (
    <View style={styles.tabInner}>
      <View>
        <TabIcon tab={tab} color={c.glassLabel} />
        {tab === 'messages' && unreadMessages > 0 && (
          // Glass carries no colour: the badge on glass is glass-label, not danger (§4.2, DS .glass .badge).
          <View style={[styles.badge, { backgroundColor: c.glassLabel }]}>
            <T variant="caption1" weight="700" color={c.bg}>
              {formatNumber(unreadMessages, lang)}
            </T>
          </View>
        )}
      </View>
      <T variant="caption1" weight={selected ? '700' : tb.labelWeight} color={c.glassLabel} fit={1}>
        {t(`tabs.${tab}`)}
      </T>
    </View>
  );

  if (minimised) {
    const jump: TabKey = active === 'messages' ? 'home' : 'messages';
    return (
      <Animated.View key="min" entering={pop} style={[styles.wrap, { bottom }, styles.minRow]}>
        <Pressable accessibilityRole="button" accessibilityLabel={label(active)} onPress={onRestore}>
          <Glass radius={radius.pill} interactive>
            <View style={[styles.minTab, { backgroundColor: c.glassSelected }]}>
              <TabIcon tab={active} color={c.glassLabel} />
              <T variant="subheadline" weight="600" color={c.glassLabel} fit={1}>
                {t(`tabs.${active}`)}
              </T>
            </View>
          </Glass>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={label(jump)} onPress={() => onSelect(jump)}>
          <Glass radius={radius.pill} interactive style={styles.round}>
            <TabIcon tab={jump} color={c.glassLabel} />
          </Glass>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View key="full" entering={pop} style={[styles.wrap, { bottom }]}>
      {/* iOS 26: a still glass bar; the selection is its own interactive glass lens that blends with
          the bar (GlassEffectContainer) and slides between tabs. */}
      <GlassGroup spacing={tb.padding * 2}>
        <Glass radius={radius.pill}>
          <GestureDetector gesture={lens.gesture}>
            <View testID="tab-bar" accessibilityRole="tablist" style={styles.bar} onLayout={lens.onLayout}>
              <GlassLens
                lens={lens}
                radius={radius.pill}
                top={tb.padding}
                bottom={tb.padding}
                liquid={liquid}
                fill={liquid ? undefined : c.glassSelected}
              />
              {TABS.map((tab) => {
                const selected = tab === active;
                return (
                  // Touch is the lens's gesture; the Pressable keeps VoiceOver and Switch Control activation.
                  <Pressable
                    key={tab}
                    accessibilityRole="tab"
                    accessibilityLabel={label(tab)}
                    accessibilityState={{ selected }}
                    onPress={() => onSelect(tab)}
                    style={styles.tab}
                  >
                    {content(tab, selected)}
                  </Pressable>
                );
              })}
            </View>
          </GestureDetector>
        </Glass>
      </GlassGroup>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', start: tb.inset, end: tb.inset },
  bar: { flexDirection: 'row', minHeight: tb.height, padding: tb.padding },
  tab: { flex: 1, borderRadius: radius.pill, minHeight: tb.tabHeight, justifyContent: 'center' },
  tabInner: { alignItems: 'center', gap: space.space1 / 2, paddingHorizontal: space.space1 },
  badge: {
    position: 'absolute',
    top: tb.badgeTop,
    start: tb.iconSize / 2 + tb.badgeFromCentre,
    minWidth: tb.badgeSize,
    height: tb.badgeSize,
    paddingHorizontal: tb.badgePadding,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  minTab: {
    minHeight: tb.miniHeight,
    paddingStart: tb.miniPadStart,
    paddingEnd: tb.miniPadEnd,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.space2,
  },
  round: { width: tb.miniHeight, height: tb.miniHeight, alignItems: 'center', justifyContent: 'center' },
});
