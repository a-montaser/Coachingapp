import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

const d = component.departures;

export type DepartureRow = {
  key: string;
  /** "18:00", set large in gold. */
  time: string;
  /** "Tomorrow" under the time, when it isn't today. */
  day?: string;
  title: string;
  /** "Ahmed Ezz · Downtown · 2 seats left". */
  detail: string;
  accessibilityLabel: string;
  onPress: () => void;
};

/**
 * Home's "Starting soon near you" board (owner's pick, D58): a dark aubergine panel like a departures
 * board, start times in gold down the leading edge, soonest first. Each row opens that class.
 */
export function DeparturesBoard({ title, rows }: { title: string; rows: DepartureRow[] }) {
  const { c, scheme } = useTheme();
  return (
    <View
      style={[
        styles.board,
        { backgroundColor: c.board },
        scheme === 'dark' && { borderWidth: StyleSheet.hairlineWidth, borderColor: c.boardLine },
      ]}
    >
      <T
        variant="footnote"
        weight="700"
        color={c.gold}
        accessibilityRole="header"
        accessibilityLabel={title}
        style={[styles.title, { letterSpacing: d.titleTracking }]}
      >
        {title.toUpperCase()}
      </T>
      {rows.map((r) => (
        <Pressable
          key={r.key}
          accessibilityRole="button"
          accessibilityLabel={r.accessibilityLabel}
          onPress={r.onPress}
          style={({ pressed }) => [
            styles.row,
            { borderTopColor: c.boardLine },
            pressed && { backgroundColor: c.boardLine },
          ]}
        >
          <View style={styles.when}>
            <T variant="title3" weight="700" color={c.gold} style={styles.digits}>
              {r.time}
            </T>
            {r.day ? (
              <T variant="caption1" color={c.bandLabel2} fit={1}>
                {r.day}
              </T>
            ) : null}
          </View>
          <View style={styles.text}>
            <T variant="subheadline" weight="700" color={c.bandLabel}>
              {r.title}
            </T>
            <T variant="footnote" color={c.bandLabel2}>
              {r.detail}
            </T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { borderRadius: radius.lg, overflow: 'hidden' },
  title: { paddingHorizontal: d.padH, paddingTop: d.padV, paddingBottom: d.padV / 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: d.padH,
    paddingHorizontal: d.padH,
    paddingVertical: d.padV,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  when: { width: d.timeWidth },
  digits: { fontVariant: ['tabular-nums'] },
  text: { flex: 1 },
});
