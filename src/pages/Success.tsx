import { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const { formType } = location.state || {};
  
  // Track page view
  useEffect(() => {
    // You could add additional analytics tracking here if needed
  }, []);

  // If user navigates directly to success page without state, redirect to home
  if (!formType) {
    return <Navigate to="/" replace />;
  }

  const isAuditRequest = formType === 'audit_request';

  return (
    <>
      <Helmet>
        <title>Submission Received - Parascape</title>
        <meta
          name="description"
          content="Thank you for your submission. We've received your message and will be in touch soon."
        />
      </Helmet>

      <div className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
        <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-parascape-green" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">Thank You!</h1>
          
          <p className="text-gray-600">
            {isAuditRequest
              ? "We've received your audit request and will analyze your digital presence. Expect your comprehensive audit within 24 hours."
              : "We've received your message and appreciate your interest. Our team will be in touch with you shortly."}
          </p>
          
          <div className="pt-4">
            <Button asChild className="bg-parascape-green hover:bg-parascape-green/90">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
