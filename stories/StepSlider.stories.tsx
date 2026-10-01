import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepSlider } from '../src';

const meta = {
  title: 'Components/StepSlider',
  component: StepSlider,
  tags: ['autodocs'],
  args: { 'aria-label': 'Impact', steps: [], value: '', onChange: () => {} },
} satisfies Meta<typeof StepSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

const impact = [
  { value: '', label: '—' },
  { value: 'low', label: 'Low' },
  { value: 'med', label: 'Med', colour: 'var(--tenon-text-warning)' },
  { value: 'high', label: 'High', colour: 'var(--tenon-text-success)' },
];

function Impact({ disabled = false }: { disabled?: boolean }) {
  const [v, setV] = useState('med');
  return <StepSlider aria-label="Impact" steps={impact} value={v} onChange={setV} disabled={disabled} />;
}

export const Scale: Story = { render: () => <Impact /> };
export const Disabled: Story = { render: () => <Impact disabled /> };

export const WithSelectOnNarrow: Story = {
  render: () => {
    const cols = ['Backlog', 'To do', 'Doing', 'Reviewing', 'Waiting', 'Done'].map((c) => ({ value: c, label: c }));
    const [v, setV] = useState('To do');
    return <StepSlider aria-label="Column" steps={cols} value={v} onChange={setV} selectOnNarrow />;
  },
};
