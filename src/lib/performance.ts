import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

interface MetricReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType: string;
}

// Send metrics to analytics
function sendToAnalytics(metric: MetricReport) {
  // Check if Plausible is available
  const plausible = (window as any).plausible;
  if (plausible) {
    plausible('WebVitals', {
      props: {
        metric: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        navigationType: metric.navigationType
      }
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Performance]', metric);
  }
}

// Get navigation type
function getNavigationType() {
  const navigation = (window as any).performance?.getEntriesByType('navigation')[0];
  return navigation ? navigation.type : 'unknown';
}

// Rate the metric value
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    default:
      return 'poor';
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  const navigationType = getNavigationType();

  // Core Web Vitals
  getCLS(metric => {
    sendToAnalytics({
      name: 'CLS',
      value: metric.value,
      rating: getRating('CLS', metric.value),
      navigationType
    });
  });

  getFID(metric => {
    sendToAnalytics({
      name: 'FID',
      value: metric.value,
      rating: getRating('FID', metric.value),
      navigationType
    });
  });

  getLCP(metric => {
    sendToAnalytics({
      name: 'LCP',
      value: metric.value,
      rating: getRating('LCP', metric.value),
      navigationType
    });
  });

  // Additional metrics
  getFCP(metric => {
    sendToAnalytics({
      name: 'FCP',
      value: metric.value,
      rating: getRating('FCP', metric.value),
      navigationType
    });
  });

  getTTFB(metric => {
    sendToAnalytics({
      name: 'TTFB',
      value: metric.value,
      rating: getRating('TTFB', metric.value),
      navigationType
    });
  });

  // Monitor route changes
  let routeChangeStart: number;
  window.addEventListener('popstate', () => {
    routeChangeStart = performance.now();
  });

  window.addEventListener('load', () => {
    if (routeChangeStart) {
      const routeChangeDuration = performance.now() - routeChangeStart;
      sendToAnalytics({
        name: 'RouteChange',
        value: routeChangeDuration,
        rating: getRating('RouteChange', routeChangeDuration),
        navigationType: 'route-change'
      });
    }
  });

  // Monitor resource loading
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        sendToAnalytics({
          name: 'ResourceTiming',
          value: resourceEntry.duration,
          rating: getRating('ResourceTiming', resourceEntry.duration),
          navigationType: resourceEntry.initiatorType
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
} 