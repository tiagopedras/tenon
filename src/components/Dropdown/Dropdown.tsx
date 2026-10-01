import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../utils';
import './Dropdown.css';

export interface DropdownOption<V extends string = string> {
  value: V;
  label: string;
  /** Drawn before the label, in the button and in the list: an avatar, a dot. */
  icon?: ReactNode;
  /** Options with the same group sit under one small heading. */
  group?: string;
}

export interface DropdownProps<V extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: DropdownOption<V>[];
  value: V;
  onChange: (value: V) => void;
  disabled?: boolean;
  /** Names the field for a screen reader: Delegate to, Bucket. */
  'aria-label': string;
}

/* A pick from a list where a native <select> cannot do the job, because an
   option has to carry an image or sit under a heading. For a short list of
   plain words use a native select, and for a scale use StepSlider. Enter or
   Space opens it, the arrow keys move, Escape shuts it. */
export function Dropdown<V extends string = string>(
  { options, value, onChange, disabled = false, className, 'aria-label': label, ...rest }: DropdownProps<V>,
) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const items = () => Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role=menuitemradio]') ?? []);
  const key = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); root.current?.querySelector<HTMLButtonElement>('button')?.focus(); return; }
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    if (!open) { setOpen(true); return; }
    const all = items();
    const at = all.indexOf(document.activeElement as HTMLButtonElement);
    all[(at + step + all.length) % all.length]?.focus();
  };

  let lastGroup: string | undefined;
  return (
    <div ref={root} className={cx('tenon-dropdown', open && 'tenon-dropdown--open', className)} onKeyDown={key} {...rest}>
      <button
        type="button"
        className="tenon-dropdown__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        {current?.icon}
        <span>{current?.label ?? ''}</span>
      </button>
      {open && !disabled && (
        <div className="tenon-dropdown__panel" role="menu" aria-label={label}>
          {options.map((o) => {
            const heading = o.group !== undefined && o.group !== lastGroup ? o.group : null;
            lastGroup = o.group;
            return (
              <div key={o.value} className="tenon-dropdown__entry">
                {heading && <div className="tenon-dropdown__heading">{heading}</div>}
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={o.value === value}
                  data-value={o.value}
                  className={cx('tenon-dropdown__item', o.value === value && 'tenon-dropdown__item--on')}
                  onClick={() => { setOpen(false); if (o.value !== value) onChange(o.value); }}
                >
                  {o.icon}
                  <span>{o.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
