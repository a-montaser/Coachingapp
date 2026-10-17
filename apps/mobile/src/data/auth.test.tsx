import { act, fireEvent, render, screen } from '@testing-library/react-native';
import '@/i18n';
import SignUp from '@/app/(auth)/sign-up';
import Verify from '@/app/(auth)/verify';
import Messages from '@/app/(tabs)/messages';
import { authErrorKey, formatEgMobile, isValidEgMobile } from './auth';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: () => ({ phone: '1002345678' }),
}));
const mockRouter = jest.requireMock('expo-router').router;
const mockSend = jest.fn();
const mockVerify = jest.fn();
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  sendCode: (...a: unknown[]) => mockSend(...a),
  verifyCode: (...a: unknown[]) => mockVerify(...a),
}));
jest.mock('./supabase', () => ({ supabaseConfigured: true, supabase: {} }));

beforeEach(() => jest.clearAllMocks());

test('Egyptian mobile: exactly 10 digits after +20, shown as 100 234 5678 (§7.2)', () => {
  expect(isValidEgMobile('1002345678')).toBe(true);
  expect(isValidEgMobile('100234567')).toBe(false);
  expect(isValidEgMobile('10023456789')).toBe(false);
  expect(formatEgMobile('1002345678')).toBe('100 234 5678');
  expect(formatEgMobile('100 2a3')).toBe('100 23');
});

test('auth errors map to our copy', () => {
  expect(authErrorKey({ message: 'Token has expired or is invalid' })).toBe('auth.wrongCode');
  expect(authErrorKey({ status: 429, message: 'For security purposes…' })).toBe('auth.tooMany');
  expect(authErrorKey({ message: 'network' })).toBe('auth.genericError');
  expect(authErrorKey(null)).toBeNull();
});

test('Sign up shows the inline error for a short number and does not send', async () => {
  await render(<SignUp />);
  await fireEvent.changeText(screen.getByLabelText('Phone number'), '100 234');
  await fireEvent.press(screen.getByRole('button', { name: 'Send code' }));
  expect(screen.getByText('Enter the 10 digits after +20, like 100 234 5678.')).toBeOnTheScreen();
  expect(mockSend).not.toHaveBeenCalled();
});

test('Sign up sends the code and opens Verify', async () => {
  mockSend.mockResolvedValue({ error: null });
  await render(<SignUp />);
  await fireEvent.changeText(screen.getByLabelText('Phone number'), '1002345678');
  await fireEvent.press(screen.getByRole('button', { name: 'Send code' }));
  expect(mockSend).toHaveBeenCalledWith('1002345678');
  expect(mockRouter.push).toHaveBeenCalledWith({ pathname: '/verify', params: { phone: '1002345678' } });
});

test('Verify auto-submits at 6 digits; a wrong code clears the boxes with an error', async () => {
  mockVerify.mockResolvedValue({ error: { message: 'Token has expired or is invalid' } });
  await render(<Verify />);
  expect(screen.getByText('Sent to +20 100 234 5678')).toBeOnTheScreen();
  await act(async () => fireEvent.changeText(screen.getByTestId('otp-input'), '123456'));
  expect(mockVerify).toHaveBeenCalledWith('1002345678', '123456');
  expect(screen.getByText("That code isn't right. Try again.")).toBeOnTheScreen();
  expect(screen.getByTestId('otp-input').props.value).toBe('');
});

test('a right code hands over to the journey gate', async () => {
  mockVerify.mockResolvedValue({ error: null });
  await render(<Verify />);
  await act(async () => fireEvent.changeText(screen.getByTestId('otp-input'), '482917'));
  expect(mockRouter.replace).toHaveBeenCalledWith('/');
});

test('Messages tab explains that chat comes after booking (R3.6)', async () => {
  await render(<Messages />);
  expect(screen.getByRole('header', { name: 'No messages yet' })).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Explore' }));
  expect(mockRouter.navigate).toHaveBeenCalledWith('/explore');
});
