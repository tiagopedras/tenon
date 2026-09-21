import type { Preview } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';
import '../dist/tenon.css';
import './preview.css';

/* Stories render against the built token file consumers get, so
   `npm run storybook` builds it first. The toolbar switch sets data-theme
   on the root, the same way a consumer's own toggle would.

   Docs pages that set `inline: false` draw each story in an iframe of its
   own, and Storybook loads those without the toolbar's globals, so they
   fell back to the system theme. The chosen theme is therefore kept in
   localStorage: an iframe reads it on load, and follows a change through
   the `storage` event, which fires in every other same-origin document. */
const KEY = 'tenon-storybook-theme';
const THEMES = ['light', 'dark', 'tiagopedras_2026'];

const stored = () => {
  try { return localStorage.getItem(KEY) ?? 'system'; } catch { return 'system'; }
};

const remember = (theme: string) => {
  try {
    if (theme === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch { /* storage blocked, the theme just will not carry into iframes */ }
};

const apply = (theme: string) => {
  const root = document.documentElement;
  if (THEMES.includes(theme)) root.setAttribute('data-theme', theme);
  else root.removeAttribute('data-theme');
};

window.addEventListener('storage', (e) => {
  if (e.key === KEY) apply(e.newValue ?? 'system');
});

/* A docs page with no inline story never runs the decorator below, so it
   listens for the toolbar itself. */
addons.getChannel().on('globalsUpdated', ({ globals }: { globals?: { theme?: string } }) => {
  if (!globals?.theme) return;
  remember(globals.theme);
  apply(globals.theme);
});

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
          { value: 'tiagopedras_2026', title: 'tiagopedras_2026' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: stored() },
  decorators: [
    (Story, context) => {
      remember(context.globals.theme);
      apply(context.globals.theme);
      return Story();
    },
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { disabled: true },
  },
};

export default preview;
