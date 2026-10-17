import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { layout, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { T } from '@/ui/T';

// shortcut: holding screen until its Phase 1 task builds it (specs/phase-1/tasks.md).
export default function Screen() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={{ paddingTop: insets.top + space.space4, paddingHorizontal: layout.sideMargin }}
    >
      <T variant="largeTitle" accessibilityRole="header">
        {t('tabs.bookings')}
      </T>
    </ScrollView>
  );
}
