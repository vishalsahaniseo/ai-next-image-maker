import React, { useCallback, useState } from 'react';
import { processFile } from '../utils/fileUtils';
import type { ImageFile } from '../types';
import { UploadIcon } from './Icons';

interface ImageUploadProps {
  onImageSelect: (image: ImageFile | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (file) {
      try {
        const imageFile = await processFile(file);
        onImageSelect(imageFile);
      } catch (error) {
        console.error("Error processing file:", error);
        alert(error instanceof Error ? error.message : "Invalid file.");
        onImageSelect(null);
      }
    }
  }, [onImageSelect]);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  }, [handleFileChange]);


  return (
    <div className="w-full text-center p-8 bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:border-indigo-500 hover:bg-gray-700">
      <label
        htmlFor="image-upload"
        className={`flex flex-col items-center justify-center w-full h-full cursor-pointer rounded-xl transition-transform duration-200 ${isDragging ? 'scale-105' : 'scale-100'}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <UploadIcon className="w-16 h-16 text-gray-500 mb-4 transition-colors duration-300" />
        <p className="text-xl font-semibold text-gray-300">
          <span className="text-indigo-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500 mt-1">PNG, JPG, or WEBP</p>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={onFileSelect}
        />
      </label>
    </div>
  );
};
