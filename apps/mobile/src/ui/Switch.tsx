import { Switch as NativeSwitch } from 'react-native';
import { useTheme } from '@/theme/useTheme';

type Props = { value: boolean; onValueChange: (on: boolean) => void; accessibilityLabel: string };

/** Native switch, on = success (§5). */
export function Switch({ value, onValueChange, accessibilityLabel }: Props) {
  const { c } = useTheme();
  return (
    <NativeSwitch
      value={value}
      onValueChange={onValueChange}
      accessibilityLabel={accessibilityLabel}
      trackColor={{ true: c.success, false: c.surface2 }}
      ios_backgroundColor={c.surface2}
    />
  );
}
