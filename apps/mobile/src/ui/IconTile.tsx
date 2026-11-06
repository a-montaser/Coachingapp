import { StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon, type IconName } from './Icon';

/** A rounded square holding an icon: brand-tint for empty states and prompts, neutral for list rows. */
export function IconTile({ icon, tone = 'brand' }: { icon: IconName; tone?: 'brand' | 'neutral' }) {
  const { c } = useTheme();
  const size = component.iconButton.size;
  return (
    <View
      style={[
        styles.tile,
        { width: size, height: size, backgroundColor: tone === 'brand' ? c.brandTint : c.surface2 },
      ]}
    >
      <Icon
        name={icon}
        size={component.iconButton.iconSize}
        color={tone === 'brand' ? c.brandText : c.label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
});
