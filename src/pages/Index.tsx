import { SEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

const Index = () => {
  return (
    <>
      <SEO 
        title="Parascape - Digital Solutions for Humboldt County Businesses"
        description="Transform your business with Parascape's digital makeover services. Web design, branding, and digital marketing solutions for Humboldt County businesses."
        url="/"
      />
      <Hero />
      <Services />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
};

export default Index;