import { Pressable, StyleSheet } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatClock, formatDayOfMonth, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

const db = component.dateButton;

type Props = {
  date: Date;
  /** "3 left" or "Full". */
  state: string;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
  accessibilityLabel: string;
};

/** §7.7 Workshop date (canvas .date): weekday, day, time and seats left; selected = brand; full = disabled. */
export function DateButton({ date, state, selected, disabled = false, onPress, accessibilityLabel }: Props) {
  const { c } = useTheme();
  const lang = useLang();
  const ink = selected ? c.onBrand : c.label;
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.date,
        { borderColor: selected ? c.brand : c.separator, backgroundColor: selected ? c.brand : c.surface },
        disabled && styles.full,
      ]}
    >
      <T fit={1} variant="caption1" weight="700" color={ink}>
        {formatWeekday(date, lang).toUpperCase()}
      </T>
      <T fit={1} weight="700" color={ink} style={styles.day}>
        {formatDayOfMonth(date, lang)}
      </T>
      <T fit={1} variant="caption1" color={ink}>
        {formatClock(date, lang)}
      </T>
      <T fit={1} variant="caption1" weight="600" color={ink}>
        {state}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  date: {
    flex: 1,
    minWidth: 0,
    borderRadius: radius.sm,
    borderWidth: db.border,
    paddingVertical: db.padV,
    paddingHorizontal: db.padH,
    alignItems: 'center',
    gap: space.space1 / 2,
  },
  full: { opacity: db.fullOpacity },
  day: { fontSize: db.daySize },
});
