import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type as typeScale } from '@cfa/tokens';
import '@/i18n';
import { useApplyThemeOverride, useTheme } from '@/theme/useTheme';
import { useSheetOptions } from '@/ui/Sheet';

export default function RootLayout() {
  useApplyThemeOverride();
  const { c, scheme } = useTheme();
  const sheet = useSheetOptions();
  const [fontsLoaded] = useFonts({
    [typeScale.brandHero.fontFamily]: require('../../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
  });
  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}>
        <Stack.Screen name="gallery-sheet" options={sheet} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
