import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
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
 * §7.3 step 1 (canvas artboard 6): 3-column tiles, sticky "Continue · N picked". Only the categories
 * picked on the previous page are shown, together on this one page (D35). `edit=1` from Profile.
 */
export default function Interests() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const edit = useLocalSearchParams<{ edit?: string }>().edit === '1';
  const disciplines = useDisciplines().data ?? [];
  const { categories, picks: allPicks, toggle } = useOnboardingDraft();
  const shown = CATEGORIES.filter((cat) => categories.includes(cat));
  // Picks from a category un-picked on the previous page don't count and are dropped on Continue.
  const picks = allPicks.filter((id) =>
    disciplines.some((d) => d.id === id && categories.includes(d.category_id)),
  );

  const tileWidth = (width - layout.sideMargin * 2 - tile.gap * (COLUMNS - 1)) / COLUMNS;
  const count = (n: number) => formatNumber(n, lang);
  const top = insets.top + component.navBar.height + space.space4;

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

        {shown.map((cat) => {
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
            onPress={() => {
              useOnboardingDraft.setState({ picks });
              router.push({ pathname: '/levels', params: edit ? { edit: '1' } : {} });
            }}
          />
        ) : (
          <Button label={t('onboarding.pickOne')} disabled onPress={() => {}} />
        )}
      </View>
      <NavigationBar onBack={() => router.back()} />
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
