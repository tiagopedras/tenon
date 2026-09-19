import type { ReactNode, HTMLAttributes, ElementType } from 'react';
import { cx } from '../../utils';
import './Column.css';

export type ColumnTone = 'default' | 'accent' | 'success' | 'warning' | 'error';
export type ColumnLayout = 'stack' | 'prose';

export interface ColumnProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  /** The title's element. Nothing is styled off it; the page outline is
   *  what cares — h2 for a section of the page, h3 for one inside a view. */
  titleAs?: ElementType;
  /** Straight after the title, inside the left group. A status icon, a
   *  spinner, whatever the app wants to say about the column itself. */
  titleAfter?: ReactNode;
  /** A quiet aside beside the title. */
  hint?: ReactNode;
  /** The head's right-hand group, in this order. */
  sort?: ReactNode;
  count?: ReactNode;
  action?: ReactNode;
  filters?: ReactNode;
  /** What the column is for, on its own line under the title row. */
  desc?: ReactNode;
  /** Below the body and outside it, so it does not scroll with the body. */
  footer?: ReactNode;
  /** 'stack' spaces children evenly, for a column of cards. 'prose' lets
   *  their own margins do it and gives the edges more room. */
  layout?: ColumnLayout;
  /** Tints the panel and colours the head. */
  tone?: ColumnTone;
  /** A quieter head, for a column that is finished or parked. */
  muted?: boolean;
  /** Draws a dashed edge. Tenon does not say what that means — on the
   *  to-dos board it means an agent owns the column and you do not drag
   *  into it, and the dash reads because nothing else in the app is
   *  dashed. Keep it to one meaning per app and it keeps working. */
  dashed?: boolean;
  /** Draws the column as a <details> whose <summary> is the head. */
  collapsible?: boolean;
  /** Only read when `collapsible`. Open unless explicitly false. */
  open?: boolean;
  /** Written to data-column-collapse, for whatever remembers the state.
   *  Falls back to nothing rather than to the title, which is not an id. */
  collapseKey?: string;
  bodyClassName?: string;
  children?: ReactNode;
}

export function Column({
  title, titleAs: Title = 'h2', titleAfter, hint, sort, count, action, filters,
  desc, footer, layout = 'stack', tone = 'default', muted, dashed,
  collapsible, open, collapseKey, className, bodyClassName, children, ...rest
}: ColumnProps) {
  const classes = cx(
    'tenon-column',
    tone !== 'default' && `tenon-column--${tone}`,
    layout !== 'stack' && `tenon-column--${layout}`,
    muted && 'tenon-column--muted',
    dashed && 'tenon-column--dashed',
    className,
  );

  const head = (
    <>
      <div className="tenon-column__head-row">
        <div className="tenon-column__head-start">
          {collapsible ? <span className="tenon-column__chevron" aria-hidden="true" /> : null}
          <Title className="tenon-column__title">{title}</Title>
          {titleAfter}
          {hint ? <span className="tenon-column__hint">{hint}</span> : null}
        </div>
        <div className="tenon-column__head-end">
          {sort}
          {count != null ? <span className="tenon-column__count">{count}</span> : null}
          {action}
          {filters}
        </div>
      </div>
      {desc ? <p className="tenon-column__desc">{desc}</p> : null}
    </>
  );

  const inner = (
    <>
      <div className={cx('tenon-column__body', bodyClassName)}>{children}</div>
      {footer ? <div className="tenon-column__footer">{footer}</div> : null}
    </>
  );

  /* A collapsible column is a <details> and its head is the <summary> —
     the same head, the same classes, the same slots, so nothing about a
     column changes by being foldable except the element it is made of. */
  if (collapsible) {
    return (
      <details className={classes} data-column-collapse={collapseKey} open={open !== false} {...rest}>
        <summary className="tenon-column__head">{head}</summary>
        {inner}
      </details>
    );
  }

  return (
    <section className={classes} {...rest}>
      <div className="tenon-column__head">{head}</div>
      {inner}
    </section>
  );
}

export interface ColumnEmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** A dashed box rather than a line of grey text. For a wide column,
   *  where one faint line reads as a column that failed to load. */
  boxed?: boolean;
}

/** What a column draws when there is nothing in it. */
export function ColumnEmpty({ boxed, className, children, ...rest }: ColumnEmptyProps) {
  return (
    <div className={cx('tenon-column-empty', boxed && 'tenon-column-empty--boxed', className)} {...rest}>
      {children}
    </div>
  );
}
