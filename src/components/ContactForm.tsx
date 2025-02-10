import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { config } from '@/config/environment';
import { analytics } from '@/lib/analytics';

interface FormData {
  name: string;
  email: string;
  message: string;
  type?: 'contact' | 'audit';
}

interface ContactFormProps {
  type?: 'contact' | 'audit';
}

export function ContactForm({ type = 'contact' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    type: type as 'contact' | 'audit'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(config.api.formSubmission, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Track successful form submission
      analytics.track({
        name: 'form_submit',
        properties: {
          form_type: type,
          success: true
        }
      });

      toast.success('Message sent successfully! We\'ll be in touch soon.');
      setFormData({
        name: '',
        email: '',
        message: '',
        type: type as 'contact' | 'audit'
      });
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track failed form submission
      analytics.track({
        name: 'form_submit',
        properties: {
          form_type: type,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm">
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-parascape-green focus:ring-parascape-green"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-parascape-green focus:ring-parascape-green"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-parascape-green focus:ring-parascape-green"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-parascape-green text-white py-3 px-6 rounded-md font-semibold hover:bg-parascape-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}