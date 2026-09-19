/* Colour space maths, sRGB <-> OKLab <-> OKLCh, plus gamut mapping.
   Ramps are generated in OKLCh rather than picked by eye because a
   perceptual space is the only one where "two steps lighter" means the
   same amount of lighter on every hue. Nothing here has a dependency. */

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

const toLinear = (c) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const toGamma = (c) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export function rgbToHex([r, g, b]) {
  const h = (v) =>
    Math.round(clamp01(v) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function rgbToOklab([r, g, b]) {
  const R = toLinear(r), G = toLinear(g), B = toLinear(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

/* Returns the raw linear-light RGB so the caller can test gamut before
   the gamma curve squashes an out-of-range channel into looking fine. */
function oklabToLinearRgb([L, a, b]) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

export function oklabToRgb(lab) {
  return oklabToLinearRgb(lab).map(toGamma);
}

export function rgbToOklch(rgb) {
  const [L, a, b] = rgbToOklab(rgb);
  const C = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return [L, C, h];
}

function inGamut([L, C, h], eps = 1e-4) {
  const rad = (h * Math.PI) / 180;
  const lin = oklabToLinearRgb([L, C * Math.cos(rad), C * Math.sin(rad)]);
  return lin.every((v) => v >= -eps && v <= 1 + eps);
}

/* Binary search chroma down until the colour fits sRGB. Holding L and h
   and giving up only chroma is what keeps a ramp's steps evenly spaced in
   lightness even where the hue runs out of gamut, which is most of the
   dark end of blue and the light end of yellow. */
export function oklchToHex([L, C, h]) {
  let c = C;
  if (!inGamut([L, c, h])) {
    let lo = 0, hi = C;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut([L, mid, h])) lo = mid; else hi = mid;
    }
    c = lo;
  }
  const rad = (h * Math.PI) / 180;
  return rgbToHex(oklabToRgb([L, c * Math.cos(rad), c * Math.sin(rad)]));
}

/* Relative luminance and WCAG contrast, used by the build's own check
   rather than by the ramps. */
export function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map(toLinear);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrast(hexA, hexB) {
  const a = luminance(hexToRgb(hexA));
  const b = luminance(hexToRgb(hexB));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}
