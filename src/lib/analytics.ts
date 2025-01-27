type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
}

const GA_TRACKING_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

export const analytics = {
  pageView: (path: string) => {
    if (import.meta.env.DEV) {
      console.log('Page View:', path);
      return;
    }

    try {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: path,
      });
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  },
  
  track: (event: AnalyticsEvent) => {
    if (import.meta.env.DEV) {
      console.log('Track Event:', event);
      return;
    }

    try {
      window.gtag('event', event.name, event.properties);
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }
}; 