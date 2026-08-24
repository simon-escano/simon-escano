import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex items-center gap-1 p-1 rounded-full bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/50 backdrop-blur-md ${className}`}>
      <button
        onClick={() => setTheme('light')}
        aria-label="Light mode"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white text-brand-orange shadow-sm scale-105'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 text-brand-orange shadow-sm scale-105'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Moon className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('system')}
        aria-label="System theme"
        title="System default"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'system'
            ? 'bg-brand-cobalt text-white shadow-sm scale-105'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Laptop className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;
