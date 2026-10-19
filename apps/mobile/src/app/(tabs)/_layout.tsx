import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { TabBar, restoreTabBar, useTabBarMinimised, type TabKey } from '@/ui/TabBar';

const ROUTE: Record<TabKey, string> = {
  home: 'index',
  explore: 'explore',
  bookings: 'bookings',
  messages: 'messages',
  profile: 'profile',
};
// The same SF Symbols the Icon component draws on iOS; filled when selected, as Apple's tab bars do.
const SF: Record<TabKey, { default: string; selected: string }> = {
  home: { default: 'house', selected: 'house.fill' },
  explore: { default: 'magnifyingglass', selected: 'magnifyingglass' },
  bookings: { default: 'calendar', selected: 'calendar' },
  messages: { default: 'bubble.left', selected: 'bubble.left.fill' },
  profile: { default: 'person', selected: 'person.fill' },
};
const ORDER: TabKey[] = ['home', 'explore', 'bookings', 'messages', 'profile'];

/**
 * iOS: Apple's own tab bar, so the Liquid Glass and its selection animation are the system's (owner, D47;
 * the prototype's floating bar is drawn after it). It minimises on scroll down (§4.4).
 * Known limit (D29): under JS-level RTL (D26) the native tab order does not mirror in Arabic.
 * Android: the prototype's floating glass TabBar (D43), minimising while a tab scrolls down.
 */
export default function TabsLayout() {
  const { t } = useTranslation();
  const minimised = useTabBarMinimised();

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs minimizeBehavior="onScrollDown">
        {ORDER.map((tab) => (
          <NativeTabs.Trigger key={tab} name={ROUTE[tab]}>
            <NativeTabs.Trigger.Icon sf={SF[tab] as never} />
            <NativeTabs.Trigger.Label>{t(`tabs.${tab}`)}</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        ))}
      </NativeTabs>
    );
  }

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
