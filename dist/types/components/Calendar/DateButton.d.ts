import { ButtonHTMLAttributes } from 'react';
export interface DateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Greys the text, for "Any time" or "No date". */
    empty?: boolean;
    /** Whether the Calendar it opens is showing. */
    open?: boolean;
}
export declare function DateButton({ empty, open, className, type, ...rest }: DateButtonProps): import("react").JSX.Element;
