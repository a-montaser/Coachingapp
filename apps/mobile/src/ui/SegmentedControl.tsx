import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, touch } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { T } from './T';

type Props = {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  accessibilityLabel: string;
};

const seg = component.segmented;

/** Navigation layer only: List/Map, Upcoming/Past, Workshops/1:1 lessons, session type (§5). */
export function SegmentedControl({ segments, selectedIndex, onChange, accessibilityLabel }: Props) {
  const { c, shadow } = useTheme();
  return (
    <Glass radius={radius.pill}>
      <View accessibilityRole="tablist" accessibilityLabel={accessibilityLabel} style={styles.track}>
        {segments.map((label, i) => {
          const selected = i === selectedIndex;
          return (
            <Pressable
              key={label}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => onChange(i)}
              hitSlop={(touch - seg.height) / 2}
              style={[styles.segment, selected && { backgroundColor: c.surface, boxShadow: shadow.thumb }]}
            >
              <T
                fit={1}
                variant="subheadline"
                weight={seg.weight}
                color={selected ? c.label : c.glassLabel}
                numberOfLines={1}
              >
                {label}
              </T>
            </Pressable>
          );
        })}
      </View>
    </Glass>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', minHeight: seg.height, padding: seg.padding },
  segment: { flex: 1, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
});
