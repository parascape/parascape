interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

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
