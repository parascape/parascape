import { Suspense, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/features/navigation';
import { Footer } from '@/components/Footer';
import { Loading } from '@/components/ui/loading';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
}

export function MainLayout({ 
  children, 
  className,
  fullWidth = false,
  withPadding = true
}: MainLayoutProps) {
  const location = useLocation();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    setIsRouteChanging(true);
    const timer = setTimeout(() => setIsRouteChanging(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Suspense fallback={<Loading variant="spinner" size="sm" />}>
        <Navbar />
      </Suspense>

      <main className={cn(
        'flex-grow relative',
        withPadding && 'pt-16 md:pt-20',
        className
      )}>
        {isRouteChanging && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loading variant="spinner" size="lg" />
          </div>
        )}
        <div className={cn(
          'mx-auto w-full',
          !fullWidth && 'max-w-7xl px-4 sm:px-6 lg:px-8'
        )}>
          <Suspense 
            fallback={
              <div className="py-12">
                <Loading variant="skeleton" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>

      <Suspense fallback={<Loading variant="spinner" size="sm" />}>
        <Footer />
      </Suspense>
    </div>
  );
} 