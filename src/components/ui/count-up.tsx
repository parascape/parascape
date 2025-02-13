import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function CountUpCard({ title, value, suffix = '', prefix = '', duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(value * percentage));
        
        if (percentage < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, value, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-lg"
    >
      <h3 className="text-4xl font-bold text-parascape-green mb-2">
        {prefix}{count}{suffix}
      </h3>
      <p className="text-gray-600">{title}</p>
    </motion.div>
  );
} 