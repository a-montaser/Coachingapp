import { router, useLocalSearchParams } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { component, layout, radius, space, type as scale } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import {
  NAME_MAX,
  useFamily,
  useSaveFamilyMember,
  validateFamilyMember,
  type FamilyMemberErrors,
} from '@/data/family';
import { formatNumber } from '@/i18n/format';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { SheetHeader } from '@/ui/SheetHeader';
import { T } from '@/ui/T';

/** §7.14 Add / Edit a family member: first name and age 6–14, validated on save. `id` param = edit. */
export default function FamilyMemberSheet() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const userId = useSession().session?.user.id;
  const existing = useFamily(userId).data?.find((m) => m.id === id);
  const save = useSaveFamilyMember(userId);
  const [name, setName] = useState(existing?.first_name ?? '');
  const [age, setAge] = useState(existing ? formatNumber(existing.age, lang) : '');
  const [errors, setErrors] = useState<FamilyMemberErrors>({});

  const submit = () => {
    const v = validateFamilyMember(name, age);
    setErrors(v.errors);
    if (v.value) save.mutate({ id: existing?.id, ...v.value }, { onSuccess: () => router.back() });
  };

  return (
    <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
      <SheetHeader
        title={existing ? t('family.editTitle', { name: existing.first_name }) : t('family.add')}
      />
      <Field
        label={t('family.firstName')}
        value={name}
        onChangeText={setName}
        error={errors.name && t(`family.${errors.name}`)}
        maxLength={NAME_MAX + 10}
        textContentType="givenName"
        autoFocus={!existing}
      />
      <Field
        label={t('family.age')}
        value={age}
        onChangeText={setAge}
        error={errors.age && t(`family.${errors.age}`)}
        placeholder={t('family.agePlaceholder')}
        keyboardType="number-pad"
        maxLength={2}
      />
      {save.isError && (
        <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
          {t('common.genericError')}
        </T>
      )}
      <Button
        label={existing ? t('family.saveButton') : t('family.addButton')}
        variant="primary"
        busy={save.isPending}
        onPress={submit}
      />
    </ScrollView>
  );
}

type FieldProps = ComponentProps<typeof TextInput> & { label: string; error?: string };

function Field({ label, error, ...input }: FieldProps) {
  const { c } = useTheme();
  return (
    <View style={styles.field}>
      <T variant="footnote" color={c.label2}>
        {label}
      </T>
      <TextInput
        {...input}
        accessibilityLabel={label}
        accessibilityHint={error}
        placeholderTextColor={c.label3}
        style={[
          styles.input,
          scale.body,
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
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
  field: { gap: space.space2 },
  input: {
    minHeight: component.groupedList.rowMinHeight,
    borderRadius: radius.md,
    paddingHorizontal: space.space4,
    textAlign: 'auto',
  },
});
