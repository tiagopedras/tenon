import type { HTMLAttributes, CSSProperties } from 'react';
import { cx } from '../../utils';
import './Tag.css';

export type TagTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'running';
/** The ten categorical colours. One per bucket, as on the board. */
export type TagChart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  /** Overrides `tone`. Colours the tag with chart.N. */
  chart?: TagChart;
  /** Shows a filled dot before the label, for a legend. */
  dot?: boolean;
}

export function Tag({ tone = 'neutral', chart, dot = false, className, children, style, ...rest }: TagProps) {
  const withChart = chart
    ? ({ ['--tenon-tag-colour' as string]: `var(--tenon-chart-${chart})`, ...style } as CSSProperties)
    : style;

  return (
    <span
      className={cx('tenon-tag', chart ? 'tenon-tag--chart' : `tenon-tag--${tone}`, className)}
      style={withChart}
      {...rest}
    >
      {dot && <span className="tenon-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
