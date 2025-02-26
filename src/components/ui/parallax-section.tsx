import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { OptimizedImage } from './optimized-image';

interface ParallaxSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ParallaxSection({
  image,
  title,
  subtitle,
  children,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div ref={ref} className={`relative min-h-[80vh] overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <OptimizedImage src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative flex h-full flex-col items-center justify-center p-8 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center text-4xl font-bold md:text-5xl"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center text-xl md:text-2xl"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
