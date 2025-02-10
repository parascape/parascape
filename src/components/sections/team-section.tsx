import { ParallaxSection } from '../ui/parallax-section';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matthew Haines",
    role: "Co-founder",
    bio: "After a brief time at Adobe, Matthew left the tech world behind to pursue his true calling in music with Famous in Russia and Template. The corporate path never felt right, but the technical knowledge proved invaluable. Now he channels that experience into building platforms that help artists thrive in a digital world that often feels stacked against them.",
    image: "/assets/images/team/Matthew.jpg"
  },
  {
    name: "Parascape Records",
    role: "The Vision",
    bio: "\"Parascape became everything a Humboldt artist needed to launch their art beyond the Redwood Curtain. Parascape became what I needed when I was 18, playing every show I could, and then on top of that organizing and throwing more shows so that my musicians could play more.\" - Brendan Balsley",
    image: "/assets/images/sections/Mountain-Vista.jpg"
  },
  {
    name: "Brendan Balsley",
    role: "Co-founder",
    bio: "A musician at heart and entrepreneur by necessity, Brendan recognized early on that art doesn't sustain itself without industry support. Surrounded by talented musicians with dreams bigger than their resources, he founded Parascape to bridge the gap between artistic vision and commercial success. His mission is to provide fellow artists with the tools and platform they need to share their music with the world.",
    image: "/assets/images/team/Brendan.jpg"
  }
];

export function TeamSection() {
  return (
    <ParallaxSection
      image="/assets/images/sections/Shadows.jpg"
      title="Our Story"
      subtitle="Where Technology Meets Artistry"
      className="py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative group"
          >
            <div className="aspect-square overflow-hidden rounded-lg mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-parascape-green font-semibold mb-4">
                {member.role}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </ParallaxSection>
  );
} 