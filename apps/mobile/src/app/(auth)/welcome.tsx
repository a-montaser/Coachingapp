import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, radius, space } from '@cfa/tokens';
import { useTheme } from '@/theme/useTheme';
import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { T } from '@/ui/T';

/** §7.1 Welcome. The hero is a placeholder until the owner provides the illustration (D29). */
export default function Welcome() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const w = component.welcome;
  return (
    <View style={[styles.screen, { backgroundColor: c.surface }]}>
      <View
        style={[styles.hero, { height: w.heroHeight, backgroundColor: c.brand }]}
        accessible
        accessibilityRole="image"
        accessibilityLabel={t('auth.heroPlaceholder')}
      >
        <Icon name="hobbies" size={w.heroHeight / 6} color={c.brandTint} />
      </View>
      <View style={[styles.top, { top: insets.top + space.space2 }]}>
        <T
          variant="brandTitle"
          color={c.onBrand}
          style={{ fontSize: w.wordmarkSize }}
          accessibilityRole="header"
        >
          {t('brand.wordmark')}
        </T>
        <Button
          label={t('auth.signIn')}
          size="small"
          variant="secondary"
          overMedia
          onPress={() => router.push('/sign-up')}
        />
      </View>
      <View
        style={[styles.panel, { backgroundColor: c.surface, paddingBottom: insets.bottom + space.space4 }]}
      >
        {/* [OPEN: final copy] §7.1 / §15.1 */}
        <T variant="brandHero">{t('auth.welcomeHeadline')}</T>
        <T variant="callout" color={c.label2}>
          {t('auth.welcomeBody')}
        </T>
        {/* New learners pick interests first and create the account last (D34); "Sign in" goes straight to the phone. */}
        <Button label={t('auth.getStarted')} variant="primary" onPress={() => router.push('/categories')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: { alignItems: 'center', justifyContent: 'center' },
  top: {
    position: 'absolute',
    start: layout.sideMargin,
    end: layout.sideMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panel: {
    flex: 1,
    marginTop: -radius.lg,
    borderTopStartRadius: radius.lg,
    borderTopEndRadius: radius.lg,
    padding: space.space6,
    gap: space.space4,
    justifyContent: 'flex-end',
  },
});
