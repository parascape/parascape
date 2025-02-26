import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loading } from './loading';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  loadingClassName?: string;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'auto';
  objectFit?: 'contain' | 'cover';
}

const aspectRatioClasses = {
  square: 'aspect-square',
  '16:9': 'aspect-video',
  '4:3': 'aspect-4/3',
  auto: '',
};

export function Image({
  src,
  alt,
  className,
  loadingClassName,
  aspectRatio = 'auto',
  objectFit = 'cover',
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new window.Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setError(null);
    };

    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const containerClasses = cn(
    'relative overflow-hidden bg-gray-100 rounded-md',
    aspectRatioClasses[aspectRatio],
    className
  );

  if (error) {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {isLoading && (
        <div className={cn('absolute inset-0', loadingClassName)}>
          <Loading variant="pulse" className="h-full" />
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            objectFit === 'contain' ? 'object-contain' : 'object-cover',
            'h-full w-full'
          )}
          {...props}
        />
      )}
    </div>
  );
}
