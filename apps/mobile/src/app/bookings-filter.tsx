import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { useBookingsFilter, useMyBookings } from '@/data/bookings';
import { useLang } from '@/i18n';
import { GroupedList } from '@/ui/GroupedList';
import { SheetHeader } from '@/ui/SheetHeader';

/** §7.11 Filter by discipline: All, then each discipline the learner has booked. A choice closes it. */
export default function BookingsFilter() {
  const { t } = useTranslation();
  const lang = useLang();
  const rows = useMyBookings(useSession().session?.user.id).data ?? [];
  const { discipline, set } = useBookingsFilter();
  const choices = [...new Map(rows.map((b) => [b.discipline_id, b])).values()].map((b) => ({
    id: b.discipline_id as string | null,
    name: (lang === 'ar' && b.discipline_ar) || b.discipline_en,
  }));
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('bookings.filterTitle')} />
      <GroupedList
        rows={[{ id: null, name: t('bookings.filterAll') }, ...choices].map((d) => ({
          key: d.id ?? 'all',
          title: d.name,
          selected: discipline === d.id,
          onPress: () => {
            set(d.id);
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
