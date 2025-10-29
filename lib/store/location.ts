'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCountryByCode } from '@/lib/countries';

type LocationState = {
  detectedCountryCode: string | null;
  selectedCountryCode: string | null; // user override
  isLoading: boolean;
  error: string | null;
  detectFromIP: () => Promise<void>;
  setSelectedCountryCode: (code: string | null) => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      detectedCountryCode: null,
      selectedCountryCode: null,
      isLoading: false,
      error: null,
      detectFromIP: async () => {
        try {
          set({ isLoading: true, error: null });
          const res = await fetch('/api/geo', { cache: 'no-store' });
          const data = await res.json();
          const code = data?.countryCode ?? null;
          // Validate code exists in our supported list; fallback to ALL
          const valid = getCountryByCode(code)?.code ?? 'ALL';
          set({ detectedCountryCode: valid, isLoading: false });
        } catch (e) {
          set({ isLoading: false, error: 'Failed to detect location', detectedCountryCode: 'ALL' });
        }
      },
      setSelectedCountryCode: (code) => set({ selectedCountryCode: code }),
    }),
    {
      name: 'location-store',
      partialize: (state) => ({ selectedCountryCode: state.selectedCountryCode }),
    }
  )
);

export function useEffectiveCountryCode(): string | null {
  const { detectedCountryCode, selectedCountryCode } = useLocationStore();
  return selectedCountryCode ?? detectedCountryCode ?? null;
}


