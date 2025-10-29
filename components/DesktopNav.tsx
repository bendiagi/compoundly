'use client';

import React from 'react';

const DesktopNav: React.FC = () => {

  return (
    <nav className="hidden lg:flex w-[95vw] mx-auto bg-[#222821] border-b border-[#33532A] rounded-b-[3rem] p-4 shadow-lg mb-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Title */}
        <div className="flex items-center pl-4">
          <h1 className="text-2xl font-bold text-[#DFEAD4] font-geist-mono">Compoundly</h1>
        </div>
        
      </div>
    </nav>
  );
};

export default DesktopNav;
