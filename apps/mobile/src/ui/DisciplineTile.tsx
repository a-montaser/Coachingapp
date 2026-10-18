import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon, type IconName } from './Icon';
import { T } from './T';

const rail = component.disciplineRail;

/** §7.4 item 5 (canvas Main .cat): a 64 pt rounded tile with the discipline's icon or code, name below. */
export function DisciplineTile({
  label,
  icon,
  code,
  onPress,
}: {
  label: string;
  icon?: IconName | null;
  code?: string | null;
  onPress: () => void;
}) {
  const { c } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.item}>
      <View style={[styles.tile, { backgroundColor: c.surface }]}>
        {icon ? (
          <Icon name={icon} size={rail.iconSize} color={c.brandText} />
        ) : (
          <T weight="700" color={c.brandText} style={styles.code} fit={1}>
            {code}
          </T>
        )}
      </View>
      <T fit={2} variant="footnote" weight="600" style={styles.center}>
        {label}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { width: rail.width, alignItems: 'center', gap: space.space2 },
  tile: {
    width: rail.tile,
    height: rail.tile,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  code: { fontSize: rail.codeSize },
  center: { textAlign: 'center' },
});
