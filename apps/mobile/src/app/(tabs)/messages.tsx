import { router } from 'expo-router';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useMyInstructorId, useSession } from '@/data/auth';
import { contextLine, listTime, matchesSearch, useThreads } from '@/data/chat';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { EmptyState } from '@/ui/EmptyState';
import { SearchField } from '@/ui/SearchField';
import { useMinimiseOnScroll } from '@/ui/TabBar';
import { T } from '@/ui/T';
import { ThreadRow } from '@/ui/ThreadRow';

const r = component.threadRow;

/**
 * §7.13 Messages (Phase 2 R1.3): search, then one row per conversation, latest activity first, with the
 * next or last session together and an unread count. A signed-in instructor sees their learners (D67).
 */
export default function Messages() {
  const { c } = useTheme();
  const tabScroll = useMinimiseOnScroll(8, true).onScroll;
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const userId = useSession().session?.user.id;
  const isInstructor = Boolean(useMyInstructorId(userId).data);
  const threads = useThreads(userId);
  const [query, setQuery] = useState('');
  const all = threads.data ?? [];
  const shown = all.filter((th) => matchesSearch(th, query));
  const now = new Date();

  return (
    <ScrollView
      onScroll={tabScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={[styles.body, { paddingTop: insets.top + space.space4 }]}
    >
      <T variant="largeTitle" accessibilityRole="header">
        {t('messages.title')}
      </T>
      {all.length > 0 && (
        <SearchField value={query} onChangeText={setQuery} placeholder={t('messages.search')} />
      )}
      {!threads.isLoading && all.length === 0 && (
        <EmptyState
          icon="messages"
          title={t('messages.emptyTitle')}
          body={t('messages.emptyBody')}
          action={
            isInstructor
              ? undefined
              : { label: t('messages.emptyAction'), onPress: () => router.navigate('/explore') }
          }
        />
      )}
      {all.length > 0 && shown.length === 0 && (
        <T color={c.label2} style={styles.center}>
          {t('messages.noResults')}
        </T>
      )}
      {shown.length > 0 && (
        <View style={[styles.list, { backgroundColor: c.surface }]}>
          {shown.map((th, i) => (
            <Fragment key={th.id}>
              {i > 0 && <View style={[styles.hairline, { backgroundColor: c.separator }]} />}
              <ThreadRow
                name={th.other_name ?? ''}
                time={listTime(th.last_at ?? th.created_at, now, lang)}
                context={contextLine(th, now, t, lang)}
                lastMessage={th.last_body}
                unread={th.unread}
                unreadLabel={t('messages.unread', { count: formatNumber(th.unread, lang) })}
                onPress={() => router.push({ pathname: '/chat/[threadId]', params: { threadId: th.id } })}
              />
            </Fragment>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: layout.sideMargin, gap: space.space4, paddingBottom: space.space8 },
  center: { textAlign: 'center' },
  list: { borderRadius: radius.md, overflow: 'hidden' },
  // Under the text, past the photo (iOS grouped-list inset).
  hairline: {
    height: StyleSheet.hairlineWidth,
    marginStart: component.groupedList.padding + r.photo + r.gap,
  },
});
