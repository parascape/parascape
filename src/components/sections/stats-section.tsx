import { ParallaxSection } from '../ui/parallax-section';
import { CountUpCard } from '../ui/count-up-card';

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
  }
];

export function StatsSection() {
  return (
    <ParallaxSection
      image="/assets/images/sections/stats-bg.jpg"
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
  );
} 