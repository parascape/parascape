import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';
import { config } from '@/config/environment';

interface ContactFormProps {
  type?: 'contact' | 'audit';
}

export default function ContactForm({ type = 'contact' }: ContactFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);

          try {
            const response = await fetch(config.api.formSubmission, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(formData)
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              const text = await response.text();
              throw new Error('Unexpected response format from server');
            }

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || `Failed to submit form: ${response.status}`);
            }

            analytics.track({
              name: 'form_submit',
              properties: {
                form_type: type,
                success: true
              }
            });

            navigate('/success');
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: '',
              type
            });
          } catch (error) {
            analytics.track({
              name: 'form_submit',
              properties: {
                form_type: type,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
              }
            });

            toast.error(
              error instanceof Error
                ? error.message
                : 'Failed to send message. Please try again.'
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="space-y-6 bg-white p-4 sm:p-8 rounded-2xl shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm"
              placeholder="(707) 362-6816"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm"
              placeholder="Tell us about your project..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-parascape-green text-white py-3 px-6 rounded-md font-semibold hover:bg-parascape-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}