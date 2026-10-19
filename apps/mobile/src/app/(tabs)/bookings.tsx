import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { firstName } from '@/data/book';
import {
  canReschedule,
  directionsUrl,
  splitBookings,
  statusPill,
  useBookingsFilter,
  useMyBookings,
  type MyBooking,
} from '@/data/bookings';
import { sameCairoDay } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatClock, formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BookingCard } from '@/ui/BookingCard';
import { EmptyState } from '@/ui/EmptyState';
import { NavigationBar } from '@/ui/NavigationBar';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { useMinimiseOnScroll } from '@/ui/TabBar';

// Room for the capsule and the segmented control under it.
const HEADER =
  component.navBar.top + component.iconButton.size + space.space2 + component.segmented.height + space.space4;

/**
 * §7.11 Bookings (prototype Bookings): one glass capsule (Filter · "Bookings" · New booking) with
 * Upcoming · N | Past under it, then booking cards. Calendar sync, Message and Rate are Phase 2 (hidden).
 */
export default function Bookings() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const tabScroll = useMinimiseOnScroll(8, true).onScroll;
  const userId = useSession().session?.user.id;
  const q = useMyBookings(userId);
  const discipline = useBookingsFilter((s) => s.discipline);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const now = new Date();
  const { upcoming, past } = splitBookings(q.data ?? [], now, discipline);
  const list = tab === 'upcoming' ? upcoming : past;

  const card = (b: MyBooking) => {
    const start = new Date(b.starts_at);
    const subject = (lang === 'ar' && b.discipline_ar) || b.discipline_en;
    const name = firstName(b.instructor_name);
    const title =
      b.type === 'workshop'
        ? b.title
        : b.child_name
          ? t('bookings.titleChild', { discipline: subject, child: b.child_name, name })
          : t('bookings.title', { discipline: subject, name });
    const hours = `${formatClock(start, lang)}–${formatClock(new Date(b.ends_at), lang)}`;
    const time = [
      tab === 'upcoming' && sameCairoDay(start, now) ? t('bookings.today') : null,
      hours,
      t(`instructor.types.${b.type}`),
    ]
      .filter(Boolean)
      .join(' · ');
    const pill = statusPill(b.display_status);
    const open = () => router.push({ pathname: '/booking/[ref]', params: { ref: b.ref } });
    const bookAgain = {
      label: t('bookings.bookAgain'),
      onPress: () =>
        router.push({
          pathname: '/instructor/[id]',
          params: { id: b.instructor_id, discipline: b.discipline_id },
        }),
    };
    const actions =
      tab === 'upcoming'
        ? [
            {
              label: t('confirmed.directions'),
              onPress: () => Linking.openURL(directionsUrl(b.venue_lat, b.venue_lng)),
            },
            ...(canReschedule(b, now)
              ? [
                  {
                    label: t('booking.reschedule'),
                    onPress: () => router.push({ pathname: '/reschedule/[ref]', params: { ref: b.ref } }),
                  },
                ]
              : []),
          ]
        : b.display_status === 'cancelled'
          ? [bookAgain, { label: t('bookings.details'), onPress: open }]
          : [bookAgain];
    return (
      <BookingCard
        key={b.ref}
        date={start}
        past={tab === 'past'}
        title={title}
        time={time}
        venue={b.venue_name}
        status={{ label: t(`bookings.status.${pill.key}`, { name }), tone: pill.tone }}
        onPress={open}
        actions={actions}
      />
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        onScroll={tabScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + HEADER,
            paddingBottom: insets.bottom + component.tabBar.tabHeight + layout.sectionGap,
          },
        ]}
      >
        {q.isLoading ? null : list.length > 0 ? (
          list.map(card)
        ) : tab === 'upcoming' ? (
          <EmptyState
            icon="bookings"
            title={t('bookings.emptyUpcoming')}
            body={t('bookings.emptyUpcomingBody')}
            action={{ label: t('bookings.explore'), onPress: () => router.navigate('/explore') }}
          />
        ) : (
          <EmptyState icon="bookings" title={t('bookings.emptyPast')} body={t('bookings.emptyPastBody')} />
        )}
      </ScrollView>
      <NavigationBar
        capsule
        title={t('tabs.bookings')}
        actions={[
          {
            icon: 'filter',
            label: discipline ? t('bookings.filterOn') : t('bookings.filter'),
            onPress: () => router.push('/bookings-filter'),
          },
          { icon: 'plus', label: t('bookings.new'), onPress: () => router.navigate('/explore') },
        ]}
        below={
          <SegmentedControl
            accessibilityLabel={t('bookings.segLabel')}
            segments={[
              t('bookings.upcoming', { n: formatNumber(upcoming.length, lang) }),
              t('bookings.past'),
            ]}
            selectedIndex={tab === 'upcoming' ? 0 : 1}
            onChange={(i) => setTab(i === 0 ? 'upcoming' : 'past')}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
});
