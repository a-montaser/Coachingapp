import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { LevelGlyph } from './LevelGlyph';
import { T } from './T';

type Props = {
  level: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

/** §7.3 Levels row: 4-bar glyph, level name and a one-line description; selected = brand outline. */
export function LevelOption({ level, title, description, selected, onPress }: Props) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${title}, ${description}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: c.surface },
        selected && { borderWidth: component.interestTile.selectedBorder, borderColor: c.brand },
        pressed && styles.pressed,
      ]}
    >
      <LevelGlyph filled={level} color={c.brandText} />
      <View style={styles.text}>
        <T variant="headline">{title}</T>
        <T variant="footnote" color={c.label2}>
          {description}
        </T>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: component.groupedList.rowMinHeight,
    borderRadius: radius.md,
    paddingHorizontal: space.space4,
    paddingVertical: space.space3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.space4,
  },
  text: { flex: 1 },
  pressed: { opacity: 0.7 },
});
