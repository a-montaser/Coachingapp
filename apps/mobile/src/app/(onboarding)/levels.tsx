import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
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
import { GroupedList } from '@/ui/GroupedList';
import { Icon, disciplineIcon } from '@/ui/Icon';
import { LevelGlyph } from '@/ui/LevelGlyph';
import { NavigationBar } from '@/ui/NavigationBar';
import { Progress } from '@/ui/Progress';
import { T } from '@/ui/T';

const g = component.levels;

/**
 * §7.3 step 2: for each pick in turn, four level rows that record and advance; Skip leaves it unset.
 * After the last pick, a "You're all set" summary (tap to edit) and Continue, which saves to `interests`.
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
  const [index, setIndex] = useState(0);
  // Set when a pick is reopened from the summary: answering returns there instead of moving on.
  const [fromSummary, setFromSummary] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const current = items[index];
  const done = index >= items.length;

  const name = (d: Discipline) => disciplineName(d, lang);
  // "pottery" mid-sentence; language names and acronyms (SAT) keep their capitals.
  const inSentence = (d: Discipline) =>
    lang === 'en' && d.category_id !== 'languages' && d.name_en !== d.name_en.toUpperCase()
      ? d.name_en.toLowerCase()
      : name(d);

  const answer = (level: (typeof LEVELS)[number] | null) => {
    if (!current) return;
    setLevel(current.id, level);
    setIndex(fromSummary ? items.length : index + 1);
    setFromSummary(false);
  };

  const finish = async () => {
    if (!userId) return;
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
            paddingBottom: insets.bottom + space.space6,
          },
        ]}
      >
        {!edit && (
          <Progress
            value={1 + (items.length ? Math.min(index, items.length) / items.length : 1)}
            accessibilityLabel={t('onboarding.progress')}
          />
        )}

        {done ? (
          <>
            <T variant="title1" accessibilityRole="header">
              {t('onboarding.allSet')}
            </T>
            <T variant="subheadline" color={c.label2}>
              {t('onboarding.allSetSub')}
            </T>
            <GroupedList
              rows={items.map((d, i) => ({
                key: d.id,
                title: name(d),
                value: levels[d.id] ? t(`level.${levels[d.id]}`) : t('profile.levelNotSet'),
                onPress: () => {
                  setFromSummary(true);
                  setIndex(i);
                },
              }))}
            />
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
          </>
        ) : (
          current && (
            <>
              <View style={[styles.circle, { backgroundColor: c.brandTint }]}>
                {disciplineIcon(current.icon) ? (
                  <Icon name={disciplineIcon(current.icon)!} size={g.iconSize} color={c.brandText} />
                ) : (
                  <T variant="title2" color={c.brandText}>
                    {current.code}
                  </T>
                )}
              </View>
              <T variant="title1" accessibilityRole="header">
                {t('onboarding.levelQuestion', { name: inSentence(current) })}
              </T>
              <T variant="subheadline" color={c.label2}>
                {t('onboarding.levelSub')}
              </T>
              <View style={styles.levels}>
                {LEVELS.map((level, i) => {
                  const selected = levels[current.id] === level;
                  return (
                    <Pressable
                      key={level}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected }}
                      accessibilityLabel={`${t(`level.${level}`)}, ${t(`onboarding.levelDesc.${level}`)}`}
                      onPress={() => answer(level)}
                      style={({ pressed }) => [
                        styles.level,
                        { backgroundColor: c.surface },
                        selected && {
                          borderWidth: component.interestTile.selectedBorder,
                          borderColor: c.brand,
                        },
                        pressed && styles.pressed,
                      ]}
                    >
                      <LevelGlyph filled={i + 1} color={c.brandText} />
                      <View style={styles.grow}>
                        <T variant="headline">{t(`level.${level}`)}</T>
                        <T variant="footnote" color={c.label2}>
                          {t(`onboarding.levelDesc.${level}`)}
                        </T>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )
        )}
      </ScrollView>
      <NavigationBar
        onBack={() => (index > 0 ? setIndex(Math.min(index, items.length) - 1) : router.back())}
        actions={
          done || !current
            ? []
            : [{ label: t('onboarding.skip'), onPress: () => answer(levels[current.id] ?? null) }]
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4 },
  circle: {
    width: g.iconCircle,
    height: g.iconCircle,
    borderRadius: g.iconCircle / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levels: { gap: space.space2 },
  level: {
    minHeight: component.groupedList.rowMinHeight,
    borderRadius: radius.md,
    paddingHorizontal: space.space4,
    paddingVertical: space.space3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.space4,
  },
  grow: { flex: 1 },
  pressed: { opacity: 0.7 },
});
