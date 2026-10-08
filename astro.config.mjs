import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.maler-hantke.de',
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
