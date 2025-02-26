<<<<<<< HEAD
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
    name: "Brendan Balsley",
    role: "Founder",
    bio: "A musician at heart and entrepreneur by necessity, Brendan recognized early on that art doesn't sustain itself without industry support. Surrounded by talented musicians with dreams bigger than their resources, he founded Parascape to bridge the gap between artistic vision and commercial success. His mission is to provide fellow artists with the tools and platform they need to share their music with the world.",
    image: "/assets/images/team/Brendan.jpg"
=======
import { motion } from 'framer-motion';
import { LinkedInIcon, TwitterIcon } from '@/components/icons/icons';
import { Image } from '@/components/ui/image';

const team = [
  {
    name: 'Brendan Balsley',
    role: 'Founder & Developer',
    image: '/assets/images/team/Brendan.jpg',
    bio: 'Full-stack developer with a passion for creating intuitive, high-performance web applications.',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Matthew Haines',
    role: 'Co-Founder & Developer',
    image: '/assets/images/team/Matthew.jpg',
    bio: 'Experienced developer specializing in creating modern, efficient web solutions.',
    social: {
      linkedin: '#',
      twitter: '#'
    }
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  }
];

export function TeamSection() {
  return (
<<<<<<< HEAD
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
=======
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            The experts behind Parascape's success
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  aspectRatio="4:3"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-parascape-green font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-parascape-green transition-colors"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-parascape-green transition-colors"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
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