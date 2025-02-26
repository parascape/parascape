import { memo, PropsWithChildren } from 'react';
import { useAnalytics } from './hooks/useAnalytics';

export const AnalyticsProvider = memo(function AnalyticsProvider({ children }: PropsWithChildren) {
  useAnalytics();
  return <>{children}</>;
});

AnalyticsProvider.displayName = 'AnalyticsProvider';
