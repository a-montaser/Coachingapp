import { Pressable, StyleSheet } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';
import { T } from './T';

/** §7.14 "Add a family member": a dashed outline card with a plus, for adding something new. */
export function DashedCard({ label, onPress }: { label: string; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, { borderColor: c.separator }, pressed && styles.pressed]}
    >
      <Icon name="plus" size={component.groupedList.iconSize} color={c.label} />
      <T variant="headline">{label}</T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: component.dashedCard.minHeight,
    borderRadius: radius.md,
    borderWidth: component.dashedCard.border,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.space2,
    paddingHorizontal: space.space4,
  },
  pressed: { opacity: 0.6 },
});
