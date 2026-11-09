import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { firstName } from '@/data/book';
import { dayTime, markRead, receipt, useMessages, useSend, useThreads } from '@/data/chat';
import { useLang } from '@/i18n';
import { formatClock } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { Card } from '@/ui/Card';
import { ChatBubble } from '@/ui/ChatBubble';
import { Composer } from '@/ui/Composer';
import { EmptyState } from '@/ui/EmptyState';
import { NavigationBar } from '@/ui/NavigationBar';
import { T } from '@/ui/T';
import { TextLink } from '@/ui/TextLink';

const MAX = 2000; // R1.7, the messages.body check

/**
 * §7.13 Chat (Phase 2 R1.5–R1.8, text only): the other person in the header, the next session together
 * under it, bubbles with "Delivered" / "Read" under my last one, and the composer. Opening it marks the
 * thread read. Live updates (new messages, typing) arrive in T5.
 */
export default function Chat() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const userId = useSession().session?.user.id;
  const thread = useThreads(userId).data?.find((th) => th.id === threadId);
  const messages = useMessages(threadId);
  const send = useSend(threadId, userId);
  const [draft, setDraft] = useState('');
  const scroll = useRef<ScrollView>(null);
  const list = messages.data ?? [];
  const count = list.length;

  // Opening the chat, and each message arriving while it's open, clears the unread count.
  useEffect(() => {
    if (!userId || !threadId) return;
    markRead(threadId, userId)
      .then(() => qc.invalidateQueries({ queryKey: ['threads'] }))
      .catch(() => {}); // the count just stays until the next open
  }, [threadId, userId, count, qc]);

  const name = thread?.other_name ?? '';
  const learner = thread?.i_am_learner ?? true;
  const discipline = thread?.next_discipline_en ?? thread?.last_discipline_en;
  const subtitle = learner
    ? [discipline && t('chat.coach', { discipline }), thread?.reply_label].filter(Boolean).join(' · ')
    : undefined;
  const tick = receipt(list, userId ?? '', thread?.other_read_at ?? null);
  const now = new Date();

  const submit = () => {
    const body = draft;
    setDraft('');
    void send(body);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: c.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scroll}
        onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: false })}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.body,
          { paddingTop: insets.top + component.navBar.height + space.space4 },
        ]}
      >
        {learner && thread?.next_ref && thread.next_starts_at && (
          <Card style={styles.next}>
            <T variant="subheadline" style={styles.grow}>
              {t('chat.next', {
                when: dayTime(thread.next_starts_at, now, t, lang),
                venue: thread.next_venue ?? '',
              })}
            </T>
            <TextLink
              label={t('chat.view')}
              onPress={() => router.push({ pathname: '/booking/[ref]', params: { ref: thread.next_ref! } })}
            />
          </Card>
        )}
        {!messages.isLoading && count === 0 && (
          <EmptyState
            icon="messages"
            title={t('chat.emptyTitle')}
            body={t('chat.emptyBody', { name: firstName(name) })}
          />
        )}
        {list.map((m) => {
          const mine = m.sender_id === userId;
          const time = formatClock(new Date(m.created_at), lang);
          return (
            <ChatBubble
              key={m.id}
              mine={mine}
              body={m.body}
              sending={m.status === 'sending'}
              accessibilityLabel={mine ? t('chat.you', { time }) : t('chat.them', { name, time })}
              footer={tick?.id === m.id ? t(tick.read ? 'chat.read' : 'chat.delivered') : undefined}
              failed={
                m.status === 'failed'
                  ? { label: t('chat.notSent'), onRetry: () => void send(m.body, m.id) }
                  : undefined
              }
            />
          );
        })}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: insets.bottom + space.space2 }]}>
        <Composer
          value={draft}
          onChangeText={setDraft}
          onSend={submit}
          placeholder={t('chat.placeholder')}
          sendLabel={t('chat.send')}
          maxLength={MAX}
        />
      </View>

      <NavigationBar
        title={name}
        subtitle={subtitle || undefined}
        onBack={() => router.back()}
        actions={
          learner && thread
            ? [
                {
                  icon: 'profile',
                  label: t('chat.viewProfile'),
                  onPress: () =>
                    router.push({ pathname: '/instructor/[id]', params: { id: thread.instructor_id } }),
                },
              ]
            : []
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: component.chatBubble.gap, paddingBottom: space.space4 },
  next: { flexDirection: 'row', alignItems: 'center', gap: space.space3, padding: space.space4 },
  grow: { flex: 1 },
  composer: { paddingHorizontal: layout.sideMargin, paddingTop: space.space2 },
});
