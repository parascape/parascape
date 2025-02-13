import { Suspense } from 'react';
import { Loading } from './loading';

interface SuspenseBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingText?: string;
  fullscreen?: boolean;
}

export function SuspenseBoundary({
  children,
  fallback,
  loadingText,
  fullscreen = false
}: SuspenseBoundaryProps) {
  const defaultFallback = (
    <Loading 
      variant="spinner"
      text={loadingText}
      fullscreen={fullscreen}
    />
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
} 