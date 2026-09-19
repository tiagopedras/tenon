import { ReactNode } from 'react';
export interface MarkdownProps {
    children: string;
    /** Only the inline half: code, bold, italics and links, in a span. For a short line, not a reply. */
    inline?: boolean;
    className?: string;
}
export declare function inlineNodes(text: string): ReactNode[];
export declare function Markdown({ children, inline, className }: MarkdownProps): import("react").JSX.Element;
