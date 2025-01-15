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
import { apiClient } from '@/lib/api-client';
import { analytics } from '@/lib/analytics';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().min(1, "Business name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await apiClient.submitContactForm(values);
      analytics.track({
        name: 'form_submission',
        properties: {
          form: 'contact',
          businessName: values.businessName
        }
      });
      toast.success("Thank you for your message! We'll be in touch soon.");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Business LLC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your business and what you're looking for..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-parascape-green hover:bg-parascape-green/90"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  )
}