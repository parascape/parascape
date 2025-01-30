import { Code, MessageSquare, LineChart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ServiceFlow = () => {
  return (
    <div className="mb-20">
      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Website Development */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 relative z-10"
          >
            <div className="text-parascape-green mb-3">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Step 1: Foundation</h3>
            <p className="text-sm text-gray-600">Build a powerful, custom website that serves as your digital headquarters</p>
          </motion.div>

          <ArrowRight className="hidden md:block text-parascape-green w-8 h-8" />

          {/* Content Creation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 relative z-10"
          >
            <div className="text-parascape-green mb-3">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Step 2: Content</h3>
            <p className="text-sm text-gray-600">Create engaging content that tells your story and connects with your audience</p>
          </motion.div>

          <ArrowRight className="hidden md:block text-parascape-green w-8 h-8" />

          {/* Marketing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 relative z-10"
          >
            <div className="text-parascape-green mb-3">
              <LineChart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Step 3: Growth</h3>
            <p className="text-sm text-gray-600">Implement our proven market strategies to expand your reach and drive results</p>
          </motion.div>
        </div>

        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-parascape-green/20 -translate-y-1/2 hidden md:block" />
      </div>
    </div>
  );
}; 