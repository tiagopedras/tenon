import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Badge, Card, Tag, Stat, Field } from '../src';
import type { TagChart } from '../src';
import '../dist/tenon.css';
import './playground.css';

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const TONES = ['neutral', 'accent', 'success', 'warning', 'error', 'info'] as const;
const BUCKETS: Array<[TagChart, string]> = [
  [1, 'People'], [2, 'Design oversight'], [3, 'Design System'], [4, 'Strategic'],
  [5, 'Hiring'], [6, 'Tooling'], [7, 'Research'], [8, 'Ops'], [9, 'Blocked'], [10, 'Archive'],
];

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="row">
      <h3 className="tenon-heading-6 row__title">{title}</h3>
      <div className="row__items">{children}</div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [name, setName] = useState('');

  const next = () => {
    const order = ['system', 'light', 'dark'] as const;
    const t = order[(order.indexOf(theme) + 1) % 3];
    setTheme(t);
    if (t === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  };

  return (
    <main>
      <header>
        <h1 className="tenon-heading-1">Tenon components</h1>
        <Button variant="secondary" onClick={next}>Theme: {theme}</Button>
      </header>

      <section>
        <h2 className="tenon-heading-2">Button</h2>
        <Row title="variant">
          {VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
        </Row>
        <Row title="size">
          {SIZES.map((s) => <Button key={s} variant="primary" size={s}>size {s}</Button>)}
        </Row>
        <Row title="disabled">
          {VARIANTS.map((v) => <Button key={v} variant={v} disabled>{v}</Button>)}
        </Row>
        <Row title="icon only">
          {SIZES.map((s) => (
            <Button key={s} variant="secondary" size={s} iconOnly aria-label={`Add, ${s}`}>+</Button>
          ))}
        </Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Tag</h2>
        <Row title="tone">{TONES.map((t) => <Tag key={t} tone={t}>{t}</Tag>)}</Row>
        <Row title="buckets, chart.1 to chart.10">
          {BUCKETS.map(([n, label]) => <Tag key={n} chart={n} dot>{label}</Tag>)}
        </Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Badge</h2>
        <Row title="count">{[1, 7, 42, 128].map((n) => <Badge key={n} count={n} label="waiting on you" />)}</Row>
        <Row title="tone">{(['accent', 'neutral', 'success', 'warning', 'error'] as const).map((t) => <Badge key={t} count={3} tone={t} />)}</Row>
        <Row title="zero draws nothing"><Badge count={0} /><span className="tenon-caption">(nothing between these)</span></Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Card</h2>
        <p className="tenon-body-sm muted">The board's card, renamed. Every row optional but the title.</p>
        <div className="cards">
          <Card
            accent="var(--tenon-chart-3)"
            eyebrow="design system"
            eyebrowEnd={<Tag tone="info">needs you</Tag>}
            titleAs="h3"
            lead="12"
            title="Write the Tenon migration note"
            action={<Badge count={2} label="notes" />}
            tags={<><Tag tone="warning">due Friday</Tag><Tag tone="neutral">2 steps</Tag></>}
            meta="Design System · added 14 Sep"
            summary="Every row here is optional. Leave the accent off and no mark is drawn, which is not the same as drawing a grey one."
            footer="2 notes"
            draggable
          />
          <Card
            accent="var(--tenon-chart-9)"
            eyebrow="blocked"
            title="Waiting on the API key"
            summary="An accent and an eyebrow, and nothing else."
          />
          <Card title="No accent at all" summary="Nothing to mark, so nothing is marked." meta="Queue" />
          <Card
            elevation="raised"
            interactive
            tabIndex={0}
            title="Raised and interactive"
            summary="Hover it, then tab to it."
            body={<div className="bar"><span style={{ width: '62%' }} /></div>}
            footer="5 of 8 steps"
          />
        </div>
      </section>

      <section>
        <h2 className="tenon-heading-2">Stat</h2>
        <p className="tenon-body-sm muted">The board's StatCard. One number, and what it counts.</p>
        <div className="stats">
          <Stat eyebrow="completed" value={42} caption="tasks this month" />
          <Stat eyebrow="agreed" value="2 of 2" caption="plans actioned" tone="success" />
          <Stat eyebrow="overdue" value={3} caption="past their date" tone="error" />
          <Stat value="94%" caption="no eyebrow, just a figure" tone="accent" />
        </div>
      </section>

      <section>
        <h2 className="tenon-heading-2">Field</h2>
        <div className="fields">
          <Field label="Task" placeholder="What needs doing?" value={name} onChange={(e) => setName(e.target.value)} hint="Shown under the control." />
          <Field label="Owner" required placeholder="A name" defaultValue="" />
          <Field label="Due" type="date" error="Pick a date that is not in the past." defaultValue="2020-01-01" />
          <Field label="Notes" multiline rows={3} placeholder="Anything worth remembering" />
          <Field label="Locked" disabled defaultValue="Cannot be edited" />
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
