import React from 'react';
import { Toggle } from '@/components/ui/toggle';

interface Props {
  value: 'USD' | 'NGN' | 'EUR' | 'GBP';
  onChange: (value: 'USD' | 'NGN' | 'EUR' | 'GBP') => void;
}

const CurrencyToggle: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      <Toggle
        pressed={value === 'USD'}
        onPressedChange={() => onChange('USD')}
        className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
      >
        $
      </Toggle>
      <Toggle
        pressed={value === 'EUR'}
        onPressedChange={() => onChange('EUR')}
        className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
      >
        €
      </Toggle>
      <Toggle
        pressed={value === 'GBP'}
        onPressedChange={() => onChange('GBP')}
        className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
      >
        £
      </Toggle>
      <Toggle
        pressed={value === 'NGN'}
        onPressedChange={() => onChange('NGN')}
        className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
      >
        ₦
      </Toggle>
    </div>
  );
};

export default CurrencyToggle; 