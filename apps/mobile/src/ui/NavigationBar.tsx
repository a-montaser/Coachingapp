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
  title: string;
  onBack?: () => void;
  /** Up to two (§4.4); extras are dropped. */
  actions?: NavAction[];
  /** Scroll offset of the screen's content; drives the edge fade and the hero title fade. */
  scrollY?: SharedValue<number>;
  /** Detail screens with a hero: the title appears once the hero scrolls away (~150 pt). */
  titleAfterHero?: boolean;
};

const n = component.navBar;

/** §4.4 Navigation bar: one glass capsule floating 12 pt in from the sides. */
export function NavigationBar({ title, onBack, actions: allActions = [], scrollY, titleAfterHero }: Props) {
  const actions = allActions.slice(0, 2);
  const { c } = useTheme();
  const { t } = useTranslation();
  const { reduceMotion } = useA11y();
  const insets = useSafeAreaInsets();

  const titleStyle = useAnimatedStyle(() => {
    if (!titleAfterHero || !scrollY) return { opacity: 1 };
    const p = interpolate(
      scrollY.value,
      [n.titleFadeAfter - n.fadeHeight / 3, n.titleFadeAfter],
      [0, 1],
      'clamp',
    );
    return { opacity: p, transform: [{ translateY: reduceMotion ? 0 : (1 - p) * motion.navTitleRise }] };
  });

  const hairline = <View style={[styles.hairline, { backgroundColor: c.separator }]} />;

  return (
    <>
      {/* Scroll-edge fade (§4.4). shortcut: gradient only, no 8 pt blur yet; add if it reads too hard on device. */}
      <View
        pointerEvents="none"
        style={[
          styles.fade,
          {
            height: insets.top + n.fadeHeight,
            experimental_backgroundImage: `linear-gradient(${c.bg}, transparent)`,
          },
        ]}
      />
      <View style={[styles.wrap, { top: insets.top }]}>
        <Glass radius={radius.pill}>
          <View style={styles.row}>
            <View style={styles.slot}>
              {onBack && <IconButton icon="back" accessibilityLabel={t('common.back')} onPress={onBack} />}
            </View>
            <Animated.View style={[styles.title, titleStyle]}>
              <T variant="headline" color={c.glassLabel} numberOfLines={1} accessibilityRole="header">
                {title}
              </T>
            </Animated.View>
            <View style={styles.actions}>
              {actions.length === 0 && <View style={styles.slot} />}
              {actions.map((a, i) => (
                <Fragment key={a.label}>
                  {i > 0 && hairline}
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
          </View>
        </Glass>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fade: { position: 'absolute', top: 0, start: 0, end: 0 },
  wrap: { position: 'absolute', start: n.inset, end: n.inset },
  row: { minHeight: n.height, padding: n.padding, flexDirection: 'row', alignItems: 'center' },
  slot: { minWidth: component.iconButton.size },
  textAction: {
    minHeight: component.iconButton.size,
    minWidth: component.iconButton.size,
    paddingHorizontal: space.space3,
    justifyContent: 'center',
  },
  title: { flex: 1, alignItems: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  hairline: { width: n.hairlineWidth, height: n.hairlineHeight },
});
