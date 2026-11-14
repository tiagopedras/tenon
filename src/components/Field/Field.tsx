import { useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { SelectChevron } from '../Select/Select';
import './Field.css';

interface Shared {
  label: ReactNode;
  /** Sits under the control. Replaced by `error` when there is one. */
  hint?: ReactNode;
  /** Present means invalid. The text is announced, not just coloured. */
  error?: ReactNode;
  required?: boolean;
  className?: string;
}

export type FieldProps =
  & Shared
  & ({ multiline?: false; select?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, 'required' | 'className'>
    | { multiline: true; select?: false } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required' | 'className'>
    /* The options are the children, as <option> and <optgroup>. */
    | { select: true; multiline?: false }
      & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'required' | 'className' | 'multiple' | 'size'>);

export function Field({ label, hint, error, required, className, ...rest }: FieldProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const { multiline, select, ...control } = rest as { multiline?: boolean; select?: boolean } & Record<string, unknown>;
  const note = error ?? hint;

  /* aria-describedby points at whichever note is actually rendered, and
     at nothing when there is none, so a screen reader is never sent to an
     element that is not there. */
  const shared = {
    id,
    className: 'tenon-field__control',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': note ? noteId : undefined,
    required,
    ...control,
  };

  return (
    <div className={cx('tenon-field', error && 'tenon-field--invalid', className)}>
      <label className="tenon-field__label" htmlFor={id}>
        {label}
        {required && <span className="tenon-field__required" aria-hidden="true">*</span>}
      </label>
      {select
        ? (
          <span className="tenon-field__select">
            <select {...(shared as SelectHTMLAttributes<HTMLSelectElement> & { id: string })} />
            <SelectChevron />
          </span>
        )
        : multiline
          ? <textarea {...(shared as TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string })} />
          : <input {...(shared as InputHTMLAttributes<HTMLInputElement> & { id: string })} />}
      {note && (
        <span id={noteId} className={cx('tenon-field__note', error && 'tenon-field__note--error')}>
          {note}
        </span>
      )}
    </div>
  );
}
