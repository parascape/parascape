import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ContactForm } from '@/components/ContactForm';
import { Loading } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/features/error';

const Contact = () => {
  const { type } = useParams<{ type?: 'contact' | 'audit' }>();

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{type === 'audit' ? 'Digital Audit Request' : 'Contact Us'} - Parascape</title>
        <meta
          name="description"
          content={
            type === 'audit'
              ? 'Request a comprehensive digital audit for your business from Parascape.'
              : 'Get in touch with Parascape for your digital transformation needs.'
          }
        />
      </Helmet>

      <div className="space-y-8 py-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {type === 'audit' ? 'Request Digital Audit' : 'Contact Us'}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {type === 'audit'
              ? 'Let us analyze your digital presence and identify opportunities for growth.'
              : "Have a project in mind? We'd love to hear from you."}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl p-8">
              <Loading variant="skeleton" />
            </div>
          }
        >
          <div className="mx-auto max-w-2xl">
            <ContactForm type={type as 'contact' | 'audit' | undefined} />
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Contact;
