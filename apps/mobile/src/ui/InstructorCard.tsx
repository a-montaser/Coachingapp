import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatDistance, formatNumber, formatPrice } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Card } from './Card';
import { Icon } from './Icon';
import { Pill } from './Pill';
import { T } from './T';

export type Instructor = {
  name: string;
  discipline: string;
  levels?: string;
  rating: number;
  reviews: number;
  distanceKm?: number;
  area: string;
  /** Already-formatted next opening, e.g. "Today 17:30". */
  next?: string;
  fromPrice: number;
  favourite?: boolean;
  /** 4:5 portrait; without one the card shows a neutral silhouette (§13). */
  photo?: ImageSourcePropType;
};

const ic = component.instructorCard;

/** §5 Instructor card. No real photos yet: a neutral silhouette, never stock imagery (§13). */
export function InstructorCard({ instructor: p, onPress }: { instructor: Instructor; onPress: () => void }) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const meta = [p.discipline, p.levels].filter(Boolean).join(' · ');
  const place = [p.distanceKm !== undefined && formatDistance(p.distanceKm, lang), p.area]
    .filter(Boolean)
    .join(' · ');
  const rating = `${formatNumber(p.rating, lang)} (${formatNumber(p.reviews, lang)})`;
  const from = t('card.from', { price: formatPrice(p.fromPrice, lang) });
  const next = p.next && t('card.next', { when: p.next });
  const label = [
    p.name,
    meta,
    t('card.rating', { rating: formatNumber(p.rating, lang), count: formatNumber(p.reviews, lang) }),
    place,
    next,
    from,
    p.favourite && t('card.favourited'),
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Card onPress={onPress} accessibilityLabel={label} style={styles.card}>
      <View style={[styles.photo, { backgroundColor: c.surface2 }]}>
        {p.photo ? (
          <Image source={p.photo} style={StyleSheet.absoluteFill} resizeMode="cover" accessible={false} />
        ) : (
          <Icon name="profile" size={ic.photoWidth / 2} color={c.label2} />
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <T variant="headline" style={styles.flex}>
            {p.name}
          </T>
          {p.favourite && <Icon name="heartFill" size={component.iconButton.iconSize} color={c.danger} />}
        </View>
        {meta.length > 0 && (
          <T variant="footnote" color={c.label2}>
            {meta}
          </T>
        )}
        <View style={styles.metaRow}>
          <Icon name="star" size={ic.starSize} color={c.gold} />
          <T variant="footnote" color={c.label2} style={styles.flex}>
            {[rating, place].filter(Boolean).join(' · ')}
          </T>
        </View>
        {next && <Pill label={next} tone="next" />}
        <View style={styles.foot}>
          <T variant="subheadline" weight={component.price.weight} color={c.brandText}>
            {from}
          </T>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: ic.padding, gap: space.space3 },
  photo: {
    width: ic.photoWidth,
    height: ic.photoHeight,
    borderRadius: radius.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: ic.infoGap, paddingVertical: space.space1 },
  foot: { marginTop: 'auto' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: space.space2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: space.space1 },
  flex: { flex: 1 },
});
