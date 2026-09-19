import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Pill.css';

export type PillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  /** A filled dot before the label. */
  dot?: boolean;
  /** Small capitals, for a state word like BUILT or OFF. */
  caps?: boolean;
}

export function Pill({ tone = 'neutral', dot = false, caps = false, className, children, ...rest }: PillProps) {
  return (
    <span className={cx('tenon-pill', `tenon-pill--${tone}`, caps && 'tenon-pill--caps', className)} {...rest}>
      {dot && <span className="tenon-pill__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
