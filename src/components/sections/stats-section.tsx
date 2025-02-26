<<<<<<< HEAD
import { ParallaxSection } from '../ui/parallax-section';
import { CountUpCard } from '../ui/count-up';

const stats = [
  {
    title: "Projects Completed",
    value: 50,
    suffix: "+",
  },
  {
    title: "Client Satisfaction",
    value: 98,
    suffix: "%",
  },
  {
    title: "Years Experience",
    value: 10,
    suffix: "+",
  },
  {
    title: "Revenue Growth",
    prefix: "↑",
    value: 200,
    suffix: "%",
=======
import { motion } from 'framer-motion';

const stats = [
  {
    value: '100+',
    label: 'Local Businesses Served',
    description: 'Helping Humboldt County businesses thrive'
  },
  {
    value: '95%',
    label: 'Client Satisfaction',
    description: 'Based on post-project surveys'
  },
  {
    value: '50%',
    label: 'Average Traffic Increase',
    description: 'For clients after 6 months'
  },
  {
    value: '24/7',
    label: 'Support Available',
    description: 'Always here when you need us'
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  }
];

export function StatsSection() {
  return (
<<<<<<< HEAD
    <ParallaxSection
      image="/assets/images/Mountain-Vista.jpg"
      title="Our Impact"
      subtitle="Driving Digital Success Through Measurable Results"
      className="py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <CountUpCard
            key={index}
            title={stat.title}
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
          />
        ))}
      </div>
    </ParallaxSection>
=======
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Driving Real Results
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Numbers that speak to our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl border border-gray-100 text-center"
            >
              <div className="text-4xl font-bold text-parascape-green mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  );
} 