import { describe, it, expect, beforeAll } from 'vitest';

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
const R2_WORKER_URL = process.env.R2_WORKER_URL || 'http://localhost:8787';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:8787';
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

  // Test the form submission to Supabase
  it('should submit form data to Supabase', async () => {
    const response = await retry(async () => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          ...TEST_FORM_DATA,
          status: 'pending'
        })
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('Supabase response:', error);
        throw new Error(`Failed to submit form: ${res.status} ${res.statusText} - ${error}`);
      }

      return res;
    });

    const data = await response.json() as SubmissionResponse[];
    console.log('Submission response:', data);
    expect(data[0]).toHaveProperty('id');
    submissionId = data[0].id;
  }, TIMEOUT);

  // Test uploading attachment to R2
  it('should upload attachment to R2', async () => {
    const testFile = new File(['Test file content'], 'test.txt', { type: 'text/plain' });
    const response = await retry(async () => {
      const res = await fetch(`${R2_WORKER_URL}/${submissionId}/attachment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Origin': ALLOWED_ORIGIN
        },
        body: testFile
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('R2 upload response:', error);
        throw new Error(`Failed to upload file: ${res.status} ${res.statusText} - ${error}`);
      }

      return res;
    });

    const result = await response.text();
    console.log('Upload response:', result);
    expect(response.status).toBe(200);
  }, TIMEOUT);

  // Test retrieving the attachment from R2
  it('should retrieve attachment from R2', async () => {
    const response = await retry(async () => {
      const res = await fetch(`${R2_WORKER_URL}/${submissionId}/attachment`, {
        method: 'GET',
        headers: {
          'Origin': ALLOWED_ORIGIN
        }
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('R2 download response:', error);
        throw new Error(`Failed to retrieve file: ${res.status} ${res.statusText} - ${error}`);
      }

      return res;
    });

    const content = await response.text();
    console.log('Download response:', content);
    expect(content).toBe('Test file content');
  }, TIMEOUT);

  // Test checking submission status
  it('should check submission status in Supabase', async () => {
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
    console.log('Status response:', data[0]);
    expect(data[0]).toHaveProperty('status');
    expect(['pending', 'processed', 'failed']).toContain(data[0].status);
  }, TIMEOUT);
});