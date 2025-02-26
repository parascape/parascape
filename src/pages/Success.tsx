import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';

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

      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Message Received</h1>
            <div className="space-y-2">
              <p className="max-w-2xl text-xl text-gray-600">
                Thank you for reaching out. We'll review your message and get back to you as soon as
                possible.
              </p>
              <p className="text-gray-600">You'll receive a confirmation email shortly.</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-parascape-green px-8 py-3 text-base font-medium text-white transition-colors hover:bg-parascape-green/90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}
