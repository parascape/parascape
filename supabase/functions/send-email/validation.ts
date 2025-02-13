import { EmailData } from './templates';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  // Check if the cleaned phone number has at least 10 digits
  return cleanPhone.length >= 10;
}

export function validateFormData(data: Partial<EmailData>): asserts data is EmailData {
  if (!data.name?.trim()) {
    throw new ValidationError('Name is required');
  }

  if (!data.email?.trim()) {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(data.email)) {
    throw new ValidationError('Invalid email format');
  }

  if (!data.phone?.trim()) {
    throw new ValidationError('Phone number is required');
  }

  if (!validatePhone(data.phone)) {
    throw new ValidationError('Invalid phone number format');
  }

  if (!data.message?.trim()) {
    throw new ValidationError('Message is required');
  }

  if (!data.type?.trim()) {
    throw new ValidationError('Form type is required');
  }
} 