import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useSettings, type ThemePref } from '@/theme/settings';
import { GroupedList } from '@/ui/GroupedList';
import { SheetHeader } from '@/ui/SheetHeader';

const THEMES: ThemePref[] = ['light', 'dark', 'system'];

/** §7.14 Appearance sheet: Light / Dark / System. */
export default function AppearanceSheet() {
  const { t } = useTranslation();
  const theme = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('profile.appearance')} />
      <GroupedList
        rows={THEMES.map((th) => ({
          key: th,
          title: t(`appearance.${th}`),
          selected: th === theme,
          onPress: () => setTheme(th),
        }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
});
