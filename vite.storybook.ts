import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* Storybook gets its own config because the default lookup would find
   vite.config.ts, which is library mode and would try to build a bundle. */
export default defineConfig({
  plugins: [react()],
});
