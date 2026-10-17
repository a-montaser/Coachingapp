import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { layout, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { EmptyState } from '@/ui/EmptyState';
import { T } from '@/ui/T';

/** §7.13 Messages. Chat arrives in Phase 2; until then the tab explains itself (R3.6). */
export default function Messages() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={[styles.body, { paddingTop: insets.top + space.space4 }]}
    >
      <T variant="largeTitle" accessibilityRole="header">
        {t('messages.title')}
      </T>
      <EmptyState
        icon="messages"
        title={t('messages.emptyTitle')}
        body={t('messages.emptyBody')}
        action={{ label: t('messages.emptyAction'), onPress: () => router.navigate('/explore') }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({ body: { paddingHorizontal: layout.sideMargin, gap: space.space4 } });
