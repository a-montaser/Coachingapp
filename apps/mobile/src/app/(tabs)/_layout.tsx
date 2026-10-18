import { Tabs } from 'expo-router';
import { TabBar, restoreTabBar, useTabBarMinimised, type TabKey } from '@/ui/TabBar';

const ROUTE: Record<TabKey, string> = {
  home: 'index',
  explore: 'explore',
  bookings: 'bookings',
  messages: 'messages',
  profile: 'profile',
};
const ORDER: TabKey[] = ['home', 'explore', 'bookings', 'messages', 'profile'];

/**
 * The prototype's floating glass tab bar on iOS and Android (owner, D43; replaces D29's native iOS tabs).
 * It minimises while a tab's content scrolls down (each tab screen reports its scroll) and comes back
 * on scroll up, at the top, or on any tab tap.
 */
export default function TabsLayout() {
  const minimised = useTabBarMinimised();
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const active = (Object.keys(ROUTE) as TabKey[]).find(
          (k) => ROUTE[k] === state.routes[state.index]?.name,
        );
        return (
          <TabBar
            active={active ?? 'home'}
            minimised={minimised}
            onRestore={restoreTabBar}
            onSelect={(k) => {
              restoreTabBar();
              navigation.navigate(ROUTE[k]);
            }}
          />
        );
      }}
    >
      {ORDER.map((tab) => (
        <Tabs.Screen key={tab} name={ROUTE[tab]} />
      ))}
    </Tabs>
  );
}
