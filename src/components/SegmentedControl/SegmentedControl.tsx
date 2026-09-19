import { useRef } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../utils';
import './SegmentedControl.css';

export interface SegmentOption<V extends string = string> {
  value: V;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<V extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'role'> {
  options: SegmentOption<V>[];
  value: V;
  onChange: (value: V) => void;
  /** A group of radios needs a name. Cards or List, for instance. */
  'aria-label': string;
}

/* One of a few views of the same thing: Cards or List. It is a radiogroup,
   so Tab lands on the selected segment and the arrow keys move between them.
   If the choice opens a different page, use tabs instead. */
export function SegmentedControl<V extends string = string>(
  { options, value, onChange, className, ...rest }: SegmentedControlProps<V>,
) {
  const group = useRef<HTMLDivElement>(null);

  const move = (e: KeyboardEvent<HTMLButtonElement>, from: number) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    for (let i = 1; i <= options.length; i++) {
      const next = options[(from + step * i + options.length * i) % options.length];
      if (next.disabled) continue;
      onChange(next.value);
      group.current?.querySelector<HTMLButtonElement>(`[data-value="${CSS.escape(next.value)}"]`)?.focus();
      return;
    }
  };

  return (
    <div ref={group} role="radiogroup" className={cx('tenon-segmented', className)} {...rest}>
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            data-value={o.value}
            disabled={o.disabled}
            tabIndex={on ? 0 : -1}
            className={cx('tenon-segmented__option', on && 'tenon-segmented__option--on')}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => move(e, i)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
