import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { blur, component } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';

export type GlassMode = 'liquid' | 'blur' | 'frosted';

/** §4.3 decision table (design.md §6). */
export function glassMode(os: string, liquidAvailable: boolean, reduceTransparency: boolean): GlassMode {
  if (os !== 'ios' || reduceTransparency) return 'frosted';
  return liquidAvailable ? 'liquid' : 'blur';
}

export const liquidAvailable = () =>
  Platform.OS === 'ios' && isLiquidGlassAvailable() && isGlassEffectAPIAvailable();

type Props = {
  radius: number;
  /** `clear` over photos and maps (§3.1 glass-clear). */
  variant?: 'regular' | 'clear';
  /** The one primary action per screen (§4.2). */
  prominent?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * The navigation-layer material (§4). Colourless: no tint, no brand colour.
 * Neighbouring controls share one Glass shape rather than nesting glass in glass (§4.2).
 */
export function Glass({ radius, variant = 'regular', prominent = false, style, children }: Props) {
  const { c, scheme, shadow } = useTheme();
  const a11y = useA11y();
  const mode = glassMode(Platform.OS, liquidAvailable(), a11y.reduceTransparency);
  const g = component.glass;

  // Native Liquid Glass draws its own rim and sheen; we only add the Increase Contrast rim there.
  const border = a11y.increaseContrast
    ? { borderWidth: g.contrastRim, borderColor: c.label }
    : mode === 'frosted'
      ? prominent
        ? { borderWidth: g.frostedProminentBorder, borderColor: c.glassLabel }
        : null
      : mode === 'blur'
        ? { borderWidth: prominent ? g.rimProminent : g.rim, borderColor: c.glassStroke }
        : null;

  const base = [{ borderRadius: radius }, border, style];

  if (mode === 'liquid') {
    return (
      <GlassView glassEffectStyle={variant} isInteractive style={base}>
        {children}
      </GlassView>
    );
  }
  if (mode === 'blur') {
    return (
      <View style={[{ borderRadius: radius, boxShadow: shadow.glass }, style]}>
        <BlurView
          // shortcut: BlurView intensity (0–100) is not a blur radius; ×2.5 is tuned by eye, revisit on device.
          intensity={(variant === 'clear' ? blur.clear : blur.regular) * 2.5}
          tint={scheme}
          style={[
            base,
            { overflow: 'hidden', backgroundColor: variant === 'clear' ? c.glassClear : c.glassFill },
          ]}
        >
          {children}
        </BlurView>
      </View>
    );
  }
  return <View style={[base, { backgroundColor: c.glassFrosted }]}>{children}</View>;
}
