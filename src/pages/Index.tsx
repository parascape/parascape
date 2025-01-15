import { SEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import { getAssetPath } from '@/utils/assetPath';

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
      <Testimonial />
    </>
  );
};

export default Index;