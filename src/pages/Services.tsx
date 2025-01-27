import { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/features/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Code, Palette, MessageSquare, LineChart, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalAuditCTA } from "@/components/features/marketing";
import { ErrorBoundary } from "@/components/features/error/ErrorBoundary";
import { Helmet } from 'react-helmet-async';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    image: '/images/services/web-development.jpg',
    features: [
      'Responsive Design',
      'Performance Optimization',
      'SEO Best Practices',
      'Modern UI/UX'
    ]
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic digital marketing solutions to grow your online presence.',
    image: '/images/services/digital-marketing.jpg',
    features: [
      'SEO Strategy',
      'Content Marketing',
      'Social Media Management',
      'Analytics & Reporting'
    ]
  },
  {
    title: 'E-commerce Solutions',
    description: 'End-to-end e-commerce solutions for your business.',
    image: '/images/services/ecommerce.jpg',
    features: [
      'Custom Shopping Cart',
      'Payment Integration',
      'Inventory Management',
      'Order Processing'
    ]
  }
];

const ServiceCard = ({ service, onClick }: { service: typeof services[0], onClick: () => void }) => (
  <motion.div
    className="p-6 rounded-2xl cursor-pointer bg-white border-2 border-parascape-green/20 hover:border-parascape-green transition-all duration-200"
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.1 }}
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-parascape-green/10">
        <service.icon className="w-8 h-8 text-parascape-green" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
    </div>
  </motion.div>
);

const ServiceDetail = ({ 
  service, 
  onClose, 
  onContact 
}: { 
  service: typeof services[0], 
  onClose: () => void, 
  onContact: () => void 
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
          {service.details.map((detail, index) => (
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
          className="w-full bg-parascape-green hover:bg-parascape-green/90"
        >
          Start Your Project
        </Button>
      </div>
    </div>
  </div>
);

const Services = () => {
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
      setActiveService(location.state.activeService);
      document.body.style.overflow = 'hidden';
    }
  }, [location]);

  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setActiveService(null);
    document.body.style.overflow = 'unset';
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleContactClick = () => {
    setActiveService(null);
    document.body.style.overflow = 'unset';
    navigate('/contact');
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
        <title>Services - Parascape</title>
        <meta 
          name="description" 
          content="Explore our range of digital services including web development, digital marketing, and e-commerce solutions." 
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="py-12 space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive digital solutions to help your business thrive online.
            </p>
          </div>

          <Suspense fallback={<Loading variant="skeleton" />}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  onClick={() => handleServiceClick(service.title)}
                />
              ))}
            </div>
          </Suspense>

          <div className="mt-16">
            <DigitalAuditCTA />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Services;