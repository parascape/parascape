import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initPerformanceMonitoring } from './lib/performance';
import { initErrorTracking } from './lib/error-tracking';
import { initInteractionTracking } from './lib/interaction-monitoring';

// Initialize app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize monitoring after window load
window.addEventListener('load', () => {
  // Small delay to ensure GA4 is fully initialized
  setTimeout(() => {
    initPerformanceMonitoring();
    initErrorTracking();
    initInteractionTracking();
  }, 100);
});
