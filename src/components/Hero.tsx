import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from 'react';
import { Image } from "@/components/ui/image";
import { Loading } from "@/components/ui/loading";
import { analytics } from "@/lib/analytics";

export const Hero = () => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleGetStarted = () => {
    // Track the button click
    analytics.track({
      name: 'cta_click',
      properties: {
        location: 'hero',
        button_text: 'Get Started Today',
        destination: '/contact'
      }
    });

    // Navigate to contact page with a smooth scroll to top first
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    navigate('/contact', {
      state: { 
        fromHero: true 
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-gradient-to-b from-parascape-green/10 to-white">
      <div className="absolute inset-0 overflow-hidden">
        {!isImageLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Loading variant="spinner" size="lg" />
          </div>
        )}
        <Image
          src="/assets/images/Hero.jpg"
          alt="Humboldt landscape"
          className="w-full h-full object-cover opacity-90"
          onLoad={() => setIsImageLoaded(true)}
          style={{ 
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
          aspectRatio="16:9"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <motion.div 
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight text-center"
        >
          Transform Your Business with a{" "}
          <br className="hidden sm:block" />
          <span className="text-gray-900 block mt-2">Digital Makeover</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed text-center"
        >
          Empowering your business through modern innovation and timeless creativity
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <button 
            onClick={handleGetStarted}
            className="bg-parascape-green text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg font-semibold 
                     hover:bg-parascape-green/90 active:bg-parascape-green/80 
                     transform hover:scale-105 active:scale-100
                     transition-all duration-200 ease-in-out
                     shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;