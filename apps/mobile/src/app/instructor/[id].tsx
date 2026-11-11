import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useMyInstructorId, useSession } from '@/data/auth';
import { openChat } from '@/data/chat';
import { useFavourites } from '@/data/favourites';
import { distanceKm, cairoDaysUntil } from '@/data/home';
import { useOrigin } from '@/data/explore';
import { nextAvailable, useInstructor, type Offering } from '@/data/instructor';
import { cairoKey, monthsAhead } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatClock, formatDistance, formatNumber, formatPrice, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { Chip } from '@/ui/Chip';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { Hero } from '@/ui/Hero';
import { Icon, disciplineIcon } from '@/ui/Icon';
import { MonthCalendar } from '@/ui/MonthCalendar';
import { NavigationBar } from '@/ui/NavigationBar';
import { Section } from '@/ui/Section';
import { SessionRow } from '@/ui/SessionRow';
import { showToast } from '@/ui/Toast';
import { T } from '@/ui/T';

const hero = component.hero;
// Room for the floating bottom bar: its button plus the bar's own padding, then a gap.
const BAR_CLEARANCE =
  component.button.height +
  component.bottomBar.padTop +
  component.bottomBar.padBottom +
  component.bottomBar.inset +
  layout.sectionGap;

/**
 * §7.6 Instructor profile (canvas artboard 8), for one of the instructor's disciplines (`?discipline=`).
 * Hobbies: upcoming workshops, then private lessons; other categories: session types with prices.
 * Message opens the chat with them (Phase 2 R1.9); the heart keeps them in Favourites (R3).
 */
export default function InstructorProfile() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { id, discipline } = useLocalSearchParams<{ id: string; discipline: string }>();
  const q = useInstructor(id, discipline);
  const origin = useOrigin();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollViewOffset(scrollRef);
  // An instructor looking at their own profile has nobody to message there.
  const self = useMyInstructorId(useSession().session?.user.id).data === id;
  const fav = useFavourites(); // Phase 2 R3.1: the heart in the glass cluster (§7.6)
  const [monthChoice, setMonthChoice] = useState<number | null>(null);
  const [dayChoice, setDayChoice] = useState<string | null>(null);
  const ar = lang === 'ar';
  const n = (x: number) => formatNumber(x, lang);
  const now = new Date();
  const when = (iso: string) => {
    const d = new Date(iso);
    const days = cairoDaysUntil(d, now);
    const day =
      days === 0 ? t('dayPicker.today') : days === 1 ? t('common.tomorrow') : formatWeekday(d, lang);
    return `${day} ${formatClock(d, lang)}`;
  };

  if (q.isLoading) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;
  if (!q.data) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: c.bg }]}>
        <EmptyState
          icon="profile"
          title={t(q.isError ? 'instructor.loadError' : 'instructor.notFound')}
          body=""
        />
        <NavigationBar onBack={() => router.back()} />
      </View>
    );
  }

  const { card: p, offerings, slots } = q.data;
  const disciplineLabel = (ar && p.discipline_ar) || p.discipline_en;
  const isHobbies = p.category_id === 'hobbies';
  const workshops = offerings.filter((o) => o.type === 'workshop');
  const lessons = offerings.filter((o) => o.type !== 'workshop');
  const workshopSlots = slots.filter((s) => workshops.some((w) => w.id === s.offering_id));
  const soonest = nextAvailable(slots, offerings);
  // Full calendar under Next available (D75): every open lesson time, by Cairo day.
  const lessonSlots = slots.filter((s) => lessons.some((o) => o.id === s.offering_id));
  const dayOf = (iso: string) => cairoKey(new Date(iso));
  const openDays = new Set(lessonSlots.map((s) => dayOf(s.starts_at)));
  const dayKey = dayChoice ?? (lessonSlots[0] ? dayOf(lessonSlots[0].starts_at) : null);
  const month = monthChoice ?? (dayKey ? monthsAhead(dayKey, now) : 0);
  const lastMonth = lessonSlots.length ? monthsAhead(dayOf(lessonSlots.at(-1)!.starts_at), now) : 0;
  const daySlots = dayKey ? lessonSlots.filter((s) => dayOf(s.starts_at) === dayKey) : [];
  const venue = offerings.find((o) => o.venue)?.venue;
  const bring = offerings.find((o) => o.what_to_bring)?.what_to_bring;
  const km = origin ? distanceKm(origin, p) : null;
  const facts = [
    p.years ? t('instructor.years', { count: p.years, n: n(p.years) }) : null,
    p.certification,
    km !== null ? formatDistance(Math.round(km * 10) / 10, lang) : null,
    (ar && p.area_ar) || p.area_en,
  ].filter(Boolean);

  // Several session types can share a time, so each time names its type ("Tomorrow 09:00 · Small group").
  const sessionName = (offeringId: string) => {
    const o = lessons.find((x) => x.id === offeringId);
    return !o ? '' : isHobbies ? o.title : t(`instructor.types.${o.type}`);
  };
  const detail = (o: Offering) => {
    const bits = [t('instructor.minutes', { n: n(o.duration_min) })];
    if (o.type === 'private') bits.push(isHobbies && o.included ? o.included : t('instructor.onePerson'));
    if (o.type === 'group') bits.push(t('instructor.upTo', { n: n(o.capacity) }));
    if (o.type === 'kids') {
      if (o.min_age && o.max_age) bits.push(t('instructor.ages', { min: n(o.min_age), max: n(o.max_age) }));
      bits.push(t('instructor.upToKids', { n: n(o.capacity) }));
    }
    return bits.join(' · ');
  };
  // Book opens the cheapest lesson type (lessons are sorted by price); a slot chip opens its own offering at that time.
  const toBook = (offeringId = lessons[0]?.id, slot?: string) => {
    if (offeringId)
      router.push({ pathname: '/book/[offeringId]', params: slot ? { offeringId, slot } : { offeringId } });
    else if (workshopSlots[0])
      router.push({ pathname: '/workshop/[id]', params: { id: workshopSlots[0].offering_id } });
  };

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + BAR_CLEARANCE }}
      >
        <Hero
          height={hero.instructor}
          icon={disciplineIcon(p.discipline_id) ?? 'profile'}
          label={t('card.photoPlaceholder')}
        />
        <View style={[styles.sheet, { backgroundColor: c.bg }]}>
          <View style={styles.intro}>
            <T variant="brandTitle" accessibilityRole="header">
              {p.display_name}
            </T>
            <T variant="subheadline" color={c.label2}>
              {[disciplineLabel, p.levels].filter(Boolean).join(' · ')}
            </T>
            <View style={styles.facts}>
              <Icon name="star" size={component.instructorCard.starSize} color={c.gold} />
              <T variant="footnote" weight="700">
                {n(p.rating_avg)}
              </T>
              <T variant="footnote">
                {t('instructor.reviews', { count: p.rating_count, n: n(p.rating_count) })}
              </T>
              {facts.length > 0 && (
                <T variant="footnote" color={c.label2} style={styles.shrink}>
                  {'· ' + facts.join(' · ')}
                </T>
              )}
            </View>
          </View>

          <Card style={styles.next}>
            <View style={styles.headRow}>
              <T variant="headline" style={styles.grow}>
                {t('instructor.nextAvailable')}
              </T>
              <Button
                label={t('instructor.allTimes')}
                size="small"
                disabled={!lessons.length}
                onPress={() => toBook()}
              />
            </View>
            {soonest.length ? (
              <View style={styles.chips}>
                {soonest.map((s) => (
                  <Chip
                    key={s.id}
                    label={`${when(s.starts_at)} · ${sessionName(s.offering_id)}`}
                    onPress={() => toBook(s.offering_id, s.id)}
                  />
                ))}
              </View>
            ) : (
              <T variant="footnote" color={c.label2}>
                {t('instructor.noTimes')}
              </T>
            )}
          </Card>

          {lessonSlots.length > 0 && (
            <Card style={styles.next}>
              <MonthCalendar
                offset={month}
                onOffset={setMonthChoice}
                maxOffset={Math.max(lastMonth, month)}
                marked={openDays}
                selected={dayKey}
                onSelect={setDayChoice}
                markedLabel={t('calendar.hasTimes')}
                now={now}
              />
              {daySlots.length > 0 && (
                <View style={styles.chips}>
                  {daySlots.map((s) => (
                    <Chip
                      key={s.id}
                      label={`${formatClock(new Date(s.starts_at), lang)} · ${sessionName(s.offering_id)}`}
                      onPress={() => toBook(s.offering_id, s.id)}
                    />
                  ))}
                </View>
              )}
            </Card>
          )}

          {isHobbies && workshopSlots.length > 0 && (
            <Section title={t('instructor.upcomingWorkshops')}>
              <Card>
                {workshopSlots.map((s, i) => {
                  const w = workshops.find((o) => o.id === s.offering_id)!;
                  return (
                    <SessionRow
                      key={s.id}
                      divided={i > 0}
                      date={new Date(s.starts_at)}
                      title={w.title}
                      meta={[
                        `${formatClock(new Date(s.starts_at), lang)}–${formatClock(new Date(s.ends_at), lang)}`,
                        w.level_label,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                      highlight={t('card.spotsLeft', { left: n(s.seats_free), total: n(w.capacity) })}
                      price={formatPrice(w.price_egp, lang)}
                      onPress={() =>
                        router.push({ pathname: '/workshop/[id]', params: { id: w.id, slot: s.id } })
                      }
                    />
                  );
                })}
              </Card>
            </Section>
          )}

          {lessons.length > 0 && (
            <Section title={t(isHobbies ? 'instructor.privateLessons' : 'instructor.sessions')}>
              <GroupedList
                rows={lessons.map((o) => ({
                  key: o.id,
                  icon: o.type === 'kids' ? 'family' : 'profile',
                  title: isHobbies ? o.title : t(`instructor.types.${o.type}`),
                  subtitle: detail(o),
                  value: formatPrice(o.price_egp, lang),
                  onPress: () => toBook(o.id),
                }))}
              />
            </Section>
          )}

          <GroupedList
            rows={[
              ...(venue
                ? [
                    {
                      key: 'venue',
                      icon: 'explore' as const,
                      title: venue.name,
                      subtitle: [(ar && p.area_ar) || p.area_en, venue.notes].filter(Boolean).join(' · '),
                    },
                  ]
                : []),
              ...(bring
                ? [
                    {
                      key: 'bring',
                      icon: 'check' as const,
                      title: t('instructor.whatToBring'),
                      subtitle: bring,
                    },
                  ]
                : []),
              { key: 'cancel', icon: 'clock' as const, title: t('instructor.policyCancel') },
              ...(p.reply_label ? [{ key: 'reply', icon: 'messages' as const, title: p.reply_label }] : []),
            ]}
          />
        </View>
      </Animated.ScrollView>

      <NavigationBar
        title={p.display_name}
        titleAfterHero
        scrollY={scrollY}
        onBack={() => router.back()}
        actions={[
          {
            icon: 'share',
            label: t('common.share'),
            onPress: () =>
              Share.share({
                message: t('instructor.share', { name: p.display_name, discipline: disciplineLabel }),
              }),
          },
          {
            icon: fav.has(id) ? 'heartFill' : 'heart',
            label: t(fav.has(id) ? 'favourites.remove' : 'favourites.add', { name: p.display_name }),
            onPress: () => fav.toggle(id),
          },
        ]}
      />
      <BottomActionBar caption={t('instructor.from')} price={formatPrice(p.from_price, lang)}>
        {!self && (
          <Button
            label={t('chat.message')}
            variant="secondary"
            onPress={() => void openChat(id, () => showToast(t('chat.openFailed')))}
          />
        )}
        <Button
          label={t('instructor.book')}
          variant="primary"
          disabled={!lessons.length && !workshopSlots.length}
          onPress={() => toBook()}
        />
      </BottomActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { justifyContent: 'center', padding: layout.sideMargin },
  sheet: {
    marginTop: -hero.overlap,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: layout.sideMargin,
    paddingTop: space.space6,
    gap: layout.cardGap,
  },
  intro: { gap: space.space1 },
  facts: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: space.space1,
    marginTop: space.space1,
  },
  shrink: { flexShrink: 1 },
  next: { padding: space.space4, gap: space.space3 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
