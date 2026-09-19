import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Switch.css';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'role'> {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

/* A button with role="switch" rather than a styled checkbox, so it takes
   Space and Enter for free and a screen reader says on or off. The label
   comes from aria-label or aria-labelledby; there is no visible text here. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, onChange, className, onClick, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      role="switch"
      aria-checked={checked}
      className={cx('tenon-switch', checked && 'tenon-switch--on', className)}
      onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) onChange?.(!checked); }}
      {...rest}
    />
  );
});
