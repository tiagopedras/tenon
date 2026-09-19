import { HTMLAttributes } from 'react';
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
export declare function Badge({ tone, chart, dot, className, children, style, ...rest }: BadgeProps): import("react").JSX.Element;
