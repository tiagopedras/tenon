import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils';
import { Button } from '../Button/Button';
import './Modal.css';

/** 400, 560, 760 and 912px. A confirmation, a form, a document, and a document with a side column. */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** A quieter line under the title. It wraps, so it can carry a column, a date and an author. */
  subtitle?: ReactNode;
  /** Sits in the head beside the close button. */
  headEnd?: ReactNode;
  /** Pinned under the body, right-aligned, so the answer never scrolls away. */
  footer?: ReactNode;
  size?: ModalSize;
  /** `split` is a body with columns that each scroll: pass `ModalPane`s. */
  layout?: 'stack' | 'split';
  /** The corner can be dragged. On a phone-width screen it cannot, and the box is full width. */
  resizable?: boolean;
  /** With `resizable`, the size is kept under this name in localStorage and comes back next time. */
  resizeKey?: string;
  /** The X in the head. On unless it is turned off, because the scrim and Escape are not visible. */
  closeButton?: boolean;
  /** Where focus lands. `footer` is the first footer button, for a confirmation whose first answer is the safe one. */
  initialFocus?: 'box' | 'footer';
  /** ⌘↵ or Ctrl↵ from inside a text field. Never from a button, so a stray shortcut cannot answer a confirmation. */
  onSubmit?: () => void;
  className?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/* A field you type prose into. A checkbox, a select or a button inside the
   box is not one. */
const TEXT_INPUT = ['text', 'search', 'url', 'email', 'tel', 'password', 'number', 'date'];
function isTextField(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  if (el instanceof HTMLTextAreaElement || el.isContentEditable) return true;
  return el instanceof HTMLInputElement && TEXT_INPUT.includes((el.type || 'text').toLowerCase());
}

interface Stored { w: number; h: number }
function readSize(key: string): Stored | null {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    if (raw && raw.w > 0 && raw.h > 0) return raw;
  } catch { /* a corrupt value is the same as none */ }
  return null;
}

export function Modal({
  open, onClose, title, subtitle, headEnd, footer, size = 'md', layout = 'stack',
  resizable = false, resizeKey, closeButton = true, initialFocus = 'box', onSubmit, className, children,
}: ModalProps) {
  const box = useRef<HTMLDivElement>(null);
  const titleId = useId();
  /* Read through refs so a parent that passes a new function every render
     does not tear the listeners down and put focus back on the opener. */
  const close = useRef(onClose);
  close.current = onClose;
  const submit = useRef(onSubmit);
  submit.current = onSubmit;

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const node = box.current!;
    const start = initialFocus === 'footer' ? node.querySelector<HTMLElement>('.tenon-modal__footer button:not([disabled])') : null;
    (start ?? node.querySelector<HTMLElement>('[autofocus]') ?? node).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); close.current(); return; }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        if (submit.current && node.contains(e.target as Node) && isTextField(e.target)) { e.preventDefault(); submit.current(); }
        return;
      }
      if (e.key !== 'Tab') return;
      /* Keep Tab inside the box. Without this it walks out into a page the
         scrim is meant to have put out of reach. */
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) { e.preventDefault(); return; }
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => { document.removeEventListener('keydown', onKey, true); opener?.focus?.(); };
  }, [open, initialFocus]);

  /* Restores the size last dragged to and records the next one. Measured with
     offsetWidth, not getBoundingClientRect: the box scales in as it opens, and
     a rect taken mid-animation would read as a resize nobody made. Only a
     change away from the size it opened at is worth keeping, so opening and
     closing never overwrites a stored size with the default. */
  useEffect(() => {
    if (!open || !resizable || !resizeKey || typeof ResizeObserver !== 'function') return;
    const el = box.current!;
    const stored = readSize(resizeKey);
    if (stored) { el.style.width = `${stored.w}px`; el.style.height = `${stored.h}px`; }
    const measure = () => ({ w: el.offsetWidth, h: el.offsetHeight });
    const base = measure();
    const seen = new ResizeObserver(() => {
      if (!el.isConnected) return;
      const now = measure();
      if (Math.abs(now.w - base.w) < 2 && Math.abs(now.h - base.h) < 2) return;
      try { localStorage.setItem(resizeKey, JSON.stringify(now)); } catch { /* full or blocked: not worth saying */ }
    });
    seen.observe(el);
    return () => seen.disconnect();
  }, [open, resizable, resizeKey]);

  if (!open) return null;

  return createPortal(
    <div className="tenon-modal">
      <div className="tenon-modal__scrim" onClick={() => close.current()} />
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx('tenon-modal__box', `tenon-modal__box--${size}`, resizable && 'tenon-modal__box--resizable', className)}
      >
        <div className="tenon-modal__head">
          <div className="tenon-modal__titles">
            <h2 id={titleId} className="tenon-modal__title">{title}</h2>
            {subtitle && <div className="tenon-modal__subtitle">{subtitle}</div>}
          </div>
          {headEnd}
          {closeButton && (
            <Button variant="ghost" size="sm" iconOnly aria-label="Close" onClick={() => close.current()}>×</Button>
          )}
        </div>
        <div className={cx('tenon-modal__body', layout === 'split' && 'tenon-modal__body--split')}>{children}</div>
        {footer && <div className="tenon-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

export interface ModalPaneProps {
  /** A quieter column on the default background, for what sits beside the main one: a history, a list of sections. */
  aside?: boolean;
  className?: string;
  children: ReactNode;
}

/* One column of a `split` body. Each scrolls on its own, so a long history
   does not push the main text off the screen. Below 700px they stack, and an
   aside drops under the main column. */
export function ModalPane({ aside = false, className, children }: ModalPaneProps) {
  return <div className={cx('tenon-modal__pane', aside && 'tenon-modal__pane--aside', className)}>{children}</div>;
}
