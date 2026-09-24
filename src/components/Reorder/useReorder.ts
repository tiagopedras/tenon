import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import './Reorder.css';

/* Drag to reorder one list of keyed things.

   Written for the agents dashboard, where rows are picked up by a grip
   because the row itself already owns a pointer drag (painting hours), and
   shaped by what the to-dos board had already learnt the hard way:

   - the browser takes its picture of the dragged thing just after
     dragstart returns, so the fade that marks it waits a tick, or the
     picture comes out faded or blank;
   - the picture is the whole item, not the few pixels of a grip;
   - a line in the gap says where the drop lands, before it lands;
   - a drop is handled by the item it lands on and goes no further, so a
     list's own "dropped in the gap" handler cannot move it a second time.

   Lists nest (rows inside a card inside a list of cards). Each hook answers
   only for a drag it started, so an outer list and an inner one never
   handle each other's drops. Moving between two lists is not this hook's
   job: the board's columns do that with their own rules.

   State goes out as data attributes rather than classes, so the item props
   spread onto anything, a Card included, with no class merging:
   `data-tenon-dragging` fades the item, `data-tenon-drop` draws the line.
   Set `--tenon-reorder-gap` on the list to the gap between its items so
   the line sits in the middle of it. */

export type ReorderAxis = 'x' | 'y';
export type DropSide = 'before' | 'after';

export interface ReorderOptions {
  /** Every key in the list, in the order shown. */
  keys: string[];
  /** Put `key` just before `before`, or at the end when `before` is null. */
  onMove: (key: string, before: string | null) => void;
  /** 'y' for a column of rows, 'x' for cards read left to right. */
  axis?: ReorderAxis;
}

export interface ReorderHandleProps {
  draggable: true;
  onDragStart: (ev: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
}

export interface ReorderItemProps {
  'data-tenon-reorder': string;
  'data-tenon-drop'?: DropSide;
  'data-tenon-dragging'?: '';
  onDragOver: (ev: DragEvent<HTMLElement>) => void;
  onDrop: (ev: DragEvent<HTMLElement>) => void;
}

export interface ReorderItem {
  dragging: boolean;
  drop: DropSide | null;
  /** Spread on the grip. Or on the item itself, to pick up the whole item. */
  handleProps: ReorderHandleProps;
  /** Spread on the item. */
  itemProps: ReorderItemProps;
}

type Over = { key: string; after: boolean };

/** Move `key` to sit just before `before`, or last when `before` is null. */
export function reorderKeys(keys: string[], key: string, before: string | null): string[] {
  const rest = keys.filter((k) => k !== key);
  const at = before == null ? rest.length : Math.max(0, rest.indexOf(before));
  rest.splice(at, 0, key);
  return rest;
}

/** Sort items by a saved order of keys. An item the order does not name
 *  keeps its current place rather than jumping to the end, so something new
 *  still turns up where it would have without a saved order. */
export function applySavedOrder<T>(items: T[], keyOf: (item: T) => string, order: string[]): T[] {
  if (!order.length) return items;
  const rank = new Map(order.map((k, i) => [k, i]));
  return items
    .map((item, i) => ({ item, r: rank.get(keyOf(item)) ?? order.length + i }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.item);
}

export function useReorder({ keys, onMove, axis = 'y' }: ReorderOptions) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOverState] = useState<Over | null>(null);
  /* Refs beside the state: the handlers need the drag at once, and the
     state behind `dragging` is held back a tick on purpose. */
  const draggingRef = useRef<string | null>(null);
  const overRef = useRef<Over | null>(null);

  const setOver = (o: Over | null) => {
    const cur = overRef.current;
    if (cur === o || (cur && o && cur.key === o.key && cur.after === o.after)) return;
    overRef.current = o;
    setOverState(o);
  };

  const end = () => {
    draggingRef.current = null;
    overRef.current = null;
    setDragging(null);
    setOverState(null);
  };

  const commit = () => {
    const d = draggingRef.current;
    const o = overRef.current;
    if (d && o && o.key !== d) {
      const rest = keys.filter((k) => k !== d);
      const i = rest.indexOf(o.key);
      onMove(d, o.after ? (i + 1 < rest.length ? rest[i + 1] : null) : o.key);
    }
    end();
  };

  const sideOf = (ev: DragEvent<HTMLElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    return axis === 'x' ? ev.clientX > r.left + r.width / 2 : ev.clientY > r.top + r.height / 2;
  };

  const item = (key: string): ReorderItem => {
    const drop: DropSide | null =
      dragging && dragging !== key && over && over.key === key ? (over.after ? 'after' : 'before') : null;
    return {
      dragging: dragging === key,
      drop,
      handleProps: {
        draggable: true,
        onDragStart: (ev) => {
          ev.stopPropagation();
          ev.dataTransfer.effectAllowed = 'move';
          // Firefox cancels a drag that carries no data.
          ev.dataTransfer.setData('text/plain', key);
          const box = ev.currentTarget.closest('[data-tenon-reorder]');
          if (box) {
            const r = box.getBoundingClientRect();
            ev.dataTransfer.setDragImage(box, ev.clientX - r.left, ev.clientY - r.top);
          }
          draggingRef.current = key;
          setTimeout(() => { if (draggingRef.current === key) setDragging(key); }, 0);
        },
        onDragEnd: end,
      },
      itemProps: {
        'data-tenon-reorder': key,
        'data-tenon-drop': drop ?? undefined,
        'data-tenon-dragging': dragging === key ? '' : undefined,
        onDragOver: (ev) => {
          if (!draggingRef.current) return;
          ev.preventDefault();
          ev.stopPropagation();
          ev.dataTransfer.dropEffect = 'move';
          setOver(draggingRef.current === key ? null : { key, after: sideOf(ev) });
        },
        onDrop: (ev) => {
          if (!draggingRef.current) return;
          ev.preventDefault();
          ev.stopPropagation();
          if (draggingRef.current !== key) setOver({ key, after: sideOf(ev) });
          commit();
        },
      },
    };
  };

  /* For the list itself, so the gaps between items accept a drop: the line
     stays where it was last drawn and the drop lands on it. */
  const listProps = {
    'data-tenon-axis': axis,
    onDragOver: (ev: DragEvent<HTMLElement>) => {
      if (!draggingRef.current) return;
      ev.preventDefault();
      ev.stopPropagation();
    },
    onDrop: (ev: DragEvent<HTMLElement>) => {
      if (!draggingRef.current) return;
      ev.preventDefault();
      ev.stopPropagation();
      commit();
    },
  };

  return { item, listProps, dragging };
}
