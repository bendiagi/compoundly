export type Country = {
  code: string; // ISO 3166-1 alpha-2 or special 'ALL'
  name: string;
  flag: string; // emoji
  currencyCode?: 'NGN' | 'KES' | 'ZAR' | 'GHS' | 'EGP';
  currencySymbol?: string; // ₦, KSh, R, GH₵, E£
};

// Supported list (ordered)
export const countries: Country[] = [
  { code: 'ALL', name: 'All', flag: '🌍' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currencyCode: 'NGN', currencySymbol: '₦' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currencyCode: 'KES', currencySymbol: 'KSh' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currencyCode: 'ZAR', currencySymbol: 'R' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currencyCode: 'GHS', currencySymbol: 'GH₵' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currencyCode: 'EGP', currencySymbol: 'E£' },
];

export function getCountryByCode(code?: string) {
  if (!code) return undefined;
  const upper = code.toUpperCase();
  return countries.find((c) => c.code === upper);
}

export function getCurrencySymbol(code: string): string {
  const upper = code.toUpperCase();
  if (upper === 'USD') return '$';
  const match = countries.find((c) => c.currencyCode === upper);
  return match?.currencySymbol ?? upper;
}


