import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useBookDraft } from '@/data/book';
import { demoPay } from '@/data/checkout';
import { useLang } from '@/i18n';
import { formatPrice } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { IconTile } from '@/ui/IconTile';
import { SheetHeader } from '@/ui/SheetHeader';
import { T } from '@/ui/T';

/**
 * The demo provider's checkout (design.md §6): Pay or Fail, recorded by the demo-pay Edge Function
 * through the same `record_payment` path a real gateway webhook uses. Refused server-side in production.
 */
export default function DemoCheckout() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const qc = useQueryClient();
  const { ref, amount } = useLocalSearchParams<{ ref: string; amount: string }>();
  const [busy, setBusy] = useState<'paid' | 'failed' | null>(null);
  const [error, setError] = useState(false);

  const finish = async (outcome: 'paid' | 'failed') => {
    setBusy(outcome);
    setError(false);
    try {
      await demoPay(ref, outcome);
      qc.invalidateQueries({ queryKey: ['myBookings'] });
      if (outcome === 'paid') {
        useBookDraft.getState().set({ pendingRef: null, failed: false });
        // Done with checkout: back to the tabs, then the confirmation on top.
        router.dismissAll();
        router.push({ pathname: '/confirmed/[ref]', params: { ref } });
      } else {
        useBookDraft.getState().set({ failed: true });
        router.back();
      }
    } catch {
      setError(true);
    } finally {
      setBusy(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('demoPay.title')} />
      <IconTile icon="card" />
      <T variant="title1">{formatPrice(Number(amount), lang)}</T>
      <T variant="footnote" color={c.label2}>
        {t('demoPay.booking', { ref })}
      </T>
      <T color={c.label2}>{t('demoPay.body')}</T>
      {error && (
        <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
          {t('common.genericError')}
        </T>
      )}
      <Button
        label={t('demoPay.pay', { amount: formatPrice(Number(amount), lang) })}
        variant="primary"
        busy={busy === 'paid'}
        disabled={busy !== null}
        onPress={() => finish('paid')}
      />
      <Button
        label={t('demoPay.fail')}
        variant="destructive"
        busy={busy === 'failed'}
        disabled={busy !== null}
        onPress={() => finish('failed')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
});
