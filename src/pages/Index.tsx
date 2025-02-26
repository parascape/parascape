<<<<<<< HEAD
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/Hero";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/features/error/ErrorBoundary";

const Index = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Parascape - Digital Solutions for Humboldt County Businesses</title>
        <meta 
          name="description" 
          content="Transform your business with Parascape's digital makeover services. Web design, branding, and digital marketing solutions for Humboldt County businesses."
        />
      </Helmet>

      <Suspense fallback={<Loading variant="skeleton" size="lg" fullscreen />}>
        <Hero />
      </Suspense>
    </ErrorBoundary>
  );
};

=======
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/Hero";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/features/error";

const Index = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Parascape - Digital Solutions for Humboldt County Businesses</title>
        <meta 
          name="description" 
          content="Transform your business with Parascape's digital makeover services. Web design, branding, and digital marketing solutions for Humboldt County businesses."
        />
      </Helmet>

      <Suspense fallback={<Loading variant="skeleton" size="lg" fullscreen />}>
        <Hero />
      </Suspense>
    </ErrorBoundary>
  );
};

>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
export default Index;