import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { firstName } from '@/data/book';
import { bookingTitle } from '@/data/bookings';
import { useMyBooking } from '@/data/checkout';
import { rateBooking } from '@/data/ratings';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Banner } from '@/ui/Banner';
import { Button } from '@/ui/Button';
import { SheetHeader } from '@/ui/SheetHeader';
import { StarRating } from '@/ui/StarRating';
import { T } from '@/ui/T';
import { TextField } from '@/ui/TextField';
import { showToast } from '@/ui/Toast';

const MAX = 1000; // the reviews.body check

/**
 * §7.12 Rate sheet (Phase 2 R2): five stars (required), optional text "Shared with Nour only", "Send rating".
 * A session is rated once; the instructor's average moves at once.
 */
export default function RateSheet() {
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const { t } = useTranslation();
  const { c } = useTheme();
  const lang = useLang();
  const qc = useQueryClient();
  const b = useMyBooking(ref).data;
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const name = b ? firstName(b.instructor_name) : '';

  const send = async () => {
    setBusy(true);
    setError(false);
    try {
      await rateBooking(ref, stars, text);
      await qc.invalidateQueries(); // the rating, and the instructor's average on every card
      showToast(t('rate.toast'));
      router.back();
    } catch {
      setError(true);
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
      <SheetHeader title={t('rate.title')} />
      {b && (
        <T variant="headline" style={styles.center}>
          {bookingTitle(b, t, lang)}
        </T>
      )}
      <StarRating
        value={stars}
        onChange={setStars}
        label={(n) => t('rate.stars', { count: n, n: formatNumber(n, lang) })}
      />
      <TextField
        value={text}
        onChangeText={setText}
        placeholder={t('rate.placeholder', { name })}
        multiline
        maxLength={MAX}
      />
      <T variant="footnote" color={c.label2}>
        {t('rate.private', { name })}
      </T>
      {error && <Banner text={t('rate.error')} />}
      <Button
        label={t('rate.send')}
        variant="primary"
        disabled={stars === 0}
        reason={stars === 0 ? t('rate.pickStars') : undefined}
        busy={busy}
        onPress={() => void send()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
  center: { textAlign: 'center' },
});
