import type { HTMLAttributes, CSSProperties } from 'react';
import { cx } from '../../utils';
import './Badge.css';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info';
/** The ten categorical colours. One per bucket, as on the board. */
export type BadgeChart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Overrides `tone`. Colours the badge with chart.N. */
  chart?: BadgeChart;
  /** Shows a filled dot before the label, for a legend. */
  dot?: boolean;
}

export function Badge({ tone = 'neutral', chart, dot = false, className, children, style, ...rest }: BadgeProps) {
  const chartStyle = chart
    ? ({ ['--tenon-chart-colour' as string]: `var(--tenon-chart-${chart})`, ...style } as CSSProperties)
    : style;

  return (
    <span
      className={cx('tenon-badge', chart ? 'tenon-badge--chart' : `tenon-badge--${tone}`, className)}
      style={chartStyle}
      {...rest}
    >
      {dot && <span className="tenon-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
