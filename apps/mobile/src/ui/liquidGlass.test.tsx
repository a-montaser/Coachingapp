import { fireEvent, render, screen } from '@testing-library/react-native';
import { Platform, Text } from 'react-native';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { Glass } from './Glass';
import { TabBar } from './TabBar';

// iOS 26 with Liquid Glass: GlassView becomes a plain host we can read props from.
jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return {
    GlassView: (p: object) => <View testID="glass" {...p} />,
    GlassContainer: (p: object) => <View testID="glass-group" {...p} />,
    isLiquidGlassAvailable: () => true,
    isGlassEffectAPIAvailable: () => true,
  };
});

beforeEach(() => {
  Platform.OS = 'ios';
  useSettings.setState({ theme: 'dark', lang: 'en' });
  useSettings.getState().setDevForce('reduceTransparency', false);
});

test('native glass is interactive only when asked, and follows the app theme', async () => {
  await render(
    <>
      <Glass radius={20}>
        <Text>bar</Text>
      </Glass>
      <Glass radius={20} interactive>
        <Text>button</Text>
      </Glass>
    </>,
  );
  const [bar, button] = screen.getAllByTestId('glass');
  expect(bar!.props).toMatchObject({ isInteractive: false, colorScheme: 'dark' });
  expect(button!.props).toMatchObject({ isInteractive: true, colorScheme: 'dark' });
});

test('tab bar: a still glass bar in a glass group, with an interactive lens on the selected tab', async () => {
  await render(<TabBar active="explore" onSelect={() => {}} />);
  expect(screen.getByTestId('glass-group')).toBeOnTheScreen();
  await fireEvent(screen.getByTestId('tab-bar'), 'layout', {
    nativeEvent: { layout: { width: 361, height: 64 } },
  });
  const glass = screen.getAllByTestId('glass');
  expect(glass[0]!.props.isInteractive).toBe(false); // the bar
  expect(glass[1]!.props.isInteractive).toBe(true); // the selection lens
  expect(screen.getByRole('tab', { name: 'Explore' })).toBeSelected();
});
