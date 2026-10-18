import { act, fireEvent, render, renderHook, screen } from '@testing-library/react-native';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { AccessibilityInfo } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { light, motion } from '@cfa/tokens';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { BottomActionBar } from './BottomActionBar';
import { Button } from './Button';
import { NavigationBar } from './NavigationBar';
import { useSheetOptions } from './Sheet';
import { TabBar, useMinimiseOnScroll, useTabBarBottom } from './TabBar';
import { Toast } from './Toast';

jest.mock('expo-glass-effect', () => ({
  ...jest.requireActual('expo-glass-effect'),
  isLiquidGlassAvailable: jest.fn(() => true),
  isGlassEffectAPIAvailable: jest.fn(() => true),
}));

beforeEach(() =>
  useSettings.setState({
    theme: 'light',
    devForce: { reduceTransparency: false, increaseContrast: false, reduceMotion: false },
  }),
);

test('Toast is announced and hides itself after ~2.6 s', async () => {
  jest.useFakeTimers();
  const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibility');
  const onHide = jest.fn();
  await render(<Toast message="Booking cancelled" visible onHide={onHide} />);
  expect(announce).toHaveBeenCalledWith('Booking cancelled');
  await act(async () => jest.advanceTimersByTime(motion.toastHoldMs - 1));
  expect(onHide).not.toHaveBeenCalled();
  await act(async () => jest.advanceTimersByTime(1));
  expect(onHide).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
});

const scroll = (y: number) => ({ nativeEvent: { contentOffset: { y } } }) as never;

test('minimise on scroll: down minimises, up restores, the top always restores', async () => {
  const { result } = await renderHook(() => useMinimiseOnScroll());
  await act(async () => result.current.onScroll(scroll(200)));
  expect(result.current.minimised).toBe(true);
  await act(async () => result.current.onScroll(scroll(150)));
  expect(result.current.minimised).toBe(false);
  await act(async () => result.current.onScroll(scroll(400)));
  await act(async () => result.current.onScroll(scroll(0)));
  expect(result.current.minimised).toBe(false);
  await act(async () => result.current.onScroll(scroll(4))); // under the jitter threshold
  expect(result.current.minimised).toBe(false);
});

test('TabBar: five tabs, active one selected, unread count in the Messages label', async () => {
  const onSelect = jest.fn();
  await render(<TabBar active="home" onSelect={onSelect} unreadMessages={3} />);
  expect(screen.getAllByRole('tab')).toHaveLength(5);
  expect(screen.getByRole('tab', { name: 'Home' })).toBeSelected();
  await fireEvent.press(screen.getByRole('tab', { name: 'Messages, 3 unread' }));
  expect(onSelect).toHaveBeenCalledWith('messages');
  // Glass carries no colour: the badge is glass-label on bg, not danger (§4.2, DS .glass .badge).
  expect(screen.getByText('3', { includeHiddenElements: true }).parent).toHaveStyle({
    backgroundColor: light.glassLabel,
  });
});

test('tab bar sits 26 pt above the home indicator (§4.4)', async () => {
  const insets = (bottom: number) => ({ top: 0, left: 0, right: 0, bottom });
  const { result } = await renderHook(() => useTabBarBottom(), {
    wrapper: ({ children }) => (
      <SafeAreaInsetsContext.Provider value={insets(34)}>{children}</SafeAreaInsetsContext.Provider>
    ),
  });
  expect(result.current).toBe(8 + 5 + 26); // iPhone 16 Pro: indicator top at 13 pt
  const none = await renderHook(() => useTabBarBottom(), {
    wrapper: ({ children }) => (
      <SafeAreaInsetsContext.Provider value={insets(0)}>{children}</SafeAreaInsetsContext.Provider>
    ),
  });
  expect(none.result.current).toBe(26); // no home indicator
});

test('minimised TabBar shows the active tab and a jump button (Home when on Messages)', async () => {
  const onRestore = jest.fn();
  const onSelect = jest.fn();
  await render(<TabBar active="messages" onSelect={onSelect} minimised onRestore={onRestore} />);
  await fireEvent.press(screen.getByRole('button', { name: 'Messages' }));
  expect(onRestore).toHaveBeenCalled();
  await fireEvent.press(screen.getByRole('button', { name: 'Home' }));
  expect(onSelect).toHaveBeenCalledWith('home');
});

test('NavigationBar: labelled back, up to two labelled actions, and an inline title (heading) without a hero', async () => {
  const onBack = jest.fn();
  await render(
    <NavigationBar
      title="Booking"
      onBack={onBack}
      actions={[
        { icon: 'share', label: 'Share', onPress: () => {} },
        { icon: 'more', label: 'More', onPress: () => {} },
      ]}
    />,
  );
  expect(screen.getByRole('header', { name: 'Booking' })).toBeOnTheScreen(); // prototype Book: title in the bar
  await fireEvent.press(screen.getByRole('button', { name: 'Back' }));
  expect(onBack).toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'More' })).toBeOnTheScreen();
});

test('BottomActionBar puts caption and price on glass labels next to the action', async () => {
  await render(
    <BottomActionBar caption="Sat 17 Oct · 11:00 · 2 seats" price="1,300 EGP">
      <Button label="Reserve" variant="primary" onPress={() => {}} />
    </BottomActionBar>,
  );
  expect(screen.getByText('1,300 EGP')).toHaveStyle({ color: light.glassLabel });
  expect(screen.getByRole('button', { name: 'Reserve' })).toBeOnTheScreen();
});

test('sheet content: transparent over native glass, solid glass-frosted otherwise', async () => {
  const native = await renderHook(() => useSheetOptions());
  expect(native.result.current.presentation).toBe('formSheet');
  expect(native.result.current.contentStyle.backgroundColor).toBe('transparent');

  jest.mocked(isLiquidGlassAvailable).mockReturnValue(false);
  const fallback = await renderHook(() => useSheetOptions());
  expect(fallback.result.current.contentStyle.backgroundColor).toBe(light.glassFrosted);
  jest.mocked(isLiquidGlassAvailable).mockReturnValue(true);
});

test('Text inside Toast stays visible under Reduce Motion (no animation, content always shown)', async () => {
  useSettings.setState({
    devForce: { reduceTransparency: false, increaseContrast: false, reduceMotion: true },
  });
  await render(<Toast message="Saved" visible onHide={() => {}} />);
  expect(screen.getByText('Saved')).toBeOnTheScreen();
});
