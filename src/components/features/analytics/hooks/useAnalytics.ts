import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

export function useAnalytics() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only track page views on POP and PUSH navigation
    // This prevents double tracking on initial load
    if (navigationType !== 'REPLACE') {
      analytics.pageView(location.pathname + location.search);
    }
  }, [location, navigationType]);

  return analytics;
}
