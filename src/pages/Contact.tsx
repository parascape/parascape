import { Suspense } from "react";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ContactForm } from "@/components/ContactForm";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/features/error/ErrorBoundary";

const Contact = () => {
  const { type } = useParams();

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{type === 'audit' ? 'Digital Audit Request' : 'Contact Us'} - Parascape</title>
        <meta 
          name="description" 
          content={type === 'audit' 
            ? 'Request a comprehensive digital audit for your business from Parascape.' 
            : 'Get in touch with Parascape for your digital transformation needs.'}
        />
      </Helmet>

      <div className="py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {type === 'audit' ? 'Request Digital Audit' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {type === 'audit'
              ? 'Let us analyze your digital presence and identify opportunities for growth.'
              : 'Have a project in mind? We\'d love to hear from you.'}
          </p>
        </div>

        <Suspense 
          fallback={
            <div className="max-w-2xl mx-auto p-8">
              <Loading variant="skeleton" />
            </div>
          }
        >
          <div className="max-w-2xl mx-auto">
            <ContactForm type={type} />
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Contact;