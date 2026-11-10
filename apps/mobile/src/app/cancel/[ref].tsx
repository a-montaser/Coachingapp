import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { cancelOutcome, laterWeeks, seriesCancelCredit, useMyBookings } from '@/data/bookings';
import { bookingErrorKey, cancelBooking, useMyBooking, type BookingErrorKey } from '@/data/checkout';
import { useLang } from '@/i18n';
import { formatPrice } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Banner } from '@/ui/Banner';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { Switch } from '@/ui/Switch';
import { T } from '@/ui/T';
import { showToast } from '@/ui/Toast';

const REASONS = ['schedule', 'injury', 'weather', 'other'] as const;

/**
 * §7.12 Cancel sheet: the refund outcome in one sentence (§9.1), optional reason chips, "Keep booking"
 * and the destructive cancel. Afterwards: back to Bookings with a toast. A weekly booking adds "Cancel
 * every week" (Phase 2 R5.5): this week and every later one, each by its own 24-hour rule.
 */
export default function CancelSheet() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const qc = useQueryClient();
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const b = useMyBooking(ref).data;
  const all = useMyBookings(useSession().session?.user.id).data ?? [];
  const [everyWeek, setEveryWeek] = useState(false);
  const [reason, setReason] = useState<(typeof REASONS)[number] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<BookingErrorKey | null>(null);
  if (!b) return null;

  const now = new Date();
  const weeks = laterWeeks(b, all);
  const series = weeks.length > 1;
  const one = cancelOutcome(b, now);
  // Every week: what all of them give back as credit; nothing back reads like this week's own sentence.
  const back = everyWeek && series ? seriesCancelCredit(weeks, now) : 0;
  const outcome = everyWeek && series ? (back > 0 ? { kind: 'refund' as const, amount: back } : one) : one;
  const amount = 'amount' in outcome ? formatPrice(outcome.amount, lang) : '';

  const cancel = async () => {
    setBusy(true);
    setError(null);
    try {
      await cancelBooking(b.ref, reason && t(`cancel.reasons.${reason}`, { lng: 'en' }), everyWeek && series);
      qc.invalidateQueries({ queryKey: ['myBookings'] });
      qc.invalidateQueries({ queryKey: ['booking'] });
      qc.invalidateQueries({ queryKey: ['credit'] });
      showToast(outcome.kind === 'refund' ? t('cancel.toastRefund', { amount }) : t('cancel.toast'));
      router.dismissAll();
      router.navigate('/bookings');
    } catch (e) {
      setError(bookingErrorKey(e as { message?: string }));
      setBusy(false);
    }
  };

  return (
    <ScrollView style={styles.fit} contentContainerStyle={styles.body}>
      <T variant="title1" accessibilityRole="header">
        {t('cancel.title')}
      </T>
      <T color={c.label2}>{t(`cancel.outcome.${outcome.kind}`, { amount })}</T>
      {series && (
        <View style={styles.row}>
          <View style={styles.grow}>
            <T>{t('cancel.everyWeek')}</T>
            <T variant="footnote" color={c.label2}>
              {t('cancel.everyWeekSub', { count: weeks.length - 1, n: String(weeks.length - 1) })}
            </T>
          </View>
          <Switch value={everyWeek} onValueChange={setEveryWeek} accessibilityLabel={t('cancel.everyWeek')} />
        </View>
      )}
      <View style={styles.chips} accessibilityLabel={t('cancel.reasonLabel')}>
        {REASONS.map((r) => (
          <Chip
            key={r}
            label={t(`cancel.reasons.${r}`)}
            selected={reason === r}
            onPress={() => setReason(reason === r ? null : r)}
          />
        ))}
      </View>
      {error && <Banner text={t(`review.errors.${error}`)} />}
      <Button label={t('cancel.keep')} variant="primary" onPress={() => router.back()} />
      <Button
        label={outcome.kind === 'refund' ? t('cancel.confirmRefund', { amount }) : t('cancel.confirm')}
        variant="destructive"
        busy={busy}
        onPress={cancel}
        testID="cancel-confirm"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fit: { flexGrow: 0 },
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
});
