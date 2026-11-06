import { StyleSheet, View } from 'react-native';
import { radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

/** A tinted one-line notice: warning (pending kids booking, policy) or brand. §3.1 warning-tint. */
export function Banner({ text, tone = 'warning' }: { text: string; tone?: 'warning' | 'brand' }) {
  const { c } = useTheme();
  const [bg, fg] = tone === 'warning' ? [c.warningTint, c.warning] : [c.brandTint, c.brandText];
  return (
    <View style={[styles.banner, { backgroundColor: bg }]} accessibilityLiveRegion="polite">
      <T variant="footnote" color={fg}>
        {text}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({ banner: { borderRadius: radius.sm, padding: space.space3 } });
