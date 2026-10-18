import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
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

const rail = component.disciplineRail;
const GROUP_RAIL = 6;

/**
 * §7.4 Home, one per category (canvas artboards Main, HomeSports, HomeEducation, HomeLanguages, HomeTray):
 * wordmark + category button, greeting, search, next booking (or empty card), disciplines rail,
 * group rail (not Sports, v1), people sorted by soonest availability; Sports adds "Book again".
 */
export default function Home() {
  const { c } = useTheme();
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
  // shortcut: Booking detail arrives in T17; until then the next-booking card opens Bookings.
  // `at` makes each tap a new request, so Explore re-applies it even when the tab is already mounted.
  const openExplore = (params?: Record<string, string>) =>
    router.navigate({ pathname: '/explore', params: { ...params, at: String(Date.now()) } });
  const openProfile = (id: string, discipline: string) =>
    router.push({ pathname: '/instructor/[id]', params: { id, discipline } });
  const next = mine?.next;
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
          <RowCard
            leading={<DateTile date={new Date(next.starts_at)} />}
            kicker={t(next.type === 'workshop' ? 'home.kickerWorkshop' : 'home.kickerSession', {
              when: inDays(next.starts_at),
            })}
            title={next.title}
            subtitle={`${formatClock(new Date(next.starts_at), lang)} · ${next.venue_name}`}
            onPress={() => router.navigate('/bookings')}
          />
        ) : (
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
                    price: g.price_egp,
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
  bleed: { marginHorizontal: -layout.sideMargin },
  rail: { paddingHorizontal: layout.sideMargin, gap: rail.gap },
});
