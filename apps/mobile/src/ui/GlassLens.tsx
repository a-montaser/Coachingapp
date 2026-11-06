import { useEffect, useState } from 'react';
import { StyleSheet, type LayoutChangeEvent } from 'react-native';
import { Gesture, type ComposedGesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { motion } from '@cfa/tokens';
import { useIsRTL } from '@/i18n';
import { useA11y } from '@/theme/useA11y';
import { Glass } from './Glass';

type Lens = {
  /** Put on the track (a GestureDetector's child) to learn its width. */
  onLayout: (e: LayoutChangeEvent) => void;
  gesture: ComposedGesture;
  /** One segment's width; 0 until the track is laid out. */
  width: number;
  pos: SharedValue<number>;
  goal: SharedValue<number>;
  pressed: SharedValue<number>;
};

/**
 * The iOS 26 selection lens (D49), shared by the tab bar and the segmented control: touching swells it
 * and moves it under the finger, a drag carries it across (stretching as it travels, squashing a
 * little), and letting go springs it onto that segment and selects it. A scroll that starts on the
 * track lets it fall back. Reduce Motion: no swell or stretch, and it moves without a spring.
 */
export function useGlassLens({
  count,
  index,
  inset,
  onChange,
}: {
  count: number;
  index: number;
  /** The track's padding: the lens's left edge at segment 0. */
  inset: number;
  onChange: (index: number) => void;
}): Lens {
  const { reduceMotion } = useA11y();
  // Segments run right-to-left in Arabic (JS RTL, D26); the lens works in physical slots.
  const rtl = useIsRTL();
  const [track, setTrack] = useState(0);
  const width = track > 0 ? (track - inset * 2) / count : 0;
  const slot = rtl ? count - 1 - index : index;
  const pos = useSharedValue(inset + slot * width);
  const goal = useSharedValue(inset + slot * width);
  const pressed = useSharedValue(0);
  const current = useSharedValue(slot);
  const chosen = useSharedValue(false);

  // The selection changed from outside (or after a release): settle on it.
  useEffect(() => {
    const x = inset + slot * width;
    current.set(slot);
    goal.set(x);
    pos.set(reduceMotion || width === 0 ? x : withSpring(x, motion.lensSpring));
  }, [slot, width, inset, reduceMotion, current, goal, pos]);

  const moveTo = (x: number, spring: { damping: number; stiffness: number; mass: number }) => {
    'worklet';
    goal.set(x);
    pos.set(reduceMotion ? x : withSpring(x, spring));
  };
  const at = (x: number) => {
    'worklet';
    return Math.min(count - 1, Math.max(0, Math.floor((x - inset) / width)));
  };
  const under = (x: number) => {
    'worklet';
    moveTo(Math.min(Math.max(x - width / 2, inset), inset + (count - 1) * width), motion.lensDragSpring);
  };
  const choose = (p: number) => {
    'worklet';
    chosen.set(true);
    current.set(p);
    moveTo(inset + p * width, motion.lensSpring);
    scheduleOnRN(onChange, rtl ? count - 1 - p : p);
  };
  const press = (on: boolean) => {
    'worklet';
    if (!reduceMotion) pressed.set(withSpring(on ? 1 : 0, motion.lensPressSpring));
  };

  const tap = Gesture.Tap()
    .maxDistance(10)
    .onEnd((e) => choose(at(e.x)));
  const pan = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-10, 10])
    .onBegin((e) => {
      chosen.set(false);
      press(true);
      under(e.x);
    })
    .onUpdate((e) => under(e.x))
    .onEnd((e) => choose(at(e.x)))
    .onFinalize(() => {
      press(false);
      // Neither a tap nor a drag (the touch became a scroll): back to the selection.
      if (!chosen.get()) moveTo(inset + current.get() * width, motion.lensSpring);
    });

  return {
    onLayout: (e) => setTrack(e.nativeEvent.layout.width),
    gesture: Gesture.Simultaneous(tap, pan),
    width,
    pos,
    goal,
    pressed,
  };
}

/**
 * The lens itself, drawn under the labels. On native Liquid Glass it is interactive glass; `fill` (a
 * resting thumb, e.g. the segmented control's surface) fades while touched so the glass shows through.
 * Without native glass the fill stays.
 */
export function GlassLens({
  lens,
  radius,
  top,
  bottom,
  liquid,
  fill,
  shadow,
}: {
  lens: Lens;
  radius: number;
  top: number;
  bottom: number;
  liquid: boolean;
  fill?: string;
  shadow?: string;
}) {
  const { pos, goal, pressed, width } = lens;
  const move = useAnimatedStyle(() => {
    const travel = width > 0 ? Math.min(Math.abs(goal.get() - pos.get()) / width, 1) : 0;
    const swell = pressed.get() * (motion.lensPressScale - 1);
    return {
      transform: [
        { translateX: pos.get() },
        { scaleX: 1 + swell + travel * motion.lensStretch },
        { scaleY: 1 + swell - travel * motion.lensSquash },
      ],
    };
  });
  // Opacity on a plain View only: fading a parent of native glass breaks it (D20).
  const rest = useAnimatedStyle(() => ({ opacity: liquid ? 1 - pressed.get() : 1 }));
  if (width === 0) return null;
  return (
    <Animated.View pointerEvents="none" style={[styles.lens, { top, bottom, width }, move]}>
      {liquid && <Glass radius={radius} interactive style={styles.fill} />}
      {fill && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: radius, backgroundColor: fill, boxShadow: shadow },
            rest,
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // A physical left edge: the slot already accounts for right-to-left.
  lens: { position: 'absolute', left: 0 },
  fill: { flex: 1 },
});
