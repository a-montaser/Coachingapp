import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Card } from './Card';
import { Icon } from './Icon';
import { T } from './T';

type Props = {
  /** Date tile, avatar or icon tile on the leading side. */
  leading?: ReactNode;
  /** Small brand-text line above the title: "Next workshop · in 3 days", "Book again". */
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Replaces the chevron, e.g. a small "Change" button. */
  trailing?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
};

/** A card that is one row: leading visual, kicker / title / subtitle, then a chevron or an action. */
export function RowCard({ leading, kicker, title, subtitle, trailing, onPress, accessibilityLabel }: Props) {
  const { c } = useTheme();
  return (
    <Card
      style={styles.row}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? (onPress ? title : undefined)}
    >
      {leading}
      <View style={styles.text}>
        {kicker && (
          <T variant="caption1" weight="600" color={c.brandText}>
            {kicker}
          </T>
        )}
        <T variant="headline">{title}</T>
        {subtitle && (
          <T variant="footnote" color={c.label2}>
            {subtitle}
          </T>
        )}
      </View>
      {trailing ??
        (onPress && <Icon name="forward" size={component.groupedList.iconSize} color={c.label3} />)}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space4 },
  text: { flex: 1 },
});
