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
