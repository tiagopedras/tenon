import { useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
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
  & ({ multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, 'required' | 'className'>
    | { multiline: true } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required' | 'className'>);

export function Field({ label, hint, error, required, className, ...rest }: FieldProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const { multiline, ...control } = rest as { multiline?: boolean } & Record<string, unknown>;
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
      {multiline
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
