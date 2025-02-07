type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
}

const GA_TRACKING_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

// Check if GA4 is properly loaded
const isGA4Available = () => {
  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function' && 
         GA_TRACKING_ID;
};

export const analytics = {
  pageView: (path: string) => {
    if (import.meta.env.DEV) {
      console.log('Page View:', path);
      return;
    }

    if (!isGA4Available()) {
      console.warn('GA4 not available');
      return;
    }

    try {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: path,
      });
    } catch (error) {
      console.warn('Analytics Page View Error:', error);
    }
  },
  
  track: (event: AnalyticsEvent) => {
    if (import.meta.env.DEV) {
      console.log('Track Event:', event);
      return;
    }

    if (!isGA4Available()) {
      console.warn('GA4 not available');
      return;
    }

    try {
      window.gtag('event', event.name, event.properties);
    } catch (error) {
      console.warn('Analytics Track Error:', error);
    }
  }
}; 