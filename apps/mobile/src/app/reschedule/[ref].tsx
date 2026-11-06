import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useBookOptions } from '@/data/book';
import { bookingErrorKey, rescheduleBooking, useMyBooking, type BookingErrorKey } from '@/data/checkout';
import { cairoHM, cairoKey, isBookable, monthsAhead } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Banner } from '@/ui/Banner';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { EmptyState } from '@/ui/EmptyState';
import { NavigationBar } from '@/ui/NavigationBar';
import { MonthCalendar } from '@/ui/MonthCalendar';
import { TimeSlots } from '@/ui/TimeSlots';
import { showToast } from '@/ui/Toast';

const BAR_CLEARANCE =
  component.button.height +
  component.bottomBar.padTop +
  component.bottomBar.padBottom +
  component.bottomBar.inset +
  layout.sectionGap;

/**
 * §9.3 Reschedule: the same booking (same ref and payment) moves to another open time of the same
 * offering, picked on a month calendar with the open days marked (owner revision D54). Allowed until 24 h before the start (D29); the
 * SQL decides, the app only offers times with enough seats.
 */
export default function Reschedule() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const b = useMyBooking(ref).data;
  const q = useBookOptions(b?.offering_id ?? '');
  const [monthChoice, setMonthChoice] = useState<number | null>(null);
  const [dayChoice, setDayChoice] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<BookingErrorKey | null>(null);
  if (!b || q.isLoading) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;

  const now = new Date();
  const open = (q.data?.slots ?? []).filter(
    (s) => s.id !== b.slot_id && s.seats_free >= b.seats && isBookable(new Date(s.starts_at), now),
  );
  const dayOf = (iso: string) => cairoKey(new Date(iso));
  const openDays = new Set(open.map((s) => dayOf(s.starts_at)));
  const dayKey = dayChoice ?? (open[0] ? dayOf(open[0].starts_at) : null);
  const month = monthChoice ?? (dayKey ? monthsAhead(dayKey, now) : 0);
  const chosen = open.find((s) => s.id === slotId) ?? null;
  const label = (iso: string) => {
    const d = new Date(iso);
    return `${formatWeekday(d, lang)} ${formatDayMonth(d, lang)}, ${formatClock(d, lang)}`;
  };

  const confirm = async () => {
    if (!chosen) return;
    setBusy(true);
    setError(null);
    try {
      await rescheduleBooking(b.ref, chosen.id);
      qc.invalidateQueries({ queryKey: ['myBookings'] });
      qc.invalidateQueries({ queryKey: ['booking', b.ref] });
      qc.invalidateQueries({ queryKey: ['book', b.offering_id] });
      showToast(t('reschedule.toast', { when: label(chosen.starts_at) }));
      router.back();
    } catch (e) {
      setError(bookingErrorKey(e as { message?: string }));
      setBusy(false);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + component.navBar.height + space.space4,
            paddingBottom: insets.bottom + BAR_CLEARANCE,
          },
        ]}
      >
        {!dayKey ? (
          <EmptyState icon="bookings" title={t('reschedule.none')} body={t('reschedule.noneBody')} />
        ) : (
          <>
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
            <TimeSlots
              slots={open
                .filter((s) => dayOf(s.starts_at) === dayKey)
                .map((s) => ({
                  id: s.id,
                  start: cairoHM(new Date(s.starts_at)),
                  end: cairoHM(new Date(s.ends_at)),
                  state: 'open' as const,
                }))}
              selectedId={chosen?.id}
              onSelect={(s) => setSlotId(s.id)}
            />
          </>
        )}
        {error && <Banner text={t(`review.errors.${error}`)} />}
      </ScrollView>
      <NavigationBar
        title={t('reschedule.title')}
        subtitle={t('reschedule.from', { when: label(b.starts_at) })}
        onBack={() => router.back()}
      />
      <BottomActionBar
        caption={t('reschedule.newTime')}
        price={chosen ? label(chosen.starts_at) : t('reschedule.pick')}
      >
        <Button
          label={t('reschedule.confirm')}
          variant="primary"
          busy={busy}
          disabled={!chosen}
          reason={t('reschedule.pick')}
          onPress={confirm}
        />
      </BottomActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
});
