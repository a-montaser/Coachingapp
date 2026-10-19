import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, Share, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { firstName } from '@/data/book';
import {
  bookingPolicy,
  canCancel,
  canReschedule,
  directionsUrl,
  staticMapUrl,
  statusPill,
} from '@/data/bookings';
import { bookingErrorKey, runCheckout, useMyBooking, type BookingErrorKey } from '@/data/checkout';
import { testPhoto } from '@/dev/testImages';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatPrice, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Avatar } from '@/ui/Avatar';
import { Banner } from '@/ui/Banner';
import { Button } from '@/ui/Button';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { NavigationBar } from '@/ui/NavigationBar';
import { Pill } from '@/ui/Pill';
import { RowCard } from '@/ui/RowCard';
import { T } from '@/ui/T';

const map = component.bookingMap;

/**
 * §7.12 Booking detail: map header with Directions, status pill, title, date and time, venue, payment,
 * the cancellation policy, the instructor and what to bring. A kids booking that was approved is paid
 * here (D29). Reschedule until 24 h before; Cancel until the start. Message, Add to calendar and Rate
 * are Phase 2.
 */
export default function BookingDetail() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const q = useMyBooking(ref);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollViewOffset(scrollRef);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<BookingErrorKey | null>(null);

  if (q.isLoading) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;
  if (!q.data) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: c.bg }]}>
        <EmptyState icon="bookings" title={t('review.notFound')} body="" />
        <NavigationBar onBack={() => router.back()} />
      </View>
    );
  }

  const b = q.data;
  const start = new Date(b.starts_at);
  const now = new Date();
  const name = firstName(b.instructor_name);
  const subject = (lang === 'ar' && b.discipline_ar) || b.discipline_en;
  const title =
    b.type === 'workshop'
      ? b.title
      : b.child_name
        ? t('bookings.titleChild', { discipline: subject, child: b.child_name, name })
        : t('bookings.title', { discipline: subject, name });
  const when = `${formatWeekday(start, lang, 'long')} ${formatDayMonth(start, lang)} · ${formatClock(start, lang)}–${formatClock(new Date(b.ends_at), lang)}`;
  const status = b.display_status;
  const pill = statusPill(status);
  const upcoming = ['pending', 'payment_due', 'awaiting_payment', 'confirmed'].includes(status);
  const policy = upcoming && status !== 'pending' ? bookingPolicy(b, now) : null;
  const amount = formatPrice(b.total_egp, lang);
  const mapPicture = staticMapUrl(b.venue_lat, b.venue_lng, lang);
  const due = status === 'payment_due' || status === 'awaiting_payment';
  const money =
    status === 'cancelled'
      ? (b.refund_egp ?? 0) > 0
        ? t('booking.refunded', { amount: formatPrice(b.refund_egp!, lang) })
        : t('booking.noRefund')
      : status === 'pending'
        ? t('confirmed.payLater', { name })
        : status === 'payment_due' || status === 'awaiting_payment'
          ? t('booking.due', { amount })
          : b.method === 'venue'
            ? t('booking.atVenue', { amount })
            : t('booking.paid', { amount });

  const pay = async () => {
    setBusy(true);
    setError(null);
    try {
      if ((await runCheckout(b.ref)) === 'demo') {
        router.push({ pathname: '/demo-checkout', params: { ref: b.ref, amount: String(b.total_egp) } });
      } else {
        qc.invalidateQueries({ queryKey: ['booking', b.ref] });
        qc.invalidateQueries({ queryKey: ['myBookings'] });
      }
    } catch (e) {
      setError(bookingErrorKey(e as { message?: string }));
    } finally {
      setBusy(false);
    }
  };

  const share = () =>
    Share.share({
      message: t('confirmed.shareText', { title, when, venue: b.venue_name, ref: b.ref }),
    });

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + layout.sectionGap }}
      >
        <View style={{ height: map.height }}>
          {mapPicture ? (
            <Image
              source={{ uri: mapPicture }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
              accessibilityLabel={t('booking.mapLabel', { venue: b.venue_name })}
            />
          ) : (
            // shortcut: live Apple map until the Google key is set (D52); Expo Go on iPhone has no Google map view.
            <MapView
              style={StyleSheet.absoluteFill}
              initialRegion={{
                latitude: b.venue_lat,
                longitude: b.venue_lng,
                latitudeDelta: map.delta,
                longitudeDelta: map.delta,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              accessibilityLabel={t('booking.mapLabel', { venue: b.venue_name })}
            >
              <Marker coordinate={{ latitude: b.venue_lat, longitude: b.venue_lng }} title={b.venue_name} />
            </MapView>
          )}
          <View style={styles.directions}>
            <Button
              label={t('confirmed.directions')}
              size="small"
              variant="secondary"
              overMedia
              onPress={() => Linking.openURL(directionsUrl(b.venue_lat, b.venue_lng))}
            />
          </View>
        </View>

        <View style={[styles.sheet, { backgroundColor: c.bg }]}>
          <View style={styles.intro}>
            <Pill label={t(`bookings.status.${pill.key}`, { name })} tone={pill.tone} />
            <T variant="title1" accessibilityRole="header">
              {title}
            </T>
            <T variant="subheadline" color={c.label2}>
              {when}
            </T>
          </View>

          {policy && (
            <Banner
              text={
                policy.kind === 'free'
                  ? t('booking.policyFree', {
                      when: `${formatWeekday(policy.until, lang)} ${formatDayMonth(policy.until, lang)}, ${formatClock(policy.until, lang)}`,
                    })
                  : t('booking.policyLate')
              }
            />
          )}

          <GroupedList
            rows={[
              {
                key: 'venue',
                icon: 'pin',
                title: b.venue_name,
                subtitle: b.venue_notes ?? undefined,
              },
              {
                key: 'money',
                icon: 'card',
                title: `${t(`instructor.types.${b.type}`)} · ${money}`,
                subtitle: t('booking.ref', { ref: b.ref }),
              },
              ...(b.what_to_bring
                ? [
                    {
                      key: 'bring',
                      icon: 'check' as const,
                      title: t('booking.bring'),
                      subtitle: b.what_to_bring,
                    },
                  ]
                : []),
            ]}
          />

          <RowCard
            leading={<Avatar size={component.iconButton.size} image={testPhoto(b.instructor_name)} />}
            title={b.instructor_name}
            subtitle={subject}
            onPress={() =>
              router.push({
                pathname: '/instructor/[id]',
                params: { id: b.instructor_id, discipline: b.discipline_id },
              })
            }
          />

          {error && <Banner text={t(`review.errors.${error}`)} />}
          {due && (
            <Button
              label={busy ? t('review.processing') : t('booking.payNow', { amount })}
              variant="primary"
              busy={busy}
              onPress={pay}
            />
          )}
          {canReschedule(b, now) && (
            <Button
              label={t('booking.reschedule')}
              variant={due ? 'secondary' : 'primary'}
              onPress={() => router.push({ pathname: '/reschedule/[ref]', params: { ref: b.ref } })}
            />
          )}
          {canCancel(b, now) && (
            <Button
              label={t('booking.cancel')}
              variant="destructive"
              onPress={() => router.push({ pathname: '/cancel/[ref]', params: { ref: b.ref } })}
            />
          )}
          {!upcoming && (
            <Button
              label={t('bookings.bookAgain')}
              variant="primary"
              onPress={() =>
                router.push({
                  pathname: '/instructor/[id]',
                  params: { id: b.instructor_id, discipline: b.discipline_id },
                })
              }
            />
          )}
        </View>
      </Animated.ScrollView>

      <NavigationBar
        title={title}
        titleAfterHero
        scrollY={scrollY}
        onBack={() => router.back()}
        actions={[{ icon: 'share', label: t('confirmed.share'), onPress: share }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { justifyContent: 'center', padding: layout.sideMargin },
  directions: { position: 'absolute', end: layout.sideMargin, bottom: component.hero.overlap + space.space3 },
  sheet: {
    marginTop: -component.hero.overlap,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: layout.sideMargin,
    paddingTop: space.space6,
    gap: layout.cardGap,
  },
  intro: { gap: space.space2 },
});
