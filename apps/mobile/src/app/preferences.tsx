import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { useInterests } from '@/data/account';
import {
  CATEGORIES,
  LEVELS,
  disciplineName,
  saveInterests,
  useDisciplines,
  useOnboardingDraft,
} from '@/data/onboarding';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { NavigationBar } from '@/ui/NavigationBar';
import { Section } from '@/ui/Section';
import { T } from '@/ui/T';

const BAR_CLEARANCE = component.button.height + space.space8;

/**
 * Profile → "Change interests and levels" on one page (owner revision D54): every category's
 * disciplines as chips to pick, and each pick's level right under it. Save writes only what changed.
 */
export default function Preferences() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const userId = useSession().session?.user.id;
  const saved = useInterests(userId).data;
  const disciplines = useDisciplines().data ?? [];
  const { picks, levels, toggle, setLevel, load } = useOnboardingDraft();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  // Start from what's saved, once per visit (a refetch must not undo the learner's edits).
  const loaded = useRef(false);
  useEffect(() => {
    if (!saved || loaded.current) return;
    loaded.current = true;
    load(Object.fromEntries(saved.map((i) => [i.discipline_id, i.level])), [...CATEGORIES]);
  }, [saved, load]);

  const save = async () => {
    if (!userId) return;
    setSaving(true);
    setError(false);
    try {
      await saveInterests(userId);
      await qc.invalidateQueries({ queryKey: ['interests', userId] });
      router.back();
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
            paddingTop: insets.top + component.navBar.height + space.space4,
            paddingBottom: insets.bottom + BAR_CLEARANCE,
          },
        ]}
      >
        <T variant="subheadline" color={c.label2}>
          {t('preferences.sub')}
        </T>
        {CATEGORIES.map((cat) => {
          const items = disciplines.filter((d) => d.category_id === cat);
          if (!items.length) return null;
          const picked = items.filter((d) => picks.includes(d.id));
          return (
            <Section key={cat} title={t(`category.${cat}`)} variant="headline">
              <View style={styles.chips}>
                {items.map((d) => (
                  <Chip
                    key={d.id}
                    label={disciplineName(d, lang)}
                    selected={picks.includes(d.id)}
                    onPress={() => toggle(d.id)}
                  />
                ))}
              </View>
              {picked.map((d) => {
                const name = disciplineName(d, lang);
                return (
                  <View key={d.id} style={styles.level}>
                    <T variant="footnote" color={c.label2}>
                      {t('preferences.levelFor', { name })}
                    </T>
                    <View style={styles.chips} accessibilityRole="radiogroup" accessibilityLabel={name}>
                      {LEVELS.map((level) => (
                        <Chip
                          key={level}
                          radio
                          label={t(`level.${level}`)}
                          accessibilityLabel={`${name}: ${t(`level.${level}`)}`}
                          selected={levels[d.id] === level}
                          onPress={() => setLevel(d.id, levels[d.id] === level ? null : level)}
                        />
                      ))}
                    </View>
                  </View>
                );
              })}
            </Section>
          );
        })}
        {error && (
          <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
            {t('common.genericError')}
          </T>
        )}
        <Button label={t('onboarding.saveChanges')} variant="primary" busy={saving} onPress={save} />
      </ScrollView>
      <NavigationBar title={t('preferences.title')} onBack={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.sectionGap },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
  level: { gap: space.space2 },
});
