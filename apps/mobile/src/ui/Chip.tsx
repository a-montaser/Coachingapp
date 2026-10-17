import { Pressable, StyleSheet } from 'react-native';
import { component, radius, touch } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

type Props = {
  label: string;
  onPress: () => void;
  selected?: boolean;
  /** "Filters · N": surface with a hairline (§5). */
  outlined?: boolean;
};

const chip = component.chip;

export function Chip({ label, onPress, selected = false, outlined = false }: Props) {
  const { c } = useTheme();
  const bg = selected ? c.brand : outlined ? c.surface : c.surface2;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      hitSlop={(touch - chip.height) / 2}
      style={[
        styles.chip,
        { backgroundColor: bg },
        outlined && !selected && { borderWidth: chip.outline, borderColor: c.separator },
      ]}
    >
      <T variant="subheadline" weight={chip.weight} color={selected ? c.onBrand : c.label}>
        {label}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: chip.height,
    paddingHorizontal: chip.padding,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
