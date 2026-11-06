import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { component, radius, space } from '@cfa/tokens';
import { useLang } from '@/i18n';
import { formatTime } from '@/i18n/format';
import { useTheme } from '@/theme/useTheme';
import { T } from './T';

export type SlotState = 'open' | 'booked' | 'yours';
export type Slot = { id: string; start: [number, number]; end: [number, number]; state: SlotState };
export type PartOfDay = 'morning' | 'afternoon' | 'evening';

const ts = component.timeSlot;

/** §5: Morning < 12:00, Afternoon 12–17, Evening ≥ 17:00. */
export function partOfDay([hour]: [number, number]): PartOfDay {
  if (hour < ts.morningEndsHour) return 'morning';
  return hour < ts.eveningStartsHour ? 'afternoon' : 'evening';
}

export function groupSlots(slots: Slot[]): [PartOfDay, Slot[]][] {
  const order: PartOfDay[] = ['morning', 'afternoon', 'evening'];
  return order
    .map((part) => [part, slots.filter((s) => partOfDay(s.start) === part)] as [PartOfDay, Slot[]])
    .filter(([, list]) => list.length > 0);
}

function TimeSlot({ slot, selected, onPress }: { slot: Slot; selected: boolean; onPress: () => void }) {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const booked = slot.state === 'booked';
  const start = formatTime(...slot.start, lang);
  const tail =
    slot.state === 'open'
      ? t('slots.until', { end: formatTime(...slot.end, lang) })
      : t(`slots.${slot.state}`);
  const fg = selected ? c.onBrand : booked ? c.label3 : c.label;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${start} ${tail}`}
      accessibilityState={{ selected, disabled: booked }}
      disabled={booked}
      onPress={onPress}
      style={[
        styles.slot,
        selected
          ? { backgroundColor: c.brand, borderColor: c.brand }
          : { backgroundColor: booked ? 'transparent' : c.surface, borderColor: c.separator },
      ]}
    >
      <T variant="subheadline" weight={ts.startWeight} color={fg} style={booked && styles.struck}>
        {start}
      </T>
      <T
        variant="caption1"
        weight={ts.tailWeight}
        color={selected ? c.onBrand : booked ? c.label3 : c.label2}
      >
        {tail}
      </T>
    </Pressable>
  );
}

type Props = { slots: Slot[]; selectedId?: string; onSelect: (slot: Slot) => void };

/** §5 Time slot grid: 3 columns, grouped by part of day. */
export function TimeSlots({ slots, selectedId, onSelect }: Props) {
  const { c } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.groups}>
      {groupSlots(slots).map(([part, list]) => (
        <View key={part} style={styles.group}>
          <T variant="footnote" weight="600" color={c.label2} accessibilityRole="header">
            {t(`slots.${part}`)}
          </T>
          <View style={styles.grid}>
            {Array.from({ length: Math.ceil(list.length / ts.columns) }, (_, r) => (
              <View key={r} style={styles.gridRow}>
                {Array.from({ length: ts.columns }, (_, col) => {
                  const slot = list[r * ts.columns + col];
                  return (
                    <View key={col} style={styles.cell}>
                      {slot && (
                        <TimeSlot
                          slot={slot}
                          selected={slot.id === selectedId}
                          onPress={() => onSelect(slot)}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  groups: { gap: space.space4 },
  group: { gap: space.space2 },
  grid: { gap: space.space2 },
  gridRow: { flexDirection: 'row', gap: space.space2 },
  cell: { flex: 1 },
  slot: {
    minHeight: ts.height,
    borderRadius: radius.sm,
    borderWidth: ts.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space.space1,
  },
  struck: { textDecorationLine: 'line-through' },
});
