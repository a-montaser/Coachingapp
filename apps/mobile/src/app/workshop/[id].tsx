import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useBookDraft } from '@/data/book';
import { useWorkshop } from '@/data/instructor';
import { cairoKey, clampSeats, maxWorkshopSeats, monthsAhead } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { IconTile } from '@/ui/IconTile';
import { MonthCalendar } from '@/ui/MonthCalendar';
import { RowCard } from '@/ui/RowCard';
import { Section } from '@/ui/Section';
import { EmptyState } from '@/ui/EmptyState';
import { testBanner, testPhoto } from '@/dev/testImages';
import { Avatar } from '@/ui/Avatar';
import { Hero } from '@/ui/Hero';
import { NavigationBar } from '@/ui/NavigationBar';
import { Pill } from '@/ui/Pill';
import { T } from '@/ui/T';

const hero = component.hero;
const BAR_CLEARANCE =
  component.button.height +
  component.bottomBar.padTop +
  component.bottomBar.padBottom +
  component.bottomBar.inset +
  layout.sectionGap;

/**
 * §7.7 Group page (canvas artboard 9, owner revision D54): banner, pill, title, description, instructor
 * row; a month calendar with the days it runs marked, that day's times (full ones disabled), then "How
 * many seats?" (1…min(3, left), nothing chosen at first, so Reserve lights up only once seats are picked);
 * Included / Take home / Bring / Cancellation as tiles. No price until Review & pay.
 * `?slot=` preselects that date (from Home, Explore or the instructor's list).
 */
export default function Workshop() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { id, slot: wanted } = useLocalSearchParams<{ id: string; slot?: string }>();
  const q = useWorkshop(id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollViewOffset(scrollRef);
  const [monthChoice, setMonthChoice] = useState<number | null>(null);
  const [dayChoice, setDayChoice] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [seats, setSeats] = useState<number | null>(null);
  const n = (x: number) => formatNumber(x, lang);
  const now = new Date();

  const slots = q.data?.slots ?? [];
  const dayOf = (iso: string) => cairoKey(new Date(iso));
  // Days it runs with seats left are marked; until a day is tapped: the requested date's, else the first open.
  const openDays = new Set(slots.filter((s) => s.seats_free > 0).map((s) => dayOf(s.starts_at)));
  const firstOpen =
    slots.find((s) => s.id === wanted && s.seats_free > 0) ?? slots.find((s) => s.seats_free > 0);
  const dayKey = dayChoice ?? (firstOpen ? dayOf(firstOpen.starts_at) : null);
  const month = monthChoice ?? (dayKey ? monthsAhead(dayKey, now) : 0);
  const daySlots = dayKey ? slots.filter((s) => dayOf(s.starts_at) === dayKey) : [];
  // One open time that day is chosen for the learner; more than one waits for a tap.
  const dayOpen = daySlots.filter((s) => s.seats_free > 0);
  const selectedId =
    slotId ?? (dayChoice === null && firstOpen ? firstOpen.id : dayOpen.length === 1 ? dayOpen[0]!.id : null);

  if (q.isLoading) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;
  if (!q.data) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: c.bg }]}>
        <EmptyState icon="hobbies" title={t('workshop.notFound')} body="" />
        <NavigationBar onBack={() => router.back()} />
      </View>
    );
  }

  const { offering: o, instructor: who } = q.data;
  const chosen = slots.find((s) => s.id === selectedId) ?? null;
  const max = chosen ? maxWorkshopSeats(chosen.seats_free) : 0;
  const count = seats === null ? null : clampSeats(seats, max);
  const when = chosen
    ? `${formatWeekday(new Date(chosen.starts_at), lang)} ${formatDayMonth(new Date(chosen.starts_at), lang)} · ${formatClock(new Date(chosen.starts_at), lang)}`
    : null;
  const summary = !when
    ? t('workshop.pickDate')
    : count
      ? `${when} · ${t('workshop.seat', { count, n: n(count) })}`
      : when;
  const facts = [
    o.included && { key: 'inc', icon: 'check' as const, title: t('workshop.included'), body: o.included },
    o.take_home && {
      key: 'home',
      icon: 'hobbies' as const,
      title: t('workshop.takeHome'),
      body: o.take_home,
    },
    o.what_to_bring && {
      key: 'bring',
      icon: 'bag' as const,
      title: t('workshop.bring'),
      body: o.what_to_bring,
    },
    {
      key: 'cancel',
      icon: 'clock' as const,
      title: t('workshop.cancellation'),
      body: t('instructor.policyCancel'),
    },
  ].filter((f) => !!f);
  const ar = lang === 'ar';
  const venue = o.venue
    ? [o.venue.name, (ar && who.area_ar) || who.area_en].join(', ')
    : (ar && who.area_ar) || who.area_en;

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + BAR_CLEARANCE }}
      >
        <Hero
          height={hero.workshop}
          icon="hobbies"
          label={t('card.photoPlaceholder')}
          image={testBanner(o.discipline_id, 'hobbies')}
        />
        <View style={[styles.sheet, { backgroundColor: c.bg }]}>
          <View style={styles.intro}>
            <View style={styles.pill}>
              <Pill
                tone="next"
                label={o.level_label ? t('workshop.pill', { level: o.level_label }) : t('workshop.pillPlain')}
              />
            </View>
            <T variant="title1" accessibilityRole="header">
              {o.title}
            </T>
            {o.description && (
              <T variant="subheadline" color={c.label2}>
                {o.description}
              </T>
            )}
          </View>

          <RowCard
            leading={<Avatar size={component.iconButton.size} image={testPhoto(who.display_name)} />}
            title={t('workshop.with', { name: who.display_name })}
            subtitle={`${n(who.rating_avg)} (${n(who.rating_count)}) · ${venue}`}
            onPress={() =>
              router.push({
                pathname: '/instructor/[id]',
                params: { id: o.instructor_id, discipline: o.discipline_id },
              })
            }
          />

          <Section title={t('workshop.pickDate')} variant="headline">
            {slots.length === 0 ? (
              <T variant="subheadline" color={c.label2}>
                {t('workshop.noDates')}
              </T>
            ) : (
              <MonthCalendar
                offset={month}
                onOffset={setMonthChoice}
                maxOffset={2}
                marked={openDays}
                selected={dayKey}
                onSelect={(k) => {
                  setDayChoice(k);
                  setSlotId(null);
                }}
                markedLabel={t('calendar.hasTimes')}
                now={now}
              />
            )}
          </Section>

          {dayKey && daySlots.length > 0 && (
            <Section
              title={t('workshop.pickTime', {
                day: formatWeekday(new Date(`${dayKey}T12:00:00Z`), lang, 'long'),
              })}
              variant="headline"
            >
              <View style={styles.chips} accessibilityRole="radiogroup">
                {daySlots.map((s) => {
                  const time = formatClock(new Date(s.starts_at), lang);
                  const full = s.seats_free <= 0;
                  const state = full ? t('card.full') : t('workshop.left', { n: n(s.seats_free) });
                  return (
                    <Chip
                      key={s.id}
                      radio
                      label={`${time} · ${state}`}
                      accessibilityLabel={t('workshop.timeLabel', { time, state })}
                      selected={s.id === selectedId}
                      disabled={full}
                      onPress={() => setSlotId(s.id)}
                    />
                  );
                })}
              </View>
            </Section>
          )}

          {chosen && max > 0 && (
            <Section title={t('workshop.seatsQuestion')} variant="headline">
              <T variant="footnote" color={c.label2}>
                {t('workshop.seatsHint', { n: n(max) })}
              </T>
              <View
                style={styles.chips}
                accessibilityRole="radiogroup"
                accessibilityLabel={t('workshop.seats')}
              >
                {Array.from({ length: max }, (_, i) => i + 1).map((k) => (
                  <Chip
                    key={k}
                    radio
                    label={t('workshop.seat', { count: k, n: n(k) })}
                    selected={count === k}
                    onPress={() => setSeats(k)}
                  />
                ))}
              </View>
            </Section>
          )}

          <View style={styles.facts}>
            {facts.map((f) => (
              <View key={f.key} style={[styles.fact, { backgroundColor: c.surface2 }]}>
                <IconTile icon={f.icon} />
                <T variant="headline">{f.title}</T>
                <T variant="footnote" color={c.label2}>
                  {f.body}
                </T>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>

      <NavigationBar title={o.title} titleAfterHero scrollY={scrollY} onBack={() => router.back()} />
      {/* No price here: it comes at the end of the decision, on Review & pay (owner revision D54). */}
      <BottomActionBar caption={summary}>
        <Button
          label={t('workshop.reserve')}
          variant="primary"
          disabled={!chosen || max < 1 || !count}
          reason={chosen && max > 0 ? t('workshop.pickSeats') : t('workshop.pickDateReason')}
          onPress={() => {
            if (!chosen || !count) return;
            useBookDraft
              .getState()
              .set({ offeringId: o.id, slotId: chosen.id, seats: count, childId: null, note: '' });
            router.push('/review');
          }}
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
  intro: { gap: space.space2 },
  pill: { flexDirection: 'row' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space3 },
  fact: { flexGrow: 1, flexBasis: '40%', borderRadius: radius.lg, padding: space.space4, gap: space.space1 },
});
