import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { within, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import '@/i18n';
import Categories from '@/app/(onboarding)/categories';
import Interests from '@/app/(onboarding)/interests';
import Levels from '@/app/(onboarding)/levels';
import WhoWhere from '@/app/(onboarding)/who-where';
import Welcome from '@/app/(auth)/welcome';
import {
  nearestArea,
  saveInterests,
  useApplyDraftAfterSignUp,
  useOnboardingDraft,
  type Area,
} from './onboarding';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn(), dismissTo: jest.fn() },
  useLocalSearchParams: jest.fn(() => ({})),
}));
jest.mock('expo-location', () => ({}));
const mockRouter = jest.requireMock('expo-router').router;

// A tiny stand-in for the Supabase query builder: records each call, resolves with no error.
const mockCalls: unknown[][] = [];
let mockUserId: string | undefined = 'u1';
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
  useSession: () => ({ session: mockUserId ? { user: { id: mockUserId } } : null, loading: false }),
}));
let mockSaved: { discipline_id: string; level: string | null }[] = [];
jest.mock('./account', () => ({ useInterests: () => ({ data: mockSaved }) }));

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
  mockUserId = 'u1';
  mockSaved = [];
  useOnboardingDraft.getState().reset();
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

test('Categories: the four categories as their own list; Continue once at least one is picked (D35)', async () => {
  await render(wrap(<Categories />));
  expect(screen.getByRole('checkbox', { name: /^Hobbies/ })).toBeOnTheScreen();
  expect(screen.getByText('Pottery, Oud')).toBeOnTheScreen(); // what the category holds
  expect(screen.getByRole('button', { name: 'Pick at least one' })).toBeDisabled();
  await fireEvent.press(screen.getByRole('checkbox', { name: /^Hobbies/ }));
  await fireEvent.press(screen.getByRole('checkbox', { name: /^Languages/ }));
  expect(screen.getByRole('checkbox', { name: /^Languages/ })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: /^Sports/ })).not.toBeChecked();
  await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
  expect(useOnboardingDraft.getState().categories).toEqual(['hobbies', 'languages']);
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/interests', params: {} });
});

test('Categories from Profile start from the categories of the saved picks', async () => {
  mockSaved = [{ discipline_id: 'padel', level: 'pro' }];
  await render(wrap(<Categories />));
  expect(screen.getByRole('checkbox', { name: /^Sports/ })).toBeChecked();
  expect(useOnboardingDraft.getState()).toMatchObject({ picks: ['padel'], levels: { padel: 'pro' } });
});

test('Interests shows only the picked categories; dropped categories lose their picks', async () => {
  useOnboardingDraft.setState({ categories: ['hobbies', 'languages'], picks: ['padel'] });
  await render(wrap(<Interests />));
  expect(screen.getByRole('header', { name: 'Hobbies' })).toBeOnTheScreen();
  expect(screen.queryByRole('header', { name: 'Sports' })).toBeNull();
  expect(screen.queryByRole('checkbox', { name: 'Padel' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Pick at least one' })).toBeDisabled();
  await fireEvent.press(screen.getByRole('checkbox', { name: 'Pottery' }));
  await fireEvent.press(screen.getByRole('checkbox', { name: 'French' }));
  expect(screen.getByRole('checkbox', { name: 'Pottery' })).toBeChecked();
  expect(screen.getAllByText('1 picked')).toHaveLength(2);
  await fireEvent.press(screen.getByRole('button', { name: 'Continue · 2 picked' }));
  expect(useOnboardingDraft.getState().picks).toEqual(['pottery', 'french']);
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/levels', params: {} });
});

test('Levels on one page: a level per pick, a second tap clears it, Continue saves and opens step 3', async () => {
  useOnboardingDraft.setState({ picks: ['pottery', 'sat', 'french'] });
  await render(wrap(<Levels />));
  expect(screen.getByRole('header', { name: 'How experienced are you?' })).toBeOnTheScreen();
  for (const name of ['Pottery', 'SAT', 'French']) expect(screen.getByText(name)).toBeOnTheScreen();
  const pottery = within(screen.getByLabelText('Pottery'));
  await fireEvent.press(pottery.getByRole('radio', { name: /^Intermediate/ }));
  await fireEvent.press(pottery.getByRole('radio', { name: /^Pro/ }));
  await fireEvent.press(within(screen.getByLabelText('French')).getByRole('radio', { name: /^Beginner/ }));
  const sat = within(screen.getByLabelText('SAT'));
  await fireEvent.press(sat.getByRole('radio', { name: /^Advanced/ }));
  await fireEvent.press(sat.getByRole('radio', { name: /^Advanced/ })); // tapping again clears it
  expect(useOnboardingDraft.getState().levels).toEqual({ pottery: 'pro', sat: null, french: 'beginner' });

  await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
  await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/who-where'));
  expect(mockCalls).toContainEqual(['from', 'interests']);
});

test('Levels: Skip skips them all at once and moves on', async () => {
  useOnboardingDraft.setState({ picks: ['pottery', 'sat'] });
  await render(wrap(<Levels />));
  await fireEvent.press(screen.getByRole('button', { name: 'Skip' }));
  await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/who-where'));
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

describe('onboarding before sign-up (D34)', () => {
  beforeEach(() => {
    mockUserId = undefined;
  });

  test('Welcome: Get started opens the categories; Sign in goes straight to the phone number', async () => {
    await render(wrap(<Welcome />));
    await fireEvent.press(screen.getByRole('button', { name: 'Get started' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/categories');
    await fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/sign-up');
  });

  test('signed out, Levels and Who & where save nothing and end on Sign up with the answers kept', async () => {
    useOnboardingDraft.setState({ picks: ['oud'] });
    const levels = await render(wrap(<Levels />));
    await fireEvent.press(screen.getByRole('radio', { name: /^Beginner/ }));
    await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/who-where');
    await levels.unmount();

    await render(wrap(<WhoWhere />));
    await fireEvent.press(screen.getByRole('radio', { name: /^Me/ }));
    await fireEvent.press(screen.getByRole('button', { name: 'Show my picks' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/sign-up');
    expect(mockCalls).toEqual([]);
    expect(useOnboardingDraft.getState()).toMatchObject({
      completed: true,
      picks: ['oud'],
      levels: { oud: 'beginner' },
      answers: { who_for: 'me', instructor_pref: 'none' },
    });
  });

  test('after the code, the gate writes the kept answers to the new account, then clears them', async () => {
    useOnboardingDraft.setState({ picks: ['oud'], levels: { oud: 'beginner' } });
    useOnboardingDraft.getState().complete({ who_for: 'me' });
    const profile = { onboarded_at: null } as never;
    const seen: boolean[] = [];
    await renderHook(() => seen.push(useApplyDraftAfterSignUp('u2', profile)), {
      wrapper: ({ children }) => wrap(children),
    });
    await waitFor(() => expect(useOnboardingDraft.getState().completed).toBe(false));
    expect(seen[0]).toBe(true); // the gate shows nothing until the answers are saved
    const upsert = mockCalls.find((c) => c[0] === 'upsert')![1] as {
      user_id: string;
      discipline_id: string;
    }[];
    expect(upsert).toMatchObject([{ user_id: 'u2', discipline_id: 'oud', level: 'beginner' }]);
    expect(mockCalls.find((c) => c[0] === 'update')![1]).toMatchObject({ who_for: 'me' });
  });

  test('a returning, already onboarded account ignores answers kept from a new run', async () => {
    useOnboardingDraft.getState().complete({});
    const { result } = await renderHook(
      () => useApplyDraftAfterSignUp('u1', { onboarded_at: 'x' } as never),
      {
        wrapper: ({ children }) => wrap(children),
      },
    );
    expect(result.current).toBe(false);
    expect(mockCalls).toEqual([]);
  });
});
