import { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { SuspenseBoundary } from '@/components/ui/suspense-boundary';
import { ErrorBoundary } from '@/components/features/error/ErrorBoundary';
import { MainLayout } from '@/components/layouts/MainLayout';
import { HelmetProvider } from 'react-helmet-async';
import { CookieConsent } from '@/components/features/cookies/CookieConsent';
import { AnalyticsProvider } from '@/components/features/analytics';
import { RouteTransition } from '@/components/ui/route-transition';

// Lazy load pages
const Home = lazy(() => import('@/pages/Index'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('@/pages/About'));
const SuccessStories = lazy(() => import('@/pages/SuccessStories'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <AnalyticsProvider>
            <MainLayout>
              <SuspenseBoundary loadingText="Loading page...">
                <RouteTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/success-stories" element={<SuccessStories />} />
                    <Route path="/contact/:type?" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </RouteTransition>
              </SuspenseBoundary>
            </MainLayout>
            <Toaster position="top-right" />
            <CookieConsent />
          </AnalyticsProvider>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}