/* Reads the token JSON, checks it, and writes dist/.
   Run: node scripts/build.mjs   (add --quiet to drop the contrast table)

   Three checks run before anything is written, and any of them failing
   stops the build:
     1. theme parity, light and dark hold the identical key set
     2. every {alias} resolves to something that exists
     3. no semantic token aliases another semantic token
   The first is the one that matters. board.css had --accent missing from
   its dark block for months and nothing said a word, because a hand-written
   stylesheet has no way to know a key is absent.

   A fourth check, contrast, reports and does not fail. Some tokens are
   meant to sit below 4.5:1 and the token file says which.
   ------------------------------------------------------------------- */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { contrast } from './color.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const QUIET = process.argv.includes('--quiet');
const PREFIX = '--tenon';

const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

/* Stamped into both outputs. A copy of tenon.css vendored into a repo that
   cannot run npm has no other way to say which version it is, and a stale
   one is otherwise indistinguishable from a current one. */
const { version } = read('package.json');
const STAMP = `Tenon v${version}, built ${new Date().toISOString().slice(0, 10)}`;
const strip = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('$')));

const primitives = {
  ...strip(read('tokens/primitive/color.json')),
  ...strip(read('tokens/primitive/dimension.json')),
  ...strip(read('tokens/primitive/typography.json')),
};
const shared = strip(read('tokens/semantic/typography.json'));
/* The `color` group is hoisted away here rather than left in the path.
   Its children are already named background / text / icon / stroke, so
   keeping it would spell --tenon-color-background-default, which says
   "colour" twice and reads nothing like the primitive it is meant to be
   told apart from. Primitives keep theirs: --tenon-color-blue-600. */
const hoistColor = ({ color = {}, ...rest }) => ({ ...color, ...rest });
const themes = {
  light: hoistColor(strip(read('tokens/semantic/color.light.json'))),
  dark: hoistColor(strip(read('tokens/semantic/color.dark.json'))),
};

/* ---- flatten ---------------------------------------------------------- */

function flatten(tree, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(tree)) {
    if (k.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && '$value' in v) out[path] = v;
    else if (v && typeof v === 'object') Object.assign(out, flatten(v, path));
  }
  return out;
}

const flatPrimitives = flatten(primitives);
const flatShared = flatten(shared);
const flatThemes = Object.fromEntries(
  Object.entries(themes).map(([n, t]) => [n, flatten(t)])
);

/* ---- checks ----------------------------------------------------------- */

const errors = [];

const lightKeys = Object.keys(flatThemes.light).sort();
const darkKeys = Object.keys(flatThemes.dark).sort();
for (const k of lightKeys) if (!darkKeys.includes(k)) errors.push(`dark is missing ${k}`);
for (const k of darkKeys) if (!lightKeys.includes(k)) errors.push(`light is missing ${k}`);

const ALIAS = /^\{([^}]+)\}$/;

function resolve(value, seen = []) {
  if (typeof value !== 'string') return value;
  const m = value.match(ALIAS);
  if (!m) return value;
  const target = m[1];
  if (seen.includes(target)) {
    errors.push(`alias loop: ${[...seen, target].join(' -> ')}`);
    return value;
  }
  const node = flatPrimitives[target] ?? flatShared[target];
  if (!node) {
    errors.push(`alias {${target}} points at nothing`);
    return value;
  }
  return resolve(node.$value, [...seen, target]);
}

/* A semantic aliasing another semantic is the chain that makes a rename
   break in two places instead of one. */
for (const [theme, flat] of Object.entries(flatThemes)) {
  for (const [key, node] of Object.entries(flat)) {
    const m = typeof node.$value === 'string' && node.$value.match(ALIAS);
    if (m && !(m[1] in flatPrimitives)) {
      errors.push(`${theme}: ${key} aliases {${m[1]}}, which is not a primitive`);
    }
  }
}

/* Component CSS may read the dimension scale directly, because that scale
   has one tier on purpose. It may not read a colour primitive: a component
   naming --tenon-color-blue-600 is a component that will not follow a
   theme, and it is the one mistake the two-tier split exists to prevent. */
function cssFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    return e.isDirectory() ? cssFiles(full) : e.name.endsWith('.css') ? [full] : [];
  });
}
/* Local custom properties a component sets on its own element from a prop.
   They are not tokens and will not be found in the built CSS, which is the
   whole reason this list has to be written down. */
const LOCALS = new Set(['--tenon-card-accent', '--tenon-tag-colour', '--tenon-column-tone']);

const componentCss = cssFiles(join(ROOT, 'src')).map((f) => [f, readFileSync(f, 'utf8')]);

for (const [file, text] of componentCss) {
  for (const m of text.matchAll(/var\(\s*(--tenon-color-[a-z0-9-]+)/g)) {
    errors.push(`${file.replace(ROOT + '/', '')} reads the primitive ${m[1]}`);
  }
}

if (errors.length) {
  console.error('Build failed.\n');
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

/* ---- css -------------------------------------------------------------- */

const cssName = (path) => `${PREFIX}-${path.replace(/\./g, '-').replace(/\s+/g, '-')}`;

function cssValue(node, { literal = false } = {}) {
  const v = node.$value;
  if (typeof v === 'string') {
    const m = v.match(ALIAS);
    if (m) return literal ? cssValue({ $value: resolve(v) }, { literal }) : `var(${cssName(m[1])})`;
    return v;
  }
  if (Array.isArray(v)) {
    if (node.$type === 'fontFamily') return v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
    if (node.$type === 'shadow') {
      return v.map((s) => `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${s.color}`).join(', ');
    }
  }
  if (v && typeof v === 'object' && 'value' in v) return `${v.value}${v.unit ?? ''}`;
  return String(v);
}

const block = (entries, indent = '  ') =>
  entries.map(([k, v]) => `${indent}${k}: ${v};`).join('\n');

const primitiveVars = Object.entries(flatPrimitives)
  .filter(([, n]) => n.$type !== 'typography')
  .map(([p, n]) => [cssName(p), cssValue(n)]);

/* A composite text style becomes one var per part plus a shorthand, since
   `font:` cannot carry letter-spacing and a class is the only place the
   five parts sit together. */
const textVars = [];
const textClasses = [];
for (const [path, node] of Object.entries(flatShared)) {
  if (node.$type !== 'typography') {
    textVars.push([cssName(path), cssValue(node)]);
    continue;
  }
  const v = node.$value;
  const parts = {
    family: v.fontFamily, size: v.fontSize, weight: v.fontWeight,
    'line-height': v.lineHeight, 'letter-spacing': v.letterSpacing,
  };
  for (const [part, val] of Object.entries(parts)) {
    textVars.push([`${cssName(path)}-${part}`, cssValue({ $value: val })]);
  }
  const cls = path.replace(/^text\./, '').replace(/\./g, '-');
  textClasses.push(
    `.tenon-${cls} {\n` +
    `  font-family: var(${cssName(path)}-family);\n` +
    `  font-size: var(${cssName(path)}-size);\n` +
    `  font-weight: var(${cssName(path)}-weight);\n` +
    `  line-height: var(${cssName(path)}-line-height);\n` +
    `  letter-spacing: var(${cssName(path)}-letter-spacing);\n}`
  );
}

const themeVars = (name) =>
  Object.entries(flatThemes[name]).map(([p, n]) => [cssName(p), cssValue(n)]);

const css = `/* ${STAMP}
   Generated by scripts/build.mjs. Do not edit.
   ${primitiveVars.length} primitives, ${lightKeys.length} semantic tokens per theme, 2 themes.

   Light is the default. Dark applies when the system asks for it, unless
   [data-theme="light"] is set, and applies unconditionally under
   [data-theme="dark"]. So a manual toggle needs no rebuild. */

:root {
  color-scheme: light dark;

  /* ---- primitives. Nothing outside this file should read one. ---- */
${block(primitiveVars)}

  /* ---- shared semantics: type and radius, the same in every theme ---- */
${block(textVars)}

  /* ---- semantics: light ---- */
${block(themeVars('light'))}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${block(themeVars('dark'), '    ')}
  }
}

[data-theme="dark"] {
${block(themeVars('dark'))}
}

${textClasses.join('\n\n')}
`;

/* Every --tenon- name a component reads has to be one this build emits.
   A var() naming a token that does not exist falls back silently, or to
   whatever fallback was typed beside it, and looks completely fine. That
   has now happened twice here: --tenon-color-background-default, which
   made the token preview render on browser defaults, and --tenon-text-2xs
   in the column head. Both looked right. */
const emitted = new Set(css.match(/^\s*(--tenon-[a-z0-9-]+):/gm)?.map((l) => l.trim().slice(0, -1)) ?? []);
for (const [file, text] of componentCss) {
  for (const m of text.matchAll(/var\(\s*(--tenon-[a-z0-9-]+)/g)) {
    if (!emitted.has(m[1]) && !LOCALS.has(m[1])) {
      errors.push(`${file.replace(ROOT + '/', '')} reads ${m[1]}, which this build does not emit`);
    }
  }
}
if (errors.length) {
  console.error('Build failed.\n');
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist', 'tenon.css'), css);

/* A fully resolved copy, for the Figma side and for anything that wants
   values rather than references. */
const resolved = {
  $version: version,
  $built: STAMP,
  primitives: Object.fromEntries(
    Object.entries(flatPrimitives).map(([p, n]) => [p, cssValue(n, { literal: true })])
  ),
  shared: Object.fromEntries(
    Object.entries(flatShared).map(([p, n]) =>
      [p, n.$type === 'typography'
        ? Object.fromEntries(Object.entries(n.$value).map(([k, v]) => [k, cssValue({ $value: v }, { literal: true })]))
        : cssValue(n, { literal: true })])
  ),
  themes: Object.fromEntries(
    Object.entries(flatThemes).map(([t, f]) =>
      [t, Object.fromEntries(Object.entries(f).map(([p, n]) => [p, cssValue(n, { literal: true })]))])
  ),
};
writeFileSync(join(ROOT, 'dist', 'tenon.tokens.json'), JSON.stringify(resolved, null, 2) + '\n');

/* ---- contrast report -------------------------------------------------- */

const rows = [];
for (const theme of ['light', 'dark']) {
  const r = resolved.themes[theme];
  const surfaces = { 'bg.default': r['background.default'], 'bg.raised': r['background.raised'] };
  for (const [key, hex] of Object.entries(r)) {
    if (!/^(text|icon)\./.test(key)) continue;
    if (/(on-accent|inverse)/.test(key)) continue;
    if (!/^#[0-9a-f]{6}$/i.test(hex)) continue;
    const worst = Math.min(...Object.values(surfaces).map((s) => contrast(hex, s)));
    if (worst < 4.5) rows.push({ theme, token: key, hex, 'worst ratio': worst.toFixed(2) });
  }
}

console.log(`${STAMP}`);
console.log(`dist/tenon.css          ${primitiveVars.length} primitives, ${lightKeys.length} semantics x 2 themes`);
console.log(`dist/tenon.tokens.json  resolved values`);
console.log(`\nChecks passed: theme parity, alias targets, no semantic-to-semantic aliases,\n               no component CSS reading a colour primitive,\n               every --tenon- name a component reads is one this build emits.`);
if (!QUIET) {
  if (rows.length) {
    console.log(`\n${rows.length} text or icon tokens below 4.5:1 on their own background:`);
    console.table(rows);
  } else {
    console.log('\nEvery text and icon token clears 4.5:1.');
  }
}
