import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup } from '../src';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  args: { 'aria-label': 'Buckets', value: [], onToggle: () => {}, options: [] },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Buckets() {
  const [on, setOn] = useState<string[]>(['People']);
  const names = ['People', 'Design oversight', 'Design System'];
  return (
    <ToggleGroup
      aria-label="Buckets"
      value={on}
      onToggle={(v) => setOn((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]))}
      options={names.map((n, i) => ({
        value: n, label: n, count: 3 + i, colour: `var(--tenon-chart-${i + 1})`,
        title: 'Click to toggle, several can be on at once',
      }))}
    />
  );
}

export const WithDotsAndCounts: Story = { render: () => <Buckets /> };
