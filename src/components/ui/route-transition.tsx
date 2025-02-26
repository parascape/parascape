<<<<<<< HEAD
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "./loading";

interface MotionWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

// Lazy load Framer Motion components
const MotionWrapper = lazy(() => import('framer-motion').then(mod => ({
  default: ({ children, ...props }: MotionWrapperProps) => {
    const { motion, AnimatePresence } = mod;
    return (
      <AnimatePresence mode="wait">
        <motion.div {...props}>
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
})));

interface RouteTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export function RouteTransition({ children }: RouteTransitionProps) {
=======
import { motion } from 'framer-motion';
import { Suspense, type ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from './loading';

interface RouteTransitionProps {
  children: ReactElement;
}

export default function RouteTransition({ children }: RouteTransitionProps): ReactElement {
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
<<<<<<< HEAD
      <MotionWrapper
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        {children}
      </MotionWrapper>
=======
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
    </Suspense>
  );
} 