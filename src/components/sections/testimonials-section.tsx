import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxSection } from '../ui/parallax-section';
<<<<<<< HEAD
=======
import { Quote } from 'lucide-react';
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662

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
<<<<<<< HEAD
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
=======
    quote: "Parascape transformed our online presence completely. Our website traffic has doubled, and customer engagement is at an all-time high.",
    author: "Sarah Johnson",
    role: "Owner",
    company: "Humboldt Herbals"
  },
  {
    id: 2,
    quote: "The team at Parascape truly understands the unique needs of local businesses. They delivered beyond our expectations.",
    author: "Michael Chen",
    role: "Director",
    company: "Pacific Outfitters"
  },
  {
    id: 3,
    quote: "Professional, creative, and results-driven. Our new website has helped us reach customers we never could before.",
    author: "Emily Rodriguez",
    role: "Marketing Manager",
    company: "Lost Coast Brewery"
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
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
<<<<<<< HEAD
    <ParallaxSection
      image="/assets/images/Forest.jpg"
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
=======
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Quote className="w-8 h-8 text-parascape-green mb-4" />
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  );
} 