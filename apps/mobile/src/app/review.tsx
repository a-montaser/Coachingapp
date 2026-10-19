import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { firstName, useBookDraft } from '@/data/book';
import {
  applyPromo,
  bookingErrorKey,
  placeBooking,
  runCheckout,
  useReview,
  type BookingErrorKey,
  type Method,
} from '@/data/checkout';
import { useFamily } from '@/data/family';
import { policyFor, promoDiscount, subtotal } from '@/data/rules';
import { testPhoto } from '@/dev/testImages';
import { useLang } from '@/i18n';
import { formatClock, formatDayMonth, formatNumber, formatPrice, formatWeekday } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Avatar } from '@/ui/Avatar';
import { Banner } from '@/ui/Banner';
import { BottomActionBar } from '@/ui/BottomActionBar';
import { Button } from '@/ui/Button';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { NavigationBar } from '@/ui/NavigationBar';
import { RowCard } from '@/ui/RowCard';
import { Section } from '@/ui/Section';
import { T } from '@/ui/T';
import { TextField } from '@/ui/TextField';
import { TextLink } from '@/ui/TextLink';

const BAR_CLEARANCE =
  component.button.height +
  component.bottomBar.padTop +
  component.bottomBar.padBottom +
  component.bottomBar.inset +
  layout.sectionGap;

/**
 * §7.9 Review & pay. Phase 1 methods only (D29): card (demo checkout now, Paymob by secrets) and pay at
 * the venue. Paying calls `book()` first, which holds the seats atomically (R6.3); money logic stays in
 * SQL and the Edge Functions, the app only shows the same maths (design.md §9).
 */
export default function Review() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const draft = useBookDraft();
  const q = useReview(draft.offeringId, draft.slotId);
  const userId = useSession().session?.user.id;
  const child = (useFamily(userId).data ?? []).find((m) => m.id === draft.childId);
  const [method, setMethod] = useState<Method>('card');
  const [code, setCode] = useState('');
  const [promo, setPromo] = useState<{ code: string; pct: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
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

  const { offering: o, slot, instructor } = q.data;
  const start = new Date(slot.starts_at);
  const name = firstName(instructor.display_name);
  const discipline = (lang === 'ar' && instructor.discipline_ar) || instructor.discipline_en;
  const seats = draft.seats;
  const sub = subtotal(o.price_egp, seats);
  const discount = promo ? promoDiscount(sub, promo.pct) : 0;
  const total = sub - discount;
  // Kids and approval sessions are charged only after the instructor confirms (D29).
  const askFirst = o.type === 'kids' || o.needs_approval;
  const policy = policyFor(start, new Date());
  const when = `${formatWeekday(start, lang)} ${formatDayMonth(start, lang)}, ${formatClock(start, lang)}`;
  const amount = formatPrice(total, lang);

  const apply = async () => {
    const entered = code.trim().toUpperCase();
    if (!entered) return;
    setPromoError(null);
    try {
      const r = await applyPromo(entered, sub);
      setPromo({ code: r.code, pct: r.percent_off });
    } catch {
      setPromo(null);
      setPromoError(t('review.promoInvalid', { code: entered }));
    }
  };

  const goConfirmed = (ref: string) => {
    useBookDraft.getState().set({ pendingRef: null, failed: false });
    // Done with booking: back to the tabs, then the confirmation on top.
    router.dismissAll();
    router.push({ pathname: '/confirmed/[ref]', params: { ref } });
  };

  const pay = async () => {
    setBusy(true);
    setError(null);
    useBookDraft.getState().set({ failed: false });
    try {
      // A card hold from a failed attempt is paid for again, never booked twice.
      let ref = draft.pendingRef;
      if (!ref) {
        const b = await placeBooking({
          slotId: slot.id,
          seats,
          childId: draft.childId,
          method,
          promo: promo?.code ?? null,
          note: draft.note,
        });
        qc.invalidateQueries({ queryKey: ['myBookings'] });
        qc.invalidateQueries({ queryKey: ['book'] });
        if (b.status !== 'awaiting_payment') return goConfirmed(b.ref);
        ref = b.ref;
        useBookDraft.getState().set({ pendingRef: ref });
      }
      if ((await runCheckout(ref)) === 'demo') {
        router.push({ pathname: '/demo-checkout', params: { ref, amount: String(total) } });
      } else {
        goConfirmed(ref);
      }
    } catch (e) {
      setError(bookingErrorKey(e as { message?: string }));
    } finally {
      setBusy(false);
    }
  };

  const cta = askFirst
    ? t('review.request')
    : method === 'venue'
      ? t('review.confirm')
      : t('review.pay', { amount });

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + component.navBar.height + space.space4,
            paddingBottom: insets.bottom + BAR_CLEARANCE,
          },
        ]}
      >
        <RowCard
          leading={<Avatar size={component.iconButton.size} image={testPhoto(instructor.display_name)} />}
          title={t('home.bookAgainTitle', { discipline, name: instructor.display_name })}
          subtitle={[
            when,
            t(`instructor.types.${o.type}`),
            seats > 1 ? t('workshop.seat', { count: seats, n: formatNumber(seats, lang) }) : null,
            child ? t('review.forChild', { name: child.first_name }) : null,
            o.venue?.name,
          ]
            .filter(Boolean)
            .join(' · ')}
          trailing={<TextLink label={t('review.edit')} onPress={() => router.back()} />}
        />

        {draft.failed && <Banner text={t('review.paymentFailed')} />}

        <Section title={t('review.payWith')} variant="headline">
          <GroupedList
            rows={(['card', 'venue'] as const).map((m) => ({
              key: m,
              icon: m === 'card' ? ('card' as const) : ('pin' as const),
              title: t(`review.${m}`),
              subtitle: t(`review.${m}Sub`),
              selected: method === m,
              onPress: () => setMethod(m),
            }))}
          />
          {askFirst && (
            <T variant="footnote" color={c.label2}>
              {t('review.kidsNote', { name })}
            </T>
          )}
        </Section>

        <Section title={t('review.promo')} variant="headline">
          {promo ? (
            <View style={styles.promoRow}>
              <T variant="subheadline" color={c.success} style={styles.grow} accessibilityLiveRegion="polite">
                {t('review.promoApplied', { code: promo.code, pct: formatNumber(promo.pct, lang) })}
              </T>
              <Button label={t('review.remove')} size="small" onPress={() => setPromo(null)} />
            </View>
          ) : (
            <View style={styles.promoRow}>
              <View style={styles.grow}>
                <TextField
                  value={code}
                  onChangeText={setCode}
                  placeholder={t('review.promo')}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  error={promoError}
                />
              </View>
              <Button label={t('review.apply')} size="small" disabled={!code.trim()} onPress={apply} />
            </View>
          )}
        </Section>

        <GroupedList
          rows={[
            {
              key: 'session',
              title:
                seats > 1 ? t('review.sessionSeats', { n: formatNumber(seats, lang) }) : t('review.session'),
              value: formatPrice(sub, lang),
            },
            ...(promo
              ? [
                  {
                    key: 'promo',
                    title: t('review.promoLine', { code: promo.code }),
                    value: `−${formatPrice(discount, lang)}`,
                  },
                ]
              : []),
            { key: 'fee', title: t('review.venueFee'), value: t('review.included') },
          ]}
        />
        <T variant="footnote" color={policy.kind === 'free' ? c.label2 : c.warning}>
          {policy.kind === 'free'
            ? t('review.policyFree', {
                when: `${formatWeekday(policy.until, lang)} ${formatDayMonth(policy.until, lang)}, ${formatClock(policy.until, lang)}`,
              })
            : policy.kind === 'sameDay'
              ? t('review.policySameDay')
              : t('review.policyLate')}
        </T>
        {error && <Banner text={t(`review.errors.${error}`)} />}
      </ScrollView>

      <NavigationBar title={t('review.title')} onBack={() => router.back()} />
      <BottomActionBar
        caption={method === 'venue' ? t('review.dueAtVenue') : t('review.total')}
        price={amount}
      >
        <Button label={busy ? t('review.processing') : cta} variant="primary" busy={busy} onPress={pay} />
      </BottomActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { justifyContent: 'center', padding: layout.sideMargin },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
  promoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: space.space3 },
  grow: { flex: 1 },
});
