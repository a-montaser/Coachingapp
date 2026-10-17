import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import '@/i18n';
import Interests from '@/app/(onboarding)/interests';
import Levels from '@/app/(onboarding)/levels';
import WhoWhere from '@/app/(onboarding)/who-where';
import { nearestArea, saveInterests, useOnboardingDraft, type Area } from './onboarding';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn(), dismissTo: jest.fn() },
  useLocalSearchParams: jest.fn(() => ({})),
}));
jest.mock('expo-location', () => ({}));
const mockRouter = jest.requireMock('expo-router').router;

// A tiny stand-in for the Supabase query builder: records each call, resolves with no error.
const mockCalls: unknown[][] = [];
const mockBuilder: Record<string, jest.Mock> = {};
for (const m of ['delete', 'in', 'upsert', 'update', 'eq']) {
  mockBuilder[m] = jest.fn((...a: unknown[]) => {
    mockCalls.push([m, ...a]);
    return Object.assign(Promise.resolve({ error: null }), mockBuilder);
  });
}
jest.mock('./supabase', () => ({
  supabaseConfigured: true,
  supabase: {
    from: (table: string) => {
      mockCalls.push(['from', table]);
      return mockBuilder;
    },
  },
}));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'u1' } }, loading: false }),
}));
jest.mock('./account', () => ({ useInterests: () => ({ data: [] }) }));

const mockAreas: Area[] = [
  { id: 'zamalek', name_en: 'Zamalek', name_ar: null, lat: 30.0609, lng: 31.2197 },
  { id: 'new-cairo', name_en: 'New Cairo', name_ar: null, lat: 30.0074, lng: 31.4913 },
  { id: 'maadi', name_en: 'Maadi', name_ar: null, lat: 29.9602, lng: 31.2569 },
];
const d = (id: string, category_id: string, name_en: string, code: string | null = null) => ({
  id,
  category_id,
  name_en,
  name_ar: null,
  icon: code ? null : id,
  code,
  sort: 1,
});
const mockDisciplines = [
  d('pottery', 'hobbies', 'Pottery'),
  d('oud', 'hobbies', 'Oud'),
  d('padel', 'sports', 'Padel'),
  d('sat', 'education', 'SAT'),
  d('french', 'languages', 'French', 'FR'),
];
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: ({ queryKey }: { queryKey: string[] }) => ({
    data: queryKey[0] === 'disciplines' ? mockDisciplines : queryKey[0] === 'areas' ? mockAreas : undefined,
  }),
}));

const wrap = (ui: ReactNode) => <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>;

beforeEach(() => {
  jest.clearAllMocks();
  mockCalls.length = 0;
  useOnboardingDraft.setState({ picks: [], levels: {}, saved: {} });
});

test('nearest area: a point in Fifth Settlement is New Cairo, one on the Corniche is Maadi', () => {
  expect(nearestArea(mockAreas, 30.02, 31.47)?.id).toBe('new-cairo');
  expect(nearestArea(mockAreas, 29.965, 31.25)?.id).toBe('maadi');
  expect(nearestArea([], 30, 31)).toBeNull();
});

test('saving interests removes un-picked rows and upserts only new or changed ones', async () => {
  useOnboardingDraft.setState({
    saved: { pottery: 'beginner', oud: null, padel: 'advanced' },
    picks: ['pottery', 'padel', 'french'],
    levels: { pottery: 'beginner', padel: 'pro', french: null },
  });
  await saveInterests('u1');
  expect(mockCalls).toContainEqual(['in', 'discipline_id', ['oud']]);
  const upsert = mockCalls.find((c) => c[0] === 'upsert')![1] as { discipline_id: string; level: string }[];
  expect(upsert.map((r) => [r.discipline_id, r.level])).toEqual([
    ['padel', 'pro'],
    ['french', null],
  ]);
});

test('Interests: disabled until something is picked, then counts picks per section and overall', async () => {
  await render(wrap(<Interests />));
  expect(screen.getByRole('button', { name: 'Pick at least one' })).toBeDisabled();
  await fireEvent.press(screen.getByRole('checkbox', { name: 'Pottery' }));
  await fireEvent.press(screen.getByRole('checkbox', { name: 'French' }));
  expect(screen.getByRole('checkbox', { name: 'Pottery' })).toBeChecked();
  expect(screen.getAllByText('1 picked')).toHaveLength(2);
  await fireEvent.press(screen.getByRole('button', { name: 'Continue · 2 picked' }));
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/levels', params: {} });
});

test('Levels: a tap records and advances, Skip leaves it unset, Continue saves and opens step 3', async () => {
  useOnboardingDraft.setState({ picks: ['pottery', 'sat', 'french'] });
  await render(wrap(<Levels />));
  expect(screen.getByText('How experienced are you with pottery?')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('radio', { name: /^Intermediate/ }));
  expect(screen.getByText('How experienced are you with SAT?')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Skip' }));
  expect(screen.getByText('How experienced are you with French?')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('radio', { name: /^Beginner/ }));

  expect(screen.getByText("You're all set")).toBeOnTheScreen();
  expect(screen.getByText('Intermediate')).toBeOnTheScreen();
  expect(screen.getByText('Level not set')).toBeOnTheScreen();
  // Editing one pick from the summary comes straight back to it.
  await fireEvent.press(screen.getByText('Pottery'));
  await fireEvent.press(screen.getByRole('radio', { name: /^Pro/ }));
  expect(screen.getByText("You're all set")).toBeOnTheScreen();
  expect(useOnboardingDraft.getState().levels).toEqual({ pottery: 'pro', sat: null, french: 'beginner' });

  await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
  await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/who-where'));
  expect(mockCalls).toContainEqual(['from', 'interests']);
});

test('Who & where saves the answers, marks onboarding done and opens Home (then Family for kids)', async () => {
  await render(wrap(<WhoWhere />));
  await fireEvent.press(screen.getByRole('radio', { name: /^Both/ }));
  await fireEvent.press(screen.getByRole('button', { name: 'Zamalek' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Female' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Show my picks' }));
  await waitFor(() => expect(mockRouter.replace).toHaveBeenCalledWith('/'));
  expect(mockRouter.push).toHaveBeenCalledWith('/family');
  const update = mockCalls.find((c) => c[0] === 'update')![1] as Record<string, unknown>;
  expect(update).toMatchObject({ who_for: 'both', area_id: 'zamalek', instructor_pref: 'female' });
  expect(update.onboarded_at).toEqual(expect.any(String));
});

test('Who & where: Skip still finishes onboarding, with nothing else set', async () => {
  await render(wrap(<WhoWhere />));
  await fireEvent.press(screen.getByRole('button', { name: 'Skip' }));
  await waitFor(() => expect(mockRouter.replace).toHaveBeenCalledWith('/'));
  expect(mockRouter.push).not.toHaveBeenCalled();
  expect(Object.keys(mockCalls.find((c) => c[0] === 'update')![1] as object)).toEqual(['onboarded_at']);
});
