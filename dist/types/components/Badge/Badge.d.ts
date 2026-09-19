import { HTMLAttributes } from 'react';
export type BadgeTone = 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'running';
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Nought or less draws nothing at all; above `max` it reads 99+. */
    count: number;
    /** What the count is of, for a screen reader and the tooltip. */
    label?: string;
    max?: number;
    tone?: BadgeTone;
}
export declare function Badge({ count, label, max, tone, className, ...rest }: BadgeProps): import("react").JSX.Element | null;
