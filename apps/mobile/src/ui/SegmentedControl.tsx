import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { component, radius, touch } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass, glassMode, liquidAvailable } from './Glass';
import { GlassLens, useGlassLens } from './GlassLens';
import { T } from './T';

type Props = {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  accessibilityLabel: string;
};

const seg = component.segmented;

/**
 * Navigation layer only: List/Map, Upcoming/Past, Workshops/1:1 lessons, session type (§5).
 * The selected thumb is the iOS 26 lens (D49): it swells under the finger, can be dragged across and
 * springs onto the segment it is let go on.
 */
export function SegmentedControl({ segments, selectedIndex, onChange, accessibilityLabel }: Props) {
  const { c, shadow } = useTheme();
  const { reduceTransparency } = useA11y();
  const liquid = glassMode(Platform.OS, liquidAvailable(), reduceTransparency) === 'liquid';
  const lens = useGlassLens({
    count: segments.length,
    index: selectedIndex,
    inset: seg.padding,
    onChange,
  });
  return (
    <Glass radius={radius.pill}>
      <GestureDetector gesture={lens.gesture}>
        <View
          accessibilityRole="tablist"
          accessibilityLabel={accessibilityLabel}
          style={styles.track}
          onLayout={lens.onLayout}
        >
          <GlassLens
            lens={lens}
            radius={radius.pill}
            top={seg.padding}
            bottom={seg.padding}
            liquid={liquid}
            fill={c.surface}
            shadow={shadow.thumb}
          />
          {segments.map((label, i) => {
            const selected = i === selectedIndex;
            return (
              // Touch is the lens's gesture; the Pressable keeps VoiceOver and Switch Control activation.
              <Pressable
                key={label}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => onChange(i)}
                hitSlop={(touch - seg.height) / 2}
                style={styles.segment}
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
      </GestureDetector>
    </Glass>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', minHeight: seg.height, padding: seg.padding },
  segment: { flex: 1, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
});
