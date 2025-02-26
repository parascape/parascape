import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "@/components/ui/loading";
<<<<<<< HEAD
import { ErrorBoundary } from "@/components/features/error/ErrorBoundary";
=======
import { ErrorBoundary } from "@/components/features/error";
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662

export default function Privacy() {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Privacy Policy - Parascape</title>
        <meta 
          name="description" 
          content="Learn about how Parascape handles and protects your data"
        />
      </Helmet>

      <Suspense 
        fallback={
          <div className="max-w-3xl mx-auto py-16 px-4">
            <Loading variant="skeleton" />
          </div>
        }
      >
        <div className="prose max-w-3xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Fill out a contact form</li>
              <li>Request a digital audit</li>
              <li>Subscribe to our newsletter</li>
              <li>Use our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Analyze and improve our website performance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our privacy practices, please contact us at{" "}
              <a href="mailto:privacy@parascape.org" className="text-parascape-green hover:underline">
                privacy@parascape.org
              </a>
            </p>
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
} 