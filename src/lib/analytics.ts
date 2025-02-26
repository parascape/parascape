interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

type GtagCommand = 'config' | 'event' | 'js';

interface Window {
  dataLayer: any[];
  gtag: (command: GtagCommand, targetId: string, config?: Record<string, any>) => void;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: GtagCommand, targetId: string, config?: Record<string, any>) => void;
  }
}

export class Analytics {
  static init(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (
      command: GtagCommand,
      targetId: string,
      config?: Record<string, any>
    ): void {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date().toISOString());
    window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID);
  }

  static trackPageView(path: string): void {
    window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  static trackEvent(event: AnalyticsEvent): void {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
}

// Type declarations for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: GtagCommand, targetId: string, config?: Record<string, any>) => void;
  }
}
