import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lseat.eu',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [tailwind(), sitemap()],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});