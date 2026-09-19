import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Read out by a screen reader. The mark itself carries no words. */
  label?: string;
}

export function Spinner({ size = 'md', label = 'Working', className, ...rest }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cx('tenon-spinner', `tenon-spinner--${size}`, className)} {...rest} />
  );
}
