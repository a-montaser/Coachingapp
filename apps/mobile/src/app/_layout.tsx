import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { type as typeScale } from '@cfa/tokens';
import '@/i18n';
import { useApplyThemeOverride } from '@/theme/useTheme';

export default function RootLayout() {
  useApplyThemeOverride();
  const [fontsLoaded] = useFonts({
    [typeScale.brandHero.fontFamily]: require('../../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
  });
  if (!fontsLoaded) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}
