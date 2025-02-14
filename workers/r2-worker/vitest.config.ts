import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    globals: true,
    env: process.env // Pass loaded environment variables to tests
  }
}); 