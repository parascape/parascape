import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initPerformanceMonitoring } from './lib/performance-monitoring'
import { initErrorTracking } from './lib/error-tracking'
import { initInteractionTracking } from './lib/interaction-monitoring'

// Initialize monitoring
initPerformanceMonitoring()
initErrorTracking()
initInteractionTracking()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
