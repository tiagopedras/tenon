import { HTMLAttributes, ReactNode } from 'react';
export interface DropdownOption<V extends string = string> {
    value: V;
    label: string;
    /** Drawn before the label, in the button and in the list: an avatar, a dot. */
    icon?: ReactNode;
    /** Options with the same group sit under one small heading. */
    group?: string;
}
export interface DropdownProps<V extends string = string> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    options: DropdownOption<V>[];
    value: V;
    onChange: (value: V) => void;
    disabled?: boolean;
    /** Names the field for a screen reader: Delegate to, Bucket. */
    'aria-label': string;
}
export declare function Dropdown<V extends string = string>({ options, value, onChange, disabled, className, 'aria-label': label, ...rest }: DropdownProps<V>): import("react").JSX.Element;
