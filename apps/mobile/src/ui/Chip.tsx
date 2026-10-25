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
  /** One choice in a set (a level per interest): a radio for VoiceOver. */
  radio?: boolean;
  accessibilityLabel?: string;
  /** e.g. a full time on a Group page: shown, but can't be chosen. */
  disabled?: boolean;
};

const chip = component.chip;

export function Chip({
  label,
  onPress,
  selected = false,
  radio = false,
  accessibilityLabel,
  disabled = false,
}: Props) {
  const { c } = useTheme();
  // Owner revision (D55): white with a hairline at rest, filled aubergine when chosen (prototype .chip).
  const bg = selected ? c.brand : c.bg;
  return (
    <Pressable
      accessibilityRole={radio ? 'radio' : 'button'}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={radio ? { checked: selected, disabled } : { selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={(touch - chip.height) / 2}
      style={[
        styles.chip,
        { backgroundColor: bg },
        !selected && { borderWidth: chip.outline, borderColor: c.separator },
      ]}
    >
      <T
        fit={1}
        variant="subheadline"
        weight={chip.weight}
        color={selected ? c.onBrand : disabled ? c.label3 : c.label}
      >
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
