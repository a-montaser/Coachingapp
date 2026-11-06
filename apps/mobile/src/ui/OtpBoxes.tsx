import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

type Props = { value: string; onChange: (code: string) => void; disabled?: boolean };

const otp = component.otp;

/**
 * §7.2: six boxes, the current one with a 2 pt brand ring. One hidden TextInput takes the input so iOS
 * one-time-code autofill ("From Messages · 482 917") and VoiceOver see a single field.
 */
export function OtpBoxes({ value, onChange, disabled }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const [focused, setFocused] = useState(true);
  return (
    <View style={styles.row}>
      {Array.from({ length: otp.length }, (_, i) => {
        const current = focused && i === Math.min(value.length, otp.length - 1);
        return (
          <View
            key={i}
            style={[
              styles.box,
              { backgroundColor: c.surface },
              current && { borderWidth: otp.ring, borderColor: c.brand },
            ]}
          >
            <T variant="title2" accessibilityElementsHidden importantForAccessibility="no">
              {value[i] ?? ''}
            </T>
          </View>
        );
      })}
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, otp.length))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={otp.length}
        autoFocus
        caretHidden
        accessibilityLabel={t('auth.codeLabel')}
        style={[StyleSheet.absoluteFill, styles.input]}
        testID="otp-input"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: space.space2 },
  box: {
    flex: 1,
    height: otp.boxHeight,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Covers the boxes so a tap anywhere focuses it; transparent text keeps the boxes as the only visuals.
  input: { color: 'transparent' },
});
