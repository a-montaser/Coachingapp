import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatDistance, formatNumber } from '@/i18n/format';
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
  /** Unused on the card: price comes at the end of the decision (owner revision D54). */
  fromPrice?: number;
  favourite?: boolean;
  /** 4:5 portrait; without one the card shows a neutral silhouette (§13). */
  photo?: ImageSourcePropType;
};

const ic = component.instructorCard;

/**
 * §5 Lesson card (owner revision D54): the lesson leads ("Padel"), the instructor is small under it,
 * then the levels, rating and place, and the next opening. No price on cards. No real photos yet: a
 * neutral silhouette, never stock imagery (§13).
 */
export function InstructorCard({ instructor: p, onPress }: { instructor: Instructor; onPress: () => void }) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();

  const place = [p.distanceKm !== undefined && formatDistance(p.distanceKm, lang), p.area]
    .filter(Boolean)
    .join(' · ');
  const rating = `${formatNumber(p.rating, lang)} (${formatNumber(p.reviews, lang)})`;
  const next = p.next && t('card.next', { when: p.next });
  const label = [
    p.discipline,
    p.name,
    p.levels,
    t('card.rating', { rating: formatNumber(p.rating, lang), count: formatNumber(p.reviews, lang) }),
    place,
    next,
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
          <T variant="title3" style={styles.flex}>
            {p.discipline}
          </T>
          {p.favourite && <Icon name="heartFill" size={component.iconButton.iconSize} color={c.danger} />}
        </View>
        <T variant="footnote" color={c.label2}>
          {p.name}
        </T>
        {p.levels ? <Pill label={p.levels} tone="next" /> : null}
        <View style={styles.metaRow}>
          <Icon name="star" size={ic.starSize} color={c.gold} />
          <T variant="footnote" color={c.label2} style={styles.flex}>
            {[rating, place].filter(Boolean).join(' · ')}
          </T>
        </View>
        {next ? (
          <T variant="footnote" weight="600" color={c.brandText}>
            {next}
          </T>
        ) : null}
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
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: space.space2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: space.space1 },
  flex: { flex: 1 },
});
