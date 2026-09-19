import { TextareaHTMLAttributes } from 'react';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Grows with what is typed, up to the CSS max-height, then scrolls. */
    autoGrow?: boolean;
    invalid?: boolean;
}
export declare const Textarea: import('react').ForwardRefExoticComponent<TextareaProps & import('react').RefAttributes<HTMLTextAreaElement>>;
