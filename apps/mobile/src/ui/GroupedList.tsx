import { Fragment, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon, type IconName } from './Icon';
import { T } from './T';

export type GroupedRow = {
  key: string;
  title: string;
  subtitle?: string;
  /** Trailing value, e.g. "English". */
  value?: string;
  icon?: IconName;
  onPress?: () => void;
  /** Replaces the chevron, e.g. a Switch. */
  trailing?: ReactNode;
  destructive?: boolean;
};

const g = component.groupedList;

export function GroupedList({ rows }: { rows: GroupedRow[] }) {
  const { c } = useTheme();
  return (
    <View style={[styles.list, { backgroundColor: c.surface }]}>
      {rows.map((row, i) => {
        const body = (
          <View style={styles.row}>
            {row.icon && (
              <View style={[styles.tile, { backgroundColor: c.surface2 }]}>
                <Icon name={row.icon} size={g.iconSize} color={c.label} />
              </View>
            )}
            <View style={styles.text}>
              <T color={row.destructive ? c.danger : c.label}>{row.title}</T>
              {row.subtitle && (
                <T variant="footnote" color={c.label2}>
                  {row.subtitle}
                </T>
              )}
            </View>
            {row.value && <T color={c.label2}>{row.value}</T>}
            {row.trailing ?? (row.onPress && <Icon name="forward" size={g.iconSize} color={c.label2} />)}
          </View>
        );
        return (
          <Fragment key={row.key}>
            {i > 0 && (
              <View
                style={[
                  styles.hairline,
                  { backgroundColor: c.separator, marginStart: row.icon ? g.separatorInset : g.padding },
                ]}
              />
            )}
            {row.onPress ? (
              <Pressable accessibilityRole="button" onPress={row.onPress}>
                {body}
              </Pressable>
            ) : (
              body
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { borderRadius: radius.md, overflow: 'hidden' },
  row: {
    minHeight: g.rowMinHeight,
    paddingHorizontal: g.padding,
    paddingVertical: g.paddingVertical,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.space3,
  },
  tile: {
    width: g.iconTile,
    height: g.iconTile,
    borderRadius: g.iconTileRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  hairline: { height: StyleSheet.hairlineWidth },
});
