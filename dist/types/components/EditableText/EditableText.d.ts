export interface EditableTextProps {
    value: string;
    /** Called with what was typed, and only when it is not empty and not what it already was. */
    onCommit: (next: string) => void;
    /** The tooltip that says it can be edited. */
    hint?: string;
    className?: string;
}
export declare function EditableText({ value, onCommit, hint, className }: EditableTextProps): import("react").JSX.Element;
