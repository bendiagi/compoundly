import React from 'react';
import { Toggle } from '@/components/ui/toggle';

interface Props {
  value: 'USD' | 'NGN';
  onChange: (value: 'USD' | 'NGN') => void;
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