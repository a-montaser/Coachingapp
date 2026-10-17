import { Text, type TextProps } from 'react-native';
import { type as scale } from '@cfa/tokens';
import { useIsRTL } from '@/i18n';
import { useTheme } from '@/theme/useTheme';

export type TypeVariant = keyof typeof scale;
type Weight = '400' | '500' | '600' | '700';

// §3.3: Arabic body and names use taller lines for diacritics.
const arabic: Partial<Record<TypeVariant, TypeVariant>> = { body: 'arBody', headline: 'arHeadline' };

type Props = TextProps & { variant?: TypeVariant; color?: string; weight?: Weight };

/** All app text. Dynamic Type stays on (§12); prices and times wrap rather than truncate (§3.3). */
export function T({ variant = 'body', color, weight, style, ...rest }: Props) {
  const { c } = useTheme();
  const rtl = useIsRTL();
  const v = (rtl && arabic[variant]) || variant;
  const base = scale[v];
  // The bundled Playfair file is already 600; a weight on top makes Android fall back to the system font.
  const fontWeight = 'fontFamily' in base ? undefined : (weight ?? base.fontWeight);
  return (
    <Text
      {...rest}
      style={[base, { color: color ?? c.label, fontWeight, writingDirection: rtl ? 'rtl' : 'ltr' }, style]}
    />
  );
}
