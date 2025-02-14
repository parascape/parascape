import { R2Bucket, ExecutionContext } from '@cloudflare/workers-types';
import { createClient } from '@supabase/supabase-js';

interface Env {
  PARASCAPE_BUCKET: R2Bucket;
  ALLOWED_ORIGIN: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

const ALLOWED_ORIGINS = [
  'https://parascape.org',
  'https://www.parascape.org',
  'https://r2.parascape.org'
];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Verify origin
    const origin = request.headers.get('Origin');
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname.slice(1); // Remove leading slash

      // Handle form submissions
      if (path === 'submit' && request.method === 'POST') {
        const formData: ContactFormData = await request.json();
        const submissionId = crypto.randomUUID();
        
        // Step 1: Store in R2
        await env.PARASCAPE_BUCKET.put(`submissions/${submissionId}.json`, JSON.stringify(formData), {
          httpMetadata: {
            contentType: 'application/json'
          }
        });
        
        // Step 2: Retrieve from R2
        const storedObject = await env.PARASCAPE_BUCKET.get(`submissions/${submissionId}.json`);
        if (!storedObject) {
          return new Response(JSON.stringify({ error: 'Failed to store submission' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': origin,
            },
          });
        }

        const storedData = JSON.parse(await storedObject.text()) as ContactFormData;
        
        // Step 3: Submit to Supabase
        const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([
            {
              id: submissionId,
              name: storedData.name,
              email: storedData.email,
              phone: storedData.phone,
              message: storedData.message,
              type: storedData.type,
              status: 'pending'
            }
          ])
          .select();

        if (error) {
          console.error('Supabase error:', error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': origin,
            },
          });
        }

        return new Response(JSON.stringify({ success: true, data }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
          },
        });
      }

      // Handle file uploads
      if (!path) {
        return new Response('Key is required', { status: 400 });
      }

      if (request.method === 'GET') {
        const object = await env.PARASCAPE_BUCKET.get(path);
        
        if (!object) {
          return new Response('Object Not Found', { status: 404 });
        }

        const headers = new Headers();
        if (object.httpMetadata) {
          Object.entries(object.httpMetadata).forEach(([key, value]) => {
            headers.set(key, value);
          });
        }
        headers.set('etag', object.httpEtag);
        headers.set('Access-Control-Allow-Origin', origin);
        
        const arrayBuffer = await object.arrayBuffer();
        return new Response(arrayBuffer, {
          headers,
        });
      }

      if (request.method === 'POST') {
        if (!request.body) {
          return new Response('Request body is required', { status: 400 });
        }

        const arrayBuffer = await request.arrayBuffer();
        await env.PARASCAPE_BUCKET.put(path, arrayBuffer, {
          httpMetadata: Object.fromEntries(request.headers),
        });

        return new Response('Successfully uploaded', {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': origin,
          },
        });
      }

      return new Response('Method not allowed', { 
        status: 405,
        headers: {
          'Allow': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Origin': origin,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || env.ALLOWED_ORIGIN,
        },
      });
    }
  },
}; 