import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import './ToggleGroup.css';

export interface ToggleOption<V extends string = string> {
  value: V;
  label: ReactNode;
  /** A small grey count after the label. */
  count?: number;
  /** Colours the dot before the label. Any CSS colour, usually `var(--tenon-chart-3)`. No dot without it. */
  colour?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
}

export interface ToggleGroupProps<V extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  options: ToggleOption<V>[];
  /** Which options are on. Several can be. */
  value: readonly V[];
  /** Called with the option that was clicked. The caller decides what that does to `value`,
   *  which is how an "All" option can clear the rest. */
  onToggle: (value: V) => void;
  /** Names the group for a screen reader: Buckets, Themes. */
  'aria-label': string;
}

/* A strip of filters where any number can be on, a bucket or a theme for
   instance. Each is a button with aria-pressed. When exactly one must be
   picked, use SegmentedControl, which is a radiogroup. */
export function ToggleGroup<V extends string = string>(
  { options, value, onToggle, className, ...rest }: ToggleGroupProps<V>,
) {
  return (
    <div role="group" className={cx('tenon-toggle-group', className)} {...rest}>
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            data-value={o.value}
            title={o.title}
            disabled={o.disabled}
            className={cx('tenon-toggle-group__option', on && 'tenon-toggle-group__option--on', o.className)}
            style={o.colour ? ({ ['--tenon-toggle-colour' as string]: o.colour } as CSSProperties) : undefined}
            onClick={() => onToggle(o.value)}
          >
            {o.colour && <i className="tenon-toggle-group__dot" aria-hidden="true" />}
            {o.label}
            {o.count !== undefined && <span className="tenon-toggle-group__count">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
