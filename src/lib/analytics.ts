<<<<<<< HEAD
type AnalyticsEvent = {
=======
interface AnalyticsEvent {
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  name: string;
  properties?: Record<string, any>;
}

<<<<<<< HEAD
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
=======
class Analytics {
  private initialized = false;

  init() {
    if (this.initialized) return;
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-NQLRXMREDQ');
    
    this.initialized = true;
  }

  pageView(path: string) {
    if (!this.initialized) return;
    
    window.gtag?.('event', 'page_view', {
      page_path: path,
    });
  }

  track({ name, properties = {} }: AnalyticsEvent) {
    if (!this.initialized) return;

    window.gtag?.('event', name, properties);
  }
}

export const analytics = new Analytics();

// Type declarations for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: 'js' | 'config' | 'event', targetId: string, config?: Record<string, any>) => void;
  }
} 
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
