import { InputHTMLAttributes } from 'react';
export type InputType = 'text' | 'email' | 'number' | 'search' | 'url' | 'tel' | 'password';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    type?: InputType;
    invalid?: boolean;
}
export declare const Input: import('react').ForwardRefExoticComponent<InputProps & import('react').RefAttributes<HTMLInputElement>>;
