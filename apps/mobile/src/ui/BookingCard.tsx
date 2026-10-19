import { Pressable, StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Button } from './Button';
import { Card } from './Card';
import { DateTile } from './DateTile';
import { Icon } from './Icon';
import { Pill, type PillTone } from './Pill';
import { T } from './T';

type Props = {
  date: Date;
  /** Past and cancelled bookings: grey date tile. */
  past?: boolean;
  title: string;
  /** "17:30–18:30 · Private 1:1". */
  time: string;
  venue: string;
  status: { label: string; tone: PillTone };
  onPress: () => void;
  /** Up to two plain actions under the row (§7.11): Directions, Book again, Details. */
  actions?: { label: string; onPress: () => void }[];
};

/** §7.11 Bookings card (prototype Bookings): date tile, title, time, venue, status pill; two plain actions. */
export function BookingCard({ date, past, title, time, venue, status, onPress, actions = [] }: Props) {
  const { c } = useTheme();
  return (
    <Card style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${time}, ${venue}, ${status.label}`}
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <DateTile date={date} past={past} />
        <View style={styles.text}>
          <T variant="headline">{title}</T>
          <T variant="footnote" color={c.label2}>
            {time}
          </T>
          <T variant="footnote" color={c.label2} numberOfLines={1}>
            {venue}
          </T>
          <View style={styles.pill}>
            <Pill label={status.label} tone={status.tone} />
          </View>
        </View>
        <Icon name="forward" size={component.groupedList.iconSize} color={c.label3} />
      </Pressable>
      {actions.length > 0 && (
        <View style={styles.actions}>
          {actions.slice(0, 2).map((a) => (
            <View key={a.label} style={styles.grow}>
              <Button label={a.label} size="small" onPress={a.onPress} />
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: space.space4, gap: space.space3 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space.space3 },
  pressed: { opacity: 0.85 },
  text: { flex: 1, gap: space.space1 / 2 },
  pill: { marginTop: space.space1 },
  actions: { flexDirection: 'row', gap: space.space2 },
  grow: { flex: 1 },
});
