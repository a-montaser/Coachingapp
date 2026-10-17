import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';

type Props = {
  icon: IconName;
  /** Required: icon-only buttons are always labelled (§5, §12). */
  accessibilityLabel: string;
  onPress: () => void;
  /** Glass when it floats over content (§5). */
  floating?: boolean;
  /** Variant of the clear glass over photos and maps. */
  overMedia?: boolean;
  color?: string;
  disabled?: boolean;
};

const size = component.iconButton.size;

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  floating,
  overMedia,
  color,
  disabled,
}: Props) {
  const { c } = useTheme();
  const glyph = (
    <Icon
      name={icon}
      size={component.iconButton.iconSize}
      color={color ?? (floating ? c.glassLabel : c.label)}
    />
  );
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
    >
      {floating ? (
        <Glass radius={radius.pill} variant={overMedia ? 'clear' : 'regular'} style={styles.box}>
          {glyph}
        </Glass>
      ) : (
        <View style={styles.box}>{glyph}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: size,
    height: size,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
