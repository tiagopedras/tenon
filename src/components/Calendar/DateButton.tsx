import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Calendar.css';

export interface DateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Greys the text, for "Any time" or "No date". */
  empty?: boolean;
  /** Whether the Calendar it opens is showing. */
  open?: boolean;
}

/* The field a Calendar opens from: the date as text with a small calendar
   glyph at the end. The glyph goes when it is disabled, since there is
   nothing left for it to promise. */
export function DateButton({ empty = false, open = false, className, type = 'button', ...rest }: DateButtonProps) {
  return (
    <button
      type={type}
      aria-expanded={open}
      className={cx('tenon-date-button', empty && 'tenon-date-button--empty', className)}
      {...rest}
    />
  );
}
