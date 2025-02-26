<<<<<<< HEAD
=======
import { config } from '@/config/environment';

>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
type ContactFormData = {
  name: string;
  email: string;
  businessName: string;
  message: string;
};

export const apiClient = {
  async submitContactForm(data: ContactFormData) {
<<<<<<< HEAD
    const response = await fetch('/api/contact', {
=======
    const response = await fetch(config.api.formSubmission, {
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
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
  }
}; 