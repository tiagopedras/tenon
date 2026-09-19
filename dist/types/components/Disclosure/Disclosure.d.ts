import { ReactNode } from 'react';
export interface DisclosureProps {
    /** The one line that is always showing. */
    summary: ReactNode;
    /** With `open`, the caller owns the state. Without it, this keeps its own. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
    children: ReactNode;
}
export declare function Disclosure({ summary, open, defaultOpen, onOpenChange, className, children }: DisclosureProps): import("react").JSX.Element;
