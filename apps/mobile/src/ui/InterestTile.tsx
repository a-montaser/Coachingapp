import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon, type IconName } from './Icon';
import { T } from './T';

type Props = {
  label: string;
  /** A discipline icon, or a language code ("FR") drawn as text. */
  icon?: IconName | null;
  code?: string | null;
  selected: boolean;
  onPress: () => void;
  width: number;
};

const tile = component.interestTile;

/** §7.3, canvas .pick: 92 high, hairline border; selected = 1.5 pt brand border, brand-tint, tick badge. */
export function InterestTile({ label, icon, code, selected, onPress, width }: Props) {
  const { c } = useTheme();
  const ink = selected ? c.brandText : c.label;
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.tile,
        { width },
        selected
          ? { borderWidth: tile.selectedBorder, borderColor: c.brand, backgroundColor: c.brandTint }
          : { borderWidth: tile.border, borderColor: c.separator, backgroundColor: c.surface },
      ]}
    >
      {icon ? (
        <Icon name={icon} size={tile.iconSize} color={ink} />
      ) : (
        <T style={styles.code} color={ink}>
          {code}
        </T>
      )}
      <T variant="subheadline" weight="600" color={ink} numberOfLines={2}>
        {label}
      </T>
      {selected && (
        <View style={[styles.tick, { backgroundColor: c.brand }]}>
          <Icon name="check" size={tile.tickIconSize} color={c.onBrand} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    minHeight: tile.height,
    borderRadius: radius.md,
    padding: tile.padding,
    gap: tile.gap,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  code: { fontSize: tile.codeSize, lineHeight: tile.iconSize, fontWeight: tile.codeWeight },
  tick: {
    position: 'absolute',
    top: tile.tickInset,
    end: tile.tickInset,
    width: tile.tick,
    height: tile.tick,
    borderRadius: tile.tick / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
