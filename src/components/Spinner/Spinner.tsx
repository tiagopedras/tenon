import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

/* The Claude CLI's own thinking indicator, frame by frame. */
const GLYPHS = ['·', '✢', '✳', '∗', '✻', '✽', '✻', '∗', '✳', '✢'];
const FRAME_MS = 110;

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Read out by a screen reader. The mark itself carries no words. */
  label?: string;
  /** `ring` turns. `glyph` cycles through the asterisks the Claude CLI draws while it thinks. */
  variant?: 'ring' | 'glyph';
}

function reducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Spinner({ size = 'md', label = 'Working', variant = 'ring', className, ...rest }: SpinnerProps) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (variant !== 'glyph' || reducedMotion()) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % GLYPHS.length), FRAME_MS);
    return () => clearInterval(id);
  }, [variant]);

  return (
    <span
      role="status"
      aria-label={label}
      className={cx('tenon-spinner', `tenon-spinner--${size}`, variant === 'glyph' && 'tenon-spinner--glyph', className)}
      {...rest}
    >
      {variant === 'glyph' && <span aria-hidden="true">{GLYPHS[frame]}</span>}
    </span>
  );
}
