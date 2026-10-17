import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type as typeScale } from '@cfa/tokens';
import { queryClient } from '@/data/queryClient';
import { useIsRTL } from '@/i18n';
import { useSettings } from '@/theme/settings';
import { useApplyThemeOverride, useTheme } from '@/theme/useTheme';
import { useSheetOptions } from '@/ui/Sheet';

export default function RootLayout() {
  useApplyThemeOverride();
  const { c, scheme } = useTheme();
  const sheet = useSheetOptions();
  const direction = useIsRTL() ? 'rtl' : 'ltr';
  // Wait for saved theme/language/category so the first frame is already right (R3.2).
  const [hydrated, setHydrated] = useState(useSettings.persist.hasHydrated());
  useEffect(() => useSettings.persist.onFinishHydration(() => setHydrated(true)), []);
  const [fontsLoaded] = useFonts({
    [typeScale.brandHero.fontFamily]: require('../../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
  });
  if (!fontsLoaded || !hydrated) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={[styles.root, { direction }]}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg, direction } }}>
          <Stack.Screen name="gallery-sheet" options={sheet} />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
