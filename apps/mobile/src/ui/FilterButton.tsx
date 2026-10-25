import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';
import { T } from './T';

const f = component.filterButton;

/** Explore's Filters button (owner's prototype): a filled aubergine square, with the active count. */
export function FilterButton({ count, onPress }: { count: number; onPress: () => void }) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        count ? t('explore.filtersN', { count: formatNumber(count, lang) }) : t('explore.filters')
      }
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: c.brand },
        pressed && { opacity: 0.85, transform: [{ scale: 0.96 }] },
      ]}
    >
      <Icon name="filter" size={f.iconSize} color={c.onBrand} />
      {count > 0 && (
        <View style={[styles.badge, { backgroundColor: c.gold, borderColor: c.bg }]}>
          <T variant="caption1" weight="700" color={c.label} fit={1}>
            {formatNumber(count, lang)}
          </T>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: f.size,
    height: f.size,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -f.badgeOffset,
    end: -f.badgeOffset,
    minWidth: f.badge,
    height: f.badge,
    paddingHorizontal: f.badgePad,
    borderRadius: radius.pill,
    borderWidth: f.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
