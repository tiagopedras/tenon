import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils';
import './ToggleChip.css';

export interface ToggleChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
  /** Whether the filter it stands for is applied. */
  pressed: boolean;
}

/* One on/off filter that reads as a sentence: "3 need scoring", and once
   pressed "Showing 3 unscored · show all". The pressed state is the warning
   colour, since a narrowed list is something to notice. For a choice among
   several, use ToggleGroup or SegmentedControl. */
export function ToggleChip({ pressed, className, type = 'button', ...rest }: ToggleChipProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      className={cx('tenon-toggle-chip', pressed && 'tenon-toggle-chip--on', className)}
      {...rest}
    />
  );
}
