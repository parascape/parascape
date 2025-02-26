interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

// Declare gtag as a property on the window object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config?: Record<string, any>
    ) => void;
  }
}

class Analytics {
  init(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(
      command: 'config' | 'event' | 'js',
      targetId: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config?: Record<string, any>
    ): void {
      window.dataLayer.push([command, targetId, config]);
    };
    window.gtag('js', new Date().toISOString());
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
