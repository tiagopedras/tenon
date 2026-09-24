import { HTMLAttributes } from 'react';
export interface DragHandleProps extends HTMLAttributes<HTMLSpanElement> {
    draggable?: boolean;
}
export declare function DragHandle({ className, ...rest }: DragHandleProps): import("react").JSX.Element;
/** `<DragHandle/>` as an HTML string, for a list built as one. The same
 *  markup, byte for byte, which the to-dos board's tests hold it to. */
export declare function dragHandleHTML(className?: string): string;
