import { dark, light } from '@cfa/tokens';
import { renderHook } from '@testing-library/react-native';
import { act } from 'react';
import { mergeA11y } from './useA11y';
import { useSettings } from './settings';
import { resolveScheme, useTheme } from './useTheme';

const off = { reduceTransparency: false, increaseContrast: false, reduceMotion: false };

test('resolveScheme follows the system only when set to System', () => {
  expect(resolveScheme('system', 'dark')).toBe('dark');
  expect(resolveScheme('system', null)).toBe('light');
  expect(resolveScheme('light', 'dark')).toBe('light');
  expect(resolveScheme('dark', 'light')).toBe('dark');
});

test('useTheme returns the dark palette when overridden to Dark', async () => {
  const { result } = await renderHook(() => useTheme());
  expect(result.current.c).toBe(light);
  await act(async () => useSettings.getState().setTheme('dark'));
  expect(result.current.c).toBe(dark);
  expect(result.current.scheme).toBe('dark');
});

test('dev overrides force a fallback on but never turn a system setting off', () => {
  expect(mergeA11y(off, { ...off, reduceMotion: true }).reduceMotion).toBe(true);
  expect(mergeA11y({ ...off, reduceTransparency: true }, off).reduceTransparency).toBe(true);
  expect(mergeA11y(off, off)).toEqual(off);
});
