import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from '../src';

const meta = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
  args: { eyebrow: 'completed', value: 42, caption: 'tasks this month' },
  parameters: {
    docs: { description: { component: "The board's StatCard. One number, and what it counts." } },
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="sb-grid">
      <Stat eyebrow="agreed" value="2 of 2" caption="plans actioned" tone="success" />
      <Stat eyebrow="overdue" value={3} caption="past their date" tone="error" />
      <Stat value="94%" caption="no eyebrow, just a figure" tone="accent" />
    </div>
  ),
};
