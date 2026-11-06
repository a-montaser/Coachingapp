import { BlurView } from 'expo-blur';
import {
  GlassContainer,
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
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
  /**
   * iOS 26 interactive glass (scales and shimmers under the finger): only for controls you tap
   * (buttons, the nav cluster, the tab bar's selection lens), never for bars and fields.
   */
  interactive?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * The navigation-layer material (§4). Colourless: no tint, no brand colour.
 * Neighbouring controls share one Glass shape rather than nesting glass in glass (§4.2).
 */
export function Glass({
  radius,
  variant = 'regular',
  prominent = false,
  interactive = false,
  style,
  children,
}: Props) {
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
  // The glass-highlight top and bottom sheen the fallbacks need; native Liquid Glass has its own (DS Materials).
  const sheen = (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          borderRadius: radius,
          opacity: g.sheenOpacity,
          experimental_backgroundImage: `linear-gradient(180deg, ${c.glassHighlight} 0%, transparent 42%, transparent 78%, ${c.glassHighlight} 100%)`,
        },
      ]}
    />
  );

  if (mode === 'liquid') {
    return (
      // colorScheme: follow the app's Light / Dark setting, not only the system's (Expo glass docs).
      <GlassView glassEffectStyle={variant} isInteractive={interactive} colorScheme={scheme} style={base}>
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
          {sheen}
          {children}
        </BlurView>
      </View>
    );
  }
  return (
    <View style={[base, { backgroundColor: c.glassFrosted }]}>
      {sheen}
      {children}
    </View>
  );
}

/**
 * iOS 26 GlassEffectContainer: glass shapes inside it blend and morph into each other when they come
 * within `spacing` (the tab bar's selection lens and its bar). A plain View elsewhere.
 */
export function GlassGroup({
  spacing,
  style,
  children,
}: {
  spacing: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const { reduceTransparency } = useA11y();
  if (glassMode(Platform.OS, liquidAvailable(), reduceTransparency) !== 'liquid')
    return <View style={style}>{children}</View>;
  return (
    <GlassContainer spacing={spacing} style={style}>
      {children}
    </GlassContainer>
  );
}
