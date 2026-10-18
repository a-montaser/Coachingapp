import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useProfile, useSession } from '@/data/auth';
import {
  cairoDaysUntil,
  distanceKm,
  greetingPeriod,
  useGroupSessions,
  useInstructorCards,
  useMyCategoryBookings,
} from '@/data/home';
import { useOrigin } from '@/data/explore';
import { disciplineName, useDisciplines } from '@/data/onboarding';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatWeekday } from '@/i18n/format';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { Card } from '@/ui/Card';
import { CategoryButton, CategoryTray } from '@/ui/CategoryTray';
import { DateTile } from '@/ui/DateTile';
import { Icon, disciplineIcon } from '@/ui/Icon';
import { InstructorCard } from '@/ui/InstructorCard';
import { SearchField } from '@/ui/SearchField';
import { T } from '@/ui/T';
import { WorkshopCard } from '@/ui/WorkshopCard';

const rail = component.disciplineRail;
const GROUP_RAIL = 6;

/**
 * §7.4 Home, one per category (canvas artboards Main, HomeSports, HomeEducation, HomeLanguages, HomeTray):
 * wordmark + category button, greeting, search, next booking (or empty card), disciplines rail,
 * group rail (not Sports, v1), people sorted by soonest availability; Sports adds "Book again".
 */
export default function Home() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const category = useSettings((s) => s.category);
  const setCategory = useSettings((s) => s.setCategory);
  const [trayOpen, setTrayOpen] = useState(false);
  const userId = useSession().session?.user.id;
  const profile = useProfile(userId).data;
  const origin = useOrigin();
  const disciplines = (useDisciplines().data ?? []).filter((d) => d.category_id === category);
  const people = useInstructorCards(category).data ?? [];
  const groups = useGroupSessions(category).data ?? [];
  const mine = useMyCategoryBookings(userId, category).data;

  const now = new Date();
  const period = greetingPeriod(now);
  const name = profile?.first_name;
  const ar = lang === 'ar';
  // "Today 17:30", "Tomorrow 09:00", "Sat 11:00".
  const when = (iso: string) => {
    const d = new Date(iso);
    const days = cairoDaysUntil(d, now);
    const day =
      days === 0 ? t('dayPicker.today') : days === 1 ? t('common.tomorrow') : formatWeekday(d, lang);
    return `${day} ${formatClock(d, lang)}`;
  };
  const inDays = (iso: string) => {
    const days = cairoDaysUntil(new Date(iso), now);
    return days === 0
      ? t('home.today')
      : days === 1
        ? t('home.tomorrow')
        : t('home.inDays', { count: days, n: formatNumber(days, lang) });
  };
  // shortcut: instructor, workshop and booking detail screens arrive in T12, T13 and T17; until then these open Explore / Bookings.
  // `at` makes each tap a new request, so Explore re-applies it even when the tab is already mounted.
  const openExplore = (params?: Record<string, string>) =>
    router.navigate({ pathname: '/explore', params: { ...params, at: String(Date.now()) } });
  const next = mine?.next;
  const again = category === 'sports' ? mine?.lastCompleted : null;
  const againCard =
    again && people.find((p) => p.id === again.instructor_id && p.discipline_id === again.discipline_id);

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + space.space3,
            paddingBottom: insets.bottom + component.tabBar.tabHeight + layout.sectionGap,
          },
        ]}
      >
        <View style={styles.topRow}>
          <T variant="brandTitle" style={styles.wordmark} accessibilityRole="header">
            {t('brand.wordmark')}
          </T>
          <CategoryButton category={category} onPress={() => setTrayOpen(true)} />
        </View>

        <View style={styles.greeting}>
          <T variant="title1">
            {name ? t(`home.greeting.${period}`, { name }) : t(`home.greeting.${period}Anon`)}
          </T>
          <T variant="subheadline" color={c.label2}>
            {t(`home.sub.${category}`)}
          </T>
        </View>

        {/* Opens Explore with the keyboard up (§7.4 item 3); typing happens there. */}
        <SearchField
          value=""
          onChangeText={() => {}}
          placeholder={t(`home.search.${category}`)}
          onFocus={() => openExplore({ focus: '1' })}
        />

        {next ? (
          <Card
            style={styles.row}
            onPress={() => router.navigate('/bookings')}
            accessibilityLabel={next.title}
          >
            <DateTile date={new Date(next.starts_at)} />
            <View style={styles.grow}>
              <T variant="caption1" weight="600" color={c.brandText}>
                {t(next.type === 'workshop' ? 'home.kickerWorkshop' : 'home.kickerSession', {
                  when: inDays(next.starts_at),
                })}
              </T>
              <T variant="headline">{next.title}</T>
              <T variant="footnote" color={c.label2}>
                {`${formatClock(new Date(next.starts_at), lang)} · ${next.venue_name}`}
              </T>
            </View>
            <Icon name="forward" size={component.groupedList.iconSize} color={c.label3} />
          </Card>
        ) : (
          <Card style={styles.row} onPress={() => openExplore()}>
            <View style={[styles.emptyIcon, { backgroundColor: c.brandTint }]}>
              <Icon name={category} size={component.iconButton.iconSize} color={c.brandText} />
            </View>
            <View style={styles.grow}>
              <T variant="headline">{t(`home.emptyTitle.${category}`)}</T>
              <T variant="footnote" color={c.label2}>
                {t(`home.emptySub.${category}`)}
              </T>
            </View>
            <Icon name="forward" size={component.groupedList.iconSize} color={c.label3} />
          </Card>
        )}

        {again && (
          <Card
            style={styles.row}
            onPress={() => openExplore({ discipline: again.discipline_id })}
            accessibilityLabel={t('home.bookAgain')}
          >
            <View style={styles.grow}>
              <T variant="caption1" weight="600" color={c.brandText}>
                {t('home.bookAgain')}
              </T>
              <T variant="headline">
                {t('home.bookAgainTitle', {
                  discipline: (ar && again.discipline_ar) || again.discipline_en,
                  name: again.instructor_name,
                })}
              </T>
              <T variant="footnote" color={c.label2}>
                {againCard?.next_at
                  ? t('home.bookAgainNext', { when: when(againCard.next_at) })
                  : t('home.bookAgainNone')}
              </T>
            </View>
            <Icon name="forward" size={component.groupedList.iconSize} color={c.label3} />
          </Card>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <T variant="title2" accessibilityRole="header" style={styles.grow}>
              {t(`home.rail.${category}`)}
            </T>
            <Pressable accessibilityRole="link" onPress={() => openExplore()} hitSlop={space.space3}>
              <T variant="subheadline" weight="600" color={c.brandText}>
                {t('home.seeAll')}
              </T>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rail}
            style={styles.bleed}
          >
            {disciplines.map((d) => {
              const icon = disciplineIcon(d.icon);
              const label = disciplineName(d, lang);
              return (
                <Pressable
                  key={d.id}
                  accessibilityRole="button"
                  accessibilityLabel={label}
                  onPress={() => openExplore({ discipline: d.id })}
                  style={styles.railItem}
                >
                  <View style={[styles.railTile, { backgroundColor: c.surface }]}>
                    {icon ? (
                      <Icon name={icon} size={rail.iconSize} color={c.brandText} />
                    ) : (
                      <T weight="700" color={c.brandText} style={styles.code}>
                        {d.code}
                      </T>
                    )}
                  </View>
                  <T variant="footnote" weight="600" style={styles.center} numberOfLines={2}>
                    {label}
                  </T>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {category !== 'sports' && groups.length > 0 && (
          <View style={styles.section}>
            <T variant="title2" accessibilityRole="header">
              {t(`home.groups.${category}`)}
            </T>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rail}
              style={styles.bleed}
            >
              {groups.slice(0, GROUP_RAIL).map((g) => (
                <WorkshopCard
                  key={g.slot_id}
                  layout="rail"
                  workshop={{
                    title: g.title,
                    when: `${formatWeekday(new Date(g.starts_at), lang)} ${formatDayMonth(new Date(g.starts_at), lang)} · ${formatClock(new Date(g.starts_at), lang)}`,
                    area: (ar && g.area_ar) || g.area_en,
                    spotsLeft: g.seats_free,
                    capacity: g.capacity,
                    price: g.price_egp,
                  }}
                  onPress={() => openExplore()}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <T variant="title2" accessibilityRole="header">
            {t(`home.people.${category}`)}
          </T>
          {people.length === 0 && (
            <T variant="subheadline" color={c.label2}>
              {t('home.noPeople')}
            </T>
          )}
          {people.map((p) => (
            <InstructorCard
              key={`${p.id}-${p.discipline_id}`}
              instructor={{
                name: p.display_name,
                discipline: (ar && p.discipline_ar) || p.discipline_en,
                levels: p.levels ?? undefined,
                rating: p.rating_avg,
                reviews: p.rating_count,
                distanceKm: origin ? distanceKm(origin, p) : undefined,
                area: (ar && p.area_ar) || p.area_en,
                next: p.next_at ? when(p.next_at) : undefined,
                fromPrice: p.from_price,
              }}
              onPress={() => openExplore({ discipline: p.discipline_id })}
            />
          ))}
        </View>
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
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.space3 },
  wordmark: { fontSize: component.homeWordmarkSize },
  greeting: { gap: space.space1 },
  row: { padding: space.space4, flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
  emptyIcon: {
    width: component.iconButton.size,
    height: component.iconButton.size,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { gap: space.space3 },
  sectionHead: { flexDirection: 'row', alignItems: 'baseline', gap: space.space3 },
  bleed: { marginHorizontal: -layout.sideMargin },
  rail: { paddingHorizontal: layout.sideMargin, gap: rail.gap },
  railItem: { width: rail.width, alignItems: 'center', gap: space.space2 },
  railTile: {
    width: rail.tile,
    height: rail.tile,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  code: { fontSize: rail.codeSize },
  center: { textAlign: 'center' },
});
