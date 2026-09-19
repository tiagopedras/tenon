import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* The playground is a plain Vite app pointed at src/, so a component edit
   shows up without a library build in between. */
export default defineConfig({
  root: 'playground',
  plugins: [react()],
  server: { port: 5199, open: false },
});
