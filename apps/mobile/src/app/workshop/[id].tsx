import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useBookDraft } from '@/data/book';
import { useWorkshop } from '@/data/instructor';
import { clampSeats, maxWorkshopSeats } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatPrice, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { DateButton } from '@/ui/DateButton';
import { RowCard } from '@/ui/RowCard';
import { Section } from '@/ui/Section';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { testBanner, testPhoto } from '@/dev/testImages';
import { Avatar } from '@/ui/Avatar';
import { Hero } from '@/ui/Hero';
import { NavigationBar } from '@/ui/NavigationBar';
import { Pill } from '@/ui/Pill';
import { Stepper } from '@/ui/Stepper';
import { T } from '@/ui/T';

const hero = component.hero;
const BAR_CLEARANCE =
  component.button.height +
  component.bottomBar.padTop +
  component.bottomBar.padBottom +
  component.bottomBar.inset +
  layout.sectionGap;

/**
 * §7.7 Workshop (canvas artboard 9): banner, pill, title, description, instructor row; up to three
 * dates (full ones disabled); seats 1…min(3, left); Included / Take home / cancellation; total.
 * `?slot=` preselects a date (from Home, Explore or the instructor's list).
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
  const [slotId, setSlotId] = useState<string | null>(null);
  const [seats, setSeats] = useState(1);
  const n = (x: number) => formatNumber(x, lang);

  const slots = q.data?.slots ?? [];
  // Until the learner taps a date: the requested one, else the first with seats left.
  const firstOpen =
    slots.find((s) => s.id === wanted && s.seats_free > 0) ?? slots.find((s) => s.seats_free > 0);
  const selectedId = slotId ?? firstOpen?.id ?? null;

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
  const count = clampSeats(seats, max);
  const total = o.price_egp * Math.max(count, 1);
  const summary = chosen
    ? `${formatWeekday(new Date(chosen.starts_at), lang)} ${formatDayMonth(new Date(chosen.starts_at), lang)} · ${formatClock(new Date(chosen.starts_at), lang)} · ${t('workshop.seat', { count, n: n(count) })}`
    : t('workshop.pickDate');
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
              <View style={styles.dates} accessibilityRole="radiogroup">
                {slots.map((s) => {
                  const d = new Date(s.starts_at);
                  const full = s.seats_free <= 0;
                  const on = s.id === selectedId;
                  const state = full ? t('card.full') : t('workshop.left', { n: n(s.seats_free) });
                  return (
                    <DateButton
                      key={s.id}
                      date={d}
                      state={state}
                      selected={on}
                      disabled={full}
                      onPress={() => setSlotId(s.id)}
                      accessibilityLabel={t('workshop.dateLabel', {
                        date: `${formatWeekday(d, lang, 'long')} ${formatDayMonth(d, lang)}`,
                        time: formatClock(d, lang),
                        state,
                      })}
                    />
                  );
                })}
              </View>
            )}
          </Section>

          <Card style={styles.seats}>
            <View style={styles.grow}>
              <T variant="headline">{t('workshop.seats')}</T>
              <T variant="footnote" color={c.label2}>
                {max > 0 ? t('workshop.seatsHint', { n: n(max) }) : t('workshop.seatsFull')}
              </T>
            </View>
            <Stepper
              value={Math.max(count, 1)}
              min={1}
              max={Math.max(max, 1)}
              onChange={setSeats}
              accessibilityLabel={t('workshop.seats')}
              decrementLabel={t('workshop.fewer')}
              incrementLabel={t('workshop.more')}
            />
          </Card>

          <GroupedList
            rows={[
              ...(o.included
                ? [
                    {
                      key: 'inc',
                      icon: 'check' as const,
                      title: t('workshop.included'),
                      subtitle: o.included,
                    },
                  ]
                : []),
              ...(o.take_home
                ? [
                    {
                      key: 'home',
                      icon: 'hobbies' as const,
                      title: t('workshop.takeHome'),
                      subtitle: o.take_home,
                    },
                  ]
                : []),
              {
                key: 'cancel',
                icon: 'clock' as const,
                title: t('instructor.policyCancel'),
                subtitle: o.what_to_bring ?? undefined,
              },
            ]}
          />
        </View>
      </Animated.ScrollView>

      <NavigationBar title={o.title} titleAfterHero scrollY={scrollY} onBack={() => router.back()} />
      <BottomActionBar caption={summary} price={formatPrice(total, lang)}>
        <Button
          label={t('workshop.reserve')}
          variant="primary"
          disabled={!chosen || max < 1}
          reason={t('workshop.pickDateReason')}
          onPress={() => {
            if (!chosen) return;
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
  dates: { flexDirection: 'row', gap: space.space2 },
  grow: { flex: 1 },
  seats: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space4 },
});
