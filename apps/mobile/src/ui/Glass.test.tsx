import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { dark, light } from '@cfa/tokens';
import { useSettings } from '@/theme/settings';
import { Glass, glassMode } from './Glass';

test('decision table: liquid on iOS 26, blur on older iOS, frosted on Android or Reduce Transparency', () => {
  expect(glassMode('ios', true, false)).toBe('liquid');
  expect(glassMode('ios', false, false)).toBe('blur');
  expect(glassMode('android', false, false)).toBe('frosted');
  expect(glassMode('ios', true, true)).toBe('frosted');
});

const flat = (s: unknown): Record<string, unknown> =>
  Array.isArray(s) ? Object.assign({}, ...s.flat(Infinity).filter(Boolean)) : (s as Record<string, unknown>);

test('frosted fallback is solid glass-frosted; prominent gets a 1.5 pt glass-label border', async () => {
  useSettings.setState({
    theme: 'dark',
    devForce: { reduceTransparency: true, increaseContrast: false, reduceMotion: false },
  });
  await render(
    <Glass radius={20} prominent>
      <Text>x</Text>
    </Glass>,
  );
  const style = flat(screen.getByText('x').parent?.props.style);
  expect(style.backgroundColor).toBe(dark.glassFrosted);
  expect(style.borderWidth).toBe(1.5);
  expect(style.borderColor).toBe(dark.glassLabel);
});

test('Increase Contrast turns the rim into 1.5 pt label', async () => {
  useSettings.setState({
    theme: 'light',
    devForce: { reduceTransparency: true, increaseContrast: true, reduceMotion: false },
  });
  await render(
    <Glass radius={20}>
      <Text>y</Text>
    </Glass>,
  );
  const style = flat(screen.getByText('y').parent?.props.style);
  expect(style.borderWidth).toBe(1.5);
  expect(style.borderColor).toBe(light.label);
});
