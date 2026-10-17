import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { signOut } from '@/data/auth';
import { queryClient } from '@/data/queryClient';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { SheetHeader } from '@/ui/SheetHeader';
import { T } from '@/ui/T';

/** §7.14 Sign out confirmation (R2.3). Signing out drops cached account data; the journey gate shows Welcome. */
export default function SignOutSheet() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const confirm = async () => {
    setBusy(true);
    const { error: e } = await signOut();
    setBusy(false);
    if (e) return setError(true);
    queryClient.clear();
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('auth.signOutTitle')} />
      <T color={c.label2}>{t('auth.signOutBody')}</T>
      {error && (
        <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
          {t('common.genericError')}
        </T>
      )}
      <Button label={t('auth.signOut')} variant="destructiveFilled" busy={busy} onPress={confirm} />
      <Button label={t('auth.keepSignedIn')} onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
});
