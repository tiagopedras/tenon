import { ReactNode, HTMLAttributes, ElementType } from 'react';
export type CardSlot = ReactNode | {
    __html: string;
};
export type CardElevation = 'flat' | 'raised';
export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> {
    title?: ReactNode;
    /** Above the title, in the accent colour, so a card's mark and its label agree. */
    eyebrow?: CardSlot;
    /** Before the title. A position, an index, a key. */
    lead?: ReactNode;
    /** After the title, pushed right. */
    action?: ReactNode;
    tags?: CardSlot;
    meta?: CardSlot;
    summary?: CardSlot;
    /** Unwrapped, between summary and footer. A progress bar, a chart, a preview. */
    body?: ReactNode;
    footer?: CardSlot;
    /** The 4px inset down the left edge, and the eyebrow's colour. Undefined
     *  draws no mark at all, which is not the same as drawing a grey one. */
    accent?: string;
    elevation?: CardElevation;
    draggable?: boolean;
    dragging?: boolean;
    /** Adds the hover and pointer. Give it an onClick and a role too. */
    interactive?: boolean;
    /** 'article' unless a caller needs the card to be something else. */
    as?: ElementType;
    children?: ReactNode;
}
export declare function Card({ title, eyebrow, lead, action, tags, meta, summary, body, footer, accent, elevation, draggable, dragging, interactive, as: Tag, className, style, children, ...rest }: CardProps): import("react").JSX.Element;
