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
import { analytics } from '@/lib/analytics';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  business: z.string().min(1, "Business name is required"),
  phone: z.string().optional(),
  about: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional() // Hidden field for spam detection
})

export function ContactForm() {
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
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('https://hjhpcawffvgcczhxcjsr.supabase.co/functions/v1/handle-form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit form');
      }

      analytics.track({
        name: 'form_submission',
        properties: {
          form: 'contact',
          business: values.business
        }
      });

      toast.success("Thank you for your message! We'll be in touch soon.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg animate-fade-up">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-parascape-green">Get in Touch</h2>
        <p className="text-gray-500">
          Ready to transform your business? Let's start a conversation.
        </p>
        <p className="text-sm text-gray-400">* Required fields</p>
      </div>
      
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
                    placeholder="(555) 123-4567" 
                    {...field} 
                    autoComplete="tel"
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
                    className="min-h-[120px]"
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
              className="w-full bg-parascape-green hover:bg-parascape-green/90 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Start Your Digital Transformation
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}