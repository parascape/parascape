import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/Hero";
import Services from "@/components/Services";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TeamSection } from "@/components/sections/team-section";
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

      <Suspense fallback={<Loading variant="skeleton" />}>
        <Services />
      </Suspense>

      <Suspense fallback={<Loading variant="skeleton" />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<Loading variant="skeleton" />}>
        <TeamSection />
      </Suspense>

      <Suspense fallback={<Loading variant="skeleton" />}>
        <TestimonialsSection />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Index;