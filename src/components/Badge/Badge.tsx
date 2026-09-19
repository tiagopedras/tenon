import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Badge.css';

export type BadgeTone = 'accent' | 'neutral' | 'success' | 'warning' | 'error';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Nought or less draws nothing at all; above `max` it reads 99+. */
  count: number;
  /** What the count is of, for a screen reader and the tooltip. */
  label?: string;
  max?: number;
  tone?: BadgeTone;
}

export function Badge({ count, label, max = 99, tone = 'accent', className, ...rest }: BadgeProps) {
  const n = Math.floor(Number(count) || 0);
  if (n < 1) return null;
  const text = n > max ? `${max}+` : String(n);
  const said = label ? `${n} ${label}` : undefined;

  return (
    <span
      className={cx('tenon-badge', `tenon-badge--${tone}`, className)}
      title={said}
      aria-label={said}
      {...rest}
    >
      {text}
    </span>
  );
}
