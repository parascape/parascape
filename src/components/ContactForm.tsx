import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';
import { sendContactEmails } from '@/lib/email';

interface ContactFormProps {
  type?: 'contact' | 'audit';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  type: 'contact'
};

export default function ContactForm({ type = 'contact' }: ContactFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ ...initialFormData, type });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Phone number must have at least 10 digits';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await sendContactEmails(formData);

      if (!response.success) {
        throw new Error(response.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', response);
      analytics.track({
        name: 'form_submit',
        properties: {
          form_type: type,
          success: true
        }
      });

      toast.success('Message received! We will get back to you soon.');
      navigate('/success');
      setFormData(initialFormData);
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      
      if (errorMessage.includes('Rate limit exceeded')) {
        toast.error('Too many attempts. Please try again later.');
      } else {
        toast.error(`Error submitting form: ${errorMessage}`);
      }
      
      analytics.track({
        name: 'form_submit',
        properties: {
          form_type: type,
          success: false,
          error: errorMessage
        }
      });
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
              className={`mt-1 block w-full rounded-md border ${
                fieldErrors.name ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm`}
              placeholder="Your name"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border ${
                fieldErrors.email ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm`}
              placeholder="your.email@example.com"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border ${
                fieldErrors.phone ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm`}
              placeholder="(707) 362-6816"
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.phone}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border ${
                fieldErrors.message ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-parascape-green focus:ring-parascape-green sm:text-sm`}
              placeholder="Tell us about your project..."
            />
            {fieldErrors.message && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.message}</p>
            )}
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