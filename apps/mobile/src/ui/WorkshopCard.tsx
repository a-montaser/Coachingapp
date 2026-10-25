import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { component } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Card } from './Card';
import { Icon } from './Icon';
import { Pill } from './Pill';
import { T } from './T';

export type Workshop = {
  /** 2:1 banner; without one the card shows a neutral placeholder (§13). */
  banner?: ImageSourcePropType;
  title: string;
  /** The instructor, set small under the class name (owner revision D54). */
  instructor?: string;
  /** "Beginners", "All levels": visible before tapping (owner revision D54). */
  level?: string | null;
  /** Already-formatted "Sat 17 Oct · 11:00". */
  when: string;
  area: string;
  spotsLeft: number;
  capacity: number;
};

const w = component.workshopCard;

/**
 * §5 Group card (workshops and small groups, D54): level first, the class name large with the
 * instructor small under it, then when and where and the seats left. No price on cards (price comes at
 * the end of the decision). `rail` on Home, `full` in Explore.
 */
export function WorkshopCard({
  workshop: k,
  layout = 'full',
  onPress,
}: {
  workshop: Workshop;
  layout?: 'rail' | 'full';
  onPress: () => void;
}) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const spots =
    k.spotsLeft > 0
      ? t('card.spotsLeft', { left: formatNumber(k.spotsLeft, lang), total: formatNumber(k.capacity, lang) })
      : t('card.full');
  const meta = `${k.when} · ${k.area}`;

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={[k.title, k.instructor, k.level, meta, spots].filter(Boolean).join(', ')}
      style={layout === 'rail' && styles.rail}
    >
      {/* Fixed height, full card width (canvas). An aspect ratio with a max height shrank the width instead. */}
      <View
        testID="workshop-banner"
        style={[
          styles.banner,
          {
            backgroundColor: c.surface2,
            height: layout === 'rail' ? w.bannerRailHeight : w.bannerFullHeight,
          },
        ]}
      >
        {k.banner ? (
          <Image source={k.banner} style={StyleSheet.absoluteFill} resizeMode="cover" accessible={false} />
        ) : (
          <Icon name="hobbies" size={w.bannerRailHeight / 3} color={c.label2} />
        )}
      </View>
      <View style={styles.body}>
        {k.level ? <Pill label={k.level} tone="next" /> : null}
        <T variant="title3">{k.title}</T>
        {k.instructor ? (
          <T variant="footnote" color={c.label2}>
            {k.instructor}
          </T>
        ) : null}
        <T variant="footnote" color={c.label2}>
          {meta}
        </T>
        <T variant="footnote" weight="600" color={k.spotsLeft > 0 ? c.brandText : c.label2}>
          {spots}
        </T>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  rail: { width: w.railWidth },
  banner: { alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  body: { paddingTop: w.padTop, paddingHorizontal: w.padSide, paddingBottom: w.padBottom, gap: w.gap },
});
