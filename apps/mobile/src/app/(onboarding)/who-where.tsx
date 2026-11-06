import { useQueryClient } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession, type Profile } from '@/data/auth';
import {
  finishOnboarding,
  nearestArea,
  useAreas,
  useOnboardingDraft,
  type WhoWhere,
} from '@/data/onboarding';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { GroupedList } from '@/ui/GroupedList';
import { NavigationBar } from '@/ui/NavigationBar';
import { Progress } from '@/ui/Progress';
import { T } from '@/ui/T';

type Who = NonNullable<Profile['who_for']>;
type Pref = Profile['instructor_pref'];
const WHO: Who[] = ['me', 'child', 'both'];
const PREFS: Pref[] = ['none', 'female', 'male'];
// §7.3 chip order.
const AREA_ORDER = ['new-cairo', 'zamalek', 'maadi', 'sheikh-zayed', 'heliopolis', 'downtown'];

/**
 * §7.3 step 3: who the sessions are for, usual area (or the nearest one to the device), instructor
 * preference. "Show my picks" and Skip both finish onboarding and open Home.
 */
export default function WhoWhereScreen() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const userId = useSession().session?.user.id;
  const areas = [...(useAreas().data ?? [])].sort(
    (a, b) => AREA_ORDER.indexOf(a.id) - AREA_ORDER.indexOf(b.id),
  );
  const [who, setWho] = useState<Who | null>(null);
  const [areaId, setAreaId] = useState<string | null>(null);
  const [located, setLocated] = useState(false);
  const [locationOff, setLocationOff] = useState(false);
  const [pref, setPref] = useState<Pref>('none');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  // The device position only picks the nearest area; the position itself is not stored.
  const locate = async () => {
    setLocationOff(false);
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return setLocationOff(true);
      const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const area = nearestArea(areas, coords.latitude, coords.longitude);
      if (area) {
        setAreaId(area.id);
        setLocated(true);
      }
    } catch {
      setLocationOff(true); // Location Services off, or no fix
    }
  };

  const finish = async (answers: Partial<WhoWhere>) => {
    if (!userId) {
      // Signed out: keep the answers and create the account; the gate saves them after the code (D34).
      useOnboardingDraft.getState().complete(answers);
      return router.push('/sign-up');
    }
    setSaving(true);
    setError(false);
    try {
      await finishOnboarding(userId, answers);
      // The gate opens the tabs once the refreshed profile says onboarding is done.
      await qc.invalidateQueries({ queryKey: ['profile', userId] });
      router.replace('/');
      if (answers.who_for === 'child' || answers.who_for === 'both') router.push('/family');
    } catch {
      setError(true);
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
        <Progress value={3} accessibilityLabel={t('onboarding.progress')} />

        <View style={styles.section}>
          <T variant="title2" accessibilityRole="header">
            {t('onboarding.whoTitle')}
          </T>
          <GroupedList
            rows={WHO.map((w) => ({
              key: w,
              title: t(`onboarding.who.${w}`),
              subtitle: t(`onboarding.who.${w}Sub`),
              selected: who === w,
              onPress: () => setWho(w),
            }))}
          />
        </View>

        <View style={styles.section}>
          <T variant="title2" accessibilityRole="header">
            {t('onboarding.whereTitle')}
          </T>
          <View style={styles.chips}>
            <Chip label={t('onboarding.useLocation')} selected={located} onPress={locate} />
            {areas.map((a) => (
              <Chip
                key={a.id}
                label={lang === 'ar' ? (a.name_ar ?? a.name_en) : a.name_en}
                selected={!located && areaId === a.id}
                onPress={() => {
                  setLocated(false);
                  setAreaId(a.id);
                }}
              />
            ))}
          </View>
          {locationOff && (
            <T variant="footnote" color={c.label2} accessibilityLiveRegion="polite">
              {t('onboarding.locationOff')}
            </T>
          )}
        </View>

        <View style={styles.section}>
          <T variant="title2" accessibilityRole="header">
            {t('onboarding.prefTitle')}
          </T>
          <View style={styles.chips}>
            {PREFS.map((p) => (
              <Chip
                key={p}
                label={t(`onboarding.pref.${p}`)}
                selected={pref === p}
                onPress={() => setPref(p)}
              />
            ))}
          </View>
        </View>

        <T variant="footnote" color={c.label2}>
          {t('onboarding.changeLater')}
        </T>
        {error && (
          <T variant="footnote" color={c.danger} accessibilityLiveRegion="polite">
            {t('common.genericError')}
          </T>
        )}
        <Button
          label={t('onboarding.showPicks')}
          variant="primary"
          busy={saving}
          onPress={() => finish({ who_for: who, area_id: areaId, instructor_pref: pref })}
        />
      </ScrollView>
      <NavigationBar
        onBack={() => router.back()}
        actions={[{ label: t('onboarding.skip'), onPress: () => finish({}) }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.sectionGap },
  section: { gap: space.space3 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
