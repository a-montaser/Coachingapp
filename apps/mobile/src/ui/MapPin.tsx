import { StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

const mp = component.mapPin;

/** §7.5 price pin ("390 EGP"); the selected one is `brand` and slightly larger. */
export function MapPin({ label, selected }: { label: string; selected: boolean }) {
  const { c, shadow } = useTheme();
  return (
    <View
      style={[
        styles.pin,
        { boxShadow: shadow.card },
        selected
          ? { backgroundColor: c.brand, transform: [{ scale: mp.selectedScale }] }
          : { backgroundColor: c.surface },
      ]}
    >
      <T variant="footnote" weight="700" color={selected ? c.onBrand : c.label}>
        {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: { borderRadius: radius.pill, paddingHorizontal: mp.padH, paddingVertical: mp.padV },
});
