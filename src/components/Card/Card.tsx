import type { CSSProperties, ReactNode, HTMLAttributes, ElementType } from 'react';
import { cx } from '../../utils';
import './Card.css';

/* A row given either as nodes or as markup something else already built.
   The second form is not decoration: the to-dos board runs a card summary
   through its own Markdown and builds its score chips as a string, and
   wrapping either in a span to carry it would put an element in the
   markup that the board's own string builder does not emit. It goes on
   the row's own div, which is the element both spellings agree on. */
export type CardSlot = ReactNode | { __html: string };

export type CardElevation = 'flat' | 'raised';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> {
  title?: ReactNode;
  /** Above the title, in the accent colour, so a card's mark and its label agree. */
  eyebrow?: CardSlot;
  /** Pushed to the right-hand end of the eyebrow row. The board's plan card
   *  puts how far the agent got, and whether it stopped to ask, up here. */
  eyebrowEnd?: ReactNode;
  /** Before the title. A position, an index, a key. */
  lead?: ReactNode;
  /** After the title, pushed right. */
  action?: ReactNode;
  tags?: CardSlot;
  meta?: CardSlot;
  summary?: CardSlot;
  /** Unwrapped, between summary and footer. A progress bar, a chart, a preview. */
  body?: ReactNode;
  footer?: CardSlot;
  /** The 4px inset down the left edge, and the eyebrow's colour. Undefined
   *  draws no mark at all, which is not the same as drawing a grey one. */
  accent?: string;
  elevation?: CardElevation;
  draggable?: boolean;
  dragging?: boolean;
  /** Adds the hover and pointer. Give it an onClick and a role too. */
  interactive?: boolean;
  /** 'article' unless a caller needs the card to be something else. */
  as?: ElementType;
  /** The title's element. A div by default, because a card in a list of cards
   *  is usually not a section of the document. Pass a heading where it is —
   *  nothing is styled off this, the page outline is what cares. */
  titleAs?: ElementType;
  children?: ReactNode;
}

/* One spelling of "wrap this row in its div", whichever currency it arrived
   in. An empty row draws nothing at all. */
function row(className: string, value: CardSlot) {
  if (!value) return null;
  if (typeof value === 'object' && value !== null && '__html' in value) {
    return <div className={className} dangerouslySetInnerHTML={value as { __html: string }} />;
  }
  return <div className={className}>{value as ReactNode}</div>;
}

export function Card({
  title, eyebrow, eyebrowEnd, lead, action, tags, meta, summary, body, footer,
  accent, elevation = 'flat', draggable, dragging, interactive,
  as: Tag = 'article', titleAs: Title = 'div', className, style, children, ...rest
}: CardProps) {
  /* React types `style` as CSSProperties and a custom property is not one,
     hence the cast. The component sets it rather than exposing the variable,
     so a caller never has to know the name. */
  const withAccent = accent
    ? ({ ['--tenon-card-accent' as string]: accent, ...style } as CSSProperties)
    : style;

  return (
    <Tag
      className={cx(
        'tenon-card',
        `tenon-card--${elevation}`,
        accent && 'tenon-card--accent',
        draggable && 'tenon-card--draggable',
        dragging && 'tenon-card--dragging',
        interactive && 'tenon-card--interactive',
        className,
      )}
      style={withAccent}
      draggable={draggable}
      {...rest}
    >
      {(eyebrow || eyebrowEnd) && (
        <div className="tenon-card__eyebrow">
          {eyebrow && typeof eyebrow === 'object' && '__html' in eyebrow
            ? <span dangerouslySetInnerHTML={eyebrow as { __html: string }} />
            : (eyebrow as ReactNode)}
          {eyebrowEnd ? <span className="tenon-card__eyebrow-end">{eyebrowEnd}</span> : null}
        </div>
      )}
      {(lead || title || action) && (
        <div className="tenon-card__head">
          {lead ? <span className="tenon-card__lead">{lead}</span> : null}
          {title ? <Title className="tenon-card__title">{title}</Title> : null}
          {action ? <span className="tenon-card__action">{action}</span> : null}
        </div>
      )}
      {row('tenon-card__tags', tags)}
      {row('tenon-card__meta', meta)}
      {row('tenon-card__summary', summary)}
      {body ? <div className="tenon-card__body">{body}</div> : null}
      {row('tenon-card__footer', footer)}
      {children}
    </Tag>
  );
}
