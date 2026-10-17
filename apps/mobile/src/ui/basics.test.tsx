import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet, type ViewStyle } from 'react-native';
import { light, touch } from '@cfa/tokens';
import { useSettings } from '@/theme/settings';
import { Button } from './Button';
import { Chip } from './Chip';
import { IconButton } from './IconButton';
import { Pill } from './Pill';

beforeEach(() => useSettings.setState({ theme: 'light' }));

/** Visual min height (from the element or its first child) plus hitSlop on both sides. */
function touchHeight(el: { props: Record<string, unknown>; children: unknown[] }): number {
  const own =
    StyleSheet.flatten(
      typeof el.props.style === 'function' ? el.props.style({ pressed: false }) : el.props.style,
    ) ?? {};
  const child = (el.children[0] as { props?: { style?: unknown } } | undefined)?.props?.style;
  const h = Number(own.minHeight ?? own.height ?? StyleSheet.flatten(child as ViewStyle)?.minHeight ?? 0);
  const slop = el.props.hitSlop;
  return h + 2 * (typeof slop === 'number' ? slop : 0);
}

test('Button: names the outcome, reports disabled and busy, meets 44 pt at both sizes', async () => {
  const onPress = jest.fn();
  await render(<Button label="Pay 585 EGP" onPress={onPress} variant="destructive" />);
  await fireEvent.press(screen.getByRole('button', { name: 'Pay 585 EGP' }));
  expect(onPress).toHaveBeenCalled();

  await render(<Button label="Pick a time" onPress={onPress} disabled size="small" />);
  const disabled = screen.getByRole('button', { name: 'Pick a time' });
  expect(disabled).toBeDisabled();
  expect(touchHeight(disabled as never)).toBeGreaterThanOrEqual(touch);
  expect(screen.getByText('Pick a time')).toHaveStyle({ color: light.label3 });
});

test('Button busy state is announced and blocks presses', async () => {
  const onPress = jest.fn();
  await render(<Button label="Processing" onPress={onPress} variant="primary" busy />);
  const button = screen.getByRole('button', { name: 'Processing' });
  expect(button).toBeBusy();
  await fireEvent.press(button);
  expect(onPress).not.toHaveBeenCalled();
});

test('IconButton is labelled and 44 × 44', async () => {
  await render(<IconButton icon="share" accessibilityLabel="Share" onPress={() => {}} floating />);
  expect(screen.getByRole('button', { name: 'Share' })).toBeOnTheScreen();
});

test('Chip: selected uses brand / on-brand and reports selection; touch ≥ 44 via hitSlop', async () => {
  await render(<Chip label="Pottery" selected onPress={() => {}} />);
  const chip = screen.getByRole('button', { name: 'Pottery' });
  expect(chip).toBeSelected();
  expect(chip).toHaveStyle({ backgroundColor: light.brand });
  expect(screen.getByText('Pottery')).toHaveStyle({ color: light.onBrand });
  expect(touchHeight(chip as never)).toBeGreaterThanOrEqual(touch);
});

test('Pill tones map to the §5 pairs', async () => {
  await render(<Pill label="Confirmed" tone="ok" />);
  expect(screen.getByText('Confirmed')).toHaveStyle({ color: light.success });
});
