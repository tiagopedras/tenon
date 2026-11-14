import { SelectHTMLAttributes } from 'react';
export declare function SelectChevron(): import("react").JSX.Element;
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple' | 'size'> {
    invalid?: boolean;
}
export declare const Select: import('react').ForwardRefExoticComponent<SelectProps & import('react').RefAttributes<HTMLSelectElement>>;
