interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Gtag = (command: 'config' | 'event' | 'js', target: string, details?: any) => void;
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    gtag: Gtag;
  }
}

class Analytics {
  init(): void {
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gtag = function(...args: any[]): void {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID);
  }

  pageView(path: string): void {
    window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  track(event: AnalyticsEvent): void {
    window.gtag('event', event.name, event.properties || {});
  }
}

export const analytics = new Analytics();
