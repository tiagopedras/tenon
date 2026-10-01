import { HTMLAttributes, ReactNode } from 'react';
export interface ToggleOption<V extends string = string> {
    value: V;
    label: ReactNode;
    /** A small grey count after the label. */
    count?: number;
    /** Colours the dot before the label. Any CSS colour, usually `var(--tenon-chart-3)`. No dot without it. */
    colour?: string;
    title?: string;
    disabled?: boolean;
    className?: string;
}
export interface ToggleGroupProps<V extends string = string> extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    options: ToggleOption<V>[];
    /** Which options are on. Several can be. */
    value: readonly V[];
    /** Called with the option that was clicked. The caller decides what that does to `value`,
     *  which is how an "All" option can clear the rest. */
    onToggle: (value: V) => void;
    /** Names the group for a screen reader: Buckets, Themes. */
    'aria-label': string;
}
export declare function ToggleGroup<V extends string = string>({ options, value, onToggle, className, ...rest }: ToggleGroupProps<V>): import("react").JSX.Element;
