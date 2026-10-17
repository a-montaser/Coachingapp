import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { motion } from '@cfa/tokens';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { CategoryButton, CategoryTray } from './CategoryTray';

beforeEach(() => {
  jest.useFakeTimers();
  useSettings.setState({ theme: 'light' });
});
afterEach(() => jest.useRealTimers());

async function openTray() {
  const onSelect = jest.fn();
  const onClose = jest.fn();
  await render(<CategoryTray visible selected="hobbies" onSelect={onSelect} onClose={onClose} />);
  return { onSelect, onClose };
}

test('trigger says which category is on and what it does (§6.2)', async () => {
  await render(<CategoryButton category="hobbies" onPress={() => {}} />);
  expect(screen.getByRole('button', { name: 'Category: Hobbies. Change category' })).toBeOnTheScreen();
});

test('four radios in order HOBBIES, SPORTS, EDUCATION, LANGUAGES, current one checked', async () => {
  await openTray();
  expect(screen.getAllByRole('radio').map((r) => r.props.accessibilityLabel)).toEqual([
    'Hobbies',
    'Sports',
    'Education',
    'Languages',
  ]);
  expect(screen.getByRole('radio', { name: 'Hobbies' })).toBeChecked();
  expect(screen.getByText('SPORTS', { includeHiddenElements: true })).toBeOnTheScreen();
  expect(screen.getByRole('header', { name: 'Browse by' })).toBeOnTheScreen();
});

test('tapping a row checks it at once, then selects and closes ~0.25 s later', async () => {
  const { onSelect, onClose } = await openTray();
  await fireEvent.press(screen.getByRole('radio', { name: 'Sports' }));
  expect(screen.getByRole('radio', { name: 'Sports' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Hobbies' })).not.toBeChecked();
  expect(onSelect).not.toHaveBeenCalled();

  await act(async () => jest.advanceTimersByTime(motion.trayCloseDelayMs));
  expect(onSelect).toHaveBeenCalledWith('sports');
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('✕ and the dim close without changing the category', async () => {
  const { onSelect, onClose } = await openTray();
  await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
  await fireEvent.press(screen.getByTestId('tray-dim', { includeHiddenElements: true }));
  expect(onClose).toHaveBeenCalledTimes(2);
  await act(async () => jest.advanceTimersByTime(1000));
  expect(onSelect).not.toHaveBeenCalled();
});
