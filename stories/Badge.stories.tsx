import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../src';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { count: 3, label: 'waiting on you' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Counts: Story = {
  render: () => (
    <div className="sb-row">
      {[1, 7, 42, 128].map((n) => <Badge key={n} count={n} label="waiting on you" />)}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="sb-row">
      {(['accent', 'neutral', 'success', 'warning', 'error', 'running'] as const).map((t) => (
        <Badge key={t} count={3} tone={t} />
      ))}
    </div>
  ),
};

export const ZeroDrawsNothing: Story = {
  render: () => (
    <div className="sb-row">
      <Badge count={0} />
      <span className="tenon-caption">(nothing between these)</span>
    </div>
  ),
};
