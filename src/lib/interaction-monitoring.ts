interface InteractionEvent {
  type: string;
  target: string;
  timestamp: number;
  routePath: string;
  metadata?: Record<string, any>;
}

// Send interaction event to analytics
function sendInteractionToAnalytics(event: InteractionEvent) {
  // Check if Plausible is available
  const plausible = (window as any).plausible;
  if (plausible) {
    plausible('Interaction', {
      props: {
        eventType: event.type,
        target: event.target,
        routePath: event.routePath,
        ...event.metadata
      }
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Interaction Tracking]', event);
  }
}

// Initialize interaction tracking
export function initInteractionTracking() {
  // Track clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Get data attributes
    const dataset = { ...target.dataset };
    delete dataset.trackingTarget; // Remove tracking target from metadata

    sendInteractionToAnalytics({
      type: 'click',
      target: target.dataset.trackingTarget || target.tagName.toLowerCase(),
      timestamp: Date.now(),
      routePath: window.location.pathname,
      metadata: Object.keys(dataset).length > 0 ? dataset : undefined
    });
  });

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;
    if (!form) return;

    sendInteractionToAnalytics({
      type: 'form_submit',
      target: form.dataset.trackingTarget || form.id || 'unknown_form',
      timestamp: Date.now(),
      routePath: window.location.pathname,
      metadata: {
        formAction: form.action
      }
    });
  });

  // Track scroll depth
  let maxScrollDepth = 0;
  let scrollTimeout: NodeJS.Timeout;

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.round((window.scrollY / scrollHeight) * 100);

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          sendInteractionToAnalytics({
            type: 'scroll_depth',
            target: 'page',
            timestamp: Date.now(),
            routePath: window.location.pathname,
            metadata: {
              depth: scrollDepth
            }
          });
        }
      }
    }, 100);
  });
}

// Manual interaction tracking
export function trackInteraction(type: string, target: string, metadata?: Record<string, any>) {
  sendInteractionToAnalytics({
    type,
    target,
    timestamp: Date.now(),
    routePath: window.location.pathname,
    metadata
  });
} 