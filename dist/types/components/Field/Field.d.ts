import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
interface Shared {
    label: ReactNode;
    /** Sits under the control. Replaced by `error` when there is one. */
    hint?: ReactNode;
    /** Present means invalid. The text is announced, not just coloured. */
    error?: ReactNode;
    required?: boolean;
    className?: string;
}
export type FieldProps = Shared & ({
    multiline?: false;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'required' | 'className'> | {
    multiline: true;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required' | 'className'>);
export declare function Field({ label, hint, error, required, className, ...rest }: FieldProps): import("react").JSX.Element;
export {};
