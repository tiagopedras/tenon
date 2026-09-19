import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../utils';
import './EditableText.css';

export interface EditableTextProps {
  value: string;
  /** Called with what was typed, and only when it is not empty and not what it already was. */
  onCommit: (next: string) => void;
  /** The tooltip that says it can be edited. */
  hint?: string;
  className?: string;
}

/* A name that turns into a field when you double-click it. Enter or leaving
   the field keeps what was typed, Escape puts the old name back. It stays a
   span the whole time, so it sits in a heading without changing the heading's
   size, and it marks itself with `data-tenon-editing` while it is open so a
   window around it can leave Escape and drags alone. */
export function EditableText({ value, onCommit, hint = 'Double-click to rename', className }: EditableTextProps) {
  const el = useRef<HTMLSpanElement>(null);
  const [editing, setEditing] = useState(false);
  /* Frozen while editing. A new value arriving mid-edit must not overwrite
     what is being typed, cursor and all. */
  const [shown, setShown] = useState(value);
  useEffect(() => { if (!editing) setShown(value); }, [value, editing]);

  const begin = () => {
    setEditing(true);
    /* The attribute has to be live before focus, so it is set here rather than
       waiting for the render. */
    requestAnimationFrame(() => {
      const node = el.current;
      if (!node) return;
      node.focus();
      const sel = window.getSelection();
      sel?.selectAllChildren?.(node);
    });
  };

  const finish = () => {
    const node = el.current;
    setEditing(false);
    if (!node) return;
    const next = (node.textContent || '').trim();
    if (next && next !== value) onCommit(next);
    else node.textContent = value;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key !== 'Enter' && e.key !== 'Escape') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Escape' && el.current) el.current.textContent = value;
    el.current?.blur();
  };

  return (
    <span
      ref={el}
      className={cx('tenon-editable', editing && 'tenon-editable--editing', className)}
      title={editing ? undefined : hint}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      data-tenon-editing={editing ? '' : undefined}
      onDoubleClick={begin}
      onKeyDown={onKeyDown}
      onBlur={editing ? finish : undefined}
      /* A drag that starts inside the field is a text selection. */
      onPointerDown={(e) => { if (editing) e.stopPropagation(); }}
    >
      {shown}
    </span>
  );
}
