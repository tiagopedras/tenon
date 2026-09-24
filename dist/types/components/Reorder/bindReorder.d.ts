import { ReorderAxis } from './reorderCore';
export interface BindReorderOptions {
    /** Put `key` just before `before`, or at the end when `before` is null.
     *  Called after the drag's marks are cleared, so it may redraw the list. */
    onMove: (key: string, before: string | null) => void;
    /** 'y' for a column of rows, 'x' for cards read left to right. */
    axis?: ReorderAxis;
    /** What a drag starts from, inside an item. Default `[data-tenon-grip]`. */
    grip?: string;
    /** What an item is. Default `[data-tenon-reorder]`. An item matched some
     *  other way needs `position: relative` of its own for the drop line. */
    item?: string;
    /** An item's key. Default its `data-tenon-reorder`. */
    keyOf?: (item: HTMLElement) => string;
}
export declare function bindReorder(list: HTMLElement, opts: BindReorderOptions): () => void;
