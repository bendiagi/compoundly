import data from '@/data/investments.json';
import { countries, getCountryByCode } from '@/lib/countries';

type InvestmentRecord = {
  fund: string;
  rate: string; // e.g., "23%"
  currency: string; // e.g., "NGN"
};

type InvestmentsByCountry = Record<string, InvestmentRecord[]>; // keyed by country name in JSON

const nameToCodeMap: Record<string, string> = {
  'nigeria': 'NG',
  'kenya': 'KE',
  'south africa': 'ZA',
  'ghana': 'GH',
  'egypt': 'EG',
};

const codeToNameMap: Record<string, string> = {
  NG: 'Nigeria',
  KE: 'Kenya',
  ZA: 'South Africa',
  GH: 'Ghana',
  EG: 'Egypt',
};

export type InvestmentOption = {
  name: string; // fund name
  rate: number; // numeric percent
  flag?: string;
};

function normalizeKey(key: string): string {
  return key.normalize('NFKC').trim().toLowerCase();
}

function getCountryRecords(json: InvestmentsByCountry, countryName: string): InvestmentRecord[] {
  // Try direct hit first
  const direct = json[countryName];
  if (direct) return direct;
  // Fallback: scan keys case/whitespace-insensitively
  const target = normalizeKey(countryName);
  const entry = Object.entries(json).find(([k]) => normalizeKey(k) === target);
  return entry ? entry[1] : [];
}

function parseRateToNumber(rateStr: string): number | null {
  const m = rateStr.match(/(\d+(?:\.\d+)?)%/);
  if (!m) return null;
  return Math.round(Number(m[1]));
}

export function getInvestmentOptions(params: {
  countryCode: string | null; // 'ALL' or ISO alpha-2
  currencyCode: 'USD' | 'NGN' | 'KES' | 'ZAR' | 'GHS' | 'EGP';
}): InvestmentOption[] {
  const { countryCode, currencyCode } = params;
  const json = data as unknown as InvestmentsByCountry;
  if (process.env.NODE_ENV !== 'production') {
    console.log('[investments] request', { countryCode, currencyCode });
  }

  const buildForCountry = (countryName: string): InvestmentOption[] => {
    const list = getCountryRecords(json, countryName);
    const code = nameToCodeMap[countryName.toLowerCase()];
    const flag = getCountryByCode(code ?? undefined)?.flag;
    const filtered = list
      .filter((rec) => (rec.currency || '').toString().trim().toUpperCase() === currencyCode.toUpperCase())
    if (process.env.NODE_ENV !== 'production') {
      console.log('[investments] country filter', {
        countryName,
        total: list.length,
        matched: filtered.length,
        sample: filtered.slice(0, 3),
        sampleCurrencies: list.slice(0, 5).map((r) => (r.currency || '').toString().trim().toUpperCase()),
      });
    }
    return filtered.map((rec) => ({
        name: rec.fund,
        rate: parseRateToNumber(rec.rate) ?? 0,
        flag,
      }));
  };

  if (!countryCode || countryCode === 'ALL') {
    // Flatten across supported countries, grouped earlier order
    const ordered = ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt'];
    const result = ordered.flatMap((name) => buildForCountry(name));
    if (process.env.NODE_ENV !== 'production') {
      console.log('[investments] ALL result count', result.length);
    }
    return result;
  }

  // Map code back to JSON country name
  const name = codeToNameMap[countryCode] ??
    Object.keys(json).find((n) => (nameToCodeMap[n.toLowerCase()] ?? '') === countryCode) ??
    null;
  if (!name) return [];
  const result = buildForCountry(name);
  if (process.env.NODE_ENV !== 'production') {
    console.log('[investments] single result count', { name, count: result.length });
  }
  return result;
}


