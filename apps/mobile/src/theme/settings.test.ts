import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n';
import { useSettings } from './settings';

test('theme, category and language persist; dev overrides do not (R3.2)', async () => {
  useSettings.getState().setTheme('dark');
  useSettings.getState().setCategory('languages');
  useSettings.getState().setDevForce('reduceMotion', true);
  const saved = JSON.parse((await AsyncStorage.getItem('cfa-settings')) ?? '{}');
  expect(saved.state).toEqual({ theme: 'dark', category: 'languages', lang: 'en' });
});

test('saved Arabic loads at launch and switches i18next with it', async () => {
  await AsyncStorage.setItem(
    'cfa-settings',
    JSON.stringify({ state: { theme: 'light', category: 'sports', lang: 'ar' }, version: 1 }),
  );
  await useSettings.persist.rehydrate();
  expect(useSettings.getState().category).toBe('sports');
  expect(i18n.language).toBe('ar');
  useSettings.getState().setLang('en');
});
