import { fileURLToPath, URL } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }),
);
