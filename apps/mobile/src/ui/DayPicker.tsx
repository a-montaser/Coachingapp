import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { currentLang } from '@/i18n';
import { formatDayOfMonth, formatFullDate, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { IconButton } from './IconButton';
import { T } from './T';

export type Day = { date: Date; hasTimes: boolean };

type Props = {
  /** Already-formatted month label, e.g. "October 2026". */
  monthLabel: string;
  days: Day[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
};

const dp = component.dayPicker;

/** §5 Day picker: 7 flexible tiles, success dot for open days, 45% for days with none. */
export function DayPicker({ monthLabel, days, selectedIndex, onSelect, onPreviousWeek, onNextWeek }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = currentLang();
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <T variant="headline" style={styles.flex}>
          {monthLabel}
        </T>
        <IconButton
          icon="back"
          accessibilityLabel={t('dayPicker.previousWeek')}
          onPress={() => onPreviousWeek?.()}
          disabled={!onPreviousWeek}
        />
        <IconButton
          icon="forward"
          accessibilityLabel={t('dayPicker.nextWeek')}
          onPress={() => onNextWeek?.()}
          disabled={!onNextWeek}
        />
      </View>
      <View style={styles.row}>
        {days.map((day, i) => {
          const selected = i === selectedIndex;
          const fg = selected ? c.onBrand : c.label;
          return (
            <Pressable
              key={day.date.toISOString()}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${formatFullDate(day.date, lang)}, ${t(day.hasTimes ? 'dayPicker.hasTimes' : 'dayPicker.noTimes')}`}
              onPress={() => onSelect(i)}
              style={[
                styles.tile,
                { backgroundColor: selected ? c.brand : c.surface },
                !day.hasTimes && !selected && { opacity: dp.emptyOpacity },
              ]}
            >
              <T variant="caption1" color={selected ? c.onBrand : c.label2}>
                {formatWeekday(day.date, lang)}
              </T>
              <T variant="headline" color={fg}>
                {formatDayOfMonth(day.date, lang)}
              </T>
              <View
                style={[styles.dot, day.hasTimes && { backgroundColor: selected ? c.onBrand : c.success }]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.space2 },
  header: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
  row: { flexDirection: 'row', gap: space.space1 },
  tile: {
    flex: 1,
    minHeight: dp.tileMinHeight,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.space1 / 2,
    paddingVertical: space.space1,
  },
  dot: { width: dp.dotSize, height: dp.dotSize, borderRadius: dp.dotSize / 2 },
});
