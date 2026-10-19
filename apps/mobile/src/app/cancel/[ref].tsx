import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { cancelOutcome } from '@/data/bookings';
import { bookingErrorKey, cancelBooking, useMyBooking, type BookingErrorKey } from '@/data/checkout';
import { useLang } from '@/i18n';
import { formatPrice } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Banner } from '@/ui/Banner';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { T } from '@/ui/T';
import { showToast } from '@/ui/Toast';

const REASONS = ['schedule', 'injury', 'weather', 'other'] as const;

/**
 * §7.12 Cancel sheet: the refund outcome in one sentence (§9.1), optional reason chips, "Keep booking"
 * and the destructive cancel. Afterwards: back to Bookings with a toast. "Cancel every week" is Phase 2
 * (recurring bookings).
 */
export default function CancelSheet() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const qc = useQueryClient();
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const b = useMyBooking(ref).data;
  const [reason, setReason] = useState<(typeof REASONS)[number] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<BookingErrorKey | null>(null);
  if (!b) return null;

  const outcome = cancelOutcome(b, new Date());
  const amount = outcome.kind === 'refund' ? formatPrice(outcome.amount, lang) : '';

  const cancel = async () => {
    setBusy(true);
    setError(null);
    try {
      await cancelBooking(b.ref, reason && t(`cancel.reasons.${reason}`, { lng: 'en' }));
      qc.invalidateQueries({ queryKey: ['myBookings'] });
      qc.invalidateQueries({ queryKey: ['booking', b.ref] });
      showToast(outcome.kind === 'refund' ? t('cancel.toastRefund', { amount }) : t('cancel.toast'));
      router.dismissAll();
      router.navigate('/bookings');
    } catch (e) {
      setError(bookingErrorKey(e as { message?: string }));
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <T variant="title1" accessibilityRole="header">
        {t('cancel.title')}
      </T>
      <T color={c.label2}>
        {outcome.kind === 'refund'
          ? t('cancel.outcome.refund', { amount })
          : t(`cancel.outcome.${outcome.kind}`)}
      </T>
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
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
