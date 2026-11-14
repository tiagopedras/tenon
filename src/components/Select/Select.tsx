import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Select.css';

/* Drawn after the select in Select and in Field, inside a wrapper that
   positions it. Not exported from the package. */
export function SelectChevron() {
  return (
    <svg className="tenon-select__chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* `multiple` and `size` turn a select into a list box, which this skin
   does not draw. HTML gives a select no read-only state, so a value that
   cannot be changed is shown as text or as a disabled select. */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple' | 'size'> {
  invalid?: boolean;
}

/* The bare control, for anywhere the label is drawn by something else.
   When there is a label, use Field with `select`. The options are plain
   <option> and <optgroup> children. A list whose options carry an icon or
   a heading is a Dropdown. `className` goes on the wrapper, which is the
   box a layout sizes; the ref is the select. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, children, ...rest },
  ref,
) {
  return (
    <span className={cx('tenon-select', invalid && 'tenon-select--invalid', className)}>
      <select
        ref={ref}
        aria-invalid={invalid ? true : undefined}
        className="tenon-select__control"
        {...rest}
      >
        {children}
      </select>
      <SelectChevron />
    </span>
  );
});
