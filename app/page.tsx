'use client';

import { useState, useCallback, useEffect } from 'react';
import InvestmentForm from '@/components/InvestmentForm';
import InvestmentChart from '@/components/InvestmentChart';
import SummaryStats from '@/components/SummaryStats';
import ExportButtons from '@/components/ExportButtons';
import { ProjectionPoint } from '@/lib/calculateCompoundReturns';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { calculateCompoundReturns } from '@/lib/calculateCompoundReturns';

// Define the form values type to match InvestmentForm
type FormValues = {
  currency: 'USD' | 'NGN';
  initial: number;
  recurring: number;
  recurringFrequency: 'weekly' | 'monthly';
  interestRate: number;
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually';
  age: number;
};

// Import default values to ensure consistency
const defaultFormValues: FormValues = {
  currency: 'USD',
  initial: 5000,
  recurring: 100,
  recurringFrequency: 'monthly',
  interestRate: 12,
  compoundingFrequency: 'monthly',
  age: 5
};

export default function Home() {
  // Calculate initial result using the same default values
  const initialResult = calculateCompoundReturns({
    initial: defaultFormValues.initial,
    recurring: defaultFormValues.recurring,
    recurringFrequency: defaultFormValues.recurringFrequency,
    interestRate: defaultFormValues.interestRate,
    compoundingFrequency: defaultFormValues.compoundingFrequency,
    years: defaultFormValues.age,
  });

  const [result, setResult] = useState<ProjectionPoint[] | null>(initialResult);
  const [form, setForm] = useState<FormValues>(defaultFormValues);
  const [isCalculating, setIsCalculating] = useState(false);

  // Memoize the onCalculate function to prevent infinite loops
  const handleCalculate = useCallback((res: ProjectionPoint[], formData: FormValues) => {
    console.log('Received new calculation result:', { result: res, form: formData });
    
    // Validate the result before updating state
    if (res && Array.isArray(res) && res.length > 0) {
      const lastResult = res[res.length - 1];
      
      // Check if the result contains valid data
      if (lastResult && 
          typeof lastResult.total === 'number' && 
          typeof lastResult.principal === 'number' && 
          typeof lastResult.interest === 'number' &&
          isFinite(lastResult.total) && 
          isFinite(lastResult.principal) && 
          isFinite(lastResult.interest) &&
          lastResult.total > 0) {
        
        setResult(res);
        setForm(formData);
        console.log('State updated successfully with new calculation');
      } else {
        console.warn('Invalid calculation result received:', lastResult);
      }
    } else {
      console.warn('Empty or invalid calculation result received:', res);
    }
  }, []);

  // Debug effect to log state changes
  useEffect(() => {
    console.log('Calculator state updated:', { 
      resultLength: result?.length, 
      formValues: form,
      lastResult: result?.[result?.length - 1]
    });
  }, [result, form]);

  return (
    <div className="font-sans flex flex-col items-center text-foreground p-0 lg:px-4 sm:lg:px-8 mt-0">
      {/* Mobile: Full screen content */}
      <div className="w-full lg:hidden bg-[#222821] flex flex-col gap-8">
        <div className="text-center mb-1 p-4">
          <h1 className="text-3xl font-bold mb-1 text-white font-geist-mono">Compoundly</h1>
          <p className="text-base text-gray-300 font-geist">Watch your investments grow with the power of compound interest.</p>
        </div>
        <div className="flex flex-col gap-8 flex-1 px-4 pb-4">
          <div className="flex flex-col gap-8">
            <InvestmentForm onCalculate={handleCalculate} />
          </div>
          <div className="mt-8">
            <InvestmentChart data={result} form={form} />
          </div>
        </div>
      </div>

      {/* Desktop: Card design */}
      <Card className="hidden lg:flex w-[95vw] rounded-[3rem] shadow-lg bg-[#222821] border-[#33532A] flex-col gap-8 mt-6 mb-6">
        <CardContent className="flex flex-row gap-8 flex-1 p-6">
          <div className="flex flex-col gap-4 w-[35%] pb-6">
            {/* Form section with subtitle */}
            <Card className="bg-[#2A3E24] border-[#1a2d15] rounded-2xl">
              <CardContent className="p-4">
                <p className="text-base font-thin text-[#BDE681] font-geist-mono">Watch your savings and investments grow with the power of compound interest.</p>
              </CardContent>
            </Card>
            <InvestmentForm onCalculate={handleCalculate} />
          </div>
          <div className="w-[65%]">
            <InvestmentChart data={result} form={form} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 