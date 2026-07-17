import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';
import { generateSeoHtml } from './seo-plugin.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression(), generateSeoHtml()],
})
