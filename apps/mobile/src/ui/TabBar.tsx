import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { component, motion, radius, space } from '@cfa/tokens';
import { currentLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { Icon } from './Icon';
import { T } from './T';

export type TabKey = 'home' | 'explore' | 'bookings' | 'messages' | 'profile';
const TABS: TabKey[] = ['home', 'explore', 'bookings', 'messages', 'profile'];

/** Minimise on scroll down, restore on scroll up or at the top (§4.4 tabBarMinimizeBehavior onScrollDown). */
export function useMinimiseOnScroll(threshold = 8) {
  const [minimised, setMinimised] = useState(false);
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
    [threshold],
  );
  return { minimised, onScroll, restore: useCallback(() => setMinimised(false), []) };
}

type Props = {
  active: TabKey;
  onSelect: (tab: TabKey) => void;
  unreadMessages?: number;
  minimised?: boolean;
  onRestore?: () => void;
};

const tb = component.tabBar;

/** §4.4 floating glass tab bar (custom fallback; iOS 26 uses NativeTabs from Phase 1, design.md §7). */
export function TabBar({ active, onSelect, unreadMessages = 0, minimised = false, onRestore }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const { reduceMotion } = useA11y();
  const lang = currentLang();
  // Scale only: fading a parent of native glass breaks it (DECISIONS D20).
  const pop = reduceMotion ? undefined : ZoomIn.duration(motion.tabMinimiseMs);

  const label = (tab: TabKey) =>
    tab === 'messages' && unreadMessages > 0
      ? `${t('tabs.messages')}, ${t('tabs.unread', { count: formatNumber(unreadMessages, lang) })}`
      : t(`tabs.${tab}`);

  const content = (tab: TabKey, selected: boolean) => (
    <View style={styles.tabInner}>
      <View>
        <Icon name={tab} size={tb.iconSize} color={c.glassLabel} />
        {tab === 'messages' && unreadMessages > 0 && (
          // Glass carries no colour: the badge on glass is glass-label, not danger (§4.2, DS .glass .badge).
          <View style={[styles.badge, { backgroundColor: c.glassLabel }]}>
            <T variant="caption1" weight="700" color={c.bg}>
              {formatNumber(unreadMessages, lang)}
            </T>
          </View>
        )}
      </View>
      <T variant="caption1" weight={selected ? '700' : tb.labelWeight} color={c.glassLabel} numberOfLines={1}>
        {t(`tabs.${tab}`)}
      </T>
    </View>
  );

  if (minimised) {
    const jump: TabKey = active === 'messages' ? 'home' : 'messages';
    return (
      <Animated.View key="min" entering={pop} style={[styles.wrap, styles.minRow]}>
        <Pressable accessibilityRole="button" accessibilityLabel={label(active)} onPress={onRestore}>
          <Glass radius={radius.pill}>
            <View style={[styles.minTab, { backgroundColor: c.glassSelected }]}>
              <Icon name={active} size={tb.iconSize} color={c.glassLabel} />
              <T variant="subheadline" weight="600" color={c.glassLabel} numberOfLines={1}>
                {t(`tabs.${active}`)}
              </T>
            </View>
          </Glass>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={label(jump)} onPress={() => onSelect(jump)}>
          <Glass radius={radius.pill} style={styles.round}>
            <Icon name={jump} size={tb.iconSize} color={c.glassLabel} />
          </Glass>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View key="full" entering={pop} style={styles.wrap}>
      <Glass radius={radius.pill}>
        <View accessibilityRole="tablist" style={styles.bar}>
          {TABS.map((tab) => {
            const selected = tab === active;
            return (
              <Pressable
                key={tab}
                accessibilityRole="tab"
                accessibilityLabel={label(tab)}
                accessibilityState={{ selected }}
                onPress={() => onSelect(tab)}
                style={[styles.tab, selected && { backgroundColor: c.glassSelected }]}
              >
                {content(tab, selected)}
              </Pressable>
            );
          })}
        </View>
      </Glass>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', start: tb.inset, end: tb.inset, bottom: tb.aboveHomeIndicator },
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
