import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatNumber, formatPrice } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Card } from './Card';
import { Icon } from './Icon';
import { Pill } from './Pill';
import { T } from './T';

export type Workshop = {
  title: string;
  /** Already-formatted "Sat 17 Oct · 11:00". */
  when: string;
  area: string;
  spotsLeft: number;
  capacity: number;
  price: number;
};

const w = component.workshopCard;

/** §5 Workshop card. `rail` = 252 wide on Home; `full` = full width in Explore. Banner is a neutral placeholder (§13). */
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
  const price = formatPrice(k.price, lang);
  const meta = `${k.when} · ${k.area}`;

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={[k.title, meta, spots, price].join(', ')}
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
        <Icon name="hobbies" size={w.bannerRailHeight / 3} color={c.label2} />
      </View>
      <View style={styles.body}>
        <T variant="headline">{k.title}</T>
        <T variant="footnote" color={c.label2}>
          {meta}
        </T>
        <View style={styles.footer}>
          <Pill label={spots} tone={k.spotsLeft > 0 ? 'next' : 'neutral'} />
          <T variant="subheadline" weight={component.price.weight} color={c.brandText}>
            {price}
          </T>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  rail: { width: w.railWidth },
  banner: { alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' },
  body: { paddingTop: w.padTop, paddingHorizontal: w.padSide, paddingBottom: w.padBottom, gap: w.gap },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: space.space2,
    marginTop: w.footerTop,
  },
});
