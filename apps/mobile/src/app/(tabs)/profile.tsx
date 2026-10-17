import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useArea, useInterests, type Interest } from '@/data/account';
import { useProfile, useSession } from '@/data/auth';
import { formatDayMonth, formatYear } from '@/i18n/format';
import { useLang } from '@/i18n';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { GroupedList } from '@/ui/GroupedList';
import { Icon } from '@/ui/Icon';
import { T } from '@/ui/T';

/**
 * §7.14 Profile, Phase 1 scope (R3.4): header, Levels, Settings (Family & kids, Language, Appearance), Sign out.
 * Not yet: Edit, Members' Circle, Payments & receipts, Notifications, Become an instructor (requirements "Later").
 */
export default function Profile() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const theme = useSettings((s) => s.theme);
  const userId = useSession().session?.user.id;
  const profile = useProfile(userId).data;
  const area = useArea(profile?.area_id).data;
  const interests = useInterests(userId).data ?? [];

  const year = profile ? formatYear(new Date(profile.created_at), lang) : '';
  const areaName = area && (lang === 'ar' ? (area.name_ar ?? area.name_en) : area.name_en);
  const levelLine = (i: Interest) => {
    if (!i.level) return t('profile.levelNotSet');
    const level = t(`level.${i.level}`);
    return i.level_source === 'instructor'
      ? t('profile.levelInstructor', { level, date: formatDayMonth(new Date(i.set_at), lang) })
      : t('profile.levelSelf', { level });
  };

  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={[
        styles.body,
        // Clear the floating tab bar at the end of the list.
        {
          paddingTop: insets.top + space.space4,
          paddingBottom: insets.bottom + component.tabBar.tabHeight + layout.sectionGap,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          accessible
          accessibilityLabel={t('profile.photo')}
          style={[styles.photo, { backgroundColor: c.surface2 }]}
        >
          <Icon name="profile" size={component.profilePhoto.iconSize} color={c.label2} />
        </View>
        <View style={styles.headerText}>
          <T variant="title2" accessibilityRole="header">
            {profile?.first_name ?? t('tabs.profile')}
          </T>
          {profile && (
            <T variant="subheadline" color={c.label2}>
              {areaName
                ? t('profile.memberSince', { area: areaName, year })
                : t('profile.memberSinceNoArea', { year })}
            </T>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <T variant="footnote" color={c.label2} accessibilityRole="header">
          {t('profile.levelsTitle')}
        </T>
        <GroupedList
          rows={[
            ...(interests.length
              ? interests.map((i) => ({
                  key: i.discipline_id,
                  title: lang === 'ar' ? (i.name_ar ?? i.name_en) : i.name_en,
                  subtitle: levelLine(i),
                }))
              : [{ key: 'none', title: t('profile.noInterests') }]),
            {
              key: 'change',
              title: t('profile.changeInterests'),
              // shortcut: opens onboarding step 1 once T9 builds Interests/Levels for signed-in users.
              value: t('common.comingSoon'),
            },
          ]}
        />
      </View>

      <View style={styles.section}>
        <T variant="footnote" color={c.label2} accessibilityRole="header">
          {t('profile.settings')}
        </T>
        <GroupedList
          rows={[
            {
              key: 'family',
              icon: 'family',
              title: t('profile.family'),
              onPress: () => router.push('/family'),
            },
            {
              key: 'language',
              icon: 'language',
              title: t('profile.language'),
              value: t(`language.${lang}`),
              onPress: () => router.push('/language'),
            },
            {
              key: 'appearance',
              icon: 'appearance',
              title: t('profile.appearance'),
              value: t(`appearance.${theme}`),
              onPress: () => router.push('/appearance'),
            },
          ]}
        />
      </View>

      <GroupedList
        rows={[
          {
            key: 'signOut',
            icon: 'signOut',
            title: t('auth.signOut'),
            destructive: true,
            onPress: () => router.push('/sign-out'),
          },
        ]}
      />
    </ScrollView>
  );
}

const p = component.profilePhoto;

const styles = StyleSheet.create({
  body: { paddingHorizontal: layout.sideMargin, gap: layout.sectionGap },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.space4 },
  photo: {
    width: p.size,
    height: p.size,
    borderRadius: p.size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: space.space1 },
  section: { gap: space.space2 },
});
