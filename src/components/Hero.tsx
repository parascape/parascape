import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';
import { analytics } from '@/lib/analytics';

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
        destination: '/contact',
      },
    });

    // Navigate to contact page with a smooth scroll to top first
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    navigate('/contact', {
      state: {
        fromHero: true,
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center bg-gradient-to-b from-parascape-green/10 to-white md:min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        {!isImageLoaded && (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <Loading variant="spinner" size="lg" />
          </div>
        )}
        <Image
          src="/assets/images/Hero.jpg"
          alt="Humboldt landscape"
          className="h-full w-full object-cover opacity-90"
          onLoad={() => setIsImageLoaded(true)}
          style={{
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
          aspectRatio="16:9"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-24 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-center text-3xl font-bold leading-tight text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl"
        >
          Transform Your Business with a <br className="hidden sm:block" />
          <span className="mt-2 block text-gray-900">Digital Makeover</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-white/90 sm:text-xl md:mb-10 md:text-2xl"
        >
          Empowering your business through modern innovation and timeless creativity
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="transform rounded-md bg-parascape-green px-6 py-3 text-base font-semibold text-white shadow-lg transition-all 
                     duration-200 ease-in-out 
                     hover:scale-105 hover:bg-parascape-green/90 hover:shadow-xl
                     active:scale-100 active:bg-parascape-green/80 sm:px-8
                     sm:py-4 sm:text-lg"
          >
            Get Started Today
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
