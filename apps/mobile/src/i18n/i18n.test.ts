import {
  formatDayOfMonth,
  formatDistance,
  formatNumber,
  formatPrice,
  formatTime,
  formatWeekday,
} from './format';
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
  // Arabic prices drop "From" (owner, D25).
  expect(i18n.t('card.from', { price: '٣٩٠ ج.م' })).toBe('٣٩٠ ج.م');
  await i18n.changeLanguage('en');
});

test('dates use Cairo time and Arabic day names (§7.15)', () => {
  const sat = new Date('2026-10-17T09:00:00Z'); // Sat 17 Oct, 11:00 in Cairo
  expect(formatWeekday(sat, 'en')).toBe('Sat');
  expect(formatDayOfMonth(sat, 'ar')).toBe('١٧');
  expect(formatWeekday(sat, 'ar', 'long')).toBe('السبت');
  expect(formatWeekday(new Date('2026-10-17T22:30:00Z'), 'en')).toBe('Sun'); // already Sunday in Cairo
});
