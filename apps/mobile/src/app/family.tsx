import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { useFamily, usePendingKidsBookings } from '@/data/family';
import { formatDayMonth, formatNumber } from '@/i18n/format';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { DashedCard } from '@/ui/DashedCard';
import { GroupedList } from '@/ui/GroupedList';
import { NavigationBar } from '@/ui/NavigationBar';
import { T } from '@/ui/T';

/**
 * §7.14 Family & kids (R3.5): explainer, child cards (name · age, Edit, any pending booking),
 * "Add a family member", info rows. Pushed above the tabs, so the tab bar is hidden.
 */
export default function Family() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const userId = useSession().session?.user.id;
  const family = useFamily(userId).data ?? [];
  const pending = usePendingKidsBookings(userId).data ?? [];

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + component.navBar.height + space.space4,
            paddingBottom: insets.bottom + space.space6,
          },
        ]}
      >
        <T variant="largeTitle" accessibilityRole="header">
          {t('family.title')}
        </T>
        <T color={c.label2}>{t('family.explainer')}</T>

        {family.map((m) => (
          <Card key={m.id} style={styles.child}>
            <View style={styles.childRow}>
              <T variant="headline" style={styles.grow}>
                {t('family.child', { name: m.first_name, age: formatNumber(m.age, lang) })}
              </T>
              <Button
                label={t('family.edit')}
                size="small"
                accessibilityHint={t('family.editLabel', { name: m.first_name })}
                onPress={() => router.push({ pathname: '/family-member', params: { id: m.id } })}
              />
            </View>
            {pending
              .filter((b) => b.family_member_id === m.id)
              .map((b) => (
                <View key={b.ref} style={[styles.pending, { backgroundColor: c.warningTint }]}>
                  <T variant="footnote" color={c.warning}>
                    {t('family.pending', {
                      title: b.title,
                      when: formatDayMonth(new Date(b.starts_at), lang),
                    })}
                  </T>
                </View>
              ))}
            <Button
              label={t('family.bookFor', { name: m.first_name })}
              variant="primary"
              // shortcut: opens Explore until the kids Book flow lands (T14).
              onPress={() => router.navigate('/explore')}
            />
          </Card>
        ))}

        <DashedCard label={t('family.add')} onPress={() => router.push('/family-member')} />

        <GroupedList
          rows={[
            { key: 'length', icon: 'clock', title: t('family.infoLength') },
            { key: 'guardian', icon: 'family', title: t('family.infoGuardian') },
          ]}
        />
      </ScrollView>
      <NavigationBar title={t('family.title')} onBack={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4 },
  child: { padding: space.space4, gap: space.space3 },
  childRow: { flexDirection: 'row', alignItems: 'center', gap: space.space3 },
  grow: { flex: 1 },
  pending: { borderRadius: radius.sm, padding: space.space3 },
});
