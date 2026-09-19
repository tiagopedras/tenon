import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Card.css';

export type CardElevation = 'flat' | 'raised' | 'overlay';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: CardElevation;
  padding?: CardPadding;
  /** Adds the hover and focus treatment. Give it an onClick and a role too. */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevation = 'raised', padding = 'md', interactive = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'tenon-card',
        `tenon-card--${elevation}`,
        `tenon-card--pad-${padding}`,
        interactive && 'tenon-card--interactive',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
