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
  bookingTitle,
  directionsUrl,
  filterCount,
  splitBookings,
  statusPill,
  useBookingsFilter,
  useMyBookings,
  type MyBooking,
} from '@/data/bookings';
import { cairoKey, sameCairoDay } from '@/data/rules';
import { useLang } from '@/i18n';
import { formatClock, formatFullDate, formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { BookingCard } from '@/ui/BookingCard';
import { EmptyState } from '@/ui/EmptyState';
import { MonthCalendar } from '@/ui/MonthCalendar';
import { NavigationBar } from '@/ui/NavigationBar';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { useMinimiseOnScroll } from '@/ui/TabBar';

type Tab = 'upcoming' | 'past' | 'calendar';
const TABS: Tab[] = ['upcoming', 'past', 'calendar'];

// Room for the capsule and the segmented control under it.
const HEADER =
  component.navBar.top + component.iconButton.size + space.space2 + component.segmented.height + space.space4;

/**
 * §7.11 Bookings (prototype Bookings, owner revision D54): one glass capsule (Filter · "Bookings" · New
 * booking) with Upcoming · N | Past | Calendar under it, then booking cards with the time set largest.
 * Calendar: a month with a dot on each day that has a booking; tapping one lists that day's. Calendar
 * sync, Message and Rate are Phase 2 (hidden).
 */
export default function Bookings() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const tabScroll = useMinimiseOnScroll(8, true).onScroll;
  const userId = useSession().session?.user.id;
  const q = useMyBookings(userId);
  const filter = useBookingsFilter();
  const on = filterCount(filter);
  const [tab, setTab] = useState<Tab>('upcoming');
  const [month, setMonth] = useState(0);
  const [dayChoice, setDayChoice] = useState<string | null>(null);
  const now = new Date();
  const { upcoming, past } = splitBookings(q.data ?? [], now, filter);
  // Calendar: upcoming bookings by Cairo day; until a day is tapped, the first one with a booking (or today).
  const dayOf = (b: MyBooking) => cairoKey(new Date(b.starts_at));
  const booked = new Set(upcoming.map(dayOf));
  const day = dayChoice ?? (upcoming[0] ? dayOf(upcoming[0]) : cairoKey(now));
  const list =
    tab === 'upcoming' ? upcoming : tab === 'past' ? past : upcoming.filter((b) => dayOf(b) === day);
  const isPast = tab === 'past';

  const card = (b: MyBooking) => {
    const start = new Date(b.starts_at);
    const name = firstName(b.instructor_name);
    const title = bookingTitle(b, t, lang);
    const hours = `${formatClock(start, lang)}–${formatClock(new Date(b.ends_at), lang)}`;
    const detail = [
      !isPast && sameCairoDay(start, now) ? t('bookings.today') : null,
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
    const actions = !isPast
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
        past={isPast}
        title={title}
        time={hours}
        detail={detail}
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
        {tab === 'calendar' && (
          <MonthCalendar
            offset={month}
            onOffset={setMonth}
            maxOffset={2}
            marked={booked}
            selected={day}
            onSelect={setDayChoice}
            onlyMarked={false}
            markedLabel={t('calendar.hasBookings')}
            now={now}
          />
        )}
        {q.isLoading ? null : list.length > 0 ? (
          list.map(card)
        ) : tab === 'calendar' ? (
          <EmptyState
            icon="bookings"
            title={t('bookings.noneOnDay', { day: formatFullDate(new Date(`${day}T12:00:00Z`), lang) })}
            body={t('bookings.noneOnDayBody')}
          />
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
            label: on ? t('bookings.filterOnCount', { n: formatNumber(on, lang) }) : t('bookings.filter'),
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
              t('bookings.calendar'),
            ]}
            selectedIndex={TABS.indexOf(tab)}
            onChange={(i) => setTab(TABS[i]!)}
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
