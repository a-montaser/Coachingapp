import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { setLanguage, useLang, type Lang } from '@/i18n';
import { GroupedList } from '@/ui/GroupedList';
import { SheetHeader } from '@/ui/SheetHeader';

const LANGS: Lang[] = ['en', 'ar'];

/** §7.14 Language sheet: English / العربية. Switches at once, layout included (R3.3, D26). */
export default function LanguageSheet() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader title={t('profile.language')} />
      <GroupedList
        rows={LANGS.map((l) => ({
          key: l,
          title: t(`language.${l}`),
          selected: l === lang,
          onPress: () => setLanguage(l),
        }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
});
