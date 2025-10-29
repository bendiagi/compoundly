export type Country = {
  code: string; // ISO 3166-1 alpha-2 or special 'ALL'
  name: string;
  flag: string; // emoji
};

// Supported list (ordered)
export const countries: Country[] = [
  { code: 'ALL', name: 'All', flag: '🌍' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
];

export function getCountryByCode(code?: string) {
  if (!code) return undefined;
  const upper = code.toUpperCase();
  return countries.find((c) => c.code === upper);
}


