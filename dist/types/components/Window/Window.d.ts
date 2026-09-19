import { HTMLAttributes, ReactNode } from 'react';
export interface WindowRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/** Where a window grows out of and shrinks back into: a DOMRect, or the same four numbers. */
export interface WindowOrigin {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface WindowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onFocus'> {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    subtitle?: ReactNode;
    /** Sits in the head beside the close button. */
    headEnd?: ReactNode;
    footer?: ReactNode;
    /** Where the page says the window is. Leave it out and the window opens near the middle at a readable width. Pass the same object until the place changes: a new one, even with the same numbers, means "put it here", and cancels a drag it had finished. */
    rect?: WindowRect | null;
    /** Every move of a drag or resize, as it happens. */
    onRectLive?: (rect: WindowRect) => void;
    /** The rect a drag or resize ended on. Keep it and pass it back as `rect` to have the window remembered. */
    onRectChange?: (rect: WindowRect) => void;
    /** The window grows out of this on opening and shrinks back into it on closing, so the thing clicked and the window read as one object. */
    growFrom?: WindowOrigin | null;
    /** Its place in the page's own stacking order. */
    zIndex?: number;
    /** Escape closes only the active window, so one key press never takes every window down at once. */
    active?: boolean;
    /** Parked out of the way, dimmed. What that means for the rect is the page's to say. */
    peeked?: boolean;
    /** Any pointer press inside it, including one that goes on to start a drag. */
    onFocus?: () => void;
    closeButton?: boolean;
    /** The body and footer draw no padding and no layout of their own. */
    bare?: boolean;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
}
export declare function Window({ open, onClose, title, subtitle, headEnd, footer, rect, onRectLive, onRectChange, growFrom, zIndex, active, peeked, onFocus, closeButton, bare, minWidth, maxWidth, minHeight, className, children, ...rest }: WindowProps): import('react').ReactPortal | null;
