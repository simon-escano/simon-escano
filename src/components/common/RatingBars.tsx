import React from 'react';

export interface RatingBarsProps {
  value: number; // e.g. 7 or 8 or 10 out of 10
  max?: number; // default 10
  className?: string;
  fillColor?: string; // default brand orange or blue
}

export const RatingBars: React.FC<RatingBarsProps> = ({
  value,
  max = 10,
  className = '',
  fillColor = 'bg-brand-orange',
}) => {
  const normalizedValue = Math.min(Math.max(0, Math.round(value)), max);

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < normalizedValue;
        return (
          <span
            key={index}
            className={`h-1.5 w-3.5 sm:w-4 rounded-full transition-all duration-300 ${
              isFilled
                ? `${fillColor} shadow-sm shadow-brand-orange/30`
                : 'bg-slate-300 dark:bg-slate-700/80 opacity-60'
            }`}
          />
        );
      })}
    </div>
  );
};

export default RatingBars;
