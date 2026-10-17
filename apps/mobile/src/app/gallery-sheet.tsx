import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { IconButton } from '@/ui/IconButton';
import { T } from '@/ui/T';

const TYPES = ['Any', '1:1', 'Group', 'Kids', 'Workshop'];

/**
 * Sheet demo for the gallery. Header per §7.5 and DS Sheet: glass close · Headline title · plain Reset;
 * one prominent primary at the bottom that states the outcome. Dev only.
 */
export default function GallerySheet() {
  const { c } = useTheme();
  const [type, setType] = useState('Any');
  if (!__DEV__) return null;
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.header}>
        <IconButton icon="close" accessibilityLabel="Close" floating onPress={() => router.back()} />
        <T variant="headline" accessibilityRole="header" style={styles.title}>
          Filters
        </T>
        <Button label="Reset" size="small" onPress={() => setType('Any')} />
      </View>
      <T variant="footnote" color={c.label2}>
        Session type
      </T>
      <View style={styles.chips}>
        {TYPES.map((label) => (
          <Chip key={label} label={label} selected={label === type} onPress={() => setType(label)} />
        ))}
      </View>
      <Button label="Show 6 coaches" variant="primary" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  title: { flex: 1, textAlign: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
