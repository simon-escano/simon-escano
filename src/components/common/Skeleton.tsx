import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  style,
  ...props
}) => {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rounded'
      ? 'rounded-xl'
      : 'rounded-none';

  return (
    <div
      className={`relative overflow-hidden bg-slate-200/70 dark:bg-slate-800/60 backdrop-blur-sm ${variantClass} before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${className}`.trim()}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md space-y-4">
      {/* Thumbnail area */}
      <Skeleton className="w-full h-44 rounded-xl" />

      {/* Meta tags */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-20 h-4 rounded-md" />
        <Skeleton className="w-16 h-4 rounded-md" />
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-6 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-5/6 h-4 rounded-md" />
      </div>

      {/* Tech stack badges */}
      <div className="flex gap-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
        <Skeleton className="w-14 h-5 rounded-md" />
        <Skeleton className="w-16 h-5 rounded-md" />
        <Skeleton className="w-12 h-5 rounded-md" />
      </div>
    </div>
  );
};

export const ProjectDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto space-y-12">
      {/* Back button skeleton */}
      <Skeleton className="w-32 h-8 rounded-full" />

      {/* Header & Meta */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="w-24 h-5 rounded-full" />
          <Skeleton className="w-28 h-5 rounded-full" />
        </div>
        <Skeleton className="w-2/3 h-12 rounded-xl" />
        <Skeleton className="w-full max-w-2xl h-6 rounded-md" />
      </div>

      {/* Gallery split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-3">
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
        <div className="lg:col-span-8">
          <Skeleton className="w-full h-[420px] rounded-2xl" />
        </div>
      </div>

      {/* Architecture diagram skeleton */}
      <div className="space-y-4">
        <Skeleton className="w-48 h-8 rounded-lg" />
        <Skeleton className="w-full h-64 rounded-2xl" />
      </div>
    </div>
  );
};

export default Skeleton;
