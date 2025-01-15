import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { LinkedInIcon, TwitterIcon } from "@/components/icons/icons";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-parascape-green/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-parascape-green mb-4">
            Rooted in Humboldt, Built to Endure
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            We stayed, we built, and we grew—blending creativity, strategy, and action to make a lasting impact.
          </p>
          <img 
            src="/images/humboldt-landscape.jpg" 
            alt="Humboldt landscape" 
            className="rounded-lg shadow-xl max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-parascape-green mb-6">The Parascape Story</h2>
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              In Humboldt County, where forests inspire and creativity thrives, we made a decision: to stay. While others left for bigger markets, we saw an opportunity to grow where we are rooted.
              At Parascape, we combine <span className="font-semibold">Authenticity</span>, <span className="font-semibold">Timeless Form</span>, and <span className="font-semibold">Proof of Work</span> to create systems that endure.
            </p>
            <p className="text-lg">
              Our work amplifies the voices of local businesses, artists, and brands, helping them connect with audiences beyond the Redwood Curtain.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-parascape-green mb-12 text-center">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description: "We pursue truth in every project—honest storytelling and strategy that resonates."
              },
              {
                title: "Timeless Form",
                description: "We build systems and strategies that endure, combining function with lasting impact."
              },
              {
                title: "Proof of Work",
                description: "Results matter. We measure success by action taken and tangible growth achieved."
              }
            ].map((card) => (
              <Card key={card.title} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-parascape-green">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-parascape-green mb-12 text-center">Meet the Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Brendan Balsley",
                title: "CEO & Architect of Action",
                description: "Brendan leads Parascape's execution, ensuring strategies transform into measurable success. His gift for action keeps us focused on tangible results and enduring impact.",
                image: "/images/brendan-balsley.jpg",
                linkedin: "https://linkedin.com/in/brendan-balsley",
                twitter: "https://twitter.com/brendanbalsley"
              },
              {
                name: "Matthew Haines",
                title: "Director of Media & Architect of Thought",
                description: "Matthew drives the creative vision behind Parascape's media and storytelling. His deep understanding of art, strategy, and systems ensures each project resonates with clarity and purpose.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              }
            ].map((founder) => (
              <Card key={founder.name} className="border-none shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="object-cover w-full h-64"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-parascape-green">{founder.name}</CardTitle>
                  <p className="font-semibold text-gray-600">{founder.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{founder.description}</p>
                  <div className="flex gap-4">
                    {founder.linkedin && (
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-parascape-green hover:opacity-80">
                        <LinkedInIcon className="w-5 h-5" />
                      </a>
                    )}
                    {founder.twitter && (
                      <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="text-parascape-green hover:opacity-80">
                        <TwitterIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-parascape-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Discover How Parascape Can Help</h2>
          <p className="text-lg mb-8">
            From concept to execution, we're here to amplify your vision. Explore our work and connect with us today.
          </p>
          <Button 
            asChild
            className="bg-white text-parascape-green hover:bg-gray-100"
          >
            <Link to="/success-stories">Explore Our Work</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;