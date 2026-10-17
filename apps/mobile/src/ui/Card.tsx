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

/** Solid content surface, radius 20, no shadow (§3.2 shadow-card: none; §4.1 content is never glass). */
export function Card({ children, style, onPress, accessibilityLabel }: Props) {
  const { c } = useTheme();
  const look = [styles.card, { backgroundColor: c.surface }, style];
  if (!onPress) return <View style={look}>{children}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [look, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, overflow: 'hidden' },
  pressed: { opacity: 0.85 },
});
