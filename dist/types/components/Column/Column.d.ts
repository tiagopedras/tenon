import { ReactNode, HTMLAttributes, ElementType } from 'react';
export type ColumnTone = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'running';
export type ColumnLayout = 'stack' | 'prose';
export interface ColumnProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title: ReactNode;
    /** The title's element. Nothing is styled off it; the page outline is
     *  what cares — h2 for a section of the page, h3 for one inside a view. */
    titleAs?: ElementType;
    /** Straight after the title, inside the left group. A status icon, a
     *  spinner, whatever the app wants to say about the column itself. */
    titleAfter?: ReactNode;
    /** A quiet aside beside the title. */
    hint?: ReactNode;
    /** The head's right-hand group, in this order. */
    sort?: ReactNode;
    count?: ReactNode;
    action?: ReactNode;
    filters?: ReactNode;
    /** What the column is for, on its own line under the title row. */
    desc?: ReactNode;
    /** Below the body and outside it, so it does not scroll with the body. */
    footer?: ReactNode;
    /** 'stack' spaces children evenly, for a column of cards. 'prose' lets
     *  their own margins do it and gives the edges more room. */
    layout?: ColumnLayout;
    /** Tints the panel and colours the head. */
    tone?: ColumnTone;
    /** A quieter head, for a column that is finished or parked. */
    muted?: boolean;
    /** Draws a dashed edge. Tenon does not say what that means — on the
     *  to-dos board it means an agent owns the column and you do not drag
     *  into it, and the dash reads because nothing else in the app is
     *  dashed. Keep it to one meaning per app and it keeps working. */
    dashed?: boolean;
    /** Draws the column as a <details> whose <summary> is the head. */
    collapsible?: boolean;
    /** Only read when `collapsible`. Open unless explicitly false. */
    open?: boolean;
    /** Written to data-column-collapse, for whatever remembers the state.
     *  Falls back to nothing rather than to the title, which is not an id. */
    collapseKey?: string;
    bodyClassName?: string;
    /** Spread onto the body rather than the column, for anything that should
     *  cover the list and not the head: drop handlers, a data attribute. Its
     *  className is merged with bodyClassName. */
    bodyProps?: HTMLAttributes<HTMLDivElement>;
    children?: ReactNode;
}
export declare function Column({ title, titleAs: Title, titleAfter, hint, sort, count, action, filters, desc, footer, layout, tone, muted, dashed, collapsible, open, collapseKey, className, bodyClassName, bodyProps, children, ...rest }: ColumnProps): import("react").JSX.Element;
export interface ColumnEmptyProps extends HTMLAttributes<HTMLDivElement> {
    /** A dashed box rather than a line of grey text. For a wide column,
     *  where one faint line reads as a column that failed to load. */
    boxed?: boolean;
}
/** What a column draws when there is nothing in it. */
export declare function ColumnEmpty({ boxed, className, children, ...rest }: ColumnEmptyProps): import("react").JSX.Element;
