import { fireEvent, render, screen } from '@testing-library/react-native';
import { light } from '@cfa/tokens';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { DateTile } from './DateTile';
import { DayPicker } from './DayPicker';
import { groupSlots, partOfDay, TimeSlots, type Slot } from './TimeSlots';

beforeEach(() => useSettings.setState({ theme: 'light' }));

const sat = new Date('2026-10-17T09:00:00Z');

test('DateTile shows weekday, day and month caps in brand-text', async () => {
  await render(<DateTile date={sat} />);
  expect(screen.getByText('SAT')).toHaveStyle({ color: light.brandText });
  expect(screen.getByText('17')).toBeOnTheScreen();
  expect(screen.getByText('OCT')).toBeOnTheScreen();
  expect(screen.getByLabelText('Saturday 17 October')).toBeOnTheScreen();
});

test('DayPicker marks the selected day and labels days with no times', async () => {
  const onSelect = jest.fn();
  const days = [
    { date: sat, hasTimes: true },
    { date: new Date('2026-10-18T09:00:00Z'), hasTimes: false },
  ];
  await render(<DayPicker monthLabel="October 2026" days={days} selectedIndex={0} onSelect={onSelect} />);
  expect(screen.getByRole('button', { name: 'Saturday 17 October, open times' })).toBeSelected();
  await fireEvent.press(screen.getByRole('button', { name: 'Sunday 18 October, no times' }));
  expect(onSelect).toHaveBeenCalledWith(1);
  expect(screen.getByRole('button', { name: 'Previous week' })).toBeDisabled();
});

test('part of day: 11:59 morning, 12:00 afternoon, 16:59 afternoon, 17:00 evening', () => {
  expect(partOfDay([11, 59])).toBe('morning');
  expect(partOfDay([12, 0])).toBe('afternoon');
  expect(partOfDay([16, 59])).toBe('afternoon');
  expect(partOfDay([17, 0])).toBe('evening');
});

const slots: Slot[] = [
  { id: 'a', start: [9, 0], end: [10, 0], state: 'open' },
  { id: 'b', start: [17, 30], end: [18, 30], state: 'booked' },
  { id: 'c', start: [19, 0], end: [20, 0], state: 'yours' },
];

test('groupSlots drops empty parts of the day and keeps order', () => {
  expect(groupSlots(slots).map(([part]) => part)).toEqual(['morning', 'evening']);
});

test('booked slots are disabled and struck through; open slots show the end time', async () => {
  const onSelect = jest.fn();
  await render(<TimeSlots slots={slots} selectedId="a" onSelect={onSelect} />);
  const booked = screen.getByRole('button', { name: '17:30 booked' });
  expect(booked).toBeDisabled();
  expect(screen.getByText('17:30')).toHaveStyle({ textDecorationLine: 'line-through', color: light.label3 });
  expect(screen.getByRole('button', { name: '09:00 – 10:00' })).toBeSelected();
  await fireEvent.press(screen.getByRole('button', { name: '19:00 yours' }));
  expect(onSelect).toHaveBeenCalledWith(slots[2]);
});
