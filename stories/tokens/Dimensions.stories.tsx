import type { Meta, StoryObj } from '@storybook/react-vite';
import { groupBy, px, sharedAlias, sharedDescription, tokens } from './data';
import './tokens.css';

const meta = {
  title: 'Tokens/Dimensions',
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* Anything measured that is not a text style or a colour. Today that is the
   dimension scale and the breakpoints; a new group lands here on its own. */
const groups = groupBy(
  Object.keys(tokens.primitives).filter((k) => !/^(color|typography)\./.test(k)),
);
const radii = Object.keys(tokens.shared).filter((k) => k.startsWith('radius.'));

/* A bar wider than this is a sentinel rather than a size, like
   dimension.full, and is named rather than drawn. */
const DRAWABLE = 2000;

const SCALE: Record<string, { factor: number; note: string }> = {
  breakpoint: { factor: 0.25, note: 'Drawn at a quarter of their width, so the widest fits.' },
};

function Bars({ group, keys }: { group: string; keys: string[] }) {
  const { factor, note } = SCALE[group] ?? { factor: 1, note: 'Drawn at full size.' };
  const sorted = [...keys].sort((a, b) => px(tokens.primitives[a]) - px(tokens.primitives[b]));
  return (
    <section className="tk-section">
      <h2 className="tenon-heading-2">{group}</h2>
      <p>{note}</p>
      <div className="tk-scale">
        {sorted.map((k) => {
          const value = tokens.primitives[k];
          const n = px(value);
          return (
            <div key={k} className="tk-scale__row">
              <span className="tk-code">{k}</span>
              <span className="tk-code tk-subtle">{value}</span>
              {n > DRAWABLE
                ? <span className="tenon-caption tk-subtle">Too wide to draw. It rounds anything fully.</span>
                : <div className={n === 0 ? 'tk-bar tk-bar--zero' : 'tk-bar'} style={{ width: n * factor }} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const Dimensions: Story = {
  name: 'Dimensions',
  render: () => (
    <div className="tk-page">
      <h1 className="tenon-heading-1">Dimensions</h1>
      <p>
        One scale for spacing, border width, icon size and anything else measured in pixels, the same in every
        theme. Radius names picks off it, and the breakpoints sit beside it.
      </p>
      {groups.has('dimension') && <Bars group="dimension" keys={groups.get('dimension')!} />}
      <section className="tk-section">
        <h2 className="tenon-heading-2">radius</h2>
        {sharedDescription('radius') && <p>{sharedDescription('radius')}</p>}
        <div className="tk-radii">
          {radii.map((k) => {
            const alias = sharedAlias(k);
            return (
              <div key={k} className="tk-radius">
                <div className="tk-radius__shape" style={{ borderRadius: tokens.shared[k] as string }} />
                <span className="tk-code">{k}</span>
                <span className="tk-code tk-subtle">
                  {tokens.shared[k] as string}{typeof alias === 'string' ? ` (${alias})` : ''}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      {[...groups].filter(([g]) => g !== 'dimension').map(([g, keys]) => <Bars key={g} group={g} keys={keys} />)}
    </div>
  ),
};
