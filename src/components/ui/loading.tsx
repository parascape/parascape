import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  variant?: 'spinner' | 'skeleton' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  fullscreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

export function Loading({ 
  variant = 'spinner',
  size = 'md',
  className,
  text,
  fullscreen = false
}: LoadingProps) {
  const containerClasses = cn(
    'flex flex-col items-center justify-center',
    fullscreen && 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50',
    className
  );

  const spinnerClasses = cn(
    'animate-spin text-parascape-green',
    sizeClasses[size]
  );

  if (variant === 'skeleton') {
    return (
      <div className={containerClasses}>
        <div className="space-y-3 w-full">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={containerClasses}>
        <div className="bg-gray-200 rounded-md p-4 w-full h-full animate-pulse">
          <div className="h-full w-full min-h-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <Loader2 className={spinnerClasses} />
      {text && (
        <p className="mt-2 text-sm text-gray-500 animate-pulse">{text}</p>
      )}
    </div>
  );
} 