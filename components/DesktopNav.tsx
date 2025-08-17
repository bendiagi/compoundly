'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const DesktopNav: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="hidden lg:flex w-[95vw] mx-auto bg-[#222821] border-b border-[#33532A] rounded-b-[3rem] p-4 shadow-lg mb-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Title */}
        <div className="flex items-center pl-4">
          <h1 className="text-2xl font-bold text-[#DFEAD4] font-geist-mono">Compoundly</h1>
        </div>
        
        {/* Right side - Theme toggle */}
        <div className="flex items-center pr-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#33532A] hover:bg-[#BDE681] hover:text-[#222821] text-white transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
