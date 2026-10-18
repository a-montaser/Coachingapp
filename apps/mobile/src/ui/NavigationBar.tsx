import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, motion, radius, space } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { type IconName } from './Icon';
import { IconButton } from './IconButton';
import { T } from './T';

/** An icon action, or a text action such as "Skip" when `icon` is left out. */
export type NavAction = { icon?: IconName; label: string; onPress: () => void };

type Props = {
  /** Shown inline only on hero detail screens once the hero scrolls away (`titleAfterHero`). */
  title?: string;
  onBack?: () => void;
  /** Up to two (§4.4); extras are dropped. They share one glass cluster. */
  actions?: NavAction[];
  /** Scroll offset of the screen's content; drives the hero title fade. */
  scrollY?: SharedValue<number>;
  /** Detail screens with a hero: the inline title appears once the hero scrolls away (~150 pt). */
  titleAfterHero?: boolean;
};

const n = component.navBar;

/**
 * Canvas Instructor / Workshop artboards, DS NavigationBar: back is its own glass circle; trailing
 * actions share ONE glass cluster with a hairline divider (never two glass circles side by side).
 * Both float 16 pt in from the sides over the content, under a scroll-edge fade.
 */
export function NavigationBar({ title, onBack, actions: allActions = [], scrollY, titleAfterHero }: Props) {
  const actions = allActions.slice(0, 2);
  const { c } = useTheme();
  const { t } = useTranslation();
  const { reduceMotion } = useA11y();
  const insets = useSafeAreaInsets();
  const showTitle = Boolean(title && titleAfterHero && scrollY);

  const titleStyle = useAnimatedStyle(() => {
    if (!scrollY) return { opacity: 0 };
    const p = interpolate(
      scrollY.value,
      [n.titleFadeAfter - n.fadeHeight / 3, n.titleFadeAfter],
      [0, 1],
      'clamp',
    );
    return { opacity: p, transform: [{ translateY: reduceMotion ? 0 : (1 - p) * motion.navTitleRise }] };
  });

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: scrollY
      ? interpolate(scrollY.value, [n.titleFadeAfter - n.fadeHeight / 3, n.titleFadeAfter], [0, 1], 'clamp')
      : 1,
  }));

  return (
    <>
      {/* Scroll-edge fade (§4.4). shortcut: gradient only, no 8 pt blur yet; add if it reads too hard on device. */}
      {/* Over a hero the fade waits until the hero has scrolled away, so it doesn't wash the photo. */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.fade,
          {
            height: insets.top + n.fadeHeight,
            experimental_backgroundImage: `linear-gradient(${c.bg}, transparent)`,
          },
          titleAfterHero && fadeStyle,
        ]}
      />
      <View pointerEvents="box-none" style={[styles.row, { top: insets.top + n.top }]}>
        <View style={styles.side}>
          {onBack && (
            <IconButton icon="back" accessibilityLabel={t('common.back')} floating onPress={onBack} />
          )}
        </View>
        <View pointerEvents="none" style={styles.title}>
          {showTitle && (
            // Repeats the page's own heading once the hero scrolls away: visual only, so screen readers hear it once.
            <Animated.View
              style={titleStyle}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <T variant="headline" numberOfLines={1}>
                {title}
              </T>
            </Animated.View>
          )}
        </View>
        <View style={[styles.side, styles.end]}>
          {actions.length > 0 && (
            <Glass radius={radius.pill}>
              <View style={styles.cluster}>
                {actions.map((a, i) => (
                  <Fragment key={a.label}>
                    {i > 0 && <View style={[styles.hairline, { backgroundColor: c.separator }]} />}
                    {a.icon ? (
                      <IconButton
                        icon={a.icon}
                        accessibilityLabel={a.label}
                        onPress={a.onPress}
                        color={c.glassLabel}
                      />
                    ) : (
                      <Pressable accessibilityRole="button" onPress={a.onPress} style={styles.textAction}>
                        <T variant="headline" weight="400" color={c.glassLabel}>
                          {a.label}
                        </T>
                      </Pressable>
                    )}
                  </Fragment>
                ))}
              </View>
            </Glass>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fade: { position: 'absolute', top: 0, start: 0, end: 0 },
  row: {
    position: 'absolute',
    start: n.inset,
    end: n.inset,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.space2,
  },
  side: { minWidth: component.iconButton.size, flexDirection: 'row' },
  end: { justifyContent: 'flex-end' },
  title: { flex: 1, alignItems: 'center' },
  cluster: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: n.clusterPadding },
  hairline: { width: n.hairlineWidth, height: n.hairlineHeight },
  textAction: {
    minHeight: component.iconButton.size,
    paddingHorizontal: space.space4,
    justifyContent: 'center',
  },
});
