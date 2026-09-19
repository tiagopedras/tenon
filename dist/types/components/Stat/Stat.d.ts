import { HTMLAttributes, ReactNode } from 'react';
export type StatTone = 'default' | 'accent' | 'success' | 'warning' | 'error';
export interface StatProps extends HTMLAttributes<HTMLDivElement> {
    /** The small label above the figure, inside the box. */
    eyebrow?: ReactNode;
    /** The figure. A string so "2 of 2" is as welcome as a count. */
    value: ReactNode;
    /** What the figure counts, under it. */
    caption?: ReactNode;
    tone?: StatTone;
}
export declare function Stat({ eyebrow, value, caption, tone, className, ...rest }: StatProps): import("react").JSX.Element;
