import { EmailData } from './templates.ts';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateFormData(data: unknown): asserts data is EmailData {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid form data');
  }

  const { name, email, phone, message, type } = data as Record<string, unknown>;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ValidationError('Name is required');
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    throw new ValidationError('Valid email is required');
  }

  if (!phone || typeof phone !== 'string' || !isValidPhone(phone)) {
    throw new ValidationError('Valid phone number is required');
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new ValidationError('Message is required');
  }

  if (!type || typeof type !== 'string' || !['contact', 'audit'].includes(type)) {
    throw new ValidationError('Valid form type is required');
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, '').length >= 10;
} 