import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Avatar } from './Avatar';
import { T } from './T';

type Props = {
  name: string;
  time: string;
  /** "Padel · Today, 17:30" in brand-text (§7.13). */
  context?: string | null;
  lastMessage?: string | null;
  /** Bold last message and a count badge while unread. */
  unread: number;
  /** The badge's spoken form, e.g. "2 unread". */
  unreadLabel?: string;
  onPress: () => void;
};

const r = component.threadRow;

/** §7.13 Messages row: 48 pt photo, name and time, context line, last message (bold when unread), badge. */
export function ThreadRow({ name, time, context, lastMessage, unread, unreadLabel, onPress }: Props) {
  const { c } = useTheme();
  const bold = unread > 0;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[name, context, lastMessage, bold ? unreadLabel : null, time]
        .filter(Boolean)
        .join(', ')}
      onPress={onPress}
      style={styles.row}
    >
      <Avatar size={r.photo} />
      <View style={styles.text}>
        <View style={styles.line}>
          <T variant="headline" numberOfLines={1} style={styles.grow}>
            {name}
          </T>
          <T variant="footnote" color={bold ? c.label : c.label2}>
            {time}
          </T>
        </View>
        {context ? (
          <T variant="footnote" weight="600" color={c.brandText} numberOfLines={1}>
            {context}
          </T>
        ) : null}
        <View style={styles.line}>
          <T
            variant="subheadline"
            weight={bold ? '700' : undefined}
            color={bold ? c.label : c.label2}
            numberOfLines={1}
            style={styles.grow}
          >
            {lastMessage ?? ''}
          </T>
          {bold && (
            <View style={[styles.badge, { backgroundColor: c.danger }]}>
              <T variant="caption1" weight="700" color={c.onBrand}>
                {unread}
              </T>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.gap,
    paddingVertical: r.padV,
    paddingHorizontal: component.groupedList.padding,
  },
  text: { flex: 1, gap: space.space1 / 2 },
  line: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  grow: { flex: 1 },
  badge: {
    minWidth: r.badge,
    height: r.badge,
    borderRadius: radius.pill,
    paddingHorizontal: r.badgePad,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
