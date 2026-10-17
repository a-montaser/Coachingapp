import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useInterests } from '@/data/account';
import { useSession } from '@/data/auth';
import { CATEGORIES, disciplineName, useDisciplines, useOnboardingDraft } from '@/data/onboarding';
import { formatNumber } from '@/i18n/format';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Icon, disciplineIcon } from '@/ui/Icon';
import { InterestTile } from '@/ui/InterestTile';
import { NavigationBar } from '@/ui/NavigationBar';
import { Progress } from '@/ui/Progress';
import { T } from '@/ui/T';

const COLUMNS = 3;
const tile = component.interestTile;

/**
 * §7.3 step 1 (canvas artboard 6): four sections of 3-column tiles, sticky "Continue · N picked".
 * `edit=1` when reopened from Profile: starts from the saved picks and shows a back button.
 */
export default function Interests() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const edit = useLocalSearchParams<{ edit?: string }>().edit === '1';
  const userId = useSession().session?.user.id;
  const disciplines = useDisciplines().data ?? [];
  const saved = useInterests(userId).data;
  const { picks, toggle, load } = useOnboardingDraft();

  // Start from what's saved (Profile edits, or a learner who left onboarding half-way), once per visit,
  // so a background refetch never wipes taps made since.
  const loaded = useRef(false);
  useEffect(() => {
    if (saved && !loaded.current) {
      loaded.current = true;
      load(Object.fromEntries(saved.map((i) => [i.discipline_id, i.level])));
    }
  }, [saved, load]);

  const tileWidth = (width - layout.sideMargin * 2 - tile.gap * (COLUMNS - 1)) / COLUMNS;
  const count = (n: number) => formatNumber(n, lang);
  const top = insets.top + (edit ? component.navBar.height : 0) + space.space4;

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          { paddingTop: top, paddingBottom: insets.bottom + component.button.height + layout.sectionGap * 2 },
        ]}
      >
        <View style={styles.intro}>
          {!edit && <Progress value={1} accessibilityLabel={t('onboarding.progress')} />}
          <T variant="title1" accessibilityRole="header">
            {t('onboarding.interestsTitle')}
          </T>
          <T variant="subheadline" color={c.label2}>
            {t('onboarding.interestsSub')}
          </T>
        </View>

        {CATEGORIES.map((cat) => {
          const items = disciplines.filter((d) => d.category_id === cat);
          const picked = items.filter((d) => picks.includes(d.id)).length;
          return (
            <View key={cat} style={styles.section}>
              <View style={styles.sectionHead}>
                <Icon name={cat} size={component.groupedList.iconSize} color={c.label} />
                <T variant="title3" accessibilityRole="header" style={styles.grow}>
                  {t(`category.${cat}`)}
                </T>
                {picked > 0 && (
                  <T variant="footnote" color={c.label2}>
                    {t('onboarding.picked', { count: count(picked) })}
                  </T>
                )}
              </View>
              <View style={styles.grid}>
                {items.map((d) => (
                  <InterestTile
                    key={d.id}
                    label={disciplineName(d, lang)}
                    icon={disciplineIcon(d.icon)}
                    code={d.code}
                    selected={picks.includes(d.id)}
                    onPress={() => toggle(d.id)}
                    width={tileWidth}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + space.space4,
            experimental_backgroundImage: `linear-gradient(transparent, ${c.bg} 35%)`,
          },
        ]}
      >
        {picks.length > 0 ? (
          <Button
            label={t('onboarding.continuePicked', { count: count(picks.length) })}
            variant="primary"
            onPress={() => router.push({ pathname: '/levels', params: edit ? { edit: '1' } : {} })}
          />
        ) : (
          <Button label={t('onboarding.pickOne')} disabled onPress={() => {}} />
        )}
      </View>
      {edit && <NavigationBar title="" onBack={() => router.back()} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.sectionGap },
  intro: { gap: space.space3 },
  section: { gap: space.space3 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  grow: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: tile.gap },
  footer: {
    position: 'absolute',
    start: 0,
    end: 0,
    bottom: 0,
    paddingHorizontal: layout.sideMargin,
    paddingTop: layout.sectionGap,
  },
});
