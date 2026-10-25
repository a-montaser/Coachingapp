import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { activeFilterCount, useExplore, useExploreResults } from '@/data/explore';
import { useDisciplines } from '@/data/onboarding';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatWeekday } from '@/i18n/format';
import { cairoDaysUntil } from '@/data/home';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { useMinimiseOnScroll } from '@/ui/TabBar';
import { testBanner, testPhoto } from '@/dev/testImages';
import { FilterButton } from '@/ui/FilterButton';
import { EmptyState } from '@/ui/EmptyState';
import { InstructorCard } from '@/ui/InstructorCard';
import { SearchField } from '@/ui/SearchField';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { T } from '@/ui/T';
import { TextLink } from '@/ui/TextLink';
import { WorkshopCard } from '@/ui/WorkshopCard';

/**
 * §7.5 Explore, as in the owner's prototype (D54): live search beside a Filters button (category and
 * discipline are inside Filters), Lessons | Groups in every category, result line with Sort, results,
 * and the empty state. Home opens it with
 * `discipline` and/or `focus` (plus `at`, so a repeat tap re-applies).
 */
export default function Explore() {
  const { c } = useTheme();
  const tabScroll = useMinimiseOnScroll(8, true).onScroll;
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const category = useSettings((s) => s.category);
  const params = useLocalSearchParams<{ discipline?: string; focus?: string; at?: string }>();
  const { query, discipline, tab, sort, filters, set, clear } = useExplore();
  const disciplines = (useDisciplines().data ?? []).filter((d) => d.category_id === category);
  const { workshopsTab, loading, people, workshops } = useExploreResults(category);

  // A request from Home: start from that discipline (or all), and raise the keyboard if asked.
  useEffect(() => {
    if (!params.at) return;
    set({ discipline: params.discipline ?? null, query: '' });
  }, [params.at, params.discipline, set]);
  // A discipline from another category no longer applies after a category switch.
  useEffect(() => {
    if (discipline && disciplines.length && !disciplines.some((d) => d.id === discipline))
      set({ discipline: null });
  }, [category, discipline, disciplines, set]);

  const now = new Date();
  const ar = lang === 'ar';
  const when = (iso: string) => {
    const d = new Date(iso);
    const days = cairoDaysUntil(d, now);
    const day =
      days === 0 ? t('dayPicker.today') : days === 1 ? t('common.tomorrow') : formatWeekday(d, lang);
    return `${day} ${formatClock(d, lang)}`;
  };
  const count = workshopsTab ? workshops.length : people.length;
  const nFilters = activeFilterCount(filters);
  const empty = !loading && count === 0;

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        onScroll={tabScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + space.space4,
            paddingBottom: insets.bottom + component.tabBar.tabHeight + layout.sectionGap,
          },
        ]}
      >
        <View style={styles.titleRow}>
          <T variant="largeTitle" accessibilityRole="header" style={styles.grow}>
            {t('tabs.explore')}
          </T>
        </View>

        {/* Prototype Explore: search beside a filled Filters button; category and discipline live in Filters. */}
        <View style={styles.searchRow}>
          <View style={styles.grow}>
            <SearchField
              key={params.focus ? params.at : 'search'}
              value={query}
              onChangeText={(q) => set({ query: q })}
              placeholder={t(`home.search.${category}`)}
              autoFocus={Boolean(params.focus)}
            />
          </View>
          <FilterButton count={nFilters + (discipline ? 1 : 0)} onPress={() => router.push('/filters')} />
        </View>

        <SegmentedControl
          accessibilityLabel={t('explore.segLabel')}
          segments={[t('explore.segLessons'), t('explore.segGroups')]}
          selectedIndex={tab === 'workshops' ? 1 : 0}
          onChange={(i) => set({ tab: i === 1 ? 'workshops' : 'people' })}
        />

        <View style={styles.resultRow}>
          <T variant="footnote" color={c.label2} style={styles.grow} accessibilityLiveRegion="polite">
            <T variant="footnote" weight="700">
              {t(workshopsTab ? 'explore.workshops' : 'explore.coaches', {
                count,
                n: formatNumber(count, lang),
              })}
            </T>
            {filters.maxKm ? ` ${t('explore.within', { km: formatNumber(filters.maxKm, lang) })}` : ''}
          </T>
          <TextLink
            tone="plain"
            role="button"
            icon="chevronDown"
            label={t('explore.sortBy', { name: t(`explore.sort.${sort}`) })}
            onPress={() => router.push('/sort')}
          />
        </View>

        {empty && (
          <EmptyState
            icon="search"
            title={t('explore.emptyTitle')}
            body={t('explore.emptyBody')}
            action={{ label: t('explore.emptyAction'), onPress: clear }}
          />
        )}

        {workshops.map((g) => (
          <WorkshopCard
            key={g.slot_id}
            workshop={{
              banner: testBanner(g.discipline_id, category),
              title: g.title,
              when: `${formatWeekday(new Date(g.starts_at), lang)} ${formatDayMonth(new Date(g.starts_at), lang)} · ${formatClock(new Date(g.starts_at), lang)}`,
              area: (ar && g.area_ar) || g.area_en,
              spotsLeft: g.seats_free,
              capacity: g.capacity,
              instructor: g.instructor_name,
              level: g.level_label,
            }}
            onPress={() =>
              router.push({ pathname: '/workshop/[id]', params: { id: g.offering_id, slot: g.slot_id } })
            }
          />
        ))}
        {people.map((p) => (
          <InstructorCard
            key={`${p.id}-${p.discipline_id}`}
            instructor={{
              photo: testPhoto(p.display_name),
              name: p.display_name,
              discipline: (ar && p.discipline_ar) || p.discipline_en,
              levels: p.levels ?? undefined,
              rating: p.rating_avg,
              reviews: p.rating_count,
              distanceKm: p.km ?? undefined,
              area: (ar && p.area_ar) || p.area_en,
              next: p.next_at ? when(p.next_at) : undefined,
              fromPrice: p.price,
            }}
            onPress={() =>
              router.push({ pathname: '/instructor/[id]', params: { id: p.id, discipline: p.discipline_id } })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
});
