export interface TagChipProps {
    /** The key: due, owner. */
    label: string;
    /** What it is set to. Shown after the label and edited in place. */
    value?: string;
    /** Amber, for a tag nothing else reads. */
    tone?: 'neutral' | 'warning';
    /** Cannot be edited: no pointer, no hover. */
    readOnly?: boolean;
    /** Called with the new value on Enter or when focus leaves. An empty string means clear it. */
    onCommit: (value: string) => void;
    className?: string;
}
export declare function TagChip({ label, value, tone, readOnly, onCommit, className }: TagChipProps): import("react").JSX.Element;
export interface TagChipAddProps {
    /** Return a message to refuse the tag and keep the fields open, or nothing to accept it. */
    onAdd: (key: string, value: string) => string | void;
    /** Called with the refusal message so the page can show it. */
    onRefuse?: (message: string) => void;
    className?: string;
}
export declare function TagChipAdd({ onAdd, onRefuse, className }: TagChipAddProps): import("react").JSX.Element;
