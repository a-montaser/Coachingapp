import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import Profile from '@/app/(tabs)/profile';
import Appearance from '@/app/appearance';
import Language from '@/app/language';
import SignOut from '@/app/sign-out';
import { useSettings } from '@/theme/settings';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: jest.fn(() => ({})),
}));
const mockRouter = jest.requireMock('expo-router').router;
const mockParams = jest.requireMock('expo-router').useLocalSearchParams as jest.Mock;

jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
const mockSignOut = jest.fn();
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  signOut: () => mockSignOut(),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
  useProfile: () => ({
    data: { first_name: 'Omar', area_id: 'new-cairo', created_at: '2026-10-17T10:00:00Z', onboarded_at: 'x' },
  }),
}));
jest.mock('./account', () => ({
  useArea: () => ({ data: { name_en: 'New Cairo', name_ar: null } }),
  useInterests: () => ({
    data: [
      {
        discipline_id: 'pottery',
        name_en: 'Pottery',
        name_ar: null,
        level: 'beginner',
        level_source: 'self',
      },
      { discipline_id: 'padel', name_en: 'Padel', name_ar: null, level: null, level_source: 'self' },
    ],
  }),
}));
jest.mock('./checkout', () => ({
  ...jest.requireActual('./checkout'),
  useCredit: () => ({ data: 1300 }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockParams.mockReturnValue({});
  useSettings.setState({ lang: 'en', theme: 'system' });
});

test('Profile shows the header, levels and settings with current values (R3.4)', async () => {
  await render(<Profile />);
  expect(screen.getByText('Omar')).toBeOnTheScreen();
  expect(screen.getByText('New Cairo · member since 2026')).toBeOnTheScreen();
  expect(screen.getByText('Beginner · self-rated')).toBeOnTheScreen();
  expect(screen.getByText('Level not set')).toBeOnTheScreen();
  expect(screen.getByText('English')).toBeOnTheScreen();
  expect(screen.getByText('System')).toBeOnTheScreen();
  expect(screen.getByText('App credit')).toBeOnTheScreen();
  expect(screen.getByText('1,300 EGP')).toBeOnTheScreen();
  expect(screen.queryByText('Family & kids')).toBeNull(); // descoped (D80)
  await fireEvent.press(screen.getByText('Sign out'));
  expect(mockRouter.push).toHaveBeenCalledWith('/sign-out');
});

test('Language sheet switches to Arabic at once (R3.3)', async () => {
  await render(<Language />);
  expect(screen.getByRole('radio', { name: 'English' })).toBeChecked();
  await fireEvent.press(screen.getByRole('radio', { name: 'العربية' }));
  expect(useSettings.getState().lang).toBe('ar');
});

test('Appearance sheet sets Light, Dark or System', async () => {
  await render(<Appearance />);
  await fireEvent.press(screen.getByRole('radio', { name: 'Dark' }));
  expect(useSettings.getState().theme).toBe('dark');
  expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
});

test('Sign out asks first: staying closes the sheet, confirming signs out', async () => {
  mockSignOut.mockResolvedValue({ error: null });
  await render(<SignOut />);
  await fireEvent.press(screen.getByRole('button', { name: 'Stay signed in' }));
  expect(mockRouter.back).toHaveBeenCalled();
  expect(mockSignOut).not.toHaveBeenCalled();
  await fireEvent.press(screen.getByRole('button', { name: 'Sign out' }));
  expect(mockSignOut).toHaveBeenCalled();
});
