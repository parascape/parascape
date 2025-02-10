import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Code, Video, Megaphone, ArrowRight, Loader2, Palette, MessageSquare, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalAuditCTA } from "@/components/features/marketing";
import { ErrorBoundary } from "@/components/features/error";
import { Helmet } from 'react-helmet-async';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';
import { LucideIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  features: string[];
  details: string[];
}

const services: Service[] = [
  {
    title: 'Business Automation',
    description: 'Streamline your operations with powerful web solutions and intelligent automation systems.',
    image: '/assets/images/sections/Mountain-Vista.jpg',
    icon: Code,
    features: [
      'Custom Web Applications',
      'Process Automation',
      'System Integration',
      'Performance Optimization'
    ],
    details: [
      'Custom web applications and business systems',
      'Workflow automation and process optimization',
      'Integration of existing software solutions',
      'Modern, responsive website development',
      'Database design and management',
      'API development and integration'
    ]
  },
  {
    title: 'Digital Media Creation',
    description: 'Create compelling content that resonates with your audience and strengthens your brand.',
    image: '/assets/images/sections/Forest.jpg',
    icon: Video,
    features: [
      'Professional Video',
      'Social Media Content',
      'Brand Design',
      'Visual Assets'
    ],
    details: [
      'Professional video production and editing',
      'Engaging social media content creation',
      'Brand-aligned visual design and graphics',
      'Photography and image editing',
      'Motion graphics and animations',
      'Content strategy and planning'
    ]
  },
  {
    title: 'Market Strategy',
    description: 'Implement modern marketing strategies that drive growth and deliver measurable results.',
    image: '/assets/images/sections/Shadows.jpg',
    icon: Megaphone,
    features: [
      'Data-Driven Marketing',
      'SEO Optimization',
      'Performance Tracking',
      'Market Analysis'
    ],
    details: [
      'Data-driven marketing campaigns',
      'SEO and online visibility optimization',
      'Performance tracking and analytics',
      'Market research and competitor analysis',
      'Customer journey optimization',
      'Conversion rate optimization'
    ]
  }
];

const ServiceCard = ({ 
  service, 
  onClick 
}: { 
  service: Service;
  onClick: () => void;
}) => (
  <motion.div
    className="p-8 rounded-2xl cursor-pointer bg-white border-2 border-parascape-green/20 hover:border-parascape-green transition-all duration-200"
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.1 }}
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-parascape-green/10">
        <service.icon className="w-8 h-8 text-parascape-green" />
      </div>
      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
      <div className="mt-6 space-y-2">
        {service.features.map((feature, index) => (
          <div key={index} className="flex items-center justify-center text-sm text-gray-600">
            <ArrowRight className="w-4 h-4 mr-2 text-parascape-green" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ServiceDetail = ({ 
  service, 
  onClose, 
  onContact 
}: { 
  service: Service;
  onClose: () => void;
  onContact: () => void;
}) => (
  <div className="space-y-8">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-parascape-green/10 flex items-center justify-center">
        <service.icon className="w-10 h-10 text-parascape-green" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
        <p className="text-xl text-gray-600 mt-2">{service.description}</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mt-12">
      <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900">What we offer:</h3>
        <ul className="space-y-4">
          {service.details.map((detail: string, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.08,
                ease: "easeOut"
              }}
              className="flex items-center text-lg text-gray-700"
            >
              <ArrowRight className="w-5 h-5 mr-3 text-parascape-green flex-shrink-0" />
              {detail}
            </motion.li>
          ))}
        </ul>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-fit">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Why choose our {service.title}?
        </h3>
        <p className="text-gray-600 mb-6">
          We combine local expertise with industry best practices to deliver
          solutions that work for Humboldt County businesses.
        </p>
        <Button 
          onClick={onContact}
          className="w-full bg-parascape-green hover:bg-parascape-green/90 text-white"
        >
          Start Your Project
        </Button>
      </div>
    </div>
  </div>
);

export default function Services() {
  const location = useLocation();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.activeService) {
      const serviceExists = services.some(s => s.title === location.state.activeService);
      if (serviceExists) {
        setActiveService(location.state.activeService);
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [location.state]);

  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
    document.body.style.overflow = 'hidden';
    window.history.replaceState({ activeService: serviceId }, '', `/services`);
  };

  const handleClose = () => {
    setActiveService(null);
    document.body.style.overflow = 'unset';
    window.history.replaceState(null, '', `/services`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleContactClick = () => {
    setActiveService(null);
    document.body.style.overflow = 'unset';
    navigate('/contact', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-parascape-green" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Our Services - Parascape</title>
        <meta 
          name="description" 
          content="Discover Parascape's comprehensive digital services: Business Automation, Digital Media Creation, and Market Strategy Implementation." 
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="py-16 space-y-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900">Transform Your Business</h1>
            <p className="text-xl text-gray-600">
              Our threefold approach combines business automation, digital media creation, and market strategy 
              to help your business thrive in the digital landscape.
            </p>
          </div>

          <Suspense fallback={<Loading variant="skeleton" />}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  onClick={() => handleServiceClick(service.title)}
                />
              ))}
            </div>
          </Suspense>

          {/* Additional Services Overview */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
              <p className="mt-4 text-xl text-gray-600">
                Comprehensive digital solutions tailored for Humboldt County businesses
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-4">
                  <Code className="w-6 h-6 text-parascape-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Website Design & Development</h3>
                <p className="text-gray-600">Custom-built websites that capture your brand's essence and drive results.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-4">
                  <Palette className="w-6 h-6 text-parascape-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Branding & Identity</h3>
                <p className="text-gray-600">Cohesive brand strategies that make your business stand out.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-4">
                  <MessageSquare className="w-6 h-6 text-parascape-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Creation</h3>
                <p className="text-gray-600">Engaging content that tells your story and connects with your audience.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-4">
                  <LineChart className="w-6 h-6 text-parascape-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Marketing</h3>
                <p className="text-gray-600">Data-driven strategies to grow your online presence and reach.</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <DigitalAuditCTA />
          </div>
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-4xl p-6 md:p-8 relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Close service details"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ServiceDetail
                service={services.find(s => s.title === activeService)!}
                onClose={handleClose}
                onContact={handleContactClick}
              />
            </motion.div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}