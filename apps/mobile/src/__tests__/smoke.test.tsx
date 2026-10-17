import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

test('renders', async () => {
  await render(<Text>Coach For All</Text>);
  expect(screen.getByText('Coach For All')).toBeTruthy();
});
