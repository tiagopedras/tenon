import { HTMLAttributes } from 'react';
export type PillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error';
export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: PillTone;
    /** A filled dot before the label. */
    dot?: boolean;
    /** Small capitals, for a state word like BUILT or OFF. */
    caps?: boolean;
}
export declare function Pill({ tone, dot, caps, className, children, ...rest }: PillProps): import("react").JSX.Element;
