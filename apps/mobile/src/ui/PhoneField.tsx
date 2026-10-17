import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { component, radius, space, type as scale } from '@cfa/tokens';
import { formatEgMobile } from '@/data/auth';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

type Props = { digits: string; onChangeDigits: (digits: string) => void; error?: string | null };

/** §7.2: fixed "EG +20" prefix, 10 digits shown as "100 234 5678", inline error under the field. */
export function PhoneField({ digits, onChangeDigits, error }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.field,
          { backgroundColor: c.surface },
          error ? { borderWidth: component.otp.ring, borderColor: c.danger } : null,
        ]}
      >
        <T variant="headline" color={c.label2}>
          {t('auth.phonePrefix')}
        </T>
        <View style={[styles.divider, { backgroundColor: c.separator }]} />
        <TextInput
          value={formatEgMobile(digits)}
          onChangeText={(text) => onChangeDigits(text.replace(/\D/g, '').slice(0, 10))}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
          placeholder="100 234 5678"
          placeholderTextColor={c.label3}
          accessibilityLabel={t('auth.phoneLabel')}
          accessibilityHint={error ?? undefined}
          autoFocus
          style={[styles.input, scale.title3, { color: c.label }]}
        />
      </View>
      {error && (
        <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
          {error}
        </T>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.space2 },
  field: {
    minHeight: component.phoneField.minHeight,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.space4,
    gap: space.space3,
  },
  divider: { width: StyleSheet.hairlineWidth, alignSelf: 'stretch', marginVertical: space.space3 },
  input: { flex: 1, paddingVertical: 0, textAlign: 'auto' },
});
