<<<<<<< HEAD
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { analytics } from '@/lib/analytics'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { config } from '@/config/environment'

const formSchema = z.object({
  name: z.string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email is too long"),
  business: z.string()
    .min(1, "Please enter your business name")
    .max(100, "Business name is too long"),
  phone: z.string()
    .max(20, "Phone number is too long")
    .optional()
    .transform(val => val === "" ? undefined : val),
  about: z.string()
    .min(10, "Please provide more details about your request")
    .max(1000, "Message is too long"),
  honeypot: z.string().optional()
})

interface ContactFormProps {
  type?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function ContactForm({ type }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitLock = useRef(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      phone: "",
      about: "",
      honeypot: ""
    },
    mode: "onBlur"
  });

  const isAuditRequest = type === 'audit';

  useEffect(() => {
    if (isAuditRequest) {
      form.setValue('about', 'I would like to request a free digital presence audit for my business.');
    }
  }, [isAuditRequest, form]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async function submitWithRetry(values: z.infer<typeof formSchema>, retryCount: number = 0): Promise<Response> {
    try {
      const response = await fetch(config.api.formSubmission, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          ...values,
          type: isAuditRequest ? 'audit_request' : 'contact'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.error === 'Too many submissions. Please try again later.') {
          throw new Error('Rate limit exceeded. Please try again in a few minutes.');
        }
        throw new Error(error.message || 'Failed to submit form');
      }

      return response;
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        setRetryCount(retryCount + 1);
        await delay(RETRY_DELAY * Math.pow(2, retryCount));
        return submitWithRetry(values, retryCount + 1);
      }
      throw error;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Prevent multiple submissions
    if (submitLock.current) return;
    submitLock.current = true;
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await submitWithRetry(values);
      const data = await response.json();

      analytics.track({
        name: 'form_submission',
        properties: {
          form: isAuditRequest ? 'audit_request' : 'contact',
          business: values.business
        }
      });

      toast.success(
        isAuditRequest
          ? "Thank you! We'll send your audit within 24 hours."
          : "Thank you for your message! We'll be in touch soon."
      );
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "We're having trouble submitting your form. Please try again.";
      
      setSubmitError(errorMessage);
      toast.error(errorMessage);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setRetryCount(0);
      // Release the lock after a short delay to prevent double submissions
      setTimeout(() => {
        submitLock.current = false;
      }, 1000);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg animate-fade-up">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-parascape-green">
          {isAuditRequest ? 'Request Your Free Audit' : 'Get in Touch'}
        </h2>
        <p className="text-gray-500">
          {isAuditRequest
            ? "We'll analyze your digital presence and provide actionable insights."
            : "Ready to transform your business? Let's start a conversation."
          }
        </p>
        <p className="text-sm text-gray-400">* Required fields</p>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-red-700">{submitError}</p>
            <p className="text-xs text-red-500 mt-1">
              Please try again or contact us directly at contact@parascape.com
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    aria-required="true"
                    autoComplete="name"
                    className={form.formState.errors.name ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    {...field} 
                    aria-required="true"
                    autoComplete="email"
                    className={form.formState.errors.email ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your Business LLC" 
                    {...field} 
                    aria-required="true"
                    autoComplete="organization"
                    className={form.formState.errors.business ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="1(707)362-6816" 
                    {...field} 
                    autoComplete="tel"
                    className={form.formState.errors.phone ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500">Optional, but recommended for faster communication</p>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your business goals and how we can help..."
                    className={`min-h-[120px] ${form.formState.errors.about ? "border-red-500" : ""}`}
                    {...field}
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            tabIndex={-1}
            {...form.register("honeypot")}
            style={{ position: 'absolute', left: '-9999px' }}
            aria-hidden="true"
          />
          
          <div className="space-y-4">
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our{" "}
              <a href="/privacy" className="text-parascape-green hover:underline">Privacy Policy</a>
            </p>
            
            <Button 
              type="submit" 
              className="w-full bg-parascape-green hover:bg-parascape-green/90 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {retryCount > 0 ? `Retrying... (${retryCount}/${MAX_RETRIES})` : 'Submitting...'}
                </>
              ) : (
                'Start Your Digital Transformation'
              )}
            </Button>
          </div>
        </form>
      </Form>
=======
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
      errors.phone = 'Please enter a valid phone number in the format (XXX) XXX-XXXX';
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
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
    </div>
  );
}