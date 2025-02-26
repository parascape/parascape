import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loading } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/features/error';

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
          <div className="mx-auto max-w-3xl px-4 py-16">
            <Loading variant="skeleton" />
          </div>
        }
      >
        <div className="prose mx-auto max-w-3xl px-4 py-16">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Information We Collect</h2>
            <p className="mb-4 text-gray-600">
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-600">
              <li>Fill out a contact form</li>
              <li>Request a digital audit</li>
              <li>Subscribe to our newsletter</li>
              <li>Use our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              How We Use Your Information
            </h2>
            <p className="mb-4 text-gray-600">We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-6 text-gray-600">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Analyze and improve our website performance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Protection</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized or unlawful processing, accidental loss,
              destruction, or damage.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our privacy practices, please contact us at{' '}
              <a
                href="mailto:privacy@parascape.org"
                className="text-parascape-green hover:underline"
              >
                privacy@parascape.org
              </a>
            </p>
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
