import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useExplore, type SortKey } from '@/data/explore';
import { GroupedList } from '@/ui/GroupedList';
import { SheetHeader } from '@/ui/SheetHeader';

const SORTS: SortKey[] = ['soonest', 'price', 'rating', 'nearest'];

/** §7.5 Sort sheet: Soonest available, Lowest price, Highest rated, Nearest. A choice closes it. */
export default function SortSheet() {
  const { t } = useTranslation();
  const sort = useExplore((s) => s.sort);
  const set = useExplore((s) => s.set);
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('explore.sortTitle')} />
      <GroupedList
        rows={SORTS.map((k) => ({
          key: k,
          title: t(`explore.sort.${k}`),
          selected: sort === k,
          onPress: () => {
            set({ sort: k });
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
