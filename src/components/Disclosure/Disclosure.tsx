import { useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../utils';
import './Disclosure.css';

export interface DisclosureProps {
  /** The one line that is always showing. */
  summary: ReactNode;
  /** With `open`, the caller owns the state. Without it, this keeps its own. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: ReactNode;
}

/* A quiet summary line that opens into more. The arrow is drawn whether or
   not the pointer is on it: a control that only admits to being one on hover
   hides the interesting part behind the least likely gesture. Came from the
   chat window's trace of what a reply did. */
export function Disclosure({ summary, open, defaultOpen = false, onOpenChange, className, children }: DisclosureProps) {
  const [own, setOwn] = useState(defaultOpen);
  const isOpen = open ?? own;
  const toggle = () => {
    if (open === undefined) setOwn(!isOpen);
    onOpenChange?.(!isOpen);
  };
  return (
    <div className={cx('tenon-disclosure', isOpen && 'tenon-disclosure--open', className)}>
      <button type="button" className="tenon-disclosure__head" aria-expanded={isOpen} onClick={toggle}>
        <span className="tenon-disclosure__twist" aria-hidden="true">{isOpen ? '⌄' : '›'}</span>
        {summary}
      </button>
      {isOpen && <div className="tenon-disclosure__panel">{children}</div>}
    </div>
  );
}
