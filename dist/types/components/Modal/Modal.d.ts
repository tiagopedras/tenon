import { ReactNode } from 'react';
export type ModalSize = 'sm' | 'md' | 'lg';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    /** A quieter line under the title. */
    subtitle?: ReactNode;
    /** Sits at the right of the head, beside the title. Put the close button here if the modal wants one. */
    headEnd?: ReactNode;
    /** Pinned under the body, so the answer never scrolls away. */
    footer?: ReactNode;
    size?: ModalSize;
    className?: string;
    children: ReactNode;
}
export declare function Modal({ open, onClose, title, subtitle, headEnd, footer, size, className, children }: ModalProps): import('react').ReactPortal | null;
