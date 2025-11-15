import React, { useState, useCallback } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { PromptControls } from './components/PromptControls';
import { ImageDisplay } from './components/ImageDisplay';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';
import { editImage } from './services/geminiService';
import type { ImageFile } from './types';

export default function App() {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((imageFile: ImageFile | null) => {
    setOriginalImage(imageFile);
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async (prompt: string) => {
    if (!originalImage || !prompt) {
      setError("Please select an image and enter a prompt.");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const newImageBase64 = await editImage(originalImage.base64, originalImage.mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);
  
  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {!originalImage ? (
          <div className="w-full max-w-lg mt-8">
             <ImageUpload onImageSelect={handleImageSelect} />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <ImageDisplay 
              originalImageUrl={originalImage.previewUrl}
              generatedImageUrl={generatedImage}
              isLoading={isLoading}
              onReset={handleReset}
            />
            <ErrorDisplay error={error} />
            <PromptControls onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}
      </main>
    </div>
  );
}
