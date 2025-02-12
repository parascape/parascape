import { motion } from 'framer-motion';
import { Suspense, type ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from './loading';

interface RouteTransitionProps {
  children: ReactElement;
}

export default function RouteTransition({ children }: RouteTransitionProps): ReactElement {
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
} 