import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { authErrorKey, formatEgMobile, sendCode, verifyCode } from '@/data/auth';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { IconButton } from '@/ui/IconButton';
import { OtpBoxes } from '@/ui/OtpBoxes';
import { T } from '@/ui/T';
import { TextLink } from '@/ui/TextLink';

const otp = component.otp;

/** "0:42" for the resend countdown, in the current digits. */
function clock(seconds: number, lang: 'en' | 'ar') {
  const s = formatNumber(seconds % 60, lang).padStart(2, lang === 'ar' ? '٠' : '0');
  return `${formatNumber(Math.floor(seconds / 60), lang)}:${s}`;
}

/** §7.2 Verify: auto-submits at 6 digits; a wrong code clears the boxes with an inline error. */
export default function Verify() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { phone = '' } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState<number>(otp.resendSeconds);

  useEffect(() => {
    if (wait <= 0) return;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [wait]);

  async function onChange(next: string) {
    setCode(next);
    setError(null);
    if (next.length < otp.length) return;
    setBusy(true);
    const { error: e } = await verifyCode(phone, next);
    setBusy(false);
    if (e) {
      setCode('');
      return setError(t(authErrorKey(e) ?? 'auth.wrongCode'));
    }
    router.replace('/'); // the root gate sends a new user to onboarding, a returning one Home
  }

  async function resend() {
    const { error: e } = await sendCode(phone);
    if (e) return setError(t(authErrorKey(e) ?? 'auth.genericError'));
    setWait(otp.resendSeconds);
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.body, { paddingTop: insets.top + space.space2, backgroundColor: c.bg }]}
    >
      <IconButton icon="back" accessibilityLabel={t('common.back')} floating onPress={() => router.back()} />
      <T variant="largeTitle" accessibilityRole="header">
        {t('auth.codeTitle')}
      </T>
      <View style={styles.row}>
        <T variant="subheadline" color={c.label2}>
          {t('auth.sentTo', { phone: `+20 ${formatEgMobile(phone)}` })}
        </T>
        <TextLink label={t('auth.changeNumber')} onPress={() => router.back()} />
      </View>
      <OtpBoxes value={code} onChange={onChange} disabled={busy} />
      {error && (
        <T variant="footnote" color={c.danger} accessibilityLiveRegion="assertive">
          {error}
        </T>
      )}
      {busy && (
        <T variant="footnote" color={c.label2}>
          {t('auth.verifying')}
        </T>
      )}
      {wait > 0 ? (
        <T variant="subheadline" color={c.label2}>
          {t('auth.resendIn', { time: clock(wait, lang) })}
        </T>
      ) : (
        <TextLink label={t('auth.resend')} role="button" onPress={resend} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { flexGrow: 1, paddingHorizontal: layout.sideMargin, gap: space.space4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2, alignItems: 'center' },
});
