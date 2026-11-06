import type { Lang } from './index';

// §1, §7.15: Arabic uses Arabic-Indic digits, ٫ decimals, ج.م and كم.
const locale = (lang: Lang) => (lang === 'ar' ? 'ar-EG' : 'en-GB');

export const formatNumber = (n: number, lang: Lang) =>
  new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 1 }).format(n);

export const formatPrice = (egp: number, lang: Lang) =>
  lang === 'ar' ? `${formatNumber(egp, lang)} ج.م` : `${formatNumber(egp, lang)} EGP`;

export const formatTime = (hours: number, minutes: number, lang: Lang) => {
  const two = new Intl.NumberFormat(locale(lang), { minimumIntegerDigits: 2, useGrouping: false });
  return `${two.format(hours)}:${two.format(minutes)}`;
};

export const formatDistance = (km: number, lang: Lang) =>
  lang === 'ar' ? `${formatNumber(km, lang)} كم` : `${formatNumber(km, lang)} km`;

// All dates are shown in Cairo time regardless of the device zone (§1: Egypt only).
const dateFormat = (lang: Lang, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale(lang), { timeZone: 'Africa/Cairo', ...options });

export const formatWeekday = (date: Date, lang: Lang, width: 'short' | 'long' = 'short') =>
  dateFormat(lang, { weekday: width }).format(date);
export const formatDayOfMonth = (date: Date, lang: Lang) => dateFormat(lang, { day: 'numeric' }).format(date);
export const formatMonth = (date: Date, lang: Lang, width: 'short' | 'long' = 'short') =>
  dateFormat(lang, { month: width }).format(date);
export const formatFullDate = (date: Date, lang: Lang) =>
  dateFormat(lang, { weekday: 'long', day: 'numeric', month: 'long' }).format(date);

/** True when both instants fall on the same calendar day in Cairo. */
export const isSameCairoDay = (a: Date, b: Date) => {
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' });
  return day.format(a) === day.format(b);
};

export const formatMonthYear = (date: Date, lang: Lang) =>
  dateFormat(lang, { month: 'long', year: 'numeric' }).format(date);

export const formatYear = (date: Date, lang: Lang) => dateFormat(lang, { year: 'numeric' }).format(date);
export const formatDayMonth = (date: Date, lang: Lang) =>
  dateFormat(lang, { day: 'numeric', month: 'short' }).format(date);
/** "17:30" for an instant, in Cairo time (24-hour, §1). */
export const formatClock = (date: Date, lang: Lang) =>
  dateFormat(lang, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
