export interface CalculationInput {
  initial: number;
  recurring?: number;
  recurringFrequency: 'weekly' | 'monthly';
  interestRate: number; // annual, percent
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually';
  years?: number; // default 25
}

export interface ProjectionPoint {
  month: number;
  year: number;
  principal: number;
  interest: number;
  total: number;
}

export function calculateCompoundReturns({
  initial,
  recurring = 0,
  recurringFrequency,
  interestRate,
  compoundingFrequency,
  years = 25,
}: CalculationInput): ProjectionPoint[] {
  // Enhanced validation with better error messages
  if (!initial || initial <= 0 || !isFinite(initial)) {
    console.error('Invalid initial amount:', initial);
    return [];
  }
  
  if (recurring < 0 || !isFinite(recurring)) {
    console.error('Invalid recurring amount:', recurring);
    return [];
  }
  
  if (!interestRate || interestRate <= 0 || !isFinite(interestRate)) {
    console.error('Invalid interest rate:', interestRate);
    return [];
  }
  
  if (!years || years <= 0 || !isFinite(years) || years > 100) {
    console.error('Invalid years:', years);
    return [];
  }

  // Convert interest rate to decimal (e.g., 12% = 0.12)
  const annualRate = interestRate / 100;
  
  // Convert recurring to monthly
  let monthlyRecurring = 0;
  if (recurring > 0) {
    if (recurringFrequency === 'weekly') {
      monthlyRecurring = recurring * (52 / 12); // 52 weeks / 12 months
    } else if (recurringFrequency === 'monthly') {
      monthlyRecurring = recurring;
    }
  }

  const months = years * 12;
  const data: ProjectionPoint[] = [];

  let principal = initial;
  let total = initial;
  let interestAccrued = 0;

  console.log('Starting calculation:', {
    initial,
    monthlyRecurring,
    annualRate,
    compoundingFrequency,
    months
  });

  for (let m = 1; m <= months; m++) {
    // Calculate interest for this month
    let monthlyInterest = 0;
    
    if (compoundingFrequency === 'monthly') {
      // Monthly compounding: simple interest
      monthlyInterest = total * (annualRate / 12);
    } else if (compoundingFrequency === 'quarterly') {
      // Quarterly compounding: only calculate interest every 3rd month
      if (m % 3 === 0) {
        monthlyInterest = total * (annualRate / 4);
      }
    } else { // annually
      // Annual compounding: only calculate interest every 12th month
      if (m % 12 === 0) {
        monthlyInterest = total * annualRate;
      }
    }

    // Add interest
    total += monthlyInterest;
    interestAccrued += monthlyInterest;

    // Add recurring contribution
    principal += monthlyRecurring;
    total += monthlyRecurring;

    // Enhanced safety checks
    if (!isFinite(total) || !isFinite(principal) || !isFinite(interestAccrued)) {
      console.error(`Overflow detected at month ${m}:`, { 
        total, 
        principal, 
        interestAccrued, 
        monthlyInterest, 
        monthlyRecurring 
      });
      return [];
    }
    
    // Check for negative values (shouldn't happen with valid inputs)
    if (total < 0 || principal < 0 || interestAccrued < 0) {
      console.error(`Negative values detected at month ${m}:`, { 
        total, 
        principal, 
        interestAccrued 
      });
      return [];
    }

    // Debug first few months and last month
    if (m <= 3 || m === months) {
      console.log(`Month ${m}:`, {
        principal: Math.round(principal * 100) / 100,
        total: Math.round(total * 100) / 100,
        monthlyInterest: Math.round(monthlyInterest * 100) / 100,
        interestAccrued: Math.round(interestAccrued * 100) / 100
      });
    }

    data.push({
      month: m,
      year: Math.floor((m - 1) / 12) + 1,
      principal: Math.round(principal * 100) / 100,
      interest: Math.round(interestAccrued * 100) / 100,
      total: Math.round(total * 100) / 100,
    });
  }
  
  // Final validation
  if (data.length === 0) {
    console.error('No data generated from calculation');
    return [];
  }
  
  const finalResult = data[data.length - 1];
  console.log('Final result:', finalResult);
  
  // Additional validation of final result
  if (!isFinite(finalResult.total) || !isFinite(finalResult.principal) || !isFinite(finalResult.interest)) {
    console.error('Final result contains invalid values:', finalResult);
    return [];
  }
  
  return data;
} 