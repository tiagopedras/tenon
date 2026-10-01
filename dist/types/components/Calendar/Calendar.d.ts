import { HTMLAttributes } from 'react';
/** A date as `YYYY-MM-DD`, in local time. */
export declare function toIsoDate(d: Date): string;
export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The chosen day as `YYYY-MM-DD`, or empty for none. */
    value: string;
    /** Called with a day, or an empty string when Clear is pressed. */
    onChange: (value: string) => void;
    /** Today as `YYYY-MM-DD`. Defaults to the clock; pass it to keep a test steady. */
    today?: string;
    /** Hides the Today and Clear buttons. */
    bare?: boolean;
}
export declare function Calendar({ value, onChange, today, bare, className, ...rest }: CalendarProps): import("react").JSX.Element;
