import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { layout, space } from '@cfa/tokens';
import { authErrorKey, isValidEgMobile, sendCode } from '@/data/auth';
import { supabaseConfigured } from '@/data/supabase';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { IconButton } from '@/ui/IconButton';
import { PhoneField } from '@/ui/PhoneField';
import { T } from '@/ui/T';

/** §7.2 Sign up. Apple/Google sign-in are out of Phase 1 scope and not shown. */
export default function SignUp() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [digits, setDigits] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!isValidEgMobile(digits)) return setError(t('auth.phoneInvalid'));
    if (!supabaseConfigured) return setError(t('auth.notConfigured'));
    setBusy(true);
    const { error: e } = await sendCode(digits);
    setBusy(false);
    if (e) return setError(t(authErrorKey(e) ?? 'auth.genericError'));
    router.push({ pathname: '/verify', params: { phone: digits } });
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.body,
          { paddingTop: insets.top + space.space2, backgroundColor: c.bg },
        ]}
      >
        <IconButton
          icon="back"
          accessibilityLabel={t('common.back')}
          floating
          onPress={() => router.back()}
        />
        <T variant="largeTitle" accessibilityRole="header">
          {t('auth.phoneTitle')}
        </T>
        <T variant="subheadline" color={c.label2}>
          {t('auth.phoneSub')}
        </T>
        <PhoneField
          digits={digits}
          onChangeDigits={(d) => {
            setDigits(d);
            setError(null);
          }}
          error={error}
        />
        <Button label={t('auth.sendCode')} variant="primary" busy={busy} onPress={submit} />
        {/* [OPEN: Terms and Privacy Policy URLs] — plain text until the owner provides them (Phase 5 privacy hooks). */}
        <T variant="footnote" color={c.label2}>
          {t('auth.legal')}
        </T>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: { flexGrow: 1, paddingHorizontal: layout.sideMargin, gap: space.space4 },
});
