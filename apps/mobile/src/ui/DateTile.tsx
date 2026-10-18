import { StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatDayOfMonth, formatFullDate, formatMonth, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

const d = component.dateTile;

/** §5 Date tile: brand-tint / brand-text; past bookings use neutral grey. */
export function DateTile({ date, past = false }: { date: Date; past?: boolean }) {
  const { c } = useTheme();
  const lang = useLang();
  const fg = past ? c.label2 : c.brandText;
  const caps = { fontSize: d.capsSize, fontWeight: d.capsWeight } as const;
  return (
    <View
      accessible
      accessibilityLabel={formatFullDate(date, lang)}
      style={[styles.tile, { backgroundColor: past ? c.surface2 : c.brandTint }]}
    >
      <T fit={1} variant="caption1" color={fg} style={caps}>
        {formatWeekday(date, lang).toUpperCase()}
      </T>
      <T fit={1} variant="title2" color={fg} style={{ fontSize: d.daySize, fontWeight: d.dayWeight }}>
        {formatDayOfMonth(date, lang)}
      </T>
      <T fit={1} variant="caption1" color={fg} style={caps}>
        {formatMonth(date, lang).toUpperCase()}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: d.width,
    minHeight: d.height,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
