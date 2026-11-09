import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { component, motion } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';

const cb = component.chatBubble;
const td = component.typingDots;

function Dot({ v }: { v: SharedValue<number> }) {
  const { c } = useTheme();
  const style = useAnimatedStyle(() => ({ opacity: 0.35 + 0.65 * v.value }));
  return <Animated.View style={[styles.dot, { backgroundColor: c.label2 }, style]} />;
}

/** §5, §8 Typing indicator: their bubble with three dots pulsing in sequence; still under Reduce Motion. */
export function TypingDots({ accessibilityLabel }: { accessibilityLabel: string }) {
  const { c } = useTheme();
  const { reduceMotion } = useA11y();
  const a = useSharedValue(1);
  const b = useSharedValue(1);
  const d = useSharedValue(1);
  useEffect(() => {
    const dots = [a, b, d];
    if (reduceMotion) return;
    dots.forEach((v, i) => {
      v.value = 0;
      v.value = withDelay(
        i * motion.typingStaggerMs,
        withRepeat(
          withSequence(
            withTiming(1, { duration: motion.typingPulseMs }),
            withTiming(0, { duration: motion.typingPulseMs }),
          ),
          -1,
        ),
      );
    });
    return () => dots.forEach((v) => cancelAnimation(v));
  }, [a, b, d, reduceMotion]);
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityLiveRegion="polite"
      style={[styles.bubble, { backgroundColor: c.surface2, borderBottomStartRadius: cb.tail }]}
    >
      <Dot v={a} />
      <Dot v={b} />
      <Dot v={d} />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: td.gap,
    borderRadius: cb.radius,
    paddingHorizontal: cb.padH,
    paddingVertical: cb.padH,
  },
  dot: { width: td.size, height: td.size, borderRadius: td.size / 2 },
});
