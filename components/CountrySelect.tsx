'use client';

import React, { useEffect } from 'react';
import { countries, getCountryByCode } from '@/lib/countries';
import { useLocationStore, useEffectiveCountryCode } from '@/lib/store/location';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface Props {
  className?: string;
}

const CountrySelect: React.FC<Props> = ({ className }) => {
  const effective = useEffectiveCountryCode();
  const detected = useLocationStore((s) => s.detectedCountryCode);
  const selected = useLocationStore((s) => s.selectedCountryCode);
  const isLoading = useLocationStore((s) => s.isLoading);
  const detectFromIP = useLocationStore((s) => s.detectFromIP);
  const setSelected = useLocationStore((s) => s.setSelectedCountryCode);

  useEffect(() => {
    if (detected == null) {
      detectFromIP();
    }
  }, [detected, detectFromIP]);

  const current = getCountryByCode(effective || 'ALL') || getCountryByCode('ALL');

  return (
    <Select
      value={(selected ?? detected ?? current?.code) || 'ALL'}
      onValueChange={(code) => setSelected(code)}
    >
      <SelectTrigger className={`rounded-lg px-3 py-2 bg-[#222821] border border-[#33532A] text-white focus:border-[#BDE681] focus:ring-1 focus:ring-[#BDE681] transition-colors duration-200 ${className || ''}`}>
        <SelectValue placeholder={isLoading ? 'Detecting…' : 'Select country'}>
          {current ? `${current.flag} ${current.name}` : 'Select country'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.flag} {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;


