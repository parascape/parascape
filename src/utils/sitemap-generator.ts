import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SitemapImage {
  loc: string;
  caption?: string;
  title?: string;
}

interface SitemapURL {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: SitemapImage[];
}

const routes: SitemapURL[] = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      {
        loc: 'https://parascape.com/hero-image.jpg',
        caption: 'Parascape Digital Solutions',
        title: 'Digital Solutions for Humboldt County',
      },
    ],
  },
  {
    url: '/services',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/success-stories',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
  },
];

export async function generateSitemap(domain: string = 'https://parascape.com') {
  const today = new Date().toISOString().split('T')[0];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    route => `  <url>
    <loc>${domain}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  try {
    const publicDir = join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}
