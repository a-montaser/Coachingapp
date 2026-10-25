import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useArea, useInterests, type Interest } from '@/data/account';
import { galleryCopy } from '@/dev/galleryCopy';
import { useProfile, useSession } from '@/data/auth';
import { formatDayMonth, formatYear } from '@/i18n/format';
import { useLang } from '@/i18n';
import { useSettings } from '@/theme/settings';
import { useTheme } from '@/theme/useTheme';
import { useMinimiseOnScroll } from '@/ui/TabBar';
import { Avatar } from '@/ui/Avatar';
import { GroupedList } from '@/ui/GroupedList';
import { Section } from '@/ui/Section';
import { T } from '@/ui/T';

/**
 * §7.14 Profile, Phase 1 scope (R3.4): header, Levels, Settings (Family & kids, Language, Appearance), Sign out.
 * Not yet: Edit, Members' Circle, Payments & receipts, Notifications, Become an instructor (requirements "Later").
 */
export default function Profile() {
  const { c } = useTheme();
  const tabScroll = useMinimiseOnScroll(8, true).onScroll;
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
      onScroll={tabScroll}
      scrollEventThrottle={16}
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={[
        styles.body,
        // Clear the floating tab bar at the end of the list.
        {
          // Clear of the status bar like the other screens' titles (owner: the name sat too high).
          paddingTop: insets.top + component.navBar.height + space.space4,
          paddingBottom: insets.bottom + component.tabBar.tabHeight + layout.sectionGap,
        },
      ]}
    >
      <View style={styles.header}>
        <Avatar size={component.profilePhoto.size} accessibilityLabel={t('profile.photo')} />
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

      <Section title={t('profile.levelsTitle')} variant="footnote">
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
              onPress: () => router.push('/preferences'),
            },
          ]}
        />
      </Section>

      <Section title={t('profile.settings')} variant="footnote">
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
      </Section>

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
      {/* Dev builds only: the component library (every ui/ component, both themes and languages). */}
      {__DEV__ && (
        <GroupedList
          rows={[
            {
              key: 'gallery',
              icon: 'hobbies',
              title: galleryCopy[lang].title,
              onPress: () => router.push('/gallery'),
            },
          ]}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: layout.sideMargin, gap: layout.sectionGap },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.space4 },
  headerText: { flex: 1, gap: space.space1 },
});
