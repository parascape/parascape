import { Helmet } from 'react-helmet-async';
import { Image } from '@/components/ui/image';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';
import { DigitalAuditCTA } from '@/components/features/marketing';

const stories = [
  {
    title: 'Local Restaurant Chain',
    subtitle: 'Digital Transformation Success',
    image: '/images/success-stories/restaurant.jpg',
    description: 'How we helped a local restaurant chain increase online orders by 200% through a new website and digital marketing strategy.',
    results: [
      'Online orders increased by 200%',
      'Social media following grew by 5x',
      'Customer engagement up 150%',
      'Reduced marketing costs by 30%'
    ]
  },
  {
    title: 'Retail Boutique',
    subtitle: 'E-commerce Growth Story',
    image: '/images/success-stories/boutique.jpg',
    description: 'Transforming a local boutique into a thriving online store with nationwide reach.',
    results: [
      'Revenue increased by 150%',
      'New customer acquisition up 80%',
      'Cart abandonment reduced by 40%',
      'Return customer rate improved by 60%'
    ]
  },
  {
    title: 'Professional Services Firm',
    subtitle: 'Brand Modernization',
    image: '/images/success-stories/professional.jpg',
    description: 'Modernizing a traditional firm\'s brand and digital presence for the contemporary market.',
    results: [
      'Lead generation increased by 120%',
      'Website traffic up by 200%',
      'Conversion rate improved by 45%',
      'Brand recognition enhanced significantly'
    ]
  }
];

export default function SuccessStories() {
  return (
    <>
      <Helmet>
        <title>Success Stories - Parascape</title>
        <meta 
          name="description" 
          content="Discover how we've helped businesses achieve their digital goals through our web development and marketing services." 
        />
      </Helmet>

      <div className="py-12 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results for real businesses. See how we've helped our clients achieve their digital goals.
          </p>
        </div>

        <Suspense fallback={<Loading variant="skeleton" />}>
          <div className="space-y-12">
            {stories.map((story, index) => (
              <div 
                key={story.title}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex`}
              >
                <div className="lg:w-1/2">
                  <Image
                    src={story.image}
                    alt={story.title}
                    aspectRatio="16:9"
                    className="h-full w-full"
                  />
                </div>
                <div className="p-8 lg:w-1/2 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-gray-900">{story.title}</h3>
                    <p className="text-parascape-green font-medium">{story.subtitle}</p>
                  </div>
                  <p className="text-gray-600">{story.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Results:</h4>
                    <ul className="space-y-2">
                      {story.results.map((result) => (
                        <li key={result} className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-parascape-green rounded-full mr-2" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Suspense>

        <div className="mt-16">
          <DigitalAuditCTA />
        </div>
      </div>
    </>
  );
}