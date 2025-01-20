import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxSection } from '../ui/parallax-section';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Parascape transformed our online presence. Their expertise in web development and digital marketing has been invaluable to our growth.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "Humboldt Harvest"
  },
  {
    id: 2,
    quote: "Working with Parascape was a game-changer. They understood our vision and delivered beyond our expectations.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "Pacific Coast Ventures"
  },
  {
    id: 3,
    quote: "The team's attention to detail and commitment to excellence sets them apart. They're not just service providers, they're partners in success.",
    author: "Emily Rodriguez",
    role: "Owner",
    company: "Coastal Creations"
  }
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ParallaxSection
      image="/assets/images/sections/testimonials-bg.jpg"
      title="Client Success Stories"
      subtitle="Hear from businesses we've helped transform"
      className="py-20"
    >
      <div className="relative w-full max-w-4xl mx-auto px-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <p className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonials[current].author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonials[current].role}, {testimonials[current].company}
                  </p>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const newDirection = index > current ? 1 : -1;
                        setDirection(newDirection);
                        setCurrent(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === current ? 'bg-parascape-green' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ParallaxSection>
  );
} 