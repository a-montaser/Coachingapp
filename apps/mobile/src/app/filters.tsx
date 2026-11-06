import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import {
  DEFAULT_FILTERS,
  DISTANCES,
  PRICE,
  RATINGS,
  useExplore,
  useExploreResults,
  type Availability,
  type SessionType,
} from '@/data/explore';
import { useIsRTL, useLang } from '@/i18n';
import { formatNumber, formatPrice } from '@/i18n/format';
import { CATEGORIES, disciplineName, useDisciplines } from '@/data/onboarding';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { Section } from '@/ui/Section';
import { SheetHeader } from '@/ui/SheetHeader';
import { T } from '@/ui/T';

// Lessons only (owner revision D54): Adults (1:1) or Kids. Groups need no type filter.
const TYPES: SessionType[] = ['private', 'kids'];
const WHEN: Availability[] = ['any', 'today', 'week', 'weekend'];

/**
 * §7.5 Filters sheet: ✕ · Filters · Reset; category and discipline first (owner revision D54: they live
 * here, not as chips on Explore), then price and the chip groups; results update live.
 */
export default function FiltersSheet() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const rtl = useIsRTL();
  const category = useSettings((s) => s.category);
  const setCategory = useSettings((s) => s.setCategory);
  const discipline = useExplore((s) => s.discipline);
  const disciplines = (useDisciplines().data ?? []).filter((d) => d.category_id === category);
  const filters = useExplore((s) => s.filters);
  const setFilter = useExplore((s) => s.setFilter);
  const set = useExplore((s) => s.set);
  const { workshopsTab, people, workshops } = useExploreResults(category);
  const n = workshopsTab ? workshops.length : people.length;
  const any = t('explore.any');

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader
        title={t('explore.filters')}
        action={{ label: t('explore.reset'), onPress: () => set({ filters: DEFAULT_FILTERS }) }}
      />

      <Section title={t('explore.category')} variant="footnote" wrap>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={t(`category.${cat}`)}
            selected={category === cat}
            onPress={() => {
              setCategory(cat);
              set({ discipline: null });
            }}
          />
        ))}
      </Section>

      <Section title={t('explore.discipline')} variant="footnote" wrap>
        <Chip label={t('explore.all')} selected={!discipline} onPress={() => set({ discipline: null })} />
        {disciplines.map((d) => (
          <Chip
            key={d.id}
            label={disciplineName(d, lang)}
            selected={discipline === d.id}
            onPress={() => set({ discipline: discipline === d.id ? null : d.id })}
          />
        ))}
      </Section>

      <Section title={t('explore.maxPrice')} variant="footnote" wrap>
        <T variant="headline">
          {filters.maxPrice >= PRICE.max
            ? any
            : t('explore.upTo', { price: formatPrice(filters.maxPrice, lang) })}
        </T>
        <Slider
          accessibilityLabel={t('explore.maxPrice')}
          minimumValue={PRICE.min}
          maximumValue={PRICE.max}
          step={PRICE.step}
          value={filters.maxPrice}
          onValueChange={(v) => setFilter('maxPrice', v)}
          inverted={rtl}
          minimumTrackTintColor={c.brand}
          maximumTrackTintColor={c.surface2}
        />
      </Section>

      {!workshopsTab && (
        <Section title={t('explore.who')} variant="footnote" wrap>
          <Chip label={any} selected={!filters.type} onPress={() => setFilter('type', null)} />
          {TYPES.map((x) => (
            <Chip
              key={x}
              label={t(`explore.audience.${x}`)}
              selected={filters.type === x}
              onPress={() => setFilter('type', x)}
            />
          ))}
        </Section>
      )}

      <Section title={t('explore.gender')} variant="footnote" wrap>
        <Chip label={any} selected={!filters.gender} onPress={() => setFilter('gender', null)} />
        {(['female', 'male'] as const).map((g) => (
          <Chip
            key={g}
            label={t(`onboarding.pref.${g}`)}
            selected={filters.gender === g}
            onPress={() => setFilter('gender', g)}
          />
        ))}
      </Section>

      <Section title={t('explore.rating')} variant="footnote" wrap>
        <Chip label={any} selected={!filters.minRating} onPress={() => setFilter('minRating', null)} />
        {RATINGS.map((r) => (
          <Chip
            key={r}
            label={t('explore.ratingAtLeast', { value: formatNumber(r, lang) })}
            selected={filters.minRating === r}
            onPress={() => setFilter('minRating', r)}
          />
        ))}
      </Section>

      <Section title={t('explore.distance')} variant="footnote" wrap>
        <Chip label={any} selected={!filters.maxKm} onPress={() => setFilter('maxKm', null)} />
        {DISTANCES.map((km) => (
          <Chip
            key={km}
            label={t('explore.km', { km: formatNumber(km, lang) })}
            selected={filters.maxKm === km}
            onPress={() => setFilter('maxKm', km)}
          />
        ))}
      </Section>

      <Section title={t('explore.availability')} variant="footnote" wrap>
        {WHEN.map((w) => (
          <Chip
            key={w}
            label={t(`explore.when.${w}`)}
            selected={filters.availability === w}
            onPress={() => setFilter('availability', w)}
          />
        ))}
      </Section>

      {n > 0 ? (
        <Button
          variant="primary"
          label={t(workshopsTab ? 'explore.showWorkshops' : 'explore.showCoaches', {
            count: n,
            n: formatNumber(n, lang),
          })}
          onPress={() => router.back()}
        />
      ) : (
        <Button
          label={t('explore.noMatches')}
          disabled
          reason={t('explore.noMatchesReason')}
          onPress={() => {}}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: layout.sectionGap },
});
