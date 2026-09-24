import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Reorder.css';

export interface DragHandleProps extends HTMLAttributes<HTMLSpanElement> {
  draggable?: boolean;
}

/* The six-dot grip an item is picked up by. Give it `handleProps` from
   `useReorder`. The svg is marked not draggable: Firefox and Safari treat
   an svg like an image and would start their own image drag instead. */
export function DragHandle({ className, ...rest }: DragHandleProps) {
  return (
    <span className={cx('tenon-draghandle', className)} aria-hidden="true" {...rest}>
      <svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true" {...{ draggable: false }}>
        <circle cx="3" cy="3" r="1.3" /><circle cx="7" cy="3" r="1.3" />
        <circle cx="3" cy="8" r="1.3" /><circle cx="7" cy="8" r="1.3" />
        <circle cx="3" cy="13" r="1.3" /><circle cx="7" cy="13" r="1.3" />
      </svg>
    </span>
  );
}
