import React, { useState } from 'react';
import { SparklesIcon } from './Icons';

interface PromptControlsProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your edit... e.g., 'Add a retro filter' or 'Make it look like a watercolor painting'"
            className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pr-28 pl-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 resize-none"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 flex items-center justify-center bg-indigo-600 text-white rounded-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            <SparklesIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-pulse' : ''}`} />
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>
    </div>
  );
};
