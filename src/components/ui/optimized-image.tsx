import { useState, useEffect } from 'react';
import { getAssetPath } from '@/utils/assetPath';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fullSrc = getAssetPath(src);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = fullSrc;
    }
  }, [fullSrc, priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={fullSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
} 