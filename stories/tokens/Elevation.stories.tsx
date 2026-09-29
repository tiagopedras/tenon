import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../../src';
import { THEMES, cssName, themeScope, tokens } from './data';
import './tokens.css';

const meta = {
  title: 'Tokens/Elevation',
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const elevations = Object.keys(tokens.themes.light).filter((k) => k.startsWith('elevation.'));

export const Elevation: Story = {
  name: 'Elevation',
  render: () => (
    <div className="tk-page">
      <h1 className="tenon-heading-1">Elevation</h1>
      <p>
        {elevations.length} shadows, each on a Card in light, dark and 1984. Each panel is painted in its own
        theme whatever the toolbar says, because a shadow is a theme token and changes with the theme.
      </p>
      {elevations.map((k) => (
        <section key={k} className="tk-section">
          <h2 className="tenon-heading-2">{k}</h2>
          <div className="tk-scroll">
            <div className="tk-elev">
              {THEMES.map((t) => (
                <div key={t} className="tk-elev__panel" style={themeScope(t, true)}>
                  <span className="tenon-label">{t}</span>
                  <Card
                    elevation="raised"
                    style={{ boxShadow: `var(${cssName(k)})` }}
                    title={k.replace(/^elevation\./, '')}
                    summary="A card with this shadow on the theme's page background."
                  />
                  <span className="tk-code">{tokens.themes[t][k]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
};
