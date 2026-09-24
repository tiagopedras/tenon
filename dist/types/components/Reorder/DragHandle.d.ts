import { HTMLAttributes } from 'react';
export interface DragHandleProps extends HTMLAttributes<HTMLSpanElement> {
    draggable?: boolean;
}
export declare function DragHandle({ className, ...rest }: DragHandleProps): import("react").JSX.Element;
