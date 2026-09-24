import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Reorder.css';

export interface DragHandleProps extends HTMLAttributes<HTMLSpanElement> {
  draggable?: boolean;
}

/* The six-dot grip an item is picked up by. Give it `handleProps` from
   `useReorder`. `data-tenon-grip` is what `bindReorder` starts a drag from.
   The svg is marked not draggable: Firefox and Safari treat an svg like an
   image and would start their own image drag instead. */
export function DragHandle({ className, ...rest }: DragHandleProps) {
  return (
    <span className={cx('tenon-draghandle', className)} aria-hidden="true" data-tenon-grip="" {...rest}>
      <svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true" {...{ draggable: false }}>
        <circle cx="3" cy="3" r="1.3" /><circle cx="7" cy="3" r="1.3" />
        <circle cx="3" cy="8" r="1.3" /><circle cx="7" cy="8" r="1.3" />
        <circle cx="3" cy="13" r="1.3" /><circle cx="7" cy="13" r="1.3" />
      </svg>
    </span>
  );
}

/** `<DragHandle/>` as an HTML string, for a list built as one. The same
 *  markup, byte for byte, which the to-dos board's tests hold it to. */
export function dragHandleHTML(className?: string): string {
  const cls = className ? `tenon-draghandle ${className}` : 'tenon-draghandle';
  const dots = [[3, 3], [7, 3], [3, 8], [7, 8], [3, 13], [7, 13]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3"></circle>`)
    .join('');
  return (
    `<span class="${cls}" aria-hidden="true" data-tenon-grip="">` +
    `<svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true" draggable="false">${dots}</svg></span>`
  );
}
