import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T, type TypeVariant } from './T';
import { TextLink } from './TextLink';

type Props = {
  title: string;
  /** title2 on Home, title3 on detail screens, headline inside forms, footnote for Profile/Filters labels. */
  variant?: TypeVariant;
  /** e.g. "See all" (§7.4). */
  action?: { label: string; onPress: () => void };
  /** Lay children out in a wrapping row (chip groups). */
  wrap?: boolean;
  children: ReactNode;
};

/** A titled block of content: the section pattern every screen repeats. */
export function Section({ title, variant = 'title3', action, wrap = false, children }: Props) {
  const { c } = useTheme();
  const quiet = variant === 'footnote';
  return (
    <View style={styles.section}>
      <View style={styles.head}>
        <T
          variant={variant}
          weight={quiet ? '600' : undefined}
          color={quiet ? c.label2 : undefined}
          accessibilityRole="header"
          style={styles.grow}
        >
          {title}
        </T>
        {action && <TextLink label={action.label} onPress={action.onPress} />}
      </View>
      {wrap ? <View style={styles.wrap}>{children}</View> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: space.space3 },
  head: { flexDirection: 'row', alignItems: 'baseline', gap: space.space3 },
  grow: { flex: 1 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
