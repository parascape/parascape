import { motion } from 'framer-motion';

const stats = [
  {
    value: '100+',
    label: 'Local Businesses Served',
    description: 'Helping Humboldt County businesses thrive',
  },
  {
    value: '95%',
    label: 'Client Satisfaction',
    description: 'Based on post-project surveys',
  },
  {
    value: '50%',
    label: 'Average Traffic Increase',
    description: 'For clients after 6 months',
  },
  {
    value: '24/7',
    label: 'Support Available',
    description: 'Always here when you need us',
  },
];

export function StatsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Driving Real Results</h2>
          <p className="mt-4 text-xl text-gray-600">
            Numbers that speak to our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center"
            >
              <div className="mb-2 text-4xl font-bold text-parascape-green">{stat.value}</div>
              <div className="mb-2 text-lg font-semibold text-gray-900">{stat.label}</div>
              <div className="text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
