import { HTMLAttributes, ReactNode } from 'react';
export interface SegmentOption<V extends string = string> {
    value: V;
    label: ReactNode;
    disabled?: boolean;
}
export interface SegmentedControlProps<V extends string = string> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'role'> {
    options: SegmentOption<V>[];
    value: V;
    onChange: (value: V) => void;
    /** A group of radios needs a name. Cards or List, for instance. */
    'aria-label': string;
}
export declare function SegmentedControl<V extends string = string>({ options, value, onChange, className, ...rest }: SegmentedControlProps<V>): import("react").JSX.Element;
