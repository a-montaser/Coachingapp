import { StyleSheet, View } from 'react-native';
import { component } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';

const p = component.progress;

/**
 * Onboarding progress (§5): 3 segments, filled from the leading edge (right in RTL).
 * `value` runs 0…3; a fraction fills a segment partially (level-per-item step).
 */
export function Progress({ value, accessibilityLabel }: { value: number; accessibilityLabel: string }) {
  const { c } = useTheme();
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: p.segments, now: value }}
      style={styles.row}
    >
      {Array.from({ length: p.segments }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <View key={i} style={[styles.segment, { backgroundColor: c.surface2 }]}>
            <View style={[styles.fill, { width: `${fill * 100}%`, backgroundColor: c.label }]} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: p.gap },
  segment: { flex: 1, height: p.height, borderRadius: p.radius, overflow: 'hidden' },
  fill: { height: '100%' },
});
