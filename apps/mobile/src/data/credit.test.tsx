import { render, screen } from '@testing-library/react-native';
import '@/i18n';
import CreditHistory from '@/app/credit';
import { useSettings } from '@/theme/settings';
import type { CreditLine } from './checkout';

jest.mock('expo-router', () => ({ router: { back: jest.fn() } }));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  useSession: () => ({ session: { user: { id: 'me' } }, loading: false }),
}));
let mockLines: CreditLine[] = [];
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: ({ queryKey }: { queryKey: string[] }) => ({
    data: queryKey[0] === 'credit' ? 1500 : mockLines,
    isLoading: false,
  }),
}));

const DAY = 86_400_000;
const line = (extra: Partial<CreditLine>): CreditLine => ({
  kind: 'grant',
  source: 'refund',
  amount_egp: 1300,
  remaining_egp: 1300,
  expires_at: null,
  at: new Date().toISOString(),
  ref: 'CFA-12345',
  ...extra,
});

beforeEach(() => useSettings.setState({ lang: 'en' }));

test('App credit: balance, then refunds, other credit with its expiry, and what credit paid for (R7)', async () => {
  mockLines = [
    line({ kind: 'spend', source: null, amount_egp: 540, remaining_egp: null, ref: 'CFA-67890' }),
    line({}),
    line({
      source: 'goodwill',
      amount_egp: 200,
      ref: null,
      expires_at: new Date(Date.now() + 30 * DAY).toISOString(),
    }),
    line({
      source: 'promo',
      amount_egp: 100,
      ref: null,
      expires_at: new Date(Date.now() - DAY).toISOString(),
    }),
  ];
  await render(<CreditHistory />);
  expect(screen.getByText('1,500 EGP')).toBeOnTheScreen();
  expect(screen.getByText('Used on CFA-67890')).toBeOnTheScreen();
  expect(screen.getByText('−540 EGP')).toBeOnTheScreen();
  expect(screen.getByText('Refund for CFA-12345')).toBeOnTheScreen();
  expect(screen.getByText('Never expires')).toBeOnTheScreen();
  expect(screen.getByText('+1,300 EGP')).toBeOnTheScreen();
  expect(screen.getByText('Goodwill credit')).toBeOnTheScreen();
  expect(screen.getByText(/^Expires \d+ \w+$/)).toBeOnTheScreen();
  expect(screen.getByText('Expired')).toBeOnTheScreen();
});

test('App credit: nothing yet says so', async () => {
  mockLines = [];
  await render(<CreditHistory />);
  expect(screen.getByText('No app credit yet')).toBeOnTheScreen();
});
