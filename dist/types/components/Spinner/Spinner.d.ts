import { HTMLAttributes } from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: SpinnerSize;
    /** Read out by a screen reader. The mark itself carries no words. */
    label?: string;
}
export declare function Spinner({ size, label, className, ...rest }: SpinnerProps): import("react").JSX.Element;
