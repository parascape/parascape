import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from './loading';

const RouteTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
};

export default RouteTransition; 