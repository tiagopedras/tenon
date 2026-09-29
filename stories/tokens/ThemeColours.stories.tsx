import { Fragment } from 'react';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  THEMES, groupBy, shortAlias, themeAlias, themeDescription, themeScope, tokens,
  type ThemeName,
} from './data';
import './tokens.css';

const meta = {
  title: 'Tokens/Theme colours',
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* Elevation is a shadow rather than a colour, so it has a page of its own. */
const keys = Object.keys(tokens.themes.light).filter((k) => !k.startsWith('elevation.'));
const families = groupBy(keys);

const FAMILY_NOTES: Record<string, string> = {
  background: 'Fills. The status fills carry text.on-X on top; the -subtle ones are the tint a tag sits on.',
  text: 'Each on-X is drawn on its own background.X, and inverse on background.inverse, which is where they are read.',
  icon: 'Same rule as text: on-accent sits on the accent fill, inverse on the inverse fill.',
  stroke: 'Borders and outlines, drawn here as one.',
  chart: 'Ten categorical colours, one per bucket.',
  status: 'Timeline urgency: overdue and due soon, and the text of an urgent or soon tag.',
};

/* The surface a text or icon token is actually read on. */
function surfaceFor(key: string) {
  const [, name] = key.split('.');
  if (name === 'inverse') return 'background.inverse';
  const on = name.match(/^on-(.+)$/);
  return on ? `background.${on[1]}` : undefined;
}

function Glyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chip({ theme, tokenKey }: { theme: ThemeName; tokenKey: string }) {
  const values = tokens.themes[theme];
  const value = values[tokenKey];
  const family = tokenKey.split('.')[0];
  const surface = surfaceFor(tokenKey);
  const onSurface: CSSProperties = { color: value, background: surface ? values[surface] : undefined };
  if (family === 'text') return <span className="tk-chip tk-chip--ink" style={onSurface}>Aa</span>;
  if (family === 'icon') return <span className="tk-chip" style={onSurface}><Glyph /></span>;
  if (family === 'stroke') return <span className="tk-chip tk-chip--stroke" style={{ borderColor: value }} />;
  return <span className="tk-chip" style={{ background: value }} />;
}

function Cell({ theme, tokenKey }: { theme: ThemeName; tokenKey: string }) {
  const alias = themeAlias(theme, tokenKey);
  return (
    <div className="tk-cell" style={themeScope(theme)}>
      <Chip theme={theme} tokenKey={tokenKey} />
      <div className="tk-cell__values">
        <span className="tk-code">{tokens.themes[theme][tokenKey]}</span>
        <span className="tk-code">{alias ? shortAlias(alias) : 'literal'}</span>
      </div>
    </div>
  );
}

export const ThemeColours: Story = {
  name: 'Theme colours',
  render: () => (
    <div className="tk-page">
      <h1 className="tenon-heading-1">Theme colours</h1>
      <p>
        Every semantic colour, {keys.length} of them, in light, dark and 1984 side by side. Each column is
        painted in its own theme whatever the toolbar says. Under each value is the primitive it aliases,
        or literal where it carries an alpha no ramp step has. Shadows are on the Elevation page.
      </p>
      {[...families].map(([family, list]) => (
        <section key={family} className="tk-section">
          <h2 className="tenon-heading-2">{family}</h2>
          {FAMILY_NOTES[family] && <p>{FAMILY_NOTES[family]}</p>}
          <div className="tk-scroll">
            <div className="tk-table">
              <span className="tk-table__head tenon-label">Token</span>
              {THEMES.map((t) => <span key={t} className="tk-table__head tenon-label">{t}</span>)}
              {list.map((k) => (
                <Fragment key={k}>
                  <div className="tk-table__name">
                    <span className="tk-code">{k}</span>
                    {themeDescription(k) && <span>{themeDescription(k)}</span>}
                  </div>
                  {THEMES.map((t) => <Cell key={t} theme={t} tokenKey={k} />)}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
};
