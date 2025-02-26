import { config } from '@/config/environment';

type ContactFormData = {
  name: string;
  email: string;
  businessName: string;
  message: string;
};

export const apiClient = {
  async submitContactForm(data: ContactFormData) {
    const response = await fetch(config.api.formSubmission, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return response.json();
  },
};
