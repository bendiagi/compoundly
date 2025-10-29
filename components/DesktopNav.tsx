'use client';

import React, { useEffect, useState } from 'react';

const DesktopNav: React.FC = () => {

  return (
    <nav className="flex w-full lg:w-[95vw] mx-auto bg-[#222821] border-b-2 lg:border-b-2 border-[#DAE5D0] rounded-none lg:rounded-b-[3rem] pl-4 pr-8 py-4 shadow-lg mb-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Title + Subtitle */}
        <div className="flex flex-col pl-2 lg:pl-4">
          <h1 className="text-2xl font-bold text-[#DFEAD4] font-geist-mono">Compoundly</h1>
          <p className="lg:hidden text-base text-[#DAE5D0] font-geist-mono mt-0.5">
            See how your savings and investments can grow with the power of compound interest.
          </p>
        </div>
        {/* Right side - Global calculation counter */}
        <CalcCounter />
      </div>
    </nav>
  );
};

export default DesktopNav;

const CalcCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/metrics/calc', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setCount(typeof data.count === 'number' ? data.count : 0);
      } catch {
        // ignore
      }
    };
    fetchCount();
    const id = setInterval(fetchCount, 30000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return (
    <div className="flex items-center">
      <div className="px-3 py-1 rounded-full border border-[#33532A] text-[#DAE5D0] bg-[#222821] font-geist-mono text-sm">
        <span className="font-bold">{count ?? '…'}</span> investment journeys visualized
      </div>
    </div>
  );
};
