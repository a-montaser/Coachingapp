import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import '@/i18n';
import Favourites from '@/app/favourites';
import { useSettings } from '@/theme/settings';
import { useToggleFavourite } from './favourites';

jest.mock('expo-router', () => ({ router: { push: jest.fn(), back: jest.fn() } }));
const mockRouter = jest.requireMock('expo-router').router;
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'me' } }, loading: false }),
}));
const mockWrite = { result: { error: null as null | { code: string } }, calls: [] as string[] };
jest.mock('./supabase', () => ({
  supabaseConfigured: true,
  supabase: {
    from: () => ({
      insert: async (row: { instructor_id: string }) => {
        mockWrite.calls.push(`insert ${row.instructor_id}`);
        return mockWrite.result;
      },
      delete: () => ({
        eq: async (_c: string, id: string) => {
          mockWrite.calls.push(`delete ${id}`);
          return mockWrite.result;
        },
      }),
    }),
  },
}));

const card = (id: string, name: string) => ({
  id,
  display_name: name,
  discipline_id: 'padel',
  discipline_en: 'Padel',
  discipline_ar: null,
  levels: 'Beginners',
  rating_avg: 4.9,
  rating_count: 128,
  area_en: 'Zamalek',
  area_ar: null,
});

// The screen reads favourites through a real query cache, filled by the test.
const clients: QueryClient[] = [];
afterEach(() => clients.splice(0).forEach((c) => c.clear()));
function withCache(ids: string[], cards: object[]) {
  // gcTime Infinity: no clean-up timers left running after the test (they kept Jest from exiting).
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity, gcTime: Infinity } },
  });
  clients.push(qc);
  qc.setQueryData(['favourites', 'me'], ids);
  qc.setQueryData(['favourite-cards', ids], cards);
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
  return { qc, Wrapper };
}

beforeEach(() => {
  useSettings.setState({ lang: 'en' });
  mockWrite.result = { error: null };
  mockWrite.calls = [];
  jest.clearAllMocks();
});

test('Favourites: empty state, then the cards; the heart removes one at once (R3.2)', async () => {
  const empty = withCache([], []);
  const view = await render(<Favourites />, { wrapper: empty.Wrapper });
  expect(screen.getByText('No favourites yet')).toBeOnTheScreen();
  await view.unmount();

  const { qc, Wrapper } = withCache(['nour'], [card('nour', 'Nour El-Sayed')]);
  await render(<Favourites />, { wrapper: Wrapper });
  await fireEvent.press(screen.getByRole('button', { name: /^Padel, Nour El-Sayed/ }));
  expect(mockRouter.push).toHaveBeenCalledWith({
    pathname: '/instructor/[id]',
    params: { id: 'nour', discipline: 'padel' },
  });
  await fireEvent.press(screen.getByRole('button', { name: 'Remove Nour El-Sayed from favourites' }));
  expect(mockWrite.calls).toEqual(['delete nour']);
  expect(qc.getQueryData(['favourites', 'me'])).toEqual([]);
  expect(screen.queryByText('Nour El-Sayed')).toBeNull();
});

test('the heart flips at once; a failed save flips it back and says so; a double add is fine (R3.1)', async () => {
  const { qc, Wrapper } = withCache(['nour'], []);
  const onError = jest.fn();
  const { result } = await renderHook(() => useToggleFavourite('me', onError), { wrapper: Wrapper });

  mockWrite.result = { error: { code: '42501' } };
  await act(() => result.current('yasmine', true));
  expect(qc.getQueryData(['favourites', 'me'])).toEqual(['nour']);
  expect(onError).toHaveBeenCalledTimes(1);

  mockWrite.result = { error: { code: '23505' } };
  await act(() => result.current('yasmine', true));
  expect(qc.getQueryData(['favourites', 'me'])).toEqual(['yasmine', 'nour']);
  expect(onError).toHaveBeenCalledTimes(1);
});
