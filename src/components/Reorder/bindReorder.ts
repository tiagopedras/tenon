import {
  AXIS_ATTR, DRAGGING_ATTR, DROP_ATTR, GRIP_ATTR, ITEM_ATTR,
  afterPicture, beforeKey, claim, isAfter, sameOver, startDrag,
} from './reorderCore';
import type { Over, ReorderAxis } from './reorderCore';
import './Reorder.css';

/* `useReorder` for a list built as an HTML string, which a React hook
   cannot reach. Written for the to-dos board's editors, drawer and
   timeline. Same rules, same look, from the same helpers.

   Bind once on the list element. Listeners are delegated to it, so the
   list can redraw its items as often as it likes (an `innerHTML` after
   every move) without binding again. An item is anything matching `item`
   inside the list, `[data-tenon-reorder="key"]` by default, and a drag
   starts only from its grip, `[data-tenon-grip]` by default, which is what
   `dragHandleHTML()` carries. The grip is made draggable as it is pressed,
   so the markup does not have to say so.

   Lists nest. An item belongs to the nearest list around it, and each list
   answers only for a drag it started, so an outer list and an inner one
   never handle each other's drops. Every dragover and drop of its own drag
   stops at the list, so nothing further up (a day cell under a timeline,
   say) sees it. */

export interface BindReorderOptions {
  /** Put `key` just before `before`, or at the end when `before` is null.
   *  Called after the drag's marks are cleared, so it may redraw the list. */
  onMove: (key: string, before: string | null) => void;
  /** 'y' for a column of rows, 'x' for cards read left to right. */
  axis?: ReorderAxis;
  /** What a drag starts from, inside an item. Default `[data-tenon-grip]`. */
  grip?: string;
  /** What an item is. Default `[data-tenon-reorder]`. An item matched some
   *  other way needs `position: relative` of its own for the drop line. */
  item?: string;
  /** An item's key. Default its `data-tenon-reorder`. */
  keyOf?: (item: HTMLElement) => string;
}

export function bindReorder(list: HTMLElement, opts: BindReorderOptions): () => void {
  const {
    onMove,
    axis = 'y',
    grip = `[${GRIP_ATTR}]`,
    item: itemSel = `[${ITEM_ATTR}]`,
    keyOf = (el) => el.getAttribute(ITEM_ATTR) ?? '',
  } = opts;

  list.setAttribute(AXIS_ATTR, axis);

  let dragging: { key: string; el: HTMLElement } | null = null;
  let over: (Over & { el: HTMLElement }) | null = null;

  /* The list an element belongs to is the nearest one around it. */
  const ownItem = (target: EventTarget | null): HTMLElement | null => {
    let el = target instanceof Element ? target.closest<HTMLElement>(itemSel) : null;
    while (el && el.parentElement?.closest(`[${AXIS_ATTR}]`) !== list) {
      el = el.parentElement?.closest<HTMLElement>(itemSel) ?? null;
    }
    return el;
  };

  const keys = () =>
    Array.from(list.querySelectorAll<HTMLElement>(itemSel))
      .filter((el) => el.parentElement?.closest(`[${AXIS_ATTR}]`) === list)
      .map(keyOf);

  const setOver = (o: (Over & { el: HTMLElement }) | null) => {
    if (sameOver(over, o) && over?.el === o?.el) return;
    over?.el.removeAttribute(DROP_ATTR);
    over = o;
    if (o) o.el.setAttribute(DROP_ATTR, o.after ? 'after' : 'before');
  };

  const end = () => {
    dragging?.el.removeAttribute(DRAGGING_ATTR);
    setOver(null);
    dragging = null;
  };

  const onPointerDown = (ev: PointerEvent) => {
    const g = ev.target instanceof Element ? ev.target.closest<HTMLElement>(grip) : null;
    if (g && list.contains(g) && ownItem(g)) g.draggable = true;
  };

  const onDragStart = (ev: DragEvent) => {
    const g = ev.target instanceof Element ? ev.target.closest(grip) : null;
    const el = g && ownItem(g);
    if (!el) return;
    ev.stopPropagation();
    const key = keyOf(el);
    startDrag(ev, key, el);
    const d = { key, el };
    dragging = d;
    /* On the source itself as well as the list: if the list redraws while
       the drag is under way, the source leaves it and dragend with it. */
    ev.target!.addEventListener('dragend', end, { once: true });
    afterPicture(() => { if (dragging === d) el.setAttribute(DRAGGING_ATTR, ''); });
  };

  const onDragOver = (ev: DragEvent) => {
    if (!dragging) return;
    claim(ev);
    const el = ownItem(ev.target);
    /* Over a gap the line stays where it was last drawn. */
    if (!el) return;
    const key = keyOf(el);
    setOver(key === dragging.key ? null : { key, el, after: isAfter(el, ev.clientX, ev.clientY, axis) });
  };

  const onDrop = (ev: DragEvent) => {
    if (!dragging) return;
    claim(ev);
    const el = ownItem(ev.target);
    if (el && keyOf(el) !== dragging.key) {
      setOver({ key: keyOf(el), el, after: isAfter(el, ev.clientX, ev.clientY, axis) });
    }
    const d = dragging.key;
    const o = over;
    const order = keys();
    end();
    if (o && o.key !== d) onMove(d, beforeKey(order, d, o));
  };

  const onDragEnter = (ev: DragEvent) => { if (dragging) claim(ev); };

  list.addEventListener('pointerdown', onPointerDown);
  list.addEventListener('dragstart', onDragStart);
  list.addEventListener('dragenter', onDragEnter);
  list.addEventListener('dragover', onDragOver);
  list.addEventListener('drop', onDrop);
  list.addEventListener('dragend', end);

  return () => {
    end();
    list.removeAttribute(AXIS_ATTR);
    list.removeEventListener('pointerdown', onPointerDown);
    list.removeEventListener('dragstart', onDragStart);
    list.removeEventListener('dragenter', onDragEnter);
    list.removeEventListener('dragover', onDragOver);
    list.removeEventListener('drop', onDrop);
    list.removeEventListener('dragend', end);
  };
}
