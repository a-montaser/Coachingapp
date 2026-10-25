import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { light } from '@cfa/tokens';
import { nour, photoWalk, wheelTaster, yasmine } from '@/dev/seed';
import '@/i18n';
import { useSettings } from '@/theme/settings';
import { GroupedList } from './GroupedList';
import { InstructorCard } from './InstructorCard';
import { WorkshopCard } from './WorkshopCard';

beforeEach(() => useSettings.setState({ theme: 'light' }));

test('Lesson card: the lesson leads, the instructor under it, no price (D54); one button with the summary', async () => {
  const onPress = jest.fn();
  await render(<InstructorCard instructor={yasmine} onPress={onPress} />);
  const card = screen.getByRole('button', {
    name: /^Pottery, Yasmine Fathy, .*Rated 4\.9, 112 reviews, 2\.4 km · Zamalek, Next: Today 17:30, Favourited$/,
  });
  await fireEvent.press(card);
  expect(onPress).toHaveBeenCalled();
  expect(screen.queryByText(/EGP/)).toBeNull();
  expect(screen.getByText('Next: Today 17:30')).toHaveStyle({ color: light.brandText });
});

test('InstructorCard leaves out what the seed does not give', async () => {
  await render(<InstructorCard instructor={nour} onPress={() => {}} />);
  expect(screen.queryByText(/Next:/)).toBeNull();
  expect(screen.getByText('4.9 (128) · New Cairo')).toBeOnTheScreen();
});

test('WorkshopCard shows spots left, or Full when none', async () => {
  await render(<WorkshopCard workshop={wheelTaster} onPress={() => {}} layout="rail" />);
  expect(screen.getByText('3 of 8 spots left')).toBeOnTheScreen();
  expect(screen.getByText('Beginners')).toBeOnTheScreen(); // the level before tapping (D54)
  expect(screen.getByText('Yasmine Fathy')).toBeOnTheScreen();
  expect(screen.queryByText(/EGP/)).toBeNull();

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

test('WorkshopCard banner spans the card at a fixed height: 120 in Explore, 104 on the Home rail (smaller, D54)', async () => {
  const view = await render(<WorkshopCard workshop={photoWalk} onPress={() => {}} />);
  const full = StyleSheet.flatten(screen.getByTestId('workshop-banner').props.style);
  expect(full).toMatchObject({ height: 120, alignSelf: 'stretch' });
  expect(full.aspectRatio).toBeUndefined(); // an aspect ratio with a max height shrank the width
  await view.unmount();
  await render(<WorkshopCard workshop={wheelTaster} onPress={() => {}} layout="rail" />);
  expect(StyleSheet.flatten(screen.getByTestId('workshop-banner').props.style).height).toBe(104);
});
