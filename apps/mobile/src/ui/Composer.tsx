import { StyleSheet, TextInput, View } from 'react-native';
import { component, radius, space, type as scale } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { IconButton } from './IconButton';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder: string;
  sendLabel: string;
  /** e.g. 2,000 for a text message (R1.7). */
  maxLength: number;
};

const k = component.composer;

/**
 * §7.13 Chat composer: a glass message field and a send button that works once there's text. The "+" and
 * mic come back with photos, video and voice notes (Later, D67).
 */
export function Composer({ value, onChangeText, onSend, placeholder, sendLabel, maxLength }: Props) {
  const { c } = useTheme();
  const empty = value.trim().length === 0;
  return (
    <View style={styles.row}>
      <Glass radius={radius.lg} style={styles.field}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={c.label2}
          accessibilityLabel={placeholder}
          multiline
          maxLength={maxLength}
          style={[styles.input, scale.body, { color: c.glassLabel }]}
        />
      </Glass>
      <IconButton icon="send" floating accessibilityLabel={sendLabel} onPress={onSend} disabled={empty} />
    </View>
  );
}

const styles = StyleSheet.create({
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
