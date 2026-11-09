import { Pressable, StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
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
};

const cb = component.chatBubble;

/** §5 Chat bubble: max width 260, radius 20 with a 6 pt tail corner; theirs `surface-2`, mine `brand`. */
export function ChatBubble({ mine, body, accessibilityLabel, footer, failed, sending }: Props) {
  const { c } = useTheme();
  return (
    <View style={[styles.wrap, mine ? styles.end : styles.start]}>
      <View
        accessible
        accessibilityLabel={`${accessibilityLabel}: ${body}`}
        style={[
          styles.bubble,
          mine
            ? { backgroundColor: c.brand, borderBottomEndRadius: cb.tail }
            : { backgroundColor: c.surface2, borderBottomStartRadius: cb.tail },
          sending && styles.sending,
        ]}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: cb.maxWidth, gap: space.space1 },
  start: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  end: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubble: { borderRadius: cb.radius, paddingHorizontal: cb.padH, paddingVertical: cb.padV },
  sending: { opacity: 0.6 },
});
