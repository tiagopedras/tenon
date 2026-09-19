import { ReactNode } from 'react';
/** 400, 560, 760 and 912px. A confirmation, a form, a document, and a document with a side column. */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    /** A quieter line under the title. It wraps, so it can carry a column, a date and an author. */
    subtitle?: ReactNode;
    /** Sits in the head beside the close button. */
    headEnd?: ReactNode;
    /** Pinned under the body, right-aligned, so the answer never scrolls away. */
    footer?: ReactNode;
    size?: ModalSize;
    /** `split` is a body with columns that each scroll: pass `ModalPane`s. */
    layout?: 'stack' | 'split';
    /** The corner can be dragged. On a phone-width screen it cannot, and the box is full width. */
    resizable?: boolean;
    /** With `resizable`, the size is kept under this name in localStorage and comes back next time. */
    resizeKey?: string;
    /** The X in the head. On unless it is turned off, because the scrim and Escape are not visible. */
    closeButton?: boolean;
    /** The body and footer draw no padding and no layout of their own, for content that arranges itself: a transcript and its composer. */
    bare?: boolean;
    /** Where focus lands. `footer` is the first footer button, for a confirmation whose first answer is the safe one. */
    initialFocus?: 'box' | 'footer';
    /** ⌘↵ or Ctrl↵ from inside a text field. Never from a button, so a stray shortcut cannot answer a confirmation. */
    onSubmit?: () => void;
    className?: string;
    children: ReactNode;
}
export declare function Modal({ open, onClose, title, subtitle, headEnd, footer, size, layout, resizable, resizeKey, closeButton, bare, initialFocus, onSubmit, className, children, }: ModalProps): import('react').ReactPortal | null;
export interface ModalPaneProps {
    /** A quieter column on the default background, for what sits beside the main one: a history, a list of sections. */
    aside?: boolean;
    className?: string;
    children: ReactNode;
}
export declare function ModalPane({ aside, className, children }: ModalPaneProps): import("react").JSX.Element;
