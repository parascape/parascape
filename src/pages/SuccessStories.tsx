import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const caseStudies = [
    {
      id: 1,
      business: "Local Cafe",
      owner: "Sarah Johnson",
      before: "Struggling with outdated website and minimal online presence",
      after: "300% increase in online orders and improved customer engagement",
      quote: "Parascape transformed our online presence completely. Their team understood our local market and created a website that perfectly represents our brand.",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      business: "Humboldt Artisan Gallery",
      owner: "Michael Chen",
      before: "Limited reach beyond local community",
      after: "Expanded customer base nationwide through e-commerce integration",
      quote: "Thanks to Parascape's expertise, we've been able to share our local artists' work with customers across the country.",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      business: "Redwood Fitness",
      owner: "Emily Rodriguez",
      before: "Manual class booking system and paper-based management",
      after: "Streamlined digital booking platform and 50% increase in class attendance",
      quote: "The digital transformation has revolutionized how we operate. Our members love the new system!",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we've helped local businesses transform their digital presence and achieve remarkable growth.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img
                    src={study.image}
                    alt={study.business}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <CardTitle className="text-2xl text-parascape-green">{study.business}</CardTitle>
                  <CardDescription className="text-gray-600">{study.owner}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Before</h3>
                      <p className="text-gray-600">{study.before}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">After</h3>
                      <p className="text-gray-600">{study.after}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <Quote className="text-parascape-amber w-8 h-8 mb-2" />
                      <p className="italic text-gray-700">{study.quote}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button className="bg-parascape-green hover:bg-parascape-green/90 text-white px-8 py-6 text-lg">
                Start Your Success Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;