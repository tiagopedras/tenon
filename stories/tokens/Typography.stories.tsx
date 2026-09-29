import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../../src';
import {
  groupBy, isTextStyle, sharedAlias, sharedDescription, shortAlias, textCss, textParts,
  themeScope, tokens, type TextStyle,
} from './data';
import './tokens.css';

const meta = {
  title: 'Tokens/Typography',
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = Object.entries(tokens.shared).filter((e): e is [string, TextStyle] => isTextStyle(e[1]));
const replaced = tokens.themeTypography['1984'] ?? {};

const SAMPLE = 'Tokens first, components later';
const LONG = 'A semantic tier exists so a value can change between themes while the name stays put. That is the whole job.';
const sampleFor = (key: string) =>
  key === 'text.code' ? 'var(--tenon-text-code-size)'
    : /body|caption/.test(key) ? LONG
      : key === 'text.stat' ? '1,984' : SAMPLE;

const PART_LABELS: [string, string][] = [
  ['size', 'size'], ['weight', 'weight'], ['line-height', 'line height'], ['letter-spacing', 'letter spacing'], ['family', 'family'],
];
const SOURCE_PART: Record<string, string> = {
  size: 'fontSize', weight: 'fontWeight', 'line-height': 'lineHeight', 'letter-spacing': 'letterSpacing', family: 'fontFamily',
};

function Parts({ style, aliases }: { style: TextStyle; aliases?: Record<string, string | undefined> }) {
  const parts = textParts(style);
  return (
    <>
      {PART_LABELS.map(([part, label]) => {
        const alias = shortAlias(aliases?.[SOURCE_PART[part]])?.replace(/^(size|weight|line-height|letter-spacing|family)\./, '');
        return (
          <span key={part} className="tk-code">
            {label} {parts[part]}{alias ? ` (${alias})` : ''}
          </span>
        );
      })}
    </>
  );
}

function TextStyleRow({ name, style }: { name: string; style: TextStyle }) {
  const override = replaced[name];
  const aliases = sharedAlias(name);
  const aliases1984 = sharedAlias(name, '1984');
  return (
    <div className="tk-type">
      <div className="tk-type__meta">
        <span className="tenon-label">{name}</span>
        {sharedDescription(name) && <span className="tenon-caption tk-subtle">{sharedDescription(name)}</span>}
        <Parts style={style} aliases={typeof aliases === 'object' ? aliases : undefined} />
      </div>
      <div className="tk-type__samples">
        <div className="tk-type__sample" style={textCss(style)}>{sampleFor(name)}</div>
        {override && (
          <div className="tk-type__override" style={themeScope('1984')}>
            <div><Tag tone="accent">1984 replaces this style</Tag></div>
            <div className="tk-type__sample" style={textCss(override)}>{sampleFor(name)}</div>
            <div className="tk-type__meta">
              <Parts style={override} aliases={typeof aliases1984 === 'object' ? aliases1984 : undefined} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* The primitive scale the styles above are assembled from. */
const scale = groupBy(Object.keys(tokens.primitives).filter((k) => k.startsWith('typography.')), 2);

function scaleSample(group: string, value: string): { style: CSSProperties; text: string } {
  switch (group) {
    case 'typography.size': return { style: { fontSize: value, lineHeight: 1.2 }, text: 'Ag' };
    case 'typography.weight': return { style: { fontWeight: Number(value) }, text: SAMPLE };
    case 'typography.family': return { style: { fontFamily: value }, text: SAMPLE };
    case 'typography.letter-spacing': return { style: { letterSpacing: value }, text: SAMPLE.toUpperCase() };
    case 'typography.line-height': return { style: { lineHeight: value, maxWidth: '40ch' }, text: LONG };
    default: return { style: {}, text: SAMPLE };
  }
}

export const Typography: Story = {
  name: 'Typography',
  render: () => (
    <div className="tk-page">
      <h1 className="tenon-heading-1">Typography</h1>
      <p>
        {styles.length} text styles, each drawn with its own values whatever the toolbar says. Where the
        1984 theme replaces a style, its version sits underneath on a 1984 panel.
        The brackets name the primitive each part aliases.
      </p>
      <section className="tk-section">
        <h2 className="tenon-heading-2">Text styles</h2>
        {styles.map(([name, style]) => <TextStyleRow key={name} name={name} style={style} />)}
      </section>
      {[...scale].map(([group, keys]) => (
        <section key={group} className="tk-section">
          <h2 className="tenon-heading-3">{group.replace(/^typography\./, '')}</h2>
          <div className="tk-scale">
            {keys.map((k) => {
              const value = tokens.primitives[k];
              const sample = scaleSample(group, value);
              return (
                <div key={k} className="tk-scale__row">
                  <span className="tk-code">{k.replace(/^typography\./, '')}</span>
                  <span className="tk-code tk-subtle">{group === 'typography.family' ? '' : value}</span>
                  <div>
                    <div style={sample.style}>{sample.text}</div>
                    {group === 'typography.family' && <span className="tk-code tk-subtle">{value}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  ),
};
