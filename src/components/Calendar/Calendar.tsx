import { useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './Calendar.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/** A date as `YYYY-MM-DD`, in local time. */
export function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parse(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The chosen day as `YYYY-MM-DD`, or empty for none. */
  value: string;
  /** Called with a day, or an empty string when Clear is pressed. */
  onChange: (value: string) => void;
  /** Today as `YYYY-MM-DD`. Defaults to the clock; pass it to keep a test steady. */
  today?: string;
  /** Hides the Today and Clear buttons. */
  bare?: boolean;
}

/* A month grid, weeks starting Monday. It is not a popover: it sits in the
   flow where it is put, because a panel that scrolls cuts a floating calendar
   off at the bottom edge. Pair it with DateButton, or any control that opens it. */
export function Calendar({ value, onChange, today, bare = false, className, ...rest }: CalendarProps) {
  const now = today ?? toIsoDate(new Date());
  const start = parse(value) ?? parse(now) ?? new Date();
  const [month, setMonth] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const y = month.getFullYear(), m = month.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const step = (n: number) => setMonth(new Date(y, m + n, 1));

  return (
    <div className={cx('tenon-calendar', className)} {...rest}>
      <div className="tenon-calendar__head">
        <button type="button" className="tenon-calendar__nav" title="Previous month" aria-label="Previous month" onClick={() => step(-1)}>‹</button>
        <strong>{MONTHS[m]} {y}</strong>
        <button type="button" className="tenon-calendar__nav" title="Next month" aria-label="Next month" onClick={() => step(1)}>›</button>
      </div>
      <div className="tenon-calendar__grid">
        {DAYS.map((w) => <span key={w} className="tenon-calendar__weekday" title={w}>{w[0]}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={`p${i}`} className="tenon-calendar__day tenon-calendar__day--pad" />)}
        {Array.from({ length: days }, (_, i) => {
          const key = toIsoDate(new Date(y, m, i + 1));
          return (
            <button
              key={key}
              type="button"
              data-day={key}
              aria-pressed={key === value}
              className={cx('tenon-calendar__day', key === value && 'tenon-calendar__day--on', key === now && 'tenon-calendar__day--today')}
              onClick={() => onChange(key)}
            >{i + 1}</button>
          );
        })}
      </div>
      {!bare && (
        <div className="tenon-calendar__foot">
          <button type="button" className="tenon-calendar__small" data-day={now} onClick={() => onChange(now)}>Today</button>
          <button type="button" className="tenon-calendar__small" data-day="" onClick={() => onChange('')}>Clear</button>
        </div>
      )}
    </div>
  );
}
