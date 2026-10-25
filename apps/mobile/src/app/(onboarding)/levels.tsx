import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import {
  LEVELS,
  disciplineName,
  saveInterests,
  useDisciplines,
  useOnboardingDraft,
  type Discipline,
} from '@/data/onboarding';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { IconTile } from '@/ui/IconTile';
import { disciplineIcon } from '@/ui/Icon';
import { NavigationBar } from '@/ui/NavigationBar';
import { Progress } from '@/ui/Progress';
import { T } from '@/ui/T';

const BAR_CLEARANCE = component.button.height + space.space8;

/**
 * §7.3 step 2, on one page (owner revision D54): every pick with its four levels as chips. Tapping a
 * chosen level again clears it; Skip skips them all and moves on. Continue saves to `interests`.
 * `?edit=1` (Profile): the same page saves and returns.
 */
export default function Levels() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const edit = useLocalSearchParams<{ edit?: string }>().edit === '1';
  const userId = useSession().session?.user.id;
  const all = useDisciplines().data ?? [];
  const { picks, levels, setLevel } = useOnboardingDraft();
  const items = picks.map((id) => all.find((d) => d.id === id)).filter((d): d is Discipline => !!d);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const finish = async () => {
    if (!userId) return router.push('/who-where'); // signed out: saved after sign-up (D34)
    setSaving(true);
    setError(false);
    try {
      await saveInterests(userId);
      await qc.invalidateQueries({ queryKey: ['interests', userId] });
      if (edit) router.dismissTo('/profile');
      else router.push('/who-where');
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + component.navBar.height + space.space6,
            paddingBottom: insets.bottom + BAR_CLEARANCE,
          },
        ]}
      >
        {!edit && <Progress value={2} accessibilityLabel={t('onboarding.progress')} />}
        <T variant="title1" accessibilityRole="header">
          {t('onboarding.levelsTitle')}
        </T>
        <T variant="subheadline" color={c.label2}>
          {t('onboarding.levelSub')}
        </T>

        {items.map((d) => {
          const icon = disciplineIcon(d.icon);
          const name = disciplineName(d, lang);
          return (
            <View key={d.id} style={styles.pick}>
              <View style={styles.pickHead}>
                <IconTile icon={icon ?? 'hobbies'} />
                <T variant="headline">{name}</T>
              </View>
              <View style={styles.chips} accessibilityRole="radiogroup" accessibilityLabel={name}>
                {LEVELS.map((level) => (
                  <Chip
                    key={level}
                    radio
                    label={t(`level.${level}`)}
                    accessibilityLabel={`${t(`level.${level}`)}, ${t(`onboarding.levelDesc.${level}`)}`}
                    selected={levels[d.id] === level}
                    onPress={() => setLevel(d.id, levels[d.id] === level ? null : level)}
                  />
                ))}
              </View>
            </View>
          );
        })}

        {error && (
          <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
            {t('common.genericError')}
          </T>
        )}
        <Button
          label={edit ? t('onboarding.saveChanges') : t('onboarding.continue')}
          variant="primary"
          busy={saving}
          onPress={finish}
        />
      </ScrollView>
      <NavigationBar
        onBack={() => router.back()}
        actions={edit ? [] : [{ label: t('onboarding.skip'), onPress: finish }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4 },
  pick: { gap: space.space3 },
  pickHead: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
