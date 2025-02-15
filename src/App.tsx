import { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { SuspenseBoundary } from '@/components/ui/suspense-boundary';
import { ErrorBoundary } from '@/components/features/error';
import { MainLayout } from '@/components/layouts/MainLayout';
import { HelmetProvider } from 'react-helmet-async';
import { CookieConsent } from '@/components/features/cookies/CookieConsent';
import { AnalyticsProvider } from '@/components/features/analytics';
import RouteTransition from '@/components/ui/route-transition';
import { analytics } from '@/lib/analytics';
import { config } from '@/config/environment';

// Lazy load pages
const Home = lazy(() => import('@/pages/Index'));
const Services = lazy(() => import('@/pages/Services'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Success = lazy(() => import('@/pages/Success'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Track page view
      analytics.pageView(pathname);
    } catch (error) {
      console.warn('ScrollToTop Error:', error);
    }
  }, [pathname]);

  return null;
}

// Handle 404 redirects for GitHub Pages
function handleGitHubPages() {
  try {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      window.history.replaceState(null, '', redirect);
    }
  } catch (error) {
    console.warn('GitHub Pages Redirect Error:', error);
  }
}

export default function App() {
  useEffect(() => {
    handleGitHubPages();
    // Initialize analytics
    analytics.init();
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router basename={config.baseUrl}>
          <AnalyticsProvider>
            <ScrollToTop />
            <MainLayout>
              <RouteTransition>
                <SuspenseBoundary>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </SuspenseBoundary>
              </RouteTransition>
            </MainLayout>
            <Toaster position="bottom-right" />
            <CookieConsent />
          </AnalyticsProvider>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}