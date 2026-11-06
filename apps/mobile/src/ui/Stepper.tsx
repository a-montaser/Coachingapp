import { Pressable, StyleSheet, View } from 'react-native';
import { component, touch } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';
import { T } from './T';

const s = component.stepper;

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  /** e.g. "Seats". VoiceOver reads it as one adjustable control (swipe up / down). */
  accessibilityLabel: string;
  decrementLabel: string;
  incrementLabel: string;
};

/** §7.7 seats stepper (canvas Workshop .step): − value +, ends disabled at the limits. */
export function Stepper({
  value,
  min,
  max,
  onChange,
  accessibilityLabel,
  decrementLabel,
  incrementLabel,
}: Props) {
  const { c } = useTheme();
  const lang = useLang();
  const canDown = value > min;
  const canUp = value < max;
  const step = (d: number) => {
    const next = value + d;
    if (next >= min && next <= max) onChange(next);
  };
  const button = (icon: 'minus' | 'plus', enabled: boolean, label: string, d: number) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !enabled }}
      disabled={!enabled}
      onPress={() => step(d)}
      hitSlop={(touch - s.button) / 2}
      style={[styles.button, { backgroundColor: c.surface2 }]}
    >
      <Icon name={icon} size={s.iconSize} color={enabled ? c.label : c.label3} />
    </Pressable>
  );
  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min, max, now: value, text: formatNumber(value, lang) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => step(e.nativeEvent.actionName === 'increment' ? 1 : -1)}
      style={styles.row}
    >
      {button('minus', canDown, decrementLabel, -1)}
      <T variant="headline" style={styles.value} accessibilityLiveRegion="polite">
        {formatNumber(value, lang)}
      </T>
      {button('plus', canUp, incrementLabel, 1)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: component.stepper.valueWidth / 2 },
  button: {
    width: s.button,
    height: s.button,
    borderRadius: s.button / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { minWidth: s.valueWidth, textAlign: 'center' },
});
