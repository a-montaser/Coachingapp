import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { component, layout, space } from '@cfa/tokens';
import { useFavouriteCards, useFavourites } from '@/data/favourites';
import { useLang } from '@/i18n';
import { useTheme } from '@/theme/useTheme';
import { EmptyState } from '@/ui/EmptyState';
import { InstructorCard } from '@/ui/InstructorCard';
import { NavigationBar } from '@/ui/NavigationBar';
import { T } from '@/ui/T';

/** Profile → Favourites (Phase 2 R3.2): favourite instructors, newest first; the heart removes one. */
export default function Favourites() {
  const { c } = useTheme();
  const { t } = useTranslation();
  const lang = useLang();
  const ar = lang === 'ar';
  const insets = useSafeAreaInsets();
  const fav = useFavourites();
  const cards = useFavouriteCards(fav.ids).data ?? [];
  const empty = fav.ids !== undefined && fav.ids.length === 0;

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.body,
          {
            paddingTop: insets.top + component.navBar.height + space.space4,
            paddingBottom: insets.bottom + space.space6,
          },
        ]}
      >
        <T variant="largeTitle" accessibilityRole="header">
          {t('favourites.title')}
        </T>
        {empty && (
          <EmptyState icon="heart" title={t('favourites.emptyTitle')} body={t('favourites.emptyBody')} />
        )}
        {/* A heart removed here leaves the list at once (the ids update before the cards refetch). */}
        {cards
          .filter((p) => fav.has(p.id))
          .map((p) => (
            <InstructorCard
              key={p.id}
              instructor={{
                name: p.display_name,
                discipline: (ar && p.discipline_ar) || p.discipline_en,
                levels: p.levels ?? undefined,
                rating: p.rating_avg,
                reviews: p.rating_count,
                area: (ar && p.area_ar) || p.area_en,
                favourite: true,
              }}
              onPress={() =>
                router.push({
                  pathname: '/instructor/[id]',
                  params: { id: p.id, discipline: p.discipline_id },
                })
              }
              onFavourite={() => fav.toggle(p.id)}
            />
          ))}
      </ScrollView>
      <NavigationBar onBack={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: layout.sideMargin, gap: layout.cardGap },
});
