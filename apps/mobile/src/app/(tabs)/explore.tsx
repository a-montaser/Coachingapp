import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { activeFilterCount, useExplore, useExploreResults } from '@/data/explore';
import { disciplineName, useDisciplines } from '@/data/onboarding';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatWeekday } from '@/i18n/format';
import { cairoDaysUntil } from '@/data/home';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { CategoryButton, CategoryTray } from '@/ui/CategoryTray';
import { Chip } from '@/ui/Chip';
import { EmptyState } from '@/ui/EmptyState';
import { Icon } from '@/ui/Icon';
import { InstructorCard } from '@/ui/InstructorCard';
import { SearchField } from '@/ui/SearchField';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { T } from '@/ui/T';
import { WorkshopCard } from '@/ui/WorkshopCard';

/**
 * §7.5 Explore (canvas artboard 7): live search, Workshops | 1:1 lessons on Hobbies, "Filters · N" and
 * discipline chips, result line with Sort, results, and the empty state. Home opens it with
 * `discipline` and/or `focus` (plus `at`, so a repeat tap re-applies).
 */
export default function Explore() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const category = useSettings((s) => s.category);
  const setCategory = useSettings((s) => s.setCategory);
  const [trayOpen, setTrayOpen] = useState(false);
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
          <CategoryButton category={category} onPress={() => setTrayOpen(true)} />
        </View>

        <SearchField
          key={params.focus ? params.at : 'search'}
          value={query}
          onChangeText={(q) => set({ query: q })}
          placeholder={t(`home.search.${category}`)}
          autoFocus={Boolean(params.focus)}
        />

        {category === 'hobbies' && (
          <SegmentedControl
            accessibilityLabel={t('explore.segLabel')}
            segments={[t('explore.segWorkshops'), t('explore.segPeople')]}
            selectedIndex={tab === 'workshops' ? 0 : 1}
            onChange={(i) => set({ tab: i === 0 ? 'workshops' : 'people' })}
          />
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bleed}
          contentContainerStyle={styles.chips}
        >
          <Chip
            outlined
            label={
              nFilters ? t('explore.filtersN', { count: formatNumber(nFilters, lang) }) : t('explore.filters')
            }
            onPress={() => router.push('/filters')}
          />
          <Chip label={t('explore.all')} selected={!discipline} onPress={() => set({ discipline: null })} />
          {disciplines.map((d) => (
            <Chip
              key={d.id}
              label={disciplineName(d, lang)}
              selected={discipline === d.id}
              onPress={() => set({ discipline: discipline === d.id ? null : d.id })}
            />
          ))}
        </ScrollView>

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
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/sort')}
            hitSlop={space.space3}
            style={styles.sort}
          >
            <T variant="footnote" weight="600">
              {t('explore.sortBy', { name: t(`explore.sort.${sort}`) })}
            </T>
            <Icon name="chevronDown" size={component.categoryButton.chevronSize} color={c.label} />
          </Pressable>
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
              title: g.title,
              when: `${formatWeekday(new Date(g.starts_at), lang)} ${formatDayMonth(new Date(g.starts_at), lang)} · ${formatClock(new Date(g.starts_at), lang)}`,
              area: (ar && g.area_ar) || g.area_en,
              spotsLeft: g.seats_free,
              capacity: g.capacity,
              price: g.price_egp,
            }}
            // shortcut: the Workshop screen arrives in T13; until then a card does nothing.
            onPress={() => {}}
          />
        ))}
        {people.map((p) => (
          <InstructorCard
            key={`${p.id}-${p.discipline_id}`}
            instructor={{
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

      <CategoryTray
        visible={trayOpen}
        selected={category}
        onSelect={setCategory}
        onClose={() => setTrayOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
  bleed: { marginHorizontal: -layout.sideMargin, flexGrow: 0 },
  chips: { paddingHorizontal: layout.sideMargin, gap: space.space2 },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  sort: { flexDirection: 'row', alignItems: 'center', gap: space.space1 },
});
