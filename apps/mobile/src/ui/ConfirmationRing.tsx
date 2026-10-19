import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { component, motion } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';

const r = component.confirmRing;

/**
 * §5, §8 confirmation: a gold ring, then the tick (0.8 s, then 0.45 s). Without an SVG renderer the
 * ring grows into place rather than tracing its stroke. Reduce Motion: shown complete, no animation.
 */
export function ConfirmationRing({ label }: { label: string }) {
  const { c } = useTheme();
  const { reduceMotion } = useA11y();
  const ring = useSharedValue(reduceMotion ? 1 : 0);
  const tick = useSharedValue(reduceMotion ? 1 : 0);
  useEffect(() => {
    if (reduceMotion) return;
    ring.value = withTiming(1, { duration: motion.ringDrawMs, easing: Easing.out(Easing.cubic) });
    tick.value = withDelay(
      motion.ringDrawMs,
      withTiming(1, { duration: motion.tickMs, easing: Easing.out(Easing.back(2)) }),
    );
  }, [reduceMotion, ring, tick]);
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.6 + 0.4 * ring.value }],
    opacity: ring.value,
  }));
  const tickStyle = useAnimatedStyle(() => ({ transform: [{ scale: tick.value }] }));
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={label} style={styles.box}>
      <Animated.View style={[styles.ring, { borderColor: c.gold }, ringStyle]} />
      <Animated.View style={tickStyle}>
        <Icon name="check" size={r.tickSize} color={c.gold} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: r.size, height: r.size, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: r.size,
    height: r.size,
    borderRadius: r.size / 2,
    borderWidth: r.stroke,
  },
});
