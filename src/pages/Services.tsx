import { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/features/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Code, Palette, MessageSquare, LineChart, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalAuditCTA } from "@/components/features/marketing";
import { ErrorBoundary } from "@/components/features/error/ErrorBoundary";

const services = [
  {
    id: "web",
    icon: Code,
    title: "Website Design & Development",
    description: "Custom-built websites that capture your brand's essence and drive results.",
    details: [
      "Custom Website Design",
      "Responsive Development",
      "E-commerce Solutions",
      "Website Maintenance",
      "Performance Optimization",
      "SEO Integration",
      "User Experience (UX) Design",
      "Content Management Systems"
    ]
  },
  {
    id: "brand",
    icon: Palette,
    title: "Branding & Identity",
    description: "Cohesive brand strategies that make your business stand out.",
    details: [
      "Brand Strategy Development",
      "Visual Identity Design",
      "Logo Design",
      "Brand Guidelines",
      "Brand Voice Development",
      "Marketing Collateral",
      "Brand Positioning",
      "Rebranding Services"
    ]
  },
  {
    id: "content",
    icon: MessageSquare,
    title: "Content Creation",
    description: "Engaging content that tells your story and connects with your audience.",
    details: [
      "Content Strategy",
      "Copywriting",
      "Blog Writing",
      "Social Media Content",
      "Email Marketing Content",
      "Video Production",
      "Photography",
      "Infographic Design"
    ]
  },
  {
    id: "marketing",
    icon: LineChart,
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence and reach.",
    details: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Email Marketing Campaigns",
      "Pay-Per-Click Advertising",
      "Content Marketing",
      "Analytics & Reporting",
      "Marketing Automation",
      "Lead Generation"
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
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored for Humboldt County businesses
              </p>
            </div>

            <Suspense fallback={
              <div className="flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-parascape-green" />
              </div>
            }>
              <div className="mb-16">
                <DigitalAuditCTA />
              </div>
            </Suspense>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-0 bg-white z-50 overflow-y-auto"
            >
              <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex justify-between items-center mb-8">
                    <Button
                      variant="ghost"
                      onClick={handleClose}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Services
                    </Button>
                    <Button
                      onClick={handleContactClick}
                      className="bg-parascape-green hover:bg-parascape-green/90"
                    >
                      Get Started
                    </Button>
                  </div>

                  {services.map((service) => 
                    service.id === activeService ? (
                      <ServiceDetail
                        key={service.id}
                        service={service}
                        onClose={handleClose}
                        onContact={handleContactClick}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default Services;