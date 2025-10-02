import React from 'react';

/**
 * A simple skeleton loader component with a pulse animation.
 * The background color and size should be set via className.
 * e.g., className="h-4 w-full bg-slate-700"
 */
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`animate-pulse rounded-md ${className}`}
      role="status"
    />
  );
};
