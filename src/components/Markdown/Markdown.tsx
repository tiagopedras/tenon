import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../utils';
import './Markdown.css';

export interface MarkdownProps {
  children: string;
  /** Only the inline half: code, bold, italics and links, in a span. For a short line, not a reply. */
  inline?: boolean;
  className?: string;
}

/* Enough markdown for a reply from a model: paragraphs, bullet and numbered
   lists, headings, fenced code, and inside them code spans, bold, italics and
   bare links. Kept deliberately narrow. What falls outside this subset shows
   exactly as written rather than being guessed at.

   It builds React elements rather than an HTML string, so there is no
   escaping to get wrong and nothing to inject. Came from the chat window,
   whose renderer this is a straight port of. */

/* A URL written in a reply becomes a link. Trailing sentence punctuation
   stays out of the href, since a full stop after a link is almost never part
   of it. What a click does is the page's business: this only draws the link.

   Three things, tried in this order at every position so the first to match
   wins: [text](url), a labelled link; a bare URL; and [placeholder], a
   bracket with nothing to fill it in from, kept as a marker of something
   still waiting to be written in rather than dropped or guessed at. A
   labelled link is tried first so its own [text] is never mistaken for a
   placeholder afterwards. */
const LINK_RE = /\[([^[\]\n]+)\]\(([^()\s]+)\)|(https?:\/\/[^\s<>"')\]]+)|\[([^[\]\n]+)\]/g;

/* Emphasis, tried in this order. The underscore form needs a boundary before
   it, so snake_case_words are left alone. */
const EMPHASIS: Array<{ re: RegExp; tag: 'strong' | 'em'; lead: boolean }> = [
  { re: /\*\*([^*]+)\*\*/, tag: 'strong', lead: false },
  { re: /__([^_]+)__/, tag: 'strong', lead: false },
  { re: /(^|[\s(])_([^_]+)_/, tag: 'em', lead: true },
  { re: /\*([^*]+)\*/, tag: 'em', lead: false },
];

function emphasis(text: string, key: string): ReactNode[] {
  for (const { re, tag, lead } of EMPHASIS) {
    const m = re.exec(text);
    if (!m) continue;
    const prefix = lead ? m[1] : '';
    const inner = lead ? m[2] : m[1];
    const Tag = tag;
    return [
      ...emphasis(text.slice(0, m.index) + prefix, `${key}a`),
      <Tag key={`${key}m`}>{emphasis(inner, `${key}i`)}</Tag>,
      ...emphasis(text.slice(m.index + m[0].length), `${key}z`),
    ];
  }
  return text ? [text] : [];
}

function links(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, labelledText, labelledUrl, bareUrl] = m;
    out.push(...emphasis(text.slice(last, m.index), `${key}t${last}`));
    if (labelledUrl !== undefined) {
      out.push(<a key={`${key}l${m.index}`} href={labelledUrl} className="tenon-markdown__link">{labelledText}</a>);
      last = m.index! + whole.length;
    } else if (bareUrl !== undefined) {
      let url = bareUrl;
      let tail = '';
      while (/[.,;:!?]$/.test(url)) { tail = url.slice(-1) + tail; url = url.slice(0, -1); }
      out.push(<a key={`${key}l${m.index}`} href={url} className="tenon-markdown__link">{url}</a>);
      last = m.index! + whole.length - tail.length;
    } else {
      out.push(<em key={`${key}h${m.index}`} className="tenon-markdown__placeholder">{whole}</em>);
      last = m.index! + whole.length;
    }
  }
  out.push(...emphasis(text.slice(last), `${key}e`));
  return out;
}

/* Code spans first, so a **bold** marker sitting inside backticks is never
   mistaken for a real one, and a URL quoted as code stays text. */
export function inlineNodes(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/).flatMap((part, i) =>
    i % 2 ? [<code key={`c${i}`}>{part.slice(1, -1)}</code>] : links(part, `p${i}`),
  );
}

type Block =
  | { kind: 'p'; lines: string[] }
  | { kind: 'h'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'code'; text: string };

function blocks(source: string): Block[] {
  const out: Block[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let code: string[] | null = null;
  const flushPara = () => { if (para.length) { out.push({ kind: 'p', lines: para }); para = []; } };
  const flushList = () => { if (list) { out.push({ kind: 'list', ...list }); list = null; } };
  const flush = () => { flushPara(); flushList(); };

  for (const raw of source.replace(/\r/g, '').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (/^\s*```/.test(line)) {
      if (code === null) { flush(); code = []; }
      else { out.push({ kind: 'code', text: code.join('\n') }); code = null; }
      continue;
    }
    if (code !== null) { code.push(raw); continue; }
    if (!line.trim()) { flush(); continue; }
    const ordered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    const bullet = ordered || /^\s*[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      /* A change of kind mid-run, bullets into numbers or back, starts a
         fresh list rather than mixing markers under one tag. */
      const isOrdered = !!ordered;
      if (list && list.ordered !== isOrdered) flushList();
      flushPara();
      if (!list) list = { ordered: isOrdered, items: [] };
      list.items.push(bullet[1]);
      continue;
    }
    const head = /^\s*#{1,6}\s+(.*)$/.exec(line);
    if (head) { flush(); out.push({ kind: 'h', text: head[1] }); continue; }
    flushList();
    para.push(line.trim());
  }
  if (code !== null) out.push({ kind: 'code', text: code.join('\n') });
  flush();
  return out;
}

export function Markdown({ children, inline = false, className }: MarkdownProps) {
  if (inline) return <span className={cx('tenon-markdown', className)}>{inlineNodes(children)}</span>;
  return (
    <div className={cx('tenon-markdown', className)}>
      {blocks(String(children)).map((b, i) => {
        if (b.kind === 'code') return <pre key={i}><code>{b.text}</code></pre>;
        if (b.kind === 'h') return <p key={i} className="tenon-markdown__heading">{inlineNodes(b.text)}</p>;
        if (b.kind === 'list') {
          const List = b.ordered ? 'ol' : 'ul';
          return <List key={i}>{b.items.map((t, j) => <li key={j}>{inlineNodes(t)}</li>)}</List>;
        }
        return (
          <p key={i}>
            {b.lines.map((l, j) => <Fragment key={j}>{j > 0 && <br />}{inlineNodes(l)}</Fragment>)}
          </p>
        );
      })}
    </div>
  );
}
