import { HTMLAttributes } from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: SpinnerSize;
    /** Read out by a screen reader. The mark itself carries no words. */
    label?: string;
    /** `ring` turns. `glyph` cycles through the asterisks the Claude CLI draws while it thinks. */
    variant?: 'ring' | 'glyph';
}
export declare function Spinner({ size, label, variant, className, ...rest }: SpinnerProps): import("react").JSX.Element;
