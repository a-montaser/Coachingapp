import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { layout, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from '@/ui/T';

// shortcut: holding screen until T9 builds onboarding (specs/phase-1/tasks.md).
export default function Interests() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={{ paddingTop: insets.top + space.space4, paddingHorizontal: layout.sideMargin }}
    >
      <T variant="title1">What do you want to learn?</T>
    </ScrollView>
  );
}
