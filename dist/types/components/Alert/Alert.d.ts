import { HTMLAttributes, ReactNode } from 'react';
export type AlertTone = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: AlertTone;
    title?: ReactNode;
    /** Buttons that answer it. Sit under the text. */
    actions?: ReactNode;
}
export declare function Alert({ tone, title, actions, className, children, ...rest }: AlertProps): import("react").JSX.Element;
