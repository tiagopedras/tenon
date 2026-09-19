import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';
import type { TextareaHTMLAttributes, ChangeEvent } from 'react';
import { cx } from '../../utils';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Grows with what is typed, up to the CSS max-height, then scrolls. */
  autoGrow?: boolean;
  invalid?: boolean;
}

/* The bare control, for a composer or anywhere the label is drawn by
   something else. When there is a label, use Field with `multiline`. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { autoGrow = false, invalid, className, onChange, value, rows = 1, ...rest },
  forwarded,
) {
  const inner = useRef<HTMLTextAreaElement | null>(null);

  const fit = useCallback(() => {
    const el = inner.current;
    if (!el || !autoGrow) return;
    el.style.height = 'auto';
    /* scrollHeight leaves out the border, and the box is border-box. */
    el.style.height = `${el.scrollHeight + (el.offsetHeight - el.clientHeight)}px`;
  }, [autoGrow]);

  /* Runs for a controlled value changing from outside, like a draft being
     cleared after a send, as well as for typing. */
  useLayoutEffect(fit, [fit, value]);

  const ref = (el: HTMLTextAreaElement | null) => {
    inner.current = el;
    if (typeof forwarded === 'function') forwarded(el);
    else if (forwarded) forwarded.current = el;
  };

  return (
    <textarea
      ref={ref}
      rows={rows}
      value={value}
      aria-invalid={invalid ? true : undefined}
      className={cx('tenon-textarea', autoGrow && 'tenon-textarea--auto', invalid && 'tenon-textarea--invalid', className)}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { fit(); onChange?.(e); }}
      {...rest}
    />
  );
});
