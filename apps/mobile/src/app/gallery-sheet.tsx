import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { layout, space } from '@cfa/tokens';
import { galleryCopy } from '@/dev/galleryCopy';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Chip } from '@/ui/Chip';
import { IconButton } from '@/ui/IconButton';
import { T } from '@/ui/T';

/**
 * Sheet demo for the gallery. Header per §7.5 and DS Sheet: glass close · Headline title · plain Reset;
 * one prominent primary at the bottom that states the outcome. Dev only.
 */
export default function GallerySheet() {
  const { c } = useTheme();
  const copy = galleryCopy[useLang()];
  const g = copy.sheet;
  const [type, setType] = useState(0);
  if (!__DEV__) return null;
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.header}>
        <IconButton icon="close" accessibilityLabel={g.close} floating onPress={() => router.back()} />
        <T variant="headline" accessibilityRole="header" style={styles.title}>
          {g.title}
        </T>
        <Button label={g.reset} size="small" onPress={() => setType(0)} />
      </View>
      <T variant="footnote" color={c.label2}>
        {g.sessionType}
      </T>
      <View style={styles.chips}>
        {g.types.map((label, i) => (
          <Chip key={label} label={label} selected={i === type} onPress={() => setType(i)} />
        ))}
      </View>
      <Button label={copy.buttons.show} variant="primary" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: layout.sideMargin, paddingTop: space.space6, gap: space.space4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.space2 },
  title: { flex: 1, textAlign: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space2 },
});
