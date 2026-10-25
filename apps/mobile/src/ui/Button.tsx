import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space, touch } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass, glassMode, liquidAvailable } from './Glass';
import { T } from './T';

export type ButtonVariant = 'primary' | 'secondary' | 'plain' | 'destructive' | 'destructiveFilled';

type Props = {
  /** Name the outcome: "Book a session", "Pay 585 EGP" (§5, §11). */
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'regular' | 'small';
  disabled?: boolean;
  /** Shown under a disabled button: why it can't be used yet, e.g. "Pick a time to continue" (DS Button). */
  reason?: string;
  /** Inline spinner, e.g. "Processing" on Review & pay (§7.9). */
  busy?: boolean;
  accessibilityHint?: string;
  /** Glass over a photo or a dark hero (Welcome's Sign in): clear glass and a light label, so it stays legible. */
  overMedia?: boolean;
};

const b = component.button;

export function Button({
  label,
  onPress,
  variant = 'plain',
  size = 'regular',
  disabled = false,
  reason,
  busy = false,
  accessibilityHint,
  overMedia = false,
}: Props) {
  const { c, shadow } = useTheme();
  const small = size === 'small';
  const height = small ? b.smallHeight : b.height;
  const inactive = disabled || busy;
  // Owner revision (D55): solid, clearly different kinds of button; glass only over photos and heroes.
  const glass = !disabled && overMedia && (variant === 'primary' || variant === 'secondary');
  const { reduceTransparency } = useA11y();
  // Over media the label goes light only while the glass is see-through; the solid frosted fallback
  // (Reduce Transparency, Android) keeps the normal glass label.
  const seeThrough = glassMode(Platform.OS, liquidAvailable(), reduceTransparency) !== 'frosted';

  const color = disabled
    ? c.label3
    : glass
      ? seeThrough
        ? c.onBrand
        : c.glassLabel
      : variant === 'primary'
        ? c.onBrand
        : variant === 'secondary' || variant === 'plain'
          ? c.brandText
          : c.danger;
  const fill = disabled
    ? c.surface2
    : variant === 'primary'
      ? c.brand
      : variant === 'plain' || variant === 'destructiveFilled'
        ? c.surface2
        : undefined;
  const outline = !disabled && !glass && variant === 'secondary';

  const content = (
    <View
      style={[styles.content, { minHeight: height, paddingHorizontal: small ? b.smallPadding : b.padding }]}
    >
      {busy && <ActivityIndicator color={color} />}
      <T
        fit={2}
        variant={small ? 'subheadline' : 'headline'}
        weight={variant === 'primary' ? b.primaryWeight : b.weight}
        color={color}
        style={styles.label}
      >
        {label}
      </T>
    </View>
  );

  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={disabled && reason ? reason : accessibilityHint}
      accessibilityState={{ disabled: inactive, busy }}
      disabled={inactive}
      onPress={onPress}
      hitSlop={(touch - height) / 2 > 0 ? (touch - height) / 2 : undefined}
      style={({ pressed }) => [
        !glass && { backgroundColor: fill, borderRadius: radius.pill },
        outline && { borderWidth: b.outline, borderColor: c.brandText },
        !glass && !disabled && variant === 'primary' && { boxShadow: shadow.primary },
        pressed && !glass && styles.pressed,
      ]}
    >
      {glass ? (
        <Glass
          radius={radius.pill}
          prominent={variant === 'primary'}
          variant={overMedia ? 'clear' : 'regular'}
          interactive
        >
          {content}
        </Glass>
      ) : (
        content
      )}
    </Pressable>
  );
  if (!disabled || !reason) return button;
  return (
    <View>
      {button}
      {/* Announced through the button's hint, so hidden from the screen reader here. */}
      <T
        variant="footnote"
        color={c.label2}
        style={styles.reason}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {reason}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.space2 },
  label: { textAlign: 'center' },
  reason: { textAlign: 'center', marginTop: b.reasonGap },
  // Never dim glass itself (expo-glass-effect: opacity < 1 breaks the material); plain fills only.
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});
