import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { HTMLAttributes, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils';
import { Button } from '../Button/Button';
import '../Modal/Modal.css';
import './Window.css';

export interface WindowRect { x: number; y: number; width: number; height: number }
/** Where a window grows out of and shrinks back into: a DOMRect, or the same four numbers. */
export interface WindowOrigin { left: number; top: number; width: number; height: number }

export interface WindowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onFocus'> {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Sits in the head beside the close button. */
  headEnd?: ReactNode;
  footer?: ReactNode;
  /** Where the page says the window is. Leave it out and the window opens near the middle at a readable width. Pass the same object until the place changes: a new one, even with the same numbers, means "put it here", and cancels a drag it had finished. */
  rect?: WindowRect | null;
  /** Every move of a drag or resize, as it happens. */
  onRectLive?: (rect: WindowRect) => void;
  /** The rect a drag or resize ended on. Keep it and pass it back as `rect` to have the window remembered. */
  onRectChange?: (rect: WindowRect) => void;
  /** The window grows out of this on opening and shrinks back into it on closing, so the thing clicked and the window read as one object. */
  growFrom?: WindowOrigin | null;
  /** Its place in the page's own stacking order. */
  zIndex?: number;
  /** Escape closes only the active window, so one key press never takes every window down at once. */
  active?: boolean;
  /** Parked out of the way, dimmed. What that means for the rect is the page's to say. */
  peeked?: boolean;
  /** Any pointer press inside it, including one that goes on to start a drag. */
  onFocus?: () => void;
  closeButton?: boolean;
  /** The body and footer draw no padding and no layout of their own. */
  bare?: boolean;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
}

const MARGIN = 24;
const MOTION_MS = 260;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const REFLOW = ['left', 'top', 'width', 'height'].map((p) => `${p} ${MOTION_MS}ms ${EASING}`).join(', ');
const EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as const;
type Edge = (typeof EDGES)[number];

const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Read through a ref so a page that passes new functions every render does
   not tear listeners down mid-drag. */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

/* A panel the page places, rather than a dialog over a scrim: dragged by its
   head, resized from any edge or corner, stacked among others by the page,
   and never dimming what is behind it, which stays reachable everywhere the
   window is not. Several can be open at once.

   Position and stacking are the page's to decide, and this is deliberately
   incurious about why a rect changed: a saved position, a grid cell, a parked
   spot are all `rect`. What stays here is the gesture: dragging, resizing,
   the grow and shrink, and reporting where the window ended up. Came from the
   chat engine's windowed mode, which ai_canvas uses for a card. */
export function Window({
  open, onClose, title, subtitle, headEnd, footer, rect, onRectLive, onRectChange, growFrom, zIndex,
  active = true, peeked = false, onFocus, closeButton = true, bare = false,
  minWidth = 420, maxWidth = 800, minHeight = 320, className, children, ...rest
}: WindowProps) {
  const box = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [local, setLocal] = useState<WindowRect | null>(null);
  const [settled, setSettled] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [closing, setClosing] = useState(false);
  const fallback = useRef<WindowRect | null>(null);

  const close = useLatest(onClose);
  const live = useLatest(onRectLive);
  const changed = useLatest(onRectChange);
  const focused = useLatest(onFocus);
  const isActive = useLatest(active);
  const origin = useLatest(growFrom);
  const isDragging = useLatest(dragging);

  /* What was on screen the last time it was open, so the shrink on the way out
     keeps drawing it after the page has stopped passing it. */
  const shown = useRef({ title, subtitle, headEnd, footer, children, rect: rect ?? null, bare, className, rest });
  if (open) shown.current = { title, subtitle, headEnd, footer, children, rect: rect ?? null, bare, className, rest };
  const s = shown.current;

  const limits = useRef({ minWidth, maxWidth, minHeight });
  limits.current = { minWidth, maxWidth, minHeight };

  const clamp = useCallback((r: WindowRect): WindowRect => {
    const l = limits.current;
    const width = Math.max(l.minWidth, Math.min(l.maxWidth, r.width));
    const height = Math.max(l.minHeight, r.height);
    return {
      width,
      height: Math.min(height, window.innerHeight - MARGIN),
      /* At least a slice of the head stays reachable on every edge, so a
         window can always be dragged back rather than lost off screen. */
      x: Math.max(-width + 120, Math.min(r.x, window.innerWidth - 120)),
      y: Math.max(38, Math.min(r.y, window.innerHeight - 60)),
    };
  }, []);

  /* A rect from the page wins over whatever was last dragged to, unless a drag
     is in progress right now, so a page reflowing its other windows never
     fights the one under the pointer. */
  useEffect(() => { if (!isDragging.current) setLocal(null); }, [rect]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Opening: pick a default place once, and skip the reflow transition for the
     first placement so a fresh window never slides in from wherever the last
     one happened to be. */
  if (open && !fallback.current) {
    const width = Math.min(maxWidth, window.innerWidth - MARGIN * 2);
    const height = Math.min(680, window.innerHeight - MARGIN * 2 - 40);
    fallback.current = {
      x: Math.round((window.innerWidth - width) / 2),
      y: Math.round((window.innerHeight - height) / 2) + 12,
      width, height,
    };
  }
  useEffect(() => {
    if (!open) { setSettled(false); return; }
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  /* Grow in. Runs once the box has its rect, before the first paint. */
  useLayoutEffect(() => {
    const el = box.current;
    const from = origin.current;
    if (!open || !el || !from || reducedMotion()) return;
    const to = el.getBoundingClientRect();
    if (!to.width || !to.height) return;
    el.animate([
      { transform: `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${from.width / to.width},${from.height / to.height})`, opacity: 0.5 },
      { transform: 'translate(0,0) scale(1,1)', opacity: 1 },
    ], { duration: MOTION_MS, easing: EASING, fill: 'both' });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Shrink out. The page has already set `open` to false, so `closing` is
     switched on during that same render, which keeps the box in the tree and
     the last thing shown on screen for the length of the animation. A backstop
     timer means an unsettled animation still lets the window go. */
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    setClosing(!open && !!origin.current && !reducedMotion());
  }
  useLayoutEffect(() => {
    const el = box.current;
    const to = origin.current;
    if (!closing || !el || !to) return;
    const from = el.getBoundingClientRect();
    let done = false;
    const finish = () => { if (done) return; done = true; setClosing(false); };
    const a = el.animate([
      { transform: 'translate(0,0) scale(1,1)', opacity: 1 },
      { transform: `translate(${to.left - from.left}px,${to.top - from.top}px) scale(${to.width / from.width},${to.height / from.height})`, opacity: 0.5 },
    ], { duration: MOTION_MS, easing: EASING, fill: 'both' });
    a.onfinish = finish;
    a.oncancel = finish;
    const backstop = setTimeout(finish, MOTION_MS + 150);
    return () => clearTimeout(backstop);
  }, [closing]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!open && !closing) fallback.current = null; }, [open, closing]);

  /* Escape closes the window before it closes whatever is behind it, but only
     the active one, and never while a title is being renamed, where Escape
     means "put the old name back". Captures, so it runs before that field's
     own handler and has to look rather than be stopped by it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !isActive.current) return;
      if ((e.target as Element | null)?.closest?.('[data-tenon-editing]')) return;
      e.stopPropagation();
      close.current();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Focus lands on the box unless something inside already took it. */
  useEffect(() => {
    const el = box.current;
    if (open && el && !el.contains(document.activeElement)) el.focus({ preventScroll: true });
  }, [open]);

  const current: WindowRect = local ?? s.rect ?? fallback.current ?? { x: 0, y: 0, width: minWidth, height: minHeight };
  const currentRef = useLatest(current);

  const startDrag = (kind: 'move' | Edge, e: ReactPointerEvent) => {
    e.preventDefault();
    const start = { x: e.clientX, y: e.clientY, rect: { ...currentRef.current } };
    setDragging(true);
    let last = start.rect;
    const l = limits.current;
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.x, dy = ev.clientY - start.y, o = start.rect;
      let next: WindowRect;
      if (kind === 'move') next = clamp({ x: o.x + dx, y: o.y + dy, width: o.width, height: o.height });
      else {
        next = { ...o };
        if (kind.includes('e')) next.width = o.width + dx;
        if (kind.includes('s')) next.height = o.height + dy;
        if (kind.includes('w')) {
          /* Growing leftwards moves the origin, but only as far as the
             minimum width allows, or the panel would slide while refusing to
             shrink. */
          const width = Math.max(l.minWidth, Math.min(l.maxWidth, o.width - dx));
          next.x = o.x + (o.width - width);
          next.width = width;
        }
        if (kind.includes('n')) {
          const height = Math.max(l.minHeight, o.height - dy);
          next.y = o.y + (o.height - height);
          next.height = height;
        }
        next = clamp(next);
      }
      last = next;
      setLocal(next);
      live.current?.(next);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      if (last !== start.rect) changed.current?.(last);
      /* One frame late. The last move and this release can be flushed in one
         render, and turning the reflow transition on in the same render as
         the final size would glide the last few pixels. */
      requestAnimationFrame(() => setDragging(false));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  if (!open && !closing) return null;

  return createPortal(
    <div className="tenon-window-layer" style={{ zIndex }}>
      <div
        ref={box}
        role="dialog"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx('tenon-window', peeked && 'tenon-window--peeked', s.className)}
        style={{
          left: current.x, top: current.y, width: current.width, height: current.height,
          /* Off while a drag is live, so the window tracks the pointer with
             no lag, and for the first placement. On otherwise, so a rect the
             page sets glides there instead of jumping. */
          transition: dragging || !settled ? 'none' : REFLOW,
        }}
        /* Any press inside brings it to the front, captured ahead of the drag
           handlers so a page never has to guess whether a gesture counts. */
        onPointerDownCapture={() => focused.current?.()}
        {...s.rest}
      >
        <div
          className="tenon-modal__head tenon-window__head"
          onPointerDown={(e) => {
            /* A press on a button or a field is a click on that, never the
               start of a drag. */
            if ((e.target as Element).closest('button,a,input,textarea,[contenteditable="true"]')) return;
            startDrag('move', e);
          }}
        >
          <div className="tenon-modal__titles">
            <h2 id={titleId} className="tenon-modal__title">{s.title}</h2>
            {s.subtitle && <div className="tenon-modal__subtitle">{s.subtitle}</div>}
          </div>
          {s.headEnd}
          {closeButton && (
            <Button variant="ghost" size="sm" iconOnly aria-label="Close" onClick={() => close.current()}>×</Button>
          )}
        </div>
        <div className={cx('tenon-modal__body', s.bare && 'tenon-modal__body--bare')}>{s.children}</div>
        {s.footer && <div className={cx('tenon-modal__footer', s.bare && 'tenon-modal__footer--bare')}>{s.footer}</div>}
        {EDGES.map((edge) => (
          <div key={edge} className={cx('tenon-window__grip', `tenon-window__grip--${edge}`)} data-edge={edge} onPointerDown={(e) => startDrag(edge, e)} />
        ))}
      </div>
    </div>,
    document.body,
  );
}
