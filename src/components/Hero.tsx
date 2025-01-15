import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAssetPath } from "../utils/getAssetPath";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to services page with a smooth scroll to top first
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    navigate('/services', {
      state: { 
        animation: 'slide-up',
        fromHero: true 
      }
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-parascape-green/10 to-white">
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url(${getAssetPath('/images/hero-bg.jpg')})`
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1433086966358-54859d0ed716"
          alt="Humboldt County landscape"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Transform Your Business with a{" "}
          <span className="text-parascape-green">Parascape Digital Makeover</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
        >
          Empowering Humboldt businesses through modern innovation and timeless creativity
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleGetStarted}
          className="bg-parascape-green text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-parascape-green/90 transition-colors"
        >
          Get Started Today
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;