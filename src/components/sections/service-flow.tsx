import { Code, MessageSquare, LineChart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceFlow = () => {
  return (
    <div className="mb-20">
      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Website Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full rounded-lg bg-white p-6 shadow-lg md:w-1/3"
          >
            <div className="mb-3 text-parascape-green">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Step 1: Foundation</h3>
            <p className="text-sm text-gray-600">
              Build a powerful, custom website that serves as your digital headquarters
            </p>
          </motion.div>

          <ArrowRight className="hidden h-8 w-8 text-parascape-green md:block" />

          {/* Content Creation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 w-full rounded-lg bg-white p-6 shadow-lg md:w-1/3"
          >
            <div className="mb-3 text-parascape-green">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Step 2: Content</h3>
            <p className="text-sm text-gray-600">
              Create engaging content that tells your story and connects with your audience
            </p>
          </motion.div>

          <ArrowRight className="hidden h-8 w-8 text-parascape-green md:block" />

          {/* Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 w-full rounded-lg bg-white p-6 shadow-lg md:w-1/3"
          >
            <div className="mb-3 text-parascape-green">
              <LineChart className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Step 3: Growth</h3>
            <p className="text-sm text-gray-600">
              Implement our proven market strategies to expand your reach and drive results
            </p>
          </motion.div>
        </div>

        {/* Connecting Line */}
        <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-parascape-green/20 md:block" />
      </div>
    </div>
  );
};
