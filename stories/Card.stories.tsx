import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Card, Tag } from '../src';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: { title: 'Write the Tenon migration note' },
  parameters: {
    docs: { description: { component: "The board's card, renamed. Every row is optional except the title." } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    accent: 'var(--tenon-chart-3)',
    eyebrow: 'design system',
    eyebrowEnd: <Tag tone="info">needs you</Tag>,
    titleAs: 'h3',
    lead: '12',
    action: <Badge count={2} label="notes" />,
    tags: <><Tag tone="warning">due Friday</Tag><Tag tone="neutral">2 steps</Tag></>,
    meta: 'Design System · added 14 Sep',
    summary: 'Every row here is optional. Leave the accent off and no mark is drawn, which is not the same as drawing a grey one.',
    footer: '2 notes',
    draggable: true,
  },
};

export const AccentAndEyebrow: Story = {
  args: {
    accent: 'var(--tenon-chart-9)',
    eyebrow: 'blocked',
    title: 'Waiting on the API key',
    summary: 'An accent and an eyebrow, and nothing else.',
  },
};

export const NoAccent: Story = {
  args: {
    title: 'No accent at all',
    summary: 'Nothing to mark, so nothing is marked.',
    meta: 'Queue',
  },
};

export const RaisedAndInteractive: Story = {
  args: {
    elevation: 'raised',
    interactive: true,
    tabIndex: 0,
    title: 'Raised and interactive',
    summary: 'Hover it, then tab to it.',
    body: <div className="sb-bar"><span style={{ width: '62%' }} /></div>,
    footer: '5 of 8 steps',
  },
};
