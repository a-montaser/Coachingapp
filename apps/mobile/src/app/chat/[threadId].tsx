import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useSession } from '@/data/auth';
import { askReminderPermission } from '@/data/reminders';
import { firstName } from '@/data/book';
import {
  dayTime,
  markRead,
  receipt,
  useMessages,
  useOpenThread,
  useSend,
  useThreads,
  useTyping,
  type Message,
} from '@/data/chat';
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
import { TypingDots } from '@/ui/TypingDots';

const MAX = 2000; // R1.7, the messages.body check

/**
 * §7.13 Chat (Phase 2 R1.5–R1.8, text only): the other person in the header, the next session together
 * under it, bubbles with "Delivered" / "Read" under my last one, and the composer. Opening it marks the
 * thread read. New messages, "Read" and the other side's typing dots arrive live (T5, `useChatRealtime`).
 */
export default function Chat() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  // The home-bar inset only matters with the keyboard down; with it up, the field sits right on the keyboard.
  const [keyboardUp, setKeyboardUp] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () =>
      setKeyboardUp(true),
    );
    const hide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () =>
      setKeyboardUp(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const qc = useQueryClient();
  const userId = useSession().session?.user.id;
  const thread = useThreads(userId).data?.find((th) => th.id === threadId);
  const messages = useMessages(threadId);
  const send = useSend(threadId, userId);
  const [draft, setDraft] = useState('');
  const scroll = useRef<ScrollViewInstance>(null);
  const offsets = useRef(new Map<string, number>());
  // Swipe to reply (D74): the message being answered, shown above the field until sent or cancelled.
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const list = messages.data ?? [];
  const count = list.length;
  const byId = new Map(list.map((m) => [m.id, m]));
  const typing = useTyping(threadId, userId);
  const lastFromThem = count > 0 && list[count - 1]!.sender_id !== userId;

  // Ask for notifications once (the same permission as reminders), so new messages can notify (D74).
  useEffect(() => {
    void askReminderPermission().catch(() => {});
  }, []);

  // This chat is on screen: its messages don't raise the in-app alert.
  useEffect(() => {
    useOpenThread.setState({ id: threadId });
    return () => useOpenThread.setState({ id: null });
  }, [threadId]);

  // Their message landed: their dots go.
  const { clear } = typing;
  useEffect(() => {
    if (lastFromThem) clear();
  }, [count, lastFromThem, clear]);

  // Opening the chat, and each message arriving while it's open, clears the unread count.
  useEffect(() => {
    if (!userId || !threadId) return;
    markRead(threadId, userId)
      .then(() => qc.invalidateQueries({ queryKey: ['threads'] }))
      .catch(() => {}); // the count just stays until the next open
  }, [threadId, userId, count, qc]);

  const name = thread?.other_name ?? '';
  const senderName = (m: Message) => (m.sender_id === userId ? t('chat.youName') : firstName(name));
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
    void send(body, undefined, replyTo?.id);
    setReplyTo(null);
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
          const quoted = m.reply_to ? byId.get(m.reply_to) : undefined;
          return (
            // The wrapper records where each message sits, so tapping a quote can scroll to it.
            <View key={m.id} onLayout={(e) => offsets.current.set(m.id, e.nativeEvent.layout.y)}>
              <ChatBubble
                mine={mine}
                body={m.body}
                sending={m.status === 'sending'}
                accessibilityLabel={mine ? t('chat.you', { time }) : t('chat.them', { name, time })}
                footer={tick?.id === m.id ? t(tick.read ? 'chat.read' : 'chat.delivered') : undefined}
                failed={
                  m.status === 'failed'
                    ? { label: t('chat.notSent'), onRetry: () => void send(m.body, m.id, m.reply_to) }
                    : undefined
                }
                onReply={m.status ? undefined : () => setReplyTo(m)}
                replyLabel={t('chat.reply')}
                quote={
                  quoted
                    ? {
                        name: senderName(quoted),
                        text: quoted.body,
                        onPress: () => {
                          const y = offsets.current.get(quoted.id);
                          if (y !== undefined)
                            scroll.current?.scrollTo({ y: Math.max(0, y - space.space8), animated: true });
                        },
                      }
                    : undefined
                }
              />
            </View>
          );
        })}
        {typing.typing && <TypingDots accessibilityLabel={t('chat.typing', { name: firstName(name) })} />}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: (keyboardUp ? 0 : insets.bottom) + space.space2 }]}>
        <Composer
          value={draft}
          onChangeText={(text) => {
            setDraft(text);
            if (text.trim()) typing.ping();
          }}
          onSend={submit}
          placeholder={t('chat.placeholder')}
          sendLabel={t('chat.send')}
          maxLength={MAX}
          replyTo={
            replyTo
              ? {
                  title: t('chat.replyingTo', { name: senderName(replyTo) }),
                  text: replyTo.body,
                  onCancel: () => setReplyTo(null),
                  cancelLabel: t('chat.cancelReply'),
                }
              : undefined
          }
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
