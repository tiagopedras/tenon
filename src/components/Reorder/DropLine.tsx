import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Reorder.css';

/* The drop line as an element of its own, for a list that inserts it
   between items rather than drawing it on the hovered one. The to-dos
   board does that, because a drag there crosses columns and the line has
   to appear in an empty one too. Same look as `data-tenon-drop`. */
export function DropLine({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('tenon-dropline', className)} aria-hidden="true" {...rest} />;
}
