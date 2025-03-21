interface ErrorReport {
  message: string;
  stack?: string;
  type: string;
  url: string;
  timestamp: number;
  userAgent: string;
  routePath: string;
}

// Send error to analytics
function sendErrorToAnalytics(error: ErrorReport) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', error);
  }

  // Send to GA4
  try {
    if (typeof gtag === 'function') {
      gtag('event', 'error', {
        error_type: error.type,
        error_message: error.message,
        error_url: error.url,
        error_path: error.routePath,
      });
    }
  } catch (e) {
    // Silently fail if analytics is not available
    console.debug('GA4 not available for error tracking');
  }
}

// Initialize error tracking
export function initErrorTracking() {
  // Global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    sendErrorToAnalytics({
      message: message.toString(),
      stack: error?.stack,
      type: 'uncaught',
      url: source || window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      routePath: window.location.pathname,
    });
    return false;
  };

  // Unhandled promise rejection handler
  window.onunhandledrejection = event => {
    sendErrorToAnalytics({
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      type: 'unhandled-promise',
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      routePath: window.location.pathname,
    });
  };

  // Network error handler
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      if (!response.ok) {
        sendErrorToAnalytics({
          message: `HTTP ${response.status}: ${response.statusText}`,
          type: 'network',
          url: args[0].toString(),
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          routePath: window.location.pathname,
        });
      }
      return response;
    } catch (error) {
      sendErrorToAnalytics({
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        stack: error instanceof Error ? error.stack : undefined,
        type: 'network',
        url: args[0].toString(),
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        routePath: window.location.pathname,
      });
      throw error;
    }
  };
}

// Manual error reporting
export function reportError(error: Error, type: string = 'manual') {
  sendErrorToAnalytics({
    message: error.message,
    stack: error.stack,
    type,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    routePath: window.location.pathname,
  });
}
