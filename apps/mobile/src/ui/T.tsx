import { Text, type TextProps } from 'react-native';
import { component, type as scale } from '@cfa/tokens';
import { useIsRTL } from '@/i18n';
import { useTheme } from '@/theme/useTheme';

export type TypeVariant = keyof typeof scale;
type Weight = '400' | '500' | '600' | '700';

// §3.3: Arabic body and names use taller lines for diacritics.
const arabic: Partial<Record<TypeVariant, TypeVariant>> = { body: 'arBody', headline: 'arHeadline' };

type Props = TextProps & {
  variant?: TypeVariant;
  color?: string;
  weight?: Weight;
  /**
   * For short labels in tight spaces (tiles, chips, day tiles, buttons): never split a word across
   * lines. Allows at most one line per word (capped at `fit`), and shrinks the text (down to
   * `component.text.minFontScale`) when a word is wider than the space instead of breaking it.
   */
  fit?: number;
};

/** Lines a label may use under `fit`: one per word, so a word that doesn't fit forces a shrink, not a break. */
export function fitLines(children: TextProps['children'], fit: number): number {
  const text = typeof children === 'string' || typeof children === 'number' ? String(children) : null;
  const words = text ? text.trim().split(/\s+/).filter(Boolean).length : fit;
  return Math.max(1, Math.min(fit, words));
}

/** All app text. Dynamic Type stays on (§12); prices and times wrap rather than truncate (§3.3). */
export function T({ variant = 'body', color, weight, fit, style, ...rest }: Props) {
  const { c } = useTheme();
  const rtl = useIsRTL();
  const v = (rtl && arabic[variant]) || variant;
  const base = scale[v];
  // The bundled Playfair file is already 600; a weight on top makes Android fall back to the system font.
  const fontWeight = 'fontFamily' in base ? undefined : (weight ?? base.fontWeight);
  return (
    <Text
      {...(fit
        ? {
            numberOfLines: fitLines(rest.children, fit),
            adjustsFontSizeToFit: true,
            minimumFontScale: component.text.minFontScale,
          }
        : null)}
      {...rest}
      style={[base, { color: color ?? c.label, fontWeight, writingDirection: rtl ? 'rtl' : 'ltr' }, style]}
    />
  );
}
