'use client';

import React from 'react';

const DesktopNav: React.FC = () => {

  return (
    <nav className="flex w-full lg:w-[95vw] mx-auto bg-[#222821] border-b-2 lg:border-b-2 border-[#DAE5D0] rounded-none lg:rounded-b-[3rem] p-4 shadow-lg mb-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Title + Subtitle */}
        <div className="flex flex-col pl-2 lg:pl-4">
          <h1 className="text-2xl font-bold text-[#DFEAD4] font-geist-mono">Compoundly</h1>
          <p className="lg:hidden text-base text-[#DAE5D0] font-geist-mono mt-0.5">
            See how your savings and investments can grow with the power of compound interest.
          </p>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
