import { Code, Palette, LineChart, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'web',
    icon: Code,
    title: 'Website Design & Development',
    description: "Custom-built websites that capture your brand's essence and drive results.",
  },
  {
    id: 'brand',
    icon: Palette,
    title: 'Branding & Identity',
    description: 'Cohesive brand strategies that make your business stand out.',
  },
  {
    id: 'content',
    icon: MessageSquare,
    title: 'Content Creation',
    description: 'Engaging content that tells your story and connects with your audience.',
  },
  {
    id: 'marketing',
    icon: LineChart,
    title: 'Digital Marketing',
    description: 'Data-driven strategies to grow your online presence and reach.',
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate('/services', { state: { activeService: serviceId } });
  };

  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Our Services</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-700">
            Comprehensive digital solutions tailored for Humboldt County businesses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map(service => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="group cursor-pointer rounded-lg border border-gray-200 p-6 transition-colors hover:border-parascape-green"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-parascape-green/10 transition-colors group-hover:bg-parascape-green/20">
                <service.icon className="h-6 w-6 text-parascape-green" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
