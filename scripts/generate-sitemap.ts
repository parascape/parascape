import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateSitemap } from '../src/utils/sitemap-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try {
    await generateSitemap();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 