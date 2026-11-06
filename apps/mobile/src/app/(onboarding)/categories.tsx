import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useInterests } from '@/data/account';
import { useSession } from '@/data/auth';
import { CATEGORIES, disciplineName, useDisciplines, useOnboardingDraft } from '@/data/onboarding';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { GroupedList } from '@/ui/GroupedList';
import { NavigationBar } from '@/ui/NavigationBar';
import { Progress } from '@/ui/Progress';
import { T } from '@/ui/T';

const SAMPLE = 3;

/**
 * Onboarding step 1a (owner, D35): pick one or more of the four categories on their own page;
 * Interests then shows only those categories' disciplines. `edit=1` when reopened from Profile.
 */
export default function Categories() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const edit = useLocalSearchParams<{ edit?: string }>().edit === '1';
  const userId = useSession().session?.user.id;
  const disciplines = useDisciplines().data;
  const saved = useInterests(userId).data;
  const { categories, toggleCategory, load } = useOnboardingDraft();

  // Start from what's saved (Profile edits, or a learner who left half-way), once per visit,
  // so a background refetch never wipes taps made since.
  const loaded = useRef(false);
  useEffect(() => {
    if (!saved?.length || !disciplines || loaded.current) return;
    loaded.current = true;
    const ids = new Set(saved.map((i) => i.discipline_id));
    load(
      Object.fromEntries(saved.map((i) => [i.discipline_id, i.level])),
      CATEGORIES.filter((cat) => disciplines.some((d) => d.category_id === cat && ids.has(d.id))),
    );
  }, [saved, disciplines, load]);

  // "Pottery, Painting, Photography…": what each category holds, from the live list.
  const sample = (cat: string) => {
    const names = (disciplines ?? [])
      .filter((d) => d.category_id === cat)
      .map((d) => disciplineName(d, lang));
    return names.length > SAMPLE ? `${names.slice(0, SAMPLE).join(', ')}…` : names.join(', ');
  };
  const top = insets.top + (edit ? component.navBar.height : 0) + space.space4;

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          { paddingTop: top, paddingBottom: insets.bottom + space.space6 },
        ]}
      >
        <View style={styles.intro}>
          {!edit && <Progress value={0.5} accessibilityLabel={t('onboarding.progress')} />}
          <T variant="title1" accessibilityRole="header">
            {t('onboarding.categoriesTitle')}
          </T>
          <T variant="subheadline" color={c.label2}>
            {t('onboarding.categoriesSub')}
          </T>
        </View>
        <GroupedList
          rows={CATEGORIES.map((cat) => ({
            key: cat,
            icon: cat,
            title: t(`category.${cat}`),
            subtitle: sample(cat),
            selected: categories.includes(cat),
            multiple: true,
            onPress: () => toggleCategory(cat),
          }))}
        />
        {categories.length > 0 ? (
          <Button
            label={t('onboarding.continue')}
            variant="primary"
            onPress={() => router.push({ pathname: '/interests', params: edit ? { edit: '1' } : {} })}
          />
        ) : (
          <Button label={t('onboarding.pickOne')} disabled onPress={() => {}} />
        )}
      </ScrollView>
      {edit && <NavigationBar onBack={() => router.back()} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.sectionGap },
  intro: { gap: space.space3 },
});
