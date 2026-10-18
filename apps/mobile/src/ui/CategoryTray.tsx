import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { component, motion, radius, space, touch, tray } from '@cfa/tokens';
import { useIsRTL } from '@/i18n';
import type { Category } from '@/theme/settings';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { Icon } from './Icon';
import { T } from './T';

export const CATEGORIES: Category[] = ['hobbies', 'sports', 'education', 'languages'];

const tr = component.tray;
const cb = component.categoryButton;

/** §6.2 trigger: glass capsule, top-right of Home, "Hobbies ⌄". */
export function CategoryButton({ category, onPress }: { category: Category; onPress: () => void }) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const name = t(`category.${category}`);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('category.trigger', { name })}
      onPress={onPress}
      hitSlop={(touch - tr.triggerHeight) / 2}
    >
      <Glass radius={radius.pill} interactive>
        <View style={styles.trigger}>
          <Icon name={category} size={cb.iconSize} color={c.glassLabel} />
          <T fit={1} variant="subheadline" weight="600" color={c.glassLabel}>
            {name}
          </T>
          <Icon name="chevronDown" size={cb.chevronSize} color={c.glassLabel} />
        </View>
      </Glass>
    </Pressable>
  );
}

function Radio({ on, reduceMotion }: { on: boolean; reduceMotion: boolean }) {
  const { c } = useTheme();
  const scale = useSharedValue(on ? 1 : 0);
  useEffect(() => {
    scale.set(reduceMotion ? (on ? 1 : 0) : withTiming(on ? 1 : 0, { duration: motion.trayDotMs }));
  }, [on, reduceMotion, scale]);
  const dot = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <View
      style={[
        styles.radio,
        on
          ? { borderWidth: tr.radioBorderOn, borderColor: c.label }
          : { borderWidth: tr.radioBorderOff, borderColor: c.separator },
      ]}
    >
      <Animated.View style={[styles.dot, { backgroundColor: c.label }, dot]} />
    </View>
  );
}

type Props = {
  visible: boolean;
  selected: Category;
  /** Called ~0.25 s after a row is tapped, as the tray closes. */
  onSelect: (category: Category) => void;
  onClose: () => void;
};

const OFFSCREEN = 1000;

/**
 * §6.2 Category tray: the only way to change category. A solid surface card (deliberately not glass)
 * that springs up over a 0.45 dim, with a radio group of the four categories.
 */
export function CategoryTray({ visible, selected, onSelect, onClose }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const { reduceMotion } = useA11y();
  const rtl = useIsRTL();
  const [mounted, setMounted] = useState(visible);
  const [pending, setPending] = useState(selected);
  const closing = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dim = useSharedValue(0);
  const lift = useSharedValue(OFFSCREEN);
  const fade = useSharedValue(0);

  // Reset when (re)opened: adjust state during render rather than in an effect (react.dev, "you might not need an effect").
  const [wasVisible, setWasVisible] = useState(visible);
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) {
      setPending(selected);
      setMounted(true);
    }
  }

  useEffect(() => {
    if (!mounted) return;
    if (visible) {
      dim.set(withTiming(1, { duration: motion.trayDimMs }));
      if (reduceMotion) {
        lift.set(0);
        fade.set(withTiming(1, { duration: motion.trayDimMs }));
      } else {
        fade.set(1);
        lift.set(withSpring(0, { duration: motion.traySpringMs, dampingRatio: tr.springDamping }));
      }
    } else {
      const done = (finished?: boolean) => {
        'worklet';
        if (finished) scheduleOnRN(setMounted, false);
      };
      dim.set(withTiming(0, { duration: motion.trayDimMs }, done));
      if (reduceMotion) fade.set(withTiming(0, { duration: motion.trayDimMs }));
      else lift.set(withTiming(OFFSCREEN, { duration: motion.trayDimMs }));
    }
  }, [visible, mounted, reduceMotion, dim, lift, fade]);

  useEffect(() => () => clearTimeout(closing.current), []);

  const choose = (category: Category) => {
    setPending(category);
    clearTimeout(closing.current);
    closing.current = setTimeout(() => {
      onSelect(category);
      onClose();
    }, motion.trayCloseDelayMs);
  };

  const swipe = Gesture.Pan()
    .onUpdate((e) => {
      lift.set(Math.max(0, e.translationY));
    })
    .onEnd((e) => {
      if (e.translationY > tr.dismissDistance || e.velocityY > tr.dismissVelocity) scheduleOnRN(onClose);
      else lift.set(withSpring(0, { duration: motion.traySpringMs, dampingRatio: tr.springDamping }));
    });

  const dimStyle = useAnimatedStyle(() => ({ opacity: dim.value }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: lift.value }],
  }));

  return (
    <Modal transparent visible={mounted} animationType="none" onRequestClose={onClose} statusBarTranslucent>
      {/* A Modal is a separate native root, so it needs the layout direction again (D26). */}
      <GestureHandlerRootView style={[StyleSheet.absoluteFill, { direction: rtl ? 'rtl' : 'ltr' }]}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: tray.dim }, dimStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessible={false}
            importantForAccessibility="no"
            testID="tray-dim"
          />
        </Animated.View>
        <GestureDetector gesture={swipe}>
          <Animated.View
            role="dialog"
            aria-modal
            accessibilityViewIsModal
            accessibilityLabel={t('category.trayTitle')}
            style={[styles.card, { backgroundColor: c.surface, boxShadow: tray.shadow }, cardStyle]}
          >
            <View style={styles.header}>
              <View style={styles.flex}>
                <T variant="title3" weight={tr.titleWeight} accessibilityRole="header">
                  {t('category.trayTitle')}
                </T>
                <T variant="footnote" color={c.label2}>
                  {t('category.traySubtitle')}
                </T>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('category.close')}
                onPress={onClose}
                hitSlop={(touch - tr.closeSize) / 2}
                style={styles.close}
              >
                <Icon name="close" size={tr.closeIconSize} color={c.label} />
              </Pressable>
            </View>
            <View style={[styles.hairline, { backgroundColor: c.separator }]} />
            <View accessibilityRole="radiogroup">
              {CATEGORIES.map((category, i) => {
                const on = category === pending;
                return (
                  <View key={category}>
                    {i > 0 && <View style={[styles.hairline, { backgroundColor: c.separator }]} />}
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityLabel={t(`category.${category}`)}
                      accessibilityState={{ checked: on }}
                      onPress={() => choose(category)}
                      style={styles.row}
                    >
                      <Icon name={category} size={tr.iconSize} color={c.label} />
                      <T
                        style={[styles.flex, styles.rowLabel]}
                        weight={tr.labelWeight}
                        accessibilityElementsHidden
                        importantForAccessibility="no"
                      >
                        {t(`category.${category}`).toUpperCase()}
                      </T>
                      <Radio on={on} reduceMotion={reduceMotion} />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: tr.triggerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: cb.gap,
    paddingStart: cb.padStart,
    paddingEnd: cb.padEnd,
  },
  card: {
    position: 'absolute',
    start: tr.inset,
    end: tr.inset,
    bottom: tr.inset,
    borderRadius: tr.radius,
    paddingTop: tr.padTop,
    paddingHorizontal: tr.padSide,
    paddingBottom: tr.padBottom,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: space.space3, paddingBottom: tr.headerGap },
  flex: { flex: 1 },
  close: { width: tr.closeSize, height: tr.closeSize, alignItems: 'center', justifyContent: 'center' },
  hairline: { height: StyleSheet.hairlineWidth },
  row: { minHeight: tr.rowHeight, flexDirection: 'row', alignItems: 'center', gap: tr.rowGap },
  rowLabel: { fontSize: tr.labelSize, letterSpacing: tr.labelTracking },
  radio: {
    width: tr.radioSize,
    height: tr.radioSize,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: tr.radioDot, height: tr.radioDot, borderRadius: radius.pill },
});
