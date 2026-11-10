import { Pressable, StyleSheet, View } from 'react-native';
import { component, touch } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';

type Props = {
  value: number;
  onChange: (stars: number) => void;
  /** Each star's spoken name, e.g. (n) => "3 stars". */
  label: (stars: number) => string;
};

const sr = component.starRating;

/** §7.12 Rate sheet: five 34 pt stars, gold when on. Each is its own button, so VoiceOver can pick one. */
export function StarRating({ value, onChange, label }: Props) {
  const { c } = useTheme();
  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable
          key={n}
          accessibilityRole="radio"
          accessibilityLabel={label(n)}
          accessibilityState={{ checked: value === n }}
          onPress={() => onChange(n)}
          style={styles.star}
        >
          <Icon
            name={n <= value ? 'star' : 'starOutline'}
            size={sr.size}
            color={n <= value ? c.gold : c.label3}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: sr.gap, justifyContent: 'center' },
  star: { minWidth: touch, minHeight: touch, alignItems: 'center', justifyContent: 'center' },
});
