import { render, screen } from '@testing-library/react-native';
import { Platform, StyleSheet } from 'react-native';
import { light } from '@cfa/tokens';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { Button } from './Button';

jest.mock('expo-glass-effect', () => ({
  ...jest.requireActual('expo-glass-effect'),
  isLiquidGlassAvailable: jest.fn(() => true),
  isGlassEffectAPIAvailable: jest.fn(() => true),
}));

const labelColor = () => StyleSheet.flatten(screen.getByText('Sign in').props.style).color;

beforeEach(() => {
  Platform.OS = 'ios';
  useSettings.setState({ theme: 'light' });
  useSettings.getState().setDevForce('reduceTransparency', false);
});

test('glass over a dark hero gets a light label, so "Sign in" stays readable in light mode', async () => {
  await render(<Button label="Sign in" variant="secondary" overMedia onPress={() => {}} />);
  expect(labelColor()).toBe(light.onBrand);
});

test('the solid frosted fallback (Reduce Transparency) keeps the normal dark glass label', async () => {
  useSettings.getState().setDevForce('reduceTransparency', true);
  await render(<Button label="Sign in" variant="secondary" overMedia onPress={() => {}} />);
  expect(labelColor()).toBe(light.glassLabel);
});

test('ordinary glass buttons are unchanged', async () => {
  await render(<Button label="Sign in" variant="secondary" onPress={() => {}} />);
  expect(labelColor()).toBe(light.glassLabel);
});
