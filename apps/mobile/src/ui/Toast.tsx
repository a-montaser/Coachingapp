import { useEffect } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, motion, radius, space } from '@cfa/tokens';
import { useA11y } from '@/theme/useA11y';
import { useTheme } from '@/theme/useTheme';
import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { T } from './T';

type Props = { message: string; icon?: IconName; visible: boolean; onHide: () => void };

/** §5, §8: glass capsule near the top, holds ~2.6 s, announced to VoiceOver. */
export function Toast({ message, icon, visible, onHide }: Props) {
  const { c } = useTheme();
  const { reduceMotion } = useA11y();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!visible) return;
    AccessibilityInfo.announceForAccessibility(message);
    const id = setTimeout(onHide, motion.toastHoldMs);
    return () => clearTimeout(id);
  }, [visible, message, onHide]);

  if (!visible) return null;
  // Slide, not fade: fading a parent of native glass breaks the material (DECISIONS D20).
  return (
    <Animated.View
      entering={reduceMotion ? undefined : SlideInUp}
      exiting={reduceMotion ? undefined : SlideOutUp}
      pointerEvents="none"
      style={[styles.wrap, { top: insets.top + space.space2 }]}
    >
      <Glass radius={radius.pill}>
        <View style={styles.row} accessibilityLiveRegion="polite">
          {icon && <Icon name={icon} size={component.button.iconSize} color={c.glassLabel} />}
          <T variant="subheadline" weight={component.toast.weight} color={c.glassLabel}>
            {message}
          </T>
        </View>
      </Glass>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', start: layout.sideMargin, end: layout.sideMargin, alignItems: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.space2,
    paddingHorizontal: space.space4,
    paddingVertical: space.space3,
  },
});
