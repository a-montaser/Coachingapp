import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { component, space } from '@cfa/tokens';
import { IconButton } from './IconButton';
import { T } from './T';

/** §7.5, DS Sheet: glass close · Headline title, centred. A spacer keeps the title centred. */
export function SheetHeader({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <IconButton
        icon="close"
        accessibilityLabel={t('common.close')}
        floating
        onPress={() => router.back()}
      />
      <T variant="headline" accessibilityRole="header" style={styles.title}>
        {title}
      </T>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  title: { flex: 1, textAlign: 'center' },
  spacer: { width: component.iconButton.size },
});
