import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import '@/i18n';
import RateSheet from '@/app/rate/[ref]';
import { useSettings } from '@/theme/settings';

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: () => ({ ref: 'CFA-22222' }),
}));
const mockRouter = jest.requireMock('expo-router').router;
const mockRpc = jest.fn();
jest.mock('./supabase', () => ({
  supabaseConfigured: true,
  supabase: { rpc: (...a: unknown[]) => mockRpc(...a) },
}));
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({ invalidateQueries: jest.fn() }),
  useQuery: () => ({
    data: {
      type: 'private',
      title: 'Private padel',
      child_name: null,
      discipline_en: 'Padel',
      discipline_ar: null,
      instructor_name: 'Nour El-Sayed',
    },
    isLoading: false,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSettings.setState({ lang: 'en' });
});

test('Rate: stars are required; the text is optional and private; sending rates once and closes (R2)', async () => {
  mockRpc.mockResolvedValue({ error: null });
  await render(<RateSheet />);
  expect(screen.getByText('Padel with Nour')).toBeOnTheScreen();
  expect(screen.getByText('Shared with Nour only.')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Send rating' })).toBeDisabled();

  await fireEvent.press(screen.getByRole('radio', { name: '4 stars' }));
  expect(screen.getByRole('radio', { name: '4 stars' })).toBeChecked();
  await fireEvent.changeText(screen.getByPlaceholderText('What went well? (optional)'), 'Great drills');
  await fireEvent.press(screen.getByRole('button', { name: 'Send rating' }));
  expect(mockRpc).toHaveBeenCalledWith('rate_booking', {
    p_ref: 'CFA-22222',
    p_stars: 4,
    p_body: 'Great drills',
  });
  await waitFor(() => expect(mockRouter.back).toHaveBeenCalled());
});

test('Rate: a refused rating says so and keeps the sheet open', async () => {
  mockRpc.mockResolvedValue({ error: { message: 'already_rated' } });
  await render(<RateSheet />);
  await fireEvent.press(screen.getByRole('radio', { name: '1 star' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Send rating' }));
  expect(await screen.findByText("Couldn't send your rating. Try again.")).toBeOnTheScreen();
  expect(mockRouter.back).not.toHaveBeenCalled();
});
