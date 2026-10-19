import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { layout, space } from '@cfa/tokens';
import { firstName } from '@/data/book';
import { DEFAULT_REMINDER, useMyBooking, useReminders } from '@/data/checkout';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatPrice, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { ConfirmationRing } from '@/ui/ConfirmationRing';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { T } from '@/ui/T';
import { TextLink } from '@/ui/TextLink';

/**
 * §7.10 Confirmed: ring then tick, a headline per category ("Request sent." while pending), the ref,
 * When / Where / Paid, Directions and Share, "Remind me", View booking and Back to Home.
 * Add to calendar is Phase 2 (R6.4).
 */
export default function Confirmed() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const q = useMyBooking(ref);
  const reminder = useReminders((s) => s.byRef[ref] ?? DEFAULT_REMINDER);

  if (q.isLoading) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;
  if (!q.data) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: c.bg }]}>
        <EmptyState icon="bookings" title={t('review.notFound')} body="" />
      </View>
    );
  }
  const b = q.data;
  const pending = b.display_status === 'pending';
  const start = new Date(b.starts_at);
  const name = firstName(b.instructor_name);
  const when = `${formatWeekday(start, lang)} ${formatDayMonth(start, lang)} · ${formatClock(start, lang)}–${formatClock(new Date(b.ends_at), lang)}`;
  const money = pending
    ? { title: t('confirmed.payLater', { name }), value: formatPrice(b.total_egp, lang) }
    : b.method === 'venue'
      ? { title: t('confirmed.due'), value: formatPrice(b.total_egp, lang) }
      : { title: t('confirmed.paid'), value: formatPrice(b.total_egp, lang) };
  const reminderLabel = t(`remind.${typeof reminder === 'number' ? `m${reminder}` : reminder}`);
  // Opens the phone's maps app with walking/driving directions to the venue.
  const directions = () =>
    Linking.openURL(
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?daddr=${b.venue_lat},${b.venue_lng}`
        : `geo:${b.venue_lat},${b.venue_lng}?q=${b.venue_lat},${b.venue_lng}(${encodeURIComponent(b.venue_name)})`,
    );

  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={[
        styles.body,
        { paddingTop: insets.top + space.space8, paddingBottom: insets.bottom + space.space6 },
      ]}
    >
      <View style={styles.hero}>
        <ConfirmationRing label={t('confirmed.done')} />
        <T variant="brandConfirm" accessibilityRole="header" style={styles.center}>
          {pending ? t('confirmed.headline.pending') : t(`confirmed.headline.${b.category_id}`)}
        </T>
        <T color={c.label2} style={styles.center}>
          {pending
            ? t('confirmed.subPending', { name, ref: b.ref })
            : t('confirmed.subConfirmed', { name, ref: b.ref })}
        </T>
      </View>

      <GroupedList
        rows={[
          { key: 'when', icon: 'clock', title: t('confirmed.when'), subtitle: when },
          { key: 'where', icon: 'pin', title: t('confirmed.where'), subtitle: b.venue_name },
          { key: 'money', icon: 'card', title: money.title, value: money.value },
        ]}
      />

      <View style={styles.tiles}>
        <View style={styles.grow}>
          <Button label={t('confirmed.directions')} onPress={directions} />
        </View>
        <View style={styles.grow}>
          <Button
            label={t('confirmed.share')}
            onPress={() =>
              Share.share({
                message: t('confirmed.shareText', { title: b.title, when, venue: b.venue_name, ref: b.ref }),
              })
            }
          />
        </View>
      </View>

      <GroupedList
        rows={[
          {
            key: 'remind',
            icon: 'bell',
            title: t('confirmed.remind'),
            value: reminderLabel,
            onPress: () => router.push({ pathname: '/remind/[ref]', params: { ref: b.ref } }),
          },
        ]}
      />

      {/* shortcut: Booking detail arrives in T17; until then "View booking" opens the Bookings tab. */}
      <Button
        label={t('confirmed.viewBooking')}
        variant="primary"
        onPress={() => router.replace('/bookings')}
      />
      <View style={styles.center}>
        <TextLink label={t('confirmed.backHome')} onPress={() => router.replace('/')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
  hero: { alignItems: 'center', gap: space.space3 },
  center: { textAlign: 'center', alignItems: 'center', justifyContent: 'center' },
  tiles: { flexDirection: 'row', gap: space.space3 },
  grow: { flex: 1 },
});
