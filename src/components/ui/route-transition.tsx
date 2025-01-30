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
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
} 