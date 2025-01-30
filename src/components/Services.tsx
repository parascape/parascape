import { Code, Palette, LineChart, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "web",
    icon: Code,
    title: "Website Design & Development",
    description: "Custom-built websites that capture your brand's essence and drive results.",
  },
  {
    id: "brand",
    icon: Palette,
    title: "Branding & Identity",
    description: "Cohesive brand strategies that make your business stand out.",
  },
  {
    id: "content",
    icon: MessageSquare,
    title: "Content Creation",
    description: "Engaging content that tells your story and connects with your audience.",
  },
  {
    id: "marketing",
    icon: LineChart,
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence and reach.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate('/services', { state: { activeService: serviceId } });
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored for Humboldt County businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="p-6 rounded-lg border border-gray-200 hover:border-parascape-green transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-parascape-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-parascape-green/20 transition-colors">
                <service.icon className="w-6 h-6 text-parascape-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;