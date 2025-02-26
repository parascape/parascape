<<<<<<< HEAD
import { memo, PropsWithChildren } from 'react';
import { useAnalytics } from './hooks/useAnalytics';

export const AnalyticsProvider = memo(function AnalyticsProvider({ 
  children 
}: PropsWithChildren) {
  useAnalytics();
  return <>{children}</>;
});

AnalyticsProvider.displayName = 'AnalyticsProvider'; 
=======
import { PropsWithChildren } from 'react';
import { useAnalytics } from './hooks/useAnalytics';

export function AnalyticsProvider({ children }: PropsWithChildren) {
  useAnalytics();
  return <>{children}</>;
} 
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
