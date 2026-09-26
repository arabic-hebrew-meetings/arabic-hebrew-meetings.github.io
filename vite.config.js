import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Every .html file in the project root is its own page (multi-page app).
// Static files that must be served unchanged (legacy scripts, css, images) live in public/.
const pages = Object.fromEntries(
  readdirSync(import.meta.dirname)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [file.replace(/\.html$/, ''), resolve(import.meta.dirname, file)])
);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: pages,
    },
  },
});
