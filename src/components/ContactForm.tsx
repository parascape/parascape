import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase, type FormData } from '@/lib/supabase';
import { analytics } from '@/lib/analytics';

interface ContactFormProps {
  type: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  type: ''
};

export default function ContactForm({ type }: ContactFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ ...initialFormData, type });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Invoking send-email Edge Function with:', formData);
      const { data, error: supabaseError } = await supabase.functions.invoke('send-email', {
        body: formData
      });

      if (supabaseError) {
        console.error('Edge Function error:', supabaseError);
        throw new Error(supabaseError.message || 'Failed to submit form');
      }

      console.log('Edge Function response:', data);
      analytics.track({
        name: 'form_submit',
        properties: {
          form_type: type,
          success: true
        }
      });

      setSuccess(true);
      toast.success('Message sent successfully!');
      navigate('/success');
      setFormData(initialFormData);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      
      analytics.track({
        name: 'form_submit',
        properties: {
          form_type: type,
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      });

      toast.error(
        err instanceof Error
          ? `Error sending message: ${err.message}`
          : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
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