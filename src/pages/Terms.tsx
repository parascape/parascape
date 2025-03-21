import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loading } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/features/error';

export default function Terms() {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Terms of Service - Parascape</title>
        <meta name="description" content="Terms and conditions for using Parascape's services" />
      </Helmet>

      <Suspense
        fallback={
          <div className="mx-auto max-w-3xl px-4 py-16">
            <Loading variant="skeleton" />
          </div>
        }
      >
        <div className="prose mx-auto max-w-3xl px-4 py-16">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Terms of Service</h1>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Services</h2>
            <p className="mb-4 text-gray-600">
              Parascape provides digital services including web development, digital marketing, and
              branding solutions. By using our services, you agree to these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              2. Client Responsibilities
            </h2>
            <p className="mb-4 text-gray-600">As a client, you agree to:</p>
            <ul className="list-disc space-y-2 pl-6 text-gray-600">
              <li>Provide accurate and timely information</li>
              <li>Review and provide feedback promptly</li>
              <li>Pay for services as agreed</li>
              <li>Comply with all applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Intellectual Property</h2>
            <p className="text-gray-600">
              Upon full payment, you will own the rights to the final deliverables. However,
              Parascape retains the rights to any pre-existing materials, tools, or frameworks used
              in the creation of your project.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Payment Terms</h2>
            <p className="text-gray-600">
              Payment terms are specified in your service agreement. Late payments may result in
              service suspension and additional fees.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Contact</h2>
            <p className="text-gray-600">
              For questions about these terms, please contact us at{' '}
              <a href="mailto:legal@parascape.org" className="text-parascape-green hover:underline">
                legal@parascape.org
              </a>
            </p>
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
