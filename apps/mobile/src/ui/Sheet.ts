import { Platform } from 'react-native';
import { radius } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { glassMode, liquidAvailable } from './Glass';

/**
 * §4.4, §8 Sheets are native form sheets. iOS 26 draws the glass, inset and scrim itself
 * (content stays transparent); elsewhere the content is solid glass-frosted.
 * Use as Stack.Screen options for a sheet route.
 */
export function useSheetOptions() {
  const { c } = useTheme();
  const { reduceTransparency } = useA11y();
  const liquid = glassMode(Platform.OS, liquidAvailable(), reduceTransparency) === 'liquid';
  return {
    presentation: 'formSheet' as const,
    sheetGrabberVisible: true,
    sheetCornerRadius: radius.lg,
    sheetAllowedDetents: [0.5, 1],
    contentStyle: { backgroundColor: liquid ? 'transparent' : c.glassFrosted },
  };
}
