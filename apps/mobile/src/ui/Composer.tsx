import { StyleSheet, TextInput, View } from 'react-native';
import { component, radius, space, type as scale } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { T } from './T';
import { IconButton } from './IconButton';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder: string;
  sendLabel: string;
  /** e.g. 2,000 for a text message (R1.7). */
  maxLength: number;
  /** Swipe to reply (D74): "Replying to Nour" and the quoted text above the field, with ✕ to cancel. */
  replyTo?: { title: string; text: string; onCancel: () => void; cancelLabel: string };
};

const k = component.composer;

/**
 * §7.13 Chat composer: a glass message field and a send button that works once there's text. The "+" and
 * mic come back with photos, video and voice notes (Later, D67).
 */
export function Composer({ value, onChangeText, onSend, placeholder, sendLabel, maxLength, replyTo }: Props) {
  const { c } = useTheme();
  const empty = value.trim().length === 0;
  const field = (
    <View style={styles.row}>
      <Glass radius={radius.lg} style={styles.field}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={c.label2}
          accessibilityLabel={placeholder}
          testID="composer-input"
          multiline
          maxLength={maxLength}
          style={[styles.input, scale.body, { color: c.glassLabel }]}
        />
      </Glass>
      <IconButton icon="send" floating accessibilityLabel={sendLabel} onPress={onSend} disabled={empty} />
    </View>
  );
  if (!replyTo) return field;
  return (
    <View style={styles.stack}>
      <View style={[styles.reply, { backgroundColor: c.surface, borderStartColor: c.brand }]}>
        <View style={styles.grow}>
          <T variant="caption1" weight="700" color={c.brandText} numberOfLines={1}>
            {replyTo.title}
          </T>
          <T variant="footnote" color={c.label2} numberOfLines={1}>
            {replyTo.text}
          </T>
        </View>
        <IconButton
          icon="close"
          accessibilityLabel={replyTo.cancelLabel}
          onPress={replyTo.onCancel}
          color={c.label2}
        />
      </View>
      {field}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: space.space2 },
  reply: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderStartWidth: component.replySwipe.quoteBar,
    paddingStart: space.space3,
  },
  grow: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: space.space2 },
  field: { flex: 1, minHeight: k.minHeight, justifyContent: 'center' },
  input: {
    maxHeight: k.maxHeight,
    paddingHorizontal: k.padH,
    paddingTop: k.padV,
    paddingBottom: k.padV,
    textAlign: 'auto',
  },
});
