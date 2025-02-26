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
      twitter: '#',
    },
  },
  {
    name: 'Matthew Haines',
    role: 'Co-Founder & Developer',
    image: '/assets/images/team/Matthew.jpg',
    bio: 'Experienced developer specializing in creating modern, efficient web solutions.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

export function TeamSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="mt-4 text-xl text-gray-600">The experts behind Parascape's success</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  aspectRatio="4:3"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mb-3 font-medium text-parascape-green">{member.role}</p>
                <p className="mb-4 text-gray-600">{member.bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-parascape-green"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-parascape-green"
                  >
                    <TwitterIcon className="h-5 w-5" />
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
