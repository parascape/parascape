// Type definitions for Google Analytics gtag
declare function gtag(
  command: 'config' | 'event' | 'js',
  targetId: string,
  config?: Record<string, any> | undefined
): void;

interface Window {
  gtag: typeof gtag;
  dataLayer: any[];
}

// Declare gtag as a global function
declare global {
  const gtag: typeof gtag;
}
