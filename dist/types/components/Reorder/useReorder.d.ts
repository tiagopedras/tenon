import { DragEvent } from 'react';
export type ReorderAxis = 'x' | 'y';
export type DropSide = 'before' | 'after';
export interface ReorderOptions {
    /** Every key in the list, in the order shown. */
    keys: string[];
    /** Put `key` just before `before`, or at the end when `before` is null. */
    onMove: (key: string, before: string | null) => void;
    /** 'y' for a column of rows, 'x' for cards read left to right. */
    axis?: ReorderAxis;
}
export interface ReorderHandleProps {
    draggable: true;
    onDragStart: (ev: DragEvent<HTMLElement>) => void;
    onDragEnd: () => void;
}
export interface ReorderItemProps {
    'data-tenon-reorder': string;
    'data-tenon-drop'?: DropSide;
    'data-tenon-dragging'?: '';
    onDragOver: (ev: DragEvent<HTMLElement>) => void;
    onDrop: (ev: DragEvent<HTMLElement>) => void;
}
export interface ReorderItem {
    dragging: boolean;
    drop: DropSide | null;
    /** Spread on the grip. Or on the item itself, to pick up the whole item. */
    handleProps: ReorderHandleProps;
    /** Spread on the item. */
    itemProps: ReorderItemProps;
}
/** Move `key` to sit just before `before`, or last when `before` is null. */
export declare function reorderKeys(keys: string[], key: string, before: string | null): string[];
/** Sort items by a saved order of keys. An item the order does not name
 *  keeps its current place rather than jumping to the end, so something new
 *  still turns up where it would have without a saved order. */
export declare function applySavedOrder<T>(items: T[], keyOf: (item: T) => string, order: string[]): T[];
export declare function useReorder({ keys, onMove, axis }: ReorderOptions): {
    item: (key: string) => ReorderItem;
    listProps: {
        'data-tenon-axis': ReorderAxis;
        onDragOver: (ev: DragEvent<HTMLElement>) => void;
        onDrop: (ev: DragEvent<HTMLElement>) => void;
    };
    dragging: string | null;
};
