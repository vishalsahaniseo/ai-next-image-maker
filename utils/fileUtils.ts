import type { ImageFile } from '../types';

export const processFile = (file: File): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File is not an image.'));
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = (event.target?.result as string).split(',')[1];
      if (base64String) {
        resolve({
          file,
          previewUrl: URL.createObjectURL(file),
          base64: base64String,
          mimeType: file.type,
        });
      } else {
        reject(new Error('Failed to read file as Base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
