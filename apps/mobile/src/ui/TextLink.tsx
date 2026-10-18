import { Pressable, StyleSheet } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon, type IconName } from './Icon';
import { T } from './T';

type Props = {
  label: string;
  onPress: () => void;
  /** brand (default): "See all", "Change"; plain: "Sort: Soonest available". */
  tone?: 'brand' | 'plain';
  /** Trailing glyph, e.g. chevronDown on Sort. */
  icon?: IconName;
  disabled?: boolean;
  /** link (default) navigates; button acts in place or opens a sheet (Sort, Resend code). */
  role?: 'link' | 'button';
};

/** Tappable text with a 44 pt hit area (§12): See all, Sort, Change number, Resend code. */
export function TextLink({ label, onPress, tone = 'brand', icon, disabled = false, role = 'link' }: Props) {
  const { c } = useTheme();
  const color = disabled ? c.label3 : tone === 'brand' ? c.brandText : c.label;
  return (
    <Pressable
      accessibilityRole={role}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={space.space3}
      style={styles.row}
    >
      <T variant="subheadline" weight="600" color={color} fit={2}>
        {label}
      </T>
      {icon && <Icon name={icon} size={component.categoryButton.chevronSize} color={color} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: space.space1 } });
