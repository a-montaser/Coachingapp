import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { T } from './T';

type Props = {
  /** e.g. "Sat 17 Oct · 11:00 · 2 seats" or "From". */
  caption: string;
  /** Already formatted, e.g. "1,300 EGP". Wraps, never truncates (§3.3). */
  price: string;
  /** The primary action, plus an optional secondary glass action before it. */
  children: ReactNode;
};

const bb = component.bottomBar;

/** §4.4 Bottom action bar: glass slab, inset 8, radius 34. */
export function BottomActionBar({ caption, price, children }: Props) {
  const { c } = useTheme();
  return (
    <View style={styles.wrap}>
      <Glass radius={bb.radius}>
        <View style={styles.row}>
          <View style={styles.text}>
            <T variant="footnote" color={c.glassLabel}>
              {caption}
            </T>
            <T variant="title3" color={c.glassLabel}>
              {price}
            </T>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </Glass>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', start: bb.inset, end: bb.inset, bottom: bb.inset },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space3 },
  text: { flex: 1 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
});
