import type { ComponentProps } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { component, radius, space, type as scale } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

type Props = Omit<ComponentProps<typeof TextInput>, 'style'> & {
  /** Shown above the field and read as its name; omit for a placeholder-only field (Book's note). */
  label?: string;
  /** Inline error under the field (and the field's hint for VoiceOver). */
  error?: string | null;
};

/** §5 text field: solid surface, radius 20; a 2 pt danger ring and an inline message on error. */
export function TextField({ label, error, multiline, placeholder, ...input }: Props) {
  const { c } = useTheme();
  return (
    <View style={styles.wrap}>
      {label && (
        <T variant="footnote" color={c.label2}>
          {label}
        </T>
      )}
      <TextInput
        {...input}
        multiline={multiline}
        placeholder={placeholder}
        accessibilityLabel={label ?? placeholder}
        accessibilityHint={error ?? undefined}
        placeholderTextColor={c.label3}
        style={[
          styles.input,
          scale.body,
          multiline && styles.multi,
          { backgroundColor: c.surface, color: c.label },
          error ? { borderWidth: component.otp.ring, borderColor: c.danger } : null,
        ]}
      />
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
  input: {
    minHeight: component.groupedList.rowMinHeight,
    borderRadius: radius.md,
    paddingHorizontal: space.space4,
    textAlign: 'auto',
  },
  multi: {
    minHeight: component.noteField.minHeight,
    paddingVertical: space.space4,
    textAlignVertical: 'top',
  },
});
