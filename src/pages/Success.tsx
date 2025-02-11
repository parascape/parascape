import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <>
      <Helmet>
        <title>Message Received - Parascape</title>
        <meta 
          name="description" 
          content="Thank you for contacting Parascape. We'll be in touch soon." 
        />
      </Helmet>

      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Message Received
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Thank you for reaching out. We'll review your message and get back to you as soon as possible.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-parascape-green hover:bg-parascape-green/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
} 