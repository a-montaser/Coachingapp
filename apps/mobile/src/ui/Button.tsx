import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space, touch } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { T } from './T';

export type ButtonVariant = 'primary' | 'secondary' | 'plain' | 'destructive' | 'destructiveFilled';

type Props = {
  /** Name the outcome: "Book a session", "Pay 585 EGP" (§5, §11). */
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'regular' | 'small';
  disabled?: boolean;
  /** Inline spinner, e.g. "Processing" on Review & pay (§7.9). */
  busy?: boolean;
  accessibilityHint?: string;
};

const b = component.button;

export function Button({
  label,
  onPress,
  variant = 'plain',
  size = 'regular',
  disabled = false,
  busy = false,
  accessibilityHint,
}: Props) {
  const { c } = useTheme();
  const small = size === 'small';
  const height = small ? b.smallHeight : b.height;
  const inactive = disabled || busy;
  const glass = !disabled && (variant === 'primary' || variant === 'secondary');

  const color = disabled
    ? c.label3
    : variant === 'primary'
      ? c.glassTintLabel
      : variant === 'secondary'
        ? c.glassLabel
        : variant === 'plain'
          ? c.label
          : c.danger;
  const fill = disabled || variant === 'plain' || variant === 'destructiveFilled' ? c.surface2 : undefined;

  const content = (
    <View
      style={[styles.content, { minHeight: height, paddingHorizontal: small ? b.smallPadding : b.padding }]}
    >
      {busy && <ActivityIndicator color={color} />}
      <T
        variant={small ? 'subheadline' : 'headline'}
        weight={variant === 'primary' ? component.glass.prominentWeight : b.weight}
        color={color}
        style={styles.label}
      >
        {label}
      </T>
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy }}
      disabled={inactive}
      onPress={onPress}
      hitSlop={(touch - height) / 2 > 0 ? (touch - height) / 2 : undefined}
      style={({ pressed }) => [
        !glass && { backgroundColor: fill, borderRadius: radius.pill },
        pressed && !glass && styles.pressed,
      ]}
    >
      {glass ? (
        <Glass radius={radius.pill} prominent={variant === 'primary'}>
          {content}
        </Glass>
      ) : (
        content
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.space2 },
  label: { textAlign: 'center' },
  // Never dim glass itself (expo-glass-effect: opacity < 1 breaks the material); plain fills only.
  pressed: { opacity: 0.7 },
});
