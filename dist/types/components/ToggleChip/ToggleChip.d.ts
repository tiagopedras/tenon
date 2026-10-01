import { ButtonHTMLAttributes } from 'react';
export interface ToggleChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
    /** Whether the filter it stands for is applied. */
    pressed: boolean;
}
export declare function ToggleChip({ pressed, className, type, ...rest }: ToggleChipProps): import("react").JSX.Element;
