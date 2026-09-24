/* The public surface. A consumer imports from here and from the two CSS
   files; nothing reaches into src/components directly. */
export { Button, LinkButton } from './components/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize, LinkButtonProps } from './components/Button/Button';

/* Card and Badge came from the to-dos board, which had already run them
   across five views. Their anatomy is the board's; only the names changed. */
export { Card } from './components/Card/Card';
export type { CardProps, CardSlot, CardElevation } from './components/Card/Card';

export { Badge } from './components/Badge/Badge';
export type { BadgeProps, BadgeTone } from './components/Badge/Badge';

export { Tag } from './components/Tag/Tag';
export type { TagProps, TagTone, TagChart } from './components/Tag/Tag';

export { Column, ColumnEmpty } from './components/Column/Column';
export type { ColumnProps, ColumnEmptyProps, ColumnTone, ColumnLayout } from './components/Column/Column';

export { Stat } from './components/Stat/Stat';
export type { StatProps, StatTone } from './components/Stat/Stat';

export { Field } from './components/Field/Field';
export type { FieldProps } from './components/Field/Field';

/* The rest came from the chat engine and the agents dashboard, two apps that
   had each drawn their own. Neither loads them: both are plain JavaScript
   with no React, so for now this is where the anatomy is written down. */
export { Modal, ModalPane } from './components/Modal/Modal';
export type { ModalProps, ModalPaneProps, ModalSize } from './components/Modal/Modal';

export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea';

export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/Spinner/Spinner';

export { Pill } from './components/Pill/Pill';
export type { PillProps, PillTone } from './components/Pill/Pill';

export { Alert } from './components/Alert/Alert';
export type { AlertProps, AlertTone } from './components/Alert/Alert';

export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';

export { SegmentedControl } from './components/SegmentedControl/SegmentedControl';
export type { SegmentedControlProps, SegmentOption } from './components/SegmentedControl/SegmentedControl';

/* Added for the chat window, which became a React component in the chat
   engine and needed more than the first fourteen had. Each is a thing another
   window, a dashboard or a reader of model output will want too. */
export { Window } from './components/Window/Window';
export type { WindowProps, WindowRect, WindowOrigin } from './components/Window/Window';

export { Markdown, inlineNodes } from './components/Markdown/Markdown';
export type { MarkdownProps } from './components/Markdown/Markdown';

export { EditableText } from './components/EditableText/EditableText';
export type { EditableTextProps } from './components/EditableText/EditableText';

export { Disclosure } from './components/Disclosure/Disclosure';
export type { DisclosureProps } from './components/Disclosure/Disclosure';

/* Drag to reorder. Written for the agents dashboard's agents and targets,
   with the to-dos board's drop line, so the two apps drag the same way. */
export { useReorder, reorderKeys, applySavedOrder } from './components/Reorder/useReorder';
export type {
  ReorderOptions, ReorderItem, ReorderItemProps, ReorderHandleProps, ReorderAxis, DropSide,
} from './components/Reorder/useReorder';
export { bindReorder } from './components/Reorder/bindReorder';
export type { BindReorderOptions } from './components/Reorder/bindReorder';
export { DragHandle, dragHandleHTML } from './components/Reorder/DragHandle';
export type { DragHandleProps } from './components/Reorder/DragHandle';
export { DropLine } from './components/Reorder/DropLine';

export { cx } from './utils';
