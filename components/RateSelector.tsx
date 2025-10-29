import React, { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Option {
  name: string;
  rate: number;
  flag?: string;
}

interface Props {
  value: number;
  onChange: (val: number) => void;
  options: Option[];
}

const RateSelector: React.FC<Props> = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const [customRate, setCustomRate] = useState(value.toString());
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const handleCustomRateChange = (newRate: string) => {
    setCustomRate(newRate);
    const numRate = Number(newRate);
    if (!isNaN(numRate) && numRate >= 0) {
      onChange(numRate);
    }
    // custom numeric input means no discrete option is selected
    setSelectedName(null);
  };

  const handleOptionSelect = (option: Option) => {
    onChange(option.rate);
    setCustomRate(option.rate.toString());
    setSelectedName(option.name);
    setOpen(false);
  };

  const selectedOption = selectedName
    ? options.find((opt) => opt.name === selectedName)
    : options.find((opt) => opt.rate === value);

  return (
    <div className="flex flex-row gap-4 items-end">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-64 lg:w-72 justify-between bg-[#222821] border-[#33532A] text-white hover:bg-[#222821]/90 overflow-hidden"
            >
              <span className="truncate">
                {selectedOption ? `${selectedOption.name} (${selectedOption.rate}%)` : 'Select rate...'}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 lg:w-72 p-0 bg-[#2A3326] border-[#33532A]">
            <Command className="text-left bg-[#2A3326] text-white">
              <CommandInput placeholder="Search rates..." className="text-white placeholder:text-gray-400 bg-[#2A3326]" />
              <CommandList className="bg-[#2A3326]">
                <CommandEmpty>No rate found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.name}
                      value={option.name}
                      onSelect={() => handleOptionSelect(option)}
                      className={`text-white text-left justify-start hover:!bg-[#3A4C37] data-[selected=true]:!bg-[#3A4C37] ${
                        selectedName === option.name ? 'bg-[#31402F]' : ''
                      }`}
                    >
                      <span className="mr-2">{option.flag ?? ''}</span>
                      {option.name} ({option.rate}%)
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex gap-2 items-center flex-1">
        <Label className="text-sm text-gray-300 whitespace-nowrap">Custom:</Label>
        <Input
          type="number"
          step="0.01"
          className="w-24 bg-[#222821] border-[#33532A] text-white placeholder:text-gray-400 focus:border-[#BDE681] focus:ring-1 focus:ring-[#BDE681]"
          value={customRate}
          onChange={(e) => handleCustomRateChange(e.target.value)}
          placeholder="Custom"
          min={0}
        />
        <span className="text-gray-300">%</span>
      </div>
    </div>
  );
};

export default RateSelector; 