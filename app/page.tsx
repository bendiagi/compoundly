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
  currency: 'USD' | 'NGN' | 'EUR' | 'GBP';
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
    <div className="font-sans h-screen flex flex-col items-center justify-center bg-[#DFEAD4] text-foreground p-4 sm:p-8">
      <Card className="w-[90vw] max-h-[90vh] flex flex-col gap-8 bg-[#222821] border-[#33532A] rounded-[3rem] shadow-lg overflow-hidden">
        <CardHeader className="text-center mb-2">
          <CardTitle className="text-3xl font-bold mb-1 text-white">See how your money can grow</CardTitle>
          <CardDescription className="text-base text-gray-300">Visualize your investment growth with precision</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
          <div className="flex flex-col gap-8 lg:w-[35%]">
            <InvestmentForm onCalculate={handleCalculate} />
          </div>
          <div className="lg:w-[65%] h-full">
            <InvestmentChart data={result} form={form} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 