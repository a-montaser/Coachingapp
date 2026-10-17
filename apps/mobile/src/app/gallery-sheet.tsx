import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { T } from '@/ui/T';

const TYPES = ['Any', '1:1', 'Group', 'Kids', 'Workshop'];

/** Sheet demo for the gallery (§4.4, §7.5 Filters layout). Dev only. */
export default function GallerySheet() {
  const { c } = useTheme();
  const [type, setType] = useState('Any');
  if (!__DEV__) return null;
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <T variant="title1" accessibilityRole="header">
        Filters
      </T>
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
  body: { padding: layout.sideMargin, paddingTop: space.space8, gap: space.space4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
