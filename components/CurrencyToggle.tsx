import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { getCurrencySymbol } from '@/lib/countries';

type CurrencyCode = 'USD' | 'NGN' | 'KES' | 'ZAR' | 'GHS' | 'EGP';

interface Props {
  value: CurrencyCode;
  options: CurrencyCode[]; // exactly two: ['USD', local]
  onChange: (value: CurrencyCode) => void;
}

const CurrencyToggle: React.FC<Props> = ({ value, options, onChange }) => {
  return (
    <div className="flex gap-2">
      {options.map((code) => (
        <Toggle
          key={code}
          pressed={value === code}
          onPressedChange={() => onChange(code)}
          className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
        >
          {getCurrencySymbol(code)}
        </Toggle>
      ))}
    </div>
  );
};

export default CurrencyToggle; 