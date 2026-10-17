import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { TabBar, type TabKey } from '@/ui/TabBar';

const ROUTE: Record<TabKey, string> = {
  home: 'index',
  explore: 'explore',
  bookings: 'bookings',
  messages: 'messages',
  profile: 'profile',
};
const SF: Record<TabKey, { default: string; selected: string }> = {
  home: { default: 'house', selected: 'house.fill' },
  explore: { default: 'magnifyingglass', selected: 'magnifyingglass' },
  bookings: { default: 'calendar', selected: 'calendar' },
  messages: { default: 'bubble.left', selected: 'bubble.left.fill' },
  profile: { default: 'person', selected: 'person.fill' },
};
const ORDER: TabKey[] = ['home', 'explore', 'bookings', 'messages', 'profile'];

/**
 * iOS: Apple's tab bar (Liquid Glass on iOS 26), minimising on scroll down (§4.4, D29).
 * Android: the Phase 0 frosted glass TabBar (locked architecture).
 * Known limit (D29): under JS-level RTL (D26) the native tab order does not mirror in Arabic.
 */
export default function TabsLayout() {
  const { t } = useTranslation();

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

  // shortcut: no minimise-on-scroll on Android yet (needs each tab to report scroll); add with Android device testing.
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const active = (Object.keys(ROUTE) as TabKey[]).find(
          (k) => ROUTE[k] === state.routes[state.index]?.name,
        );
        return <TabBar active={active ?? 'home'} onSelect={(k) => navigation.navigate(ROUTE[k])} />;
      }}
    >
      {ORDER.map((tab) => (
        <Tabs.Screen key={tab} name={ROUTE[tab]} />
      ))}
    </Tabs>
  );
}
