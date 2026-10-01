import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../utils';
import './TagChip.css';

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

/* A key and value you click to edit in place. Enter or leaving the field
   commits, Escape puts it back. To make a new one use TagChipAdd, which asks
   for the key as well. */
export function TagChip({ label, value = '', tone = 'neutral', readOnly = false, onCommit, className }: TagChipProps) {
  const [editing, setEditing] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const cancelled = useRef(false);

  useEffect(() => { if (editing) { input.current?.focus(); input.current?.select(); } }, [editing]);

  const cls = cx('tenon-tag-chip', tone === 'warning' && 'tenon-tag-chip--warning', readOnly && 'tenon-tag-chip--readonly', className);

  if (!editing) {
    return (
      <button type="button" className={cls} disabled={readOnly} onClick={() => { cancelled.current = false; setEditing(true); }}>
        {value ? `${label}: ${value}` : label}
      </button>
    );
  }
  const finish = (save: boolean) => {
    setEditing(false);
    if (save && input.current) onCommit(input.current.value.trim());
  };
  return (
    <span className={cls}>
      {label}:{' '}
      <input
        ref={input}
        type="text"
        defaultValue={value}
        aria-label={label}
        className="tenon-tag-chip__input"
        onBlur={() => { if (!cancelled.current) finish(true); }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') { e.preventDefault(); finish(true); }
          else if (e.key === 'Escape') { e.preventDefault(); cancelled.current = true; finish(false); }
        }}
      />
    </span>
  );
}

export interface TagChipAddProps {
  /** Return a message to refuse the tag and keep the fields open, or nothing to accept it. */
  onAdd: (key: string, value: string) => string | void;
  /** Called with the refusal message so the page can show it. */
  onRefuse?: (message: string) => void;
  className?: string;
}

/* The dashed "+ Add tag" chip. Click for a key field and a value field.
   Both are needed; leaving both empty cancels. */
export function TagChipAdd({ onAdd, onRefuse, className }: TagChipAddProps) {
  const [open, setOpen] = useState(false);
  const key = useRef<HTMLInputElement>(null);
  const val = useRef<HTMLInputElement>(null);
  const done = useRef(false);

  useEffect(() => { if (open) key.current?.focus(); }, [open]);

  const cls = cx('tenon-tag-chip', 'tenon-tag-chip--add', className);
  if (!open) {
    return <button type="button" className={cls} onClick={() => { done.current = false; setOpen(true); }}>+ Add tag</button>;
  }
  const cancel = () => { done.current = true; setOpen(false); };
  const commit = () => {
    if (done.current) return;
    const k = key.current!.value.trim(), v = val.current!.value.trim();
    if (!k && !v) { cancel(); return; }
    if (!k || !v) { onRefuse?.('A tag needs both a key and a value.'); key.current!.focus(); return; }
    const refusal = onAdd(k, v);
    if (typeof refusal === 'string') { onRefuse?.(refusal); key.current!.focus(); return; }
    done.current = true;
    setOpen(false);
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); commit(); }
    else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
  };
  /* Focus moving from one field to the other is not "done typing". */
  const blur = () => setTimeout(() => {
    if (document.activeElement !== key.current && document.activeElement !== val.current) commit();
  }, 0);
  return (
    <span className={cls}>
      <input ref={key} type="text" placeholder="key" aria-label="New tag key" className="tenon-tag-chip__input" onKeyDown={onKey} onBlur={blur} />
      {': '}
      <input ref={val} type="text" placeholder="value" aria-label="New tag value" className="tenon-tag-chip__input" onKeyDown={onKey} onBlur={blur} />
    </span>
  );
}
