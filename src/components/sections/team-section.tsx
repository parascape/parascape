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
  }
];

export function TeamSection() {
  return (
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
  );
} 