import { fireEvent, render, screen } from '@testing-library/react-native';
import { light } from '@cfa/tokens';
import { nour, photoWalk, wheelTaster, yasmine } from '@/dev/seed';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { GroupedList } from './GroupedList';
import { InstructorCard } from './InstructorCard';
import { WorkshopCard } from './WorkshopCard';

beforeEach(() => useSettings.setState({ theme: 'light' }));

test('InstructorCard reads as one button with the whole summary', async () => {
  const onPress = jest.fn();
  await render(<InstructorCard instructor={yasmine} onPress={onPress} />);
  const card = screen.getByRole('button', {
    name: 'Yasmine Fathy, Pottery, Rated 4.9, 112 reviews, 2.4 km · Zamalek, Next: Today 17:30, From 450 EGP, Favourited',
  });
  await fireEvent.press(card);
  expect(onPress).toHaveBeenCalled();
  expect(screen.getByText('From 450 EGP')).toHaveStyle({ color: light.brandText });
});

test('InstructorCard leaves out what the seed does not give', async () => {
  await render(<InstructorCard instructor={nour} onPress={() => {}} />);
  expect(screen.queryByText(/Next:/)).toBeNull();
  expect(screen.getByText('4.9 (128) · New Cairo')).toBeOnTheScreen();
});

test('WorkshopCard shows spots left, or Full when none', async () => {
  await render(<WorkshopCard workshop={wheelTaster} onPress={() => {}} layout="rail" />);
  expect(screen.getByText('3 of 8 spots left')).toBeOnTheScreen();
  expect(screen.getByText('650 EGP')).toBeOnTheScreen();

  await render(<WorkshopCard workshop={photoWalk} onPress={() => {}} />);
  expect(screen.getByText('Full')).toBeOnTheScreen();
});

test('GroupedList rows with an action are buttons; rows without are plain', async () => {
  const onPress = jest.fn();
  await render(
    <GroupedList
      rows={[
        { key: 'lang', title: 'Language', value: 'English', icon: 'languages', onPress },
        { key: 'info', title: 'Kids sessions are 45 min, ages 6–14' },
      ]}
    />,
  );
  await fireEvent.press(screen.getByRole('button'));
  expect(onPress).toHaveBeenCalled();
  expect(screen.getAllByRole('button')).toHaveLength(1);
});
