import { fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import Profile from '@/app/(tabs)/profile';
import Appearance from '@/app/appearance';
import Family from '@/app/family';
import FamilyMember from '@/app/family-member';
import Language from '@/app/language';
import SignOut from '@/app/sign-out';
import { useSettings } from '@/theme/settings';
import { validateFamilyMember } from './family';

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
const mockSave = jest.fn();
jest.mock('./family', () => ({
  ...jest.requireActual('./family'),
  useFamily: () => ({ data: [{ id: 'k1', first_name: 'Ali', age: 9 }] }),
  usePendingKidsBookings: () => ({
    data: [
      {
        ref: 'CFA-00001',
        family_member_id: 'k1',
        starts_at: '2026-10-24T08:00:00Z',
        title: 'Swimming for kids',
      },
    ],
  }),
  useSaveFamilyMember: () => ({ mutate: mockSave, isPending: false, isError: false }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockParams.mockReturnValue({});
  useSettings.setState({ lang: 'en', theme: 'system' });
});

test.each([
  ['', '9', { name: 'nameRequired' }],
  ['   ', '9', { name: 'nameRequired' }],
  ['A'.repeat(41), '9', { name: 'nameTooLong' }],
  ['Ali', '', { age: 'ageRange' }],
  ['Ali', '5', { age: 'ageRange' }],
  ['Ali', '15', { age: 'ageRange' }],
  ['Ali', 'nine', { age: 'ageRange' }],
  ['Ali', '9.5', { age: 'ageRange' }],
])('family member %j aged %j is rejected (§7.14, ages 6–14)', (name, age, errors) => {
  expect(validateFamilyMember(name, age)).toEqual({ ok: false, errors, value: null });
});

test('family member validation trims the name and accepts 6, 14 and Arabic-Indic digits', () => {
  expect(validateFamilyMember('  Ali ', '6').value).toEqual({ first_name: 'Ali', age: 6 });
  expect(validateFamilyMember('Ali', '14').value).toEqual({ first_name: 'Ali', age: 14 });
  expect(validateFamilyMember('علي', '٩').value).toEqual({ first_name: 'علي', age: 9 });
});

test('Add a family member shows inline errors and does not save until valid', async () => {
  await render(<FamilyMember />);
  await fireEvent.press(screen.getByRole('button', { name: 'Add to family' }));
  expect(screen.getByText('Enter their first name.')).toBeOnTheScreen();
  expect(screen.getByText('Kids sessions are for ages 6 to 14.')).toBeOnTheScreen();
  expect(mockSave).not.toHaveBeenCalled();

  await fireEvent.changeText(screen.getByLabelText('First name'), 'Laila');
  await fireEvent.changeText(screen.getByLabelText('Age'), '7');
  await fireEvent.press(screen.getByRole('button', { name: 'Add to family' }));
  expect(mockSave).toHaveBeenCalledWith({ id: undefined, first_name: 'Laila', age: 7 }, expect.anything());
});

test('Edit a family member starts from their saved name and age', async () => {
  mockParams.mockReturnValue({ id: 'k1' });
  await render(<FamilyMember />);
  expect(screen.getByText('Edit Ali')).toBeOnTheScreen();
  await fireEvent.changeText(screen.getByLabelText('Age'), '10');
  await fireEvent.press(screen.getByRole('button', { name: 'Save changes' }));
  expect(mockSave).toHaveBeenCalledWith({ id: 'k1', first_name: 'Ali', age: 10 }, expect.anything());
});

test('Profile shows the header, levels and settings with current values (R3.4)', async () => {
  await render(<Profile />);
  expect(screen.getByText('Omar')).toBeOnTheScreen();
  expect(screen.getByText('New Cairo · member since 2026')).toBeOnTheScreen();
  expect(screen.getByText('Beginner · self-rated')).toBeOnTheScreen();
  expect(screen.getByText('Level not set')).toBeOnTheScreen();
  expect(screen.getByText('English')).toBeOnTheScreen();
  expect(screen.getByText('System')).toBeOnTheScreen();
  await fireEvent.press(screen.getByText('Family & kids'));
  expect(mockRouter.push).toHaveBeenCalledWith('/family');
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

test('Family & kids lists children with their pending booking, and adds or edits (R3.5)', async () => {
  await render(<Family />);
  expect(screen.getByText('Ali · 9')).toBeOnTheScreen();
  expect(
    screen.getByText('Swimming for kids · 24 Oct · waiting for the instructor to confirm'),
  ).toBeOnTheScreen();
  expect(screen.getByText('Kids sessions are 45 minutes, for ages 6–14')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Edit' }));
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/family-member', params: { id: 'k1' } });
  await fireEvent.press(screen.getByRole('button', { name: 'Add a family member' }));
  expect(mockRouter.push).toHaveBeenCalledWith('/family-member');
});
