import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import {
  splitBookings,
  useBookingsFilter,
  useMyBookings,
  type BookingKind,
  type BookingTime,
} from '@/data/bookings';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { Section } from '@/ui/Section';
import { SheetHeader } from '@/ui/SheetHeader';

const KINDS: BookingKind[] = ['all', 'lessons', 'groups'];
const TIMES: BookingTime[] = ['any', 'morning', 'afternoon', 'evening'];

/**
 * §7.11 Filter bookings (owner revision D54, laid out like Explore's Filters): Type (Lessons or Groups),
 * Time of day, and each discipline the learner has booked. Choices apply at once; the button closes.
 */
export default function BookingsFilter() {
  const { t } = useTranslation();
  const lang = useLang();
  const rows = useMyBookings(useSession().session?.user.id).data ?? [];
  const { discipline, kind, time, set, reset } = useBookingsFilter();
  const disciplines = [...new Map(rows.map((b) => [b.discipline_id, b])).values()].map((b) => ({
    id: b.discipline_id,
    name: (lang === 'ar' && b.discipline_ar) || b.discipline_en,
  }));
  const { upcoming, past } = splitBookings(rows, new Date(), { discipline, kind, time });
  const n = upcoming.length + past.length;

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <SheetHeader
        title={t('bookings.filterTitle')}
        action={{ label: t('bookings.filterReset'), onPress: reset }}
      />

      <Section title={t('bookings.filterType')} variant="footnote" wrap>
        {KINDS.map((k) => (
          <Chip
            key={k}
            radio
            label={t(`bookings.kind.${k}`)}
            selected={kind === k}
            onPress={() => set({ kind: k })}
          />
        ))}
      </Section>

      <Section title={t('bookings.filterTime')} variant="footnote" wrap>
        {TIMES.map((k) => (
          <Chip
            key={k}
            radio
            label={t(`bookings.time.${k}`)}
            selected={time === k}
            onPress={() => set({ time: k })}
          />
        ))}
      </Section>

      {disciplines.length > 1 && (
        <Section title={t('bookings.filterDiscipline')} variant="footnote" wrap>
          <Chip
            radio
            label={t('bookings.filterAll')}
            selected={!discipline}
            onPress={() => set({ discipline: null })}
          />
          {disciplines.map((d) => (
            <Chip
              key={d.id}
              radio
              label={d.name}
              selected={discipline === d.id}
              onPress={() => set({ discipline: d.id })}
            />
          ))}
        </Section>
      )}

      {n > 0 ? (
        <Button
          variant="primary"
          label={t('bookings.filterShow', { count: n, n: formatNumber(n, lang) })}
          onPress={() => router.back()}
        />
      ) : (
        <Button
          label={t('bookings.filterNone')}
          disabled
          reason={t('bookings.filterNoneReason')}
          onPress={() => {}}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: layout.sectionGap },
});
