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
  className = ''
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div ref={ref} className={`relative min-h-[80vh] overflow-hidden ${className}`}>
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 -z-10"
      >
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

<<<<<<< HEAD
      <div className="relative h-full flex flex-col items-center justify-center text-black p-8">
=======
      <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
>>>>>>> c0ca58a9a34fb9da5372b6efae6ad5f673e35e14
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-center"
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