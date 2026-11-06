import { Pressable, StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { DateTile } from './DateTile';
import { T } from './T';

type Props = {
  date: Date;
  title: string;
  /** "11:00–13:00 · beginners". */
  meta: string;
  /** Brand-text line, e.g. "3 of 8 spots left". */
  highlight?: string;
  /** Already formatted. */
  price: string;
  onPress: () => void;
  /** Hairline above every row but the first. */
  divided?: boolean;
};

/** A dated session inside a card list (Instructor profile "Upcoming workshops", §7.6). */
export function SessionRow({ date, title, meta, highlight, price, onPress, divided = false }: Props) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[title, meta, highlight, price].filter(Boolean).join(', ')}
      onPress={onPress}
      style={[
        styles.row,
        divided && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.separator },
      ]}
    >
      <DateTile date={date} />
      <View style={styles.text}>
        <T variant="headline">{title}</T>
        <T variant="footnote" color={c.label2}>
          {meta}
        </T>
        {highlight && (
          <T variant="footnote" weight="600" color={c.brandText}>
            {highlight}
          </T>
        )}
      </View>
      <T variant="subheadline" weight={component.price.weight} color={c.brandText}>
        {price}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space3 },
  text: { flex: 1 },
});
