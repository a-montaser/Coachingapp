import { StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

export type PillTone = 'ok' | 'warn' | 'next' | 'gold' | 'neutral';

const p = component.pill;

export function Pill({ label, tone = 'neutral' }: { label: string; tone?: PillTone }) {
  const { c } = useTheme();
  const [fg, bg] = {
    ok: [c.success, c.successTint],
    warn: [c.warning, c.warningTint],
    next: [c.brandText, c.brandTint],
    gold: [c.goldInk, c.goldTint],
    neutral: [c.label2, c.surface2],
  }[tone];
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <T variant="caption1" weight={p.weight} color={fg}>
        {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: p.height,
    paddingHorizontal: space.space3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
});
