import { Tabs, router, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { NativeTabs } from 'expo-router/native-tabs';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/i18n';
import { formatNumber } from '@/i18n/format';
import { Platform } from 'react-native';
import { useMyInstructorId, useSession } from '@/data/auth';
import { useChatRealtime, useThreads } from '@/data/chat';
import { useReminderSync } from '@/data/reminders';
import { TabBar, restoreTabBar, useTabBarMinimised, type TabKey } from '@/ui/TabBar';
import { TAB_ICON } from '@/ui/tabIcons';
import { showToast } from '@/ui/Toast';

const ROUTE: Record<TabKey, string> = {
  home: 'index',
  explore: 'explore',
  bookings: 'bookings',
  messages: 'messages',
  profile: 'profile',
};
const ORDER: TabKey[] = ['home', 'explore', 'bookings', 'messages', 'profile'];
// A signed-in instructor uses the app for chat only until Phase 3 (D67); Profile keeps sign-out and settings.
const INSTRUCTOR_TABS: TabKey[] = ['messages', 'profile'];

/**
 * iOS: Apple's own tab bar, so the Liquid Glass and its selection animation are the system's (owner, D47)
 * with the prototype's icons (D48). It minimises on scroll down (§4.4).
 * Known limit (D29): under JS-level RTL (D26) the native tab order does not mirror in Arabic.
 * Android: the prototype's floating glass TabBar (D43), minimising while a tab scrolls down.
 */
export default function TabsLayout() {
  const { t } = useTranslation();
  const lang = useLang();
  const minimised = useTabBarMinimised();
  useReminderSync();
  // Back on a tab (a tab switch, or coming back from a pushed screen): show the bar again. It only reacts
  // to scrolling, so a page that returns already at the top would otherwise keep the minimised pill.
  const pathname = usePathname();
  useEffect(() => restoreTabBar(), [pathname]);
  const userId = useSession().session?.user.id;
  const instructor = useMyInstructorId(userId);
  const threads = useThreads(userId).data;
  const unread = threads?.reduce((n, th) => n + th.unread, 0) ?? 0; // R1.4
  // Live chat for the whole signed-in app (T5); a message for a chat that isn't open shows as a toast (R1.10).
  useChatRealtime(userId, (m) => {
    const name = threads?.find((th) => th.id === m.thread_id)?.other_name;
    showToast(name ? t('chat.toast', { name }) : t('chat.toastNew'));
  });
  const isInstructor = Boolean(instructor.data);
  const tabs = isInstructor ? INSTRUCTOR_TABS : ORDER;
  // Home is hidden for an instructor, so they land on Messages.
  useEffect(() => {
    if (isInstructor && pathname === '/') router.replace('/messages');
  }, [isInstructor, pathname]);
  // Wait for the answer: changing which tabs exist later would remount the tab navigator.
  if (instructor.isLoading) return null;

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs minimizeBehavior="onScrollDown">
        {ORDER.map((tab) => (
          <NativeTabs.Trigger key={tab} name={ROUTE[tab]} hidden={!tabs.includes(tab)}>
            <NativeTabs.Trigger.Icon src={TAB_ICON[tab]} renderingMode="template" />
            <NativeTabs.Trigger.Label>{t(`tabs.${tab}`)}</NativeTabs.Trigger.Label>
            {tab === 'messages' && unread > 0 && (
              <NativeTabs.Trigger.Badge>{formatNumber(unread, lang)}</NativeTabs.Trigger.Badge>
            )}
          </NativeTabs.Trigger>
        ))}
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigateToTab }) => {
        const active = (Object.keys(ROUTE) as TabKey[]).find(
          (k) => ROUTE[k] === state.routes[state.index]?.name,
        );
        return (
          <TabBar
            active={active ?? 'home'}
            minimised={minimised}
            onRestore={restoreTabBar}
            tabs={tabs}
            unreadMessages={unread}
            onSelect={(k) => {
              restoreTabBar();
              // SDK 58: a custom tab bar switches tabs by route key.
              const route = state.routes.find((r) => r.name === ROUTE[k]);
              if (route) navigateToTab(route.key);
            }}
          />
        );
      }}
    >
      {ORDER.map((tab) => (
        <Tabs.Screen key={tab} name={ROUTE[tab]} options={tabs.includes(tab) ? undefined : { href: null }} />
      ))}
    </Tabs>
  );
}
