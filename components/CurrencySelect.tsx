'use client';

import React from 'react';
import { getCurrencySymbol } from '@/lib/countries';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

type CurrencyCode = 'USD' | 'NGN' | 'KES' | 'ZAR' | 'GHS' | 'EGP';

interface Props {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
  className?: string;
}

const allCurrencies: CurrencyCode[] = ['USD', 'NGN', 'KES', 'ZAR', 'GHS', 'EGP'];

const CurrencySelect: React.FC<Props> = ({ value, onChange, className }) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as CurrencyCode)}>
      <SelectTrigger className={`rounded-lg px-3 py-2 bg-[#222821] border border-[#33532A] text-white focus:border-[#BDE681] focus:ring-1 focus:ring-[#BDE681] transition-colors duration-200 ${className || ''}`}>
        <SelectValue placeholder="Select currency">
          {getCurrencySymbol(value)} {value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#2A3326] border-[#33532A] text-white">
        {allCurrencies.map((code) => (
          <SelectItem 
            key={code} 
            value={code}
            className="text-white hover:!bg-[#3A4C37] data-[selected=true]:!bg-[#3A4C37] focus:!bg-[#3A4C37]"
          >
            {getCurrencySymbol(code)} {code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;

