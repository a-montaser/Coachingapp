import { router, useLocalSearchParams } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useWorkshop } from '@/data/instructor';
import { clampSeats, maxWorkshopSeats } from '@/data/rules';
import { useLang } from '@/i18n';
import {
  formatClock,
  formatDayMonth,
  formatDayOfMonth,
  formatNumber,
  formatPrice,
  formatWeekday,
} from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { Hero } from '@/ui/Hero';
import { Icon } from '@/ui/Icon';
import { NavigationBar } from '@/ui/NavigationBar';
import { Pill } from '@/ui/Pill';
import { Stepper } from '@/ui/Stepper';
import { T } from '@/ui/T';

const hero = component.hero;
const db = component.dateButton;
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
        <Hero height={hero.workshop} icon="hobbies" label={t('card.photoPlaceholder')} />
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

          <Card
            style={styles.who}
            accessibilityLabel={t('workshop.with', { name: who.display_name })}
            onPress={() =>
              router.push({
                pathname: '/instructor/[id]',
                params: { id: o.instructor_id, discipline: o.discipline_id },
              })
            }
          >
            <View style={[styles.avatar, { backgroundColor: c.surface2 }]}>
              <Icon name="profile" size={component.groupedList.iconSize} color={c.label3} />
            </View>
            <View style={styles.grow}>
              <T variant="headline">{t('workshop.with', { name: who.display_name })}</T>
              <T variant="footnote" color={c.label2}>
                {`${n(who.rating_avg)} (${n(who.rating_count)}) · ${venue}`}
              </T>
            </View>
            <Icon name="forward" size={component.groupedList.iconSize} color={c.label3} />
          </Card>

          <Section title={t('workshop.pickDate')}>
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
                  const ink = on ? c.onBrand : c.label;
                  return (
                    <Pressable
                      key={s.id}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: on, disabled: full }}
                      accessibilityLabel={t('workshop.dateLabel', {
                        date: `${formatWeekday(d, lang, 'long')} ${formatDayMonth(d, lang)}`,
                        time: formatClock(d, lang),
                        state,
                      })}
                      disabled={full}
                      onPress={() => setSlotId(s.id)}
                      style={[
                        styles.date,
                        {
                          borderColor: on ? c.brand : c.separator,
                          backgroundColor: on ? c.brand : c.surface,
                        },
                        full && styles.full,
                      ]}
                    >
                      <T fit={1} variant="caption1" weight="700" color={ink}>
                        {formatWeekday(d, lang).toUpperCase()}
                      </T>
                      <T fit={1} weight="700" color={ink} style={styles.day}>
                        {formatDayOfMonth(d, lang)}
                      </T>
                      <T fit={1} variant="caption1" color={ink}>
                        {formatClock(d, lang)}
                      </T>
                      <T fit={1} variant="caption1" weight="600" color={ink}>
                        {state}
                      </T>
                    </Pressable>
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
        {/* shortcut: Review & pay arrives in T15; Reserve stays disabled until then. */}
        <Button
          label={t('workshop.reserve')}
          variant="primary"
          disabled
          reason={t('common.comingSoon')}
          onPress={() => {}}
        />
      </BottomActionBar>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <T variant="headline" accessibilityRole="header">
        {title}
      </T>
      {children}
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
  who: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space3 },
  avatar: {
    width: component.iconButton.size,
    height: component.iconButton.size,
    borderRadius: component.iconButton.size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grow: { flex: 1 },
  section: { gap: space.space3 },
  dates: { flexDirection: 'row', gap: space.space2 },
  date: {
    flex: 1,
    minWidth: 0,
    borderRadius: radius.sm,
    borderWidth: db.border,
    paddingVertical: db.padV,
    paddingHorizontal: db.padH,
    alignItems: 'center',
    gap: space.space1 / 2,
  },
  full: { opacity: db.fullOpacity },
  day: { fontSize: db.daySize },
  seats: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space4 },
});
