import { HTMLAttributes } from 'react';
export interface Step<V extends string = string> {
    value: V;
    label: string;
    /** Colours the fill and the handle at this stop. Any CSS colour. */
    colour?: string;
}
export interface StepSliderProps<V extends string = string> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'role'> {
    steps: Step<V>[];
    value: V;
    /** Called once a drag, click or key press has settled on a stop. */
    onChange: (value: V) => void;
    disabled?: boolean;
    /** Draws a native <select> beside the slider and shows it instead at 640px and under.
     *  For a pick from a list rather than a scale, where the labels would touch. */
    selectOnNarrow?: boolean;
    /** Names the field for a screen reader: Impact, Column. */
    'aria-label': string;
}
export declare function StepSlider<V extends string = string>({ steps, value, onChange, disabled, selectOnNarrow, className, ...rest }: StepSliderProps<V>): import("react").JSX.Element;
