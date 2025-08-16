import React from 'react';
import { ProjectionPoint } from '@/lib/calculateCompoundReturns';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Dot } from 'lucide-react';

interface Props {
  data: ProjectionPoint[] | null;
  form: any;
}

const SummaryStats: React.FC<Props> = ({ data, form }) => {
  // Enhanced validation for data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="text-gray-400">Summary will appear here after calculation.</div>;
  }
  
  const last = data[data.length - 1];
  
  // Validate the last data point
  if (!last || 
      typeof last.interest !== 'number' || 
      typeof last.principal !== 'number' ||
      !isFinite(last.interest) || 
      !isFinite(last.principal)) {
    console.warn('Invalid summary data detected:', last);
    return <div className="text-gray-400">Invalid calculation data. Please check your inputs.</div>;
  }
  
  // Format currency values safely
  const formatCurrency = (value: number) => {
    if (!isFinite(value) || value < 0) return '0';
    return value.toLocaleString();
  };
  
  return (
    <Card className="bg-[#222821] border border-[#33532A] rounded-2xl shadow-lg p-6">
      <CardContent className="flex flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Portfolio Breakdown</h3>
        <div className="flex items-center gap-2 text-lg font-semibold text-[#BDE681]">
          <TrendingUp size={20} className="text-[#BDE681]" />
          Interest Earned: <span>{form?.currency === 'NGN' ? '\u20a6' : '$'}{formatCurrency(last.interest)}</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold text-[#BDE681]">
          <Dot size={20} className="text-[#BDE681]" />
          Total Invested: <span>{form?.currency === 'NGN' ? '\u20a6' : '$'}{formatCurrency(last.principal)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryStats; 