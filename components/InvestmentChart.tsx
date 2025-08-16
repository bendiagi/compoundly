import React from 'react';
import { ProjectionPoint } from '@/lib/calculateCompoundReturns';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface Props {
  data: ProjectionPoint[] | null;
  form?: any;
}

const formatYear = (month: number) => Math.floor((month - 1) / 12) + 1;

const chartConfig = {
  principal: {
    label: "Principal",
    color: "#BDE681",
  },
  interest: {
    label: "Interest",
    color: "#222821",
  },
};

const InvestmentChart: React.FC<Props> = ({ data, form }) => {
  // Enhanced validation for data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="text-gray-400">Chart will appear here after calculation.</div>;
  }
  
  // Validate the last data point
  const lastDataPoint = data[data.length - 1];
  if (!lastDataPoint || 
      typeof lastDataPoint.total !== 'number' || 
      typeof lastDataPoint.interest !== 'number' || 
      typeof lastDataPoint.principal !== 'number' ||
      !isFinite(lastDataPoint.total) || 
      !isFinite(lastDataPoint.interest) || 
      !isFinite(lastDataPoint.principal)) {
    console.warn('Invalid data point detected:', lastDataPoint);
    return <div className="text-gray-400">Invalid calculation data. Please check your inputs.</div>;
  }
  
  // Format currency values safely
  const formatCurrency = (value: number) => {
    if (!isFinite(value) || value < 0) return '0';
    return value.toLocaleString();
  };
  
  const totalBalance = lastDataPoint.total;
  const interestEarned = lastDataPoint.interest;
  const totalInvested = lastDataPoint.principal;
  
  return (
    <div id="investment-chart" className="w-full h-full bg-[#ECF3E3] border border-[#BDE681] rounded-2xl shadow-lg p-4 flex flex-col">
      <div className="mb-4 flex gap-8 items-end justify-end pr-2">
        <div>
          <div className="text-sm font-medium text-[#33532A] mb-1">Total Balance</div>
          <div className="text-3xl font-light text-[#222821]">
            {form?.currency === 'NGN' ? '\u20a6' : '$'}{formatCurrency(totalBalance)}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-[#33532A] mb-1">Interest Earned</div>
          <div className="text-3xl font-light text-[#222821]">
            {form?.currency === 'NGN' ? '\u20a6' : '$'}{formatCurrency(interestEarned)}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-[#33532A] mb-1">Total Invested</div>
          <div className="text-3xl font-light text-[#222821]">
            {form?.currency === 'NGN' ? '\u20a6' : '$'}{formatCurrency(totalInvested)}
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 px-2">
        <ChartContainer 
          config={chartConfig} 
          className="h-full w-full flex-col [&]:!aspect-none [&]:!justify-start"
        >
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <XAxis
              dataKey="month"
              tickFormatter={month => `Yr ${formatYear(month)}`}
              interval={23}
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis
              tickFormatter={v => v >= 1000 ? (v / 1000) + 'k' : v}
              stroke="#6B7280"
              fontSize={12}
            />
            <ChartTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const month = label;
                  const year = formatYear(month);
                  const principal = Number(payload.find(item => item.dataKey === 'principal')?.value) || 0;
                  const interest = Number(payload.find(item => item.dataKey === 'interest')?.value) || 0;
                  const totalBalance = principal + interest;
                  
                  return (
                    <div className="border-[#33532A] bg-[#ECF3E3] text-[#222821] shadow-lg rounded-lg p-3 min-w-[200px]">
                      <div className="font-semibold text-sm mb-2">Year {year}</div>
                      <div className="border-t border-[#33532A] mb-2"></div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Total balance</span>
                          <span className="font-medium">${totalBalance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-[#BDE681] opacity-30"></div>
                            Total principal
                          </span>
                          <span className="font-medium">${principal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-[#222821] opacity-30"></div>
                            Total interest
                          </span>
                          <span className="font-medium">${interest.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="principal"
              stackId="1"
              stroke="#BDE681"
              fill="#BDE681"
              name="Principal"
              fillOpacity={0.3}
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="#222821"
              fill="#222821"
              name="Interest"
              fillOpacity={0.3}
              isAnimationActive={true}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default InvestmentChart; 