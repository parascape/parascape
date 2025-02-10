import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Code, Palette, MessageSquare, LineChart, ArrowRight, ArrowLeft, Loader2, Megaphone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalAuditCTA } from "@/components/features/marketing";
import { ErrorBoundary } from "@/components/features/error/ErrorBoundary";
import { Helmet } from 'react-helmet-async';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';
import { LucideIcon } from 'lucide-react';
import { ParallaxSection } from '@/components/ui/parallax-section';

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
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    image: '/assets/images/sections/Mountain-Vista.jpg',
    icon: Code,
    features: [
      'Responsive Design',
      'Performance Optimization',
      'SEO Best Practices',
      'Modern UI/UX'
    ],
    details: [
      'Custom website development',
      'Progressive Web Applications (PWA)',
      'Website maintenance and updates',
      'Performance optimization',
      'Technical SEO implementation',
      'Cross-browser compatibility'
    ]
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic digital marketing solutions to grow your online presence.',
    image: '/assets/images/sections/Forest.jpg',
    icon: LineChart,
    features: [
      'SEO Strategy',
      'Content Marketing',
      'Social Media Management',
      'Analytics & Reporting'
    ],
    details: [
      'Search Engine Optimization (SEO)',
      'Social media marketing',
      'Content strategy and creation',
      'Email marketing campaigns',
      'Analytics and reporting',
      'Local SEO optimization'
    ]
  },
  {
    title: 'E-commerce Solutions',
    description: 'End-to-end e-commerce solutions for your business.',
    image: '/assets/images/sections/Shadows.jpg',
    icon: MessageSquare,
    features: [
      'Custom Shopping Cart',
      'Payment Integration',
      'Inventory Management',
      'Order Processing'
    ],
    details: [
      'Custom e-commerce development',
      'Shopping cart integration',
      'Payment gateway setup',
      'Inventory management system',
      'Order processing automation',
      'Customer account management'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Our Services - Parascape</title>
        <meta
          name="description"
          content="Discover Parascape's comprehensive digital services: Business Automation, Digital Media Creation, and Market Strategy Implementation."
        />
      </Helmet>

      <div className="space-y-24 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4 pt-24 pb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-display font-semibold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Three powerful services designed to elevate your digital presence
            and drive exceptional results.
          </motion.p>
        </div>

        {/* Service Cards Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 tracking-tight">Our Services</h2>
            <p className="mt-4 text-xl text-gray-500 font-light">
              Comprehensive digital solutions tailored for your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-6">
                <Code className="w-6 h-6 text-parascape-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Website Design & Development</h3>
              <p className="text-gray-500">Custom-built websites that capture your brand's essence and drive results.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-6">
                <Palette className="w-6 h-6 text-parascape-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Branding & Identity</h3>
              <p className="text-gray-500">Cohesive brand strategies that make your business stand out.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-6">
                <MessageSquare className="w-6 h-6 text-parascape-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Creation</h3>
              <p className="text-gray-500">Engaging content that tells your story and connects with your audience.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-parascape-100 mb-6">
                <LineChart className="w-6 h-6 text-parascape-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Marketing</h3>
              <p className="text-gray-500">Data-driven strategies to grow your online presence and reach.</p>
            </motion.div>
          </div>
        </div>

        {/* Business Automation Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-parascape-100">
                  <Code size={32} className="text-parascape-600" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-semibold text-gray-900 tracking-tight">Web Development & Business Automation</h2>
                  <p className="text-xl text-gray-500 font-light leading-relaxed">
                    Streamline your operations with powerful web solutions and intelligent automation systems.
                  </p>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Custom web applications and business systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Workflow automation and process optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Integration of existing software solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Modern, responsive website development</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Digital Media Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl ml-auto">
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-parascape-100">
                  <Video size={32} className="text-parascape-600" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-semibold text-gray-900 tracking-tight">Digital Media Production</h2>
                  <p className="text-xl text-gray-500 font-light leading-relaxed">
                    Create compelling content that resonates with your audience and strengthens your brand.
                  </p>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Professional video production and editing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Engaging social media content creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Brand-aligned visual design and graphics</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Market Strategy Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-parascape-100">
                  <Megaphone size={32} className="text-parascape-600" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-semibold text-gray-900 tracking-tight">Market Strategy</h2>
                  <p className="text-xl text-gray-500 font-light leading-relaxed">
                    Implement modern marketing strategies that drive growth and deliver measurable results.
                  </p>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Data-driven marketing campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">SEO and online visibility optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-parascape-100 flex items-center justify-center mr-4">
                      <span className="w-2 h-2 rounded-full bg-parascape-600"></span>
                    </span>
                    <span className="text-lg text-gray-600">Performance tracking and analytics</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl p-8 md:p-16 max-w-6xl mx-auto my-24">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-display font-semibold text-gray-900 tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
              Let's discuss how our services can help your business thrive in the digital landscape.
            </p>
            <Button
              onClick={() => navigate('/contact')}
              size="lg"
              className="bg-parascape-100 hover:bg-parascape-200 text-parascape-600 rounded-xl px-12 py-4 text-lg font-medium transition-all duration-200 shadow-soft hover:shadow-medium group inline-flex items-center border-2 border-parascape-600/10 hover:border-parascape-600/20"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Services;