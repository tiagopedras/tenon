import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'confirm' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Renders as a square. The label still has to be given, via aria-label. */
    iconOnly?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
export declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
export declare const LinkButton: import('react').ForwardRefExoticComponent<LinkButtonProps & import('react').RefAttributes<HTMLAnchorElement>>;
