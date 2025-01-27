type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
}

// Analytics interfaces
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    plausible: (
      eventName: string,
      options?: { props?: Record<string, any> }
    ) => void;
  }
}

const GA_TRACKING_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

export const analytics = {
  pageView: (path: string) => {
    if (import.meta.env.DEV) {
      console.log('Page View:', path);
      return;
    }

    try {
      // Google Analytics
      window.gtag?.('config', GA_TRACKING_ID, {
        page_path: path,
      });

      // Plausible
      window.plausible?.('pageview', {
        props: { path }
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
      // Google Analytics
      window.gtag?.('event', event.name, event.properties);

      // Plausible
      window.plausible?.(event.name, {
        props: event.properties
      });
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }
}; 