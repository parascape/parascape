import { onCLS, onFID, onLCP } from 'web-vitals';

// Report web vitals to analytics
function reportWebVitals({ name, delta, id }: { name: string; delta: number; id: string }) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, delta);
  }

  // Send to GA4
  try {
    if (typeof gtag === 'function') {
      gtag('event', 'web_vitals', {
        metric_name: name,
        metric_value: Math.round(delta),
        metric_id: id,
      });
    }
  } catch (e) {
    console.debug('GA4 not available for performance tracking');
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  // Core Web Vitals
  onCLS(reportWebVitals);
  onFID(reportWebVitals);
  onLCP(reportWebVitals);
}
