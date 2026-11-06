import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { component } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';

type Props = {
  /** Diameter in points (a token, e.g. component.iconButton.size or component.profilePhoto.size). */
  size: number;
  image?: ImageSourcePropType;
  /** Read by VoiceOver; omit when the name is right next to it. */
  accessibilityLabel?: string;
};

/** Round photo slot (Profile header, instructor rows, "Book again"). Neutral silhouette without a photo (§13). */
export function Avatar({ size, image, accessibilityLabel }: Props) {
  const { c } = useTheme();
  return (
    <View
      accessible={Boolean(accessibilityLabel)}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.round,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: c.surface2 },
      ]}
    >
      {image ? (
        <Image source={image} style={StyleSheet.absoluteFill} resizeMode="cover" accessible={false} />
      ) : (
        <Icon name="profile" size={size * component.avatar.iconRatio} color={c.label3} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  round: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
});
