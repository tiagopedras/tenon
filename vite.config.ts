import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

/* Library mode. React is a peer, not a dependency, so an app that already
   has React does not get a second copy. Component CSS is collected into
   one dist/tenon-react.css rather than injected at runtime, so a page can
   load it in the cascade alongside the token file. */
export default defineConfig({
  plugins: [react(), dts({ include: ['src'], outDir: 'dist/types' })],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'tenon-react.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (info) =>
          info.names?.[0]?.endsWith('.css') ? 'tenon-react.css' : '[name][extname]',
      },
    },
  },
});
