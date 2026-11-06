import { StyleSheet, View } from 'react-native';
import { component } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';

const g = component.levels;
const BARS = 4;

/** §7.3: a 4-bar strength glyph; `filled` bars (1–4) rise from the leading edge. Decorative. */
export function LevelGlyph({ filled, color }: { filled: number; color?: string }) {
  const { c } = useTheme();
  return (
    <View style={styles.row} accessible={false} importantForAccessibility="no-hide-descendants">
      {Array.from({ length: BARS }, (_, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            {
              height: (g.glyphHeight * (i + 1)) / BARS,
              backgroundColor: i < filled ? (color ?? c.label) : c.surface2,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: g.glyphWidth,
    height: g.glyphHeight,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: g.glyphBarGap,
  },
  bar: { flex: 1, borderRadius: g.glyphBarGap / 2 },
});
