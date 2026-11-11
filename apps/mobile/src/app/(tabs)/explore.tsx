import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import {
  activeFilterCount,
  LIVE_MAP,
  useExplore,
  useExploreResults,
  useLocationGranted,
  useOrigin,
} from '@/data/explore';
import { useDisciplines } from '@/data/onboarding';
import { useFavourites } from '@/data/favourites';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatPrice, formatWeekday } from '@/i18n/format';
import { cairoDaysUntil } from '@/data/home';
import { groupByVenue, inRegion, type MapItem, type Region } from '@/data/rules';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { useMinimiseOnScroll } from '@/ui/TabBar';
import { Button } from '@/ui/Button';
import { FilterButton } from '@/ui/FilterButton';
import { IconButton } from '@/ui/IconButton';
import { MapPin } from '@/ui/MapPin';
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
  const fav = useFavourites(); // Phase 2 R3
  const insets = useSafeAreaInsets();
  const category = useSettings((s) => s.category);
  const params = useLocalSearchParams<{ discipline?: string; focus?: string; at?: string }>();
  const { query, discipline, tab, sort, filters, set, clear } = useExplore();
  const disciplines = (useDisciplines().data ?? []).filter((d) => d.category_id === category);
  const { workshopsTab, loading, people, workshops } = useExploreResults(category);
  // Map view (Phase 2 R4): opened from the floating pin button (D68).
  const [mapOn, setMapOn] = useState(false);
  const [selected, setSelected] = useState(0);
  const [area, setArea] = useState<Region | null>(null);
  const [moved, setMoved] = useState(false);
  const lastRegion = useRef<Region | null>(null);
  const map = useRef<MapView>(null);
  const origin = useOrigin();
  const located = useLocationGranted();
  const fabBottom = insets.bottom + component.tabBar.tabHeight + component.mapFab.gap;

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

  const workshopCard = (g: (typeof workshops)[number]) => (
    <WorkshopCard
      key={g.slot_id}
      workshop={{
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
  );
  const personCard = (p: (typeof people)[number]) => (
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
        favourite: fav.has(p.id),
        fromPrice: p.price,
      }}
      onFavourite={() => fav.toggle(p.id)}
      onPress={() =>
        router.push({ pathname: '/instructor/[id]', params: { id: p.id, discipline: p.discipline_id } })
      }
    />
  );

  // ---------- Map (Phase 2 R4, D68) ----------
  // Map items mirror the list (same search, filters, sort and segment); "Search this area" narrows them.
  const all: MapItem[] = workshopsTab
    ? workshops.map((g) => ({
        key: g.slot_id,
        lat: g.lat,
        lng: g.lng,
        venue: g.venue_name,
        price: g.price_egp,
      }))
    : people.map((p) => ({
        key: `${p.id}-${p.discipline_id}`,
        lat: p.lat,
        lng: p.lng,
        venue: p.venue_name,
        price: p.price,
      }));
  const shown = all.map((it, i) => ({ it, i })).filter(({ it }) => !area || inRegion(it, area));
  const pins = groupByVenue(shown.map(({ it }) => it));
  const pick = Math.min(selected, Math.max(shown.length - 1, 0));
  const current = shown[pick];
  const home: Region | null = origin
    ? {
        latitude: origin.lat,
        longitude: origin.lng,
        latitudeDelta: component.mapPin.delta,
        longitudeDelta: component.mapPin.delta,
      }
    : null;

  const header = (
    <>
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
    </>
  );

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      {mapOn ? (
        <View style={styles.screen}>
          <View style={[styles.mapHeader, { paddingTop: insets.top + space.space4 }]}>{header}</View>
          <View style={styles.screen}>
            <MapView
              ref={map}
              style={StyleSheet.absoluteFill}
              initialRegion={home ?? undefined}
              showsUserLocation={located}
              onRegionChangeComplete={(r) => {
                lastRegion.current = r;
                setMoved(true);
              }}
            >
              {pins.map((pin) => {
                const on = current !== undefined && pin.items.includes(pick);
                return (
                  <Marker
                    key={pin.key}
                    coordinate={{ latitude: pin.lat, longitude: pin.lng }}
                    tracksViewChanges={false}
                    onPress={() => setSelected(pin.items[0]!)}
                    accessibilityLabel={formatPrice(pin.price, lang)}
                  >
                    <MapPin label={formatPrice(pin.price, lang)} selected={on} />
                  </Marker>
                );
              })}
            </MapView>
            <View style={styles.mapTop}>
              {moved && (
                <Button
                  label={t('explore.searchArea')}
                  variant="secondary"
                  size="small"
                  onPress={() => {
                    setArea(lastRegion.current);
                    setSelected(0);
                    setMoved(false);
                  }}
                />
              )}
              <View style={styles.grow} />
              {home && (
                <IconButton
                  icon="recenter"
                  floating
                  accessibilityLabel={t('explore.recenter')}
                  onPress={() => map.current?.animateToRegion(home)}
                />
              )}
            </View>
            <View style={[styles.mapBottom, { bottom: fabBottom }]}>
              {current && (
                <>
                  {workshopsTab ? workshopCard(workshops[current.i]!) : personCard(people[current.i]!)}
                  <View style={styles.stepper}>
                    <IconButton
                      icon="back"
                      floating
                      accessibilityLabel={t('explore.previous')}
                      disabled={pick === 0}
                      onPress={() => setSelected(pick - 1)}
                    />
                    <T variant="footnote" weight="600" style={styles.center}>
                      {t('explore.mapPosition', {
                        i: formatNumber(pick + 1, lang),
                        total: t(workshopsTab ? 'explore.workshops' : 'explore.coaches', {
                          count: shown.length,
                          n: formatNumber(shown.length, lang),
                        }),
                      })}
                    </T>
                    <IconButton
                      icon="forward"
                      floating
                      accessibilityLabel={t('explore.next')}
                      disabled={pick >= shown.length - 1}
                      onPress={() => setSelected(pick + 1)}
                    />
                    <IconButton
                      icon="list"
                      floating
                      accessibilityLabel={t('explore.showList')}
                      onPress={() => setMapOn(false)}
                    />
                  </View>
                </>
              )}
              {!current && (
                <View style={styles.stepper}>
                  <T variant="footnote" style={styles.grow}>
                    {t('explore.emptyTitle')}
                  </T>
                  <IconButton
                    icon="list"
                    floating
                    accessibilityLabel={t('explore.showList')}
                    onPress={() => setMapOn(false)}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <>
          <ScrollView
            onScroll={tabScroll}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={[
              styles.body,
              {
                paddingTop: insets.top + space.space4,
                paddingBottom: fabBottom + component.iconButton.size + layout.sectionGap,
              },
            ]}
          >
            {header}
            {empty && (
              <EmptyState
                icon="search"
                title={t('explore.emptyTitle')}
                body={t('explore.emptyBody')}
                action={{ label: t('explore.emptyAction'), onPress: clear }}
              />
            )}
            {workshops.map(workshopCard)}
            {people.map(personCard)}
          </ScrollView>
          {/* D68: a floating round glass button, bottom-right above the tab bar, with a teardrop pin. */}
          {LIVE_MAP && (
            <View style={[styles.fab, { bottom: fabBottom }]}>
              <IconButton
                icon="mapPin"
                floating
                accessibilityLabel={t('explore.showMap')}
                onPress={() => {
                  setSelected(0);
                  setMapOn(true);
                }}
              />
            </View>
          )}
        </>
      )}
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
  mapHeader: { paddingHorizontal: layout.sideMargin, gap: space.space4, paddingBottom: space.space3 },
  mapTop: {
    position: 'absolute',
    top: space.space3,
    start: layout.sideMargin,
    end: layout.sideMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapBottom: { position: 'absolute', start: layout.sideMargin, end: layout.sideMargin, gap: space.space2 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  center: { flex: 1, textAlign: 'center' },
  fab: { position: 'absolute', end: layout.sideMargin },
});
