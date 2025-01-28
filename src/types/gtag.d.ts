// Type definitions for Google Analytics gtag
declare function gtag(...args: any[]): void;

interface Window {
  gtag: typeof gtag;
  dataLayer: any[];
}

// Declare gtag as a global function
declare global {
  function gtag(...args: any[]): void;
} 