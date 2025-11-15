import React from 'react';
import { ImageIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 text-center border-b border-gray-700/50">
      <div className="flex items-center justify-center gap-3">
        <ImageIcon className="w-10 h-10 text-indigo-400"/>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          AI Image Editor
        </h1>
      </div>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">
        Use text prompts to edit your images with Gemini. From simple filters to complex manipulations, just describe what you want.
      </p>
    </header>
  );
};
