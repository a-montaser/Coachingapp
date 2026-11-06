import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { DEFAULT_REMINDER, REMINDER_CHOICES, useReminders } from '@/data/checkout';
import { GroupedList } from '@/ui/GroupedList';
import { SheetHeader } from '@/ui/SheetHeader';

/** §7.10 Remind me sheet: 30 min, 1 h, 2 h, the evening before (20:00, D29), Off. A choice closes it. */
export default function RemindSheet() {
  const { t } = useTranslation();
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const current = useReminders((s) => s.byRef[ref] ?? DEFAULT_REMINDER);
  const setReminder = useReminders((s) => s.setReminder);
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('remind.title')} />
      <GroupedList
        rows={REMINDER_CHOICES.map((choice) => ({
          key: String(choice),
          title: t(`remind.${typeof choice === 'number' ? `m${choice}` : choice}`),
          selected: current === choice,
          onPress: () => {
            setReminder(ref, choice);
            router.back();
          },
        }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
});
