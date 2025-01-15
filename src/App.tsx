import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "@/components/ui/loading";
import { MainLayout } from "./components/layouts/MainLayout";
import { CookieConsent } from "@/components/CookieConsent";
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const queryClient = new QueryClient();

// Create a wrapper component that uses Router hooks
function AppContent() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AnalyticsProvider>
              <Toaster />
              <Sonner />
              <MainLayout>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Suspense fallback={<Loading />}><PageTransition><Index /></PageTransition></Suspense>} />
                    <Route path="/contact" element={<Suspense fallback={<Loading />}><PageTransition><Contact /></PageTransition></Suspense>} />
                    <Route path="/success-stories" element={<Suspense fallback={<Loading />}><PageTransition><SuccessStories /></PageTransition></Suspense>} />
                    <Route path="/about" element={<Suspense fallback={<Loading />}><PageTransition><About /></PageTransition></Suspense>} />
                    <Route path="/services" element={<Suspense fallback={<Loading />}><PageTransition><Services /></PageTransition></Suspense>} />
                    <Route path="/privacy" element={<Suspense fallback={<Loading />}><PageTransition><Privacy /></PageTransition></Suspense>} />
                    <Route path="/terms" element={<Suspense fallback={<Loading />}><PageTransition><Terms /></PageTransition></Suspense>} />
                  </Routes>
                </AnimatePresence>
              </MainLayout>
              <CookieConsent />
            </AnalyticsProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

// Main App component that provides Router context
const App = () => (
  <BrowserRouter basename="/parascape">
    <AppContent />
  </BrowserRouter>
);

export default App;