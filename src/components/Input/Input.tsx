import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Input.css';

/* The kinds of input that are a line of text. A checkbox, a radio or a
   range drawn in this skin would be a box pretending to be something else. */
export type InputType = 'text' | 'email' | 'number' | 'search' | 'url' | 'tel' | 'password';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType;
  invalid?: boolean;
}

/* The bare control, Textarea's one-line sibling, for anywhere the label is
   drawn by something else. When there is a label, use Field. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = 'text', invalid, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid ? true : undefined}
      className={cx('tenon-input', invalid && 'tenon-input--invalid', className)}
      {...rest}
    />
  );
});
