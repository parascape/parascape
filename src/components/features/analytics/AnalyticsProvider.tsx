import { PropsWithChildren } from 'react';
import { useAnalytics } from './hooks/useAnalytics';

export function AnalyticsProvider({ children }: PropsWithChildren) {
  useAnalytics();
  return <>{children}</>;
} 