import { ButtonHTMLAttributes } from 'react';
export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'role'> {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}
export declare const Switch: import('react').ForwardRefExoticComponent<SwitchProps & import('react').RefAttributes<HTMLButtonElement>>;
