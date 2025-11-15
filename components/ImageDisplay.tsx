import React from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon, XCircleIcon } from './Icons';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  generatedImageUrl: string | null;
  isLoading: boolean;
  onReset: () => void;
}

const ImageCard: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode }> = ({ title, imageUrl, children }) => (
    <div className="w-full flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-400 mb-3">{title}</h2>
        <div className="aspect-square w-full max-w-md bg-gray-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center relative border border-gray-700">
            {imageUrl ? <img src={imageUrl} alt={title} className="w-full h-full object-contain" /> : children}
        </div>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, generatedImageUrl, isLoading, onReset }) => {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
      <div className="relative">
        <ImageCard title="Original Image" imageUrl={originalImageUrl} />
        <button 
          onClick={onReset}
          className="absolute top-0 right-0 -mt-2 -mr-2 bg-gray-700 text-gray-300 rounded-full p-1.5 hover:bg-red-500 hover:text-white transition-all duration-200"
          aria-label="Start over"
        >
          <XCircleIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="relative">
        <ImageCard title="Generated Image" imageUrl={generatedImageUrl}>
          {isLoading ? (
            <div className="flex flex-col items-center text-gray-400">
              <Spinner />
              <p className="mt-4">AI is creating...</p>
            </div>
          ) : (
            <div className="text-gray-500">Your edited image will appear here.</div>
          )}
        </ImageCard>
        {generatedImageUrl && !isLoading && (
            <a
            href={generatedImageUrl}
            download="edited-image.png"
            className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-500 transition-all duration-200 flex items-center justify-center"
            aria-label="Download generated image"
            >
                <DownloadIcon className="w-5 h-5" />
            </a>
        )}
      </div>
    </div>
  );
};
