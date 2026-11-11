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
  /** For the end-to-end journey (Maestro). */
  testID?: string;
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
  testID,
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
      testID={testID}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
    >
      {floating ? (
        <Glass radius={radius.pill} variant={overMedia ? 'clear' : 'regular'} interactive style={styles.box}>
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
