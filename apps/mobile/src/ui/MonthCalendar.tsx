import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { cairoKey, monthGrid } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatDayOfMonth, formatFullDate, formatMonthYear, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { IconButton } from './IconButton';
import { T } from './T';

type Props = {
  /** 0 = this month, 1 = next month… */
  offset: number;
  onOffset: (offset: number) => void;
  /** How many months ahead the arrows go. */
  maxOffset: number;
  /** Cairo days ("YYYY-MM-DD") that have something on them: open times, or bookings. */
  marked: ReadonlySet<string>;
  selected: string | null;
  onSelect: (day: string) => void;
  /** Days without a mark can't be chosen (booking); Bookings' view lets any day be picked. */
  onlyMarked?: boolean;
  /** Read aloud for a marked day, e.g. "Has open times". */
  markedLabel: string;
  now?: Date;
};

const mc = component.monthCalendar;
const WEEK = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2026, 9, 17 + i, 12))); // Sat 17 Oct 2026…

/**
 * Month calendar (owner revision D54), Saturday first, Cairo dates: a dot under days that have open times
 * or bookings, the chosen day filled aubergine, today ringed. Replaces the two-week day strip.
 */
export function MonthCalendar({
  offset,
  onOffset,
  maxOffset,
  marked,
  selected,
  onSelect,
  onlyMarked = true,
  markedLabel,
  now = new Date(),
}: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const { first, cells } = monthGrid(offset, now);
  const today = cairoKey(now);
  const rows = Array.from({ length: cells.length / 7 }, (_, r) => cells.slice(r * 7, r * 7 + 7));

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <T variant="headline" style={styles.flex} accessibilityRole="header">
          {formatMonthYear(first, lang)}
        </T>
        <IconButton
          icon="back"
          accessibilityLabel={t('calendar.previousMonth')}
          onPress={() => onOffset(offset - 1)}
          disabled={offset <= 0}
        />
        <IconButton
          icon="forward"
          accessibilityLabel={t('calendar.nextMonth')}
          onPress={() => onOffset(offset + 1)}
          disabled={offset >= maxOffset}
        />
      </View>
      <View style={styles.row} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        {WEEK.map((d) => (
          <T
            key={d.toISOString()}
            fit={1}
            variant="caption1"
            weight="600"
            color={c.label2}
            style={styles.weekday}
          >
            {formatWeekday(d, lang)}
          </T>
        ))}
      </View>
      {rows.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((d, i) => {
            if (!d) return <View key={i} style={styles.cell} />;
            const key = cairoKey(d);
            const isMarked = marked.has(key);
            const isSelected = key === selected;
            const past = key < today;
            const disabled = past || (onlyMarked && !isMarked);
            return (
              <Pressable
                key={key}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected, disabled }}
                accessibilityLabel={[
                  key === today ? t('dayPicker.today') : null,
                  formatFullDate(d, lang),
                  isMarked ? markedLabel : null,
                ]
                  .filter(Boolean)
                  .join(', ')}
                disabled={disabled}
                onPress={() => onSelect(key)}
                style={styles.cell}
              >
                <View
                  style={[
                    styles.day,
                    isSelected && { backgroundColor: c.brand },
                    key === today && !isSelected && { borderWidth: mc.todayRing, borderColor: c.brandText },
                  ]}
                >
                  <T
                    fit={1}
                    variant="body"
                    weight={isMarked || isSelected ? '700' : '400'}
                    color={isSelected ? c.onBrand : disabled ? c.label3 : c.label}
                  >
                    {formatDayOfMonth(d, lang)}
                  </T>
                </View>
                <View
                  style={[styles.dot, isMarked && { backgroundColor: isSelected ? c.brandText : c.gold }]}
                />
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.space1 },
  header: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
  row: { flexDirection: 'row' },
  weekday: { flex: 1, textAlign: 'center' },
  cell: { flex: 1, alignItems: 'center', paddingVertical: mc.cellPad, gap: mc.dotGap },
  day: {
    width: mc.day,
    height: mc.day,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: mc.dot, height: mc.dot, borderRadius: mc.dot / 2 },
});
