import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';
import { Resend } from 'resend';

const resend = new Resend('re_E67XP4W1_71WZWZ5tAvzDepCDJsqHTjtq');

export default function ContactForm({ type = 'contact' }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type
  });

  const handleChange = (e) => {
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
            console.log('Form submission started with data:', formData);
            
            // Create email content
            const userEmailContent = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Thank you for contacting Parascape</title>
                </head>
                <body style="font-family: system-ui, sans-serif; color: #1f2937;">
                  <h1 style="color: #059669;">Thank you for reaching out, ${formData.name}!</h1>
                  <p>We've received your ${formData.type} request and will get back to you as soon as possible.</p>
                  <p>Here's a copy of your message:</p>
                  <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0;">
                    ${formData.message}
                  </div>
                  <p>Best regards,<br><strong>The Parascape Team</strong></p>
                </body>
              </html>
            `;

            const adminEmailContent = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>New Contact Form Submission</title>
                </head>
                <body style="font-family: system-ui, sans-serif; color: #1f2937;">
                  <h1 style="color: #059669;">New ${formData.type} Form Submission</h1>
                  <h2>Contact Details:</h2>
                  <ul>
                    <li><strong>Name:</strong> ${formData.name}</li>
                    <li><strong>Email:</strong> ${formData.email}</li>
                    <li><strong>Phone:</strong> ${formData.phone}</li>
                    <li><strong>Form Type:</strong> ${formData.type}</li>
                  </ul>
                  <h2>Message:</h2>
                  <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0;">
                    ${formData.message}
                  </div>
                </body>
              </html>
            `;

            // Send both emails concurrently
            const [userResult, adminResult] = await Promise.all([
              // Send confirmation to user
              resend.emails.send({
                from: 'contact@parascape.org',
                to: formData.email,
                subject: 'Thank you for contacting Parascape',
                html: userEmailContent
              }),
              // Send notification to admin
              resend.emails.send({
                from: 'contact@parascape.org',
                to: 'contact@parascape.org',
                subject: `New ${formData.type} Form Submission from ${formData.name}`,
                html: adminEmailContent,
                reply_to: formData.email
              })
            ]);

            console.log('Email responses:', { user: userResult, admin: adminResult });

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
            console.error('Form submission error:', error);
            
            analytics.track({
              name: 'form_submit',
              properties: {
                form_type: type,
                success: false,
                error: error.message || 'Unknown error'
              }
            });

            toast.error(
              error instanceof Error
                ? `Error sending message: ${error.message}`
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