import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { component } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon, type IconName } from './Icon';

const h = component.hero;

/**
 * §7.6/§7.7 hero: full-bleed image area with a top scrim so the floating glass buttons stay legible.
 * No real photos yet: a neutral placeholder, never stock imagery (§13, D29). The content sheet below
 * overlaps it by `component.hero.overlap`.
 */
export function Hero({
  height,
  icon,
  label,
  image,
}: {
  height: number;
  icon: IconName;
  label: string;
  image?: ImageSourcePropType;
}) {
  const { c } = useTheme();
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={[styles.hero, { height, backgroundColor: c.surface2 }]}
    >
      {image ? (
        <Image source={image} style={StyleSheet.absoluteFill} resizeMode="cover" accessible={false} />
      ) : (
        <Icon name={icon} size={h.iconSize} color={c.label3} />
      )}
      <View
        pointerEvents="none"
        style={[styles.scrim, { experimental_backgroundImage: `linear-gradient(${c.scrim}, transparent)` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  scrim: { position: 'absolute', top: 0, start: 0, end: 0, height: h.scrimHeight },
});
