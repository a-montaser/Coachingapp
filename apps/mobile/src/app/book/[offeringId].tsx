import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { firstName, useBookDraft, useBookOptions } from '@/data/book';
import { useFamily } from '@/data/family';
import { cairoHM, cairoKey, isBookable, monthsAhead, sameCairoDay } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatNumber, formatTime, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { IconTile } from '@/ui/IconTile';
import { RowCard } from '@/ui/RowCard';
import { TextField } from '@/ui/TextField';
import { MonthCalendar } from '@/ui/MonthCalendar';
import { EmptyState } from '@/ui/EmptyState';
import { NavigationBar } from '@/ui/NavigationBar';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { T } from '@/ui/T';
import { TimeSlots, type Slot } from '@/ui/TimeSlots';

const BAR_CLEARANCE =
  component.button.height +
  component.bottomBar.padTop +
  component.bottomBar.padBottom +
  component.bottomBar.inset +
  layout.sectionGap;
const KIDS_AGE = { min: 6, max: 14 }; // §9.4 default when an offering sets no range

/**
 * §7.8 Book, lessons only (owner revision D54): Adults | Kids (only those offered), a kids child card,
 * a month calendar with open days marked, slots by part of day, a note, and Continue; no price until
 * Review & pay. `?slot=` preselects a time (from the instructor profile).
 * "Repeat weekly" is Phase 2 and hidden (R6.1).
 */
export default function Book() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { offeringId, slot: wanted } = useLocalSearchParams<{ offeringId: string; slot?: string }>();
  const q = useBookOptions(offeringId);
  const userId = useSession().session?.user.id;
  const family = useFamily(userId).data ?? [];
  const draft = useBookDraft();
  const now = new Date();
  const n = (x: number) => formatNumber(x, lang);

  const slots = q.data?.slots ?? [];
  const wantedSlot = slots.find((s) => s.id === wanted);
  const [monthChoice, setMonthChoice] = useState<number | null>(null);
  const [dayChoice, setDayChoice] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(wanted ?? null);
  const [childIndex, setChildIndex] = useState(0);
  const [note, setNote] = useState('');

  if (q.isLoading) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;
  if (!q.data) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: c.bg }]}>
        <EmptyState icon="bookings" title={t('book.notFound')} body="" />
        <NavigationBar onBack={() => router.back()} />
      </View>
    );
  }

  const { offering: o, siblings, instructor } = q.data;
  const name = firstName(instructor.display_name);
  const discipline = (lang === 'ar' && instructor.discipline_ar) || instructor.discipline_en;
  const open = (iso: string, seats: number) => seats > 0 && isBookable(new Date(iso), now);
  // Days with open times are marked on the month calendar (owner revision D54).
  const openDays = new Set(
    slots.filter((s) => open(s.starts_at, s.seats_free)).map((s) => cairoKey(new Date(s.starts_at))),
  );
  // Until a day is tapped: the requested slot's day, else the first day with open times, else today.
  const defaultDay = wantedSlot
    ? cairoKey(new Date(wantedSlot.starts_at))
    : ([...openDays].sort()[0] ?? cairoKey(now));
  const dayKey = dayChoice ?? defaultDay;
  const month = monthChoice ?? monthsAhead(dayKey, now);
  const daySlots: Slot[] = slots
    .filter((s) => cairoKey(new Date(s.starts_at)) === dayKey)
    .map((s) => ({
      id: s.id,
      start: cairoHM(new Date(s.starts_at)),
      end: cairoHM(new Date(s.ends_at)),
      state: open(s.starts_at, s.seats_free) ? 'open' : 'booked',
    }));
  const chosen = slots.find((s) => s.id === slotId && open(s.starts_at, s.seats_free)) ?? null;

  // Kids: a family member in the offering's age range (§9.4).
  const min = o.min_age ?? KIDS_AGE.min;
  const max = o.max_age ?? KIDS_AGE.max;
  const eligible = family.filter((m) => m.age >= min && m.age <= max);
  const child = o.type === 'kids' ? (eligible[childIndex % Math.max(eligible.length, 1)] ?? null) : null;
  const needsChild = o.type === 'kids' && !child;

  const desc =
    o.type === 'private'
      ? t('book.desc.private', { name, n: n(o.duration_min) })
      : o.type === 'group'
        ? t('book.desc.group', { cap: n(o.capacity), n: n(o.duration_min) })
        : t('book.desc.kids', { min: n(min), max: n(max), n: n(o.duration_min) });
  const summary = chosen
    ? t('book.summary', {
        day: sameCairoDay(new Date(chosen.starts_at), now)
          ? t('dayPicker.today')
          : formatWeekday(new Date(chosen.starts_at), lang),
        start: formatTime(...cairoHM(new Date(chosen.starts_at)), lang),
        end: formatTime(...cairoHM(new Date(chosen.ends_at)), lang),
      })
    : t('book.pickTime');

  const switchType = (i: number) => {
    const next = siblings[i];
    if (!next || next.id === o.id) return;
    setSlotId(null);
    setDayChoice(null);
    setMonthChoice(null);
    router.setParams({ offeringId: next.id, slot: undefined });
  };
  const canContinue = Boolean(chosen) && !needsChild;
  const goOn = () => {
    if (!chosen || needsChild) return;
    draft.set({
      offeringId: o.id,
      slotId: chosen.id,
      seats: 1,
      childId: child?.id ?? null,
      note: note.trim(),
    });
    router.push('/review');
  };

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + component.navBar.height + space.space4,
            paddingBottom: insets.bottom + BAR_CLEARANCE,
          },
        ]}
      >
        {siblings.length > 1 && (
          <SegmentedControl
            accessibilityLabel={t('book.typeLabel')}
            segments={siblings.map((s) => t(`book.audience.${s.type}`))}
            selectedIndex={Math.max(
              0,
              siblings.findIndex((s) => s.id === o.id),
            )}
            onChange={switchType}
          />
        )}
        <T variant="footnote" color={c.label2}>
          {desc}
        </T>

        {o.type === 'kids' &&
          (child ? (
            <RowCard
              leading={<IconTile icon="family" />}
              title={t('book.childTitle', { name: child.first_name, age: n(child.age) })}
              subtitle={t('family.infoGuardian')}
              trailing={
                <Button
                  label={t('book.change')}
                  size="small"
                  onPress={() =>
                    eligible.length > 1 ? setChildIndex(childIndex + 1) : router.push('/family')
                  }
                />
              }
            />
          ) : (
            <RowCard
              leading={<IconTile icon="plus" />}
              title={
                family.length ? t('book.childOutOfRange', { min: n(min), max: n(max) }) : t('book.addChild')
              }
              onPress={() => router.push('/family-member')}
            />
          ))}

        <MonthCalendar
          offset={month}
          onOffset={setMonthChoice}
          maxOffset={1}
          marked={openDays}
          selected={dayKey}
          onSelect={(k) => {
            setDayChoice(k);
            setSlotId(null);
          }}
          markedLabel={t('calendar.hasTimes')}
          now={now}
        />

        {daySlots.length ? (
          <TimeSlots slots={daySlots} selectedId={chosen?.id} onSelect={(s) => setSlotId(s.id)} />
        ) : (
          <T variant="subheadline" color={c.label2} accessibilityLiveRegion="polite">
            {t('book.noTimes', { day: formatWeekday(new Date(`${dayKey}T12:00:00Z`), lang, 'long'), name })}
          </T>
        )}

        <View style={styles.noteWrap}>
          <TextField
            value={note}
            onChangeText={setNote}
            placeholder={t('book.note', { name })}
            multiline
            maxLength={500}
          />
        </View>
      </ScrollView>

      <NavigationBar title={t('book.title', { name })} subtitle={discipline} onBack={() => router.back()} />
      {/* No price here: it comes at the end of the decision, on Review & pay (owner revision D54). */}
      <BottomActionBar caption={summary}>
        <Button
          label={chosen ? t('book.continue') : t('book.pickTime')}
          variant="primary"
          disabled={!canContinue}
          reason={!chosen ? t('book.pickTimeReason') : needsChild ? t('book.needChild') : undefined}
          onPress={goOn}
        />
      </BottomActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { justifyContent: 'center', padding: layout.sideMargin },
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4 },
  noteWrap: { marginTop: space.space2 },
});
