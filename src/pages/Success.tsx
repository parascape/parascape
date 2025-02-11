import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Message Received - Parascape</title>
        <meta 
          name="description" 
          content="Thank you for contacting Parascape. We'll be in touch soon!"
        />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div 
          className="text-center max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="w-16 h-16 text-parascape-green mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Message Received!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for reaching out. We'll get back to you as soon as possible with personalized recommendations for your business.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-parascape-green text-white px-8 py-3 rounded-md font-semibold 
                     hover:bg-parascape-green/90 active:bg-parascape-green/80 
                     transform hover:scale-105 active:scale-100
                     transition-all duration-200 ease-in-out"
          >
            Take Me Back Home
          </button>
        </motion.div>
      </div>
    </>
  );
} 