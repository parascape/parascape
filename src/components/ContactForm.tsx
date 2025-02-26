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
    .transform((val: string | undefined) => val === "" || !val ? undefined : val),
  about: z.string()
    .min(10, "Please provide more details about your request")
    .max(1000, "Message is too long"),
  honeypot: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>;

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
  
  const form = useForm<FormValues>({
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

  async function submitWithRetry(values: FormValues, retryCount: number = 0): Promise<Response> {
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

  async function onSubmit(values: FormValues) {
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
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="(555) 555-5555" 
                    {...field} 
                    autoComplete="tel"
                    className={form.formState.errors.phone ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How can we help? *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project or business needs..." 
                    {...field} 
                    aria-required="true"
                    rows={5}
                    className={form.formState.errors.about ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot field - hidden from users */}
          <div className="hidden">
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} tabIndex={-1} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {retryCount > 0 ? 'Retrying...' : 'Sending...'}
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}