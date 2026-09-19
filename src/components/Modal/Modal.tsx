import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils';
import './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** A quieter line under the title. */
  subtitle?: ReactNode;
  /** Sits at the right of the head, beside the title. Put the close button here if the modal wants one. */
  headEnd?: ReactNode;
  /** Pinned under the body, so the answer never scrolls away. */
  footer?: ReactNode;
  size?: ModalSize;
  className?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, title, subtitle, headEnd, footer, size = 'md', className, children }: ModalProps) {
  const box = useRef<HTMLDivElement>(null);
  const titleId = useId();
  /* Read through a ref so a parent that passes a new onClose every render
     does not tear the listeners down and put focus back on the opener. */
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const node = box.current!;
    (node.querySelector<HTMLElement>('[autofocus]') ?? node).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); close.current(); return; }
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
  }, [open]);

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
        className={cx('tenon-modal__box', `tenon-modal__box--${size}`, className)}
      >
        <div className="tenon-modal__head">
          <div className="tenon-modal__titles">
            <h2 id={titleId} className="tenon-modal__title">{title}</h2>
            {subtitle && <div className="tenon-modal__subtitle">{subtitle}</div>}
          </div>
          {headEnd}
        </div>
        <div className="tenon-modal__body">{children}</div>
        {footer && <div className="tenon-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
