import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

/* Local-only trial fonts. The folder is gitignored, and Storybook refuses a
   static directory that is not there, so it is only listed when it exists. */
const privateFonts = fileURLToPath(new URL('./fonts-private', import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  staticDirs: existsSync(privateFonts) ? [{ from: privateFonts, to: '/fonts-private' }] : [],
  framework: {
    name: '@storybook/react-vite',
    options: { builder: { viteConfigPath: 'vite.storybook.ts' } },
  },
};

export default config;
