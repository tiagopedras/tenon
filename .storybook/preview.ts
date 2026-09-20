import type { Preview } from '@storybook/react-vite';
import '../dist/tenon.css';
import './preview.css';

/* Stories render against the built token file consumers get, so
   `npm run storybook` builds it first. The toolbar switch sets data-theme
   on the root, the same way a consumer's own toggle would. */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'system' },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      const theme = context.globals.theme;
      if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
      else root.removeAttribute('data-theme');
      return Story();
    },
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { disabled: true },
  },
};

export default preview;
