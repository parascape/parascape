import { describe, it, expect } from 'vitest';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

interface SubmissionResponse {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
  status: string;
  email_sent: boolean;
  email_sent_at: string | null;
  error_message: string | null;
}

interface R2WorkerResponse {
  success: boolean;
  data: SubmissionResponse[];
}

const TEST_FORM_DATA: ContactFormData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '(707) 362-6816',
  message: 'This is a test message',
  type: 'contact'
};

const TIMEOUT = 30000; // 30 seconds
const RETRY_DELAY = 1000; // 1 second

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://hpuqzerpfylevdfwembv.supabase.co';
const R2_WORKER_URL = process.env.R2_WORKER_URL || 'https://r2.parascape.org';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://www.parascape.org';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo';

async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  throw lastError;
}

describe('Contact Form Submission Flow', () => {
  let submissionId: string;

  // First, submit the form data to R2 Worker
  it('should submit form data to R2 Worker', async () => {
    const response = await retry(async () => {
      const res = await fetch(`${R2_WORKER_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': ALLOWED_ORIGIN
        },
        body: JSON.stringify(TEST_FORM_DATA)
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('R2 Worker response:', error);
        throw new Error(`Failed to submit to R2: ${res.status} ${res.statusText} - ${error}`);
      }

      return res;
    });

    const data = await response.json() as R2WorkerResponse;
    console.log('R2 Worker response:', data);
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('data');
    expect(data.data[0]).toHaveProperty('id');
    submissionId = data.data[0].id;
  }, TIMEOUT);

  // Then check if the submission was stored in Supabase
  it('should verify submission in Supabase', async () => {
    // Wait a bit for the R2 Worker to process and store in Supabase
    await new Promise(resolve => setTimeout(resolve, 5000));

    const response = await retry(async () => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?id=eq.${submissionId}`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('Status check response:', error);
        throw new Error(`Failed to check status: ${res.status} ${res.statusText} - ${error}`);
      }

      return res;
    });

    const data = await response.json() as SubmissionResponse[];
    console.log('Supabase status:', data[0]);
    
    // Verify the submission data
    expect(data[0]).toHaveProperty('id', submissionId);
    expect(data[0].name).toBe(TEST_FORM_DATA.name);
    expect(data[0].email).toBe(TEST_FORM_DATA.email);
    expect(data[0].phone).toBe(TEST_FORM_DATA.phone);
    expect(data[0].message).toBe(TEST_FORM_DATA.message);
    expect(data[0].type).toBe(TEST_FORM_DATA.type);

    // Check email status
    expect(data[0]).toHaveProperty('status');
    expect(['pending', 'processed', 'failed']).toContain(data[0].status);
    
    if (data[0].status === 'processed') {
      expect(data[0].email_sent).toBe(true);
      expect(data[0].email_sent_at).not.toBeNull();
      expect(data[0].error_message).toBeNull();
    } else if (data[0].status === 'failed') {
      expect(data[0].email_sent).toBe(false);
      expect(data[0].email_sent_at).toBeNull();
      expect(data[0].error_message).not.toBeNull();
      console.error('Email sending failed:', data[0].error_message);
    }
  }, TIMEOUT);
});