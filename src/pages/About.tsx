import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LinkedInIcon, TwitterIcon } from "@/components/icons/icons";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { TeamSection } from "@/components/sections/team-section";
import { Helmet } from 'react-helmet-async';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';
import { DigitalAuditCTA } from '@/components/features/marketing';

const team = [
  {
    name: "Matthew Haines",
    role: "Co-founder",
    image: "/assets/images/team/Matthew.jpg",
    bio: "After a brief time at Adobe, Matthew left the tech world behind to pursue his true calling in music with Famous in Russia and Template. The corporate path never felt right, but the technical knowledge proved invaluable. Now he channels that experience into building platforms that help artists thrive in a digital world that often feels stacked against them."
  },
  {
    name: "Brendan Balsley",
    role: "Founder",
    image: "/assets/images/team/Brendan.jpg",
    bio: "A musician at heart and entrepreneur by necessity, Brendan recognized early on that art doesn't sustain itself without industry support. Surrounded by talented musicians with dreams bigger than their resources, he founded Parascape to bridge the gap between artistic vision and commercial success. His mission is to provide fellow artists with the tools and platform they need to share their music with the world."
  }
];

const values = [
  {
    title: 'Local Focus',
    description: 'We understand the unique needs of businesses in Humboldt County and create solutions that work for our community.'
  },
  {
    title: 'Innovation',
    description: 'We stay ahead of digital trends to provide our clients with cutting-edge solutions that drive results.'
  },
  {
    title: 'Transparency',
    description: 'We believe in clear communication and keeping our clients informed every step of the way.'
  },
  {
    title: 'Results-Driven',
    description: 'Our success is measured by the growth and success of our clients\' businesses.'
  }
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

      <div className="py-12 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">About Parascape</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're a team of digital experts passionate about helping local businesses succeed online.
          </p>
        </div>

        <Suspense fallback={<Loading variant="skeleton" />}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600">
                At Parascape, we're committed to helping Humboldt County businesses thrive in the digital landscape. We combine local expertise with cutting-edge technology to deliver solutions that drive real results.
              </p>
              <p className="text-gray-600">
                Our team brings together years of experience in web development, digital marketing, and business strategy to provide comprehensive digital solutions tailored to your needs.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/about/office.jpg"
                alt="Parascape office"
                aspectRatio="4:3"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div 
                  key={value.title}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-parascape-green mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {team.map((member) => (
                <div 
                  key={member.name}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    aspectRatio="square"
                    className="w-full"
                  />
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-parascape-green font-medium">{member.role}</p>
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