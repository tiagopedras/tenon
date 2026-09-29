import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { groupBy, tokens } from './data';
import './tokens.css';

const meta = {
  title: 'Tokens/Colour primitives',
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colours = Object.keys(tokens.primitives).filter((k) => k.startsWith('color.'));
const hues = groupBy(colours, 2);
/* Every row shares the longest ramp's columns, so the base colours line up
   under the steps rather than stretching across the row. */
const steps = Math.max(...[...hues.values()].map((k) => k.length));

function Swatch({ path, label }: { path: string; label: string }) {
  const hex = tokens.primitives[path];
  return (
    <div className="tk-swatch" title={path}>
      <div className="tk-swatch__chip" style={{ background: hex }} />
      <span className="tk-code">{label}</span>
      <span className="tk-code tk-subtle">{hex}</span>
    </div>
  );
}

export const ColourPrimitives: Story = {
  name: 'Colour primitives',
  render: () => (
    <div className="tk-page">
      <h1 className="tenon-heading-1">Colour primitives</h1>
      <p>
        {colours.length} colours: every ramp, one row per hue, and the base colours that sit outside them.
        Nothing but the semantic tokens should read these. From {tokens.$built}.
      </p>
      <div className="tk-scroll">
        {[...hues].map(([group, keys]) => (
          <div key={group} className="tk-ramp" style={{ '--tk-steps': steps } as CSSProperties}>
            <span className="tenon-label tk-ramp__name">{group.replace(/^color\./, '')}</span>
            {keys.map((k) => <Swatch key={k} path={k} label={k.split('.').pop()!} />)}
          </div>
        ))}
      </div>
    </div>
  ),
};
