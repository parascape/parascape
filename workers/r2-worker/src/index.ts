import { R2Bucket, ExecutionContext } from '@cloudflare/workers-types';

interface Env {
  PARASCAPE_BUCKET: R2Bucket;
  ALLOWED_ORIGIN: string;
}

const ALLOWED_ORIGINS = [
  'https://parascape.org',
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
      const key = url.pathname.slice(1); // Remove leading slash

      if (!key) {
        return new Response('Key is required', { status: 400 });
      }

      if (request.method === 'GET') {
        const object = await env.PARASCAPE_BUCKET.get(key);
        
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
        await env.PARASCAPE_BUCKET.put(key, arrayBuffer, {
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
      return new Response('Internal Server Error', { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': origin || env.ALLOWED_ORIGIN,
        },
      });
    }
  },
}; 