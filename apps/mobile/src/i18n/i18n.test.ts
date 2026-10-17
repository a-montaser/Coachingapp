import { formatDistance, formatNumber, formatPrice, formatTime } from './format';
import i18n, { missingArabicKeys } from './index';

test('Arabic uses Arabic-Indic digits, ٫ decimals, ج.م and كم (§7.15)', () => {
  expect(formatPrice(390, 'ar')).toBe('٣٩٠ ج.م');
  expect(formatTime(17, 30, 'ar')).toBe('١٧:٣٠');
  expect(formatDistance(2.4, 'ar')).toBe('٢٫٤ كم');
});

test('English uses Latin digits and EGP', () => {
  expect(formatPrice(390, 'en')).toBe('390 EGP');
  expect(formatPrice(1200, 'en')).toBe('1,200 EGP');
  expect(formatTime(9, 5, 'en')).toBe('09:05');
  expect(formatNumber(2.4, 'en')).toBe('2.4');
});

test('Arabic falls back to English for keys without approved Arabic', async () => {
  await i18n.changeLanguage('ar');
  expect(i18n.t('tabs.home')).toBe('الرئيسية');
  expect(i18n.t('category.trayTitle')).toBe('Browse by');
  expect(missingArabicKeys()).toContain('category.trayTitle');
  expect(missingArabicKeys()).not.toContain('tabs.home');
  await i18n.changeLanguage('en');
});
