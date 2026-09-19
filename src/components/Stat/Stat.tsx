import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import './Stat.css';

export type StatTone = 'default' | 'accent' | 'success' | 'warning' | 'error';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  /** The small label above the figure, inside the box. */
  eyebrow?: ReactNode;
  /** The figure. A string so "2 of 2" is as welcome as a count. */
  value: ReactNode;
  /** What the figure counts, under it. */
  caption?: ReactNode;
  tone?: StatTone;
}

export function Stat({ eyebrow, value, caption, tone = 'default', className, ...rest }: StatProps) {
  return (
    <div className={cx('tenon-stat', tone !== 'default' && `tenon-stat--${tone}`, className)} {...rest}>
      {eyebrow ? <span className="tenon-stat__eyebrow">{eyebrow}</span> : null}
      <span className="tenon-stat__value">{value}</span>
      {caption ? <span className="tenon-stat__caption">{caption}</span> : null}
    </div>
  );
}
