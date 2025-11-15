import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="w-full max-w-4xl p-4 my-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center gap-3">
      <AlertTriangleIcon className="w-5 h-5 flex-shrink-0" />
      <div>
        <span className="font-semibold">Error:</span> {error}
      </div>
    </div>
  );
};
