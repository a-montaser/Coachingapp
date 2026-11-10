import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { component, motion, space } from '@cfa/tokens';
import { useIsRTL } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Icon } from './Icon';
import { T } from './T';

type Props = {
  mine: boolean;
  body: string;
  /** Read by VoiceOver before the text, e.g. "You, 17:30" or "Nour, 17:31". */
  accessibilityLabel: string;
  /** Under my last message: "Delivered" / "Read" (§5). */
  footer?: string;
  /** A send that didn't reach the server: "Not sent · Retry" under the bubble, tappable (R1.8). */
  failed?: { label: string; onRetry: () => void };
  /** Still on its way: drawn a little faded. */
  sending?: boolean;
  /** Swipe right (left in Arabic) to reply (D74); also a VoiceOver action named `replyLabel`. */
  onReply?: () => void;
  replyLabel?: string;
  /** The message this one replies to, shown above the text; tapping it scrolls to the original. */
  quote?: { name: string; text: string; onPress: () => void };
};

const cb = component.chatBubble;
const sw = component.replySwipe;

/** §5 Chat bubble: max width 260, radius 20 with a 6 pt tail corner; theirs `surface-2`, mine `brand`. */
export function ChatBubble({
  mine,
  body,
  accessibilityLabel,
  footer,
  failed,
  sending,
  onReply,
  replyLabel,
  quote,
}: Props) {
  const { c } = useTheme();
  const dir = useIsRTL() ? -1 : 1;
  const x = useSharedValue(0);

  // Pull toward the reading direction's end, past the threshold to reply; it always springs back.
  const swipe = Gesture.Pan()
    .enabled(Boolean(onReply))
    .activeOffsetX(dir * sw.activateAt)
    .failOffsetY([-sw.activateAt, sw.activateAt])
    .onUpdate((e) => {
      x.value = dir * Math.min(Math.max(dir * e.translationX, 0), sw.max);
    })
    .onEnd(() => {
      if (Math.abs(x.value) >= sw.threshold && onReply) scheduleOnRN(onReply);
      x.value = withSpring(0, motion.lensSpring);
    });
  const moved = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const arrow = useAnimatedStyle(() => ({
    opacity: interpolate(Math.abs(x.value), [0, sw.threshold], [0, 1], 'clamp'),
  }));

  return (
    <View style={[styles.wrap, mine ? styles.end : styles.start]}>
      {onReply && (
        <Animated.View style={[styles.arrow, arrow]} pointerEvents="none">
          <Icon name="reply" size={component.iconButton.iconSize} color={c.label2} />
        </Animated.View>
      )}
      <GestureDetector gesture={swipe}>
        <Animated.View style={[styles.column, mine ? styles.end : styles.start, moved]}>
          <View
            accessible
            accessibilityLabel={`${accessibilityLabel}: ${quote ? `${quote.name}, ${quote.text}. ` : ''}${body}`}
            accessibilityActions={onReply && replyLabel ? [{ name: 'reply', label: replyLabel }] : undefined}
            onAccessibilityAction={(e) => e.nativeEvent.actionName === 'reply' && onReply?.()}
            style={[
              styles.bubble,
              mine
                ? { backgroundColor: c.brand, borderBottomEndRadius: cb.tail }
                : { backgroundColor: c.surface2, borderBottomStartRadius: cb.tail },
              sending && styles.sending,
            ]}
          >
            {quote && (
              <Pressable
                onPress={quote.onPress}
                style={[
                  styles.quote,
                  {
                    backgroundColor: mine ? c.brandTint : c.surface,
                    borderStartColor: mine ? c.gold : c.brand,
                  },
                ]}
              >
                <T variant="caption1" weight="700" numberOfLines={1}>
                  {quote.name}
                </T>
                <T variant="footnote" color={c.label2} numberOfLines={2}>
                  {quote.text}
                </T>
              </Pressable>
            )}
            <T color={mine ? c.onBrand : c.label}>{body}</T>
          </View>
          {footer && !failed && (
            <T variant="caption1" color={c.label2}>
              {footer}
            </T>
          )}
          {failed && (
            <Pressable accessibilityRole="button" onPress={failed.onRetry} hitSlop={space.space3}>
              <T variant="caption1" weight="600" color={c.danger}>
                {failed.label}
              </T>
            </Pressable>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: cb.maxWidth, justifyContent: 'center' },
  column: { gap: space.space1 },
  start: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  end: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  arrow: { position: 'absolute', start: -sw.arrowInset },
  bubble: {
    borderRadius: cb.radius,
    paddingHorizontal: cb.padH,
    paddingVertical: cb.padV,
    gap: space.space1,
  },
  quote: {
    borderStartWidth: sw.quoteBar,
    borderRadius: sw.quoteRadius,
    paddingHorizontal: space.space2,
    paddingVertical: space.space1,
  },
  sending: { opacity: 0.6 },
});
