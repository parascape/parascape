interface InteractionEvent {
  type: string;
  target: string;
  metadata?: Record<string, any>;
}

// Send interaction event to analytics
function sendInteractionToAnalytics(event: InteractionEvent) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Interaction Tracking]', event);
  }

  // Send to GA4
  try {
    if (typeof gtag === 'function') {
      gtag('event', event.type, {
        interaction_target: event.target,
        ...event.metadata
      });
    }
  } catch (e) {
    console.debug('GA4 not available for interaction tracking');
  }
}

// Initialize interaction tracking
export function initInteractionTracking() {
  // Track clicks on interactive elements
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    sendInteractionToAnalytics({
      type: 'click',
      target: target.tagName.toLowerCase(),
      metadata: {
        element_id: target.id || undefined,
        element_class: target.className || undefined
      }
    });
  });

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;
    if (!form) return;

    sendInteractionToAnalytics({
      type: 'form_submit',
      target: form.dataset.trackingTarget || form.id || 'unknown_form',
      metadata: {
        form_action: form.action
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
    metadata
  });
} 