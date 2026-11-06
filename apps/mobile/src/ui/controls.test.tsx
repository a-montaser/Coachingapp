import { fireEvent, render, screen } from '@testing-library/react-native';
import { light } from '@cfa/tokens';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { Progress } from './Progress';
import { SearchField } from './SearchField';
import { SegmentedControl } from './SegmentedControl';
import { Switch } from './Switch';

beforeEach(() => useSettings.setState({ theme: 'light' }));

test('SearchField shows a labelled clear button only when there is text', async () => {
  const onChange = jest.fn();
  await render(<SearchField value="" onChangeText={onChange} placeholder="Pottery, oud, photography…" />);
  expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();

  await render(<SearchField value="oud" onChangeText={onChange} placeholder="Pottery, oud, photography…" />);
  await fireEvent.press(screen.getByRole('button', { name: 'Clear search' }));
  expect(onChange).toHaveBeenCalledWith('');
});

test('SegmentedControl exposes tabs with the selected one marked', async () => {
  const onChange = jest.fn();
  await render(
    <SegmentedControl
      accessibilityLabel="View"
      segments={['List', 'Map']}
      selectedIndex={0}
      onChange={onChange}
    />,
  );
  expect(screen.getByRole('tab', { name: 'List' })).toBeSelected();
  await fireEvent.press(screen.getByRole('tab', { name: 'Map' }));
  expect(onChange).toHaveBeenCalledWith(1);
});

test('Switch uses success for on', async () => {
  await render(<Switch value onValueChange={() => {}} accessibilityLabel="Repeat weekly" />);
  expect(screen.getByLabelText('Repeat weekly').props.onTintColor).toBe(light.success);
});

test('Progress reports its value and fills a segment partially', async () => {
  await render(<Progress value={1.5} accessibilityLabel="Onboarding progress" />);
  const bar = screen.getByRole('progressbar');
  expect(bar).toHaveAccessibilityValue({ min: 0, max: 3, now: 1.5 });
});
