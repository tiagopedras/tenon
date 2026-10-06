import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, RefObject } from 'react';
import { ThinkingOrb } from 'thinking-orbs';
import type { OrbSize, OrbState, OrbTheme } from 'thinking-orbs';
import { cx } from '../../utils';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerState = OrbState;

/* The Claude CLI's own thinking indicator, frame by frame. */
const GLYPHS = ['·', '✢', '✳', '∗', '✻', '✽', '✻', '∗', '✳', '✢'];
const FRAME_MS = 110;

/* thinking-orbs draws three tuned designs, at 20, 32 and 64px, and nothing in
   between. Each size takes the nearest, and Spinner.css draws the canvas a
   quarter wider than the ring's box, since the orb fills about 80% of its
   canvas: the dots come out the ring's width and the box does not move.
   lg takes the 64 design and draws it smaller, since stretching the 32 one
   to 40px made its dots soft and blocky. */
const ORB_SIZES: Record<SpinnerSize, OrbSize> = { sm: 20, md: 20, lg: 64 };

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Read out by a screen reader. The mark itself carries no words. */
  label?: string;
  /** `orb` is a dotted sphere from thinking-orbs. `ring` turns. `glyph` cycles through the asterisks the Claude CLI draws while it thinks. */
  variant?: 'orb' | 'ring' | 'glyph';
  /** Which of the orb's animations to draw, for a caller following what a run is doing. `solving` unless set. Orb only. */
  state?: SpinnerState;
}

function reducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function hexLuminance(value: string): number | null {
  const m = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

/* The orb takes its ink as an rgb() string and its substrate as light or
   dark, and cannot read a custom property itself. So both are read off the
   mark once it is in the page: the ink is the span's computed colour (the
   accent text token, unless a className says otherwise) and the substrate is
   whether the page background token is dark, which also catches 1984, a
   theme the orb's own detection does not know. Read again whenever a theme
   changes. Without Tenon's CSS loaded, the orb keeps its own grey and its own
   detection. */
function useOrbInk(ref: RefObject<HTMLSpanElement | null>, active: boolean) {
  const [ink, setInk] = useState<{ color?: string; theme: OrbTheme }>({ theme: 'auto' });
  useEffect(() => {
    const el = ref.current;
    if (!active || !el || typeof getComputedStyle !== 'function') return;
    const read = () => {
      const style = getComputedStyle(el);
      const lum = hexLuminance(style.getPropertyValue('--tenon-background-default'));
      const theme: OrbTheme = lum === null ? 'auto' : lum < 0.5 ? 'dark' : 'light';
      const color = lum === null ? undefined : style.color;
      setInk((prev) => (prev.color === color && prev.theme === theme ? prev : { color, theme }));
    };
    read();
    const observer = typeof MutationObserver === 'function' ? new MutationObserver(read) : null;
    observer?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'], subtree: true });
    const scheme = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
    scheme?.addEventListener('change', read);
    return () => {
      observer?.disconnect();
      scheme?.removeEventListener('change', read);
    };
  }, [ref, active]);
  return ink;
}

export function Spinner({ size = 'md', label = 'Working', variant = 'orb', state = 'solving', className, ...rest }: SpinnerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const ink = useOrbInk(ref, variant === 'orb');
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (variant !== 'glyph' || reducedMotion()) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % GLYPHS.length), FRAME_MS);
    return () => clearInterval(id);
  }, [variant]);

  /* The orb holds a still frame under reduced motion by itself. Its inline
     width and height are cleared so Spinner.css can size it. */
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx('tenon-spinner', `tenon-spinner--${size}`, variant !== 'ring' && `tenon-spinner--${variant}`, className)}
      {...rest}
    >
      {variant === 'glyph' && <span aria-hidden="true">{GLYPHS[frame]}</span>}
      {variant === 'orb' && (
        <ThinkingOrb
          state={state}
          size={ORB_SIZES[size]}
          theme={ink.theme}
          color={ink.color}
          className="tenon-spinner__orb"
          style={{ width: undefined, height: undefined }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
