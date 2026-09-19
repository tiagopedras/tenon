import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Badge, Card, Field } from '../src';
import type { BadgeChart } from '../src';
import '../dist/tenon.css';
import './playground.css';

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const TONES = ['neutral', 'accent', 'success', 'warning', 'error', 'info'] as const;
const BUCKETS: Array<[BadgeChart, string]> = [
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
        <h2 className="tenon-heading-2">Badge</h2>
        <Row title="tone">{TONES.map((t) => <Badge key={t} tone={t}>{t}</Badge>)}</Row>
        <Row title="buckets, chart.1 to chart.10">
          {BUCKETS.map(([n, label]) => <Badge key={n} chart={n} dot>{label}</Badge>)}
        </Row>
      </section>

      <section>
        <h2 className="tenon-heading-2">Card</h2>
        <div className="cards">
          <Card elevation="flat"><h3 className="tenon-heading-4">flat</h3><p className="tenon-body-sm">No shadow. Sits in a list.</p></Card>
          <Card elevation="raised"><h3 className="tenon-heading-4">raised</h3><p className="tenon-body-sm">The default. A card on a page.</p></Card>
          <Card elevation="overlay" interactive tabIndex={0}><h3 className="tenon-heading-4">overlay, interactive</h3><p className="tenon-body-sm">Hover and focus it.</p></Card>
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
