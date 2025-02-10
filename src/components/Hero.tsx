import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    navigate('/contact', {
      state: { 
        animation: 'slide-up',
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-parascape-green/5 via-white/80 to-white">      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Transform Your Business with a{" "}
          <span className="text-parascape-green">Parascape Digital Makeover</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
        >
          Empowering Humboldt businesses through modern innovation and timeless creativity
        </motion.p>
        
        <motion.button 
          variants={itemVariants}
          onClick={handleGetStarted}
          className="bg-parascape-100 hover:bg-parascape-200 text-parascape-600 rounded-xl px-12 py-4 text-lg font-medium transition-all duration-200 shadow-soft hover:shadow-medium group inline-flex items-center border-2 border-parascape-600/10 hover:border-parascape-600/20"
        >
          Get Started Today
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;