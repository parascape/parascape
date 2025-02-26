interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

type GtagCommand = 'config' | 'event' | 'js';

type GtagConfig = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: GtagCommand, targetId: string, config?: GtagConfig) => void;
  }
}

class Analytics {
  init(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(command: GtagCommand, targetId: string, config?: GtagConfig): void {
      window.dataLayer.push(arguments);
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
    window.gtag('event', event.name, event.properties);
  }
}

export const analytics = new Analytics();
