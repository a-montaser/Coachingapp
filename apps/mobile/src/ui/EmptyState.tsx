import { StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Button } from './Button';
import { Icon, type IconName } from './Icon';
import { T } from './T';

type Props = { icon: IconName; title: string; body: string; action?: { label: string; onPress: () => void } };

const e = component.emptyState;

/** §5 Empty state: centred 56 pt round icon tile, headline, one footnote sentence, one plain small button. */
export function EmptyState({ icon, title, body, action }: Props) {
  const { c } = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.tile, { backgroundColor: c.surface2 }]}>
        <Icon name={icon} size={e.iconSize} color={c.label2} />
      </View>
      <T variant="headline" style={styles.center} accessibilityRole="header">
        {title}
      </T>
      <T variant="footnote" color={c.label2} style={styles.center}>
        {body}
      </T>
      {action && <Button label={action.label} size="small" onPress={action.onPress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: space.space2, paddingVertical: space.space8 },
  tile: {
    width: e.iconTile,
    height: e.iconTile,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { textAlign: 'center' },
});
