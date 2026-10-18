import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type as typeScale } from '@cfa/tokens';
import { useProfile, useSession } from '@/data/auth';
import { useApplyDraftAfterSignUp } from '@/data/onboarding';
import { queryClient } from '@/data/queryClient';
import { useIsRTL } from '@/i18n';
import { useSettings } from '@/theme/settings';
import { useApplyThemeOverride, useTheme } from '@/theme/useTheme';
import { useSheetOptions } from '@/ui/Sheet';

/**
 * The journey gate: signed out → Welcome (then onboarding, then sign-up, D34); signed in but not
 * onboarded → Interests; otherwise the tabs. Screens pushed above the tabs (instructor, workshop, book…) hide the tab bar.
 */
function RootNavigator() {
  const { c } = useTheme();
  const sheet = useSheetOptions();
  const direction = useIsRTL() ? 'rtl' : 'ltr';
  const { session, loading } = useSession();
  const profile = useProfile(session?.user.id);
  const applying = useApplyDraftAfterSignUp(session?.user.id, profile.data);
  if (loading || (session && profile.isLoading) || applying) return null;
  const signedIn = Boolean(session);
  const onboarded = Boolean(profile.data?.onboarded_at);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg, direction } }}>
      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={signedIn && onboarded}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="family" />
        <Stack.Screen name="instructor/[id]" />
        <Stack.Screen name="family-member" options={sheet} />
        <Stack.Screen name="language" options={sheet} />
        <Stack.Screen name="appearance" options={sheet} />
        <Stack.Screen name="sign-out" options={sheet} />
        <Stack.Screen name="filters" options={sheet} />
        <Stack.Screen name="sort" options={sheet} />
      </Stack.Protected>
      {/* Open to everyone: new learners onboard before sign-up (D34), signed-in ones who never finished
          land here, and Profile reopens steps 1–2. Listed after the tabs so an onboarded learner lands Home. */}
      <Stack.Screen name="(onboarding)" />
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
