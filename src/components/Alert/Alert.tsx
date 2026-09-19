import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import './Alert.css';

export type AlertTone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Buttons that answer it. Sit under the text. */
  actions?: ReactNode;
}

/* A warning or an error interrupts a screen reader; the others wait their
   turn. Setting the role by tone means nobody has to remember to. */
const ROLE: Record<AlertTone, 'alert' | 'status'> = {
  neutral: 'status', info: 'status', success: 'status', warning: 'alert', error: 'alert',
};

export function Alert({ tone = 'neutral', title, actions, className, children, ...rest }: AlertProps) {
  return (
    <div role={ROLE[tone]} className={cx('tenon-alert', `tenon-alert--${tone}`, className)} {...rest}>
      {title && <div className="tenon-alert__title">{title}</div>}
      {children && <div className="tenon-alert__body">{children}</div>}
      {actions && <div className="tenon-alert__actions">{actions}</div>}
    </div>
  );
}
