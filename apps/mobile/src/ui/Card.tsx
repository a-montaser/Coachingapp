import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { radius } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
};

/** Solid content surface, radius 20, soft purple shadow (owner revision D55; §4.1 content is never glass). */
export function Card({ children, style, onPress, accessibilityLabel }: Props) {
  const { c, shadow } = useTheme();
  // The shadow sits on the outer view; the inner one clips photos to the card's corners.
  const look = [styles.card, { backgroundColor: c.surface, boxShadow: shadow.card }];
  const inner = <View style={[styles.clip, style]}>{children}</View>;
  if (!onPress) return <View style={look}>{inner}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [look, pressed && styles.pressed]}
    >
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md },
  clip: { borderRadius: radius.md, overflow: 'hidden' },
  pressed: { opacity: 0.85 },
});
