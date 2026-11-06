import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { Gallery } from './Gallery';

jest.mock('expo-router', () => ({ router: { push: jest.fn(), back: jest.fn() } }));

beforeEach(() =>
  useSettings.setState({
    theme: 'system',
    category: 'hobbies',
    devForce: { reduceTransparency: false, increaseContrast: false, reduceMotion: false },
  }),
);

test('gallery controls switch theme and force each accessibility fallback', async () => {
  await render(<Gallery />);
  await fireEvent.press(screen.getByRole('tab', { name: 'Dark' }));
  expect(useSettings.getState().theme).toBe('dark');

  await fireEvent(screen.getByLabelText('Reduce Transparency'), 'valueChange', true);
  await fireEvent(screen.getByLabelText('Reduce Motion'), 'valueChange', true);
  expect(useSettings.getState().devForce).toMatchObject({ reduceTransparency: true, reduceMotion: true });
});

test('every primitive section is on the gallery', async () => {
  await render(<Gallery />);
  for (const title of [
    'Buttons',
    'Icon buttons',
    'Chips and pills',
    'Search and segments',
    'Switch and progress',
    'Cards',
    'Grouped list',
    'Dates and times',
    'Overlays',
  ]) {
    expect(screen.getByRole('header', { name: title })).toBeOnTheScreen();
  }
  expect(screen.getAllByRole('tab', { name: /Home|Explore|Bookings|Profile|Messages/ })).toHaveLength(5);
  expect(screen.getByRole('button', { name: 'Category: Hobbies. Change category' })).toBeOnTheScreen();
});

test('the gallery switches its demo copy, seed and digits to Arabic', async () => {
  await render(<Gallery />);
  await fireEvent.press(screen.getByRole('tab', { name: 'العربية' }));
  expect(screen.getByRole('header', { name: 'الأزرار' })).toBeOnTheScreen();
  expect(screen.getByText('ياسمين فتحي')).toBeOnTheScreen();
  // Cards carry no price now (D54); Arabic-Indic digits still show in the rating.
  expect(screen.getAllByText(/٤٫٩/).length).toBeGreaterThan(0);
  await fireEvent.press(screen.getByRole('tab', { name: 'English' }));
  expect(screen.getByRole('header', { name: 'Buttons' })).toBeOnTheScreen();
});
