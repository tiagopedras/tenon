export type ReorderAxis = 'x' | 'y';
export type DropSide = 'before' | 'after';
export type Over = {
    key: string;
    after: boolean;
};
type DragLike = {
    clientX: number;
    clientY: number;
    dataTransfer: DataTransfer | null;
    preventDefault(): void;
    stopPropagation(): void;
};
export declare const ITEM_ATTR = "data-tenon-reorder";
export declare const DROP_ATTR = "data-tenon-drop";
export declare const DRAGGING_ATTR = "data-tenon-dragging";
export declare const AXIS_ATTR = "data-tenon-axis";
export declare const GRIP_ATTR = "data-tenon-grip";
export declare const sameOver: (a: Over | null, b: Over | null) => boolean;
/** Whether the pointer is in the second half of `el`, along `axis`. */
export declare function isAfter(el: Element, x: number, y: number, axis: ReorderAxis): boolean;
/** The key the dragged item lands just before, or null for the end. */
export declare function beforeKey(keys: string[], dragged: string, over: Over): string | null;
/** Set a drag going: moveable, carrying data (Firefox cancels a drag that
 *  carries none), and pictured as the whole item rather than the few
 *  pixels of a grip, held where the pointer picked it up. */
export declare function startDrag(ev: DragLike, key: string, item: Element | null): void;
/** Run `fn` a tick after dragstart. The browser takes its picture of the
 *  dragged item just after dragstart returns, so the fade has to wait or
 *  the picture comes out faded or blank. */
export declare const afterPicture: (fn: () => void) => void;
/** Take a dragover or drop for this list and let it go no further, so a
 *  handler further up (a list's own gap handler, a board's day cell)
 *  cannot act on it a second time. */
export declare function claim(ev: DragLike): void;
export {};
