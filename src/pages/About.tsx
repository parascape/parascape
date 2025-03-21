import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LinkedInIcon, TwitterIcon } from '@/components/icons/icons';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { TeamSection } from '@/components/sections/team-section';
import { Helmet } from 'react-helmet-async';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';
import { DigitalAuditCTA } from '@/components/features/marketing';

const team = [
  {
    name: 'Brendan Balsley',
    role: 'Founder & Developer',
    image: '/assets/images/team/Brendan.jpg',
    bio: 'Full-stack developer with a passion for creating intuitive, high-performance web applications that help local businesses thrive in the digital space.',
  },
  {
    name: 'Matthew Haines',
    role: 'Co-Founder & Developer',
    image: '/assets/images/team/Matthew.jpg',
    bio: 'Experienced developer specializing in creating modern, efficient web solutions that drive business growth and enhance user experience.',
  },
];

const values = [
  {
    title: 'Local Focus',
    description:
      'We understand the unique needs of businesses in Humboldt County and create solutions that work for our community.',
  },
  {
    title: 'Innovation',
    description:
      'We stay ahead of digital trends to provide our clients with cutting-edge solutions that drive results.',
  },
  {
    title: 'Transparency',
    description:
      'We believe in clear communication and keeping our clients informed every step of the way.',
  },
  {
    title: 'Results-Driven',
    description: "Our success is measured by the growth and success of our clients' businesses.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Parascape</title>
        <meta
          name="description"
          content="Learn about Parascape's mission to help Humboldt County businesses thrive in the digital landscape."
        />
      </Helmet>

      <div className="space-y-16 py-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">About Parascape</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We're a team of digital experts passionate about helping local businesses succeed
            online.
          </p>
        </div>

        <Suspense fallback={<Loading variant="skeleton" />}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600">
                At Parascape, we're committed to helping Humboldt County businesses thrive in the
                digital landscape. We combine local expertise with cutting-edge technology to
                deliver solutions that drive real results.
              </p>
              <p className="text-gray-600">
                Our team brings together years of experience in web development, digital marketing,
                and business strategy to provide comprehensive digital solutions tailored to your
                needs.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/assets/images/sections/Mountain-Vista.jpg"
                alt="Humboldt landscape"
                aspectRatio="4:3"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900">Our Values</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(value => (
                <div
                  key={value.title}
                  className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <h3 className="mb-3 text-xl font-semibold text-parascape-green">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900">Our Team</h2>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {team.map(member => (
                <div
                  key={member.name}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    aspectRatio="square"
                    className="w-full"
                  />
                  <div className="space-y-2 p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="font-medium text-parascape-green">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Suspense>

        <div className="mt-16">
          <DigitalAuditCTA />
        </div>
      </div>
    </>
  );
}
