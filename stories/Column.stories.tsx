import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Card, Column, ColumnEmpty } from '../src';

const meta = {
  title: 'Components/Column',
  component: Column,
  tags: ['autodocs'],
  args: { title: 'To do', titleAs: 'h3' },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: "The board's column. The head is two groups pushed apart, so a long title never squeezes the controls away.",
      },
    },
  },
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OfCards: Story = {
  args: {
    count: 3,
    action: <Button size="sm" variant="ghost">sort</Button>,
    desc: 'What is actually next, as opposed to what exists.',
    footer: <Button size="sm" variant="ghost" style={{ width: '100%' }}>+ add</Button>,
    children: (
      <>
        <Card accent="var(--tenon-chart-1)" title="Ship the tokens" meta="People" />
        <Card accent="var(--tenon-chart-4)" title="Read the parity report" meta="Design System" />
        <Card title="No accent" meta="Queue" />
      </>
    ),
  },
};

export const Running: Story = {
  args: {
    title: 'Running',
    tone: 'running',
    count: 1,
    hint: 'worked by an agent',
    children: (
      <Card accent="var(--tenon-chart-2)" title="Generating the ramps" summary="A tinted panel and a coloured head." />
    ),
  },
};

export const DashedAndMuted: Story = {
  args: {
    title: 'Waiting for review',
    dashed: true,
    muted: true,
    count: 0,
    children: <ColumnEmpty>Nothing here.</ColumnEmpty>,
  },
};

export const ProseAndCollapsible: Story = {
  args: {
    title: 'Overview',
    layout: 'prose',
    collapsible: true,
    collapseKey: 'demo-overview',
    children: (
      <>
        <p>A column of prose rather than a column of cards, and foldable. Its own margins do the spacing, and the edges get more room.</p>
        <ColumnEmpty boxed>A boxed empty, for a wide column.</ColumnEmpty>
      </>
    ),
  },
};
