/* Generates tokens/primitive/color.json: 17 hues x 19 steps, from one
   anchor hex each. The anchors are the colours the to-dos board already
   uses, so the ramps carry that palette rather than replacing it.

   Two curves do the work. LIGHTNESS is a fixed table, identical on every
   hue, which is what makes blue-600 and green-600 the same weight on the
   page. CHROMA is a shape scaled per hue so the anchor reproduces at its
   own position, which is what keeps each ramp looking like the colour it
   came from instead of like a generated pastel.

   Run: node scripts/generate-ramps.mjs
   ------------------------------------------------------------------- */

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { hexToRgb, rgbToOklch, oklchToHex, contrast } from './color.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'tokens', 'primitive', 'color.json');

const STEPS = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
               550, 600, 650, 700, 750, 800, 850, 900, 950];

const LIGHTNESS = [0.975, 0.950, 0.920, 0.885, 0.845, 0.800, 0.755, 0.710,
                   0.665, 0.620, 0.575, 0.530, 0.485, 0.440, 0.395, 0.350,
                   0.300, 0.250, 0.195];

const CHROMA = [0.12, 0.22, 0.34, 0.47, 0.60, 0.72, 0.83, 0.91, 0.97, 1.00,
                1.00, 0.98, 0.94, 0.88, 0.80, 0.71, 0.60, 0.48, 0.36];

/* Anchors. `from` says where the colour came from, and is the reason not
   to touch it casually: changing an anchor moves all 19 of its steps. */
const HUES = {
  neutral: { hex: '#5d636e', from: 'board --n-500' },
  grey:    { hex: '#9a9a9a', from: 'tiagopedras.com muted text, zero chroma for the site theme' },
  slate:  { hex: '#55606e', from: 'board --bucket-10-light' },
  blue:    { hex: '#2f6feb', from: 'board --blue-500, the accent' },
  indigo:  { hex: '#4550c9', from: 'board --bucket-8-light' },
  purple:  { hex: '#7c4ddb', from: 'board --bucket-3-light' },
  plum:    { hex: '#9c3d9c', from: 'new, fills the purple-to-magenta gap' },
  magenta: { hex: '#b1306b', from: 'board --bucket-5-light' },
  rose:    { hex: '#c23b5e', from: 'new, fills the magenta-to-red gap' },
  red:     { hex: '#c8322f', from: 'board --red-500' },
  orange:  { hex: '#e0610f', from: 'board --orange-500' },
  brown:   { hex: '#8a5a2f', from: 'board --bucket-7-light' },
  amber:   { hex: '#9a6100', from: 'board --amber-500' },
  yellow:  { hex: '#b38600', from: 'new, fills the amber-to-lime gap' },
  lime:    { hex: '#5a9216', from: 'new, fills the yellow-to-green gap' },
  green:   { hex: '#1f7a45', from: 'board --green-500' },
  teal:    { hex: '#0f7d93', from: 'board --bucket-6-light' },
  cyan:    { hex: '#0e8fa8', from: 'new, fills the teal-to-blue gap' },
};

/* Where the anchor's own lightness falls on the table, as a fractional
   index, so its chroma can be read off the same curve the ramp uses. */
function anchorIndex(L) {
  for (let i = 0; i < LIGHTNESS.length - 1; i++) {
    const hi = LIGHTNESS[i], lo = LIGHTNESS[i + 1];
    if (L <= hi && L >= lo) return i + (hi - L) / (hi - lo);
  }
  return L > LIGHTNESS[0] ? 0 : LIGHTNESS.length - 1;
}

const lerp = (arr, i) => {
  const a = Math.floor(i), b = Math.min(a + 1, arr.length - 1);
  return arr[a] + (arr[b] - arr[a]) * (i - a);
};

function ramp(hex) {
  const [, Ca, h] = rgbToOklch(hexToRgb(hex));
  const [La] = rgbToOklch(hexToRgb(hex));
  const idx = anchorIndex(La);
  const scale = Ca / Math.max(lerp(CHROMA, idx), 1e-6);
  return STEPS.map((step, i) => [step, oklchToHex([LIGHTNESS[i], CHROMA[i] * scale, h])]);
}

const primitives = {};
const report = [];

for (const [name, { hex, from }] of Object.entries(HUES)) {
  const group = {
    $description: `Generated from ${hex} (${from}). Do not hand-edit; run scripts/generate-ramps.mjs.`,
  };
  const pairs = ramp(hex);
  for (const [step, value] of pairs) {
    group[String(step)] = { $type: 'color', $value: value };
  }
  primitives[name] = group;

  /* Which step the anchor landed nearest, and the two contrast facts that
     decide whether a hue is usable as text. */
  const nearest = pairs.reduce((best, p) =>
    Math.abs(rgbToOklch(hexToRgb(p[1]))[0] - rgbToOklch(hexToRgb(hex))[0]) <
    Math.abs(rgbToOklch(hexToRgb(best[1]))[0] - rgbToOklch(hexToRgb(hex))[0]) ? p : best);
  const onWhite = pairs.find(([, v]) => contrast(v, '#ffffff') >= 4.5);
  const onDark = [...pairs].reverse().find(([, v]) => contrast(v, '#1c1f25') >= 4.5);
  report.push({
    hue: name,
    anchor: hex,
    'lands at': nearest[0],
    'first 4.5:1 on white': onWhite ? onWhite[0] : 'none',
    'first 4.5:1 on dark': onDark ? onDark[0] : 'none',
  });
}

/* Four values that are deliberately not on a ramp. White and black are
   endpoints, not steps, and putting them in the neutral ramp is what makes
   a "lightest neutral" quietly become pure white on one theme. The two
   urgency colours are at full chroma on purpose: the board's own red and
   amber sit at the same saturation as the categorical hues, and a 12px
   timeline bar carrying one of them said nothing. */
primitives.base = {
  white:  { $type: 'color', $value: '#ffffff' },
  black:  { $type: 'color', $value: '#000000' },
  urgent: { $type: 'color', $value: '#ff1e2d', $description: 'Full chroma, outside the red ramp. Fills only, never text.' },
  soon:   { $type: 'color', $value: '#ffa600', $description: 'Full chroma, outside the amber ramp. Fills only, never text.' },
};

writeFileSync(OUT, JSON.stringify({
  $schema: 'https://www.designtokens.org/schemas/2025.10/format.json',
  $description: 'Tenon colour primitives. Generated, not authored.',
  color: primitives,
}, null, 2) + '\n');

console.table(report);
console.log(`\n${Object.keys(HUES).length} hues x ${STEPS.length} steps -> ${OUT}`);
