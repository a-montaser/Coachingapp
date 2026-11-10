import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { useCredit, useCreditHistory, type CreditLine } from '@/data/checkout';
import { useLang } from '@/i18n';
import { formatDayMonth, formatPrice } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { EmptyState } from '@/ui/EmptyState';
import { GroupedList } from '@/ui/GroupedList';
import { NavigationBar } from '@/ui/NavigationBar';
import { T } from '@/ui/T';

type TFn = (key: string, o?: Record<string, string>) => string;

/** "Refund for CFA-12345", "Goodwill credit", "Used on CFA-67890". */
function creditTitle(l: CreditLine, t: TFn) {
  if (l.kind === 'spend') return t('credit.usedOn', { ref: l.ref ?? '' });
  if (l.source === 'refund' && l.ref) return t('credit.refundFor', { ref: l.ref });
  return t(`credit.source.${l.source ?? 'goodwill'}`);
}

/** Refund credit never expires; other credit 6 months after it was granted (D64). */
function creditSubtitle(l: CreditLine, now: Date, t: TFn, lang: 'en' | 'ar') {
  if (l.kind === 'spend') return formatDayMonth(new Date(l.at), lang);
  if (!l.expires_at) return t('credit.neverExpires');
  const until = new Date(l.expires_at);
  return until < now ? t('credit.expired') : t('credit.expires', { date: formatDayMonth(until, lang) });
}

/** Profile → App credit (Phase 2 R7): the balance, then every grant and spend, newest first. */
export default function CreditHistory() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const userId = useSession().session?.user.id;
  const balance = useCredit(userId).data ?? 0;
  const lines = useCreditHistory(userId).data;
  const now = new Date();

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
          {t('credit.title')}
        </T>
        <View>
          <T variant="footnote" color={c.label2}>
            {t('credit.balance')}
          </T>
          <T variant="title1">{formatPrice(balance, lang)}</T>
        </View>
        {lines?.length === 0 && (
          <EmptyState icon="card" title={t('credit.emptyTitle')} body={t('credit.emptyBody')} />
        )}
        {lines && lines.length > 0 && (
          <GroupedList
            rows={lines.map((l, i) => ({
              key: `${l.kind}-${l.ref ?? ''}-${i}`,
              title: creditTitle(l, t),
              subtitle: creditSubtitle(l, now, t, lang),
              value: `${l.kind === 'spend' ? '−' : '+'}${formatPrice(l.amount_egp, lang)}`,
            }))}
          />
        )}
      </ScrollView>
      <NavigationBar onBack={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
});
