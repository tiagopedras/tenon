import { HTMLAttributes } from 'react';
import { OrbState } from 'thinking-orbs';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerState = OrbState;
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: SpinnerSize;
    /** Read out by a screen reader. The mark itself carries no words. */
    label?: string;
    /** `orb` is a dotted sphere from thinking-orbs. `ring` turns. `glyph` cycles through the asterisks the Claude CLI draws while it thinks. */
    variant?: 'orb' | 'ring' | 'glyph';
    /** Which of the orb's animations to draw, for a caller following what a run is doing. `solving` unless set. Orb only. */
    state?: SpinnerState;
}
export declare function Spinner({ size, label, variant, state, className, ...rest }: SpinnerProps): import("react").JSX.Element;
