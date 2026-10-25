import { router, useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { useMinimiseOnScroll } from '@/ui/TabBar';
import { testBanner, testPhoto } from '@/dev/testImages';
import { Avatar } from '@/ui/Avatar';
import { CategoryButton, CategoryTray } from '@/ui/CategoryTray';
import { DateTile } from '@/ui/DateTile';
import { DisciplineTile } from '@/ui/DisciplineTile';
import { IconTile } from '@/ui/IconTile';
import { RowCard } from '@/ui/RowCard';
import { Section } from '@/ui/Section';
import { disciplineIcon } from '@/ui/Icon';
import { InstructorCard } from '@/ui/InstructorCard';
import { SearchField } from '@/ui/SearchField';
import { T } from '@/ui/T';
import { WorkshopCard } from '@/ui/WorkshopCard';

const band = component.homeBand;
const DAY_MS = 86_400_000;
const rail = component.disciplineRail;
const GROUP_RAIL = 6;

/**
 * §7.4 Home, one per category (canvas artboards Main, HomeSports, HomeEducation, HomeLanguages, HomeTray):
 * wordmark + category button, greeting, search, next booking (or empty card), disciplines rail,
 * group rail (not Sports, v1), people sorted by soonest availability; Sports adds "Book again".
 */
export default function Home() {
  const { c, scheme } = useTheme();
  const tabScroll = useMinimiseOnScroll(8, true).onScroll;
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
  // Light status bar text over the aubergine band while Home is on screen.
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle(scheme === 'dark' ? 'light' : 'dark');
    }, [scheme]),
  );

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
  // `at` makes each tap a new request, so Explore re-applies it even when the tab is already mounted.
  const openExplore = (params?: Record<string, string>) =>
    router.navigate({ pathname: '/explore', params: { ...params, at: String(Date.now()) } });
  const openProfile = (id: string, discipline: string) =>
    router.push({ pathname: '/instructor/[id]', params: { id, discipline } });
  const next = mine?.next;
  const soon = next && Date.parse(next.starts_at) - now.getTime() <= DAY_MS ? next : null;
  const again = category === 'sports' ? mine?.lastCompleted : null;
  const againCard =
    again && people.find((p) => p.id === again.instructor_id && p.discipline_id === again.discipline_id);

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        onScroll={tabScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.body,
          { paddingBottom: insets.bottom + component.tabBar.tabHeight + layout.sectionGap },
        ]}
      >
        {/* The aubergine band (owner revision D55): wordmark, category, greeting and search. */}
        <View
          style={[
            styles.band,
            {
              backgroundColor: c.band,
              paddingTop: insets.top + space.space3,
              paddingBottom: soon ? band.overlap + space.space6 : space.space6,
            },
          ]}
        >
          {/* Covers the pull-down bounce above the band. */}
          <View style={[styles.bounce, { backgroundColor: c.band }]} />
          <View style={styles.topRow}>
            <T variant="brandTitle" color={c.bandLabel} style={styles.wordmark} accessibilityRole="header">
              {t('brand.wordmark')}
            </T>
            <CategoryButton category={category} onPress={() => setTrayOpen(true)} onBand />
          </View>

          <View style={styles.greeting}>
            <T variant="brandTitle" color={c.bandLabel}>
              {name ? t(`home.greeting.${period}`, { name }) : t(`home.greeting.${period}Anon`)}
              <T variant="brandTitle" color={c.gold}>
                .
              </T>
            </T>
            <T variant="subheadline" color={c.bandLabel2}>
              {t(`home.sub.${category}`)}
            </T>
          </View>

          {/* Opens Explore with the keyboard up (§7.4 item 3); typing happens there. */}
          <SearchField
            value=""
            onChangeText={() => {}}
            placeholder={t(`home.search.${category}`)}
            onFocus={() => openExplore({ focus: '1' })}
            onBand
          />
        </View>

        {/* The next session leads only when it is within 24 h (owner); otherwise inspiration leads. */}
        {soon ? (
          <View style={styles.overlap}>
            <RowCard
              leading={<DateTile date={new Date(soon.starts_at)} />}
              title={`${formatClock(new Date(soon.starts_at), lang)} · ${soon.title}`}
              subtitle={`${inDays(soon.starts_at)} · ${soon.venue_name}`}
              onPress={() => router.push({ pathname: '/booking/[ref]', params: { ref: soon.ref } })}
            />
          </View>
        ) : next ? null : (
          <RowCard
            leading={<IconTile icon={category} />}
            title={t(`home.emptyTitle.${category}`)}
            subtitle={t(`home.emptySub.${category}`)}
            onPress={() => openExplore()}
          />
        )}

        {again && (
          <RowCard
            leading={<Avatar size={component.iconButton.size} image={testPhoto(again.instructor_name)} />}
            kicker={t('home.bookAgain')}
            title={t('home.bookAgainTitle', {
              discipline: (ar && again.discipline_ar) || again.discipline_en,
              name: again.instructor_name,
            })}
            subtitle={
              againCard?.next_at
                ? t('home.bookAgainNext', { when: when(againCard.next_at) })
                : t('home.bookAgainNone')
            }
            onPress={() => openProfile(again.instructor_id, again.discipline_id)}
            accessibilityLabel={t('home.bookAgain')}
          />
        )}

        <Section
          title={t(`home.rail.${category}`)}
          variant="title2"
          action={{ label: t('home.seeAll'), onPress: () => openExplore() }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rail}
            style={styles.bleed}
          >
            {disciplines.map((d) => (
              <DisciplineTile
                key={d.id}
                label={disciplineName(d, lang)}
                icon={disciplineIcon(d.icon)}
                code={d.code}
                onPress={() => openExplore({ discipline: d.id })}
              />
            ))}
          </ScrollView>
        </Section>

        {category !== 'sports' && groups.length > 0 && (
          <Section title={t(`home.groups.${category}`)} variant="title2">
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
                    category === 'hobbies'
                      ? router.push({
                          pathname: '/workshop/[id]',
                          params: { id: g.offering_id, slot: g.slot_id },
                        })
                      : router.push({
                          pathname: '/book/[offeringId]',
                          params: { offeringId: g.offering_id, slot: g.slot_id },
                        })
                  }
                />
              ))}
            </ScrollView>
          </Section>
        )}

        <Section title={t(`home.people.${category}`)} variant="title2">
          {people.length === 0 && (
            <T variant="subheadline" color={c.label2}>
              {t('home.noPeople')}
            </T>
          )}
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
                distanceKm: origin ? distanceKm(origin, p) : undefined,
                area: (ar && p.area_ar) || p.area_en,
                next: p.next_at ? when(p.next_at) : undefined,
                fromPrice: p.from_price,
              }}
              onPress={() => openProfile(p.id, p.discipline_id)}
            />
          ))}
        </Section>
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
  band: {
    marginHorizontal: -layout.sideMargin,
    paddingHorizontal: layout.sideMargin,
    gap: layout.cardGap,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  bounce: { position: 'absolute', start: 0, end: 0, top: -band.bounce, height: band.bounce },
  overlap: { marginTop: -(band.overlap + layout.cardGap) },
  bleed: { marginHorizontal: -layout.sideMargin },
  rail: { paddingHorizontal: layout.sideMargin, gap: rail.gap },
});
