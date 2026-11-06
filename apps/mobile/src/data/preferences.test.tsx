import { fireEvent, render, screen, waitFor, within } from '@testing-library/react-native';
import '@/i18n';
import Preferences from '@/app/preferences';
import { useSettings } from '@/theme/settings';
import { useOnboardingDraft } from './onboarding';

jest.mock('expo-router', () => ({ router: { back: jest.fn(), push: jest.fn() } }));
const mockRouter = jest.requireMock('expo-router').router;
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
}));
const mockSave = jest.fn();
jest.mock('./onboarding', () => ({
  ...jest.requireActual('./onboarding'),
  saveInterests: (...a: unknown[]) => mockSave(...a),
  useDisciplines: () => ({
    data: [
      {
        id: 'pottery',
        category_id: 'hobbies',
        name_en: 'Pottery',
        name_ar: null,
        icon: 'pottery',
        code: null,
      },
      { id: 'padel', category_id: 'sports', name_en: 'Padel', name_ar: null, icon: 'padel', code: null },
    ],
  }),
}));
jest.mock('./account', () => ({
  ...jest.requireActual('./account'),
  useInterests: () => ({ data: [{ discipline_id: 'pottery', level: 'beginner' }] }),
}));
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({ invalidateQueries: jest.fn() }),
}));

beforeEach(() => {
  useSettings.setState({ lang: 'en' });
  useOnboardingDraft.getState().reset();
});

test('one page: saved picks start chosen with their level; add a pick, set its level, save and go back', async () => {
  mockSave.mockResolvedValue(undefined);
  await render(<Preferences />);
  expect(screen.getByRole('button', { name: 'Pottery' })).toBeSelected();
  expect(
    within(screen.getByLabelText('Pottery')).getByRole('radio', { name: 'Pottery: Beginner' }),
  ).toBeChecked();
  await fireEvent.press(screen.getByRole('button', { name: 'Padel' }));
  await fireEvent.press(screen.getByRole('radio', { name: 'Padel: Advanced' }));
  expect(useOnboardingDraft.getState()).toMatchObject({
    picks: ['pottery', 'padel'],
    levels: { pottery: 'beginner', padel: 'advanced' },
  });
  await fireEvent.press(screen.getByRole('button', { name: 'Save changes' }));
  await waitFor(() => expect(mockRouter.back).toHaveBeenCalled());
  expect(mockSave).toHaveBeenCalledWith('u1');
});
