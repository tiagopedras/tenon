import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Badge, Card, Tag, Stat, Column, ColumnEmpty, Field, Modal, Textarea, Spinner, Pill, Alert, Switch, SegmentedControl } from '../src';
import type { TagChart } from '../src';
import '../dist/tenon.css';
import './playground.css';

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger', 'confirm', 'destructive'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const TONES = ['neutral', 'accent', 'success', 'warning', 'error', 'info', 'running'] as const;
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
  const [on, setOn] = useState(true);
  const [view, setView] = useState('cards');
  const [draft, setDraft] = useState('');
  const [modal, setModal] = useState(location.hash === '#modal');

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
        <Row title="tone">{(['accent', 'neutral', 'success', 'warning', 'error', 'running'] as const).map((t) => <Badge key={t} count={3} tone={t} />)}</Row>
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
        <h2 className="tenon-heading-2">Column</h2>
        <p className="tenon-body-sm muted">The board's column. The head is two groups pushed apart, so a long title never squeezes the controls away.</p>
        <div className="columns">
          <Column
            title="To do" titleAs="h3" count={3}
            action={<Button size="sm" variant="ghost">sort</Button>}
            desc="What is actually next, as opposed to what exists."
            footer={<Button size="sm" variant="ghost" style={{ width: '100%' }}>+ add</Button>}
          >
            <Card accent="var(--tenon-chart-1)" title="Ship the tokens" meta="People" />
            <Card accent="var(--tenon-chart-4)" title="Read the parity report" meta="Design System" />
            <Card title="No accent" meta="Queue" />
          </Column>

          <Column title="Running" titleAs="h3" tone="running" count={1} hint="worked by an agent">
            <Card accent="var(--tenon-chart-2)" title="Generating the ramps" summary="A tinted panel and a coloured head." />
          </Column>

          <Column title="Waiting for review" titleAs="h3" dashed muted count={0}>
            <ColumnEmpty>Nothing here.</ColumnEmpty>
          </Column>

          <Column title="Overview" titleAs="h3" layout="prose" collapsible collapseKey="demo-overview">
            <p>A column of prose rather than a column of cards, and foldable. Its own margins do the spacing, and the edges get more room.</p>
            <ColumnEmpty boxed>A boxed empty, for a wide column.</ColumnEmpty>
          </Column>
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
      <section>
        <h2 className="tenon-heading-2">Pill</h2>
        <p className="tenon-body-sm muted">Tag's outlined counterpart, for a thing that happened or a state something is in.</p>
        <Row title="tone">{(['neutral', 'accent', 'success', 'warning', 'error'] as const).map((t) => <Pill key={t} tone={t}>{t}</Pill>)}</Row>
        <Row title="dot">{(['neutral', 'accent', 'success'] as const).map((t) => <Pill key={t} tone={t} dot>Read file</Pill>)}</Row>
        <Row title="caps"><Pill caps>off</Pill><Pill caps tone="accent">built</Pill><Pill caps tone="warning">3 tonight</Pill></Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Alert</h2>
        <div className="fields">
          <Alert tone="neutral" title="Run finished">Nothing changed on disk.</Alert>
          <Alert tone="info" title="Claude wants to run a command">git status in /Users/tiagopedras/Code</Alert>
          <Alert tone="success" title="Merged">Both commits are on main.</Alert>
          <Alert tone="warning" title="Allow this edit?" actions={<><Button size="sm" variant="confirm">Allow</Button><Button size="sm" variant="secondary">Deny</Button></>}>
            It rewrites board.css in place.
          </Alert>
          <Alert tone="error" title="The run stopped">The server did not answer.</Alert>
        </div>
      </section>

      <section>
        <h2 className="tenon-heading-2">Switch</h2>
        <Row title="on and off">
          <Switch checked={on} onChange={setOn} aria-label="Improvements agent" />
          <span className="tenon-body-sm">{on ? 'on' : 'off'}</span>
          <Switch checked={false} disabled aria-label="Disabled, off" />
          <Switch checked disabled aria-label="Disabled, on" />
        </Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">SegmentedControl</h2>
        <Row title="two">
          <SegmentedControl aria-label="View" value={view} onChange={setView} options={[{ value: 'cards', label: 'Cards' }, { value: 'list', label: 'List' }]} />
        </Row>
        <Row title="four, one disabled">
          <SegmentedControl aria-label="Range" value={view} onChange={setView}
            options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month', disabled: true }, { value: 'cards', label: 'Cards' }]} />
        </Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Spinner</h2>
        <Row title="size">{(['sm', 'md', 'lg'] as const).map((z) => <Spinner key={z} size={z} label={`Working, ${z}`} />)}</Row>
        <Row title="beside words"><Spinner size="sm" /><span className="tenon-body-sm">Reading the improvements list…</span></Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Textarea</h2>
        <div className="fields">
          <Textarea placeholder="Fixed, resizable" rows={3} />
          <Textarea autoGrow placeholder="Grows as you type, then scrolls" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <Textarea invalid placeholder="Invalid" />
        </div>
      </section>

      <section>
        <h2 className="tenon-heading-2">Modal</h2>
        <p className="tenon-body-sm muted">Escape and the scrim both close it. Tab stays inside, and focus goes back to the button.</p>
        <Button variant="primary" onClick={() => setModal(true)}>Open the modal</Button>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Improvements agent"
          subtitle="agents-dashboard · 06:00"
          headEnd={<Button size="sm" variant="ghost" onClick={() => setModal(false)}>Close</Button>}
          footer={<><Textarea autoGrow placeholder="Reply…" style={{ flex: 1 }} /><Button variant="primary">Send</Button></>}
        >
          <p className="tenon-body">The body scrolls and the head and footer stay where they are.</p>
          {Array.from({ length: 14 }, (_, i) => <p key={i} className="tenon-body-sm">Line {i + 1}. Something the agent did.</p>)}
        </Modal>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
