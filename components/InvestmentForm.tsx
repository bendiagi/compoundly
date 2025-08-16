'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import CurrencyToggle from '@/components/CurrencyToggle';
import RateSelector from '@/components/RateSelector';
import { calculateCompoundReturns, ProjectionPoint } from '@/lib/calculateCompoundReturns';
import { useEffect, useCallback, useRef, useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const rates = [
  { name: 'S&P 500', rate: 10 },
  { name: 'Crypto Index', rate: 20 },
  { name: 'Fixed Deposit', rate: 8 },
];

const schema = z.object({
  currency: z.enum(['NGN', 'USD']),
  initial: z.coerce.number().min(1, 'Required'),
  recurring: z.coerce.number().min(0).optional(),
  recurringFrequency: z.enum(['weekly', 'monthly']),
  interestRate: z.coerce.number().min(0.01, 'Required'),
  compoundingFrequency: z.enum(['monthly', 'quarterly', 'annually']),
  age: z.coerce.number().min(1, 'Required').max(100, 'Maximum 100 years'),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  currency: 'USD',
  initial: 5000,
  recurring: 100,
  recurringFrequency: 'monthly',
  interestRate: 12,
  compoundingFrequency: 'monthly',
  age: 5,
};

interface Props {
  onCalculate: (result: ProjectionPoint[], form: FormValues) => void;
}

const InvestmentForm: React.FC<Props> = ({ onCalculate }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const isInitialMount = useRef(true);
  const [isCalculating, setIsCalculating] = useState(false);

  // Watch individual form fields for automatic calculation
  const watchedValues = watch();

  // Memoize the calculation function to prevent unnecessary re-renders
  const calculateResults = useCallback(() => {
    // Get current form values
    const currentValues = getValues();
    
    // Validate inputs before calculation
    const validInitial = currentValues.initial;
    const validRecurring = currentValues.recurring || 0;
    const validInterestRate = currentValues.interestRate;
    const validAge = currentValues.age;
    
    // Skip calculation if inputs are invalid or missing
    if (!validInitial || validInitial <= 0 || !validInterestRate || validInterestRate <= 0 || !validAge || validAge <= 0) {
      console.warn('Skipping calculation due to invalid inputs:', {
        initial: validInitial,
        interestRate: validInterestRate,
        age: validAge
      });
      return;
    }
    
    setIsCalculating(true);
    
    try {
      const result = calculateCompoundReturns({
        initial: validInitial,
        recurring: validRecurring,
        recurringFrequency: currentValues.recurringFrequency,
        interestRate: validInterestRate,
        compoundingFrequency: currentValues.compoundingFrequency,
        years: validAge,
      });
      
      // Only call onCalculate if we have valid results
      if (result && result.length > 0) {
        const formData = {
          ...currentValues,
          recurring: validRecurring,
        };
        
        onCalculate(result, formData);
      }
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  }, [getValues, onCalculate]);

  // Automatically calculate whenever any field changes
  useEffect(() => {
    // Skip the first render to prevent infinite loops
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Add a small delay to ensure form values are properly updated
    const timeoutId = setTimeout(() => {
      calculateResults();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [watchedValues, calculateResults]);

  const currency = watch('currency');

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="text-sm font-medium mb-2 text-gray-300">Choose currency</Label>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
              <p>Choose your preferred currency for calculations</p>
            </TooltipContent>
          </Tooltip>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <CurrencyToggle value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="text-sm font-medium mb-2 text-gray-300">Starting amount</Label>
              </TooltipTrigger>
              <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
                <p>How much are you starting with?</p>
              </TooltipContent>
            </Tooltip>
            <Input
              type="number"
              step="any"
              {...register('initial', { 
                valueAsNumber: true,
                onChange: (e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setValue('initial', value);
                  }
                }
              })}
              className="w-full rounded-lg px-3 py-2 bg-[#222821] border border-[#33532A] text-white placeholder:text-gray-400 focus:border-[#BDE681] focus:ring-1 focus:ring-[#BDE681] transition-colors duration-200"
            />
            {errors.initial && <span className="text-red-500 text-xs mt-1">{errors.initial.message}</span>}
          </div>
          <div className="flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="text-sm font-medium mb-2 text-gray-300">Regular deposit</Label>
              </TooltipTrigger>
              <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
                <p>How much will you add regularly?</p>
              </TooltipContent>
            </Tooltip>
            <Input
              type="number"
              step="any"
              {...register('recurring', { 
                valueAsNumber: true,
                onChange: (e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setValue('recurring', value);
                  }
                }
              })}
              className="w-full rounded-lg px-3 py-2 bg-[#222821] border border-[#33532A] text-white placeholder:text-gray-400 focus:border-[#BDE681] focus:ring-1 focus:ring-[#BDE681] transition-colors duration-200"
            />
            {errors.recurring && <span className="text-red-500 text-xs mt-1">{errors.recurring.message}</span>}
          </div>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="text-sm font-medium mb-2 text-gray-300">Deposit frequency</Label>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
              <p>How often you add money?</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex gap-2">
            <Controller
              name="recurringFrequency"
              control={control}
              render={({ field }) => (
                <>
                  {['weekly', 'monthly'].map((freq) => (
                    <Toggle
                      key={freq}
                      pressed={field.value === freq}
                      onPressedChange={() => field.onChange(freq)}
                      className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </Toggle>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="text-sm font-medium mb-2 text-gray-300">Interest rate</Label>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
              <p>Annual interest rate for your investment</p>
            </TooltipContent>
          </Tooltip>
          <Controller
            name="interestRate"
            control={control}
            render={({ field }) => (
              <RateSelector
                value={field.value}
                onChange={field.onChange}
                options={rates}
              />
            )}
          />
          {errors.interestRate && <span className="text-red-500 text-xs">{errors.interestRate.message}</span>}
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="text-sm font-medium mb-2 text-gray-300">Compounding</Label>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
              <p>How often interest is calculated and added</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex gap-2">
            <Controller
              name="compoundingFrequency"
              control={control}
              render={({ field }) => (
                <>
                  {['monthly', 'quarterly', 'annually'].map((freq) => (
                    <Toggle
                      key={freq}
                      pressed={field.value === freq}
                      onPressedChange={() => field.onChange(freq)}
                      className="px-4 py-2 rounded-lg text-sm font-normal transition-colors data-[state=on]:bg-[#BDE681] data-[state=on]:text-[#222821] data-[state=off]:bg-[#222821] data-[state=off]:text-white data-[state=off]:border data-[state=off]:border-[#33532A]"
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </Toggle>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="text-sm font-medium mb-2 text-gray-300">Years of growth</Label>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ECF3E3] border-[#33532A] text-[#222821]">
              <p>How long you plan to invest</p>
            </TooltipContent>
          </Tooltip>
          <Input
            type="number"
            step="1"
            {...register('age', { 
              valueAsNumber: true,
              onChange: (e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value > 0 && value <= 100) {
                  setValue('age', value);
                }
              }
            })}
            className="w-full rounded-lg px-3 py-2 bg-[#222821] border border-[#33532A] text-white placeholder:text-gray-400 focus:border-[#BDE681] focus:ring-1 focus:ring-[#BDE681] transition-colors duration-200"
          />
          {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
        </div>
        
        {/* Optional: Add a manual calculate button for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <Button 
            onClick={calculateResults}
            disabled={isCalculating}
            className="bg-[#BDE681] text-[#222821] hover:bg-[#A8D670] transition-colors"
          >
            {isCalculating ? 'Calculating...' : 'Recalculate'}
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
};

export default InvestmentForm; 