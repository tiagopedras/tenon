import { HTMLAttributes } from 'react';
export type TagTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'running' | 'urgent' | 'soon';
/** The ten categorical colours. One per bucket, as on the board. */
export type TagChart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: TagTone;
    /** Overrides `tone`. Colours the tag with chart.N. */
    chart?: TagChart;
    /** Shows a filled dot before the label, for a legend. */
    dot?: boolean;
}
export declare function Tag({ tone, chart, dot, className, children, style, ...rest }: TagProps): import("react").JSX.Element;
