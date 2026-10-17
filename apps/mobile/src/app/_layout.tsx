import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type as typeScale } from '@cfa/tokens';
import { useProfile, useSession } from '@/data/auth';
import { queryClient } from '@/data/queryClient';
import { useIsRTL } from '@/i18n';
import { useSettings } from '@/theme/settings';
import { useApplyThemeOverride, useTheme } from '@/theme/useTheme';
import { useSheetOptions } from '@/ui/Sheet';

/**
 * The journey gate (§6.1): signed out → Welcome; signed in but not onboarded → Interests;
 * otherwise the tabs. Screens pushed above the tabs (instructor, workshop, book…) hide the tab bar.
 */
function RootNavigator() {
  const { c } = useTheme();
  const sheet = useSheetOptions();
  const direction = useIsRTL() ? 'rtl' : 'ltr';
  const { session, loading } = useSession();
  const profile = useProfile(session?.user.id);
  if (loading || (session && profile.isLoading)) return null;
  const signedIn = Boolean(session);
  const onboarded = Boolean(profile.data?.onboarded_at);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg, direction } }}>
      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={signedIn && !onboarded}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={signedIn && onboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Screen name="gallery" />
      <Stack.Screen name="gallery-sheet" options={sheet} />
    </Stack>
  );
}

export default function RootLayout() {
  useApplyThemeOverride();
  const { scheme } = useTheme();
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
        <RootNavigator />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
