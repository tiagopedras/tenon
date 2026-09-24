/* The parts of drag to reorder that don't care who draws the list.
   `useReorder` (React) and `bindReorder` (plain DOM) are both built on
   these, so there is one answer to each of the questions below. */

export type ReorderAxis = 'x' | 'y';
export type DropSide = 'before' | 'after';
export type Over = { key: string; after: boolean };

/* Structural, so a React synthetic event and a native one both fit, and
   stopping one stops it in its own world. */
type DragLike = {
  clientX: number;
  clientY: number;
  dataTransfer: DataTransfer | null;
  preventDefault(): void;
  stopPropagation(): void;
};

export const ITEM_ATTR = 'data-tenon-reorder';
export const DROP_ATTR = 'data-tenon-drop';
export const DRAGGING_ATTR = 'data-tenon-dragging';
export const AXIS_ATTR = 'data-tenon-axis';
export const GRIP_ATTR = 'data-tenon-grip';

export const sameOver = (a: Over | null, b: Over | null) =>
  a === b || (!!a && !!b && a.key === b.key && a.after === b.after);

/** Whether the pointer is in the second half of `el`, along `axis`. */
export function isAfter(el: Element, x: number, y: number, axis: ReorderAxis): boolean {
  const r = el.getBoundingClientRect();
  return axis === 'x' ? x > r.left + r.width / 2 : y > r.top + r.height / 2;
}

/** The key the dragged item lands just before, or null for the end. */
export function beforeKey(keys: string[], dragged: string, over: Over): string | null {
  if (!over.after) return over.key;
  const rest = keys.filter((k) => k !== dragged);
  const i = rest.indexOf(over.key);
  return i + 1 < rest.length ? rest[i + 1] : null;
}

/** Set a drag going: moveable, carrying data (Firefox cancels a drag that
 *  carries none), and pictured as the whole item rather than the few
 *  pixels of a grip, held where the pointer picked it up. */
export function startDrag(ev: DragLike, key: string, item: Element | null) {
  const dt = ev.dataTransfer;
  if (!dt) return;
  dt.effectAllowed = 'move';
  dt.setData('text/plain', key);
  if (item) {
    const r = item.getBoundingClientRect();
    dt.setDragImage(item, ev.clientX - r.left, ev.clientY - r.top);
  }
}

/** Run `fn` a tick after dragstart. The browser takes its picture of the
 *  dragged item just after dragstart returns, so the fade has to wait or
 *  the picture comes out faded or blank. */
export const afterPicture = (fn: () => void) => { setTimeout(fn, 0); };

/** Take a dragover or drop for this list and let it go no further, so a
 *  handler further up (a list's own gap handler, a board's day cell)
 *  cannot act on it a second time. */
export function claim(ev: DragLike) {
  ev.preventDefault();
  ev.stopPropagation();
  if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
}
