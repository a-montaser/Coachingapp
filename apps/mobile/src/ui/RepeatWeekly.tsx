import { StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Stepper } from './Stepper';
import { Switch } from './Switch';
import { T } from './T';

type Props = {
  /** 1 = off; 2–max = that many weeks. */
  weeks: number;
  max: number;
  onChange: (weeks: number) => void;
  title: string;
  /** "Same time every Tuesday". */
  subtitle: string;
  /** "4 weeks · 24 Nov – 15 Dec", shown while on. */
  span: string;
  labels: { weeks: string; fewer: string; more: string };
};

/** §7.8 "Repeat weekly" (Phase 2 R5.1): a switch, then how many weeks (2 up to the weeks that are open). */
export function RepeatWeekly({ weeks, max, onChange, title, subtitle, span, labels }: Props) {
  const { c } = useTheme();
  const on = weeks > 1;
  return (
    <View style={[styles.box, { backgroundColor: c.surface }]}>
      <View style={styles.row}>
        <View style={styles.grow}>
          <T>{title}</T>
          <T variant="footnote" color={c.label2}>
            {subtitle}
          </T>
        </View>
        <Switch
          value={on}
          onValueChange={(v) => onChange(v ? Math.min(4, max) : 1)}
          accessibilityLabel={title}
        />
      </View>
      {on && (
        <View style={styles.row}>
          <T variant="footnote" color={c.label2} style={styles.grow} accessibilityLiveRegion="polite">
            {span}
          </T>
          <Stepper
            value={weeks}
            min={2}
            max={max}
            onChange={onChange}
            accessibilityLabel={labels.weeks}
            decrementLabel={labels.fewer}
            incrementLabel={labels.more}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: radius.md, padding: component.groupedList.padding, gap: space.space3 },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
});
